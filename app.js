/* KokoLab — app logic. No build step; plain script. */
(function () {
"use strict";

var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

/* ── storage (falls back to memory when blocked) ── */
var mem = {};
var store = {
  get: function (k) { try { var v = localStorage.getItem("kokolab." + k); return v === null ? mem[k] : v; } catch (e) { return mem[k]; } },
  set: function (k, v) { mem[k] = v; try { localStorage.setItem("kokolab." + k, v); } catch (e) {} },
  list: function (k) { try { var a = JSON.parse(store.get(k) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
};

/* ── language ── */
var LANGS = { en: "en", ms: "ms" };
var LANG = store.get("lang");
var FIRST_LAUNCH = !LANGS[LANG];
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
    quizTitle: "How well do you know your cocoa?", quizText: "Six quick questions drawn from the booklet.", quizGo: "Play the quiz", best: "Best score: {n}/{t}",
    short: { A: "Farming", B: "Care", C: "Food" }, today: "Pick of the day", newest: "Not yet discovered", all: "All", seeAll: "See all",
    search: "Search products", saved: "Saved", count: "{n} products", none: "Nothing matches. Try a different word or clear the filters.", clear: "Clear filters",
    back: "Back", save: "Save", unsave: "Saved", share: "Share", page: "Booklet p. {n}", highlights: "Highlights", about: "About",
    health: "Benefits are as described in the Malaysian Cocoa Board's booklet. This is general information, not medical advice.",
    partial: "The page for this product was missing or unreadable in the scanned booklet, so only its name and short description from the contents page are shown.",
    visit: "Open the portal", related: "You may also like", prev: "Previous", next: "Next", copied: "Link copied", savedMsg: "Saved", removedMsg: "Removed",
    qStart: "Start", qNext: "Next question", qFinish: "See my score", qRight: "Correct!", qWrong: "Not quite.", qSee: "See the product",
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
    pricesNote: "Premium prices depend on offers, quality and the specific requirements of buyers or chocolate makers.", latest: "Latest prices on koko.gov.my",
    source: "Source: Malaysian Cocoa Board statistics page (koko.gov.my), read on {d}.",
    mLang: "Language", mLangS: "English", mSaved: "Saved products", mSavedS: "{n} saved", mAbout: "About the Malaysian Cocoa Board", mAboutS: "Vision, mission and history",
    mDir: "Offices and research centres", mDirS: "{n} locations", mSite: "Official website", mSiteS: "koko.gov.my", mInstall: "Install this app", mInstallS: "Add KokoLab to your home screen",
    mReset: "Reset my passport", mResetS: "Clear discovered products and quiz score", resetDone: "Passport reset",
    aboutTitle: "Malaysian Cocoa Board", aboutLead: "Lembaga Koko Malaysia (LKM) is a federal statutory body under the Ministry of Plantation and Commodities, headquartered in Kota Kinabalu, Sabah.",
    vision: "Vision", mission: "Mission", functions: "What the Board does", history: "Milestones", unofficial: "Unofficial translation of the Malay original",
    dirTitle: "Offices & centres", dirLead: "Tap to call or open a location in your maps app. Names are shown as listed by the Board.", call: "Call", map: "Map", hq: "Head office", rd: "Research", unit: "Unit office",
    appNote: "KokoLab is an unofficial companion app. Product content and photos come from the Malaysian Cocoa Board's booklet \"From Lab to Market: R&D Products and Technologies\"; figures come from koko.gov.my. For official information, contact the Board.",
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
    quizTitle: "Sejauh mana anda kenal koko?", quizText: "Enam soalan ringkas daripada buku kecil LKM.", quizGo: "Main kuiz", best: "Markah terbaik: {n}/{t}",
    short: { A: "Ladang", B: "Jagaan", C: "Makanan" }, today: "Pilihan hari ini", newest: "Belum ditemui", all: "Semua", seeAll: "Lihat semua",
    search: "Cari produk", saved: "Disimpan", count: "{n} produk", none: "Tiada padanan. Cuba perkataan lain atau kosongkan tapisan.", clear: "Kosongkan tapisan",
    back: "Kembali", save: "Simpan", unsave: "Disimpan", share: "Kongsi", page: "Buku kecil ms. {n}", highlights: "Ciri utama", about: "Perihal",
    health: "Manfaat adalah seperti yang dinyatakan dalam buku kecil Lembaga Koko Malaysia. Ini maklumat umum, bukan nasihat perubatan.",
    partial: "Halaman produk ini tiada atau tidak dapat dibaca dalam imbasan buku kecil, jadi hanya nama dan huraian ringkas daripada halaman kandungan dipaparkan.",
    visit: "Buka portal", related: "Anda mungkin juga suka", prev: "Sebelum", next: "Seterusnya", copied: "Pautan disalin", savedMsg: "Disimpan", removedMsg: "Dibuang",
    qStart: "Mula", qNext: "Soalan seterusnya", qFinish: "Lihat markah saya", qRight: "Betul!", qWrong: "Kurang tepat.", qSee: "Lihat produk",
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
    pricesNote: "Harga premium bergantung pada tawaran, kualiti dan keperluan khusus pembeli atau pengeluar coklat.", latest: "Harga terkini di koko.gov.my",
    source: "Sumber: halaman perangkaan Lembaga Koko Malaysia (koko.gov.my), dibaca pada {d}.",
    mLang: "Bahasa", mLangS: "Bahasa Melayu", mSaved: "Produk disimpan", mSavedS: "{n} disimpan", mAbout: "Perihal Lembaga Koko Malaysia", mAboutS: "Wawasan, misi dan sejarah",
    mDir: "Pejabat dan pusat penyelidikan", mDirS: "{n} lokasi", mSite: "Laman web rasmi", mSiteS: "koko.gov.my", mInstall: "Pasang aplikasi ini", mInstallS: "Tambah KokoLab ke skrin utama",
    mReset: "Set semula pasport saya", mResetS: "Kosongkan produk ditemui dan markah kuiz", resetDone: "Pasport diset semula",
    aboutTitle: "Lembaga Koko Malaysia", aboutLead: "Lembaga Koko Malaysia (LKM) ialah badan berkanun persekutuan di bawah Kementerian Perladangan dan Komoditi, beribu pejabat di Kota Kinabalu, Sabah.",
    vision: "Wawasan", mission: "Misi", functions: "Fungsi LKM", history: "Detik penting", unofficial: "",
    dirTitle: "Pejabat & pusat", dirLead: "Tekan untuk menelefon atau membuka lokasi dalam aplikasi peta anda.", call: "Telefon", map: "Peta", hq: "Ibu pejabat", rd: "Penyelidikan", unit: "Pejabat unit",
    appNote: "KokoLab ialah aplikasi pendamping tidak rasmi. Kandungan dan gambar produk diambil daripada buku kecil Lembaga Koko Malaysia \"From Lab to Market: R&D Products and Technologies\"; angka daripada koko.gov.my. Terjemahan Bahasa Melayu adalah tidak rasmi. Untuk maklumat rasmi, hubungi LKM.",
    version: "Salinan ini: {d}", newVer: "Versi baharu sudah sedia", refresh: "Muat semula"
  }
};
function t(k, v) {
  var s = T[LANG][k]; if (s === undefined) s = T.en[k];
  if (v && typeof s === "string") for (var x in v) s = s.replace("{" + x + "}", v[x]);
  return s;
}
function L(o) { return o == null ? "" : (typeof o === "string" ? o : (o[LANG] !== undefined ? o[LANG] : o.en)); }
function num(n) { return Number(n).toLocaleString("en-MY"); }
function fmtDate(iso) {
  var d = new Date(iso + "T00:00:00");
  try { return d.toLocaleDateString(LANG === "ms" ? "ms-MY" : "en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return iso; }
}

/* ── state ── */
var byId = {}; PRODUCTS.forEach(function (p) { byId[p.id] = p; });
var seen = store.list("seen").filter(function (id) { return byId[id]; });
var favs = store.list("favs").filter(function (id) { return byId[id]; });
var filt = { cat: "", tag: "", q: "", saved: false };
var scrolls = {};
var lastRoute = "";
var deferredInstall = null;

/* ── icons ── */
var I = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>',
  products: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.500"/><rect x="14" y="3" width="7" height="7" rx="1.500"/><rect x="3" y="14" width="7" height="7" rx="1.500"/><rect x="14" y="14" width="7" height="7" rx="1.500"/></svg>',
  quiz: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.500 9.300a2.600 2.600 0 115 .9c0 1.700-2.500 2-2.500 3.800M12 17.300v.2"/></svg>',
  industry: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-8M21 20H3"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.300"/><circle cx="12" cy="12" r="1.300"/><circle cx="19" cy="12" r="1.300"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20.500s-7.500-4.600-7.500-10.200A4.300 4.300 0 0112 7.600a4.300 4.300 0 017.500 2.700c0 5.600-7.500 10.200-7.500 10.200z" stroke-linejoin="round"/></svg>',
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
  return '<article class="card pcard cat-' + p.cat + '"><a href="#/p/' + p.id + '" style="display:contents;text-decoration:none">' + thumb(p) +
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

    '<section class="sect"><a class="card stat" href="#/industry"><div class="num">1,100×</div><p><b>' + t("statLead") + "</b></p><p>" + t("statText") + "</p><small>" + t("statMore") + " →</small></a></section>" +

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
    var hay = (p.name + " " + L(p.sub) + " " + L(p.desc) + " " + (p.pts[LANG] || []).join(" ") + " " + L(CATS[p.cat])).toLowerCase();
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
    (p.link ? '<a class="btn soft" href="' + p.link + '" target="_blank" rel="noopener">' + I.link + t("visit") + "</a>" : "") + "</div>" +
    (p.desc ? '<p class="desc">' + esc(L(p.desc)) + "</p>" : "") +
    (pts.length ? "<h2>" + t("highlights") + '</h2><ul class="pts">' + pts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
    (p.partial ? '<p class="note">' + t("partial") + "</p>" : "") +
    (p.cat !== "A" && !p.partial ? '<p class="note">' + t("health") + "</p>" : "") +
    '<p class="eyebrow" style="margin-top:16px">' + t("page", { n: p.page }) + "</p></div></article>" +
    (rel.length ? '<section class="sect"><h2>' + t("related") + '</h2><div class="hscroll">' + rel.map(card).join("") + "</div></section>" : "") +
    '<nav class="pager">' + (prev ? '<a class="card" href="#/p/' + prev.id + '"><small>← ' + t("prev") + "</small><b>" + esc(prev.name) + "</b></a>" : "<span></span>") +
    (next ? '<a class="card" href="#/p/' + next.id + '"><small>' + t("next") + " →</small><b>" + esc(next.name) + "</b></a>" : "<span></span>") + "</nav>";
}

/* ── quiz ── */
var QUIZ_LEN = 6, qz = null;
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
  var q = qz.qs[qz.i], opts = Array.isArray(q.o) ? q.o : L(q.o), done = qz.picked !== null;
  return '<div class="quiz"><p class="eyebrow">' + t("qOf", { n: qz.i + 1, t: QUIZ_LEN }) + '</p><div class="dots">' + qz.qs.map(function (_, k) {
      return '<i class="' + (k < qz.res.length ? (qz.res[k] ? "ok" : "no") : k === qz.i ? "now" : "") + '"></i>';
    }).join("") + '</div><p class="qtext">' + esc(L(q.q)) + '</p><div class="opts">' + opts.map(function (o, k) {
      var cls = done ? (k === q.a ? "ok" : k === qz.picked ? "no" : "") : "";
      return '<button type="button" data-opt="' + k + '" class="' + cls + '"' + (done ? " disabled" : "") + "><span>" + "ABCD"[k] + "</span>" + esc(o) + "</button>";
    }).join("") + '</div><div class="qfoot" aria-live="polite">' + (done ?
      "<b style=\"color:var(--" + (qz.picked === q.a ? "good" : "bad") + ')">' + t(qz.picked === q.a ? "qRight" : "qWrong") + "</b>" +
      '<span style="display:flex;gap:8px;flex-wrap:wrap">' + (q.p ? '<a class="btn soft" href="#/p/' + q.p + '">' + t("qSee") + "</a>" : "") +
      '<button class="btn" type="button" data-qnext>' + t(qz.i === QUIZ_LEN - 1 ? "qFinish" : "qNext") + "</button></span>" : "") + "</div></div>";
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
      var left = svg.offsetLeft + px / 340 * box.width;
      tip.style.left = Math.max(60, Math.min(el.clientWidth - 60, left)) + "px"; tip.style.top = (svg.offsetTop + 14) + "px";
    }
    function out() { cross.setAttribute("visibility", "hidden"); tip.hidden = true; }
    svg.addEventListener("pointermove", move); svg.addEventListener("pointerdown", move); svg.addEventListener("pointerleave", out);
  });
}
function vIndustry() {
  var ex = STATS.exports, mx = ex[0].v, rm = function (v) { return num(Math.round(v / 1000)); };
  var pr = function (v) { return num(v); };
  return '<div class="page"><h1>' + t("indTitle") + '</h1><p class="lead">' + t("indLead") + "</p>" +
    '<div class="tiles sect">' + [["294,697", "tGrind"], ["268", "tProd"], ["6,580", "tArea"], ["86%", "tSmall"], ["RM15.1b", "tExp"]].map(function (x) {
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
      '</table></div><p class="cs" style="margin-top:10px">' + t("pricesNote") + '</p><a class="btn soft" href="https://www.koko.gov.my/doc/perangkaan/" target="_blank" rel="noopener">' + I.link + t("latest") + "</a></div></section>" +
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
    item(I.info, t("mAbout"), t("mAboutS"), 'href="#/about"') +
    item(I.pin, t("mDir"), t("mDirS", { n: OFFICES.length }), 'href="#/directory"') +
    item(I.link, t("mSite"), t("mSiteS"), 'href="https://www.koko.gov.my/" target="_blank" rel="noopener"') +
    item(I.globe, t("mLang"), t("mLangS"), 'type="button" data-langpick', "button") +
    (deferredInstall ? item(I.down, t("mInstall"), t("mInstallS"), 'type="button" data-install', "button") : "") +
    item(I.reset, t("mReset"), t("mResetS"), 'type="button" data-resetpass', "button") +
    "</div>" + footer() + "</div>";
}
function vAbout() {
  var q = function (k) {
    return '<section class="sect"><h2>' + t(k) + '</h2><blockquote class="card">' + esc(L(ABOUT[k])) + (LANG === "en" ? "<small>" + t("unofficial") + "</small>" : "") + "</blockquote></section>";
  };
  return '<a class="back" href="#/more">← ' + t("more") + '</a><div class="page"><h1>' + t("aboutTitle") + '</h1><p class="lead">' + t("aboutLead") + "</p>" + q("vision") + q("mission") +
    '<section class="sect"><h2>' + t("functions") + '</h2><ul class="pts cat-A">' + ABOUT.functions[LANG].map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></section>" +
    '<section class="sect"><h2>' + t("history") + '</h2><ol class="tl">' + ABOUT.timeline.map(function (e) { return "<li><b>" + e.y + "</b><span>" + esc(L(e)) + "</span></li>"; }).join("") + "</ol></section>" +
    '<p class="sect"><a class="btn" href="#/directory">' + t("mDir") + "</a></p></div>";
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
var TABS = [["", "home"], ["products", "products"], ["quiz", "quiz"], ["industry", "industry"], ["more", "more"]];
function route() { return location.hash.replace(/^#\/?/, ""); }
function render(keepScroll) {
  var r = route(), parts = r.split("/"), html, tab = parts[0];
  if (parts[0] === "p") { html = vDetail(parts[1]); tab = "products"; }
  else if (r === "products") html = vProducts();
  else if (r === "quiz") html = vQuiz();
  else if (r === "industry") html = vIndustry();
  else if (r === "more") html = vMore();
  else if (r === "about") { html = vAbout(); tab = "more"; }
  else if (r === "directory") { html = vDirectory(); tab = "more"; }
  else { html = vHome(); tab = ""; }
  $("#view").innerHTML = html;
  $("#tabs").innerHTML = TABS.map(function (x) {
    return '<a href="#/' + x[0] + '"' + (x[0] === tab ? ' aria-current="page"' : "") + ">" + I[x[1]] + "<span>" + t(x[1]) + "</span></a>";
  }).join("");
  if (r === "industry") wireCharts();
  if (!keepScroll) window.scrollTo(0, (r === "products" && scrolls.products) || 0);
  lastRoute = r;
}
function applyLang() {
  document.documentElement.lang = LANGS[LANG];
  $("#langbtn").textContent = LANG === "en" ? "BM" : "EN";
  $("#langbtn").setAttribute("aria-label", LANG === "en" ? "Tukar ke Bahasa Melayu" : "Switch to English");
  $("#toasttxt").textContent = t("newVer"); $("#toastgo").textContent = t("refresh");
  render(true);
}
function setLang(l) {
  if (!LANGS[l]) return false;
  var changed = l !== LANG;
  LANG = l; store.set("lang", LANG);
  if (changed) applyLang();
  return true;
}
function showLangPick(on) {
  $("#langpick").hidden = !on;
  document.body.classList.toggle("picking", on);
  [$("#top"), $("#view"), $("#tabs")].forEach(function (n) { n.inert = on; });
  if (on) $("#langpick").focus();
}

/* ── events ── */
window.addEventListener("hashchange", function () {
  if (lastRoute === "products") scrolls.products = window.scrollY;
  if (route() !== "quiz" && route().indexOf("p/") !== 0) qz = null;
  render();
});
$("#langbtn").onclick = function () { setLang(LANG === "en" ? "ms" : "en"); };
$("#langpick").onclick = function (e) {
  if (setLang(e.target.getAttribute("data-lang"))) { showLangPick(false); window.scrollTo(0, 0); }
};
$("#tabs").addEventListener("click", function (e) {
  var a = e.target.closest("a");
  if (a && a.getAttribute("href") === "#/products") scrolls.products = 0;
});

document.addEventListener("click", function (e) {
  var el = e.target.closest("[data-fav],[data-cat],[data-tag],[data-reset],[data-surprise],[data-catf],[data-tagf],[data-saved],[data-clear],[data-qstart],[data-opt],[data-qnext],[data-langpick],[data-install],[data-resetpass],[data-savedlink],#dfav,#dshare");
  if (!el) return;
  var d = el.dataset;
  if ("fav" in d) { e.preventDefault(); el.setAttribute("aria-pressed", toggleFav(d.fav)); if (filt.saved && route() === "products") refreshGrid(); return; }
  if ("cat" in d) { filt = { cat: d.cat, tag: "", q: "", saved: false }; scrolls.products = 0; return; }
  if ("tag" in d) { filt = { cat: "", tag: d.tag, q: "", saved: false }; scrolls.products = 0; return; }
  if ("savedlink" in d) { filt = { cat: "", tag: "", q: "", saved: true }; scrolls.products = 0; return; }
  if ("reset" in d) { filt = { cat: "", tag: "", q: "", saved: false }; scrolls.products = 0; return; }
  if ("surprise" in d) {
    var pool = PRODUCTS.filter(function (p) { return seen.indexOf(p.id) < 0 && !p.partial; });
    if (!pool.length) pool = PRODUCTS;
    location.hash = "#/p/" + pool[Math.floor(Math.random() * pool.length)].id; return;
  }
  if ("catf" in d) { filt.cat = d.catf; if (filt.tag && TAGS[filt.tag].cat && filt.cat && TAGS[filt.tag].cat !== filt.cat) filt.tag = ""; refreshGrid(true); return; }
  if ("tagf" in d) { filt.tag = filt.tag === d.tagf ? "" : d.tagf; refreshGrid(true); return; }
  if ("saved" in d) { filt.saved = !filt.saved; refreshGrid(true); return; }
  if ("clear" in d) { filt = { cat: "", tag: "", q: "", saved: false }; render(); return; }
  if ("qstart" in d) { qz = { qs: shuffle(QUIZ).slice(0, QUIZ_LEN), i: 0, res: [], picked: null }; render(); return; }
  if ("opt" in d) {
    if (qz.picked !== null) return;
    qz.picked = +d.opt; qz.res.push(qz.picked === qz.qs[qz.i].a); render(true);
    var nx = $("[data-qnext]"); if (nx) nx.focus({ preventScroll: true });
    return;
  }
  if ("qnext" in d) {
    qz.i++; qz.picked = null;
    if (qz.i >= qz.qs.length) { var s = qz.res.filter(Boolean).length; if (s > (+store.get("best") || 0)) store.set("best", String(s)); }
    render(); return;
  }
  if ("langpick" in d) { showLangPick(true); return; }
  if ("install" in d) { if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; render(true); } return; }
  if ("resetpass" in d) { seen = []; store.set("seen", "[]"); store.set("best", "0"); snack(t("resetDone")); return; }
  if (el.id === "dfav") {
    var on = toggleFav(route().split("/")[1]);
    el.setAttribute("aria-pressed", on); el.classList.toggle("soft", !on); $("span", el).textContent = t(on ? "unsave" : "save"); return;
  }
  if (el.id === "dshare") {
    var p = byId[route().split("/")[1]], data = { title: p.name + " · KokoLab", text: p.name + ": " + L(p.sub), url: location.href };
    if (navigator.share) navigator.share(data).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(data.url).then(function () { snack(t("copied")); }, function () {});
  }
});
document.addEventListener("input", function (e) {
  if (e.target.id === "q") { filt.q = e.target.value.trim(); $("#grid").innerHTML = gridHtml(); }
});
window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferredInstall = e; if (route() === "more") render(true); });

/* ── start ── */
applyLang();
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
