/* KokoLab content.
   Products: transcribed from the booklet "From Lab to Market: R&D Products and
   Technologies by Malaysian Cocoa Board". English follows the booklet; Malay is
   an unofficial translation. Industry figures: koko.gov.my (Perangkaan),
   read 27 Nov 2026. */
"use strict";

var CATS = {
  A: { key: "farm", en: "Cocoa Farming", ms: "Perladangan Koko",
       enLong: "Cocoa farming products and technologies", msLong: "Produk dan teknologi perladangan koko" },
  B: { key: "care", en: "Personal Care", ms: "Penjagaan Diri",
       enLong: "Cocoa-based personal care products and technologies", msLong: "Produk dan teknologi penjagaan diri berasaskan koko" },
  C: { key: "food", en: "Food & Beverages", ms: "Makanan & Minuman",
       enLong: "Cocoa-based functional foods and beverages", msLong: "Makanan dan minuman berfungsi berasaskan koko" }
};

var TAGS = {
  soil:     { en: "Soil & fertiliser", ms: "Tanah & baja", cat: "A" },
  pest:     { en: "Pests & diseases", ms: "Perosak & penyakit", cat: "A" },
  digital:  { en: "Apps & sensors", ms: "Aplikasi & penderia", cat: "A" },
  genetics: { en: "DNA & clones", ms: "DNA & klon", cat: "A" },
  face:     { en: "Face & lips", ms: "Wajah & bibir", cat: "B" },
  hair:     { en: "Hair", ms: "Rambut", cat: "B" },
  feet:     { en: "Feet", ms: "Kaki", cat: "B" },
  choc:     { en: "Chocolate", ms: "Coklat", cat: "C" },
  drink:    { en: "Drinks", ms: "Minuman", cat: "C" },
  extract:  { en: "Extracts & supplements", ms: "Ekstrak & suplemen", cat: "C" },
  nosugar:  { en: "No refined sugar", ms: "Tanpa gula bertapis", cat: "C" },
  dessert:  { en: "Ice cream", ms: "Aiskrim", cat: "C" },
  waste:    { en: "Made from by-products", ms: "Daripada hasil sampingan", cat: "" }
};

var SAME_SKIN = "Specially formulated to be skin-friendly";
var SAME_SKIN_MS = "Diformulasi khas supaya mesra kulit";
var HAIR_EN = ["Specially formulated to be skin-friendly and environmentally sustainable",
               "Contains plant extracts with multiple functions: cleansing, moisturizing, and reducing dandruff on the scalp"];
var HAIR_MS = ["Diformulasi khas supaya mesra kulit dan lestari alam sekitar",
               "Mengandungi ekstrak tumbuhan pelbagai fungsi: membersih, melembap dan mengurangkan kelemumur pada kulit kepala"];

