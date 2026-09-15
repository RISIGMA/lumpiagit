/* ==========================================================================
   LUMPIA KANJENG // DAFTAR CONTROLLER & CARD RENDER ENGINE (daftar.js)
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

  // --- 2. TABS CONTROLLER (MEMBER / PARTNER / CHECK) ---
  const tabButtons = document.querySelectorAll('.reg-tab-btn');
  const panels = {
    member: document.getElementById('panelMember'),
    partner: document.getElementById('panelPartner'),
    check: document.getElementById('panelCheck')
  };

  const virtualCard = document.getElementById('virtualCard');
  const cardTierText = document.getElementById('cardTierText');
  const cardTierPill = document.getElementById('cardTierPill');
  const cardFlavorLabel = document.getElementById('cardFlavorLabel');
  const cardFlavorText = document.getElementById('cardFlavorText');
  const cardExpiry = document.getElementById('cardExpiry');
  const perksListStyled = document.getElementById('perksListStyled');

  let currentTab = 'member';

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === currentTab) return;

      if (window.lumpiaAudio) window.lumpiaAudio.playClick();

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      Object.values(panels).forEach(panel => panel.classList.remove('active'));
      if (panels[targetTab]) panels[targetTab].classList.add('active');

      currentTab = targetTab;
      syncCardWithCurrentTab();
    });
  });

  function syncCardWithCurrentTab() {
    if (currentTab === 'partner') {
      virtualCard.classList.add('partner-mode');
      cardTierText.textContent = 'MITRA BISNIS';
      cardTierPill.querySelector('.tier-crown').textContent = '🤝';
      cardFlavorLabel.textContent = 'PAKET KEMITRAAN';
      
      const partnerName = document.getElementById('partnerName').value.trim();
      const partnerCity = document.getElementById('partnerCity').value.trim();
      const selectedPkg = document.getElementById('selectedPackage').value;

      document.getElementById('cardHolderName').textContent = partnerName ? partnerName.toUpperCase() : 'BUDI PRASETYO, S.E.';
      document.getElementById('cardCityText').textContent = partnerCity || 'Semarang Heritage';
      cardFlavorText.textContent = selectedPkg ? selectedPkg.split(' ')[0] + ' Heritage' : 'Gerobak Heritage';
      cardExpiry.textContent = 'RESMI 3 TAHUN';

      if (perksListStyled) {
        perksListStyled.innerHTML = `
          <li><span class="p-check">✓</span><span><strong>Pasokan Baku Beku Terstandarisasi</strong> tanpa bau pesing rebung.</span></li>
          <li><span class="p-check">✓</span><span><strong>Gerobak Kayu Jati / Island Booth Mall</strong> siap operasi.</span></li>
          <li><span class="p-check">✓</span><span><strong>Pelatihan Chef & Barista Kanjeng</strong> sampai mahir.</span></li>
          <li><span class="p-check">✓</span><span><strong>Proyeksi Balik Modal Cepat (3-6 Bulan)</strong> dengan margin tinggi.</span></li>
        `;
      }
    } else {
      // Member mode or check mode
      virtualCard.classList.remove('partner-mode');
      cardTierText.textContent = 'VIP ROYAL';
      cardTierPill.querySelector('.tier-crown').textContent = '👑';
      cardFlavorLabel.textContent = 'VARIAN FAVORIT';
      
      const memberName = document.getElementById('memberName').value.trim();
      const memberCity = document.getElementById('memberCity').value;
      const selectedFlavor = document.getElementById('selectedFlavor').value;

      document.getElementById('cardHolderName').textContent = memberName ? memberName.toUpperCase() : 'RADEN MAS DANANG';
      document.getElementById('cardCityText').textContent = memberCity ? memberCity.split(' ')[0] : 'Semarang Heritage';
      cardFlavorText.textContent = selectedFlavor ? selectedFlavor.replace('Lumpia ', '') : 'Rebung Madu Udang';
      cardExpiry.textContent = 'SEUMUR HIDUP';

      if (perksListStyled) {
        perksListStyled.innerHTML = `
          <li><span class="p-check">✓</span><span><strong>Diskon 15%</strong> seumur hidup di semua gerai Lumpia Kanjeng.</span></li>
          <li><span class="p-check">✓</span><span><strong>1 Box Gratis (Isi 5)</strong> saat hari ulang tahunmu.</span></li>
          <li><span class="p-check">✓</span><span><strong>Fast Track Prioritas Antrean</strong> saat jam ramai kedai.</span></li>
          <li><span class="p-check">✓</span><span><strong>CrunchPoints</strong> yang bisa ditukar voucher & merchandise.</span></li>
        `;
      }
    }
  }

  // --- 3. 3D TILT EFFECT ON VIRTUAL CARD ---
  const cardWrapper = document.getElementById('virtualCardWrapper');
  const cardGlare = document.getElementById('cardGlare');

  if (cardWrapper && virtualCard) {
    cardWrapper.addEventListener('mousemove', (e) => {
      const rect = cardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 14;

      virtualCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      if (cardGlare) {
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        cardGlare.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.25), transparent 60%)`;
      }
    });

    cardWrapper.addEventListener('mouseleave', () => {
      virtualCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // --- 4. REAL-TIME INPUT BINDING FOR MEMBER FORM ---
  const memberNameInput = document.getElementById('memberName');
  const memberCityInput = document.getElementById('memberCity');
  const cardHolderName = document.getElementById('cardHolderName');
  const cardCityText = document.getElementById('cardCityText');

  if (memberNameInput) {
    memberNameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      cardHolderName.textContent = val ? val.toUpperCase() : 'RADEN MAS DANANG';
    });
  }

  if (memberCityInput) {
    memberCityInput.addEventListener('change', (e) => {
      const val = e.target.value;
      cardCityText.textContent = val ? val.split(' ')[0] : 'Semarang Heritage';
      if (window.lumpiaAudio) window.lumpiaAudio.playClick();
    });
  }

  // Flavor Chips
  const flavorChips = document.querySelectorAll('.flavor-chip');
  const selectedFlavorInput = document.getElementById('selectedFlavor');

  flavorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (window.lumpiaAudio) window.lumpiaAudio.playClick();
      flavorChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const flavorName = chip.getAttribute('data-flavor');
      selectedFlavorInput.value = flavorName;
      cardFlavorText.textContent = flavorName.replace('Lumpia ', '');
    });
  });

  // --- 5. REAL-TIME BINDING FOR PARTNERSHIP FORM ---
  const partnerNameInput = document.getElementById('partnerName');
  const partnerCityInput = document.getElementById('partnerCity');
  const packageCards = document.querySelectorAll('.package-card');
  const selectedPackageInput = document.getElementById('selectedPackage');

  if (partnerNameInput) {
    partnerNameInput.addEventListener('input', (e) => {
      if (currentTab === 'partner') {
        const val = e.target.value.trim();
        cardHolderName.textContent = val ? val.toUpperCase() : 'BUDI PRASETYO, S.E.';
      }
    });
  }

  if (partnerCityInput) {
    partnerCityInput.addEventListener('input', (e) => {
      if (currentTab === 'partner') {
        const val = e.target.value.trim();
        cardCityText.textContent = val || 'Semarang Heritage';
      }
    });
  }

  packageCards.forEach(pkgCard => {
    pkgCard.addEventListener('click', () => {
      if (window.lumpiaAudio) window.lumpiaAudio.playClick();
      packageCards.forEach(c => c.classList.remove('active'));
      pkgCard.classList.add('active');
      const pkgName = pkgCard.getAttribute('data-package');
      selectedPackageInput.value = pkgName;
      if (currentTab === 'partner') {
        cardFlavorText.textContent = pkgName.split(' ')[0] + ' Heritage';
      }
    });
  });

  // --- 6. TOAST NOTIFICATION HELPER ---
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
    }, 4500);
  }

  // --- 7. MEMBER FORM SUBMISSION & STORAGE ---
  const memberRegForm = document.getElementById('memberRegForm');
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const btnDownloadCard = document.getElementById('btnDownloadCard');
  const btnSendWhatsapp = document.getElementById('btnSendWhatsapp');
  const btnWaText = document.getElementById('btnWaText');
  const cardExportCanvas = document.getElementById('cardExportCanvas');

  let activeRegistrationData = null;

  if (memberRegForm) {
    memberRegForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearMemberErrors();

      const name = document.getElementById('memberName').value.trim();
      const phone = document.getElementById('memberPhone').value.trim();
      const email = document.getElementById('memberEmail').value.trim();
      const dob = document.getElementById('memberDob').value;
      const city = document.getElementById('memberCity').value;
      const pin = document.getElementById('memberPin').value.trim();
      const flavor = document.getElementById('selectedFlavor').value;
      const agree = document.getElementById('memberAgree').checked;

      let hasError = false;

      if (!name || name.length < 3) {
        document.getElementById('errMemberName').textContent = 'Nama lengkap wajib diisi minimal 3 karakter.';
        hasError = true;
      }

      const phoneRegex = /^(\+62|62|0)[8][0-9]{8,12}$/;
      if (!phone || !phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
        document.getElementById('errMemberPhone').textContent = 'Nomor WhatsApp tidak valid (contoh: 08123456789).';
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        document.getElementById('errMemberEmail').textContent = 'Alamat email tidak valid.';
        hasError = true;
      }

      if (!dob) {
        document.getElementById('errMemberDob').textContent = 'Tanggal lahir wajib diisi untuk reward ulang tahun.';
        hasError = true;
      }

      if (!city) {
        document.getElementById('errMemberCity').textContent = 'Pilih kota domisili Anda.';
        hasError = true;
      }

      if (!pin || pin.length !== 6 || isNaN(pin)) {
        document.getElementById('errMemberPin').textContent = 'PIN harus berupa 6 digit angka rahasia.';
        hasError = true;
      }

      if (!agree) {
        document.getElementById('errMemberAgree').textContent = 'Anda wajib menyetujui ketentuan keanggotaan Kanjeng Club.';
        hasError = true;
      }

      if (hasError) {
        if (window.lumpiaAudio) window.lumpiaAudio.playSauceBubble();
        return;
      }

      // Generate Member ID
      const randSeed = Math.floor(1000 + Math.random() * 9000);
      const memberId = `LK-VIP-2026-${randSeed}`;
      const joinDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

      const memberObj = {
        type: 'member',
        id: memberId,
        name: name,
        phone: phone,
        email: email,
        dob: dob,
        city: city,
        pin: pin,
        favoriteFlavor: flavor,
        joinDate: joinDate,
        crunchPoints: 250, // Bonus points on joining!
        tier: 'VIP ROYAL',
        discountPercent: 15
      };

      // Save to localStorage
      const existingMembers = JSON.parse(localStorage.getItem('kanjeng_members') || '[]');
      // Update or push
      const existingIdx = existingMembers.findIndex(m => m.phone === phone || m.email === email);
      if (existingIdx >= 0) {
        existingMembers[existingIdx] = memberObj;
      } else {
        existingMembers.push(memberObj);
      }
      localStorage.setItem('kanjeng_members', JSON.stringify(existingMembers));
      localStorage.setItem('kanjeng_current_user', JSON.stringify(memberObj));

      // Audio Sensory Feedback!
      if (window.lumpiaAudio) {
        window.lumpiaAudio.playCrunchBite();
        setTimeout(() => window.lumpiaAudio.playRegisterDing(), 300);
      }

      activeRegistrationData = memberObj;

      // Update modal text
      modalTitle.textContent = `Sugeng Rawuh, ${name}!`;
      modalSubtitle.textContent = `Kartu Kanjeng Club VIP resmi milikmu telah diterbitkan dengan Nomor ID: ${memberId}. Nikmati diskon 15% langsung aktif!`;
      btnWaText.textContent = 'Konfirmasi Voucher ke WhatsApp Resmi Kanjeng';

      // Setup WhatsApp Link
      const waMsg = encodeURIComponent(
        `Halo Admin Lumpia Kanjeng,\n\nSaya telah mendaftar sebagai Member VIP Kanjeng Club!\n` +
        `• No. Kartu: ${memberId}\n` +
        `• Nama: ${name}\n` +
        `• No. WA: ${phone}\n` +
        `• Domisili: ${city}\n` +
        `• Lumpia Favorit: ${flavor}\n\n` +
        `Mohon verifikasi voucher diskon 15% dan bonus 250 CrunchPoints saya. Matur nuwun!`
      );
      btnSendWhatsapp.onclick = () => {
        window.open(`https://wa.me/6281288997800?text=${waMsg}`, '_blank');
      };

      // Draw high-res card to canvas
      drawCardToCanvas(memberObj);

      // Open Modal
      successModal.classList.add('active');
      showToast('Pendaftaran Berhasil!', `Selamat datang di Kanjeng Club, ${name}.`, 'gold');
    });
  }

  function clearMemberErrors() {
    ['errMemberName', 'errMemberPhone', 'errMemberEmail', 'errMemberDob', 'errMemberCity', 'errMemberPin', 'errMemberAgree'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  // --- 8. PARTNER FORM SUBMISSION ---
  const partnerRegForm = document.getElementById('partnerRegForm');
  if (partnerRegForm) {
    partnerRegForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearPartnerErrors();

      const name = document.getElementById('partnerName').value.trim();
      const phone = document.getElementById('partnerPhone').value.trim();
      const email = document.getElementById('partnerEmail').value.trim();
      const city = document.getElementById('partnerCity').value.trim();
      const packageType = document.getElementById('selectedPackage').value;
      const experience = document.getElementById('partnerExperience').value;
      const timeline = document.getElementById('partnerTimeline').value;
      const notes = document.getElementById('partnerNotes').value.trim();
      const agree = document.getElementById('partnerAgree').checked;

      let hasError = false;

      if (!name || name.length < 3) {
        document.getElementById('errPartnerName').textContent = 'Nama calon mitra wajib diisi.';
        hasError = true;
      }

      const phoneRegex = /^(\+62|62|0)[8][0-9]{8,12}$/;
      if (!phone || !phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
        document.getElementById('errPartnerPhone').textContent = 'Nomor WhatsApp bisnis tidak valid.';
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        document.getElementById('errPartnerEmail').textContent = 'Email bisnis tidak valid.';
        hasError = true;
      }

      if (!city) {
        document.getElementById('errPartnerCity').textContent = 'Tentukan rencana lokasi / kota buka usaha.';
        hasError = true;
      }

      if (!agree) {
        document.getElementById('errPartnerAgree').textContent = 'Anda wajib menyetujui pernyataan kemitraan.';
        hasError = true;
      }

      if (hasError) {
        if (window.lumpiaAudio) window.lumpiaAudio.playSauceBubble();
        return;
      }

      const randSeed = Math.floor(1000 + Math.random() * 9000);
      const partnerId = `LK-MITRA-2026-${randSeed}`;
      const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

      const partnerObj = {
        type: 'partner',
        id: partnerId,
        name: name,
        phone: phone,
        email: email,
        city: city,
        package: packageType,
        experience: experience,
        timeline: timeline,
        notes: notes,
        date: dateStr,
        tier: 'MITRA HERITAGE'
      };

      // Save to localStorage
      const existingPartners = JSON.parse(localStorage.getItem('kanjeng_partnerships') || '[]');
      existingPartners.push(partnerObj);
      localStorage.setItem('kanjeng_partnerships', JSON.stringify(existingPartners));

      if (window.lumpiaAudio) {
        window.lumpiaAudio.playCrunchBite();
        setTimeout(() => window.lumpiaAudio.playRegisterDing(), 300);
      }

      activeRegistrationData = partnerObj;

      modalTitle.textContent = `Pengajuan Kemitraan Diterima!`;
      modalSubtitle.textContent = `Terima kasih ${name}. Kredensial Calon Mitra Anda terdaftar dengan ID: ${partnerId}. Tim Kemitraan Kanjeng akan segera menghubungi Anda.`;
      btnWaText.textContent = 'Hubungi Tim Kemitraan Pusat via WhatsApp';

      const waMsg = encodeURIComponent(
        `Halo Tim Kemitraan Lumpia Kanjeng Pusat,\n\nSaya telah mengajukan formulir kemitraan resmi:\n` +
        `• ID Calon Mitra: ${partnerId}\n` +
        `• Nama Pemohon: ${name}\n` +
        `• No. WA: ${phone}\n` +
        `• Rencana Kota: ${city}\n` +
        `• Pilihan Paket: ${packageType}\n` +
        `• Target Buka: ${timeline}\n\n` +
        `Mohon dikirimkan proposal resmi & dokumen kalkulasi ROI. Terima kasih!`
      );
      btnSendWhatsapp.onclick = () => {
        window.open(`https://wa.me/6281288997800?text=${waMsg}`, '_blank');
      };

      drawCardToCanvas(partnerObj);
      successModal.classList.add('active');
      showToast('Kemitraan Diajukan!', 'Proposal akan segera kami kirimkan ke nomor Anda.', 'gold');
    });
  }

  function clearPartnerErrors() {
    ['errPartnerName', 'errPartnerPhone', 'errPartnerEmail', 'errPartnerCity', 'errPartnerAgree'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  // --- 9. CANVAS CARD RENDERING ENGINE (HIGH RESOLUTION PNG) ---
  function drawCardToCanvas(data) {
    if (!cardExportCanvas) return;
    const ctx = cardExportCanvas.getContext('2d');
    const w = cardExportCanvas.width;
    const h = cardExportCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const isPartner = data.type === 'partner';

    // Rounded Card Path
    const r = 28;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.clip();

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    if (isPartner) {
      bgGrad.addColorStop(0, '#0c2738');
      bgGrad.addColorStop(0.5, '#061621');
      bgGrad.addColorStop(1, '#020c13');
    } else {
      bgGrad.addColorStop(0, '#183327');
      bgGrad.addColorStop(0.5, '#0d1e17');
      bgGrad.addColorStop(1, '#07130e');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Subtle Radial Glow
    const glowGrad = ctx.createRadialGradient(w * 0.8, h * 0.2, 20, w * 0.8, h * 0.2, 350);
    glowGrad.addColorStop(0, isPartner ? 'rgba(56, 189, 248, 0.25)' : 'rgba(240, 165, 0, 0.28)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // 3. Card Border
    ctx.lineWidth = 4;
    const borderGrad = ctx.createLinearGradient(0, 0, w, h);
    if (isPartner) {
      borderGrad.addColorStop(0, '#38bdf8');
      borderGrad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
      borderGrad.addColorStop(1, '#0284c7');
    } else {
      borderGrad.addColorStop(0, '#ffc436');
      borderGrad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
      borderGrad.addColorStop(1, '#b87c00');
    }
    ctx.strokeStyle = borderGrad;
    ctx.stroke();

    // 4. Header Brand
    ctx.fillStyle = '#fbf8f2';
    ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('🥢 LUMPIA KANJENG', 40, 56);

    ctx.fillStyle = isPartner ? '#38bdf8' : '#ffc436';
    ctx.font = '500 13px "Space Grotesk", monospace';
    ctx.fillText('ESTD. 1978 // SEMARANG HERITAGE', 44, 78);

    // 5. Tier Badge (Right)
    const tierTitle = isPartner ? 'MITRA RESMI 2026' : 'VIP ROYAL MEMBER';
    ctx.fillStyle = isPartner ? 'rgba(56, 189, 248, 0.2)' : 'rgba(240, 165, 0, 0.2)';
    ctx.strokeStyle = isPartner ? '#38bdf8' : '#f0a500';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(w - 230, 36, 190, 38, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPartner ? '#38bdf8' : '#ffc436';
    ctx.font = 'bold 13px "Space Grotesk", monospace';
    ctx.textAlign = 'center';
    ctx.fillText((isPartner ? '🤝 ' : '👑 ') + tierTitle, w - 135, 60);
    ctx.textAlign = 'left';

    // 6. EMV Chip
    ctx.fillStyle = '#e5b83b';
    ctx.beginPath();
    ctx.roundRect(42, 115, 60, 44, 8);
    ctx.fill();
    ctx.strokeStyle = '#b2851f';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Chip lines
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.moveTo(42, 137); ctx.lineTo(102, 137);
    ctx.moveTo(68, 115); ctx.lineTo(68, 159);
    ctx.stroke();

    // Contactless icon
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = 'bold 22px "Space Grotesk", monospace';
    ctx.fillText(')))', 118, 144);

    // 7. Card Number
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Space Grotesk", monospace';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText(data.id || 'LK-VIP-2026-8812', 42, 210);
    ctx.shadowBlur = 0;

    // 8. Meta Fields: Card Holder
    ctx.fillStyle = '#a6b5ad';
    ctx.font = '11px "Space Grotesk", monospace';
    ctx.fillText('NAMA PEMILIK (CARD HOLDER)', 42, 270);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText((data.name || 'PELANGGAN SETIA').toUpperCase(), 42, 298);

    // Meta Fields: Active Status
    ctx.fillStyle = '#a6b5ad';
    ctx.font = '11px "Space Grotesk", monospace';
    ctx.fillText('STATUS HAK PRIVILESE', w - 240, 270);

    ctx.fillStyle = isPartner ? '#38bdf8' : '#ffc436';
    ctx.font = 'bold 20px "Space Grotesk", monospace';
    ctx.fillText(isPartner ? 'KONTRAK AKTIF' : 'DISKON 15% AKTIF', w - 240, 298);

    // 9. Bottom Row Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(42, 340);
    ctx.lineTo(w - 42, 340);
    ctx.stroke();

    // 10. Bottom Details: City & Flavor/Package
    ctx.fillStyle = '#a6b5ad';
    ctx.font = '11px "Space Grotesk", monospace';
    ctx.fillText('DOMISILI: ' + (data.city || 'Semarang').toUpperCase(), 42, 375);
    ctx.fillText('TERBIT: ' + (data.joinDate || data.date || '2026'), 42, 395);

    ctx.textAlign = 'right';
    const bottomLabel = isPartner ? 'PAKET: ' + (data.package || 'Gerobak Jati') : 'FAVORIT: ' + (data.favoriteFlavor || 'Rebung Madu');
    ctx.fillText(bottomLabel.toUpperCase(), w - 42, 375);
    ctx.fillText('CRUNCH GUARANTEED 100%', w - 42, 395);
    ctx.textAlign = 'left';

    // 11. Subtle Watermark on background
    ctx.save();
    ctx.font = 'bold 75px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillText('KANJENG 1978', 180, 440);
    ctx.restore();

    ctx.restore();
  }

  // Download Card Function
  if (btnDownloadCard) {
    btnDownloadCard.addEventListener('click', () => {
      if (!cardExportCanvas) return;
      if (window.lumpiaAudio) window.lumpiaAudio.playRegisterDing();
      const link = document.createElement('a');
      const nameSlug = (activeRegistrationData && activeRegistrationData.name) 
        ? activeRegistrationData.name.toLowerCase().replace(/[^a-z0-9]/g, '_') 
        : 'member';
      link.download = `Kartu_Kanjeng_${nameSlug}.png`;
      link.href = cardExportCanvas.toDataURL('image/png');
      link.click();
      showToast('Kartu Diunduh!', 'Simpan gambar kartu ini di galeri ponselmu.', 'gold');
    });
  }

  // Close Modal Handler
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // --- 10. TAB 3: LOOKUP EXISTING MEMBER ---
  const checkForm = document.getElementById('checkForm');
  const lookupQuery = document.getElementById('lookupQuery');
  const errLookup = document.getElementById('errLookup');
  const lookupResultArea = document.getElementById('lookupResultArea');

  if (checkForm) {
    checkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (errLookup) errLookup.textContent = '';
      const query = lookupQuery.value.trim().toLowerCase();

      if (!query) {
        errLookup.textContent = 'Masukkan nomor WhatsApp atau Email Anda.';
        return;
      }

      const members = JSON.parse(localStorage.getItem('kanjeng_members') || '[]');
      const partners = JSON.parse(localStorage.getItem('kanjeng_partnerships') || '[]');

      const foundMember = members.find(m => 
        (m.phone && m.phone.includes(query)) || 
        (m.email && m.email.toLowerCase().includes(query)) ||
        (m.id && m.id.toLowerCase().includes(query))
      );

      const foundPartner = partners.find(p => 
        (p.phone && p.phone.includes(query)) || 
        (p.email && p.email.toLowerCase().includes(query)) ||
        (p.id && p.id.toLowerCase().includes(query))
      );

      if (foundMember) {
        if (window.lumpiaAudio) window.lumpiaAudio.playRegisterDing();
        activeRegistrationData = foundMember;
        renderLookupResult(foundMember, 'member');
      } else if (foundPartner) {
        if (window.lumpiaAudio) window.lumpiaAudio.playRegisterDing();
        activeRegistrationData = foundPartner;
        renderLookupResult(foundPartner, 'partner');
      } else {
        if (window.lumpiaAudio) window.lumpiaAudio.playSauceBubble();
        errLookup.textContent = 'Data tidak ditemukan. Pastikan nomor WhatsApp atau Email sama dengan yang Anda daftarkan.';
        lookupResultArea.style.display = 'none';
      }
    });
  }

  function renderLookupResult(data, type) {
    lookupResultArea.style.display = 'block';
    const isMember = type === 'member';

    lookupResultArea.innerHTML = `
      <div class="lookup-result-card">
        <div class="lookup-res-header">
          <div>
            <span class="panel-badge ${isMember ? '' : 'badge-partner'}">
              ${isMember ? 'MEMBER VIP AKTIF' : 'MITRA BISNIS TERDAFTAR'}
            </span>
            <h3>${data.name}</h3>
          </div>
          <button class="btn-pesan-nav" id="btnViewCardCanvas">
            <span>🎴 Buka Kartu Digital</span>
          </button>
        </div>

        <div class="lookup-info-grid">
          <div class="lookup-info-item">
            <span>Nomor Identitas:</span>
            <strong>${data.id}</strong>
          </div>
          <div class="lookup-info-item">
            <span>Nomor WhatsApp:</span>
            <strong>${data.phone}</strong>
          </div>
          <div class="lookup-info-item">
            <span>${isMember ? 'Saldo CrunchPoints:' : 'Paket Kemitraan:'}</span>
            <strong class="highlight-gold">${isMember ? (data.crunchPoints || 250) + ' Points (Diskon 15% Siap Digunakan)' : data.package}</strong>
          </div>
          <div class="lookup-info-item">
            <span>Domisili / Lokasi:</span>
            <strong>${data.city}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="index.html#menu-section" class="btn-submit-reg" style="padding: 10px 18px; font-size: 0.88rem; width: auto;">
            <span>🔥 Belanja Sekarang Pakai Diskon 15%</span>
          </a>
        </div>
      </div>
    `;

    const btnView = document.getElementById('btnViewCardCanvas');
    if (btnView) {
      btnView.addEventListener('click', () => {
        modalTitle.textContent = `Kartu Digital: ${data.name}`;
        modalSubtitle.textContent = `Nomor ID: ${data.id} | Status: Aktif Diskon 15% Seumur Hidup`;
        drawCardToCanvas(data);
        successModal.classList.add('active');
      });
    }
  }

  // Pre-fill card preview with initial demo state if present
  syncCardWithCurrentTab();
});
