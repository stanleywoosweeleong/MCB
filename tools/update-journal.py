#!/usr/bin/env python3
"""Rebuild journal.js from the Malaysian Cocoa Journal website.

    python3 tools/update-journal.py            # fetch everything, write journal.js
    python3 tools/update-journal.py --cache D  # keep/reuse downloaded article pages in folder D
    python3 tools/update-journal.py --cache D --no-fetch   # build only from pages already in D
    python3 tools/update-journal.py --force    # write even if fewer articles than before

Safety: if any page cannot be downloaded the run stops and journal.js is left
untouched, and a result that would drop any paper now in the file is refused
unless --force is given. The file is replaced in one step, never half-written.

Reads each article page (ArticleDetail.aspx?ID=n) for its title, authors,
volume, date, abstract and keywords. PDFs are not downloaded: the app links
to them on mcj.koko.gov.my. Be gentle with the server; this takes a while.
"""
import gzip, html, json, os, re, sys, time, urllib.request

BASE = "https://mcj.koko.gov.my/ArticleDetail.aspx?ID=%d"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAG = re.compile(r"</?[A-Za-z][^>]*>")   # a real tag starts with a letter; "p<0.05 ... p>0.05" does not
STOP_AFTER_MISSES = 40          # consecutive IDs with no article before we assume the end

KEEP = ["RNAi", "MTT", "COALEX-1", "BALB/c", "3D", "GC/MS", "E-nose", "MCB's", "Bagan", "Datuk", "Cocoa-ABE", "Madai", "Kota", "Samarahan", "PAHs", "Snellen", "GC-MS/MS", "LC-MS/MS", "ADSI", "Nissui", "Excel", "ARM", "IAA", "RSM", "DNA", "RNA", "PCR", "SNP", "SNPs", "SSR", "CPB", "VSD", "UV", "HPLC", "GC-MS", "LC-MS", "FTIR", "NMR",
        "pH", "NPK", "IoT", "GIS", "MCB", "KKM", "ISO", "GMP", "HACCP", "DPPH", "FRAP", "ABTS", "ORAC", "PPO", "SME", "SMEs",
        "COVID-19", "II", "III", "IV", "L.", "E.", "QTL", "AFLP", "RAPD", "ELISA", "GAP", "IPM", "SIT", "F1", "UPLC", "SEM",
        "Kinabalu", "Kuala", "Lumpur", "Malaysia", "Malaysian", "Malaysia's", "Malaysian's", "Sabah", "Sarawak", "Peninsular", "Borneo", "Asia", "Asian",
        "Indonesia", "Ghana", "Africa", "African", "Europe", "European", "Pahang", "Perak", "Johor", "Kelantan", "Tawau",
        "Jengka", "Ranau", "Theobroma", "Conopomorpha", "Phytophthora", "Helopeltis", "Trichoderma", "Bacillus", "Lactobacillus",
        "Kappaphycus", "Musang", "King", "Codex", "EU", "FAO", "WHO", "Soxhlet", "Fourier", "Raman", "Maillard", "Criollo",
        "Forastero", "Trinitario", "Arduino", "Android", "Google", "Islamic", "Halal", "Bambangan", "Oncobasidium",
        "Ceratobasidium", "Colletotrichum", "Aspergillus", "Saccharomyces", "Acetobacter", "Zeuzera", "Apogonia"]
KEEP = {k.lower(): k for k in KEEP}


def sentence_case(t):
    """Titles are mostly ALL CAPS on the site; make them readable."""
    letters = [c for c in t if c.isalpha()]
    if not letters or sum(c.isupper() for c in letters) / len(letters) < 0.7:
        return t
    out, start = [], True
    for w in t.split(" "):
        core = w.strip("()[],.:;\"'")
        low = core.lower()
        if low == "l" and w.rstrip(")],;:").endswith(".") and out and out[-1].lower().strip("(") in ("cacao", "bicolor", "grandiflorum"):
            out.append(w.replace("l", "L")); start = w.endswith(":")     # botanical authority, not a sentence end
            continue
        if low in KEEP:
            nw = w.replace(core, KEEP[low])
        elif "-" in core and any(p.lower() in KEEP for p in core.split("-")):
            nw = w.replace(core, "-".join(KEEP.get(p.lower(), p.lower()) for p in core.split("-")))
        else:
            nw = w.lower()
            if start and nw:
                i = next((k for k, c in enumerate(nw) if c.isalpha()), None)
                if i is not None:
                    nw = nw[:i] + nw[i].upper() + nw[i + 1:]
        out.append(nw)
        start = w.endswith((":", ".", "?")) and low not in KEEP
    return " ".join(out)


def clean_authors(a):
    a = re.sub(r"[\d*†]+", "", a)                 # affiliation marks
    a = re.sub(r"\s+", " ", a)
    a = re.sub(r"\s+([,.])", r"\1", a)
    a = re.sub(r",(\s*,)+", ",", a)
    a = re.sub(r"\s*&\s*", " and ", a)
    a = re.sub(r",\s*and\b", " and", a)
    return a.strip(" ,")


def field(s, name):
    """Text of <span id="ContentPlaceHolder1_name">…</span>, allowing nested spans."""
    m = re.search(r'<span id="ContentPlaceHolder1_%s"[^>]*>' % name, s)
    if not m:
        return ""
    depth, pos = 1, m.end()
    for t in re.finditer(r"<span\b|</span>", s[pos:pos + 200000]):
        depth += 1 if t.group(0) != "</span>" else -1
        if depth == 0:
            inner = s[pos:pos + t.start()]
            return re.sub(r"\s+", " ", html.unescape(TAG.sub(" ", inner))).strip()
    return ""