var PRODUCTS = [
/* ───────── A · Cocoa farming ───────── */
{ id: "terraprobe", cat: "A", n: 1, page: 6, img: "terraprobe", name: "MCB TerraProbe", tags: ["soil", "digital"],
  sub: { en: "IoT soil moisture probe", ms: "Prob kelembapan tanah IoT" },
  desc: { en: "MCB TerraProbe aims to enhance the efficiency of cocoa fertigation management through improved monitoring and control of soil moisture, making agricultural operations more effective, efficient, and sustainable.",
          ms: "MCB TerraProbe bertujuan meningkatkan kecekapan pengurusan fertigasi koko melalui pemantauan dan kawalan kelembapan tanah yang lebih baik, menjadikan operasi pertanian lebih berkesan, cekap dan lestari." },
  pts: { en: ["IoT-based moisture content determination method", "Portable", "Real-time", "Affordable"],
         ms: ["Kaedah penentuan kandungan lembapan berasaskan IoT", "Mudah alih", "Masa nyata", "Mampu milik"] } },

{ id: "agrosense", cat: "A", n: 2, page: 7, img: "agrosense", name: "MCB AgroSense", tags: ["soil", "digital"],
  sub: { en: "IoT nutrient moisture probe", ms: "Prob nutrien dan kelembapan IoT" },
  desc: { en: "MCB AgroSense is a smart device used to monitor nutrient levels in soil in real time with the aid of Internet of Things (IoT) technology. Sensors in this probe detect seven key parameters: nitrogen (N), phosphorus (P), potassium (K), pH, moisture, electrical conductivity (EC), and soil temperature. The data is then transmitted to a cloud-based platform for reference. This helps farmers make more accurate decisions regarding soil management, improves crop yield, and reduces excessive fertilizer use that can harm the environment.",
          ms: "MCB AgroSense ialah peranti pintar untuk memantau paras nutrien dalam tanah secara masa nyata dengan bantuan teknologi Internet Benda (IoT). Penderia dalam prob ini mengesan tujuh parameter utama: nitrogen (N), fosforus (P), kalium (K), pH, kelembapan, kekonduksian elektrik (EC) dan suhu tanah. Data kemudian dihantar ke platform awan untuk rujukan. Maklumat ini membantu pekebun membuat keputusan pengurusan tanah yang lebih tepat, meningkatkan hasil tanaman dan mengurangkan penggunaan baja berlebihan yang boleh menjejaskan alam sekitar." },
  pts: { en: ["IoT-based soil nutrient content reference", "Portable", "Real-time", "Rapid and non-destructive: fast data reference and a reading method that does not damage the soil", "Ready product, available in the market"],
         ms: ["Rujukan kandungan nutrien tanah berasaskan IoT", "Mudah alih", "Masa nyata", "Pantas dan tidak merosakkan: rujukan data segera dengan kaedah bacaan yang tidak merosakkan tanah", "Produk sedia ada di pasaran"] } },

{ id: "atipm", cat: "A", n: 3, page: 8, img: "atipm", name: "AT-IPM CACAO", tags: ["pest", "digital"],
  sub: { en: "Action Threshold – Integrated Pest Management", ms: "Ambang Tindakan – Pengurusan Perosak Bersepadu" },
  desc: { en: "AT-IPM CACAO is a decision-making application for Cocoa Pod Borer (CPB) control actions. This application can provide a schedule with date ranges for when control measures need to be implemented. It can reduce insecticide usage for CPB control by up to 50% yearly.",
          ms: "AT-IPM CACAO ialah aplikasi membuat keputusan bagi tindakan kawalan Ulat Pengorek Buah Koko (UPBK). Aplikasi ini menyediakan jadual dengan julat tarikh bila langkah kawalan perlu dilaksanakan. Ia boleh mengurangkan penggunaan racun serangga untuk kawalan UPBK sehingga 50% setahun." },
  pts: { en: ["Reduces insecticide usage for CPB control by up to 50% annually", "Helps determine the optimal time range for implementing CPB control actions", "Provides concise and comprehensive knowledge on the relationship between cocoa pods and CPB infestation", "Mobile application that can be downloaded to smartphones", "Contains clear and concise information about cocoa cultivation and CPB", "Simple interactive features to generate control date range schedules", "No cybersecurity risks as it does not collect user data"],
         ms: ["Mengurangkan penggunaan racun serangga untuk kawalan UPBK sehingga 50% setahun", "Membantu menentukan julat masa terbaik untuk tindakan kawalan UPBK", "Memberi pengetahuan ringkas dan menyeluruh tentang hubungan buah koko dengan serangan UPBK", "Aplikasi mudah alih yang boleh dimuat turun ke telefon pintar", "Mengandungi maklumat jelas dan ringkas tentang penanaman koko dan UPBK", "Ciri interaktif mudah untuk menjana jadual julat tarikh kawalan", "Tiada risiko keselamatan siber kerana tidak mengumpul data pengguna"] } },

{ id: "hyfer", cat: "A", n: 4, page: 9, img: "hyfer", name: "MCB F1 HYFer", tags: ["soil"],
  sub: { en: "Zeolite-based compound fertilizer", ms: "Baja sebatian berasaskan zeolit" },
  desc: { en: "MCB F1 HYFer is the first compound fertilizer specially formulated through research by the Malaysian Cocoa Board (MCB). This fertilizer is developed with a nutrient ratio tailored to meet the specific needs of high-yielding cocoa trees. MCB F1 HYFer is the only fertilizer in Malaysia that has been developed from the ground up specifically for cocoa cultivation.",
          ms: "MCB F1 HYFer ialah baja sebatian pertama yang diformulasi khas melalui penyelidikan Lembaga Koko Malaysia (LKM). Baja ini dibangunkan dengan nisbah nutrien yang disesuaikan dengan keperluan khusus pokok koko berhasil tinggi. MCB F1 HYFer ialah satu-satunya baja di Malaysia yang dibangunkan dari awal khusus untuk tanaman koko." },
  pts: { en: ["Increases dry cocoa bean yield by up to 24%", "Utilizes zeolite technology for slow nutrient release, enhancing fertilizer efficiency and reducing soil pollution", "Uses readily available raw materials, suitable for large-scale production", "Proven effectiveness through extensive research and field trials", "Widely adopted by cocoa farmers due to its proven performance"],
         ms: ["Meningkatkan hasil biji koko kering sehingga 24%", "Menggunakan teknologi zeolit untuk pelepasan nutrien perlahan, meningkatkan kecekapan baja dan mengurangkan pencemaran tanah", "Menggunakan bahan mentah yang mudah didapati, sesuai untuk pengeluaran berskala besar", "Keberkesanan terbukti melalui penyelidikan dan ujian lapangan yang meluas", "Digunakan secara meluas oleh pekebun koko kerana prestasinya yang terbukti"] } },

{ id: "croped", cat: "A", n: 5, page: 10, img: "croped", name: "CROPED", tags: ["pest", "digital"], link: "https://croped.koko.my/",
  sub: { en: "Cocoa pests and diseases portal (including rodents and other threats)", ms: "Portal perosak dan penyakit koko (termasuk tikus dan ancaman lain)" },
  desc: { en: "CROPED is a web portal developed to disseminate information to users regarding cocoa pests and diseases. The information is presented in the form of images, articles, and descriptions, covering scientific names, damage symptoms, and applicable control measures to ensure that pest and disease infestations are managed using appropriate techniques.",
          ms: "CROPED ialah portal web yang dibangunkan untuk menyebarkan maklumat tentang perosak dan penyakit koko kepada pengguna. Maklumat dipersembahkan dalam bentuk imej, artikel dan huraian, merangkumi nama saintifik, simptom kerosakan dan langkah kawalan yang sesuai supaya serangan perosak dan penyakit diurus dengan teknik yang betul." },
  pts: { en: ["Direct information dissemination to users", "Free access", "Clear and easy-to-understand explanations"],
         ms: ["Penyebaran maklumat terus kepada pengguna", "Akses percuma", "Penerangan yang jelas dan mudah difahami"] } },

{ id: "geococoa", cat: "A", n: 6, page: 11, img: "geococoa", name: "GEOCOCOA", tags: ["pest", "digital"],
  sub: { en: "Geoentomology Intelligence Distribution and Mapping System", ms: "Sistem Pemetaan dan Taburan Perisikan Geoentomologi" },
  desc: { en: "GEOCOCOA is a web portal developed to monitor the severity of cocoa pest and disease infestations based on mapping and heat maps across 123 cocoa grower locations in Peninsular Malaysia.",
          ms: "GEOCOCOA ialah portal web yang dibangunkan untuk memantau tahap keterukan serangan perosak dan penyakit koko berdasarkan pemetaan dan peta haba di 123 lokasi pekebun koko di Semenanjung Malaysia." },
  pts: { en: ["Direct information dissemination to users, especially MCB staff and extension agents", "Free access", "Mapping of infestation levels using heat maps for easier understanding"],
         ms: ["Penyebaran maklumat terus kepada pengguna, khususnya kakitangan LKM dan ejen pengembangan", "Akses percuma", "Pemetaan tahap serangan menggunakan peta haba supaya lebih mudah difahami"] } },

{ id: "biocontrol", cat: "A", n: 7, page: 12, img: "biocontrol", name: "MCB Biocontrol Agent", tags: ["pest"],
  sub: { en: "Biopesticide", ms: "Biopestisid" },
  desc: { en: "MCB Biocontrol Agent is an innovative technology for the integrated management of major cocoa pests and diseases, specifically black pod disease (BP) and cocoa pod borer (CPB). This microbe-based formulation, derived from natural materials, is safe, user-friendly, cost-effective, and non-toxic to non-target organisms.",
          ms: "MCB Biocontrol Agent ialah teknologi inovatif untuk pengurusan bersepadu perosak dan penyakit utama koko, khususnya penyakit buah hitam (BP) dan ulat pengorek buah koko (UPBK). Formulasi berasaskan mikrob daripada bahan semula jadi ini selamat, mesra pengguna, kos efektif dan tidak toksik kepada organisma bukan sasaran." },
  pts: { en: ["Innovative and integrated solution", "Environmentally friendly and safe to use", "Highly effective in pest and disease control", "Cost-effective and sustainable solution", "Easy to use and scalable for mass production", "Enhances cocoa productivity and quality"],
         ms: ["Penyelesaian inovatif dan bersepadu", "Mesra alam dan selamat digunakan", "Sangat berkesan mengawal perosak dan penyakit", "Penyelesaian kos efektif dan lestari", "Mudah digunakan dan boleh dihasilkan secara besar-besaran", "Meningkatkan produktiviti dan kualiti koko"] } },

{ id: "biochar", cat: "A", n: 8, page: 13, img: "biochar", name: "MCB Biochar", tags: ["soil", "waste"],
  sub: { en: "Organic farming input", ms: "Input pertanian organik" },
  desc: { en: "Biochar made from cocoa husks is a soil enhancement product that improves soil fertility and consequently increases cocoa yield.",
          ms: "Biochar daripada kulit koko ialah produk pembaik tanah yang meningkatkan kesuburan tanah dan seterusnya menambah hasil koko." },
  pts: { en: ["Higher nutrient value compared to raw cocoa pod husks (acts as a nutrient reservoir)", "Absorbs water", "Permanently stores a large amount of CO₂ in the soil (carbon sequestration)", "Has acid-neutralizing capacity (liming effect)", "Improves physical properties of soil", "Converts carbon in biomass into a stable carbon structure within the biochar", "Attracts and binds pollutants, toxins, and harmful metals to its surface, making it suitable for soil remediation, water filtration, and purification of contaminated water", "Acts as a carrier for inoculants, enhancing soil function and crop productivity", "Can be used as a feed additive or supplement to improve animal welfare", "Can be added to silage, compost, and used for fertilizer treatment", "Zero waste", "Easy to produce"],
         ms: ["Nilai nutrien lebih tinggi berbanding kulit buah koko mentah (bertindak sebagai takungan nutrien)", "Menyerap air", "Menyimpan sejumlah besar CO₂ di dalam tanah secara kekal (penyerapan karbon)", "Berupaya meneutralkan asid (kesan pengapuran)", "Memperbaiki sifat fizikal tanah", "Menukar karbon dalam biojisim kepada struktur karbon yang stabil di dalam biochar", "Menarik dan mengikat bahan cemar, toksin dan logam berbahaya pada permukaannya; sesuai untuk pemulihan tanah, penapisan air dan penulenan air tercemar", "Bertindak sebagai pembawa inokulan, meningkatkan fungsi tanah dan produktiviti tanaman", "Boleh digunakan sebagai bahan tambahan makanan ternakan untuk meningkatkan kebajikan haiwan", "Boleh ditambah pada silaj, kompos dan digunakan untuk rawatan baja", "Sifar sisa", "Mudah dihasilkan"] } },

{ id: "cocoamat", cat: "A", n: 9, page: 14, img: "cocoamat", name: "COCOA-MAT", tags: [],
  sub: { en: "Multi-purpose agricultural tool", ms: "Alat pertanian pelbagai guna" },
  desc: { en: "COCOA-MAT is a multi-purpose field tool specifically designed for cocoa field management, aimed at improving productivity and making it easier for smallholder cocoa farmers to carry tools to the field. This multi-functional tool integrates several agricultural implements to enhance farmers' ability to perform multiple field tasks simultaneously while reducing the number of tools needed on-site.",
          ms: "COCOA-MAT ialah alat ladang pelbagai guna yang direka khas untuk pengurusan kebun koko, bertujuan meningkatkan produktiviti dan memudahkan pekebun kecil membawa peralatan ke kebun. Alat pelbagai fungsi ini menggabungkan beberapa peralatan pertanian supaya pekebun dapat melakukan pelbagai kerja serentak sambil mengurangkan bilangan alat yang perlu dibawa." },
  pts: { en: ["Multi-functional", "Telescopic pole", "Reduces the number of tools needed in the field", "Easy to carry to the field", "Improves cocoa harvesting efficiency", "Reduces the risk of injury when transporting agricultural tools"],
         ms: ["Pelbagai fungsi", "Galah teleskopik", "Mengurangkan bilangan alat yang diperlukan di kebun", "Mudah dibawa ke kebun", "Meningkatkan kecekapan penuaian koko", "Mengurangkan risiko kecederaan semasa membawa peralatan pertanian"] } },

{ id: "carbon", cat: "A", n: 10, page: 15, img: "carbon", name: "MCB Activated Carbon", tags: ["waste"],
  sub: { en: "Activated carbon from cocoa shells", ms: "Karbon teraktif daripada kulit koko" },
  desc: { en: "Currently, cocoa husks do not have any specific technical applications, making them an interesting subject for researchers aiming to develop more useful and profitable products for the cocoa grinding industry. One way to increase the value of this by-product is by converting the waste into activated carbon. In this study, activated carbon (AC) was produced from cocoa husks, which are abundantly available in Malaysia, through physical activation. The results indicate that the activated carbon derived from cocoa husks can be used as a potential adsorbent material for methylene blue (MB) in water treatment.",
          ms: "Pada masa ini kulit koko tidak mempunyai kegunaan teknikal yang khusus, menjadikannya subjek menarik bagi penyelidik yang ingin membangunkan produk lebih berguna dan menguntungkan untuk industri pengisaran koko. Salah satu cara menambah nilai hasil sampingan ini ialah menukarkannya kepada karbon teraktif. Dalam kajian ini, karbon teraktif (AC) dihasilkan daripada kulit koko, yang banyak terdapat di Malaysia, melalui pengaktifan fizikal. Dapatan menunjukkan karbon teraktif daripada kulit koko berpotensi digunakan sebagai bahan penjerap metilena biru (MB) dalam rawatan air." },
  pts: { en: ["Turns a cocoa grinding by-product into a higher-value material", "Produced through physical activation", "Potential adsorbent for methylene blue in water treatment"],
         ms: ["Menukar hasil sampingan pengisaran koko kepada bahan bernilai lebih tinggi", "Dihasilkan melalui pengaktifan fizikal", "Berpotensi sebagai penjerap metilena biru dalam rawatan air"] } },

{ id: "diet", cat: "A", n: 11, page: 16, img: "diet", name: "MCB Artificial Diet", tags: ["pest"],
  sub: { en: "Artificial diet for sterilising cocoa pod borer", ms: "Diet tiruan untuk pemandulan ulat pengorek buah koko" },
  desc: { en: "An artificial diet technology has been developed for breeding the Cocoa Pod Borer (CPB), a major threat to the cocoa industry. This diet provides optimal nutrition, allowing CPB insects to be mass-reared in laboratories to support the Sterile Insect Technique (SIT) as part of an Integrated Pest Management (IPM) strategy. In the SIT method, lab-reared CPB insects are sterilized using radiation before being released into the field. When these sterile insects mate with wild CPB, no offspring are produced, gradually reducing the pest population. Before SIT can be implemented, CPB must be reared up to the 8th generation to ensure the stability and effectiveness of the artificial diet.",
          ms: "Teknologi diet tiruan telah dibangunkan untuk membiak Ulat Pengorek Buah Koko (UPBK), ancaman utama kepada industri koko. Diet ini membekalkan nutrisi optimum supaya serangga UPBK dapat dibiak secara besar-besaran di makmal bagi menyokong Teknik Serangga Mandul (SIT) sebagai sebahagian daripada strategi Pengurusan Perosak Bersepadu (IPM). Dalam kaedah SIT, UPBK biakan makmal dimandulkan dengan sinaran sebelum dilepaskan ke ladang. Apabila serangga mandul ini mengawan dengan UPBK liar, tiada anak dihasilkan dan populasi perosak berkurang secara beransur-ansur. Sebelum SIT dilaksanakan, UPBK perlu dibiak sehingga generasi ke-8 untuk memastikan kestabilan dan keberkesanan diet tiruan." },
  pts: { en: ["Supports effective insect control programs", "Improves cocoa productivity and quality", "Promotes sustainable and environmentally friendly methods", "Reduces long-term operational costs in pest control", "Minimizes the need for chemical pesticide usage", "Controls the breeding and infestation of Cocoa Pod Borer (CPB)"],
         ms: ["Menyokong program kawalan serangga yang berkesan", "Meningkatkan produktiviti dan kualiti koko", "Menggalakkan kaedah lestari dan mesra alam", "Mengurangkan kos operasi jangka panjang dalam kawalan perosak", "Meminimumkan keperluan racun perosak kimia", "Mengawal pembiakan dan serangan UPBK"] } },

{ id: "bioaction", cat: "A", n: 12, page: 17, img: "bioaction", name: "MCB BioAction", tags: ["pest"],
  sub: { en: "Biopesticide", ms: "Biopestisid" },
  desc: { en: "MCB BioAction is a dual-action \"2-in-1\" product designed for disease control and to enhance the growth rate of cocoa trees. It contains endophytic bacterial microorganisms isolated from cocoa plant tissues. The product is formulated using spray drying technology, a process intended to prolong the viability of the endophytic bacteria for longer storage and to maintain a high colony count in powdered form.",
          ms: "MCB BioAction ialah produk dwi-tindakan \"2-dalam-1\" yang direka untuk kawalan penyakit dan meningkatkan kadar pertumbuhan pokok koko. Ia mengandungi mikroorganisma bakteria endofit yang dipencilkan daripada tisu pokok koko. Produk ini diformulasi dengan teknologi pengeringan sembur, iaitu proses untuk memanjangkan daya hidup bakteria endofit bagi penyimpanan lebih lama dan mengekalkan kiraan koloni yang tinggi dalam bentuk serbuk." },
  pts: { en: ["Easy to handle", "Portable", "User-friendly"], ms: ["Mudah dikendalikan", "Mudah alih", "Mesra pengguna"] } },

{ id: "bioshield", cat: "A", n: 13, page: 18, img: "bioshield", name: "MCB BioShield", tags: ["soil"],
  sub: { en: "Combination of bio-fertilizer and bio-protectant", ms: "Gabungan bio-baja dan bio-pelindung" },
  desc: { en: "BioShield is an innovative combination of bio-fertilizer and bio-protector specially designed to enhance cocoa trees' tolerance to water stress. This technology aims to support cocoa farmers in facing challenges such as floods and droughts, which can negatively impact cocoa growth and yield.",
          ms: "BioShield ialah gabungan inovatif bio-baja dan bio-pelindung yang direka khas untuk meningkatkan ketahanan pokok koko terhadap tekanan air. Teknologi ini bertujuan membantu pekebun koko menghadapi cabaran seperti banjir dan kemarau yang boleh menjejaskan pertumbuhan dan hasil koko." },
  pts: { en: ["100% natural for healthy plant growth", "Promotes microbial activity under climate stress", "Naturally improves and bioremediates soil", "Provides crop protection against climate stress", "Stimulates plant growth"],
         ms: ["100% semula jadi untuk pertumbuhan pokok yang sihat", "Menggalakkan aktiviti mikrob ketika tekanan iklim", "Memperbaiki dan memulihkan tanah secara semula jadi", "Melindungi tanaman daripada tekanan iklim", "Merangsang pertumbuhan pokok"] } },

{ id: "kokocorrect", cat: "A", n: 14, page: 19, img: "kokocorrect", name: "MCB KokoCorrect", tags: ["genetics"],
  sub: { en: "Special kit for molecular markers", ms: "Kit khas penanda molekul" },
  desc: { en: "A DNA-based molecular genotyping panel, the first of its kind, developed to verify the authenticity of Malaysia's commercial cocoa clones using only 10 molecular markers, from the seedling stage in the nursery to maturity before distribution to cocoa farmers. This molecular technique is integrated with a blockchain traceability solution in cocoa farms and nurseries through the use of NFC tags and QR codes on verified trees, enabling easy access to each tree's unique ID.",
          ms: "Panel penggenotipan molekul berasaskan DNA, yang pertama seumpamanya, dibangunkan untuk mengesahkan ketulenan klon koko komersial Malaysia dengan hanya 10 penanda molekul, dari peringkat anak benih di tapak semaian hingga matang sebelum diedarkan kepada pekebun. Teknik molekul ini disepadukan dengan penyelesaian kebolehkesanan rantaian blok di kebun dan tapak semaian melalui tag NFC dan kod QR pada pokok yang disahkan, memudahkan akses kepada ID unik setiap pokok." },
  pts: { en: ["Accurate identification of Malaysia's commercial cocoa clones at all stages of plant growth", "Management of contamination in cocoa planting materials", "Supports breeding programs and screening of cocoa clones", "Enhances cocoa production and pest & disease management", "Verification of planting materials at every growth stage", "Identification and recovery of missing tags, labels or records for planting materials in nurseries and farms", "Intellectual Property Rights (IPR) protection for Malaysia's commercial cocoa varieties"],
         ms: ["Pengenalpastian tepat klon koko komersial Malaysia pada semua peringkat pertumbuhan", "Pengurusan pencemaran dalam bahan tanaman koko", "Menyokong program pembiakbakaan dan saringan klon koko", "Meningkatkan pengeluaran koko serta pengurusan perosak dan penyakit", "Pengesahan bahan tanaman pada setiap peringkat pertumbuhan", "Mengenal pasti dan memulihkan tag, label atau rekod bahan tanaman yang hilang di tapak semaian dan kebun", "Perlindungan Hak Harta Intelek (IPR) bagi varieti koko komersial Malaysia"] } },

{ id: "kokoselect", cat: "A", n: 15, page: 20, img: "kokoselect", name: "MCB KokoSelect", tags: ["genetics"],
  sub: { en: "Bio-diagnostic kit", ms: "Kit bio-diagnostik" },
  desc: { en: "The global cocoa genome sequencing project has significantly advanced the genetic improvement of cocoa trees. Through KokoSelect, SNPs (Single Nucleotide Polymorphisms) associated with favorable agronomic traits, such as high cocoa fat content, better yields, and resistance to pests and diseases (including Cocoa Pod Borer, Black Pod Disease, and VSD), can be identified. This enables farmers to select superior seedlings without wasting time and resources evaluating large numbers of cocoa seedlings.",
          ms: "Projek penjujukan genom koko sedunia telah memajukan pembaikan genetik pokok koko dengan ketara. Melalui KokoSelect, SNP (Polimorfisme Nukleotida Tunggal) yang berkait dengan ciri agronomi yang baik, seperti kandungan lemak koko tinggi, hasil lebih baik dan ketahanan terhadap perosak dan penyakit (termasuk UPBK, penyakit buah hitam dan VSD), dapat dikenal pasti. Ini membolehkan pekebun memilih anak benih unggul tanpa membazir masa dan sumber menilai anak benih dalam jumlah yang banyak." },
  pts: { en: ["An advanced bio-diagnostic solution for cocoa farmers and breeders, using molecular technology to identify seedlings with superior agronomic traits", "Genetic markers such as SNPs associated with disease resistance, high yield, and cocoa pod quality", "Accurate, reliable, and cost-effective identification of high-performing planting materials", "Promotes sustainable cocoa farming, reduces planting risks, and accelerates the path to profitability and higher productivity"],
         ms: ["Penyelesaian bio-diagnostik termaju untuk pekebun dan pembiak baka koko, menggunakan teknologi molekul untuk mengenal pasti anak benih dengan ciri agronomi unggul", "Penanda genetik seperti SNP yang berkait dengan ketahanan penyakit, hasil tinggi dan kualiti buah koko", "Pengenalpastian bahan tanaman berprestasi tinggi yang tepat, boleh dipercayai dan kos efektif", "Menggalakkan penanaman koko lestari, mengurangkan risiko penanaman dan mempercepat laluan ke arah keuntungan serta produktiviti lebih tinggi"] } },

/* ───────── B · Personal care ───────── */
{ id: "lipstick", cat: "B", n: 1, page: 24, img: "lipstick", name: "BEAUTECOA Lipstick", tags: ["face"],
  sub: { en: "Cocoa-based lipstick", ms: "Gincu berasaskan koko" },
  pts: { en: ["Natural moisturizer: cocoa butter is a natural moisturizer that helps prevent chapped lips", "Smooth application: provides a smooth finish and adds a touch of luxury to your appearance", "Safe: free from mercury content"],
         ms: ["Pelembap semula jadi: lemak koko ialah pelembap semula jadi yang membantu mencegah bibir merekah", "Sapuan licin: memberi kemasan halus dan sentuhan mewah pada penampilan", "Selamat: bebas kandungan merkuri"] } },

{ id: "moisturizer", cat: "B", n: 2, page: 25, img: "moisturizer", name: "BEAUTECOA Moisturizing Cream", tags: ["face"],
  sub: { en: "Cocoa-based moisturizing cream", ms: "Krim pelembap berasaskan koko" },
  pts: { en: ["Intensive moisture: provides long-lasting deep hydration, suitable for dry and rough skin", "Natural antioxidants: cocoa butter contains natural vitamin E that acts as an antioxidant to help combat signs of aging and protect the skin from free radical damage", "Lightweight and non-greasy texture: easily absorbed by the skin without leaving a greasy feel, suitable for all-day use"],
         ms: ["Kelembapan intensif: memberi hidrasi mendalam yang tahan lama, sesuai untuk kulit kering dan kasar", "Antioksidan semula jadi: lemak koko mengandungi vitamin E semula jadi yang bertindak sebagai antioksidan untuk membantu melawan tanda penuaan dan melindungi kulit daripada kerosakan radikal bebas", "Tekstur ringan dan tidak berminyak: mudah diserap kulit tanpa rasa berminyak, sesuai digunakan sepanjang hari"] } },

{ id: "cleanser", cat: "B", n: 3, page: 26, img: "cleanser", name: "BEAUTECOA Facial Cleanser", tags: ["face"],
  sub: { en: "Cocoa-based facial cleanser", ms: "Pencuci muka berasaskan koko" },
  pts: { en: [SAME_SKIN, "Contains plant extracts with multifunctional actions including cleansing", "Visible positive effects within four weeks (when used together with Cocoa Facial Toner)"],
         ms: [SAME_SKIN_MS, "Mengandungi ekstrak tumbuhan pelbagai fungsi termasuk membersih", "Kesan positif kelihatan dalam empat minggu (apabila digunakan bersama Toner Muka Koko)"] } },

{ id: "toner", cat: "B", n: 4, page: 27, img: "toner", name: "BEAUTECOA Facial Toner", tags: ["face"],
  sub: { en: "Cocoa-based facial toner", ms: "Toner muka berasaskan koko" },
  pts: { en: [SAME_SKIN, "Contains plant extracts with multifunctional effects that cleanse and soften facial skin", "Positive results within four weeks (when used together with Cocoa Facial Cleanser)"],
         ms: [SAME_SKIN_MS, "Mengandungi ekstrak tumbuhan pelbagai fungsi yang membersih dan melembutkan kulit wajah", "Hasil positif dalam empat minggu (apabila digunakan bersama Pencuci Muka Koko)"] } },

{ id: "scrub", cat: "B", n: 5, page: 28, img: "scrub", name: "BEAUTECOA Facial Scrub", tags: ["face", "waste"],
  sub: { en: "Cocoa-based facial scrub", ms: "Skrub muka berasaskan koko" },
  pts: { en: ["Cocoa pod husk powder helps to gently remove dead skin cells", "Special formulation that is skin-friendly", "Contains plant extracts with multiple functions, including cleansing and gently exfoliating dead skin", "Positive effects within four weeks"],
         ms: ["Serbuk kulit buah koko membantu menanggalkan sel kulit mati dengan lembut", "Formulasi khas yang mesra kulit", "Mengandungi ekstrak tumbuhan pelbagai fungsi, termasuk membersih dan mengelupas kulit mati dengan lembut", "Kesan positif dalam empat minggu"] } },

{ id: "antiwrinkle", cat: "B", n: 6, page: 29, img: "antiwrinkle", name: "BEAUTECOA Anti-Wrinkle Gel", tags: ["face"],
  sub: { en: "Cocoa-based anti-wrinkle gel", ms: "Gel antikedut berasaskan koko" },
  pts: { en: [SAME_SKIN, "Contains plant extracts with multifunctional effects that cleanse, soften, and reduce facial wrinkles", "Positive results within four weeks"],
         ms: [SAME_SKIN_MS, "Mengandungi ekstrak tumbuhan pelbagai fungsi yang membersih, melembut dan mengurangkan kedutan wajah", "Hasil positif dalam empat minggu"] } },

{ id: "footcream", cat: "B", n: 7, page: 29, img: "footcream", name: "BEAUTECOA Foot Cream", tags: ["feet"],
  sub: { en: "Cocoa-based foot cream", ms: "Krim kaki berasaskan koko" },
  pts: { en: [SAME_SKIN, "Contains plant extracts with dual functions: reducing skin cracks and softening the skin", "Positive effects visible within two weeks"],
         ms: [SAME_SKIN_MS, "Mengandungi ekstrak tumbuhan dwi-fungsi: mengurangkan rekahan kulit dan melembutkan kulit", "Kesan positif kelihatan dalam dua minggu"] } },

{ id: "footscrub", cat: "B", n: 8, page: 30, img: "footscrub", name: "BEAUTECOA Foot Scrub", tags: ["feet", "waste"],
  sub: { en: "Cocoa-based foot scrub", ms: "Skrub kaki berasaskan koko" },
  pts: { en: ["Cocoa fruit peel powder helps gently remove dead skin", SAME_SKIN, "Contains plant extracts with dual functions: reducing skin cracks and softening the skin", "Positive effects visible within two weeks"],
         ms: ["Serbuk kulit buah koko membantu menanggalkan kulit mati dengan lembut", SAME_SKIN_MS, "Mengandungi ekstrak tumbuhan dwi-fungsi: mengurangkan rekahan kulit dan melembutkan kulit", "Kesan positif kelihatan dalam dua minggu"] } },

{ id: "shampoo", cat: "B", n: 9, page: 30, img: "shampoo", name: "BEAUTECOA Hair Shampoo", tags: ["hair"],
  sub: { en: "Cocoa-based liquid shampoo", ms: "Syampu cecair berasaskan koko" },
  pts: { en: HAIR_EN.concat(["Positive effects visible within four weeks (when used together with Cocoa Cream Conditioner)"]),
         ms: HAIR_MS.concat(["Kesan positif kelihatan dalam empat minggu (apabila digunakan bersama Perapi Krim Koko)"]) } },

{ id: "barshampoo", cat: "B", n: 10, page: 31, img: "barshampoo", name: "BEAUTECOA Bar Shampoo", tags: ["hair"],
  sub: { en: "Cocoa-based hair bar shampoo", ms: "Syampu rambut berbentuk bar berasaskan koko" },
  pts: { en: HAIR_EN.concat(["Positive effects visible within four weeks (when used together with Cocoa Conditioner Bar)"]),
         ms: HAIR_MS.concat(["Kesan positif kelihatan dalam empat minggu (apabila digunakan bersama Bar Perapi Koko)"]) } },

{ id: "conditioner", cat: "B", n: 11, page: 32, img: "conditioner", name: "BEAUTECOA Hair Conditioner", tags: ["hair"],
  sub: { en: "Cocoa-based cream conditioner", ms: "Perapi krim berasaskan koko" },
  pts: { en: HAIR_EN.concat(["Positive effects visible within four weeks (when used together with Cocoa Shampoo Liquid)"]),
         ms: HAIR_MS.concat(["Kesan positif kelihatan dalam empat minggu (apabila digunakan bersama Syampu Cecair Koko)"]) } },

{ id: "barconditioner", cat: "B", n: 12, page: 33, img: "barconditioner", name: "BEAUTECOA Bar Conditioner", tags: ["hair"],
  sub: { en: "Cocoa-based hair bar conditioner", ms: "Perapi rambut berbentuk bar berasaskan koko" },
  pts: { en: HAIR_EN.concat(["Positive effects visible within four weeks (when used together with Cocoa Shampoo Bar)"]),
         ms: HAIR_MS.concat(["Kesan positif kelihatan dalam empat minggu (apabila digunakan bersama Bar Syampu Koko)"]) } },

{ id: "antidandruff", cat: "B", n: 13, page: 34, img: "antidandruff", name: "BEAUTECOA Anti-Dandruff Hair Gel", tags: ["hair", "waste"],
  sub: { en: "Cocoa-based anti-dandruff hairstyling gel", ms: "Gel penggaya rambut antikelemumur berasaskan koko" },
  pts: { en: ["Anti-dandruff based on cocoa pod husk extract: contains natural active ingredients proven effective in reducing dandruff formation and maintaining the balance of the scalp microbiota", "Maintains moisture and scalp health: helps control excess oil without drying out the scalp, resulting in healthier and fresher hair", "Comfortable and non-sticky hair hold: helps maintain hairstyle throughout the day with a lightweight texture that does not cause white flakes", "Soothes the scalp and reduces irritation: a gentle formula that helps relieve itchiness and scalp irritation, providing long-term comfort", "Cocoa-based innovation: utilizes the potential of cocoa pod husk in cosmetic products, supporting the Malaysian cocoa industry and enhancing the value of cocoa by-products"],
         ms: ["Antikelemumur berasaskan ekstrak kulit buah koko: mengandungi bahan aktif semula jadi yang terbukti berkesan mengurangkan pembentukan kelemumur dan mengekalkan keseimbangan mikrobiota kulit kepala", "Mengekalkan kelembapan dan kesihatan kulit kepala: membantu mengawal minyak berlebihan tanpa mengeringkan kulit kepala, untuk rambut lebih sihat dan segar", "Pegangan rambut yang selesa dan tidak melekit: membantu mengekalkan gaya rambut sepanjang hari dengan tekstur ringan yang tidak meninggalkan serpihan putih", "Menenangkan kulit kepala dan mengurangkan kerengsaan: formula lembut yang membantu melegakan kegatalan dan kerengsaan kulit kepala untuk keselesaan jangka panjang", "Inovasi berasaskan koko: memanfaatkan potensi kulit buah koko dalam produk kosmetik, menyokong industri koko Malaysia dan menambah nilai hasil sampingan koko"] } },

{ id: "skincare", cat: "B", n: 14, page: 35, img: "skincare", name: "MARVELLES Skin Care", tags: ["face"],
  sub: { en: "Cocoa-based skin care", ms: "Penjagaan kulit berasaskan koko" },
  pts: { en: ["Improves facial skin health", "Helps hydrate and nourish facial skin", "Promotes anti-aging", "Prevents acne-related skin issues within 24 hours", "Manufactured in a GMP-certified facility", "Approved by the Ministry of Health Malaysia (MOH)"],
         ms: ["Meningkatkan kesihatan kulit wajah", "Membantu menghidrat dan menyuburkan kulit wajah", "Menggalakkan antipenuaan", "Mencegah masalah kulit berkaitan jerawat dalam masa 24 jam", "Dikilangkan di fasiliti bertauliah GMP", "Diluluskan oleh Kementerian Kesihatan Malaysia (KKM)"] } },

/* ───────── C · Functional foods & beverages ───────── */
{ id: "energybar", cat: "C", n: 1, page: 38, img: "energybar", name: "MCB Energy Bar Chocolate", tags: ["choc"],
  sub: { en: "70% dark chocolate energy bar enriched with kelulut honey and sacha inchi oil", ms: "Bar tenaga coklat gelap 70% diperkaya madu kelulut dan minyak sacha inchi" },
  desc: { en: "MCB Energy Bar Chocolate is an energy bar coated with dark chocolate (70% cocoa), which contains high levels of antioxidants (flavonoids and polyphenols). It also includes nutrient-rich ingredients such as oats and almonds (high in fiber for prolonged satiety), stingless bee honey (a natural sweetener and energy source), cranberries (antioxidants), and sacha inchi oil (rich in omega-3 and omega-6 fatty acids).",
          ms: "MCB Energy Bar Chocolate ialah bar tenaga bersalut coklat gelap (70% koko) yang tinggi antioksidan (flavonoid dan polifenol). Ia turut mengandungi bahan kaya nutrien seperti oat dan badam (tinggi serat untuk kenyang lebih lama), madu kelulut (pemanis semula jadi dan sumber tenaga), kranberi (antioksidan) dan minyak sacha inchi (kaya asid lemak omega-3 dan omega-6)." },
  pts: { en: ["Dark chocolate (70% cocoa) rich in antioxidants", "Product shelf life of 6 months", "Stingless bee honey as a natural sweetener and energy source", "Well-received by consumers aged 12–70", "Small-sized snack", "Healthy fats (omega-3 and omega-6 fatty acids)", "A healthy snack suitable for breakfast, outdoor activities, and vegans"],
         ms: ["Coklat gelap (70% koko) kaya antioksidan", "Jangka hayat produk 6 bulan", "Madu kelulut sebagai pemanis semula jadi dan sumber tenaga", "Diterima baik oleh pengguna berumur 12–70 tahun", "Snek bersaiz kecil", "Lemak sihat (asid lemak omega-3 dan omega-6)", "Snek sihat yang sesuai untuk sarapan, aktiviti luar dan vegan"] } },

{ id: "singleorigin", cat: "C", n: 2, page: 39, img: "singleorigin", name: "MCB Single Origin Chocolate", tags: ["choc", "nosugar"],
  sub: { en: "Jengka single origin vegan dark chocolate with 70% cocoa", ms: "Coklat gelap vegan asalan tunggal Jengka dengan 70% koko" },
  desc: { en: "Jengka Single Origin Vegan Dark Chocolate (70% cocoa) contains catechins, epicatechins, and procyanidins, which are key polyphenols contributing to antioxidant activity that helps reduce the risk of various diseases (such as heart disease and cancer), as well as providing anti-aging and anti-inflammatory benefits. This chocolate contains no milk or animal-derived products and is made without refined sugar, making it an ideal choice for those seeking vegan-friendly chocolate. The cocoa beans used are sourced from the Cocoa Research and Development Centre (CRDC) in Jengka, which received the Cacao of Excellence national award in 2022.",
          ms: "Coklat Gelap Vegan Asalan Tunggal Jengka (70% koko) mengandungi katekin, epikatekin dan prosianidin, iaitu polifenol utama yang menyumbang kepada aktiviti antioksidan yang membantu mengurangkan risiko pelbagai penyakit (seperti penyakit jantung dan kanser) serta memberi manfaat antipenuaan dan antiradang. Coklat ini tidak mengandungi susu atau bahan berasaskan haiwan dan dibuat tanpa gula bertapis, menjadikannya pilihan ideal bagi penggemar coklat mesra vegan. Biji koko diperoleh dari Pusat Penyelidikan dan Pembangunan Koko (PPPK) Jengka yang menerima anugerah kebangsaan Cacao of Excellence pada 2022." },
  pts: { en: ["Cocoa and chocolate processed using the bean-to-bar technique", "Rich in minerals and antioxidants", "Well-received by consumers aged 20–45", "Contains a unique and superior fruity flavor profile", "Safe, free from pesticide residues and heavy metals", "Recipient of the national Cacao of Excellence award in 2022"],
         ms: ["Koko dan coklat diproses dengan teknik biji-ke-bar (bean-to-bar)", "Kaya mineral dan antioksidan", "Diterima baik oleh pengguna berumur 20–45 tahun", "Mempunyai profil rasa buah-buahan yang unik dan unggul", "Selamat, bebas sisa racun perosak dan logam berat", "Penerima anugerah kebangsaan Cacao of Excellence 2022"] } },

{ id: "kacipfatimah", cat: "C", n: 3, page: 40, img: "kacipfatimah", name: "MCB Cocoa Kacip Fatimah Drink", tags: ["drink", "nosugar"],
  sub: { en: "Dark chocolate 3-in-1 drinking cocoa powder with Kacip Fatimah extract", ms: "Serbuk minuman koko coklat gelap 3-dalam-1 dengan ekstrak Kacip Fatimah" },
  desc: { en: "Kacip Fatimah is one of the most popular ingredients in traditional herbal preparations or jamu for women's health care. The booklet cites past studies on its anti-inflammatory and other properties, its use for blood circulation and menstrual comfort, and trials on osteoporosis and weight reduction. Studies indicate that the addition of Kacip Fatimah extract increases the antioxidant activity in sugar-free dark chocolate beverages to 79.5%, compared to 70.19% in commercial dark chocolate beverages.",
          ms: "Kacip Fatimah ialah antara bahan paling popular dalam ramuan herba tradisional atau jamu untuk penjagaan kesihatan wanita. Buku kecil ini memetik kajian lepas tentang sifat antiradang dan khasiat lain, kegunaannya untuk peredaran darah dan keselesaan haid, serta ujian berkaitan osteoporosis dan penurunan berat badan. Kajian menunjukkan penambahan ekstrak Kacip Fatimah meningkatkan aktiviti antioksidan dalam minuman coklat gelap tanpa gula kepada 79.5%, berbanding 70.19% dalam minuman coklat gelap komersial." },
  pts: { en: ["Cocoa content in the dark chocolate drink is rich in antioxidants", "High in phenolic compounds and antioxidant activity", "Contains Kacip Fatimah extract", "Specially formulated for women's health", "Helps stabilize hormones, with anti-inflammatory and anti-aging properties", "Supports the management of osteoporosis and aids in weight reduction", "Sweetened with monk fruit as a zero-calorie alternative to regular sugar", "Well-received by female consumers aged 21–50 (based on feedback from 50 panelists)"],
         ms: ["Kandungan koko dalam minuman coklat gelap kaya antioksidan", "Tinggi sebatian fenolik dan aktiviti antioksidan", "Mengandungi ekstrak Kacip Fatimah", "Diformulasi khas untuk kesihatan wanita", "Membantu menstabilkan hormon, dengan sifat antiradang dan antipenuaan", "Menyokong pengurusan osteoporosis dan membantu penurunan berat badan", "Dimaniskan dengan buah monk sebagai alternatif sifar kalori kepada gula biasa", "Diterima baik oleh pengguna wanita berumur 21–50 tahun (berdasarkan maklum balas 50 ahli panel)"] } },

{ id: "tongkatali", cat: "C", n: 4, page: 42, img: "tongkatali", img2: "tongkatali2", name: "MCB Cocoa Tongkat Ali Drink", tags: ["drink", "nosugar"],
  sub: { en: "Dark chocolate 3-in-1 drinking cocoa powder with Tongkat Ali extract", ms: "Serbuk minuman koko coklat gelap 3-dalam-1 dengan ekstrak Tongkat Ali" },
  desc: { en: "The addition of Malaysian therapeutic herbs such as Tongkat Ali to cocoa beverage products has the potential to enhance consumer health, particularly among men. Tongkat Ali is traditionally used as a tonic to restore energy and vitality. With the inclusion of Tongkat Ali extract in dark chocolate beverages, antioxidant activity increases from 70.19% (in commercial dark chocolate beverages) to 77.78%, due to the presence of flavonoids, alkaloids, and quassinoids in the extract.",
          ms: "Penambahan herba terapeutik Malaysia seperti Tongkat Ali ke dalam minuman koko berpotensi meningkatkan kesihatan pengguna, khususnya lelaki. Tongkat Ali digunakan secara tradisional sebagai tonik untuk memulihkan tenaga dan kecergasan. Dengan ekstrak Tongkat Ali dalam minuman coklat gelap, aktiviti antioksidan meningkat daripada 70.19% (minuman coklat gelap komersial) kepada 77.78%, hasil kehadiran flavonoid, alkaloid dan kuasinoid dalam ekstrak tersebut." },
  pts: { en: ["Cocoa content in the dark chocolate drink is rich in antioxidants", "High in phenolic compounds and antioxidant activity", "Contains Tongkat Ali extract", "Specially formulated for men's health", "Supports energy recovery and vitality", "Sweetened with monk fruit as a zero-calorie alternative to regular sugar", "Well-received by male consumers aged 21–54 (based on feedback from 57 panelists)"],
         ms: ["Kandungan koko dalam minuman coklat gelap kaya antioksidan", "Tinggi sebatian fenolik dan aktiviti antioksidan", "Mengandungi ekstrak Tongkat Ali", "Diformulasi khas untuk kesihatan lelaki", "Menyokong pemulihan tenaga dan kecergasan", "Dimaniskan dengan buah monk sebagai alternatif sifar kalori kepada gula biasa", "Diterima baik oleh pengguna lelaki berumur 21–54 tahun (berdasarkan maklum balas 57 ahli panel)"] } },

{ id: "gulakelapa", cat: "C", n: 5, page: 44, img: "gulakelapa", name: "MCB Cocoa Gula Kelapa", tags: ["drink"],
  sub: { en: "Milk chocolate 3-in-1 drinking cocoa powder with coconut sugar", ms: "Serbuk minuman koko coklat susu 3-dalam-1 dengan gula kelapa" },
  desc: { en: "The choice of natural sweeteners in food has become a focus for health-conscious individuals. Coconut sugar is one such natural sweetener, alongside stevia and honey. In milk chocolate drink powder, coconut sugar contains vitamins B, C, and E, and is also rich in iron, while calcium contributes to healthy bones and teeth. Coconut sugar also improves the sensory evaluation scores of milk chocolate drinks in terms of sweetness, taste (cocoa, milk, and creaminess), and overall acceptance compared to drinks without it, based on feedback from 60 panelists from the Malaysian Cocoa Board aged 20–60.",
          ms: "Pemilihan pemanis semula jadi dalam makanan kini menjadi tumpuan mereka yang mementingkan kesihatan. Gula kelapa ialah salah satu pemanis semula jadi, selain stevia dan madu. Dalam serbuk minuman coklat susu, gula kelapa mengandungi vitamin B, C dan E serta kaya zat besi, manakala kalsium menyumbang kepada tulang dan gigi yang sihat. Gula kelapa juga meningkatkan skor penilaian deria minuman coklat susu dari segi kemanisan, rasa (koko, susu dan kelemakan) dan penerimaan keseluruhan berbanding minuman tanpanya, berdasarkan maklum balas 60 ahli panel Lembaga Koko Malaysia berumur 20–60 tahun." },
  pts: { en: ["Milk chocolate containing 15% cocoa provides antioxidants and total phenolic content", "Coconut sugar as a natural alternative sweetener to regular sugar", "Well-received by consumers aged 20–60", "Source of essential vitamins (B, C, and E) and minerals (iron and calcium)", "High in iron", "Contains calcium for healthy bones and teeth"],
         ms: ["Coklat susu dengan 15% koko membekalkan antioksidan dan kandungan fenolik", "Gula kelapa sebagai pemanis alternatif semula jadi kepada gula biasa", "Diterima baik oleh pengguna berumur 20–60 tahun", "Sumber vitamin penting (B, C dan E) dan mineral (zat besi dan kalsium)", "Tinggi zat besi", "Mengandungi kalsium untuk tulang dan gigi yang sihat"] } },

{ id: "icecream", cat: "C", n: 6, page: 46, img: "icecream", name: "MCB Cocoa Ice Creams", tags: ["dessert"],
  sub: { en: "Cocoa-based ice cream with 7 different variants", ms: "Aiskrim berasaskan koko dengan 7 varian" },
  desc: { en: "Cocoa butter-based ice cream is a frozen dessert specially formulated with cocoa butter, which contains healthy fatty acids that do not contribute to increased cholesterol levels and support heart health, along with cocoa powder rich in antioxidants beneficial to overall well-being. This unique combination of ingredients offers an ice cream that is not only delicious but also health-enhancing.",
          ms: "Aiskrim berasaskan lemak koko ialah pencuci mulut sejuk beku yang diformulasi khas dengan lemak koko, yang mengandungi asid lemak sihat yang tidak menyumbang kepada peningkatan paras kolesterol dan menyokong kesihatan jantung, bersama serbuk koko yang kaya antioksidan untuk kesejahteraan keseluruhan. Gabungan bahan yang unik ini menghasilkan aiskrim yang bukan sahaja lazat tetapi juga menyihatkan." },
  pts: { en: ["A healthier ice cream option", "Source of healthy fatty acids that do not contribute to increased cholesterol levels and support heart health", "Made from 100% real cocoa powder", "Contains antioxidants beneficial to health", "Smooth, silky, and creamy texture", "Natural color"],
         ms: ["Pilihan aiskrim yang lebih sihat", "Sumber asid lemak sihat yang tidak menyumbang kepada peningkatan paras kolesterol dan menyokong kesihatan jantung", "Diperbuat daripada 100% serbuk koko asli", "Mengandungi antioksidan yang baik untuk kesihatan", "Tekstur halus, lembut dan berkrim", "Warna semula jadi"] } },

{ id: "greencoa", cat: "C", n: 7, page: 47, img: "greencoa", name: "MCB GreenCoa", tags: ["drink", "waste"],
  sub: { en: "Green tea from cocoa leaves", ms: "Teh hijau daripada daun koko" },
  desc: { en: "GreenCoa is a natural beverage made from the leaves of the Theobroma cacao (cocoa) tree, sourced from Malaysian farms that are free from harmful inputs. Unlike traditional cocoa products, GreenCoa uses cocoa leaves. The booklet reports laboratory research with Universiti Malaysia Pahang (UMP) on the leaves' activity against breast cancer cells.",
          ms: "GreenCoa ialah minuman semula jadi daripada daun pokok Theobroma cacao (koko), diperoleh dari kebun di Malaysia yang bebas input berbahaya. Tidak seperti produk koko tradisional, GreenCoa menggunakan daun koko. Buku kecil ini melaporkan penyelidikan makmal bersama Universiti Malaysia Pahang (UMP) tentang aktiviti daun koko terhadap sel kanser payudara." },
  pts: { en: ["Laboratory research reported on activity against breast cancer cells", "Helps regulate blood sugar levels", "Aids in controlling blood cholesterol levels", "Supports weight management", "Rich source of antioxidants", "Leaves are free from chemical use", "Certified Halal by JAKIM"],
         ms: ["Penyelidikan makmal dilaporkan tentang aktiviti terhadap sel kanser payudara", "Membantu mengawal paras gula dalam darah", "Membantu mengawal paras kolesterol darah", "Menyokong pengurusan berat badan", "Sumber antioksidan yang kaya", "Daun bebas penggunaan bahan kimia", "Disahkan Halal oleh JAKIM"] } },

{ id: "flavint", cat: "C", n: 8, page: 48, img: "flavint", name: "MCB FLAVINT", tags: ["extract", "nosugar"],
  sub: { en: "High anti-oxidant chewable tablet", ms: "Tablet kunyah tinggi antioksidan" },
  desc: { en: "FLAVINT is a chewable tablet supplement formulated with a pleasant taste and enjoyable texture to support overall health. Enriched with cocoa polyphenol extract and available in various flavors, it functions not only as a breath freshener and mouth deodorizer but is also suitable for all age groups.",
          ms: "FLAVINT ialah suplemen tablet kunyah yang diformulasi dengan rasa yang enak dan tekstur yang menyenangkan untuk menyokong kesihatan keseluruhan. Diperkaya ekstrak polifenol koko dan terdapat dalam pelbagai perisa, ia bukan sahaja berfungsi sebagai penyegar nafas dan penghilang bau mulut, malah sesuai untuk semua peringkat umur." },
  pts: { en: ["Sugar-free: ideal for health-conscious individuals as it does not raise blood glycemic index", "Variety of flavors: orange, grape, strawberry, menthol, and more", "Smooth texture: pleasant and easy to chew", "High in antioxidants", "Helps combat free radicals", "Supports cellular protection", "Enhances brain health and focus", "Protects heart health", "Helps regulate blood sugar levels"],
         ms: ["Tanpa gula: sesuai untuk mereka yang mementingkan kesihatan kerana tidak menaikkan indeks glisemik darah", "Pelbagai perisa: oren, anggur, strawberi, mentol dan lain-lain", "Tekstur halus: enak dan mudah dikunyah", "Tinggi antioksidan", "Membantu melawan radikal bebas", "Menyokong perlindungan sel", "Meningkatkan kesihatan otak dan fokus", "Melindungi kesihatan jantung", "Membantu mengawal paras gula dalam darah"] } },

{ id: "spread", cat: "C", n: 9, page: 49, img: "spread", name: "MARVELLES Chocolate Spread", tags: ["choc", "nosugar"],
  sub: { en: "Sugar-free chocolate spread", ms: "Sapuan coklat tanpa gula" },
  desc: { en: "Chocolate Spread Sugar-free is rich in natural flavor and has a smooth texture, enriched with peanuts, hazelnuts, and almonds. The combination of high-quality cocoa and premium nuts delivers a creamy, rich taste along with a source of protein and healthy fats for sustained energy. With no added sugar, it is suitable for those following a healthy lifestyle, keto diet, or low-carbohydrate diet. A perfect choice for spreading on bread, mixing into smoothies, or enjoying on its own.",
          ms: "Sapuan Coklat Tanpa Gula kaya dengan rasa semula jadi dan bertekstur halus, diperkaya kacang tanah, hazel dan badam. Gabungan koko berkualiti tinggi dan kekacang premium memberikan rasa berkrim yang kaya serta sumber protein dan lemak sihat untuk tenaga berpanjangan. Tanpa gula tambahan, ia sesuai untuk mereka yang mengamalkan gaya hidup sihat, diet keto atau diet rendah karbohidrat. Pilihan tepat untuk disapu pada roti, dicampur ke dalam smoothie atau dinikmati begitu sahaja." },
  pts: { en: ["No added sugar: suitable for keto and low-carb diets", "Rich in healthy fats: the blend of cocoa butter, peanuts, hazelnuts, and almonds provides good fats and sustained energy", "Natural source of protein: enhances satiety and supports metabolism", "High in antioxidants and vitamins: cocoa is rich in flavonoids", "Healthy fats and protein help control appetite", "Creamy and satisfying taste: smooth texture with rich cocoa flavor and the aroma of premium nuts"],
         ms: ["Tanpa gula tambahan: sesuai untuk diet keto dan rendah karbohidrat", "Kaya lemak sihat: gabungan lemak koko, kacang tanah, hazel dan badam membekalkan lemak baik dan tenaga berpanjangan", "Sumber protein semula jadi: menambah rasa kenyang dan menyokong metabolisme", "Tinggi antioksidan dan vitamin: koko kaya flavonoid", "Lemak sihat dan protein membantu mengawal selera", "Rasa berkrim yang memuaskan: tekstur halus dengan rasa koko yang kaya dan aroma kekacang premium"] } },

{ id: "probiotic", cat: "C", n: 10, page: 50, img: "probiotic", name: "MARVELLES Probiotic Chocolate", tags: ["choc"],
  sub: { en: "Probiotic chocolate", ms: "Coklat probiotik" },
  desc: { en: "Probiotic chocolate is a chocolate formulation that combines beneficial bacteria with prebiotic ingredients to promote the growth of good bacteria and support the gut's essential functions in maintaining its health. In addition, the rich antioxidants in chocolate also contribute to overall health.",
          ms: "Coklat probiotik ialah formulasi coklat yang menggabungkan bakteria baik dengan bahan prebiotik untuk menggalakkan pertumbuhan bakteria baik dan menyokong fungsi penting usus dalam mengekalkan kesihatannya. Antioksidan yang kaya dalam coklat turut menyumbang kepada kesihatan keseluruhan." },
  pts: { en: ["Up to 2x better absorption compared to probiotic drinks available in the market", "Contains up to 10 billion live bacteria enriched with prebiotic inulin in each serving", "Includes 5 beneficial local bacterial strains (Lactobacillus acidophilus, Bacillus subtilis, Lactobacillus rhamnosus, Bifidobacterium longum, Streptococcus thermophilus) for gut health", "No refrigeration needed as the lyophilization process keeps bacteria alive without cooling", "A healthy gut flora enhances absorption of nutrients, minerals, and antioxidants", "Supports the immune system and gut microbiota balance"],
         ms: ["Penyerapan sehingga 2x lebih baik berbanding minuman probiotik di pasaran", "Mengandungi sehingga 10 bilion bakteria hidup diperkaya inulin prebiotik dalam setiap hidangan", "Mengandungi 5 strain bakteria baik tempatan (Lactobacillus acidophilus, Bacillus subtilis, Lactobacillus rhamnosus, Bifidobacterium longum, Streptococcus thermophilus) untuk kesihatan usus", "Tidak perlu disejukkan kerana proses liofilisasi mengekalkan bakteria hidup tanpa penyejukan", "Flora usus yang sihat meningkatkan penyerapan nutrien, mineral dan antioksidan", "Menyokong sistem imun dan keseimbangan mikrobiota usus"] } },

{ id: "keto", cat: "C", n: 11, page: 52, img: "keto", img2: "keto2", name: "MARVELLES Keto Chocolate", tags: ["choc", "nosugar"],
  sub: { en: "Keto chocolate", ms: "Coklat keto" },
  desc: { en: "A dark chocolate formulation containing 80% cocoa ingredients with no sugar, made using German manufacturing technology to achieve a smooth and delicious texture. It contains no preservatives or artificial flavorings and is rich in antioxidants. With its high cocoa content, this keto chocolate is suitable for those following a low-carbohydrate diet.",
          ms: "Formulasi coklat gelap dengan 80% bahan koko tanpa gula, dihasilkan dengan teknologi pembuatan Jerman untuk tekstur yang halus dan lazat. Ia tidak mengandungi pengawet atau perisa tiruan dan kaya antioksidan. Dengan kandungan koko yang tinggi, coklat keto ini sesuai untuk mereka yang mengamalkan diet rendah karbohidrat." },
  pts: { en: ["80% cocoa, no sugar", "No preservatives or artificial flavorings", "High flavonoid content", "Cocoa butter serves as a natural energy source", "Comes in Keto Classic and Keto Coffee"],
         ms: ["80% koko, tanpa gula", "Tanpa pengawet atau perisa tiruan", "Kandungan flavonoid tinggi", "Lemak koko sebagai sumber tenaga semula jadi", "Terdapat dalam Keto Classic dan Keto Coffee"] } },

{ id: "polyphenol", cat: "C", n: 12, page: 54, img: "polyphenol", name: "MCB Polyphenol Extract", tags: ["extract"],
  sub: { en: "Cocoa polyphenol extract", ms: "Ekstrak polifenol koko" },
  desc: { en: "Cocoa Polyphenol Extract is a natural bioactive compound rich in potent antioxidants such as catechins, anthocyanins, and procyanidins. With its high antioxidant activity, this extract is suitable for use in nutraceuticals, cosmeceuticals, and personal care products.",
          ms: "Ekstrak Polifenol Koko ialah sebatian bioaktif semula jadi yang kaya antioksidan kuat seperti katekin, antosianin dan prosianidin. Dengan aktiviti antioksidan yang tinggi, ekstrak ini sesuai digunakan dalam nutraseutikal, kosmeseutikal dan produk penjagaan diri." },
  pts: { en: ["High polyphenol content: 412.9 mg GAE/g of total polyphenols", "High ORAC value (about 61,310 µM TE/100 g)", "Rich in catechins, anthocyanins, and procyanidins", "Suitable for nutraceuticals, cosmeceuticals, and personal care products"],
         ms: ["Kandungan polifenol tinggi: 412.9 mg GAE/g jumlah polifenol", "Nilai ORAC tinggi (kira-kira 61,310 µM TE/100 g)", "Kaya katekin, antosianin dan prosianidin", "Sesuai untuk nutraseutikal, kosmeseutikal dan produk penjagaan diri"] } },

{ id: "husk", cat: "C", n: 13, page: 55, img: "husk", name: "MARVELLES Husk Extract", tags: ["extract", "waste"],
  sub: { en: "Cocoa bean husk extract powder", ms: "Serbuk ekstrak kulit biji koko" },
  desc: { en: "Cocoa Bean Husk Extract Powder is an antibacterial extract powder derived from unfermented cocoa bean husks. This extract exhibits strong antibacterial activity against various Gram-positive and Gram-negative human pathogens. It is produced through an environmentally friendly extraction process, and the powder retains a pleasant natural aroma.",
          ms: "Serbuk Ekstrak Kulit Biji Koko ialah serbuk ekstrak antibakteria daripada kulit biji koko yang tidak difermentasi. Ekstrak ini menunjukkan aktiviti antibakteria yang kuat terhadap pelbagai patogen manusia Gram-positif dan Gram-negatif. Ia dihasilkan melalui proses pengekstrakan mesra alam dan serbuknya mengekalkan aroma semula jadi yang menyenangkan." },
  pts: { en: ["Natural antibacterial active ingredient from cocoa bean husk", "100% water-extracted", "Eliminates 99.9% of acne-causing bacteria", "Manufactured in a GMP-certified facility", "Active ingredient suitable for use in both food and non-food products", "Approved by the Ministry of Health Malaysia (KKM)", "HALAL certified product"],
         ms: ["Bahan aktif antibakteria semula jadi daripada kulit biji koko", "100% diekstrak dengan air", "Menghapuskan 99.9% bakteria penyebab jerawat", "Dikilangkan di fasiliti bertauliah GMP", "Bahan aktif sesuai untuk produk makanan dan bukan makanan", "Diluluskan oleh Kementerian Kesihatan Malaysia (KKM)", "Produk disahkan HALAL"] } }
];

