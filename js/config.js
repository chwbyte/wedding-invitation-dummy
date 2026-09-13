/* ============================================================
 *  EDIT THIS FILE TO CUSTOMISE THE INVITATION.
 *  Photos live in /images — replace the files (same filenames)
 *  to swap the pictures, no code change needed.
 * ============================================================ */
window.CONFIG = {
  siteUrl: "https://chwbyte.github.io/wedding-invitation-dummy/",

  couple: {
    groom: {
      fullName: "Arga Wijaya Kusuma",
      nickname: "Arga",
      photo: "images/groom.jpg",
      parents: ["Bapak Hendra Kusuma", "Ibu Dewi Anggraini"]
    },
    bride: {
      fullName: "Nadia Putri Ramadhani",
      nickname: "Nadia",
      photo: "images/bride.jpg",
      parents: ["Bapak Rudi Ramadhani", "Ibu Sri Wahyuni"]
    },
    couplePhoto: "images/couple.jpg",
    hashtag: "#ArgaNadia2027"
  },

  // Saturday, 20 February 2027 — Holy Matrimony
  countdownDate: "2027-02-20T09:00:00+07:00",

  events: {
    holyMatrimony: {
      label: "Holy Matrimony",
      dateNumber: "20",
      monthYear: "Februari 2027",
      dayName: "Sabtu",
      time: "09:00 - 11:00 WIB",
      venueName: "Gereja Santa Theresia",
      venueAddress: "Jl. Gereja Theresia No. 50, Menteng, Jakarta Pusat",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gereja+Santa+Theresia+Menteng+Jakarta+Pusat"
    },
    reception: {
      label: "Wedding Reception",
      dateNumber: "20",
      monthYear: "Februari 2027",
      dayName: "Sabtu",
      time: "18:30 - Selesai WIB",
      venueName: "The Tribrata Darmawangsa",
      venueAddress: "Jl. Darmawangsa III, Kebayoran Baru, Jakarta Selatan",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Tribrata+Darmawangsa+Kebayoran+Baru+Jakarta"
    }
  },

  story: "Kisah kami dimulai pada 2019, di sebuah acara bakti sosial kampus. Arga, koordinator yang pendiam, dan Nadia, relawan yang penuh semangat, dipertemukan oleh jadwal yang sama-sama berantakan. Kami bukan dua orang yang saling menyukai saat itu — hanya dua orang asing yang harus bekerja sama di bawah terik matahari.\n\nSetelah lulus, hidup membawa kami ke arah yang berbeda. Empat tahun kemudian, di pernikahan seorang teman, kami dipertemukan kembali. Nadia hampir tidak datang, tapi pergantian kursi di menit terakhir mendudukkannya tepat di samping Arga. Percakapan basa-basi berubah menjadi obrolan yang berlangsung sepanjang malam.\n\nDua tahun berlalu dengan kopi, tawa, dan perjalanan-perjalanan kecil. Pada suatu pagi yang tenang di pantai yang kami berdua cintai — tanpa keramaian, tanpa kembang api — Arga berlutut dan bertanya. Nadia menjawab ya. Dan atas berkat-Nya, kisah kami berlanjut.",

  gallery: [
    { src: "images/gallery-1.jpg", alt: "Sesi prewedding 1" },
    { src: "images/gallery-2.jpg", alt: "Sesi prewedding 2" },
    { src: "images/gallery-3.jpg", alt: "Sesi prewedding 3" },
    { src: "images/gallery-4.jpg", alt: "Sesi prewedding 4" },
    { src: "images/gallery-5.jpg", alt: "Sesi prewedding 5" },
    { src: "images/gallery-6.jpg", alt: "Sesi prewedding 6" }
  ],

  guide: {
    text: "Untuk menuju lokasi resepsi, gunakan pintu utama The Tribrata dari Jl. Darmawangsa III. Valet dan parkir tersedia di area gedung; ikuti arahan petugas di lokasi.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Tribrata+Darmawangsa+Kebayoran+Baru+Jakarta",
    mapEmbed: "https://www.google.com/maps?q=The+Tribrata+Darmawangsa+Kebayoran+Baru+Jakarta&output=embed"
  },

  // --- RSVP & Wishes ---
  // Paste your Google Apps Script Web App URL into BOTH endpoint fields
  // (see README.md). Leave empty and the forms fall back to WhatsApp.
  rsvp: {
    endpoint: "https://script.google.com/macros/s/AKfycbyq63JBwwqz_7TmnUUiPc2OEFHpR9EJjuDEco4U9CuaHOmm4-KiokNVD5KePuIYZXg9YA/exec",
    whatsapp: "6281234567890"
  },
  wishes: {
    endpoint: "https://script.google.com/macros/s/AKfycbyq63JBwwqz_7TmnUUiPc2OEFHpR9EJjuDEco4U9CuaHOmm4-KiokNVD5KePuIYZXg9YA/exec"
  }
};
