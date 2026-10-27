# Portofolio — versi tahap 2–5

Situs satu halaman bergaya menu game: 5 layar, navigasi keyboard, huruf "potongan koran",
dan sapuan layar. **Tanpa satu pun gambar atau aset dari game mana pun** — semua ornamen
dibuat dari CSS dan JavaScript. Jadi 100% milikmu dan bebas dipublikasikan.

## Cara membuka

1. Buka VS Code.
2. `Ctrl+Shift+P` → ketik **Open Folder** → Enter.
3. Tempel path folder ini (folder yang berisi `index.html`).
4. Pasang extension **Live Server** (kalau belum), lalu klik kanan `index.html` →
   **Open with Live Server**.
5. Browser terbuka di `http://127.0.0.1:5500`. Setiap `Ctrl+S`, halaman refresh sendiri.

Tanpa VS Code pun jalan: klik dua kali `index.html`. Semua fitur tetap bekerja.

## Struktur

```
index.html        kerangka: 5 layar + HUD
css/style.css     seluruh tampilan
js/data.js        ISI PORTOFOLIO — ini yang kamu edit
js/app.js         mesin: render data, navigasi, sapuan, suara
```

## Yang perlu diedit (hanya `js/data.js`)

| Bagian | Isinya |
|---|---|
| `nama` | Nama besar di layar home, satu kata = satu baris |
| `peran` | Teks kecil di pojok kanan atas |
| `tagline` | Satu-dua kalimat di bawah nama |
| `tentang` | Array paragraf untuk halaman ABOUT |
| `proyek` | Daftar kartu. Tambah proyek = tambah satu `{ ... }` |
| `skills` | Grup + pasangan `["nama", nilai 0-100]` |
| `kontak` | Pasangan `["Label", "url"]`. Hapus barisnya kalau belum punya |

Simpan → langsung terlihat. Tidak perlu menyentuh HTML/CSS sama sekali untuk mengubah isi.

## Yang perlu diedit kalau mau ganti tampilan

- **Warna**: 5 variabel di paling atas `css/style.css` (`--merah`, `--hitam`, dst).
  Ganti `--merah` jadi biru `#0064e6` → seluruh situs berubah nuansa.
- **Ukuran nama**: `#nama-besar` diatur `.nama { font-size: clamp(...) }`.
- **Kecepatan sapuan layar**: `#wipe.go i { animation: sapu .75s ... }` → ubah `.75s`.

## Kontrol

`↑` `↓` pilih menu · `Enter` buka · `Esc` kembali · klik juga bisa.
Tombol `✕` di kanan bawah menyalakan suara menu (disintesis browser, bukan file mp3).

## Cara deploy (gratis, tanpa kartu kredit)

**Cara tercepat — drag & drop:**
1. Buka `dash.cloudflare.com` → **Workers & Pages** → **Create application**
   → **Get started** → **Drag and drop your files**.
2. Tarik **folder** `portofolio` (bukan isinya saja) ke area upload.
3. Isi nama project → **Deploy site**.
4. Situsmu hidup di `nama-project.pages.dev`.

**Cara yang lebih rapi (auto-deploy tiap update):**
1. Buat repo baru di GitHub, upload isi folder ini.
2. Di Cloudflare Pages pilih **Connect to Git**, pilih repo-nya.
3. Build command dikosongkan, output directory `/` (ini situs statis, tidak perlu build).
4. Setiap `git push`, situs ikut ter-update.

## Catatan penting

- **Jangan** menaruh gambar berukuran besar (video/PNG 10 MB) — situs akan lambat.
  Kalau perlu gambar, kompres ke WebP di bawah 200 KB.
- Huruf "potongan koran" dibuat oleh fungsi `bikinRansom()` di `app.js`.
  Mau warna lain? Ubah array `WARNA_HURUF`.
- Semua animasi otomatis mati kalau pengunjung mengaktifkan
  *reduce motion* di sistemnya — ini bagian dari aksesibilitas, jangan dihapus.

## Ide pengembangan berikutnya

1. Tambah layar keenam (misal `GALLERY`) — duplikat satu `<section>` di `index.html`,
   tambah satu tombol menu, lalu isi render-nya di `app.js`.
2. Ambil daftar repo GitHub otomatis lewat `fetch('https://api.github.com/users/USER/repos')`.
3. Ganti monogram di halaman ABOUT dengan fotomu (`<img>` di dalam `.paper`).
4. Tambah `favicon` dan meta `og:image` supaya bagus saat dibagikan di media sosial.

## Video latar (menu utama)

`assets/bg.mp4` diputar berulang di menu utama saja, diatur oleh `.bg-video`
di `css/style.css` dan atribut `loop` di `index.html`. Saat pindah ke
layar lain, video otomatis dijeda oleh `gantiLayar()` di `js/app.js`.

Berkas sekarang masih 4K, 18 detik, +-36 MB. **Kompres dulu sebelum commit**
supaya repo tidak bengkak dan HP pengunjung tidak kehabisan kuota:

1. Buka HandBrake -> Open `assets/bg.mp4`
2. Preset **Fast 720p30**
3. Tab Video -> Quality RF **28-30**
4. Tab Audio -> hapus semua track (video latar tidak butuh suara)
5. Start -> simpan menimpa `assets/bg.mp4`

Target 2-4 MB. Nama file tetap `bg.mp4`; tidak ada kode yang perlu diubah.