def parse(s, n):
    title = field(s, "labelTitle")
    if not title:
        return None
    kw, k = [], s.find(">Keywords<")
    if k > 0:                                  # only the chip row that directly follows the label
        m = re.search(r'<div class="flex flex-wrap[^"]*">(.*?)</div>', s[k:k + 8000], flags=re.S)
        if m:
            for x in re.findall(r"<span class='[^']*'>(.*?)</span>", m.group(1), flags=re.S):
                for part in re.split(r"\s*;\s*", html.unescape(TAG.sub(" ", x))):   # some records pack all keywords into one chip
                    part = re.sub(r"\s+", " ", part).strip(" ;,")
                    if part.endswith(".") and not part.endswith(" L."):       # keep "Theobroma cacao L."
                        part = part.rstrip(". ")
                    if part:
                        kw.append(part)
    vol = re.search(r"(\d+)\s*(?:\((\d+)\))?[\s/]+(\d{4})", field(s, "labelVol"))   # "Volume 13(1)/2021", "Volume 17 2025"
    if title.lower() == "article title" or not vol:
        return None                                                    # placeholder record
    authors = clean_authors(field(s, "labelAuthors"))
    if authors.lower().startswith("refer to"):
        authors = "Complete volume"                                    # a whole issue in one PDF
    return {"id": n, "t": sentence_case(title), "a": authors,
            "v": int(vol.group(1)), "i": int(vol.group(2) or 0), "y": int(vol.group(3)),
            "ab": "" if field(s, "labelAbstract").lower().startswith("refer to") else field(s, "labelAbstract"),
            "kw": kw}


def fetch(n):
    req = urllib.request.Request(BASE % n, headers={"Accept-Encoding": "gzip", "User-Agent": "journal-index-builder"})
    with urllib.request.urlopen(req, timeout=45) as r:
        b = r.read()
        if r.headers.get("Content-Encoding") == "gzip":
            b = gzip.decompress(b)
    return b.decode("utf-8", "replace")


def existing(path):
    """(ids, body) of the current journal.js; body is everything after the dated header."""
    try:
        text = open(path, encoding="utf-8").read()
    except OSError:
        return set(), ""
    ids = {int(m) for m in re.findall(r'^\{"id":(\d+),', text, flags=re.M)}
    return ids, text[text.find("var MCJ = ["):]


def write_atomic(path, text):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(text)
    os.replace(tmp, path)             # one step: never a half-written file


def main():
    args = sys.argv[1:]
    cache = None
    if "--cache" in args:
        k = args.index("--cache")
        if k + 1 >= len(args) or args[k + 1].startswith("--"):
            sys.exit("--cache needs a folder name, e.g. --cache pages")
        cache = args[k + 1]
        os.makedirs(cache, exist_ok=True)
    no_fetch, force = "--no-fetch" in args, "--force" in args
    arts, misses, n = [], 0, 0
    while misses < STOP_AFTER_MISSES:
        n += 1
        path = os.path.join(cache, "%d.html" % n) if cache else None
        s, cached = "", False
        if path and os.path.exists(path) and os.path.getsize(path) > 0:
            s, cached = open(path, encoding="utf-8", errors="replace").read(), True
        elif not no_fetch:
            err = None
            for attempt in range(3):
                try:
                    s = fetch(n); err = None; break
                except Exception as e:
                    err = e; print("  %d: %s (retrying)" % (n, e), flush=True); time.sleep(4)
            if err is not None:       # a download failure is NOT "no article here": stop, change nothing
                sys.exit("Stopped: could not download article page %d (%s). journal.js was not changed." % (n, err))
            time.sleep(0.5)
        a = parse(s, n) if s else None
        if a:
            if path and not cached:   # cache only real article pages, so new IDs are always looked for again
                write_atomic(path, s)
            arts.append(a); misses = 0; print("%4d  %s" % (n, a["t"][:70]), flush=True)
        else:
            misses += 1
    arts.sort(key=lambda a: (-a["y"], -a["v"], -a["i"], -a["id"]))
    out = os.path.join(ROOT, "journal.js")
    old_ids, old_body = existing(out)
    if not arts:
        sys.exit("Stopped: no articles found. journal.js was not changed.")
    lost = sorted(old_ids - {a["id"] for a in arts})
    if lost and not force:            # compare the papers themselves, not just how many there are
        sys.exit("Stopped: %d paper(s) now in journal.js would disappear (IDs %s). Nothing written; use --force if this is expected."
                 % (len(lost), ", ".join(map(str, lost[:20]))))
    body = "var MCJ = [\n" + ",\n".join(json.dumps(a, ensure_ascii=False, separators=(",", ":")) for a in arts) + "\n];\n"
    if body == old_body:              # nothing changed: leave the file (and its date) alone, so no needless app update
        print("No change: journal.js already has these %d articles." % len(arts)); return
    today = time.strftime("%Y-%m-%d")
    write_atomic(out, "/* Malaysian Cocoa Journal index. Generated by tools/update-journal.py from\n"
                      "   mcj.koko.gov.my on %s. Do not edit by hand. */\n" % today + 'var MCJ_READ = "%s";\n' % today + body)
    print("%d articles written to journal.js (was %d)" % (len(arts), len(old_ids)))


if __name__ == "__main__":
    main()
