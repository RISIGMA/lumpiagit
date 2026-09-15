/* ==========================================================================
   LUMPIA KANJENG // LOGIN CONTROLLER (login.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements: Audio Toggle
  const asmrToggleBtn = document.getElementById('asmrToggleBtn');
  if (asmrToggleBtn && window.lumpiaAudio) {
    asmrToggleBtn.addEventListener('click', () => {
      const isEnabled = window.lumpiaAudio.toggleAudio();
      asmrToggleBtn.classList.toggle('muted', !isEnabled);
      const label = asmrToggleBtn.querySelector('.asmr-label');
      if (label) label.textContent = isEnabled ? 'ASMR ON' : 'ASMR OFF';
    });
  }

  // --- 1. AMBIENT STEAM CANVAS PARTICLES ---
  const steamCanvas = document.getElementById('ambientSteamCanvas');
  if (steamCanvas) {
    const steamCtx = steamCanvas.getContext('2d');
    let steamParticles = [];

    function resizeSteamCanvas() {
      steamCanvas.width = window.innerWidth;
      steamCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeSteamCanvas);
    resizeSteamCanvas();

    for (let i = 0; i < 20; i++) {
      steamParticles.push({
        x: Math.random() * steamCanvas.width,
        y: Math.random() * steamCanvas.height,
        radius: Math.random() * 80 + 40,
        vy: -(Math.random() * 0.4 + 0.2),
        vx: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.05 + 0.02
      });
    }

    function renderSteam() {
      steamCtx.clearRect(0, 0, steamCanvas.width, steamCanvas.height);
      steamParticles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -p.radius) {
          p.y = steamCanvas.height + p.radius;
          p.x = Math.random() * steamCanvas.width;
        }
        const grad = steamCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(240, 165, 0, ${p.alpha})`);
        grad.addColorStop(0.6, `rgba(255, 255, 255, ${p.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        steamCtx.fillStyle = grad;
        steamCtx.beginPath();
        steamCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        steamCtx.fill();
      });
      requestAnimationFrame(renderSteam);
    }
    renderSteam();
  }

  // --- 2. SEED DEFAULT DEMO DATA IF EMPTY ---
  function ensureDefaultAccounts() {
    const members = JSON.parse(localStorage.getItem('kanjeng_members') || '[]');
    const hasDanang = members.some(m => m.phone === '081234567890');
    if (!hasDanang) {
      members.push({
        type: 'member',
        id: 'LK-VIP-2026-7712',
        name: 'Raden Mas Danang',
        phone: '081234567890',
        email: 'danang@kanjeng.com',
        dob: '1995-05-12',
        city: 'Semarang (Pusat Heritage)',
        pin: '123456',
        favoriteFlavor: 'Lumpia Basah Rebung Madu Udang',
        joinDate: '12 Mei 2026',
        crunchPoints: 350,
        tier: 'VIP ROYAL',
        discountPercent: 15
      });
      localStorage.setItem('kanjeng_members', JSON.stringify(members));
    }

    const partners = JSON.parse(localStorage.getItem('kanjeng_partnerships') || '[]');
    const hasBudi = partners.some(p => p.phone === '081298765432');
    if (!hasBudi) {
      partners.push({
        type: 'partner',
        id: 'LK-MITRA-2026-8841',
        name: 'Budi Prasetyo, S.E.',
        phone: '081298765432',
        email: 'budi@mitrakanjeng.com',
        city: 'Semarang Barat',
        pin: '123456',
        package: 'Gerobak Heritage Kayu Jati',
        date: '10 Januari 2026',
        tier: 'MITRA HERITAGE'
      });
      localStorage.setItem('kanjeng_partnerships', JSON.stringify(partners));
    }
  }
  ensureDefaultAccounts();

  // --- 3. MODE SELECTOR (MEMBER VS MITRA) ---
  let activeMode = 'member';
  const tabMemberMode = document.getElementById('tabMemberMode');
  const tabPartnerMode = document.getElementById('tabPartnerMode');
  const authBadgeTag = document.getElementById('authBadgeTag');
  const authTitleText = document.getElementById('authTitleText');
  const authDescText = document.getElementById('authDescText');
  const btnSubmitLogin = document.getElementById('btnSubmitLogin');
  const btnLoginText = document.getElementById('btnLoginText');
  const linkToRegister = document.getElementById('linkToRegister');

  function setMode(mode) {
    activeMode = mode;
    if (window.lumpiaAudio) window.lumpiaAudio.playClick();

    if (mode === 'partner') {
      tabMemberMode.classList.remove('active');
      tabPartnerMode.classList.add('active');
      authBadgeTag.textContent = 'PORTAL MITRA BISNIS';
      authBadgeTag.style.color = '#38bdf8';
      authBadgeTag.style.background = 'rgba(56, 189, 248, 0.15)';
      authBadgeTag.style.borderColor = 'rgba(56, 189, 248, 0.3)';
      authTitleText.textContent = 'Masuk Mitra Kanjeng';
      authDescText.textContent = 'Masuk untuk mengelola suplai bahan baku beku, panduan SOP, dan laporan kemitraan.';
      btnLoginText.textContent = 'MASUK PORTAL MITRA';
      btnSubmitLogin.classList.add('btn-partner');
      linkToRegister.textContent = 'Ajukan Kemitraan Baru Sekarang →';
      linkToRegister.href = 'daftar.html#partner';
    } else {
      tabPartnerMode.classList.remove('active');
      tabMemberMode.classList.add('active');
      authBadgeTag.textContent = 'PORTAL MEMBER VIP';
      authBadgeTag.style.color = 'var(--gold-bright)';
      authBadgeTag.style.background = 'rgba(240, 165, 0, 0.12)';
      authBadgeTag.style.borderColor = 'var(--border-emerald)';
      authTitleText.textContent = 'Masuk Akun Member';
      authDescText.textContent = 'Gunakan No. WhatsApp atau Email yang telah terdaftar untuk menikmati diskon 15% dan CrunchPoints.';
      btnLoginText.textContent = 'MASUK KE KEDAI KANJENG';
      btnSubmitLogin.classList.remove('btn-partner');
      linkToRegister.textContent = 'Daftar Sekarang (100% Gratis) →';
      linkToRegister.href = 'daftar.html';
    }
  }

  if (tabMemberMode) tabMemberMode.addEventListener('click', () => setMode('member'));
  if (tabPartnerMode) tabPartnerMode.addEventListener('click', () => setMode('partner'));

  // --- 4. TOGGLE PASSWORD VISIBILITY ---
  const loginPassword = document.getElementById('loginPassword');
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  if (btnTogglePassword && loginPassword) {
    btnTogglePassword.addEventListener('click', () => {
      const isPassword = loginPassword.type === 'password';
      loginPassword.type = isPassword ? 'text' : 'password';
      btnTogglePassword.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // --- 5. TOAST NOTIFICATION HELPER ---
  const toastHub = document.getElementById('toastHub');
  function showToast(title, message, type = 'gold') {
    if (!toastHub) return;
    const toast = document.createElement('div');
    toast.className = `lumpia-toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <strong>${title}</strong>
        <span>${message}</span>
      </div>
    `;
    toastHub.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // --- 6. DEMO ACCOUNT CLICKS ---
  const btnDemoMember = document.getElementById('btnDemoMember');
  const btnDemoPartner = document.getElementById('btnDemoPartner');
  const loginIdentifier = document.getElementById('loginIdentifier');

  if (btnDemoMember) {
    btnDemoMember.addEventListener('click', () => {
      setMode('member');
      loginIdentifier.value = '081234567890';
      loginPassword.value = '123456';
      if (window.lumpiaAudio) window.lumpiaAudio.playClick();
      showToast('Demo Dipilih', 'Akun Raden Mas Danang (VIP 15%) siap masuk.', 'gold');
    });
  }

  if (btnDemoPartner) {
    btnDemoPartner.addEventListener('click', () => {
      setMode('partner');
      loginIdentifier.value = '081298765432';
      loginPassword.value = '123456';
      if (window.lumpiaAudio) window.lumpiaAudio.playClick();
      showToast('Demo Dipilih', 'Akun Mitra Budi Prasetyo siap masuk.', 'gold');
    });
  }

  // --- 7. LOGIN FORM SUBMISSION ---
  const loginForm = document.getElementById('loginForm');
  const errLoginIdentifier = document.getElementById('errLoginIdentifier');
  const errLoginPassword = document.getElementById('errLoginPassword');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      errLoginIdentifier.textContent = '';
      errLoginPassword.textContent = '';

      const query = loginIdentifier.value.trim();
      const pass = loginPassword.value.trim();

      let hasError = false;
      if (!query) {
        errLoginIdentifier.textContent = 'Masukkan nomor WhatsApp atau Email terdaftar.';
        hasError = true;
      }
      if (!pass) {
        errLoginPassword.textContent = 'Masukkan PIN atau kata sandi akun.';
        hasError = true;
      }

      if (hasError) {
        if (window.lumpiaAudio) window.lumpiaAudio.playSauceBubble();
        return;
      }

      const cleanQuery = query.toLowerCase().replace(/[\s-]/g, '');

      // Search in members
      const members = JSON.parse(localStorage.getItem('kanjeng_members') || '[]');
      const partners = JSON.parse(localStorage.getItem('kanjeng_partnerships') || '[]');

      const foundMember = members.find(m => {
        const mPhone = (m.phone || '').replace(/[\s-]/g, '');
        const mEmail = (m.email || '').toLowerCase();
        const mId = (m.id || '').toLowerCase();
        return mPhone.includes(cleanQuery) || mEmail === cleanQuery || mId === cleanQuery;
      });

      const foundPartner = partners.find(p => {
        const pPhone = (p.phone || '').replace(/[\s-]/g, '');
        const pEmail = (p.email || '').toLowerCase();
        const pId = (p.id || '').toLowerCase();
        return pPhone.includes(cleanQuery) || pEmail === cleanQuery || pId === cleanQuery;
      });

      const foundUser = foundMember || foundPartner;

      if (!foundUser) {
        if (window.lumpiaAudio) window.lumpiaAudio.playSauceBubble();
        errLoginIdentifier.textContent = 'Akun tidak ditemukan. Pastikan No. WA / Email sudah benar atau daftar baru.';
        return;
      }

      // Check PIN (default demo PIN: 123456)
      const validPin = foundUser.pin || '123456';
      if (pass !== validPin && pass !== '123456') {
        if (window.lumpiaAudio) window.lumpiaAudio.playSauceBubble();
        errLoginPassword.textContent = 'PIN / Password salah. Coba PIN default: 123456 atau klik Lupa PIN.';
        return;
      }

      // Login Successful!
      localStorage.setItem('kanjeng_current_user', JSON.stringify(foundUser));

      if (window.lumpiaAudio) {
        window.lumpiaAudio.playCrunchBite();
        setTimeout(() => window.lumpiaAudio.playRegisterDing(), 250);
      }

      showToast('Berhasil Masuk!', `Sugeng rawuh, ${foundUser.name}. Mengalihkan ke kedai...`, 'gold');

      btnSubmitLogin.disabled = true;
      btnSubmitLogin.style.opacity = '0.8';
      btnLoginText.textContent = 'MEMBUKA KEDAI...';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 900);
    });
  }

  // --- 8. FORGOT PIN MODAL ---
  const btnOpenForgot = document.getElementById('btnOpenForgot');
  const forgotModal = document.getElementById('forgotModal');
  const closeForgotModal = document.getElementById('closeForgotModal');
  const btnSubmitForgot = document.getElementById('btnSubmitForgot');
  const forgotPhone = document.getElementById('forgotPhone');
  const errForgot = document.getElementById('errForgot');

  if (btnOpenForgot && forgotModal) {
    btnOpenForgot.addEventListener('click', () => {
      forgotModal.classList.add('active');
      forgotPhone.value = loginIdentifier.value.trim();
    });
  }
  if (closeForgotModal && forgotModal) {
    closeForgotModal.addEventListener('click', () => {
      forgotModal.classList.remove('active');
    });
  }
  if (btnSubmitForgot) {
    btnSubmitForgot.addEventListener('click', () => {
      const ph = forgotPhone.value.trim();
      if (!ph) {
        errForgot.textContent = 'Masukkan nomor WhatsApp Anda.';
        return;
      }
      const waMsg = encodeURIComponent(`Halo Admin Lumpia Kanjeng, saya lupa PIN akun saya dengan nomor WhatsApp: ${ph}. Mohon bantuan reset PIN. Terima kasih!`);
      window.open(`https://wa.me/6281288997800?text=${waMsg}`, '_blank');
      forgotModal.classList.remove('active');
    });
  }
});
