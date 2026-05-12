/* ============================================
   NutriNesia - Shared Components (Navbar + Footer)
   ============================================ */

(function () {
  'use strict';

  /* ---- Helpers ---- */
  function getCurrentPageName() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const filename = segments[segments.length - 1] || 'index.html';
    return filename.replace('.html', '');
  }

  function getRelativePath() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    if (depth <= 1) return './';
    return '../'.repeat(depth - 1);
  }

  /* ---- Navbar HTML ---- */
  function createNavbarHTML(basePath) {
    const currentPage = getCurrentPageName();

    const navItems = [
      { href: 'pages/nutrition-checker/index.html', label: 'Nutrition Checker', icon: 'fas fa-calculator', key: 'nutrition-checker' },
      { href: 'pages/food-scanner/index.html', label: 'Food Scanner', icon: 'fas fa-camera', key: 'food-scanner' },
      { href: 'pages/stunting/index.html', label: 'Stunting', icon: 'fas fa-child', key: 'stunting' },
      { href: 'pages/meal-planner/index.html', label: 'Meal Planner', icon: 'fas fa-calendar-alt', key: 'meal-planner' },
      { href: 'pages/habit-tracker/index.html', label: 'Habit Tracker', icon: 'fas fa-check-circle', key: 'habit-tracker' },
      { href: 'pages/myth-facts/index.html', label: 'Mitos & Fakta', icon: 'fas fa-lightbulb', key: 'myth-facts' },
    ];

    const navLinksHTML = navItems.map(item => {
      const isActive = currentPage === item.key ? 'active' : '';
      const href = basePath === './' ? item.href : basePath + item.href;
      return `
        <a href="${href}" class="navbar__nav-link ${isActive}">
          <i class="${item.icon}" aria-hidden="true"></i>
          ${item.label}
        </a>`;
    }).join('');

    const mobileNavLinksHTML = navItems.map(item => {
      const isActive = currentPage === item.key ? 'active' : '';
      const href = basePath === './' ? item.href : basePath + item.href;
      return `
        <a href="${href}" class="navbar__mobile-nav-link ${isActive}">
          <i class="${item.icon}" aria-hidden="true"></i>
          ${item.label}
        </a>`;
    }).join('');

    const homeHref = basePath + 'index.html';
    const loginHref = basePath + 'pages/auth/login.html';
    const registerHref = basePath + 'pages/auth/register.html';
    const profileHref = basePath + 'pages/profile/index.html';

    return `
      <nav class="navbar" id="main-navbar" role="navigation" aria-label="Navigasi utama">
        <div class="container navbar__inner">
          <a href="${homeHref}" class="navbar__logo" aria-label="NutriNesia Beranda">
            <div class="navbar__logo-icon" aria-hidden="true">
              <i class="fas fa-leaf"></i>
            </div>
            <div>
              <span class="navbar__logo-text">NutriNesia</span>
              <span class="navbar__logo-tagline">Smart Nutrition Platform</span>
            </div>
          </a>

          <div class="navbar__nav" role="menubar">
            ${navLinksHTML}
          </div>

          <div class="navbar__actions">
            <a href="${loginHref}" class="btn btn--outline btn--sm">
              <i class="fas fa-sign-in-alt" aria-hidden="true"></i>
              Masuk
            </a>
            <a href="${registerHref}" class="btn btn--primary btn--sm">
              Daftar
            </a>
            <a href="${profileHref}" class="btn btn--outline btn--sm" id="profile-nav-btn" style="display:none;">
              <i class="fas fa-user-circle" aria-hidden="true"></i>
              Profil
            </a>
          </div>

          <button class="navbar__hamburger" id="hamburger-btn" aria-label="Buka menu navigasi" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div class="navbar__mobile-menu" id="mobile-menu" role="dialog" aria-label="Menu mobile">
        <nav class="navbar__mobile-nav">
          ${mobileNavLinksHTML}
        </nav>
        <div class="navbar__mobile-actions">
          <a href="${loginHref}" class="btn btn--outline" style="width:100%; justify-content:center;">
            <i class="fas fa-sign-in-alt" aria-hidden="true"></i>
            Masuk
          </a>
          <a href="${registerHref}" class="btn btn--primary" style="width:100%; justify-content:center;">
            Daftar Gratis
          </a>
        </div>
      </div>
    `;
  }

  /* ---- Footer HTML ---- */
  function createFooterHTML(basePath) {
    const homeHref = basePath + 'index.html';

    return `
      <footer class="footer" role="contentinfo">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <div class="navbar__logo" style="margin-bottom: var(--space-4);">
                <div class="navbar__logo-icon" aria-hidden="true">
                  <i class="fas fa-leaf"></i>
                </div>
                <div>
                  <span class="navbar__logo-text" style="color: var(--color-warm-white);">NutriNesia</span>
                </div>
              </div>
              <p class="footer__brand-desc">
                Platform gizi digital terpercaya untuk membantu masyarakat Indonesia hidup lebih sehat melalui edukasi dan solusi nutrisi yang interaktif.
              </p>
              <div class="footer__social-links">
                <a href="#" class="footer__social-link" aria-label="Instagram NutriNesia">
                  <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="#" class="footer__social-link" aria-label="Twitter NutriNesia">
                  <i class="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#" class="footer__social-link" aria-label="YouTube NutriNesia">
                  <i class="fab fa-youtube" aria-hidden="true"></i>
                </a>
                <a href="#" class="footer__social-link" aria-label="Facebook NutriNesia">
                  <i class="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 class="footer__col-title">Fitur Utama</h3>
              <ul class="footer__links">
                <li><a href="${basePath}pages/nutrition-checker/index.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Nutrition Checker</a></li>
                <li><a href="${basePath}pages/food-scanner/index.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Food Scanner</a></li>
                <li><a href="${basePath}pages/meal-planner/index.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Meal Planner</a></li>
                <li><a href="${basePath}pages/habit-tracker/index.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Habit Tracker</a></li>
                <li><a href="${basePath}pages/myth-facts/index.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Mitos & Fakta</a></li>
              </ul>
            </div>

            <div>
              <h3 class="footer__col-title">Edukasi</h3>
              <ul class="footer__links">
                <li><a href="${basePath}pages/stunting/index.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Stunting Awareness</a></li>
                <li><a href="${homeHref}#healthy-plate" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Isi Piringku</a></li>
                <li><a href="${homeHref}#testimonials" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Tips Ahli Gizi</a></li>
                <li><a href="${homeHref}#about" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Tentang Kami</a></li>
              </ul>
            </div>

            <div>
              <h3 class="footer__col-title">Akun</h3>
              <ul class="footer__links">
                <li><a href="${basePath}pages/auth/register.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Daftar</a></li>
                <li><a href="${basePath}pages/auth/login.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Masuk</a></li>
                <li><a href="${basePath}pages/profile/index.html" class="footer__link"><i class="fas fa-chevron-right" aria-hidden="true"></i> Profil Saya</a></li>
              </ul>
            </div>
          </div>

          <div class="footer__bottom">
            <p class="footer__copyright">
              &copy; 2025 NutriNesia. Dibuat dengan semangat untuk Indonesia yang lebih sehat.
            </p>
            <p class="footer__copyright">
              Informasi gizi bersifat edukatif, bukan pengganti saran dokter.
            </p>
          </div>
        </div>
      </footer>
    `;
  }

  /* ---- Inject Components ---- */
  function injectComponents() {
    const basePath = getRelativePath();

    const navbarContainer = document.getElementById('navbar-placeholder');
    if (navbarContainer) {
      navbarContainer.innerHTML = createNavbarHTML(basePath);
    }

    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
      footerContainer.innerHTML = createFooterHTML(basePath);
    }

    initNavbarBehavior();
  }

  /* ---- Navbar Scroll + Hamburger Behavior ---- */
  function initNavbarBehavior() {
    const navbar = document.getElementById('main-navbar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navbar) return;

    // Scroll effect
    function handleNavbarScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // Hamburger toggle
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on outside click
      document.addEventListener('click', function (event) {
        if (!navbar.contains(event.target) && !mobileMenu.contains(event.target)) {
          mobileMenu.classList.remove('open');
          hamburgerBtn.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* ---- Scroll Reveal Animations ---- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(function () {
            entry.target.classList.add('revealed');
          }, parseInt(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---- Init on DOM Ready ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectComponents();
      initScrollReveal();
    });
  } else {
    injectComponents();
    initScrollReveal();
  }

})();