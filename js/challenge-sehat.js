(function () {
  'use strict';

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  /* ============================================
     Animate progress bars & rings on reveal
     ============================================ */
  function animateProgress() {
    $$('.cs-progress-bar-fill').forEach(function (bar) {
      var target = bar.getAttribute('data-progress');
      if (target == null) return;
      bar.style.width = '0%';
      setTimeout(function () { bar.style.width = target + '%'; }, 100);
    });

    $$('.cs-progress-ring-fill').forEach(function (ring) {
      var r = parseFloat(ring.getAttribute('r')) || 32;
      var circumference = 2 * Math.PI * r;
      var pct = parseFloat(ring.getAttribute('data-progress')) || 0;
      var offset = circumference - (pct / 100) * circumference;
      ring.setAttribute('stroke-dasharray', circumference);
      ring.setAttribute('stroke-dashoffset', circumference);
      setTimeout(function () {
        ring.setAttribute('stroke-dashoffset', offset);
      }, 150);
    });

    $$('.cs-bar').forEach(function (bar) {
      var h = bar.getAttribute('data-height');
      if (h == null) return;
      bar.style.height = '0%';
      setTimeout(function () { bar.style.height = h + '%'; }, 200);
    });
  }

  var modal = $('#cs-join-modal');
  var modalTitle = $('#cs-modal-challenge-name');
  var modalClose = $('.cs-modal-close', modal);

  function openModal(challengeName) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = challengeName || 'tantangan ini';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
      var closer = e.target.closest('[data-close="modal"]');
      if (closer) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  /* ============================================
     "Ikuti" button → open modal
     ============================================ */
  $$('.cs-ikuti-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('joined')) return;
      var card = btn.closest('.cs-cat-card');
      var titleEl = card ? card.querySelector('.cs-cat-title') : null;
      var name = titleEl ? titleEl.textContent.trim() : '';
      openModal(name);

      // Mark as joined
      btn.classList.add('joined');
      btn.textContent = 'Diikuti';
    });
  });

  /* ============================================
     Init
     ============================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateProgress);
  } else {
    animateProgress();
  }
})();