/* ───────── Quiz ───────── */
var QUIZ = [
  { p: "atipm", a: 2, o: ["10%", "25%", "50%", "75%"],
    q: { en: "AT-IPM CACAO can cut insecticide use against cocoa pod borer by up to…", ms: "AT-IPM CACAO boleh mengurangkan racun serangga terhadap UPBK sehingga…" } },
  { p: "hyfer", a: 1, o: ["12%", "24%", "36%", "48%"],
    q: { en: "MCB F1 HYFer fertilizer raises dry cocoa bean yield by up to…", ms: "Baja MCB F1 HYFer meningkatkan hasil biji koko kering sehingga…" } },
  { p: "hyfer", a: 0, o: { en: ["Zeolite", "Biochar", "Peat", "Limestone"], ms: ["Zeolit", "Biochar", "Gambut", "Batu kapur"] },
    q: { en: "Which technology gives MCB F1 HYFer its slow nutrient release?", ms: "Teknologi apakah yang memberi MCB F1 HYFer pelepasan nutrien perlahan?" } },
  { p: "geococoa", a: 3, o: ["23", "58", "96", "123"],
    q: { en: "GEOCOCOA maps pest severity across how many cocoa grower locations in Peninsular Malaysia?", ms: "GEOCOCOA memetakan tahap serangan perosak di berapa lokasi pekebun koko di Semenanjung Malaysia?" } },
  { p: "kokocorrect", a: 0, o: ["10", "50", "100", "500"],
    q: { en: "How many molecular markers does KokoCorrect need to verify a Malaysian cocoa clone?", ms: "Berapa penanda molekul diperlukan KokoCorrect untuk mengesahkan klon koko Malaysia?" } },
  { p: "agrosense", a: 2, o: ["3", "5", "7", "9"],
    q: { en: "How many soil parameters does the MCB AgroSense probe detect?", ms: "Berapa parameter tanah yang dikesan oleh prob MCB AgroSense?" } },
  { p: "probiotic", a: 1, o: { en: ["1 million", "10 billion", "100 thousand", "1 trillion"], ms: ["1 juta", "10 bilion", "100 ribu", "1 trilion"] },
    q: { en: "Each serving of MARVELLES Probiotic Chocolate holds up to how many live bacteria?", ms: "Setiap hidangan Coklat Probiotik MARVELLES mengandungi sehingga berapa bakteria hidup?" } },
  { p: "probiotic", a: 2, o: ["2", "3", "5", "8"],
    q: { en: "How many beneficial bacterial strains are in MARVELLES Probiotic Chocolate?", ms: "Berapa strain bakteria baik dalam Coklat Probiotik MARVELLES?" } },
  { p: "keto", a: 3, o: ["55%", "64%", "70%", "80%"],
    q: { en: "What is the cocoa content of MARVELLES Keto Chocolate?", ms: "Berapakah kandungan koko Coklat Keto MARVELLES?" } },
  { p: "greencoa", a: 1, o: { en: ["Cocoa beans", "Cocoa leaves", "Cocoa flowers", "Cocoa pulp"], ms: ["Biji koko", "Daun koko", "Bunga koko", "Pulpa koko"] },
    q: { en: "GreenCoa tea is made from which part of the cocoa tree?", ms: "Teh GreenCoa dibuat daripada bahagian mana pokok koko?" } },
  { p: "biochar", a: 0, o: { en: ["Cocoa husks", "Cocoa butter", "Cocoa leaves", "Cocoa roots"], ms: ["Kulit koko", "Lemak koko", "Daun koko", "Akar koko"] },
    q: { en: "MCB Biochar is made from…", ms: "MCB Biochar dihasilkan daripada…" } },
  { p: "energybar", a: 2, o: { en: ["Cane sugar", "Stevia", "Stingless bee (kelulut) honey", "Corn syrup"], ms: ["Gula tebu", "Stevia", "Madu kelulut", "Sirap jagung"] },
    q: { en: "What is the natural sweetener in MCB Energy Bar Chocolate?", ms: "Apakah pemanis semula jadi dalam MCB Energy Bar Chocolate?" } },
  { p: "energybar", a: 1, o: { en: ["3 months", "6 months", "12 months", "24 months"], ms: ["3 bulan", "6 bulan", "12 bulan", "24 bulan"] },
    q: { en: "What is the shelf life of MCB Energy Bar Chocolate?", ms: "Berapakah jangka hayat MCB Energy Bar Chocolate?" } },
  { p: "singleorigin", a: 3, o: ["Tawau", "Ranau", "Bagan Datuk", "Jengka"],
    q: { en: "Where do the beans for MCB Single Origin Chocolate come from?", ms: "Dari manakah biji koko untuk MCB Single Origin Chocolate?" } },
  { p: "tongkatali", a: 0, o: { en: ["Monk fruit", "Honey", "Palm sugar", "Aspartame"], ms: ["Buah monk", "Madu", "Gula melaka", "Aspartam"] },
    q: { en: "The Kacip Fatimah and Tongkat Ali cocoa drinks are sweetened with…", ms: "Minuman koko Kacip Fatimah dan Tongkat Ali dimaniskan dengan…" } },
  { p: "diet", a: 2, o: { en: ["2nd", "5th", "8th", "12th"], ms: ["Ke-2", "Ke-5", "Ke-8", "Ke-12"] },
    q: { en: "Before the Sterile Insect Technique can start, cocoa pod borer must be reared to which generation?", ms: "Sebelum Teknik Serangga Mandul bermula, UPBK perlu dibiak hingga generasi ke berapa?" } },
  { p: "bioshield", a: 1, o: { en: ["Strong wind", "Floods and droughts", "Frost", "Salt spray"], ms: ["Angin kencang", "Banjir dan kemarau", "Fros", "Semburan garam"] },
    q: { en: "MCB BioShield helps cocoa trees tolerate stress from…", ms: "MCB BioShield membantu pokok koko menahan tekanan akibat…" } },
  { p: "polyphenol", a: 2, o: ["4.1", "41.3", "412.9", "4,129"],
    q: { en: "How many mg GAE of total polyphenols per gram are in MCB Polyphenol Extract?", ms: "Berapa mg GAE jumlah polifenol bagi setiap gram Ekstrak Polifenol MCB?" } },
  { p: "scrub", a: 0, o: { en: ["Cocoa pod husk powder", "Sea salt", "Sugar crystals", "Rice bran"], ms: ["Serbuk kulit buah koko", "Garam laut", "Hablur gula", "Dedak padi"] },
    q: { en: "What gently removes dead skin cells in BEAUTECOA Facial Scrub?", ms: "Apakah yang menanggalkan sel kulit mati dengan lembut dalam Skrub Muka BEAUTECOA?" } },
  { p: "gulakelapa", a: 1, o: ["5%", "15%", "35%", "70%"],
    q: { en: "How much cocoa is in the milk chocolate of MCB Cocoa Gula Kelapa?", ms: "Berapakah kandungan koko dalam coklat susu MCB Cocoa Gula Kelapa?" } },
  { p: "husk", a: 3, o: ["50%", "75%", "90%", "99.9%"],
    q: { en: "MARVELLES Husk Extract is stated to eliminate what share of acne-causing bacteria?", ms: "Ekstrak Kulit MARVELLES dinyatakan menghapuskan berapa peratus bakteria penyebab jerawat?" } },
  { p: "icecream", a: 3, o: ["2", "3", "5", "7"],
    q: { en: "How many variants do MCB Cocoa Ice Creams come in?", ms: "Berapa varian MCB Cocoa Ice Creams?" } },
  { p: "", a: 1, o: ["Kuala Lumpur", "Kota Kinabalu", "Kuching", "Putrajaya"],
    q: { en: "Where is the Malaysian Cocoa Board's head office?", ms: "Di manakah ibu pejabat Lembaga Koko Malaysia?" } },
  { p: "", a: 2, o: ["1957", "1975", "1989", "2004"],
    q: { en: "In which year did the Malaysian Cocoa Board begin official operations?", ms: "Pada tahun berapakah Lembaga Koko Malaysia mula beroperasi secara rasmi?" } },
  { p: "", a: 0, o: ["1990", "2000", "2010", "2020"],
    q: { en: "In the Board's published series, which year shows Malaysia's highest cocoa bean production (247,000 tonnes)?", ms: "Dalam siri perangkaan LKM, tahun manakah mencatat pengeluaran biji koko tertinggi Malaysia (247,000 tan)?" } }
];

