#!/usr/bin/env python3
"""Rebuild journal.js from the Malaysian Cocoa Journal website.

    python3 tools/update-journal.py            # fetch everything, write journal.js
    python3 tools/update-journal.py --cache D  # keep/reuse downloaded article pages in folder D
    python3 tools/update-journal.py --cache D --no-fetch   # build only from pages already in D
    python3 tools/update-journal.py --force    # write even if fewer articles than before

Safety: if any page cannot be downloaded the run stops and journal.js is left
untouched, and a result with fewer articles than the current file is refused
unless --force is given. The file is replaced in one step, never half-written.

Reads each article page (ArticleDetail.aspx?ID=n) for its title, authors,
volume, date, abstract and keywords. PDFs are not downloaded: the app links
to them on mcj.koko.gov.my. Be gentle with the server; this takes a while.
"""
import gzip, html, json, os, re, sys, time, urllib.request

BASE = "https://mcj.koko.gov.my/ArticleDetail.aspx?ID=%d"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
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
            return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", inner))).strip()
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
                for part in re.split(r"\s*;\s*", html.unescape(re.sub(r"<[^>]+>", " ", x))):   # some records pack all keywords into one chip
                    part = re.sub(r"\s+", " ", part).strip(" .;,")
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


def existing_count(path):
    try:
        return sum(1 for line in open(path, encoding="utf-8") if line.startswith('{"id"'))
    except OSError:
        return 0


def main():
    cache = sys.argv[sys.argv.index("--cache") + 1] if "--cache" in sys.argv else None
    no_fetch, force = "--no-fetch" in sys.argv, "--force" in sys.argv
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
                open(path, "w", encoding="utf-8").write(s)
            arts.append(a); misses = 0; print("%4d  %s" % (n, a["t"][:70]), flush=True)
        else:
            misses += 1
    arts.sort(key=lambda a: (-a["y"], -a["v"], -a["i"], -a["id"]))
    out = os.path.join(ROOT, "journal.js")
    before = existing_count(out)
    if not arts:
        sys.exit("Stopped: no articles found. journal.js was not changed.")
    if len(arts) < before and not force:
        sys.exit("Stopped: found %d articles but journal.js has %d. Nothing written; use --force if this is expected." % (len(arts), before))
    tmp = out + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write("/* Malaysian Cocoa Journal index. Generated by tools/update-journal.py from\n"
                "   mcj.koko.gov.my on %s. Do not edit by hand. */\n" % time.strftime("%Y-%m-%d"))
        f.write('var MCJ_READ = "%s";\nvar MCJ = [\n' % time.strftime("%Y-%m-%d"))
        f.write(",\n".join(json.dumps(a, ensure_ascii=False, separators=(",", ":")) for a in arts))
        f.write("\n];\n")
    os.replace(tmp, out)              # one step: never a half-written file
    print("%d articles written to journal.js (was %d)" % (len(arts), before))


if __name__ == "__main__":
    main()
