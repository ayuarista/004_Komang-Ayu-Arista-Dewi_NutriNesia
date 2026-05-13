(function () {
  'use strict';

  /* ---- Scroll Reveal (sections + staggered children) ---- */
  function initReveal() {
    var sections = document.querySelectorAll('[data-reveal]');
    var groups = document.querySelectorAll('[data-reveal-child]');

    var opts = { threshold: 0.08, rootMargin: '0px 0px -48px 0px' };

    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          sectionObs.unobserve(entry.target);
        }
      });
    }, opts);

    var groupObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          groupObs.unobserve(entry.target);
        }
      });
    }, opts);

    sections.forEach(function (el) { sectionObs.observe(el); });
    groups.forEach(function (el) { groupObs.observe(el); });
  }

  /* ---- Testimonials Carousel (Swiper) ---- */
  function initTestiCarousel() {
    var tnEl = document.querySelector('.tn-carousel');
    if (!tnEl || typeof Swiper === 'undefined') return;

    var swiper = new Swiper(tnEl, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: true,
      speed: 600,
      grabCursor: true,
      allowTouchMove: true
    });

    var btnPrev = document.querySelector('.tn-nav-btn.prev');
    var btnNext = document.querySelector('.tn-nav-btn.next');
    if (btnPrev) btnPrev.addEventListener('click', function () { swiper.slidePrev(); });
    if (btnNext) btnNext.addEventListener('click', function () { swiper.slideNext(); });
  }

  /* ---- Features Image Carousel (Swiper) ---- */
  function initFeaturesCarousel() {
    var wrapper = document.querySelector('.swiper.fa-main-carousel-wrapper');
    if (!wrapper || typeof Swiper === 'undefined') return;

    var swiper = new Swiper(wrapper, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      grabCursor: true
    });

    var btnPrev = document.querySelector('.fa-nav-btn.prev');
    var btnNext = document.querySelector('.fa-nav-btn.next');
    if (btnPrev) btnPrev.addEventListener('click', function () { swiper.slidePrev(); });
    if (btnNext) btnNext.addEventListener('click', function () { swiper.slideNext(); });
  }

  /* ---- Features Accordion ---- */
  function initFeaturesAccordion() {
    var headers = document.querySelectorAll('.acc-header');
    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var item = this.closest('.acc-item');
        var isActive = item.classList.contains('active');
        document.querySelectorAll('.acc-item').forEach(function (i) { i.classList.remove('active'); });
        if (!isActive) item.classList.add('active');
      });
    });
  }

  /* ---- FAQ Accordion ---- */
  function initFAQAccordion() {
    var headers = document.querySelectorAll('.faq-header');
    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var item = this.closest('.faq-item');
        var isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
        if (!isActive) item.classList.add('active');
      });
    });
  }

  /* ---- Animated Stat Counters ---- */
  function initCounters() {
    var statRow = document.querySelector('.about-stats-row');
    var nums = document.querySelectorAll('.stat-item h3[data-target]');
    if (!statRow || !nums.length) return;
    var done = false;

    function fmt(n, target) {
      var isDecimal = target % 1 !== 0;
      if (n >= 1000) return (n / 1000).toFixed(0) + 'K+';
      if (isDecimal) return n.toFixed(1);
      if (target === 3) return Math.round(n) + '+';
      if (target === 500) return Math.round(n) + '+';
      return Math.round(n).toString();
    }

    function run() {
      if (done) return;
      done = true;
      nums.forEach(function (el) {
        var targetValue = parseFloat(el.getAttribute('data-target')) || 0;
        var dur = 2000;
        var t0 = null;
        function tick(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 4); // Quartic ease out
          el.textContent = fmt(targetValue * ease, targetValue);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = fmt(targetValue, targetValue);
        }
        requestAnimationFrame(tick);
      });
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          run();
          obs.unobserve(statRow);
        }
      });
    }, { threshold: 0.2 });

    obs.observe(statRow);
  }

  /* ---- Logo slider pause-on-hover (CSS handles animation) ---- */
  function initLogoSlider() {
    var track = document.querySelector('.hp-slider-track');
    if (!track) return;
    track.addEventListener('mouseenter', function () { track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', function () { track.style.animationPlayState = 'running'; });
  }

  /* ---- Boot (each init isolated so one failure doesn't block others) ---- */
  function boot() {
    try { initReveal(); } catch (e) { console.error('[home] Reveal:', e); }
    try { initTestiCarousel(); } catch (e) { console.error('[home] TestiCarousel:', e); }
    try { initFeaturesCarousel(); } catch (e) { console.error('[home] FeaturesCarousel:', e); }
    try { initFeaturesAccordion(); } catch (e) { console.error('[home] FeaturesAccordion:', e); }
    try { initFAQAccordion(); } catch (e) { console.error('[home] FAQAccordion:', e); }
    try { initCounters(); } catch (e) { console.error('[home] Counters:', e); }
    try { initLogoSlider(); } catch (e) { console.error('[home] LogoSlider:', e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();