/* ───────── Industry (koko.gov.my › Perangkaan) ───────── */
var STATS = {
  read: "2026-11-27",
  area: [[1980,123855],[1990,393465],[2000,75765],[2010,20083],[2019,5868],[2020,5715],[2021,5985],[2022,5985],[2023,6123],[2024,6216],[2025,6580]],
  production: [[1980,36500],[1985,108000],[1990,247000],[1995,131475],[2000,70262],[2005,27964],[2010,15654],[2015,1729],[2020,706],[2024,445],[2025,268]],
  grindings: [[1980,6000],[1990,70000],[2000,139443],[2005,258647],[2010,302366],[2015,187695],[2019,343727],[2020,315911],[2021,351982],[2022,367540],[2023,370207],[2024,368605],[2025,294697]],
  /* 2024, RM'000 and tonnes */
  exports: [
    { en: "Cocoa butter", ms: "Lemak koko", v: 5431333, t: 220351 },
    { en: "Cocoa powder", ms: "Serbuk koko", v: 3242677, t: 209579 },
    { en: "Cocoa beans", ms: "Biji koko", v: 3235839, t: 114270 },
    { en: "Chocolate", ms: "Coklat", v: 1915725, t: 80809 },
    { en: "Cocoa paste, not defatted", ms: "Pes koko, tanpa dinyahlemak", v: 832030, t: 31319 },
    { en: "Cocoa paste, defatted", ms: "Pes koko, dinyahlemak", v: 396035, t: 25327 },
    { en: "Cocoa shell", ms: "Kulit koko", v: 7792, t: 5256 }
  ],
  exportTotal: 15061432,
  priceDate: "2026-11-26",
  prices: [
    { r: "Sabah", b1: 14000, b2: 13800, k1: 15200, k2: 15000, prem: "14,000–22,000" },
    { r: "Sarawak", b1: 13500, b2: 13300, k1: 13600, k2: 13400, prem: "14,000–22,000" },
    { r: { en: "Peninsular", ms: "Semenanjung" }, b1: 14100, b2: 13900, k1: 14200, k2: 14000, prem: "22,000–26,000" }
  ]
};

