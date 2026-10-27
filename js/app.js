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
function renderProyek() {
  const grid = $("#project-grid");
  grid.textContent = "";

  DATA.proyek.forEach((p) => {
    const kartu = document.createElement("article");
    kartu.className = "card";

    kartu.innerHTML = `
      <span class="tag">${p.tag}</span>
      <h3>${p.judul}</h3>
      <p>${p.deskripsi}</p>
      <div class="meta">${p.tahun}${p.stack ? " · " + p.stack : ""}</div>
      ${p.link ? `<a class="link" href="${p.link}" target="_blank" rel="noopener">Buka ↗</a>` : ""}
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

function renderKontak() {
  const wrap = $("#contact-list");
  wrap.textContent = "";

  DATA.kontak.forEach(([label, url]) => {
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

  // video latar hanya berjalan di menu utama — hemat baterai & CPU
  const videoLatar = document.querySelector(".bg-video video");
  if (videoLatar) {
    if (ke === "home") videoLatar.play().catch(() => {});
    else videoLatar.pause();
  }

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
   4. SUARA — disintesis Web Audio, tanpa file .mp3
   ============================================================ */
let audioNyala = false;
let ac = null;

function bunyi() {
  if (!audioNyala) return;

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

$("#audio-toggle").addEventListener("click", (e) => {
  audioNyala = !audioNyala;

  const tombol = e.currentTarget;
  tombol.setAttribute("aria-pressed", String(audioNyala));
  tombol.textContent = audioNyala ? "♪" : "✕";
  tombol.classList.toggle("nyala", audioNyala);

  if (audioNyala) bunyi();
});

/* suara bisa dinyalakan sejak awal lewat <body data-audio="on"> */
if (document.body.dataset.audio === "on") {
  audioNyala = true;

  const tombolAudio = $("#audio-toggle");
  tombolAudio.setAttribute("aria-pressed", "true");
  tombolAudio.textContent = "♪";
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
  renderKontak();

  tandaiMenu(0);
  document.title = DATA.nama + " · Portfolio";
}

mulai();
