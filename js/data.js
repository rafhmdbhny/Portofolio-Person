/* ============================================================
   DATA PORTOFOLIO
   Ini satu-satunya file yang perlu kamu edit untuk mengubah isi.
   Simpan (Ctrl+S) -> halaman langsung berubah.
   ============================================================ */

const DATA = {

  /* ---------- 1. IDENTITAS ---------- */
  nama: "RAFFI",                                  // tampil besar di layar home
  peran: "Pemula · Web & Game",                   // pojok kanan atas
  tagline: "Pemula yang sedang belajar membuat game dan website. " +
           "Aku suka cerita, desain, dan hal-hal yang bisa dimainkan orang lain.",

  /* ---------- 2. TENTANG (satu paragraf = satu string) ---------- */
  tentang: [
    "Aku pemula yang serius belajar membuat game dan website. Mulai dari HTML dan CSS, " +
    "sekarang aku sedang mendalami JavaScript dan mencoba berbagai alat pengembangan game.",

    "Aku lebih suka belajar dengan membuat sesuatu yang benar-benar dipakai orang, " +
    "walaupun kecil. Setiap proyek kuanggap latihan: selesai, dipakai, lalu diperbaiki.",

    "Kalau kamu ingin mengobrol soal game, desain, atau sekadar bertukar ide, " +
    "hubungi aku lewat halaman kontak.",
  ],

  /* ---------- 3. PROYEK ----------
     Tambah proyek = tambah satu { ... } baru. Jangan lupa koma di akhir.
     link boleh "" kalau belum ada.                            */
  proyek: [
    {
      judul: "Araya & Ciputra: Wrong School",
      tag: "Game",
      tahun: "2026",
      stack: "Itch.io",
      deskripsi: "Game naratif yang sudah terbit di itch.io. Ganti kalimat ini dengan " +
                 "cerita singkat proyeknya: ide awalnya, peranmu, dan apa yang paling susah.",
      link: "https://rafhmdbhny.itch.io",
    },
    {
      judul: "Araya & Ciputra 3 Day",
      tag: "Draft",
      tahun: "2026",
      stack: "Itch.io",
      deskripsi: "Versi pendek dari proyek yang sama, masih dalam pengerjaan. " +
                 "Cocok untuk menunjukkan proses, bukan hanya hasil akhir.",
      link: "",
    },
    {
      judul: "Slot Kosong",
      tag: "Segera",
      tahun: "2026",
      stack: "",
      deskripsi: "Tempat proyek berikutnya. Saat kamu punya karya baru, ubah objek ini " +
                 "atau tambahkan objek baru di bawahnya.",
      link: "",
    },
  ],

  /* ---------- 4. SKILLS ----------
     Angka 0-100 = seberapa percaya diri kamu. Jujur saja, ini bukan ujian.  */
  skills: [
    {
      grup: "Web & Kode",
      items: [
        ["HTML & CSS", 60],
        ["JavaScript", 35],
        ["Git & GitHub", 25],
      ],
    },
    {
      grup: "Game & Seni",
      items: [
        ["Desain cerita", 65],
        ["Pixel art", 40],
        ["Godot / engine", 30],
      ],
    },
    {
      grup: "Sedang Dipelajari",
      items: [
        ["React", 15],
        ["TypeScript", 10],
      ],
    },
  ],

  /* ---------- 5. KONTAK ----------
     Hapus barisnya kalau belum punya. Format: ["Label", "url"]  */
  kontak: [
    ["itch.io", "https://rafhmdbhny.itch.io"],
    // ["Email", "mailto:kamu@email.com"],
    // ["GitHub", "https://github.com/username"],
    // ["Instagram", "https://instagram.com/username"],
  ],
};