/* ───────── About & directory (koko.gov.my) ───────── */
var ABOUT = {
  vision: { ms: "Sebagai institusi ternama terhormat dan terulung bagi pembangunan industri koko yang mapan.",
            en: "To be a renowned, respected and leading institution for the sustainable development of the cocoa industry." },
  mission: { ms: "Mempastikan pertumbuhan industri koko yang sepadu dan berdayasaing melalui pembangunan penyelidikan dan pembangunan yang berinovatif.",
             en: "To ensure the growth of an integrated and competitive cocoa industry through innovative research and development." },
  functions: {
    ms: ["Menjalankan dan menggalakkan penyelidikan dalam pengeluaran, pemprosesan, penyimpanan dan penggunaan", "Mengawal dan menyelaras aktiviti dan dasar penyelidikan", "Meningkatkan kualiti", "Menyelaras aktiviti pembangunan dan promosi pasaran", "Mengumpul dan menyebarkan maklumat", "Mengawalselia dan menyelaras perlaksanaan yang sempurna dalam pengeluaran, pemprosesan, penstoran, pengawalseliaan dan pemasaran koko dan produk koko"],
    en: ["Conduct and promote research in production, processing, storage and use", "Regulate and coordinate research activities and policy", "Improve quality", "Coordinate market development and promotion", "Collect and disseminate information", "Regulate and coordinate the proper conduct of production, processing, storage, regulation and marketing of cocoa and cocoa products"] },
  timeline: [
    { y: "1988", en: "Act 343 passed by Parliament in July and gazetted on 8 September", ms: "Akta 343 diluluskan Parlimen pada Julai dan diwartakan pada 8 September" },
    { y: "1989", en: "The Board begins official operations on 18 July", ms: "LKM mula beroperasi secara rasmi pada 18 Julai" },
    { y: "1990", en: "Planted area in the published series peaks at 393,465 hectares", ms: "Keluasan tanaman dalam siri perangkaan memuncak pada 393,465 hektar" },
    { y: "2022", en: "Jengka beans receive the national Cacao of Excellence award", ms: "Biji koko Jengka menerima anugerah kebangsaan Cacao of Excellence" }
  ]
};

