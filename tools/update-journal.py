#!/usr/bin/env python3
"""Rebuild journal.js from the Malaysian Cocoa Journal website.

    python3 tools/update-journal.py            # fetch everything, write journal.js
    python3 tools/update-journal.py --cache D  # keep/reuse downloaded pages in folder D
    python3 tools/update-journal.py --cache D --no-fetch   # build only from pages already in D

Reads each article page (ArticleDetail.aspx?ID=n) for its title, authors,
volume, date, abstract and keywords. PDFs are not downloaded: the app links
to them on mcj.koko.gov.my. Be gentle with the server; this takes a while.
"""
import gzip, html, json, os, re, sys, time, urllib.request

BASE = "https://mcj.koko.gov.my/ArticleDetail.aspx?ID=%d"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STOP_AFTER_MISSES = 25          # consecutive empty IDs before giving up

KEEP = ["RNAi", "MTT", "COALEX-1", "BALB/c", "3D", "GC/MS", "E-nose", "MCB's", "Bagan", "Datuk", "Cocoa-ABE", "Madai", "Kota", "Samarahan", "PAHs", "Snellen", "GC-MS/MS", "LC-MS/MS", "ADSI", "Nissui", "Excel", "ARM", "IAA", "RSM", "DNA", "RNA", "PCR", "SNP", "SNPs", "SSR", "CPB", "VSD", "UV", "HPLC", "GC-MS", "LC-MS", "FTIR", "NMR",
        "pH", "NPK", "IoT", "GIS", "MCB", "KKM", "ISO", "GMP", "HACCP", "DPPH", "FRAP", "ABTS", "ORAC", "PPO", "SME", "SMEs",
        "COVID-19", "II", "III", "IV", "L.", "E.", "QTL", "AFLP", "RAPD", "ELISA", "GAP", "IPM", "SIT", "F1", "UPLC", "SEM",
        "Malaysia", "Malaysian", "Malaysia's", "Malaysian's", "Sabah", "Sarawak", "Peninsular", "Borneo", "Asia", "Asian",
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
    m = re.search(r'<span id="ContentPlaceHolder1_%s">(.*?)</span>' % name, s, flags=re.S)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", m.group(1)))).strip() if m else ""


def parse(s, n):
    title = field(s, "labelTitle")
    if not title:
        return None
    kw, k = [], s.find(">Keywords<")
    if k > 0:
        seg = s[k:k + 8000]
        seg = seg[:seg.find("</div>", seg.find("<span class="))]
        kw = [re.sub(r"\s+", " ", html.unescape(x)).strip(" .;,") for x in re.findall(r"<span class='[^']*'>(.*?)</span>", seg)]
    vol = re.search(r"(\d+)\s*(?:\((\d+)\))?[\s/]+(\d{4})", field(s, "labelVol"))   # "Volume 13(1)/2021", "Volume 17 2025"
    if title.lower() == "article title" or not vol:
        return None                                                    # placeholder record
    authors = clean_authors(field(s, "labelAuthors"))
    if authors.lower().startswith("refer to"):
        authors = "Complete volume"                                    # a whole issue in one PDF
    return {"id": n, "t": sentence_case(title), "a": authors,
            "v": int(vol.group(1)), "i": int(vol.group(2) or 0), "y": int(vol.group(3)),
            "ab": field(s, "labelAbstract"), "kw": [x for x in kw if x]}


def fetch(n):
    req = urllib.request.Request(BASE % n, headers={"Accept-Encoding": "gzip", "User-Agent": "journal-index-builder"})
    with urllib.request.urlopen(req, timeout=45) as r:
        b = r.read()
        if r.headers.get("Content-Encoding") == "gzip":
            b = gzip.decompress(b)
    return b.decode("utf-8", "replace")


def main():
    cache = sys.argv[sys.argv.index("--cache") + 1] if "--cache" in sys.argv else None
    arts, misses, n = [], 0, 0
    while misses < STOP_AFTER_MISSES:
        n += 1
        path = os.path.join(cache, "%d.html" % n) if cache else None
        if path and os.path.exists(path) and os.path.getsize(path) > 0:
            s = open(path, errors="replace").read()
        elif "--no-fetch" in sys.argv:
            s = ""
        else:
            s = ""
            for attempt in range(2):
                try:
                    s = fetch(n); break
                except Exception as e:
                    print("  %d: %s" % (n, e), flush=True); time.sleep(3)
            if path and s:
                open(path, "w").write(s)
            time.sleep(0.5)
        a = parse(s, n) if s else None
        if a:
            arts.append(a); misses = 0; print("%4d  %s" % (n, a["t"][:70]), flush=True)
        else:
            misses += 1
    arts.sort(key=lambda a: (-a["y"], -a["v"], -a["i"], -a["id"]))
    with open(os.path.join(ROOT, "journal.js"), "w") as f:
        f.write("/* Malaysian Cocoa Journal index. Generated by tools/update-journal.py from\n"
                "   mcj.koko.gov.my on %s. Do not edit by hand. */\n" % time.strftime("%Y-%m-%d"))
        f.write('var MCJ_READ = "%s";\nvar MCJ = [\n' % time.strftime("%Y-%m-%d"))
        f.write(",\n".join(json.dumps(a, ensure_ascii=False, separators=(",", ":")) for a in arts))
        f.write("\n];\n")
    print("%d articles written to journal.js" % len(arts))


if __name__ == "__main__":
    main()
