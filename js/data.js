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
     link boleh "" kalau belum ada (tombol "Buka" otomatis disembunyikan). */
  proyek: [
    {
      judul: "Araya & Ciputra: Wrong School",
      tag: "Game · Horor",
      tahun: "2026",
      stack: "itch.io",
      deskripsi: "Game horor naratif yang bisa dimainkan langsung di browser. " +
                 "Fokusnya suasana, cerita, dan keputusan pemain.",
      link: "https://rafhmdbhny.itch.io/araya-ciputra-wrong-school",
    },
    {
      judul: "Saku Pintar",
      tag: "Web",
      tahun: "2026",
      stack: "HTML · CSS · JS",
      deskripsi: "Aplikasi web yang kubangun sendiri, dari rancangan tampilan sampai " +
                 "halaman jadi. Kode lengkapnya terbuka di GitHub.",
      link: "https://github.com/rafhmdbhny/sakupintar-care",
    },
    {
      judul: "Kalkulator Scratch",
      tag: "Scratch",
      tahun: "2026",
      stack: "Scratch",
      deskripsi: "Kalkulator yang dibuat dengan blok Scratch — latihan logika dasar: " +
                 "variabel, operator, dan alur percabangan.",
      link: "https://scratch.mit.edu/projects/1391090538/",
    },
    {
      judul: "Raffi Cocok Tanam",
      tag: "Scratch",
      tahun: "2026",
      stack: "Scratch",
      deskripsi: "Proyek Scratch bertema bercocok tanam: menanam, merawat, lalu memanen. " +
                 "Latihan membuat game loop sederhana.",
      link: "https://scratch.mit.edu/projects/1393898172/",
    },
  ],

  /* ---------- 4. SKILLS ----------
     Angka 0-100 = seberapa percaya diri kamu. Jujur saja, ini bukan ujian.  */
  skills: [
    {
      grup: "Web & Kode",
      items: [
        ["Github", 40],
        ["C#", 35],
        ["HTML,CSS,JS,PY", 25],
      ],
    },
    {
      grup: "Game & Desain",
      items: [
        ["Game Developer", 45],
        ["UI/UX Design", 30],
        ["C#", 30],
      ],
    },
    {
      grup: "Sedang Dipelajari",
      items: [
        ["English", 15],
        ["TypeScript", 10],
      ],
    },
  ],

  /* ---------- 5. KONTAK ----------
     Alamat email TUJUAN formulir kontak.
     Ganti dengan email aslimu. Kalau masih kosong, formulir menolak mengirim. */
  email: "",

  /* Link CV (PDF). Kosongkan kalau belum ada. */
  cv: "",

  /* Tombol-tombol kontak. Format: ["Label", "url"].
     Urutan di sini = urutan tombol di layar.
     Tombol Email muncul otomatis kalau `email` di atas diisi. */
  kontak: [
    ["GitHub", "https://github.com/rafhmdbhny"],
    ["Instagram", "https://instagram.com/raffi.xwyz"],
    ["itch.io", "https://rafhmdbhny.itch.io"],
  ],

  /* ---------- 6. SERTIFIKAT ----------
     Satu objek = satu kartu. Kalau array ini kosong, muncul pesan kosong.
     Foto: taruh di assets/sertifikat/ lalu tulis path-nya di `gambar`.
     `peringkat` boleh "Peserta", "Finalis", "Juara 1", dst. */
  sertifikat: [
    {
      judul: "Bali AI Tech Festival 2026 (Tingkat Nasional)",
      penyelenggara: "Bali IT Academy & IndoApps Solusindo",
      tahun: "2026",
      peringkat: "Peserta",
      nomor: "039/SERT/BAIFES/IX/2026",
      gambar: "assets/sertifikat/bali-ai-tech-festival-2026.jpg",
      link: "assets/sertifikat/bali-ai-tech-festival-2026.jpg",
    },
    // Template untuk sertifikat tanggal 3 nanti (tinggal hapus // dan isi datanya):
    // {
    //   judul: "Nama Sertifikat Baru",
    //   penyelenggara: "Penyelenggara",
    //   tahun: "2026",
    //   peringkat: "Peserta",
    //   nomor: "",
    //   gambar: "assets/sertifikat/nama-foto.jpg",
    //   link: "",
    // },
  ],
};
