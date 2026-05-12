(function () {
  'use strict';

  /* ============================================
     Data: Alternative meals per slot
     ============================================ */
  var ALT_MEALS = {
    sarapan: [
      {
        id: 's1',
        name: 'Oatmeal Pisang Madu',
        calories: 320,
        tags: ['Tinggi Serat'],
        image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&q=80'
      },
      {
        id: 's2',
        name: 'Roti Gandum Telur',
        calories: 380,
        tags: ['Tinggi Protein'],
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80'
      },
      {
        id: 's3',
        name: 'Smoothie Bowl Berry',
        calories: 290,
        tags: ['Rendah Gula'],
        image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400&q=80'
      },
      {
        id: 's4',
        name: 'Bubur Ayam Sehat',
        calories: 410,
        tags: ['Seimbang'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
      }
    ],
    'makan-siang': [
      {
        id: 'l1',
        name: 'Nasi Merah + Ikan Bakar',
        calories: 580,
        tags: ['Tinggi Protein'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
      },
      {
        id: 'l2',
        name: 'Gado-Gado Sayur',
        calories: 480,
        tags: ['Tinggi Serat'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'
      },
      {
        id: 'l3',
        name: 'Ayam Teriyaki Quinoa',
        calories: 620,
        tags: ['Tinggi Protein'],
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80'
      },
      {
        id: 'l4',
        name: 'Pecel Lele + Lalapan',
        calories: 540,
        tags: ['Seimbang'],
        image: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=400&q=80'
      }
    ],
    'makan-malam': [
      {
        id: 'd1',
        name: 'Sup Ayam Jagung',
        calories: 380,
        tags: ['Rendah Gula'],
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80'
      },
      {
        id: 'd2',
        name: 'Salad Tuna Alpukat',
        calories: 420,
        tags: ['Tinggi Protein'],
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80'
      },
      {
        id: 'd3',
        name: 'Tumis Brokoli Tahu',
        calories: 340,
        tags: ['Tinggi Serat'],
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80'
      },
      {
        id: 'd4',
        name: 'Nasi Goreng Kembang Kol',
        calories: 390,
        tags: ['Rendah Gula'],
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80'
      }
    ],
    camilan: [
      {
        id: 'c1',
        name: 'Yogurt Granola',
        calories: 180,
        tags: ['Tinggi Protein'],
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80'
      },
      {
        id: 'c2',
        name: 'Buah Potong Segar',
        calories: 120,
        tags: ['Rendah Gula'],
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80'
      },
      {
        id: 'c3',
        name: 'Kacang Almond Panggang',
        calories: 210,
        tags: ['Tinggi Protein'],
        image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80'
      },
      {
        id: 'c4',
        name: 'Edamame Rebus',
        calories: 140,
        tags: ['Tinggi Serat'],
        image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80'
      }
    ]
  };

  /* ============================================
     Data: Recipe detail (keyed by meal name)
     ============================================ */
  var RECIPES = {
    'Oatmeal Pisang Madu': {
      image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&q=80',
      duration: '10 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['50 g oatmeal', '1 buah pisang', '1 sdm madu', '200 ml susu almond', '1 sdm chia seed', 'Kayu manis secukupnya'],
      steps: ['Rebus susu almond hingga hangat lalu masukkan oatmeal.', 'Masak dengan api kecil selama 5 menit sambil diaduk.', 'Tambahkan madu dan kayu manis, aduk rata.', 'Sajikan dengan topping pisang dan chia seed.'],
      tip: 'Gunakan pisang yang matang untuk rasa manis alami tanpa perlu menambah gula.'
    },
    'Roti Gandum Telur': {
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
      duration: '8 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['2 lembar roti gandum', '2 butir telur', '1 iris keju low-fat', 'Daun selada', 'Tomat iris', 'Garam & lada'],
      steps: ['Panggang roti gandum hingga renyah.', 'Buat telur orak-arik dengan sedikit minyak.', 'Susun roti, telur, keju, selada, dan tomat.', 'Sajikan hangat dengan teh tawar.'],
      tip: 'Roti gandum utuh memiliki indeks glikemik rendah sehingga kenyang lebih lama.'
    },
    'Smoothie Bowl Berry': {
      image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=800&q=80',
      duration: '7 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['150 g berry beku', '1 buah pisang', '100 ml yogurt plain', '1 sdm granola', '1 sdm biji chia', 'Madu secukupnya'],
      steps: ['Blender berry, pisang, dan yogurt hingga halus.', 'Tuang ke mangkuk.', 'Taburi granola dan biji chia di atasnya.', 'Tambah sedikit madu sebelum disajikan.'],
      tip: 'Pilih yogurt plain tanpa gula tambahan untuk mempertahankan profil rendah gula.'
    },
    'Bubur Ayam Sehat': {
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      duration: '30 menit',
      difficulty: 'Sedang',
      serving: '2 porsi',
      ingredients: ['100 g beras merah', '150 g dada ayam', '1 L kaldu rendah sodium', 'Jahe, bawang putih', 'Daun bawang', 'Kecap asin rendah garam'],
      steps: ['Rebus beras merah dengan kaldu hingga menjadi bubur.', 'Rebus ayam terpisah, lalu suwir.', 'Tumis jahe dan bawang putih, masukkan ke bubur.', 'Sajikan dengan topping ayam suwir dan daun bawang.'],
      tip: 'Gunakan beras merah untuk serat lebih tinggi dibanding bubur nasi putih biasa.'
    },
    'Nasi Merah + Ikan Bakar': {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      duration: '25 menit',
      difficulty: 'Sedang',
      serving: '1 porsi',
      ingredients: ['100 g nasi merah', '120 g ikan kembung', 'Bumbu kunyit, ketumbar', 'Sayur urap', 'Sambal matah', 'Perasan jeruk nipis'],
      steps: ['Lumuri ikan dengan bumbu kunyit dan jeruk nipis.', 'Bakar ikan hingga matang merata.', 'Siapkan nasi merah hangat.', 'Sajikan dengan urap dan sambal matah.'],
      tip: 'Nasi merah + ikan merupakan kombinasi karbohidrat kompleks dan omega-3.'
    },
    'Gado-Gado Sayur': {
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      duration: '20 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['Tauge, kacang panjang, bayam', '1 butir telur rebus', '50 g tahu goreng', 'Bumbu kacang', 'Kerupuk', 'Lontong secukupnya'],
      steps: ['Rebus semua sayuran hingga matang.', 'Siapkan bumbu kacang halus.', 'Tata sayuran, telur, dan tahu di piring.', 'Siram bumbu kacang dan tambah kerupuk.'],
      tip: 'Kurangi kerupuk dan gunakan bumbu kacang tanpa gula untuk versi lebih sehat.'
    },
    'Ayam Teriyaki Quinoa': {
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',
      duration: '25 menit',
      difficulty: 'Sedang',
      serving: '1 porsi',
      ingredients: ['100 g quinoa', '120 g dada ayam', 'Saus teriyaki rendah sodium', 'Brokoli rebus', 'Wijen sangrai', 'Bawang putih cincang'],
      steps: ['Masak quinoa dengan air hingga mengembang.', 'Tumis ayam dengan bawang putih.', 'Tambahkan saus teriyaki, aduk hingga meresap.', 'Sajikan dengan brokoli dan taburan wijen.'],
      tip: 'Quinoa adalah sumber protein nabati lengkap dan bebas gluten.'
    },
    'Pecel Lele + Lalapan': {
      image: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=800&q=80',
      duration: '20 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['1 ekor lele', '100 g nasi merah', 'Lalapan: timun, kemangi', 'Sambal terasi', 'Tempe goreng', 'Jeruk nipis'],
      steps: ['Goreng lele dengan minyak sedikit.', 'Siapkan lalapan segar.', 'Sajikan dengan nasi merah dan tempe.', 'Tambahkan sambal terasi sesuai selera.'],
      tip: 'Gunakan teknik goreng dengan minyak sedikit untuk menekan lemak jenuh.'
    },
    'Sup Ayam Jagung': {
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      duration: '30 menit',
      difficulty: 'Mudah',
      serving: '2 porsi',
      ingredients: ['150 g dada ayam', '1 buah jagung manis', 'Wortel, kentang', 'Daun bawang, seledri', 'Kaldu ayam rendah sodium', 'Merica & garam'],
      steps: ['Rebus ayam hingga empuk, lalu suwir.', 'Masukkan jagung, wortel, dan kentang.', 'Tambahkan kaldu dan bumbu.', 'Taburi daun bawang sebelum disajikan.'],
      tip: 'Sup hangat membantu pencernaan di malam hari dan rendah kalori.'
    },
    'Salad Tuna Alpukat': {
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
      duration: '10 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['1 kaleng tuna in water', '1/2 buah alpukat', 'Selada romaine', 'Tomat ceri', 'Olive oil & lemon', 'Merica hitam'],
      steps: ['Tiriskan tuna.', 'Potong alpukat dan tomat.', 'Campur semua bahan dalam mangkuk.', 'Tambah dressing olive oil dan lemon.'],
      tip: 'Kombinasi tuna + alpukat memberi protein dan lemak sehat ideal untuk malam hari.'
    },
    'Tumis Brokoli Tahu': {
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
      duration: '15 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['1 bonggol brokoli', '100 g tahu putih', 'Bawang putih, jahe', 'Saus tiram rendah sodium', 'Minyak wijen', 'Cabe rawit (opsional)'],
      steps: ['Rebus brokoli 1 menit lalu tiriskan.', 'Goreng tahu sampai keemasan.', 'Tumis bawang putih dan jahe.', 'Masukkan brokoli, tahu, dan saus tiram.'],
      tip: 'Tahu adalah sumber protein nabati rendah kalori yang cocok untuk diet.'
    },
    'Nasi Goreng Kembang Kol': {
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
      duration: '15 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['200 g kembang kol', '1 butir telur', 'Bawang putih', 'Kecap manis sedikit', 'Sayuran campur', 'Minyak zaitun'],
      steps: ['Parut/cincang kembang kol hingga seperti nasi.', 'Tumis bawang putih dengan minyak zaitun.', 'Masukkan telur orak-arik, lalu kembang kol.', 'Tambah kecap dan sayuran, aduk rata.'],
      tip: 'Pengganti nasi ini memangkas karbohidrat hingga 70% namun tetap mengenyangkan.'
    },
    'Yogurt Granola': {
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      duration: '3 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['150 g yogurt plain', '30 g granola', '1 sdt madu', 'Buah segar', 'Biji bunga matahari'],
      steps: ['Tuang yogurt ke mangkuk.', 'Tambah granola di atasnya.', 'Taburi buah segar dan biji.', 'Siram madu sebelum disajikan.'],
      tip: 'Pilih granola rendah gula untuk hasil maksimal pada program diet.'
    },
    'Buah Potong Segar': {
      image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&q=80',
      duration: '5 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['Semangka', 'Melon', 'Pepaya', 'Apel', 'Perasan jeruk nipis', 'Daun mint'],
      steps: ['Cuci semua buah hingga bersih.', 'Potong dadu ukuran seragam.', 'Tata di piring.', 'Perasan jeruk nipis dan hias dengan mint.'],
      tip: 'Buah segar kaya serat dan vitamin, membantu hidrasi alami tubuh.'
    },
    'Kacang Almond Panggang': {
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&q=80',
      duration: '12 menit',
      difficulty: 'Mudah',
      serving: '2 porsi',
      ingredients: ['100 g almond mentah', 'Sejumput garam laut', '1/2 sdt kayu manis', '1/2 sdt madu (opsional)'],
      steps: ['Panaskan oven 160°C.', 'Campur almond dengan garam dan kayu manis.', 'Panggang 10 menit hingga harum.', 'Biarkan dingin sebelum disimpan.'],
      tip: 'Segenggam almond/hari menurunkan risiko kolesterol tinggi dan kaya vitamin E.'
    },
    'Edamame Rebus': {
      image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&q=80',
      duration: '8 menit',
      difficulty: 'Mudah',
      serving: '1 porsi',
      ingredients: ['200 g edamame beku', '1 sdt garam laut', '1 siung bawang putih (opsional)', 'Air panas'],
      steps: ['Didihkan air lalu masukkan edamame.', 'Rebus 5 menit hingga matang.', 'Tiriskan dan taburi garam.', 'Sajikan hangat.'],
      tip: 'Edamame mengandung protein nabati lengkap + serat tinggi, bagus untuk camilan sore.'
    }
  };

  /* ============================================
     DOM helpers
     ============================================ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ============================================
     Modal controller
     ============================================ */
  var modalOverlay, modalEl, modalTitle, modalSubtitle, modalBody;

  function initModal() {
    modalOverlay = $('#pn-modal-overlay');
    if (!modalOverlay) return;
    modalEl = $('.pn-modal', modalOverlay);
    modalTitle = $('#pn-modal-title');
    modalSubtitle = $('#pn-modal-subtitle');
    modalBody = $('#pn-modal-body');

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    var closeBtn = $('#pn-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });
  }

  function openModal(title, subtitle, contentHTML) {
    if (!modalOverlay) return;
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalBody.innerHTML = contentHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ============================================
     Swap meal modal
     ============================================ */
  function openSwapModal(mealCard) {
    var slot = mealCard.getAttribute('data-slot');
    var slotLabel = mealCard.getAttribute('data-slot-label') || slot;
    var options = ALT_MEALS[slot] || [];

    var html = '<div class="pn-swap-list">' + options.map(function (opt) {
      var tagsHtml = opt.tags.map(function (t) {
        return '<span class="pn-swap-option-tag">' + t + '</span>';
      }).join('');
      return (
        '<button type="button" class="pn-swap-option" data-meal-id="' + opt.id + '" data-meal-name="' + opt.name + '" data-meal-cal="' + opt.calories + '" data-meal-image="' + opt.image + '" data-meal-tags="' + opt.tags.join(',') + '">' +
          '<div class="pn-swap-option-img"><img src="' + opt.image + '" alt="' + opt.name + '" loading="lazy"></div>' +
          '<div class="pn-swap-option-body">' +
            '<div class="pn-swap-option-name">' + opt.name + '</div>' +
            '<div class="pn-swap-option-meta">' +
              '<span class="pn-swap-option-cal">' + opt.calories + ' kcal</span>' +
              tagsHtml +
            '</div>' +
          '</div>' +
          '<span class="pn-swap-option-arrow material-symbols-outlined">arrow_forward</span>' +
        '</button>'
      );
    }).join('') + '</div>';

    openModal('Ganti Menu ' + slotLabel, 'Pilih alternatif yang tetap sesuai target nutrisi harianmu.', html);

    // Bind click on options
    $$('.pn-swap-option', modalBody).forEach(function (btn) {
      btn.addEventListener('click', function () {
        applySwap(mealCard, {
          name: btn.getAttribute('data-meal-name'),
          calories: parseInt(btn.getAttribute('data-meal-cal'), 10),
          image: btn.getAttribute('data-meal-image'),
          tags: btn.getAttribute('data-meal-tags').split(',').filter(Boolean)
        });
        closeModal();
      });
    });
  }

  function tagToClass(tag) {
    var t = tag.toLowerCase();
    if (t.indexOf('protein') !== -1) return 'protein';
    if (t.indexOf('gula') !== -1) return 'low-sugar';
    if (t.indexOf('serat') !== -1) return 'fiber';
    return 'balanced';
  }

  function applySwap(card, meal) {
    var img = $('.pn-meal-image img', card);
    var title = $('.pn-meal-title', card);
    var calStrong = $('.pn-meal-calories strong', card);
    var tagsWrap = $('.pn-meal-tags', card);

    if (img) img.src = meal.image;
    if (img) img.alt = meal.name;
    if (title) title.textContent = meal.name;
    if (calStrong) calStrong.textContent = meal.calories;

    if (tagsWrap) {
      tagsWrap.innerHTML = meal.tags.map(function (t) {
        return '<span class="pn-meal-tag ' + tagToClass(t) + '">' + t + '</span>';
      }).join('');
    }

    // brief flash animation
    card.style.transition = 'transform 0.4s ease';
    card.style.transform = 'scale(1.02)';
    setTimeout(function () { card.style.transform = ''; }, 400);
  }

  /* ============================================
     Recipe modal
     ============================================ */
  function openRecipeModal(mealCard) {
    var title = $('.pn-meal-title', mealCard);
    var mealName = title ? title.textContent.trim() : '';
    var recipe = RECIPES[mealName];

    if (!recipe) {
      openModal(mealName, 'Resep detail belum tersedia.',
        '<p style="color:var(--color-on-surface-variant);font-size:var(--font-size-body-md);line-height:1.6">Maaf, resep lengkap untuk menu ini belum tersedia di perpustakaan kami. Silakan coba menu lain atau hubungi ahli gizi untuk resep kustom.</p>');
      return;
    }

    var ingredientsHtml = recipe.ingredients.map(function (i) {
      return '<div class="pn-recipe-ingredient">' + i + '</div>';
    }).join('');

    var stepsHtml = recipe.steps.map(function (s, idx) {
      return (
        '<div class="pn-recipe-step">' +
          '<div class="pn-recipe-step-num">' + (idx + 1) + '</div>' +
          '<div class="pn-recipe-step-text">' + s + '</div>' +
        '</div>'
      );
    }).join('');

    var html =
      '<div class="pn-recipe-hero"><img src="' + recipe.image + '" alt="' + mealName + '" loading="lazy"></div>' +
      '<div class="pn-recipe-meta">' +
        '<div class="pn-recipe-meta-item">' +
          '<span class="material-symbols-outlined">schedule</span>' +
          '<div class="pn-recipe-meta-label">Durasi</div>' +
          '<div class="pn-recipe-meta-value">' + recipe.duration + '</div>' +
        '</div>' +
        '<div class="pn-recipe-meta-item">' +
          '<span class="material-symbols-outlined">restaurant</span>' +
          '<div class="pn-recipe-meta-label">Porsi</div>' +
          '<div class="pn-recipe-meta-value">' + recipe.serving + '</div>' +
        '</div>' +
        '<div class="pn-recipe-meta-item">' +
          '<span class="material-symbols-outlined">bar_chart</span>' +
          '<div class="pn-recipe-meta-label">Tingkat</div>' +
          '<div class="pn-recipe-meta-value">' + recipe.difficulty + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pn-recipe-section-title"><span class="material-symbols-outlined">shopping_basket</span>Bahan-bahan</div>' +
      '<div class="pn-recipe-ingredients">' + ingredientsHtml + '</div>' +
      '<div class="pn-recipe-section-title"><span class="material-symbols-outlined">format_list_numbered</span>Langkah Memasak</div>' +
      '<div class="pn-recipe-steps">' + stepsHtml + '</div>' +
      '<div class="pn-recipe-tip">' +
        '<span class="material-symbols-outlined">tips_and_updates</span>' +
        '<div class="pn-recipe-tip-text"><strong>Tips Nutrisi</strong>' + recipe.tip + '</div>' +
      '</div>';

    openModal(mealName, 'Panduan memasak lengkap dengan tips nutrisi.', html);
  }

  /* ============================================
     Bind meal card buttons
     ============================================ */
  function initMealCards() {
    $$('.pn-meal-card').forEach(function (card) {
      var swapBtn = $('[data-action="swap"]', card);
      var recipeBtn = $('[data-action="recipe"]', card);

      if (swapBtn) {
        swapBtn.addEventListener('click', function () { openSwapModal(card); });
      }
      if (recipeBtn) {
        recipeBtn.addEventListener('click', function () { openRecipeModal(card); });
      }
    });
  }

  /* ============================================
     Animate hero calorie ring based on data-progress
     ============================================ */
  function initCalorieRing() {
    var ring = $('#pn-calorie-ring-fill');
    if (!ring) return;
    var radius = parseFloat(ring.getAttribute('r')) || 58;
    var circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    var pct = parseFloat(ring.getAttribute('data-progress')) || 0;
    requestAnimationFrame(function () {
      setTimeout(function () {
        ring.style.strokeDashoffset = circumference * (1 - pct / 100);
      }, 200);
    });
  }

  /* ============================================
     Animate macro progress bars
     ============================================ */
  function initMacroBars() {
    $$('.pn-progress-fill').forEach(function (bar) {
      var target = bar.getAttribute('data-progress');
      if (target == null) return;
      bar.style.width = '0%';
      requestAnimationFrame(function () {
        setTimeout(function () { bar.style.width = target + '%'; }, 300);
      });
    });
  }

  /* ============================================
     Week day progress bars
     ============================================ */
  function initWeekBars() {
    $$('.pn-week-day-progress-fill').forEach(function (bar) {
      var target = bar.getAttribute('data-progress');
      if (target == null) return;
      bar.style.width = '0%';
      requestAnimationFrame(function () {
        setTimeout(function () { bar.style.width = target + '%'; }, 400);
      });
    });
  }

  /* ============================================
     Init
     ============================================ */
  function init() {
    initModal();
    initMealCards();
    initCalorieRing();
    initMacroBars();
    initWeekBars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
