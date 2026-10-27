/* ============================================================
   APP — tampilan dan interaksi.
   Isi portofolio JANGAN ditaruh di sini; itu ada di js/data.js
   ============================================================ */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ============================================================
   1. RANSOM LETTERING — huruf potongan koran
   ============================================================ */
const WARNA_HURUF = [
  ["#f4f2ec", "#0b0b0f"],  // kertas putih, huruf hitam
  ["#0b0b0f", "#f4f2ec"],  // hitam, huruf putih
  ["#e60012", "#ffffff"],  // merah, huruf putih
];

function bikinRansom(el, teks) {
  el.textContent = "";

  let warnaSebelum = -1;

  [...teks].forEach((huruf, i) => {
    const s = document.createElement("span");
    s.className = "r";
    s.textContent = huruf === " " ? "\u00A0" : huruf;

    // pilih warna, tapi jangan sampai sama dengan huruf sebelumnya
    let warna = (i * 7 + teks.length) % WARNA_HURUF.length;
    if (warna === warnaSebelum) warna = (warna + 1) % WARNA_HURUF.length;
    warnaSebelum = warna;

    const [bg, fg] = WARNA_HURUF[warna];
    s.style.background = bg;
    s.style.color = fg;
    s.style.transform = `rotate(${((i % 3) - 1) * 1.6}deg)`;

    el.appendChild(s);
  });
}

/* nama besar: satu kata = satu baris */
function renderNama() {
  const target = $("#nama-besar");
  target.textContent = "";

  DATA.nama.split(" ").forEach((kata) => {
    const baris = document.createElement("span");
    baris.className = "baris";
    bikinRansom(baris, kata);
    target.appendChild(baris);
  });
}

/* judul layar + teks menu */
function pasangRansom() {
  $$(".judul, .menu button > span:first-child").forEach((el) => {
    bikinRansom(el, el.textContent.trim());
  });
}

/* ============================================================
   2. RENDER — data.js jadi elemen di halaman
   ============================================================ */
/* teks tombol menyesuaikan jenis tautannya */
const CTA = {
  repo: "Lihat di GitHub",
  game: "Mainkan sekarang",
  scratch: "Coba di Scratch",
};

function jenisProyek(link) {
  if (!link) return "kosong";
  if (link.includes("github.com")) return "repo";
  if (link.includes("itch.io")) return "game";
  if (link.includes("scratch.mit.edu")) return "scratch";
  return "repo";
}

function renderProyek() {
  const grid = $("#project-grid");
  grid.textContent = "";

  DATA.proyek.forEach((p) => {
    const jenis = jenisProyek(p.link);

    const tombol = p.link
      ? `<a class="cta" href="${p.link}" target="_blank" rel="noopener">${CTA[jenis]} ↗</a>`
      : `<span class="cta mati">Segera</span>`;

    const kartu = document.createElement("article");
    kartu.className = "card";
    kartu.dataset.jenis = jenis;

    kartu.innerHTML = `
      <div class="card-atas">
        <span class="tahun">${p.tahun}</span>
        <span class="tag">${p.tag}</span>
      </div>
      <h3>${p.judul}</h3>
      <p>${p.deskripsi}</p>
      <div class="card-kaki">
        <span class="stack">${p.stack}</span>
        ${tombol}
      </div>
    `;

    grid.appendChild(kartu);
  });
}

function renderSkills() {
  const wrap = $("#skill-list");
  wrap.textContent = "";

  DATA.skills.forEach((grup) => {
    const blok = document.createElement("section");
    blok.className = "skill-group";

    const judul = document.createElement("h3");
    judul.textContent = grup.grup;
    blok.appendChild(judul);

    grup.items.forEach(([nama, nilai]) => {
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML = `
        <div class="bar-label"><span>${nama}</span><span>${nilai}%</span></div>
        <div class="bar"><div class="bar-fill" data-nilai="${nilai}"></div></div>
      `;
      blok.appendChild(row);
    });

    wrap.appendChild(blok);
  });
}

function renderTentang() {
  const wrap = $("#tentang-teks");
  wrap.textContent = "";

  DATA.tentang.forEach((paragraf) => {
    const p = document.createElement("p");
    p.textContent = paragraf;
    wrap.appendChild(p);
  });

  $("#monogram").textContent = DATA.nama.charAt(0).toUpperCase();
}

