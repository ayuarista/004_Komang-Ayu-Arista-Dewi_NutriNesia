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
        image: '../images/oatmeal.jpg'
      },
      {
        id: 's2',
        name: 'Roti Gandum Telur',
        calories: 380,
        tags: ['Tinggi Protein'],
        image: '../images/roti-gandum.jpg'
      },
      {
        id: 's3',
        name: 'Soto Ayam Sehat',
        calories: 410,
        tags: ['Seimbang'],
        image: '../images/soto-ayam2.png'
      }
    ],
    'makan-siang': [
      {
        id: 'l1',
        name: 'Nasi Merah + Ikan Bakar',
        calories: 580,
        tags: ['Tinggi Protein'],
        image: '../images/opor-ayam.png'
      },
      {
        id: 'l2',
        name: 'Gado-Gado Sayur',
        calories: 480,
        tags: ['Tinggi Serat'],
        image: '../images/gado-gado.png'
      },
      {
        id: 'l3',
        name: 'Pecel Lele + Lalapan',
        calories: 540,
        tags: ['Seimbang'],
        image: '../images/pecel-lele.png'
      }
    ],
    'makan-malam': [
      {
        id: 'd1',
        name: 'Sup Ayam Jagung',
        calories: 380,
        tags: ['Rendah Gula'],
        image: '../images/sup-jagung.jpg'
      },
      {
        id: 'd2',
        name: 'Salad Tuna Alpukat',
        calories: 420,
        tags: ['Tinggi Protein'],
        image: '../images/salad.png'
      },
      {
        id: 'd3',
        name: 'Nasi Goreng Kembang Kol',
        calories: 390,
        tags: ['Rendah Gula'],
        image: '../images/nasigoreng.jpg'
      }
    ],
    camilan: [
      {
        id: 'c1',
        name: 'Yogurt Granola',
        calories: 180,
        tags: ['Tinggi Protein'],
        image: '../images/oatmeal.jpg'
      },
      {
        id: 'c2',
        name: 'Buah Potong Segar',
        calories: 120,
        tags: ['Rendah Gula'],
        image: '../images/sehat.png'
      },
      {
        id: 'c3',
        name: 'Smoothie Bowl Berry',
        calories: 290,
        tags: ['Rendah Gula'],
        image: '../images/smoothie.png'
      },
    ]
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
     Bind meal card buttons
     ============================================ */
  function initMealCards() {
    $$('.pn-meal-card').forEach(function (card) {
      var swapBtn = $('[data-action="swap"]', card);

      if (swapBtn) {
        swapBtn.addEventListener('click', function () { openSwapModal(card); });
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
