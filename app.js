/* KokoLab — app logic. No build step; plain script. */
(function () {
"use strict";

var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

/* ── storage (falls back to memory when blocked) ── */
var mem = Object.create(null);
var store = {
  get: function (k) { try { var v = localStorage.getItem("kokolab." + k); return v === null ? mem[k] : v; } catch (e) { return mem[k]; } },
  set: function (k, v) { mem[k] = v; try { localStorage.setItem("kokolab." + k, v); } catch (e) {} },
  list: function (k) { try { var a = JSON.parse(store.get(k) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
};

/* ── language ── */
var LANGS = { en: "en", ms: "ms", zh: "zh-Hans" };
var LANG = store.get("lang");
var FIRST_LAUNCH = !Object.prototype.hasOwnProperty.call(LANGS, LANG);
if (FIRST_LAUNCH) LANG = "en";

var T = {
  en: {
    home: "Home", products: "Products", quiz: "Quiz", industry: "Industry", more: "More",
    heroEyebrow: "From lab to market", heroTitle: "<em>42</em> cocoa ideas in your pocket",
    heroText: "Sensors, biopesticides, skincare and chocolate from Malaysian Cocoa Board research. Tap, search and collect them all.",
    explore: "Explore products", surprise: "Surprise me",
    passport: "Cocoa passport", passportSub: "{n} of {t} products discovered", rank: ["Seedling", "Pod picker", "Fermenter", "Chocolatier"],
    cats: "Three collections", items: "{n} products", needs: "What are you looking for?",
    statLead: "more cocoa ground than grown", statText: "In 2025 Malaysia ground 294,697 tonnes of cocoa beans but harvested 268 tonnes.", statMore: "See the industry in numbers",
    quizTitle: "How well do you know your cocoa?", quizText: "Six quick questions from the booklet and the journal.", quizGo: "Play the quiz", best: "Best score: {n}/{t}",
    short: { A: "Farming", B: "Care", C: "Food" }, today: "Pick of the day", newest: "Not yet discovered", all: "All", seeAll: "See all",
    search: "Search products", saved: "Saved", count: "{n} products", none: "Nothing matches. Try a different word or clear the filters.", clear: "Clear filters",
    back: "Back", save: "Save", unsave: "Saved", share: "Share", page: "Booklet p. {n}", highlights: "Highlights", about: "About",
    health: "Benefits are as described in the Malaysian Cocoa Board's booklet. This is general information, not medical advice.",
    visit: "Open the portal", getApp: "Get it on Google Play", close: "Close", rightAns: "Correct answer: {a}", confirmReset: "Clear your discovered products and quiz score?", citeFail: "Could not copy. Select the text instead.", saveFor: "Save: {t}", readPaper: "Read the paper (ResearchGate)", related: "You may also like", prev: "Previous", next: "Next", copied: "Link copied", savedMsg: "Saved", removedMsg: "Removed",
    qStart: "Start", qNext: "Next question", qFinish: "See my score", qRight: "Correct!", qWrong: "Not quite.", qSee: "About this product", qSeeJ: "About this paper", qHideJ: "Hide paper", qHide: "Hide product", qBack: "Back to the question", qTry: "Not quite. Try another answer.", qShow: "Show the answer", qShown: "Here is the answer.", qRightRetry: "Correct this time!", qFirst: "Only a first-try answer scores, but keep going to learn the right one.",
    qDone: ["Keep exploring, the answers are all in the products.", "Good going. A few more products and you'll ace it.", "Excellent. You know your cocoa.", "Perfect score. A true chocolatier!"],
    qAgain: "Play again", qOf: "Question {n} of {t}", yourScore: "Your score",
    indTitle: "Cocoa in numbers", indLead: "Malaysia grows very little cocoa today, yet it remains one of the world's cocoa processing hubs.",
    tGrind: "tonnes ground, 2025", tProd: "tonnes of beans produced, 2025", tArea: "hectares planted, 2025", tSmall: "of planted area is smallholders", tExp: "cocoa exports, 2024",
    cProd: "Bean production fell from its 1990 peak", cProdS: "Tonnes of cocoa beans produced",
    cGrind: "Grinding grew about fiftyfold since 1980", cGrindS: "Tonnes of cocoa beans ground",
    cArea: "Planted area is slowly recovering from its 2020 low", cAreaS: "Hectares under cocoa",
    cExp: "Cocoa butter leads export earnings", cExpS: "Export value in 2024, RM million",
    table: "View as table", year: "Year", tonnes: "Tonnes", hectares: "Hectares", product: "Product", value: "RM million",
    prices: "Cocoa bean prices", pricesS: "Dry beans, RM per tonne, as listed on {d}. Prices change daily.", region: "Region", bulk: "Bulk", coop: "Cooperative", premium: "Premium",
    pricesNote: "Premium prices depend on offers, quality and the specific requirements of buyers or chocolate makers.", latestPrices: "Latest prices on koko.gov.my",
    source: "Source: Malaysian Cocoa Board statistics page (koko.gov.my), read on {d}.",
    mLang: "Language", mLangS: "English", mSaved: "Saved products", mSavedS: "{n} saved", mAbout: "About the Malaysian Cocoa Board", mAboutS: "Vision, mission and history",
    mDir: "Offices and research centres", mDirS: "{n} locations", mSite: "Official website", mSiteS: "koko.gov.my", mInstall: "Install this app", mInstallS: "Add KokoLab to your home screen",
    mReset: "Reset my passport", mResetS: "Clear discovered products and quiz score", resetDone: "Passport reset",
    aboutTitle: "Malaysian Cocoa Board", aboutLead: "Lembaga Koko Malaysia (LKM) is a federal statutory body under the Ministry of Plantation and Commodities, headquartered in Kota Kinabalu, Sabah.",
    vision: "Vision", mission: "Mission", functions: "What the Board does", history: "Milestones", unofficial: "Unofficial translation of the Malay original",
    dirTitle: "Offices & centres", dirLead: "Tap to call or open a location in your maps app. Names are shown as listed by the Board.", call: "Call", map: "Map", hq: "Head office", rd: "Research", unit: "Unit office",
    appNote: "KokoLab is an unofficial companion app. Product content and photos come from the Malaysian Cocoa Board's booklet \"From Lab to Market: R&D Products and Technologies\"; figures come from koko.gov.my and the journal index from mcj.koko.gov.my. For official information, contact the Board.",
    journal: "Journal", jTitle: "Malaysian Cocoa Journal", jLead: "{n} research papers from Volume {v0} ({y0}) to Volume {v1} ({y1}). Abstracts work offline; full papers open on mcj.koko.gov.my.",
    jSearch: "Search titles, authors, keywords", jCount: "{n} papers", jAllYears: "All years", jMore: "Show more", jSaved: "Reading list", jNone: "No papers match. Try a different word or clear the filters.",
    vol: "Vol. {v}", abstract: "Abstract", keywords: "Keywords", readPdf: "Read full paper (PDF)", cite: "Copy citation", cited: "Citation copied", jPage: "Journal page", jRelated: "Related papers",
    jProducts: "From lab to market", jProductsS: "MCB products connected to this research", research: "Research behind this", researchS: "Papers from the Malaysian Cocoa Journal on related work",
    latest: "Latest research", jNote: "Abstracts and papers are the copyright of the Malaysian Cocoa Journal and their authors. Full papers need an internet connection.", jEnOnly: "",
    topics: { pest: "Pests & diseases", breed: "Breeding & genetics", agro: "Soil & agronomy", proc: "Processing & chocolate", health: "Health & personal care", safety: "Safety & analysis", waste: "By-products", econ: "Economics & extension" },
    mPortals: "MCB portals and apps", mPortalsS: "{n} official links, one tap away", portalsLead: "Official Malaysian Cocoa Board sites. Each opens in your browser and needs an internet connection.", open: "Open", seeProduct: "About this in KokoLab", portalsHome: "Go to the source",
    mInd: "Cocoa in numbers", mIndS: "Production, grindings, exports and prices", mReads: "Reading list", mReadsS: "{n} papers saved",
    version: "This copy: {d}", newVer: "A new version is ready", refresh: "Refresh"
  },
  ms: {
    home: "Utama", products: "Produk", quiz: "Kuiz", industry: "Industri", more: "Lagi",
    heroEyebrow: "Dari makmal ke pasaran", heroTitle: "<em>42</em> idea koko dalam poket anda",
    heroText: "Penderia, biopestisid, penjagaan kulit dan coklat hasil penyelidikan Lembaga Koko Malaysia. Tekan, cari dan kumpul semuanya.",
    explore: "Teroka produk", surprise: "Kejutkan saya",
    passport: "Pasport koko", passportSub: "{n} daripada {t} produk ditemui", rank: ["Anak benih", "Pemetik buah", "Pemeram", "Chocolatier"],
    cats: "Tiga koleksi", items: "{n} produk", needs: "Apa yang anda cari?",
    statLead: "lebih banyak koko dikisar daripada ditanam", statText: "Pada 2025 Malaysia mengisar 294,697 tan biji koko tetapi hanya menuai 268 tan.", statMore: "Lihat industri dalam angka",
    quizTitle: "Sejauh mana anda kenal koko?", quizText: "Enam soalan ringkas daripada buku kecil dan jurnal LKM.", quizGo: "Main kuiz", best: "Markah terbaik: {n}/{t}",
    short: { A: "Ladang", B: "Jagaan", C: "Makanan" }, today: "Pilihan hari ini", newest: "Belum ditemui", all: "Semua", seeAll: "Lihat semua",
    search: "Cari produk", saved: "Disimpan", count: "{n} produk", none: "Tiada padanan. Cuba perkataan lain atau kosongkan tapisan.", clear: "Kosongkan tapisan",
    back: "Kembali", save: "Simpan", unsave: "Disimpan", share: "Kongsi", page: "Buku kecil ms. {n}", highlights: "Ciri utama", about: "Perihal",
    health: "Manfaat adalah seperti yang dinyatakan dalam buku kecil Lembaga Koko Malaysia. Ini maklumat umum, bukan nasihat perubatan.",
    visit: "Buka portal", getApp: "Dapatkan di Google Play", close: "Tutup", rightAns: "Jawapan betul: {a}", confirmReset: "Kosongkan produk ditemui dan markah kuiz anda?", citeFail: "Tidak dapat menyalin. Pilih teks secara manual.", saveFor: "Simpan: {t}", readPaper: "Baca kertas kajian (ResearchGate)", related: "Anda mungkin juga suka", prev: "Sebelum", next: "Seterusnya", copied: "Pautan disalin", savedMsg: "Disimpan", removedMsg: "Dibuang",
    qStart: "Mula", qNext: "Soalan seterusnya", qFinish: "Lihat markah saya", qRight: "Betul!", qWrong: "Kurang tepat.", qSee: "Perihal produk ini", qSeeJ: "Perihal kertas ini", qHideJ: "Sembunyikan kertas", qHide: "Sembunyikan produk", qBack: "Kembali ke soalan", qTry: "Kurang tepat. Cuba jawapan lain.", qShow: "Tunjukkan jawapan", qShown: "Inilah jawapannya.", qRightRetry: "Betul kali ini!", qFirst: "Hanya jawapan cubaan pertama dikira markah, tetapi teruskan untuk mengetahui jawapan yang betul.",
    qDone: ["Teruskan meneroka, semua jawapan ada dalam produk.", "Bagus. Teroka beberapa produk lagi untuk markah penuh.", "Cemerlang. Anda memang kenal koko.", "Markah penuh. Chocolatier sejati!"],
    qAgain: "Main lagi", qOf: "Soalan {n} daripada {t}", yourScore: "Markah anda",
    indTitle: "Koko dalam angka", indLead: "Malaysia kini menanam sedikit sahaja koko, namun kekal antara hab pemprosesan koko dunia.",
    tGrind: "tan dikisar, 2025", tProd: "tan biji koko dihasilkan, 2025", tArea: "hektar ditanam, 2025", tSmall: "keluasan tanaman ialah pekebun kecil", tExp: "eksport koko, 2024",
    cProd: "Pengeluaran biji koko merosot sejak kemuncak 1990", cProdS: "Tan biji koko dihasilkan",
    cGrind: "Pengisaran meningkat kira-kira lima puluh kali sejak 1980", cGrindS: "Tan biji koko dikisar",
    cArea: "Keluasan tanaman pulih perlahan-lahan sejak paras terendah 2020", cAreaS: "Hektar tanaman koko",
    cExp: "Lemak koko menerajui pendapatan eksport", cExpS: "Nilai eksport 2024, RM juta",
    table: "Lihat sebagai jadual", year: "Tahun", tonnes: "Tan", hectares: "Hektar", product: "Produk", value: "RM juta",
    prices: "Harga biji koko", pricesS: "Biji kering, RM setan, seperti disenaraikan pada {d}. Harga berubah setiap hari.", region: "Wilayah", bulk: "Pukal", coop: "Koperasi", premium: "Premium",
    pricesNote: "Harga premium bergantung pada tawaran, kualiti dan keperluan khusus pembeli atau pengeluar coklat.", latestPrices: "Harga terkini di koko.gov.my",
    source: "Sumber: halaman perangkaan Lembaga Koko Malaysia (koko.gov.my), dibaca pada {d}.",
    mLang: "Bahasa", mLangS: "Bahasa Melayu", mSaved: "Produk disimpan", mSavedS: "{n} disimpan", mAbout: "Perihal Lembaga Koko Malaysia", mAboutS: "Wawasan, misi dan sejarah",
    mDir: "Pejabat dan pusat penyelidikan", mDirS: "{n} lokasi", mSite: "Laman web rasmi", mSiteS: "koko.gov.my", mInstall: "Pasang aplikasi ini", mInstallS: "Tambah KokoLab ke skrin utama",
    mReset: "Set semula pasport saya", mResetS: "Kosongkan produk ditemui dan markah kuiz", resetDone: "Pasport diset semula",
    aboutTitle: "Lembaga Koko Malaysia", aboutLead: "Lembaga Koko Malaysia (LKM) ialah badan berkanun persekutuan di bawah Kementerian Perladangan dan Komoditi, beribu pejabat di Kota Kinabalu, Sabah.",
    vision: "Wawasan", mission: "Misi", functions: "Fungsi LKM", history: "Detik penting", unofficial: "",
    dirTitle: "Pejabat & pusat", dirLead: "Tekan untuk menelefon atau membuka lokasi dalam aplikasi peta anda.", call: "Telefon", map: "Peta", hq: "Ibu pejabat", rd: "Penyelidikan", unit: "Pejabat unit",
    appNote: "KokoLab ialah aplikasi pendamping tidak rasmi. Kandungan dan gambar produk diambil daripada buku kecil Lembaga Koko Malaysia \"From Lab to Market: R&D Products and Technologies\"; angka daripada koko.gov.my dan indeks jurnal daripada mcj.koko.gov.my. Terjemahan Bahasa Melayu adalah tidak rasmi. Untuk maklumat rasmi, hubungi LKM.",
    journal: "Jurnal", jTitle: "Malaysian Cocoa Journal", jLead: "{n} kertas penyelidikan dari Jilid {v0} ({y0}) hingga Jilid {v1} ({y1}). Abstrak boleh dibaca luar talian; kertas penuh dibuka di mcj.koko.gov.my.",
    jSearch: "Cari tajuk, penulis, kata kunci", jCount: "{n} kertas", jAllYears: "Semua tahun", jMore: "Papar lagi", jSaved: "Senarai bacaan", jNone: "Tiada kertas yang sepadan. Cuba perkataan lain atau kosongkan tapisan.",
    vol: "Jil. {v}", abstract: "Abstrak", keywords: "Kata kunci", readPdf: "Baca kertas penuh (PDF)", cite: "Salin sitasi", cited: "Sitasi disalin", jPage: "Halaman jurnal", jRelated: "Kertas berkaitan",
    jProducts: "Dari makmal ke pasaran", jProductsS: "Produk LKM yang berkaitan dengan penyelidikan ini", research: "Penyelidikan di sebaliknya", researchS: "Kertas daripada Malaysian Cocoa Journal tentang kerja berkaitan",
    latest: "Penyelidikan terkini", jNote: "Abstrak dan kertas ialah hak cipta Malaysian Cocoa Journal dan penulisnya. Kertas penuh memerlukan sambungan internet.", jEnOnly: "Jurnal ini diterbitkan dalam Bahasa Inggeris.",
    topics: { pest: "Perosak & penyakit", breed: "Pembiakbakaan & genetik", agro: "Tanah & agronomi", proc: "Pemprosesan & coklat", health: "Kesihatan & penjagaan diri", safety: "Keselamatan & analisis", waste: "Hasil sampingan", econ: "Ekonomi & pengembangan" },
    mPortals: "Portal dan aplikasi LKM", mPortalsS: "{n} pautan rasmi, satu tekan sahaja", portalsLead: "Laman rasmi Lembaga Koko Malaysia. Setiap satu dibuka dalam pelayar anda dan memerlukan sambungan internet.", open: "Buka", seeProduct: "Perihal ini dalam KokoLab", portalsHome: "Terus ke sumber",
    mInd: "Koko dalam angka", mIndS: "Pengeluaran, pengisaran, eksport dan harga", mReads: "Senarai bacaan", mReadsS: "{n} kertas disimpan",
    version: "Salinan ini: {d}", newVer: "Versi baharu sudah sedia", refresh: "Muat semula"
  }
};
if (typeof ZH !== "undefined") T.zh = ZH.ui;
function t(k, v) {
  if (!T[LANG]) LANG = "en";
  var s = T[LANG][k]; if (s === undefined) s = T.en[k];
  if (v && typeof s === "string") for (var x in v) s = s.replace("{" + x + "}", v[x]);
  return s;
}
function L(o) { return o == null ? "" : (typeof o === "string" ? o : (o[LANG] !== undefined ? o[LANG] : o.en)); }
function num(n) { return Number(n).toLocaleString("en-MY"); }
function fmtDate(iso) {
  var d = new Date(iso + "T00:00:00");
  try { return d.toLocaleDateString(LANG === "ms" ? "ms-MY" : LANG === "zh" ? "zh-CN" : "en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return iso; }
}

/* ── state ── */
var byId = Object.create(null); PRODUCTS.forEach(function (p) { byId[p.id] = p; });
var seen = store.list("seen").filter(function (id) { return byId[id]; });
var favs = store.list("favs").filter(function (id) { return byId[id]; });
var filt = { cat: "", tag: "", q: "", saved: false };

/* ── journal index ── */
var ART = (typeof MCJ !== "undefined" ? MCJ : []), artById = Object.create(null);
var TOPIC_RX = {
  pest: /pod borer|pest|disease|black pod|vsd|dieback|phytophthora|helopeltis|insect|fung|biocontrol|biological control|pathogen|infestation|mirid|rodent|\bweeds?\b/,
  breed: /clone|clonal|genotyp|genetic|breeding|snp|marker|dna|heritab|germplasm|genom|progeny|hybrid|incompatib|tissue culture|somatic|pollinat/,
  agro: /soil|fertili|nutrient|planting(?! material)|agronom|shade|irrigation|seedling|plantlet|biochar|compost|pruning|climate|intercrop|integration|growth promot|biostimulant|rootstock|grafting/,
  proc: /ferment|drying|roast|chocolate|cocoa butter|cocoa powder|flavou?r|processing|praline|ice cream|texture|sensory|melting|conch|couverture|spray dry|beverage|bean quality/,
  health: /antioxidant|polyphenol|health|skin|cosmetic|nutrition|blood|therapeutic|wound|flavonoid|rats|clinical|anti-|cytotoxic|cancer|obes|diabet|hair|facial/,
  safety: /cadmium|residue|pesticide|heavy metal|contamina|mycotoxin|validation|ochratoxin|hydrocarbon|microbiolog|food safety|regulation|salmonella|colony|detection method|authentic|adulterat/,
  waste: /pod husk|cocoa shell|bean shell|by-product|waste|pectin|pulp|\bleaf\b|\bleaves\b|activated carbon|husk/,
  econ: /econom|market|extension|farmer|smallholder|adoption|socio|cost|income|trade|technology transfer|survey|consumer|entrepreneur|price|export|policy|sustainab/
};
ART.forEach(function (x) {
  artById[x.id] = x;
  x.hay = (x.t + " " + x.kw.join(" ")).toLowerCase();
  x.full = (x.hay + " " + x.a + " " + x.ab + " " + x.y).toLowerCase();
  x.tp = Object.keys(TOPIC_RX).filter(function (k) { return TOPIC_RX[k].test(x.hay); });
});
var YEARS = ART.map(function (x) { return x.y; }).filter(function (y, i, arr) { return arr.indexOf(y) === i; }).sort(function (p, q) { return q - p; });
var reads = store.list("reads").filter(function (id) { return artById[id]; });
var jf = { q: "", y: 0, tp: "", saved: false }, jShown = 30;
/* which papers sit behind which product (matched on title + keywords) */
var PRODUCT_RX = {
  terraprobe: /soil moisture|internet of things|\biot\b/, agrosense: /soil nutrient|internet of things|\biot\b|\bsensors?\b/, atipm: /pod borer/, hyfer: /\bfertili[sz]ers?\b|zeolite/,
  croped: /pest|disease/, geococoa: /mapping|\bgis\b|spatial/, biocontrol: /biocontrol|biological control|biopesticide|black pod/, biochar: /biochar/,
  cocoamat: /harvesting tool|harvester/, carbon: /activated carbon/, diet: /artificial diet|sterile insect|rearing/, bioaction: /endophytic/,
  bioshield: /biofertili[sz]er|water stress|drought|flood/, kokocorrect: /genotyping|snp|molecular marker|clone identification|fingerprint/, kokoselect: /snp|genomic selection|marker-assisted/,
  lipstick: /lipstick|lip balm/, moisturizer: /moisturi[sz]|skin/, cleanser: /cleanser|skin/, toner: /toner|skin/, scrub: /scrub/, antiwrinkle: /wrinkle|anti-ag|skin/,
  footcream: /foot|skin crack/, footscrub: /foot|scrub/, shampoo: /shampoo|hair|dandruff/, barshampoo: /shampoo|hair|dandruff/, conditioner: /conditioner|hair/, barconditioner: /conditioner|hair/,
  antidandruff: /dandruff|pectin|hair/, skincare: /skin|cosmetic|acne/, energybar: /energy bar|kelulut|sacha inchi/, singleorigin: /single origin|bean-to-bar|flavou?r profile/,
  kacipfatimah: /kacip fatimah|labisia/, tongkatali: /tongkat ali|eurycoma/, gulakelapa: /coconut sugar|sweetener/, icecream: /ice cream/, greencoa: /cocoa leaves|theobroma cacao leaves|leaf tea/,
  flavint: /polyphenol|chewable/, spread: /\bspreads?\b/, probiotic: /probiotic/, keto: /sugar[- ]free|keto/, polyphenol: /polyphenol|antioxidant/, husk: /bean shell|cocoa shell|antibacterial|antimicrobial/
};
function papersFor(pid) {   /* title matches first, then keyword-only matches; newest first within each */
  var rx = PRODUCT_RX[pid]; if (!rx) return [];
  var hits = ART.filter(function (x) { return rx.test(x.hay); });
  var inTitle = hits.filter(function (x) { return rx.test(x.t.toLowerCase()); });
  return inTitle.concat(hits.filter(function (x) { return inTitle.indexOf(x) < 0; })).slice(0, 4);
}
function productsFor(x) { return PRODUCTS.filter(function (p) { return PRODUCT_RX[p.id] && p.id !== "croped" && PRODUCT_RX[p.id].test(x.hay); }).slice(0, 6); }
function volLabel(x) { return t("vol", { v: x.v + (x.i ? "(" + x.i + ")" : "") }) + " · " + x.y; }
function arow(x) {
  var on = reads.indexOf(x.id) >= 0;
  return '<article class="card arow"><a href="#/a/' + x.id + '"><span class="pill">' + volLabel(x) + "</span><h3>" + esc(x.t) + "</h3><p>" + esc(x.a) + "</p></a>" +
    '<button class="fav" type="button" data-read="' + x.id + '" aria-pressed="' + on + '" aria-label="' + esc(t("saveFor", { t: x.t })) + '">' + I.mark + "</button></article>";
}
function jMatches(x) {
  if (jf.y && x.y !== jf.y) return false;
  if (jf.tp && x.tp.indexOf(jf.tp) < 0) return false;
  if (jf.saved && reads.indexOf(x.id) < 0) return false;
  if (jf.q) return jf.q.toLowerCase().split(/\s+/).every(function (w) { return x.full.indexOf(w) >= 0; });
  return true;
}
function jListHtml() {
  var list = ART.filter(jMatches);
  if (!list.length) return '<div class="empty"><p>' + t("jNone") + '</p><p style="margin-top:14px"><button class="btn soft" type="button" data-jclear>' + t("clear") + "</button></p></div>";
  return '<p class="count">' + t("jCount", { n: list.length }) + '</p><div class="list">' + list.slice(0, jShown).map(arow).join("") + "</div>" +
    (list.length > jShown ? '<p style="text-align:center;margin-top:16px"><button class="btn soft" type="button" data-jmore>' + t("jMore") + "</button></p>" : "");
}
function jChipsHtml() {
  return '<button class="chip" type="button" data-jsaved aria-pressed="' + jf.saved + '">' + t("jSaved") + "</button>" + Object.keys(TOPIC_RX).map(function (k) {
    return '<button class="chip" type="button" data-jtp="' + k + '" aria-pressed="' + (jf.tp === k) + '">' + esc(t("topics")[k]) + "</button>";
  }).join("");
}
function jYearsHtml() {
  return [0].concat(YEARS).map(function (y) { return '<button class="chip" type="button" data-jy="' + y + '" aria-pressed="' + (jf.y === y) + '">' + (y || t("jAllYears")) + "</button>"; }).join("");
}
function vJournal() {
  if (!ART.length) return '<div class="page"><h1>' + t("jTitle") + "</h1></div>";
  var first = ART[ART.length - 1], last = ART[0];
  return '<div class="page"><h1>' + t("jTitle") + '</h1><p class="lead">' + t("jLead", { n: ART.length, v0: first.v, y0: first.y, v1: last.v, y1: last.y }) + (t("jEnOnly") ? " " + t("jEnOnly") : "") + "</p></div>" +
    '<div class="filters" style="margin-top:14px"><label class="search">' + I.search + '<input id="jq" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(t("jSearch")) + '" aria-label="' + esc(t("jSearch")) + '" value="' + esc(jf.q) + '"></label>' +
    '<div class="rowscroll" id="jyears">' + jYearsHtml() + '</div><div class="rowscroll" id="jchips">' + jChipsHtml() + '</div></div><div id="jlist">' + jListHtml() + '</div><p class="note sect">' + t("jNote") + '</p><p style="margin-top:14px"><a class="btn soft" href="https://mcj.koko.gov.my/" target="_blank" rel="noopener">' + I.link + "mcj.koko.gov.my</a></p>";
}
function jRefresh() { $("#jlist").innerHTML = jListHtml(); $("#jyears").innerHTML = jYearsHtml(); $("#jchips").innerHTML = jChipsHtml(); }
function copyText(text, okMsg) {
  var legacy = function () {
    var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta); ta.select(); var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta); snack(ok ? okMsg : t("citeFail"));
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { snack(okMsg); }, legacy); else legacy();
}
function citation(x) { return x.a + " (" + x.y + "). " + x.t + ". Malaysian Cocoa Journal, " + x.v + (x.i ? "(" + x.i + ")" : "") + ". https://mcj.koko.gov.my/ArticleDetail.aspx?ID=" + x.id; }
function vArticle(id) {
  var x = artById[id];
  if (!x) return vJournal();
  var on = reads.indexOf(x.id) >= 0, prods = productsFor(x);
  var rel = ART.filter(function (o) { return o !== x; }).map(function (o) {
    var s = 0; o.kw.forEach(function (k) { if (x.kw.some(function (q) { return q.toLowerCase() === k.toLowerCase(); })) s += 2; });
    o.tp.forEach(function (k) { if (x.tp.indexOf(k) >= 0) s += 1; });
    return [s, o];
  }).filter(function (p) { return p[0] >= 2; }).sort(function (p, q) { return q[0] - p[0]; }).slice(0, 4).map(function (p) { return p[1]; });
  return '<a class="back" href="#/journal">← ' + t("journal") + '</a><article class="paper"><span class="pill">Malaysian Cocoa Journal · ' + volLabel(x) + "</span>" +
    "<h1>" + esc(x.t) + '</h1><p class="sub">' + esc(x.a) + "</p>" +
    '<div class="actions"><a class="btn" href="https://mcj.koko.gov.my/ViewPDF.aspx?ID=' + x.id + '" target="_blank" rel="noopener">' + I.link + t("readPdf") + "</a>" +
    '<button class="btn ' + (on ? "" : "soft") + '" type="button" id="aread" aria-pressed="' + on + '">' + I.mark + "<span>" + t(on ? "unsave" : "save") + "</span></button>" +
    '<button class="btn soft" type="button" id="acite">' + t("cite") + '</button><button class="btn soft" type="button" id="ashare">' + I.share + t("share") + "</button></div>" +
    (x.ab ? "<h2>" + t("abstract") + '</h2><p class="abs">' + esc(x.ab) + "</p>" : "") +
    (x.kw.length ? "<h2>" + t("keywords") + '</h2><div class="needs">' + x.kw.map(function (k) { return '<a class="chip" href="#/journal" data-jkw="' + esc(k) + '">' + esc(k) + "</a>"; }).join("") + "</div>" : "") +
    '<p style="margin-top:18px"><a class="more" href="https://mcj.koko.gov.my/ArticleDetail.aspx?ID=' + x.id + '" target="_blank" rel="noopener">' + t("jPage") + " ↗</a></p></article>" +
    (prods.length ? '<section class="sect"><div class="secthead"><h2>' + t("jProducts") + '</h2></div><p class="lead" style="margin:-6px 0 12px;color:var(--muted)">' + t("jProductsS") + '</p><div class="hscroll">' + prods.map(card).join("") + "</div></section>" : "") +
    (rel.length ? '<section class="sect"><h2>' + t("jRelated") + '</h2><div class="list">' + rel.map(arow).join("") + "</div></section>" : "");
}
var scrolls = {};
var lastRoute = "", started = false;
var deferredInstall = null;

/* ── icons ── */
var I = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>',
  products: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.500"/><rect x="14" y="3" width="7" height="7" rx="1.500"/><rect x="3" y="14" width="7" height="7" rx="1.500"/><rect x="14" y="14" width="7" height="7" rx="1.500"/></svg>',
  quiz: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.500 9.300a2.600 2.600 0 115 .9c0 1.700-2.500 2-2.500 3.800M12 17.300v.2"/></svg>',
  industry: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-8M21 20H3"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.300"/><circle cx="12" cy="12" r="1.300"/><circle cx="19" cy="12" r="1.300"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20.500s-7.500-4.600-7.500-10.200A4.300 4.300 0 0112 7.600a4.300 4.300 0 017.500 2.700c0 5.600-7.500 10.200-7.500 10.200z" stroke-linejoin="round"/></svg>',
  mark: '<svg viewBox="0 0 24 24"><path d="M6 3.500h12v17l-6-4.500-6 4.500z" stroke-linejoin="round"/></svg>',
  journal: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 012-2h13v15H6a2 2 0 00-2 2zM4 20a2 2 0 002 2h13v-4M8 7.500h7M8 11h7"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="M12 15V3M8 7l4-4 4 4M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.500-3.500"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.500 3 14.500 0 18M12 3c-3 3.500-3 14.500 0 18"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.200-7-11.500a7 7 0 0114 0C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.2"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/></svg>',
  down: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 11l5 5 5-5M4 20h16"/></svg>',
  reset: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 108-8H7M10 1L7 4l3 3"/></svg>',
  pod: '<svg viewBox="0 0 64 64" aria-hidden="true"><g transform="rotate(35 32 32)"><path d="M32 6c11 7 14 17 14 26S43 51 32 58c-11-7-14-17-14-26S21 13 32 6z" fill="currentColor" opacity=".9"/><path d="M32 9v46M25 15c-3 11-3 23 0 34M39 15c3 11 3 23 0 34" stroke="var(--paper)" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/></g></svg>'
};

/* ── small helpers ── */
var snackTimer;
function snack(msg) { var s = $("#snack"); s.textContent = msg; s.hidden = false; clearTimeout(snackTimer); snackTimer = setTimeout(function () { s.hidden = true; }, 1800); }
function inCat(c) { return PRODUCTS.filter(function (p) { return p.cat === c; }); }
function thumb(p, cls) {
  return p.img ? '<img src="./img/' + p.img + '.webp" alt="" loading="lazy" decoding="async"' + (cls ? ' class="' + cls + '"' : "") + ">"
               : '<div class="ph" style="color:var(--c)">' + I.pod + "</div>";
}
function card(p) {
  var fav = favs.indexOf(p.id) >= 0;
  return '<article class="card pcard cat-' + p.cat + '"><a href="#/p/' + p.id + '">' + thumb(p) +
    '<div class="body"><span class="pill">' + esc(L(CATS[p.cat])) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(L(p.sub)) + "</p></div></a>" +
    (seen.indexOf(p.id) >= 0 ? '<span class="seen" aria-hidden="true">✓</span>' : "") +
    '<button class="fav" type="button" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="' + esc(t("save")) + ": " + esc(p.name) + '">' + I.heart + "</button></article>";
}
function toggleFav(id) {
  var i = favs.indexOf(id);
  if (i >= 0) favs.splice(i, 1); else favs.push(id);
  store.set("favs", JSON.stringify(favs));
  snack(i >= 0 ? t("removedMsg") : t("savedMsg"));
  return i < 0;
}
function rankOf(n) { return n >= PRODUCTS.length ? 3 : n >= 25 ? 2 : n >= 10 ? 1 : 0; }
function dayIndex() { var d = new Date(); return (d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % PRODUCTS.length; }

/* ── views ── */
function vHome() {
  var withImg = PRODUCTS.filter(function (p) { return p.img; });
  var pick = withImg[dayIndex() % withImg.length];
  var fresh = PRODUCTS.filter(function (p) { return seen.indexOf(p.id) < 0 && p.id !== pick.id; }).slice(0, 8);
  if (!fresh.length) fresh = PRODUCTS.filter(function (p) { return p.id !== pick.id; }).slice(0, 8);
  var pct = Math.round(seen.length / PRODUCTS.length * 100);
  var best = +store.get("best") || 0;
  var catImg = { A: "terraprobe", B: "moisturizer", C: "singleorigin" };
  return '<section class="hero"><img src="./img/hero.webp" alt="">' +
    '<span class="eyebrow">' + t("heroEyebrow") + "</span><h1>" + t("heroTitle") + "</h1><p>" + t("heroText") + "</p>" +
    '<div class="row"><a class="btn" href="#/products" data-reset>' + t("explore") + '</a><button class="btn ghost" type="button" data-surprise>' + t("surprise") + "</button></div></section>" +

    '<a class="card passport" href="#/products" data-reset><span class="ring" style="--p:' + pct + '">' + seen.length + "/" + PRODUCTS.length + "</span>" +
    "<span><b>" + t("passport") + " · " + t("rank")[rankOf(seen.length)] + "</b><small>" + t("passportSub", { n: seen.length, t: PRODUCTS.length }) + "</small></span></a>" +

    '<section class="sect"><h2>' + t("cats") + '</h2><div class="cats">' + ["A", "B", "C"].map(function (c) {
      return '<a class="catcard k-' + c + '" href="#/products" data-cat="' + c + '"><img src="./img/' + catImg[c] + '.webp" alt="" loading="lazy"><span class="big" aria-hidden="true">' + c + "</span>" +
        "<h3>" + esc(L(CATS[c])) + "</h3><small>" + t("items", { n: inCat(c).length }) + "</small></a>";
    }).join("") + "</div></section>" +

    '<section class="sect"><h2>' + t("needs") + '</h2><div class="needs">' + Object.keys(TAGS).map(function (k) {
      return '<a class="chip" href="#/products" data-tag="' + k + '">' + esc(L(TAGS[k])) + "</a>";
    }).join("") + "</div></section>" +

    '<section class="sect"><div class="secthead"><h2>' + t("today") + '</h2></div><div class="duo">' +
      '<a class="card pcard pick cat-' + pick.cat + '" href="#/p/' + pick.id + '">' +
        '<img src="./img/' + pick.img + '.webp" alt="">' +
        '<div class="body"><span class="pill">' + esc(L(CATS[pick.cat])) + "</span><h3>" + esc(pick.name) + "</h3><p>" + esc(L(pick.sub)) + "</p></div></a>" +
      '<div class="card quizcard"><h3>' + t("quizTitle") + "</h3><p>" + t("quizText") + (best ? " " + t("best", { n: best, t: QUIZ_LEN }) : "") + '</p><a class="btn" href="#/quiz">' + t("quizGo") + "</a></div>" +
    "</div></section>" +

    (ART.length ? '<section class="sect"><div class="secthead"><h2>' + t("latest") + '</h2><a class="more" href="#/journal" data-jreset>' + t("jCount", { n: ART.length }) + ' →</a></div><div class="list">' + ART.slice(0, 3).map(arow).join("") + "</div></section>" : "") +

    '<section class="sect"><a class="card stat" href="#/industry"><div class="num">1,100×</div><p><b>' + t("statLead") + "</b></p><p>" + t("statText") + "</p><small>" + t("statMore") + " →</small></a></section>" +

    '<section class="sect"><div class="secthead"><h2>' + t("portalsHome") + '</h2><a class="more" href="#/portals">' + t("seeAll") + '</a></div><div class="needs">' + PORTALS.map(function (o) {
      return '<a class="chip" href="' + o.u + '" target="_blank" rel="noopener">' + esc(o.n) + " ↗</a>";
    }).join("") + "</div></section>" +

    '<section class="sect"><div class="secthead"><h2>' + t("newest") + '</h2><a class="more" href="#/products" data-reset>' + t("seeAll") + '</a></div><div class="hscroll">' + fresh.map(card).join("") + "</div></section>" +
    footer();
}

function footer() {
  var d = new Date(document.lastModified), p = function (n) { return (n < 10 ? "0" : "") + n; };
  var stamp = isNaN(d) ? "" : d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  return '<footer class="foot"><p>' + esc(t("appNote")) + "</p>" + (stamp ? "<p>" + t("version", { d: stamp }) + "</p>" : "") + "</footer>";
}

function matches(p) {
  if (filt.cat && p.cat !== filt.cat) return false;
  if (filt.tag && p.tags.indexOf(filt.tag) < 0) return false;
  if (filt.saved && favs.indexOf(p.id) < 0) return false;
  if (filt.q) {
    var hay = p.hay || (p.hay = [p.name].concat(["en", "ms", "zh"].map(function (l) {
      return [p.sub[l], p.desc && p.desc[l], (p.pts[l] || []).join(" "), CATS[p.cat][l]].join(" ");
    })).join(" ").toLowerCase());
    return filt.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }
  return true;
}
function gridHtml() {
  var list = PRODUCTS.filter(matches);
  if (!list.length) return '<div class="empty"><p>' + t("none") + '</p><p style="margin-top:14px"><button class="btn soft" type="button" data-clear>' + t("clear") + "</button></p></div>";
  return '<p class="count">' + t("count", { n: list.length }) + '</p><div class="grid">' + list.map(card).join("") + "</div>";
}
function chipsHtml() {
  var keys = Object.keys(TAGS).filter(function (k) { return !filt.cat || !TAGS[k].cat || TAGS[k].cat === filt.cat; });
  return '<button class="chip" type="button" data-saved aria-pressed="' + filt.saved + '">♥ ' + t("saved") + "</button>" + keys.map(function (k) {
    return '<button class="chip" type="button" data-tagf="' + k + '" aria-pressed="' + (filt.tag === k) + '">' + esc(L(TAGS[k])) + "</button>";
  }).join("");
}
function vProducts() {
  return '<div class="filters"><label class="search">' + I.search + '<input id="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(t("search")) + '" aria-label="' + esc(t("search")) + '" value="' + esc(filt.q) + '"></label>' +
    '<div class="seg" id="seg">' + [""].concat(["A", "B", "C"]).map(function (c) {
      return '<button type="button" data-catf="' + c + '" aria-pressed="' + (filt.cat === c) + '">' + (c ? esc(t("short")[c]) : t("all")) + "</button>";
    }).join("") + '</div><div class="rowscroll" id="chips">' + chipsHtml() + '</div></div><div id="grid">' + gridHtml() + "</div>";
}
function refreshGrid(chipsToo) {
  $("#grid").innerHTML = gridHtml();
  if (chipsToo) $("#chips").innerHTML = chipsHtml();
  $$("#seg button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-catf") === filt.cat); });
}

function vDetail(id) {
  var p = byId[id];
  if (!p) return vProducts();
  if (seen.indexOf(id) < 0) { seen.push(id); store.set("seen", JSON.stringify(seen)); }
  var sib = inCat(p.cat), i = sib.indexOf(p), prev = sib[i - 1], next = sib[i + 1];
  var fav = favs.indexOf(id) >= 0, pts = p.pts[LANG] || p.pts.en;
  var rel = PRODUCTS.filter(function (o) { return o.id !== id && o.tags.some(function (g) { return p.tags.indexOf(g) >= 0; }); }).slice(0, 6);
  var shots = [p.img, p.img2].filter(Boolean).map(function (s) { return '<img src="./img/' + s + '.webp" alt="' + esc(p.name) + '">'; }).join("");
  return '<a class="back" href="#/products">← ' + t("products") + '</a><article class="detail cat-' + p.cat + '">' +
    '<div class="media">' + (shots ? '<div class="shots">' + shots + "</div>" : '<div class="ph" style="color:var(--c)">' + I.pod + "</div>") + "</div><div>" +
    '<span class="pill">' + esc(L(CATS[p.cat])) + " · " + p.n + "/" + sib.length + "</span><h1>" + esc(p.name) + '</h1><p class="sub">' + esc(L(p.sub)) + "</p>" +
    '<div class="actions"><button class="btn ' + (fav ? "" : "soft") + '" type="button" id="dfav" aria-pressed="' + fav + '">' + I.heart + "<span>" + t(fav ? "unsave" : "save") + "</span></button>" +
    '<button class="btn soft" type="button" id="dshare">' + I.share + t("share") + "</button>" +
    (p.link ? '<a class="btn soft" href="' + p.link + '" target="_blank" rel="noopener">' + I.link + t(p.linkApp ? "getApp" : p.linkPaper ? "readPaper" : "visit") + "</a>" : "") + "</div>" +
    (p.desc ? '<p class="desc">' + esc(L(p.desc)) + "</p>" : "") +
    (pts.length ? "<h2>" + t("highlights") + '</h2><ul class="pts">' + pts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
    (p.cat !== "A" ? '<p class="note">' + t("health") + "</p>" : "") +
    '<p class="eyebrow" style="margin-top:16px">' + t("page", { n: p.page }) + "</p></div></article>" +
    (function () { var ps = papersFor(id); return ps.length ? '<section class="sect"><h2>' + t("research") + '</h2><p class="lead" style="margin:-6px 0 12px;color:var(--muted)">' + t("researchS") + '</p><div class="list">' + ps.map(arow).join("") + "</div></section>" : ""; })() +
    (rel.length ? '<section class="sect"><h2>' + t("related") + '</h2><div class="hscroll">' + rel.map(card).join("") + "</div></section>" : "") +
    '<nav class="pager">' + (prev ? '<a class="card" href="#/p/' + prev.id + '"><small>← ' + t("prev") + "</small><b>" + esc(prev.name) + "</b></a>" : "<span></span>") +
    (next ? '<a class="card" href="#/p/' + next.id + '"><small>' + t("next") + " →</small><b>" + esc(next.name) + "</b></a>" : "<span></span>") + "</nav>";
}

/* ── quiz ── */
var QUIZ_LEN = 6, qz = null;
function quizRound() {   /* four booklet questions and two journal ones, mixed */
  var jq = (typeof QUIZ_J !== "undefined" ? QUIZ_J : []).filter(function (q) { return artById[q.j]; });
  var nj = Math.min(2, jq.length);
  return shuffle(shuffle(QUIZ).slice(0, QUIZ_LEN - nj).concat(shuffle(jq).slice(0, nj)));
}
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function vQuiz() {
  if (!qz) {
    var best = +store.get("best") || 0;
    return '<div class="quiz"><div class="card qintro"><span style="color:var(--gold)">' + I.pod.replace("<svg", '<svg width="84" height="84"') + "</span><h1>" + t("quizTitle") + "</h1><p>" + t("quizText") + "</p>" +
      (best ? '<p class="eyebrow">' + t("best", { n: best, t: QUIZ_LEN }) + "</p>" : "") + '<button class="btn" type="button" data-qstart>' + t("qStart") + "</button></div></div>";
  }
  if (qz.i >= qz.qs.length) {
    var s = qz.res.filter(Boolean).length, tier = s === QUIZ_LEN ? 3 : s >= 4 ? 2 : s >= 2 ? 1 : 0;
    return '<div class="quiz"><div class="card qintro"><p class="eyebrow">' + t("yourScore") + '</p><div class="score">' + s + "/" + QUIZ_LEN + "</div><p>" + t("qDone")[tier] + "</p>" +
      '<div class="dots" style="width:100%">' + qz.res.map(function (r) { return '<i class="' + (r ? "ok" : "no") + '"></i>'; }).join("") + "</div>" +
      '<button class="btn" type="button" data-qstart>' + t("qAgain") + '</button><a class="btn soft" href="#/products" data-reset>' + t("explore") + "</a></div></div>";
  }
  var q = qz.qs[qz.i], opts = Array.isArray(q.o) ? q.o : L(q.o), done = qz.solved || qz.shown, wrong = qz.tried.length > 0;
  var msg = qz.solved ? (wrong ? t("qRightRetry") : t("qRight")) : qz.shown ? t("qShown") : wrong ? t("qTry") : "";
  return '<div class="quiz"><p class="eyebrow">' + t("qOf", { n: qz.i + 1, t: QUIZ_LEN }) + '</p><div class="dots">' + qz.qs.map(function (_, k) {
      return '<i class="' + (k < qz.res.length ? (qz.res[k] ? "ok" : "no") : k === qz.i ? "now" : "") + '"></i>';
    }).join("") + '</div><p class="qtext">' + esc(L(q.q)) + '</p><div class="opts">' + opts.map(function (o, k) {
      var miss = qz.tried.indexOf(k) >= 0, cls = done && k === q.a ? "ok" : miss ? "no" : "";
      return '<button type="button" data-opt="' + k + '" class="' + cls + '"' + (done || miss ? " disabled" : "") + "><span>" + "ABCD"[k] + "</span>" + esc(o) +
        (done && k === q.a ? '<span class="sr"> ✓</span>' : miss ? '<span class="sr"> ✗</span>' : "") + "</button>";
    }).join("") + '</div><div class="qfoot">' +
      (msg ? '<b style="color:var(--' + (qz.solved ? "good" : qz.shown ? "muted" : "bad") + ')">' + msg + "</b>" : "<span></span>") +
      '<span class="qbtns">' +
      (!done && wrong ? '<button class="btn soft" type="button" data-qshow>' + t("qShow") + "</button>" : "") +
      (done && (q.p || q.j) ? '<button class="btn soft" type="button" data-qpanel aria-expanded="' + qz.open + '" aria-controls="qpanel">' + t(q.j ? (qz.open ? "qHideJ" : "qSeeJ") : (qz.open ? "qHide" : "qSee")) + "</button>" : "") +
      (done ? '<button class="btn" type="button" data-qnext>' + t(qz.i === QUIZ_LEN - 1 ? "qFinish" : "qNext") + "</button>" : "") + "</span></div>" +
      (wrong && !done ? '<p class="qhint">' + t("qFirst") + "</p>" : "") +
      (done && qz.open ? (q.j ? qPaper(artById[q.j]) : q.p ? qPanel(byId[q.p]) : "") : "") + "</div>";
}
/* the journal paper behind a question, opened in place */
function qPaper(x) {
  var on = reads.indexOf(x.id) >= 0;
  return '<section class="card qpanel qpaper" id="qpanel" tabindex="-1" aria-label="' + esc(x.t) + '">' +
    '<button class="qx" type="button" data-qpanel aria-label="' + esc(t("close")) + '">✕</button>' +
    '<div class="qphead"><div><span class="pill">Malaysian Cocoa Journal · ' + volLabel(x) + "</span><h2>" + esc(x.t) + "</h2><p>" + esc(x.a) + "</p></div></div>" +
    (x.ab ? '<p class="desc">' + esc(x.ab) + "</p>" : "") +
    '<div class="actions"><a class="btn soft" href="https://mcj.koko.gov.my/ViewPDF.aspx?ID=' + x.id + '" target="_blank" rel="noopener">' + I.link + t("readPdf") + "</a>" +
    '<button class="btn soft" type="button" data-read="' + x.id + '" aria-pressed="' + on + '">' + I.mark + t("jSaved") + "</button></div>" +
    '<p style="text-align:center;margin-top:6px"><button class="btn soft" type="button" data-qpanel>' + t("qBack") + "</button></p></section>";
}
/* the product behind a question, opened in place so the quiz is not left */
function qPanel(p) {
  var pts = p.pts[LANG] || p.pts.en;
  return '<section class="card qpanel cat-' + p.cat + '" id="qpanel" tabindex="-1" aria-label="' + esc(p.name) + '">' +
    '<button class="qx" type="button" data-qpanel aria-label="' + esc(t("close")) + '">✕</button>' +
    '<div class="qphead">' + (p.img ? '<img src="./img/' + p.img + '.webp" alt="">' : "") + '<div><span class="pill">' + esc(L(CATS[p.cat])) + "</span><h2>" + esc(p.name) + "</h2><p>" + esc(L(p.sub)) + "</p></div></div>" +
    (p.desc ? '<p class="desc">' + esc(L(p.desc)) + "</p>" : "") +
    (pts.length ? '<ul class="pts">' + pts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
    '<p style="text-align:center;margin-top:16px"><button class="btn soft" type="button" data-qpanel>' + t("qBack") + "</button></p></section>";
}

/* ── industry ── */
function lineChart(id, data, title, sub, unitKey) {
  var W = 340, H = 190, l = 8, r = 12, tp = 22, b = 24, x0 = data[0][0], x1 = data[data.length - 1][0];
  var max = Math.max.apply(null, data.map(function (d) { return d[1]; }));
  var X = function (y) { return l + (y - x0) / (x1 - x0) * (W - l - r); };
  var Y = function (v) { return tp + (1 - v / max) * (H - tp - b); };
  var pts = data.map(function (d) { return X(d[0]).toFixed(1) + "," + Y(d[1]).toFixed(1); });
  var peak = data.reduce(function (a, d) { return d[1] > a[1] ? d : a; }), last = data[data.length - 1];
  var lab = function (d, anchor, below) { return '<text class="lbl" x="' + X(d[0]).toFixed(1) + '" y="' + (Y(d[1]) + (below ? 18 : -9)).toFixed(1) + '" text-anchor="' + anchor + '">' + num(d[1]) + "</text>"; };
  var clash = Math.abs(X(last[0]) - X(peak[0])) < 70 && Math.abs(Y(last[1]) - Y(peak[1])) < 26;
  var ticks = [x0, 1990, 2000, 2010, x1].filter(function (v, i, a) { return a.indexOf(v) === i; });
  return '<div class="card chart" data-chart="' + id + '"><h3>' + t(title) + '</h3><p class="cs">' + t(sub) + "</p>" +
    '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t(title)) + '">' +
    '<line x1="' + l + '" x2="' + (W - r) + '" y1="' + Y(0) + '" y2="' + Y(0) + '" stroke="var(--line)"/>' +
    '<line x1="' + l + '" x2="' + (W - r) + '" y1="' + Y(max / 2) + '" y2="' + Y(max / 2) + '" stroke="var(--line)" stroke-dasharray="2 4"/>' +
    '<polygon points="' + X(x0) + "," + Y(0) + " " + pts.join(" ") + " " + X(x1) + "," + Y(0) + '" fill="var(--accent)" opacity=".1"/>' +
    '<polyline points="' + pts.join(" ") + '" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
    data.map(function (d) { return '<circle cx="' + X(d[0]).toFixed(1) + '" cy="' + Y(d[1]).toFixed(1) + '" r="' + (d === peak || d === last ? 4 : 2.5) + '" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/>'; }).join("") +
    lab(peak, X(peak[0]) < 60 ? "start" : X(peak[0]) > W - 60 ? "end" : "middle") + (last !== peak && !clash ? lab(last, "end") : "") +
    ticks.map(function (y) { return '<text x="' + X(y) + '" y="' + (H - 6) + '" text-anchor="' + (y === x0 ? "start" : y === x1 ? "end" : "middle") + '">' + y + "</text>"; }).join("") +
    '<line class="cross" y1="' + tp + '" y2="' + Y(0) + '" stroke="var(--muted)" stroke-width="1" visibility="hidden"/></svg><div class="tip" hidden></div>' +
    '<details class="tbl"><summary>' + t("table") + '</summary><div class="tablewrap"><table><tr><th>' + t("year") + "</th><th>" + t(unitKey) + "</th></tr>" +
    data.map(function (d) { return "<tr><td>" + d[0] + "</td><td>" + num(d[1]) + "</td></tr>"; }).join("") + "</table></div></details></div>";
}
function wireCharts() {
  $$("[data-chart]").forEach(function (el) {
    var data = STATS[el.getAttribute("data-chart")], svg = $("svg", el), cross = $(".cross", el), tip = $(".tip", el);
    var x0 = data[0][0], x1 = data[data.length - 1][0];
    function move(e) {
      var box = svg.getBoundingClientRect(), fx = (e.clientX - box.left) / box.width * 340;
      var yr = x0 + (fx - 8) / (340 - 20) * (x1 - x0), best = data[0];
      data.forEach(function (d) { if (Math.abs(d[0] - yr) < Math.abs(best[0] - yr)) best = d; });
      var px = 8 + (best[0] - x0) / (x1 - x0) * 320;
      cross.setAttribute("x1", px); cross.setAttribute("x2", px); cross.setAttribute("visibility", "visible");
      tip.hidden = false; tip.textContent = best[0] + " · " + num(best[1]);
      var host = el.getBoundingClientRect(), left = box.left - host.left + px / 340 * box.width;
      tip.style.left = Math.max(60, Math.min(el.clientWidth - 60, left)) + "px"; tip.style.top = (box.top - host.top + 38) + "px";
    }
    function out() { cross.setAttribute("visibility", "hidden"); tip.hidden = true; }
    svg.addEventListener("pointermove", move); svg.addEventListener("pointerdown", move); svg.addEventListener("pointerleave", function (e) { if (e.pointerType !== "touch") out(); });
  });
}
function vIndustry() {
  var ex = STATS.exports, mx = ex[0].v, rm = function (v) { return num(Math.round(v / 1000)); };
  var pr = function (v) { return num(v); };
  return '<div class="page"><h1>' + t("indTitle") + '</h1><p class="lead">' + t("indLead") + "</p>" +
    '<div class="tiles sect">' + [["294,697", "tGrind"], ["268", "tProd"], ["6,580", "tArea"], [Math.round(STATS.area2025.small / (STATS.area2025.small + STATS.area2025.estate) * 100) + "%", "tSmall"], ["RM15.1b", "tExp"]].map(function (x) {
      return '<div class="card tile"><div class="v">' + x[0] + '</div><div class="l">' + t(x[1]) + "</div></div>";
    }).join("") + "</div>" +
    '<div class="charts sect">' + lineChart("production", STATS.production, "cProd", "cProdS", "tonnes") + lineChart("grindings", STATS.grindings, "cGrind", "cGrindS", "tonnes") +
      lineChart("area", STATS.area, "cArea", "cAreaS", "hectares") +
      '<div class="card chart"><h3>' + t("cExp") + '</h3><p class="cs">' + t("cExpS") + '</p><div class="bars">' + ex.map(function (e) {
        return '<div class="bar" title="' + num(e.t) + " " + t("tonnes").toLowerCase() + '"><div class="bl"><span>' + esc(L(e)) + "</span><b>" + rm(e.v) + '</b></div><div class="bt" style="width:' + (e.v / mx * 100).toFixed(1) + '%"></div></div>';
      }).join("") + '</div><details class="tbl"><summary>' + t("table") + '</summary><div class="tablewrap"><table><tr><th>' + t("product") + "</th><th>" + t("tonnes") + "</th><th>" + t("value") + "</th></tr>" +
      ex.map(function (e) { return "<tr><td>" + esc(L(e)) + "</td><td>" + num(e.t) + "</td><td>" + rm(e.v) + "</td></tr>"; }).join("") + "</table></div></details></div></div>" +

    '<section class="sect"><h2>' + t("prices") + '</h2><div class="card chart"><p class="cs">' + t("pricesS", { d: fmtDate(STATS.priceDate) }) + '</p><div class="tablewrap"><table>' +
      "<tr><th>" + t("region") + "</th><th>" + t("bulk") + " SMC1</th><th>" + t("bulk") + " SMC2</th><th>" + t("coop") + " SMC1</th><th>" + t("coop") + " SMC2</th><th>" + t("premium") + "</th></tr>" +
      STATS.prices.map(function (p) { return "<tr><td>" + esc(L(p.r)) + "</td><td>" + pr(p.b1) + "</td><td>" + pr(p.b2) + "</td><td>" + pr(p.k1) + "</td><td>" + pr(p.k2) + "</td><td>" + p.prem + "</td></tr>"; }).join("") +
      '</table></div><p class="cs" style="margin-top:10px">' + t("pricesNote") + '</p><a class="btn soft" href="https://www.koko.gov.my/doc/perangkaan/" target="_blank" rel="noopener">' + I.link + t("latestPrices") + "</a></div></section>" +
    '<p class="note sect">' + t("source", { d: fmtDate(STATS.read) }) + "</p></div>";
}

/* ── more / about / directory ── */
function item(ic, title, sub, attrs, tag) {
  tag = tag || "a";
  return "<" + tag + ' class="card item" ' + attrs + '><span class="ic">' + ic + "</span><span><b>" + title + "</b><small>" + sub + '</small></span><span class="chev" aria-hidden="true">›</span></' + tag + ">";
}
function vMore() {
  return '<div class="page"><h1>' + t("more") + '</h1><div class="list sect">' +
    item(I.heart, t("mSaved"), t("mSavedS", { n: favs.length }), 'href="#/products" data-savedlink') +
    item(I.mark, t("mReads"), t("mReadsS", { n: reads.length }), 'href="#/journal" data-readslink') +
    item(I.industry, t("mInd"), t("mIndS"), 'href="#/industry"') +
    item(I.info, t("mAbout"), t("mAboutS"), 'href="#/about"') +
    item(I.pin, t("mDir"), t("mDirS", { n: OFFICES.length }), 'href="#/directory"') +
    item(I.globe, t("mPortals"), t("mPortalsS", { n: PORTALS.length }), 'href="#/portals"') +
    item(I.info, t("mLang"), t("mLangS"), 'type="button" data-langpick', "button") +
    (deferredInstall ? item(I.down, t("mInstall"), t("mInstallS"), 'type="button" data-install', "button") : "") +
    item(I.reset, t("mReset"), t("mResetS"), 'type="button" data-resetpass', "button") +
    "</div>" + footer() + "</div>";
}
function host(u) { return u.replace(/^https?:\/\/(www\.)?/, "").replace(/[\/?].*$/, ""); }
function vPortals() {
  return '<a class="back" href="#/more">← ' + t("more") + '</a><div class="page"><h1>' + t("mPortals") + '</h1><p class="lead">' + t("portalsLead") + '</p><div class="list sect">' + PORTALS.map(function (o) {
    return '<div class="card office"><span class="pill" style="color:var(--accent)">' + host(o.u) + "</span><h3>" + esc(o.n) + "</h3><p>" + esc(L(o)) + '</p><div class="row">' +
      '<a class="btn" href="' + o.u + '" target="_blank" rel="noopener">' + I.link + t(o.app ? "getApp" : "open") + "</a>" +
      (o.p ? '<a class="btn soft" href="#/p/' + o.p + '">' + t("seeProduct") + "</a>" : "") + "</div></div>";
  }).join("") + "</div></div>";
}
function vAbout() {
  var q = function (k) {
    return '<section class="sect"><h2>' + t(k) + '</h2><blockquote class="card">' + esc(L(ABOUT[k])) + (LANG !== "ms" ? "<small>" + t("unofficial") + "</small>" : "") + "</blockquote></section>";
  };
  return '<a class="back" href="#/more">← ' + t("more") + '</a><div class="page"><h1>' + t("aboutTitle") + '</h1><p class="lead">' + t("aboutLead") + "</p>" + q("vision") + q("mission") +
    '<section class="sect"><h2>' + t("functions") + '</h2><ul class="pts cat-A">' + ABOUT.functions[LANG].map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></section>" +
    '<section class="sect"><h2>' + t("history") + '</h2><ol class="tl">' + ABOUT.timeline.map(function (e) { return "<li><b>" + e.y + "</b><span>" + esc(L(e)) + "</span></li>"; }).join("") + "</ol></section>" +
    '<p class="sect" style="display:flex;flex-wrap:wrap;gap:10px"><a class="btn" href="#/directory">' + t("mDir") + '</a><a class="btn soft" href="#/portals">' + t("mPortals") + "</a></p></div>";
}
function vDirectory() {
  var cls = { hq: "cat-C", rd: "cat-A", unit: "cat-B" };
  return '<a class="back" href="#/more">← ' + t("more") + '</a><div class="page"><h1>' + t("dirTitle") + '</h1><p class="lead">' + t("dirLead") + '</p><div class="list sect">' + OFFICES.map(function (o) {
    return '<div class="card office ' + cls[o.t] + '"><span class="pill">' + t(o.t) + " · " + esc(o.s) + "</span><h3>" + esc(o.n) + "</h3><p>" + esc(o.a) + '</p><div class="row">' +
      o.tel.map(function (n) { return '<a class="btn soft" href="tel:+6' + n.replace(/\D/g, "") + '">' + t("call") + " " + n + "</a>"; }).join("") +
      '<a class="btn soft" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(o.n + ", " + o.a) + '" target="_blank" rel="noopener">' + I.pin + t("map") + "</a></div></div>";
  }).join("") + "</div></div>";
}

/* ── router ── */
var TABS = [["", "home"], ["products", "products"], ["journal", "journal"], ["quiz", "quiz"], ["more", "more"]];
function route() { return location.hash.replace(/^#\/?/, ""); }
function render(keepScroll) {
  var r = route(), parts = r.split("/"), html, tab = parts[0];
  if (parts[0] === "p") { html = vDetail(parts[1]); tab = "products"; }
  else if (r === "products") html = vProducts();
  else if (r === "quiz") html = vQuiz();
  else if (parts[0] === "a") { html = vArticle(+parts[1]); tab = "journal"; }
  else if (r === "journal") html = vJournal();
  else if (r === "industry") { html = vIndustry(); tab = "more"; }
  else if (r === "more") html = vMore();
  else if (r === "portals") { html = vPortals(); tab = "more"; }
  else if (r === "about") { html = vAbout(); tab = "more"; }
  else if (r === "directory") { html = vDirectory(); tab = "more"; }
  else { html = vHome(); tab = ""; }
  $("#view").innerHTML = html;
  $("#tabs").innerHTML = TABS.map(function (x) {
    return '<a href="#/' + x[0] + '"' + (x[0] === tab ? ' aria-current="page"' : "") + ">" + I[x[1]] + "<span>" + t(x[1]) + "</span></a>";
  }).join("");
  if (r === "industry") wireCharts();
  if (!keepScroll) {
    /* restore a list's position only when coming straight back from one of its detail pages */
    var back = (r === "products" && lastRoute.indexOf("p/") === 0 && scrolls.products) || (r === "journal" && lastRoute.indexOf("a/") === 0 && scrolls.journal) || 0;
    window.scrollTo(0, back);
    if (started) $("#view").focus({ preventScroll: true });
  }
  lastRoute = r;
}
function applyLang() {
  document.documentElement.lang = LANGS[LANG];
  $("#langbtn").textContent = { en: "EN", ms: "BM", zh: "中文" }[LANG];
  $("#langbtn").setAttribute("aria-label", "Language · Bahasa · 语言");
  $("#toasttxt").textContent = t("newVer"); $("#toastgo").textContent = t("refresh");
  render(true);
}
function setLang(l) {
  if (!Object.prototype.hasOwnProperty.call(LANGS, l)) return false;
  var changed = l !== LANG;
  LANG = l; store.set("lang", LANG);
  if (changed) applyLang();
  return true;
}
var pickOpener = null;
function showLangPick(on) {
  if (on) pickOpener = document.activeElement;
  $("#langpick").hidden = !on;
  $("#lpclose").hidden = FIRST_LAUNCH;            /* first launch: a language must be chosen */
  $("#lpclose").setAttribute("aria-label", t("close"));
  document.body.classList.toggle("picking", on);
  [$("#top"), $("#view"), $("#tabs"), $("#toast"), $("#snack")].forEach(function (n) { n.inert = on; });
  if (on) $("#langpick").focus();
  else if (pickOpener && pickOpener !== document.body && document.contains(pickOpener)) pickOpener.focus({ preventScroll: true });
  else if (pickOpener === document.body) $("#view").focus({ preventScroll: true });
  else $("#langbtn").focus({ preventScroll: true });
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !$("#langpick").hidden && !FIRST_LAUNCH) showLangPick(false);
});
document.addEventListener("pointerdown", function (e) {      /* touch: a chart label stays until the next tap elsewhere */
  if (e.target.closest && e.target.closest("[data-chart] svg")) return;
  $$("[data-chart] .tip").forEach(function (n) { n.hidden = true; });
  $$("[data-chart] .cross").forEach(function (n) { n.setAttribute("visibility", "hidden"); });
});
function announce(msg) { var n = $("#live"); n.textContent = ""; setTimeout(function () { n.textContent = msg; }, 60); }

/* ── events ── */
window.addEventListener("hashchange", function () {
  /* remember a list's position only when a detail page is opened from that list */
  var nr = route();
  if (nr.indexOf("p/") === 0 && lastRoute.indexOf("p/") !== 0) scrolls.products = lastRoute === "products" ? window.scrollY : 0;
  if (nr.indexOf("a/") === 0 && lastRoute.indexOf("a/") !== 0) scrolls.journal = lastRoute === "journal" ? window.scrollY : 0;
  if (route() !== "quiz") qz = null;
  render();
});
$("#langbtn").onclick = function () { showLangPick(true); };
$("#langpick").onclick = function (e) {
  if (e.target.id === "lpclose") { showLangPick(false); return; }
  if (setLang(e.target.getAttribute("data-lang"))) { var first = FIRST_LAUNCH; FIRST_LAUNCH = false; showLangPick(false); if (first) window.scrollTo(0, 0); }
};
$("#tabs").addEventListener("click", function (e) {
  var a = e.target.closest("a");
  /* a tab tap starts that section afresh */
  if (a && a.getAttribute("href") === "#/products") { scrolls.products = 0; filt = { cat: "", tag: "", q: "", saved: false }; }
  if (a && a.getAttribute("href") === "#/journal") { scrolls.journal = 0; jf = { q: "", y: 0, tp: "", saved: false }; jShown = 30; }
  if (a && a.getAttribute("aria-current") && "#/" + route() === a.getAttribute("href")) render();
});

document.addEventListener("click", function (e) {
  var el = e.target.closest("[data-fav],[data-cat],[data-tag],[data-reset],[data-surprise],[data-catf],[data-tagf],[data-saved],[data-clear],[data-qstart],[data-opt],[data-qnext],[data-qshow],[data-qpanel],[data-langpick],[data-install],[data-resetpass],[data-savedlink],[data-read],[data-jy],[data-jtp],[data-jsaved],[data-jclear],[data-jmore],[data-jkw],[data-jreset],[data-readslink],#dfav,#dshare,#aread,#acite,#ashare");
  if (!el) return;
  var d = el.dataset;
  if ("fav" in d) { e.preventDefault(); el.setAttribute("aria-pressed", toggleFav(d.fav)); if (filt.saved && route() === "products") refreshGrid(); return; }
  if ("read" in d || el.id === "aread") {
    e.preventDefault();
    var rid = "read" in d ? +d.read : +route().split("/")[1], ri = reads.indexOf(rid);
    if (ri >= 0) reads.splice(ri, 1); else reads.push(rid);
    store.set("reads", JSON.stringify(reads)); snack(t(ri >= 0 ? "removedMsg" : "savedMsg"));
    el.setAttribute("aria-pressed", ri < 0);
    if (el.id === "aread") { el.classList.toggle("soft", ri >= 0); $("span", el).textContent = t(ri < 0 ? "unsave" : "save"); }
    else if (jf.saved && route() === "journal") jRefresh();
    return;
  }
  if ("jy" in d) { jf.y = +d.jy; jShown = 30; jRefresh(); return; }
  if ("jtp" in d) { jf.tp = jf.tp === d.jtp ? "" : d.jtp; jShown = 30; jRefresh(); return; }
  if ("jsaved" in d) { jf.saved = !jf.saved; jShown = 30; jRefresh(); return; }
  if ("jclear" in d) { jf = { q: "", y: 0, tp: "", saved: false }; render(); return; }
  if ("jmore" in d) { jShown += 30; $("#jlist").innerHTML = jListHtml(); return; }
  if ("jkw" in d) { jf = { q: d.jkw, y: 0, tp: "", saved: false }; jShown = 30; scrolls.journal = 0; return; }
  if ("jreset" in d) { jf = { q: "", y: 0, tp: "", saved: false }; jShown = 30; scrolls.journal = 0; return; }
  if ("readslink" in d) { jf = { q: "", y: 0, tp: "", saved: true }; jShown = 30; scrolls.journal = 0; return; }
  if (el.id === "acite") {
    var cx = artById[+route().split("/")[1]];
    copyText(citation(cx), t("cited"));
    return;
  }
  if (el.id === "ashare") {
    var sx = artById[+route().split("/")[1]], sd = { title: sx.t, text: sx.t + " (Malaysian Cocoa Journal, " + sx.y + ")", url: location.href };
    if (navigator.share) navigator.share(sd).catch(function () {});
    else copyText(sd.url, t("copied"));
    return;
  }
  if ("cat" in d) { filt = { cat: d.cat, tag: "", q: "", saved: false }; scrolls.products = 0; return; }
  if ("tag" in d) { filt = { cat: "", tag: d.tag, q: "", saved: false }; scrolls.products = 0; return; }
  if ("savedlink" in d) { filt = { cat: "", tag: "", q: "", saved: true }; scrolls.products = 0; return; }
  if ("reset" in d) { filt = { cat: "", tag: "", q: "", saved: false }; scrolls.products = 0; return; }
  if ("surprise" in d) {
    var pool = PRODUCTS.filter(function (p) { return seen.indexOf(p.id) < 0; });
    if (!pool.length) pool = PRODUCTS;
    location.hash = "#/p/" + pool[Math.floor(Math.random() * pool.length)].id; return;
  }
  if ("catf" in d) { filt.cat = d.catf; if (filt.tag && TAGS[filt.tag].cat && filt.cat && TAGS[filt.tag].cat !== filt.cat) filt.tag = ""; refreshGrid(true); return; }
  if ("tagf" in d) { filt.tag = filt.tag === d.tagf ? "" : d.tagf; refreshGrid(true); return; }
  if ("saved" in d) { filt.saved = !filt.saved; refreshGrid(true); return; }
  if ("clear" in d) { filt = { cat: "", tag: "", q: "", saved: false }; render(); return; }
  if ("qstart" in d) { qz = { qs: quizRound(), i: 0, res: [], tried: [], solved: false, shown: false, open: false, at: Date.now() }; render(); return; }
  if ("opt" in d) {
    var qq = qz.qs[qz.i], qo = Array.isArray(qq.o) ? qq.o : L(qq.o), pick = +d.opt;
    if (qz.solved || qz.shown || qz.tried.indexOf(pick) >= 0) return;
    if (Date.now() - qz.at < 450 && e.detail > 1) return;       /* second half of a double tap on "Next" */
    if (qz.res.length === qz.i) qz.res.push(pick === qq.a);          /* only the first try scores */
    if (pick === qq.a) qz.solved = true; else qz.tried.push(pick);
    render(true);
    announce(qz.solved ? (qz.tried.length ? t("qRightRetry") : t("qRight")) : t("qTry"));
    var nf = qz.solved ? $("[data-qnext]") : $(".opts button:not([disabled])"); if (nf) nf.focus({ preventScroll: true });
    return;
  }
  if ("qshow" in d) {
    var qs2 = qz.qs[qz.i], qo2 = Array.isArray(qs2.o) ? qs2.o : L(qs2.o);
    qz.shown = true; render(true); announce(t("rightAns", { a: qo2[qs2.a] }));
    var nb = $("[data-qnext]"); if (nb) nb.focus({ preventScroll: true });
    return;
  }
  if ("qpanel" in d) {
    qz.open = !qz.open;
    var pid = qz.qs[qz.i].p;
    if (qz.open && pid && seen.indexOf(pid) < 0) { seen.push(pid); store.set("seen", JSON.stringify(seen)); }   /* counts for the passport */
    render(true);
    if (qz.open) { var pn = $("#qpanel"); pn.focus({ preventScroll: true }); pn.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    else { var tg = $(".qbtns [data-qpanel]"); if (tg) tg.focus({ preventScroll: true }); $(".qtext").scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    return;
  }
  if ("qnext" in d) {
    qz.i++; qz.tried = []; qz.solved = false; qz.shown = false; qz.open = false; qz.at = Date.now();
    if (qz.i >= qz.qs.length) { var s = qz.res.filter(Boolean).length; if (s > (+store.get("best") || 0)) store.set("best", String(s)); }
    render(); return;
  }
  if ("langpick" in d) { showLangPick(true); return; }
  if ("install" in d) { if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; render(true); } return; }
  if ("resetpass" in d) { if (!window.confirm(t("confirmReset"))) return; seen = []; store.set("seen", "[]"); store.set("best", "0"); snack(t("resetDone")); return; }
  if (el.id === "dfav") {
    var on = toggleFav(route().split("/")[1]);
    el.setAttribute("aria-pressed", on); el.classList.toggle("soft", !on); $("span", el).textContent = t(on ? "unsave" : "save"); return;
  }
  if (el.id === "dshare") {
    var p = byId[route().split("/")[1]], data = { title: p.name + " · KokoLab", text: p.name + ": " + L(p.sub), url: location.href };
    if (navigator.share) navigator.share(data).catch(function () {});
    else copyText(data.url, t("copied"));
  }
});
document.addEventListener("input", function (e) {
  if (e.target.id === "jq") { jf.q = e.target.value.trim(); jShown = 30; $("#jlist").innerHTML = jListHtml(); }
  if (e.target.id === "q") { filt.q = e.target.value.trim(); $("#grid").innerHTML = gridHtml(); }
});
window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferredInstall = e; if (route() === "more") render(true); });

/* ── start ── */
function measure() { document.documentElement.style.setProperty("--top-h", $("#top").offsetHeight + "px"); }
measure(); window.addEventListener("resize", measure);
applyLang();
started = true;
if (FIRST_LAUNCH) showLangPick(true);

/* ── service worker: instant launch, then check for a newer copy ── */
$("#toastgo").onclick = function () { location.reload(); };
$("#toastx").onclick = function () { $("#toast").hidden = true; };
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  var askForUpdate = function () {
    if (navigator.onLine === false) return;
    navigator.serviceWorker.ready.then(function (reg) { if (reg.active) reg.active.postMessage("check"); }).catch(function () {});
  };
  navigator.serviceWorker.addEventListener("message", function (e) { if (e.data === "updated") $("#toast").hidden = false; });
  window.addEventListener("load", function () { navigator.serviceWorker.register("./sw.js").then(askForUpdate).catch(function () {}); });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") askForUpdate(); });
}
})();