/* sertifikat: dirender di layar CERTIFICATES */
function renderSertifikat() {
  const grid = $("#sertifikat-grid");
  if (!grid) return;

  const daftar = DATA.sertifikat || [];

  if (!daftar.length) {
    grid.innerHTML = `<p class="sertif-kosong">Belum ada sertifikat yang ditambahkan.</p>`;
    return;
  }

  grid.textContent = "";

  daftar.forEach((s) => {
    const kartu = document.createElement("article");
    kartu.className = "card sertif";

    const targetLink = s.link || s.gambar || "";

    const gambarHtml = s.gambar
      ? `<a class="sertif-gambar-wrap" href="${targetLink || '#'}" ${targetLink ? 'target="_blank" rel="noopener"' : ''} title="Klik untuk memperbesar">
          <img class="sertif-gambar" src="${s.gambar}" alt="Sertifikat ${s.judul}" loading="lazy">
          <span class="sertif-zoom">🔍 Perbesar</span>
         </a>`
      : `<div class="sertif-gambar kosong">SERTIFIKAT</div>`;

    const keterangan = [s.penyelenggara, s.tahun].filter(Boolean).join(" · ");

    kartu.innerHTML = `
      <div class="card-atas sertif-atas">
        <span class="tahun">${s.tahun || ""}</span>
        <span class="tag">${s.peringkat || "Peserta"}</span>
      </div>
      ${gambarHtml}
      <div class="sertif-isi">
        <h3>${s.judul}</h3>
        <p class="sertif-ket">${keterangan}</p>
        ${s.nomor ? `<p class="sertif-nomor">No: ${s.nomor}</p>` : ""}
      </div>
      <div class="card-kaki">
        <span class="stack">${s.penyelenggara || "Sertifikat"}</span>
        ${targetLink ? `<a class="cta" href="${targetLink}" target="_blank" rel="noopener">Buka Dokumen ↗</a>` : `<span class="cta mati">Arsip</span>`}
      </div>
    `;

    grid.appendChild(kartu);
  });
}

function renderKontak() {
  const wrap = $("#contact-list");
  wrap.textContent = "";

  // kalau DATA.email diisi, tombol Email muncul otomatis di paling kiri
  const daftar = DATA.email
    ? [["Email", "mailto:" + DATA.email], ...DATA.kontak]
    : DATA.kontak;

  daftar.forEach(([label, url]) => {
    if (!url) return;

    const a = document.createElement("a");
    a.className = "chip";
    a.href = url;
    a.textContent = label + " ↗";

    if (!url.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener";
    }

    wrap.appendChild(a);
  });

  // tombol CV hanya muncul kalau DATA.cv diisi
  if (DATA.cv) {
    const cv = document.createElement("a");
    cv.className = "chip";
    cv.href = DATA.cv;
    cv.textContent = "CV ⬇";
    cv.setAttribute("download", "");
    wrap.appendChild(cv);
  }
}

/* ============================================================
   2b. FORMULIR KONTAK
   Tanpa server: pesan disusun jadi tautan mailto, lalu
   aplikasi email di perangkat pengunjung yang mengirim.
   ============================================================ */
function siapkanForm() {
  const form = $("#form-kontak");
  if (!form) return;

  const status = $("#form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isi = new FormData(form);
    const nama = (isi.get("nama") || "").trim();
    const email = (isi.get("email") || "").trim();
    const pesan = (isi.get("pesan") || "").trim();

    if (!nama || !email || !pesan) {
      status.textContent = "Isi nama, email, dan pesan dulu ya.";
      return;
    }

    if (!DATA.email) {
      status.textContent = "Email tujuan belum diisi di js/data.js.";
      return;
    }

    const judul = `Pesan dari ${nama} — portofolio`;
    const badan = `${pesan}\n\n— ${nama}\n${email}`;
    const tujuan = `mailto:${DATA.email}` +
      `?subject=${encodeURIComponent(judul)}` +
      `&body=${encodeURIComponent(badan)}`;

    status.textContent = "Membuka aplikasi email…";
    window.location.href = tujuan;
    form.reset();
  });
}

/* ============================================================
   3. NAVIGASI — state + event + sapuan layar
   ============================================================ */
let layarAktif = "home";
let indexMenu = 0;
let sedangPindah = false;

const menu = $$(".menu button");
const wipe = $("#wipe");
const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function tandaiMenu(i) {
  indexMenu = (i + menu.length) % menu.length;
  menu.forEach((b, n) => b.classList.toggle("sel", n === indexMenu));
}

function gantiLayar(ke) {
  $$(".screen").forEach((s) => s.classList.toggle("active", s.id === ke));
  layarAktif = ke;
  document.body.dataset.screen = ke;

  // jalankan hanya video milik layar aktif, jeda sisanya (hemat CPU & baterai)
  $$(".bg-video").forEach((kotak) => {
    const video = kotak.querySelector("video");
    if (!video) return;

    if (kotak.dataset.untuk === ke) video.play().catch(() => {});
    else video.pause();
  });

  if (ke === "skills") animasiBar();
  window.scrollTo(0, 0);
}

