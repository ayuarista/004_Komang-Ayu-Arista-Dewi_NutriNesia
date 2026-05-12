/* Komunitas — Forum Tips Sehat */
(function () {
  'use strict';

  /* ============================================
     CAROUSEL
     ============================================ */
  var track = document.getElementById('km-carousel');
  var prevBtn = document.getElementById('km-prev');
  var nextBtn = document.getElementById('km-next');
  var dotsWrap = document.getElementById('km-dots');
  var slides = track ? track.querySelectorAll('.km-slide') : [];
  var dotEls = [];
  var currentIdx = 0;
  var autoTimer = null;

  function buildDots() {
    if (!dotsWrap || slides.length === 0) return;
    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'km-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(d);
      dotEls.push(d);
    });
  }

  function updateDots() {
    dotEls.forEach(function (d, i) {
      d.classList.toggle('active', i === currentIdx);
    });
  }

  function goTo(idx) {
    if (!track || slides.length === 0) return;
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    currentIdx = idx;
    slides[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    updateDots();
    resetAuto();
  }

  function resetAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(currentIdx + 1); }, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIdx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIdx + 1); });

  // Detect current slide on manual scroll
  if (track) {
    var scrollTimeout;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var center = track.scrollLeft + track.offsetWidth / 2;
        var closest = 0;
        var minDist = Infinity;
        slides.forEach(function (s, i) {
          var d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
          if (d < minDist) { minDist = d; closest = i; }
        });
        currentIdx = closest;
        updateDots();
        resetAuto();
      }, 100);
    });
  }

  buildDots();
  if (slides.length > 0) resetAuto();

  /* ============================================
     CREATE TOPIC MODAL
     ============================================ */
  var modal = document.getElementById('km-create-modal');

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open triggers
  document.querySelectorAll('[data-open="create-topic"]').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  // Close triggers
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
      if (e.target.closest('[data-close="modal"]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  // Fake submit feedback
  var form = document.getElementById('km-create-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('.km-modal-submit');
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Berhasil Dibuat!';
        setTimeout(function () {
          closeModal();
          submitBtn.innerHTML = '<span class="material-symbols-outlined">send</span> Buat Topik';
          form.reset();
        }, 1500);
      }
    });
  }

  /* ============================================
     FILTER PILLS
     ============================================ */
  var filters = document.querySelectorAll('.km-filter');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.classList.remove('active'); });
      f.classList.add('active');
    });
  });
})();
