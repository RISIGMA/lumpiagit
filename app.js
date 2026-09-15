/* ==========================================================================
   LUMPIA KANJENG // CORE INTERACTIVITY & CART CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const asmrToggleBtn = document.getElementById('asmrToggleBtn');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartBadgeCount = document.getElementById('cartBadgeCount');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemList = document.getElementById('cartItemList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartSubtotalText = document.getElementById('cartSubtotalText');
  const cartGrandTotalText = document.getElementById('cartGrandTotalText');
  const cartMemberDiscountRow = document.getElementById('cartMemberDiscountRow');
  const cartMemberDiscountText = document.getElementById('cartMemberDiscountText');
  const navMemberLink = document.getElementById('navMemberLink');
  const btnCheckoutWhatsApp = document.getElementById('btnCheckoutWhatsApp');
  const btnPrintReceipt = document.getElementById('btnPrintReceipt');

  // Check logged in member
  const currentMember = JSON.parse(localStorage.getItem('kanjeng_current_user') || 'null');
  if (currentMember && navMemberLink) {
    const firstName = currentMember.name ? currentMember.name.split(' ')[0] : 'VIP';
    navMemberLink.innerHTML = `👑 ${firstName} (VIP 15%)`;
    navMemberLink.title = `Member ID: ${currentMember.id} - Diskon 15% Aktif`;
  }

  // Hero Lumpia Bite elements
  const lumpiaHeroItem = document.getElementById('lumpiaHeroItem');
  const lumpiaRollMesh = document.getElementById('lumpiaRollMesh');
  const btnBiteHero = document.getElementById('btnBiteHero');
  const btnResetBite = document.getElementById('btnResetBite');
  const crumbCanvas = document.getElementById('crumbCanvas');
  const sauceDipBowl = document.getElementById('sauceDipBowl');

  // Menu elements
  const menuGridContainer = document.getElementById('menuGridContainer');
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');

  // DIY Studio elements
  const skinOptions = document.querySelectorAll('#skinOptions .opt-pill');
  const fillingOptions = document.querySelectorAll('#fillingOptions .opt-pill');
  const sauceOptions = document.querySelectorAll('#sauceOptions .opt-pill');
  const previewSkinLayer = document.getElementById('previewSkinLayer');
  const previewFillingsStack = document.getElementById('previewFillingsStack');
  const barCrunch = document.getElementById('barCrunch');
  const barUmami = document.getElementById('barUmami');
  const barSpicy = document.getElementById('barSpicy');
  const valCrunch = document.getElementById('valCrunch');
  const valUmami = document.getElementById('valUmami');
  const valSpicy = document.getElementById('valSpicy');
  const diyTotalPrice = document.getElementById('diyTotalPrice');
  const btnRollAndFry = document.getElementById('btnRollAndFry');

  // Wok elements
  const frySlider = document.getElementById('frySlider');
  const fryLevelName = document.getElementById('fryLevelName');
  const btnTriggerWokSizzle = document.getElementById('btnTriggerWokSizzle');
  const wokBubbles = document.getElementById('wokBubbles');

  // Receipt modal elements
  const receiptModal = document.getElementById('receiptModal');
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');
  const rDate = document.getElementById('rDate');
  const rOrderNo = document.getElementById('rOrderNo');
  const rItemsList = document.getElementById('rItemsList');
  const rTotalAmount = document.getElementById('rTotalAmount');

  // State
  let cart = JSON.parse(localStorage.getItem('lumpia_cart') || '[]');
  let selectedCategory = 'all';

  // DIY State
  let diySkin = { name: 'Kulit Emas Renyah', price: 0, crisp: 100, color: '#e28822' };
  let diyFillings = [
    { name: 'Rebung Madu Kanjeng', price: 12000, savory: 60 },
    { name: 'Udang Laut Cincang', price: 8000, savory: 90 }
  ];
  let diySauces = ['Saus Bawang Kental Kanjeng', 'Acar Timun & Rawit Ijo', 'Daun Bawang Lokio'];

  // --- 1. AMBIENT STEAM CANVAS PARTICLES ---
  const steamCanvas = document.getElementById('ambientSteamCanvas');
  const steamCtx = steamCanvas.getContext('2d');
  let steamParticles = [];

  function resizeSteamCanvas() {
    steamCanvas.width = window.innerWidth;
    steamCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeSteamCanvas);
  resizeSteamCanvas();

  for (let i = 0; i < 25; i++) {
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
      grad.addColorStop(1, 'rgba(12, 24, 19, 0)');
      steamCtx.fillStyle = grad;
      steamCtx.beginPath();
      steamCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      steamCtx.fill();
    });
    requestAnimationFrame(renderSteam);
  }
  renderSteam();

  // --- 2. ASMR TOGGLE & SAUCE DIP CLICK ---
  asmrToggleBtn.addEventListener('click', () => {
    const isNowOn = window.lumpiaAudio.toggleAudio();
    asmrToggleBtn.querySelector('.asmr-icon').textContent = isNowOn ? '🔊' : '🔇';
    asmrToggleBtn.querySelector('.asmr-label').textContent = isNowOn ? 'ASMR RENYAH ON' : 'ASMR MUTED';
    showToast(isNowOn ? '✨ Audio ASMR renyah diaktifkan!' : 'Audio ASMR dibisukan.');
  });

  sauceDipBowl.addEventListener('click', (e) => {
    e.stopPropagation();
    window.lumpiaAudio.playSauceBubble();
    sauceDipBowl.style.transform = 'scale(1.15)';
    setTimeout(() => sauceDipBowl.style.transform = 'none', 150);
    showToast('🥣 Saus bawang kental khas Semarang diaduk!');
  });

  // --- 3. HERO LUMPIA INTERACTIVE BITE & CRUMB EXPLOSION ---
  function triggerLumpiaBite() {
    window.lumpiaAudio.playCrunchBite();
    lumpiaRollMesh.classList.add('is-bitten');
    triggerCrumbExplosion();
    showToast('✨ KRIUUKKK! Renyahnya kulit emas berpadu rebung madu & udang!');
  }

  lumpiaHeroItem.addEventListener('click', triggerLumpiaBite);
  btnBiteHero.addEventListener('click', triggerLumpiaBite);

  btnResetBite.addEventListener('click', () => {
    window.lumpiaAudio.playClick();
    lumpiaRollMesh.classList.remove('is-bitten');
    showToast('Lumpia dipulihkan utuh kembali!');
  });

  function triggerCrumbExplosion() {
    const ctx = crumbCanvas.getContext('2d');
    crumbCanvas.width = crumbCanvas.parentElement.clientWidth;
    crumbCanvas.height = crumbCanvas.parentElement.clientHeight;

    const crumbs = [];
    const colors = ['#ffd466', '#e28822', '#ffaa00', '#b8600d', '#fff0aa'];

    for (let i = 0; i < 45; i++) {
      crumbs.push({
        x: crumbCanvas.width / 2 - 30,
        y: crumbCanvas.height / 2,
        vx: (Math.random() - 0.7) * 9,
        vy: (Math.random() - 0.5) * 8,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02
      });
    }

    function animateCrumbs() {
      ctx.clearRect(0, 0, crumbCanvas.width, crumbCanvas.height);
      let alive = 0;
      crumbs.forEach(c => {
        if (c.life > 0) {
          alive++;
          c.x += c.vx;
          c.y += c.vy;
          c.vy += 0.25; // gravity
          c.life -= c.decay;

          ctx.fillStyle = c.color;
          ctx.globalAlpha = Math.max(0, c.life);
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (alive > 0) requestAnimationFrame(animateCrumbs);
      else ctx.clearRect(0, 0, crumbCanvas.width, crumbCanvas.height);
    }
    animateCrumbs();
  }

  // --- 4. MENU CATALOG DATA & RENDERING ---
  const menuData = [
    {
      id: 'm1',
      name: 'Lumpia Goreng Spesial Kanjeng',
      category: 'goreng',
      price: 22000,
      badge: 'TERLARIS #1',
      crunch: '100% ULTRA CRUNCH',
      icon: '🥟',
      desc: 'Rebung madu pilihan 6 jam, udang laut segar, suwir ayam kampung, dan telur bebek dalam balutan kulit renyah emas.',
      tags: ['Goreng', 'Rebung + Udang + Ayam']
    },
    {
      id: 'm2',
      name: 'Lumpia Basah Sutra Heritage',
      category: 'basah',
      price: 20000,
      badge: 'LEGENDARIS',
      crunch: 'LEMBUT GURIH',
      icon: '🥢',
      desc: 'Kulit lumpia lembut beraroma khas dengan isian rebung manis gurih basah yang melimpah, daun bawang lokio & saus kental.',
      tags: ['Basah', 'Tradisional 1978']
    },
    {
      id: 'm3',
      name: 'Lumpia Crab King Royale',
      category: 'special',
      price: 32000,
      badge: 'PREMIUM SEAFOOD',
      crunch: '95% CRISPY',
      icon: '🦀',
      desc: 'Perpaduan istimewa daging kepiting bakau segar, udang utuh, rebung madu dan racikan rempah rahasia istana.',
      tags: ['Kepiting Bakau', 'Sultan Menu']
    },
    {
      id: 'm4',
      name: 'Lumpia Mozzarella Melt',
      category: 'special',
      price: 26000,
      badge: 'FUSION VIRAL',
      crunch: '90% GURIH TARIK',
      icon: '🧀',
      desc: 'Sensasi modern perpaduan tradisi Semarang dengan keju mozzarella molor yang melimpah dan taburan oregano.',
      tags: ['Keju Molor', 'Kids & Youth Fav']
    },
    {
      id: 'm5',
      name: 'Lumpia Charcoal Bamboo Black',
      category: 'special',
      price: 25000,
      badge: 'DETOX HEALTHY',
      crunch: '92% RENYAH',
      icon: '🖤',
      desc: 'Kulit arang bambu alami kaya antioksidan berpadu isian ayam kampung cincang dan rebung harum tanpa aroma langu.',
      tags: ['Arang Bambu', 'Unik & Sehat']
    },
    {
      id: 'm6',
      name: 'Paket Besek Hantaran (Isi 10 Pcs)',
      category: 'besek',
      price: 210000,
      badge: 'GIFT BOX MEWAH',
      crunch: 'BISA MIX GORENG/BASAH',
      icon: '🎁',
      desc: 'Kemasan anyaman besek bambu tradisional dengan pita satin, 10 pcs lumpia bebas pilih, 2 toples saus kental & acar lengkap.',
      tags: ['Oleh-Oleh', 'Kemasan Anyaman']
    }
  ];

  function renderMenu(category = 'all') {
    menuGridContainer.innerHTML = '';
    const filtered = category === 'all' ? menuData : menuData.filter(m => m.category === category);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <div>
          <div class="menu-card-top">
            <span class="menu-badge">${item.badge}</span>
            <span class="menu-crunch-rating">⚡ ${item.crunch}</span>
          </div>
          <div class="menu-visual-box">
            <span class="menu-food-icon">${item.icon}</span>
          </div>
          <h3 class="menu-name">${item.name}</h3>
          <p class="menu-ingredients-desc">${item.desc}</p>
        </div>
        <div class="menu-card-footer">
          <span class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</span>
          <div class="menu-actions-group">
            <button class="btn-bite-demo" title="Coba Gigit & Dengar ASMR" data-name="${item.name}">🥢</button>
            <button class="btn-add-cart" data-id="${item.id}">+ Pesan</button>
          </div>
        </div>
      `;

      // Bite demo
      card.querySelector('.btn-bite-demo').addEventListener('click', (e) => {
        e.stopPropagation();
        window.lumpiaAudio.playCrunchBite();
        showToast(`🥢 Mencoba gigitan ${item.name} (Kriukkk!)`);
      });

      // Add to cart
      card.querySelector('.btn-add-cart').addEventListener('click', () => {
        addToCart(item.name, item.price, 'Varian Menu Siap Santap');
      });

      menuGridContainer.appendChild(card);
    });
  }

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.lumpiaAudio.playClick();
      selectedCategory = btn.dataset.category;
      renderMenu(selectedCategory);
    });
  });

  renderMenu();

  // --- 5. DIY CUSTOM ROLL STUDIO LOGIC ---
  function updateDiyStudio() {
    // 1. Skin update
    previewSkinLayer.style.backgroundColor = diySkin.color;
    if (diySkin.color === '#2b2d35') {
      previewSkinLayer.style.borderColor = '#555';
    } else if (diySkin.color === '#558b2f') {
      previewSkinLayer.style.borderColor = '#8bc34a';
    } else {
      previewSkinLayer.style.borderColor = '#ffca66';
    }

    // 2. Fillings stack update
    previewFillingsStack.innerHTML = '';
    diyFillings.forEach(f => {
      const badge = document.createElement('span');
      badge.className = 'filling-tag-badge';
      badge.textContent = f.name.split(' ')[0];
      previewFillingsStack.appendChild(badge);
    });

    // 3. Flavor radar calculation
    const crunchVal = diySkin.crisp;
    let savoryTotal = 0;
    diyFillings.forEach(f => savoryTotal += (f.savory || 50));
    const umamiVal = Math.min(100, Math.round(savoryTotal / (diyFillings.length || 1)));
    
    let spicyVal = 0;
    if (diySauces.includes('Sambal Mercon Rawit')) spicyVal += 75;
    if (diySauces.includes('Acar Timun & Rawit Ijo')) spicyVal += 25;
    spicyVal = Math.min(100, spicyVal);

    barCrunch.style.width = `${crunchVal}%`;
    valCrunch.textContent = `${crunchVal}%`;
    barUmami.style.width = `${umamiVal}%`;
    valUmami.textContent = `${umamiVal}%`;
    barSpicy.style.width = `${spicyVal}%`;
    valSpicy.textContent = `${spicyVal}%`;

    // 4. Total Price Calculation
    let total = diySkin.price;
    diyFillings.forEach(f => total += f.price);
    diyTotalPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  }

  // Skin click handlers
  skinOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      skinOptions.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.lumpiaAudio.playClick();
      diySkin = {
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price) || 0,
        crisp: parseInt(btn.dataset.crisp) || 90,
        color: btn.dataset.color || '#e28822'
      };
      updateDiyStudio();
    });
  });

  // Filling click handlers (multi-select)
  fillingOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      window.lumpiaAudio.playClick();
      const fName = btn.dataset.name;
      const fPrice = parseInt(btn.dataset.price) || 0;
      const fSavory = parseInt(btn.dataset.savory) || 70;

      const existingIndex = diyFillings.findIndex(f => f.name === fName);
      if (existingIndex >= 0) {
        if (diyFillings.length <= 1) {
          showToast('Minimal pilih 1 isian untuk digulung!');
          return;
        }
        diyFillings.splice(existingIndex, 1);
        btn.classList.remove('active');
      } else {
        diyFillings.push({ name: fName, price: fPrice, savory: fSavory });
        btn.classList.add('active');
      }
      updateDiyStudio();
    });
  });

  // Sauce click handlers
  sauceOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      window.lumpiaAudio.playClick();
      const sName = btn.dataset.name;
      const idx = diySauces.indexOf(sName);
      if (idx >= 0) {
        diySauces.splice(idx, 1);
        btn.classList.remove('active');
      } else {
        diySauces.push(sName);
        btn.classList.add('active');
      }
      updateDiyStudio();
    });
  });

  // Roll and fry DIY Lumpia
  btnRollAndFry.addEventListener('click', () => {
    window.lumpiaAudio.startOilSizzle();
    window.lumpiaAudio.setSizzleIntensity(85);

    // Animation on visual roll
    previewSkinLayer.style.transform = 'scale(1.1) rotate(5deg)';
    setTimeout(() => {
      previewSkinLayer.style.transform = 'none';
      let total = diySkin.price;
      diyFillings.forEach(f => total += f.price);
      
      const customName = `Lumpia DIY: ${diySkin.name}`;
      const customDesc = `Isian: ${diyFillings.map(f => f.name.split(' ')[0]).join(', ')} | Saus: ${diySauces.join(', ') || 'Tanpa Saus'}`;
      
      addToCart(customName, total, customDesc);
      showToast('🍳 Lumpia kreasi spesialmu berhasil digulung & masuk keranjang!');
    }, 400);
  });

  updateDiyStudio();

  // --- 6. WOK ASMR SLIDER ---
  frySlider.addEventListener('input', () => {
    const val = parseInt(frySlider.value);
    window.lumpiaAudio.setSizzleIntensity(val);

    if (val < 40) fryLevelName.textContent = 'Kuning Keemasan (Soft Crispy)';
    else if (val < 75) fryLevelName.textContent = 'Renyah Sempurna (Crispy Gold)';
    else fryLevelName.textContent = 'Ultra Crunch (Extra Dark Gold)';
  });

  btnTriggerWokSizzle.addEventListener('click', () => {
    window.lumpiaAudio.startOilSizzle();
    window.lumpiaAudio.setSizzleIntensity(parseInt(frySlider.value));
    showToast('🔥 Minyak kelapa mendidih! Dengarkan desis renyah wajan!');
  });

  // --- 7. CART SYSTEM & WHATSAPP CHECKOUT ---
  function addToCart(name, price, subtext) {
    window.lumpiaAudio.playRegisterDing();
    const existing = cart.find(item => item.name === name && item.subtext === subtext);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: 'cart_' + Date.now(), name, price, subtext, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast(`🛍️ "${name}" ditambahkan ke keranjang!`);
  }

  function saveCart() {
    localStorage.setItem('lumpia_cart', JSON.stringify(cart));
    updateCartBadge();
  }

  function updateCartBadge() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    cartBadgeCount.textContent = totalCount;
  }

  function renderCart() {
    cartItemList.innerHTML = '';
    if (cart.length === 0) {
      cartEmptyState.style.display = 'block';
      cartItemList.appendChild(cartEmptyState);
      cartSubtotalText.textContent = 'Rp 0';
      cartGrandTotalText.textContent = 'Rp 0';
      return;
    }

    cartEmptyState.style.display = 'none';
    let subtotal = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-sub">${item.subtext} (x${item.qty})</span>
          <span class="cart-item-price">Rp ${itemTotal.toLocaleString('id-ID')}</span>
        </div>
        <button class="cart-item-del-btn" title="Hapus Item">×</button>
      `;

      row.querySelector('.cart-item-del-btn').addEventListener('click', () => {
        window.lumpiaAudio.playClick();
        cart = cart.filter(c => c.id !== item.id);
        saveCart();
        renderCart();
        showToast('Item dihapus dari keranjang.');
      });

      cartItemList.appendChild(row);
    });

    const isMember = currentMember && currentMember.discountPercent;
    const discount = isMember ? Math.round(subtotal * (currentMember.discountPercent / 100)) : 0;
    const grandTotal = subtotal - discount;

    cartSubtotalText.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if (cartMemberDiscountRow && cartMemberDiscountText) {
      if (isMember && discount > 0) {
        cartMemberDiscountRow.style.display = 'flex';
        cartMemberDiscountText.textContent = `-Rp ${discount.toLocaleString('id-ID')}`;
      } else {
        cartMemberDiscountRow.style.display = 'none';
      }
    }
    cartGrandTotalText.textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
  }

  cartTriggerBtn.addEventListener('click', () => {
    window.lumpiaAudio.playClick();
    cartBackdrop.classList.add('open');
    renderCart();
  });

  closeCartBtn.addEventListener('click', () => {
    cartBackdrop.classList.remove('open');
  });

  cartBackdrop.addEventListener('click', (e) => {
    if (e.target === cartBackdrop) cartBackdrop.classList.remove('open');
  });

  // WhatsApp Instant Order
  btnCheckoutWhatsApp.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Keranjang Anda masih kosong. Silakan pilih menu terlebih dahulu!');
      return;
    }

    let subtotal = 0;
    let text = '*HALO DAPUR LUMPIA KANJENG! Saya mau pesan lumpia hangat:*%0A%0A';
    cart.forEach((item, idx) => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;
      text += `*${idx + 1}. ${item.name}* (x${item.qty})%0A   - Ket: ${item.subtext}%0A   - Harga: Rp ${lineTotal.toLocaleString('id-ID')}%0A%0A`;
    });

    const isMember = currentMember && currentMember.discountPercent;
    const discount = isMember ? Math.round(subtotal * (currentMember.discountPercent / 100)) : 0;
    const grandTotal = subtotal - discount;

    text += `*SUBTOTAL: Rp ${subtotal.toLocaleString('id-ID')}*%0A`;
    if (isMember) {
      text += `*👑 MEMBER VIP KANJENG CLUB:* ${currentMember.name} (ID: ${currentMember.id})%0A`;
      text += `*DISKON 15% VIP: -Rp ${discount.toLocaleString('id-ID')}*%0A`;
    }
    text += `*TOTAL PEMBAYARAN: Rp ${grandTotal.toLocaleString('id-ID')}*%0A`;
    text += `*Metode: Pengiriman Instan / Dine-in*%0A`;
    text += `Mohon konfirmasi ketersediaan & nomor rekening/QRIS ya Kak. Terima kasih!`;

    const waUrl = `https://wa.me/6281288997800?text=${text}`;
    window.open(waUrl, '_blank');
  });

  // --- 8. THERMAL RECEIPT MODAL ---
  btnPrintReceipt.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Keranjang Anda masih kosong untuk mencetak struk!');
      return;
    }

    window.lumpiaAudio.playRegisterDing();
    const now = new Date();
    rDate.textContent = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + now.toTimeString().split(' ')[0];
    rOrderNo.textContent = '#LK-' + Math.floor(Math.random() * 90000 + 10000);

    rItemsList.innerHTML = '';
    let subtotal = 0;
    cart.forEach(item => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;
      const row = document.createElement('div');
      row.className = 'r-row';
      row.innerHTML = `
        <span>${item.name} x${item.qty}</span>
        <span>Rp ${lineTotal.toLocaleString('id-ID')}</span>
      `;
      rItemsList.appendChild(row);
    });

    const isMember = currentMember && currentMember.discountPercent;
    const discount = isMember ? Math.round(subtotal * (currentMember.discountPercent / 100)) : 0;
    const grandTotal = subtotal - discount;

    if (isMember && discount > 0) {
      const discRow = document.createElement('div');
      discRow.className = 'r-row';
      discRow.style.color = '#b87c00';
      discRow.style.fontWeight = 'bold';
      discRow.innerHTML = `
        <span>👑 Diskon VIP (15%):</span>
        <span>-Rp ${discount.toLocaleString('id-ID')}</span>
      `;
      rItemsList.appendChild(discRow);
    }

    rTotalAmount.textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
    receiptModal.classList.add('open');
  });

  closeReceiptBtn.addEventListener('click', () => {
    receiptModal.classList.remove('open');
  });

  receiptModal.addEventListener('click', (e) => {
    if (e.target === receiptModal) receiptModal.classList.remove('open');
  });

  // WhatsApp Outlet Direct Buttons
  document.querySelectorAll('.btn-wa-order').forEach(btn => {
    btn.addEventListener('click', () => {
      const outlet = btn.dataset.outlet || 'Semarang';
      const text = encodeURIComponent(`Halo admin Lumpia Kanjeng cabang ${outlet}, saya mau tanya info ketersediaan menu dan pemesanan!`);
      window.open(`https://wa.me/6281288997800?text=${text}`, '_blank');
    });
  });

  // Toast Helper
  function showToast(msg) {
    const hub = document.getElementById('toastHub');
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>⚡</span> <span>${msg}</span>`;
    hub.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // Initial load
  updateCartBadge();
});