var OFFICES = [
  { t: "hq", n: "Ibu Pejabat, Lembaga Koko Malaysia", a: "Tingkat 5, 6 dan 7, Wisma SEDCO, Beg Berkunci 211, 88999 Kota Kinabalu, Sabah", s: "Sabah", tel: ["088-206400", "088-234472"] },
  { t: "rd", n: "Pusat Penyelidikan & Pembangunan Koko Bagan Datuk", a: "Peti Surat 30, Jalan Sg. Dulang, 36307 Sg. Sumun, Perak", s: "Perak", tel: ["05-6488176"] },
  { t: "rd", n: "Pusat Penyelidikan & Pembangunan Koko Jengka", a: "Peti Surat 34, 28000 Temerloh, Pahang", s: "Pahang", tel: ["09-4852953"] },
  { t: "rd", n: "Pusat Penyelidikan & Pembangunan Koko Tawau", a: "Batu 10, Jalan Apas, Peti Surat 60237, 91012 Tawau, Sabah", s: "Sabah", tel: ["089-915604"] },
  { t: "rd", n: "Pusat Penyelidikan & Pembangunan Koko Kunak (Madai)", a: "WDT 175, 91207 Tingkayu Kunak, Sabah", s: "Sabah", tel: ["089-854416"] },
  { t: "rd", n: "Pusat Penyelidikan Bioteknologi Koko (KKIP)", a: "Zon Komersial 1, KKIP Selatan, Jalan Norowot, 88460 Taman Perindustrian Kota Kinabalu, Sabah", s: "Sabah", tel: ["016-8106604"] },
  { t: "rd", n: "Pusat Penyelidikan & Pembangunan Koko Kota Samarahan", a: "Lot 248, Blok 14, Daerah Muara Tuang, Bahagian Samarahan, Beg Berkunci 3131, 93450 Kuching, Sarawak", s: "Sarawak", tel: ["082-465912"] },
  { t: "rd", n: "Pusat Inovasi & Teknologi Koko Nilai", a: "Lot 12621, Kawasan Perindustrian Nilai, 71800 Nilai, Negeri Sembilan", s: "Negeri Sembilan", tel: ["06-7999001"] },
  { t: "rd", n: "Stesen Penyelidikan Koko Lundu", a: "Lot 44, Blok 11, Gading Land District, 94500 Lundu, Sarawak", s: "Sarawak", tel: ["082-465912"] },
  { t: "unit", n: "Pejabat Unit Ranau", a: "Kompleks Kluster Koko, 76 Jalan Napong 1, 89300 Ranau, Sabah", s: "Sabah", tel: ["088-876297"] },
  { t: "unit", n: "Pejabat Unit Tenom", a: "Lot 3, Jalan Datuk Hj. Yasin, 89908 Tenom, Sabah", s: "Sabah", tel: ["087-735320"] },
  { t: "unit", n: "Pejabat Unit Machang", a: "Lot 2346, Kg. Pangkal Meleret, Jalan Machang – Tanah Merah, 18000 Machang, Kelantan", s: "Kelantan", tel: ["09-9775521"] },
  { t: "unit", n: "Pejabat Unit Sarikei", a: "c/o Agriculture Development Centre, Sungai Paoh, 96100 Sarikei, Sarawak", s: "Sarawak", tel: ["084-671075"] },
  { t: "unit", n: "Pejabat Makmal Fasilitasi Hab Perdagangan Koko", a: "Unit 4.4 & 4.5, Blok B, Wisma PTP, Pelabuhan Tanjung Pelepas, Johor", s: "Johor", tel: ["07-5095274"] }
];
