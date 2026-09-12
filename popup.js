/* =============================================
   POPUP CAKE ANIMATION — popup.js
   Dipanggil dari index.html
   Folder: pop up animation/popup.js
============================================= */

/* ---- Buka & tutup popup ---- */
function openPopup() {
  const overlay = document.getElementById('cakePopup');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  resetCake();
}

function closePopup() {
  const overlay = document.getElementById('cakePopup');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  resetCake();
}

/* Klik di luar popup box = tutup */
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('cakePopup');
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  buildCandles();
  buildDrips();
});

/* ---- Warna lilin ---- */
const candleColors = ['#ff6eb4','#f0c060','#a78bfa','#60cfff','#ff9a3c','#34d399','#ff6eb4'];

/* ---- Buat lilin secara dinamis ---- */
function buildCandles() {
  const row = document.getElementById('candlesRow');
  if (!row) return;
  row.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const col = candleColors[i];
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.innerHTML = `
      <div class="flame-wrap" id="flame-${i}">
        <div class="flame-glow"></div>
        <div class="flame"></div>
        <div class="flame-inner"></div>
      </div>
      <div class="candle-wick"></div>
      <div class="candle-body" style="background:linear-gradient(180deg,${col}dd,${col});"></div>
    `;
    row.appendChild(candle);
  }
}

/* ---- Buat drip tetes frosting ---- */
function buildDrips() {
  const configs = [
    { id: 'drips-top', count: 5 },
    { id: 'drips-mid', count: 8 },
    { id: 'drips-bot', count: 11 }
  ];
  configs.forEach(({ id, count }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 'drip';
      const h = Math.random() * 12 + 7;
      const w = Math.random() * 7 + 5;
      const left = Math.random() * 80 + 5;
      d.style.cssText = `left:${left}%;height:${h}px;width:${w}px;top:0;`;
      el.appendChild(d);
    }
  });
}

/* ---- Reset kue ke kondisi awal ---- */
let blown = false;
function resetCake() {
  blown = false;
  /* Tampilkan ulang semua api */
  for (let i = 0; i < 7; i++) {
    const fw = document.getElementById(`flame-${i}`);
    if (fw) {
      fw.style.opacity = '1';
      fw.style.transform = '';
    }
  }
  /* Sembunyikan pesan */
  const msg = document.getElementById('blownMsg');
  if (msg) msg.classList.remove('show');
  /* Tampilkan tombol tiup */
  const btn = document.getElementById('blowBtn');
  if (btn) { btn.style.display = 'inline-block'; }
}

/* ---- Tiup lilin ---- */
function blowCandles() {
  if (blown) return;
  blown = true;

  const btn = document.getElementById('blowBtn');
  if (btn) btn.style.display = 'none';

  /* Padamkan api satu per satu */
  for (let i = 0; i < 7; i++) {
    setTimeout(() => {
      const fw = document.getElementById(`flame-${i}`);
      if (!fw) return;
      fw.style.transition = 'opacity 0.35s, transform 0.35s';
      fw.style.opacity = '0';
      fw.style.transform = 'scale(0.4) translateY(-8px)';

      /* Asap kecil */
      const smoke = document.createElement('div');
      smoke.style.cssText = `
        position:absolute; width:5px; height:5px;
        background:rgba(210,210,220,0.55); border-radius:50%;
        animation: smokePuff 0.9s ease forwards;
        pointer-events:none; left:50%; transform:translateX(-50%);
      `;
      fw.parentNode.appendChild(smoke);
      setTimeout(() => smoke.remove(), 950);
    }, i * 110);
  }

  /* Setelah semua padam → tampilkan pesan + confetti */
  setTimeout(() => {
    const msg = document.getElementById('blownMsg');
    if (msg) msg.classList.add('show');
    launchConfetti(160);
  }, 7 * 110 + 400);
}

/* ---- Confetti ---- */
const confColors = ['#ff6eb4','#f0c060','#a78bfa','#60cfff','#ff9a3c','#34d399','#ffffff','#ffb3d9'];

function launchConfetti(total) {
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      const size   = Math.random() * 8 + 5;
      const left   = Math.random() * 100;
      const dur    = Math.random() * 2.5 + 2;
      const color  = confColors[Math.floor(Math.random() * confColors.length)];
      const rotate = Math.random() * 360;
      const shape  = Math.random() > 0.5 ? '50%' : '2px';
      c.style.cssText = `
        width:${size}px; height:${size * 1.4}px;
        left:${left}%; top:-20px;
        background:${color};
        border-radius:${shape};
        transform:rotate(${rotate}deg);
        animation-duration:${dur}s;
        animation-delay:${Math.random() * 0.8}s;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), (dur + 1) * 1000);
    }, Math.random() * 600);
  }
}