function pindah(ke) {
  if (ke === layarAktif || sedangPindah) return;

  if (kurangiGerak) {
    gantiLayar(ke);
    return;
  }

  sedangPindah = true;
  wipe.classList.add("go");
  setTimeout(() => gantiLayar(ke), 380);
  setTimeout(() => {
    wipe.classList.remove("go");
    sedangPindah = false;
  }, 900);
}

function animasiBar() {
  $$(".bar-fill").forEach((el, i) => {
    el.style.width = "0%";
    setTimeout(() => {
      el.style.width = el.dataset.nilai + "%";
    }, 120 + i * 80);
  });
}

/* klik menu */
menu.forEach((b, i) => {
  b.addEventListener("click", () => {
    tandaiMenu(i);
    bunyi();
    pindah(b.dataset.target);
  });

  b.addEventListener("mouseenter", () => tandaiMenu(i));
});

/* tombol kembali + logo */
$$("[data-back]").forEach((b) => b.addEventListener("click", () => pindah("home")));
$("#nav-home").addEventListener("click", () => pindah("home"));

/* keyboard: ↑ ↓ Enter Esc */
document.addEventListener("keydown", (e) => {
  if (layarAktif === "home") {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      tandaiMenu(indexMenu + 1);
      bunyi();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      tandaiMenu(indexMenu - 1);
      bunyi();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      bunyi();
      pindah(menu[indexMenu].dataset.target);
    }
  } else if (e.key === "Escape") {
    pindah("home");
  }
});

/* ============================================================
   4. SUARA — efek klik (klik.mp3) + musik latar (bgm.mp3)
   ============================================================ */
const sfxKlik = $("#sfx-klik");
const bgm = $("#bgm");
const VOLUME_BGM = 0.22;

let audioNyala = document.body.dataset.audio === "on";
let ac = null;   /* cadangan: hanya dipakai kalau file klik gagal */

/* efek klik: pakai file, kalau gagal jatuh ke bunyi sintetis */
function bunyi() {
  if (!audioNyala) return;

  if (sfxKlik) {
    sfxKlik.currentTime = 0;
    sfxKlik.play().catch(bunyiSintetis);
    return;
  }

  bunyiSintetis();
}

function bunyiSintetis() {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();

    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(700, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, ac.currentTime + 0.06);

    gain.gain.setValueAtTime(0.0001, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ac.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.12);

    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.13);
  } catch (err) {
    /* browser memblokir audio sebelum ada klik: abaikan */
  }
}

/* musik latar */
function putarBgm() {
  if (!bgm || !audioNyala) return;
  bgm.volume = VOLUME_BGM;
  bgm.play().catch(() => {});
}

function hentikanBgm() {
  if (bgm) bgm.pause();
}

/* browser hanya mengizinkan audio setelah ada interaksi pengguna */
["pointerdown", "keydown"].forEach((jenis) => {
  document.addEventListener(jenis, putarBgm, { once: true });
});

/* jangan memutar musik saat tab tidak aktif — hemat baterai */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) hentikanBgm();
  else putarBgm();
});

/* tombol speaker: satu saklar untuk klik + musik */
$("#audio-toggle").addEventListener("click", (e) => {
  audioNyala = !audioNyala;

  const tombol = e.currentTarget;
  tombol.setAttribute("aria-pressed", String(audioNyala));
  tombol.setAttribute("aria-label", audioNyala ? "Matikan suara" : "Nyalakan suara");
  tombol.classList.toggle("nyala", audioNyala);

  if (audioNyala) {
    putarBgm();
    bunyi();
  } else {
    hentikanBgm();
  }
});

/* keadaan awal dari <body data-audio="on"> */
if (audioNyala) {
  const tombolAudio = $("#audio-toggle");
  tombolAudio.setAttribute("aria-pressed", "true");
  tombolAudio.setAttribute("aria-label", "Matikan suara");
  tombolAudio.classList.add("nyala");
}

/* ============================================================
   5. MULAI
   ============================================================ */
function mulai() {
  renderNama();
  pasangRansom();

  $("#tagline").textContent = DATA.tagline;
  $("#hud-nama").textContent = DATA.nama;
  $("#hud-peran").textContent = DATA.peran;

  renderProyek();
  renderSkills();
  renderTentang();
  renderSertifikat();
  renderKontak();
  siapkanForm();

  tandaiMenu(0);
  document.title = DATA.nama + " · Portfolio";
}

mulai();
