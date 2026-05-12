/* ============================================
   NutriNesia - Global JavaScript
   Shared: Navbar behavior, scroll reveal, 
   smooth scroll, active nav highlighting
   ============================================ */

(function () {
  'use strict';

  /* ---- Navbar Scroll Effect ---- */
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---- Mobile Drawer Menu ---- */
  function initMobileMenu() {
    var hamburgerButton = document.getElementById('navbar-hamburger');
    var mobileMenu = document.getElementById('navbar-mobile-menu');
    var mobileOverlay = document.getElementById('navbar-mobile-overlay');
    var closeButton = document.getElementById('navbar-mobile-close');

    if (!hamburgerButton || !mobileMenu) return;

    function openDrawer() {
      mobileMenu.classList.add('open');
      if (mobileOverlay) mobileOverlay.classList.add('open');
      hamburgerButton.classList.add('open');
      hamburgerButton.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileMenu.classList.remove('open');
      if (mobileOverlay) mobileOverlay.classList.remove('open');
      hamburgerButton.classList.remove('open');
      hamburgerButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburgerButton.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mobileMenu.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeButton) closeButton.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeDrawer();
      }
    });

    /* Close on nav link click */
    var mobileLinks = mobileMenu.querySelectorAll('.navbar-mobile-link, .navbar-mobile-sub-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    /* Reset sub-menus when drawer closes */
    function resetSubMenus() {
      mobileMenu.querySelectorAll('.navbar-mobile-sub-links').forEach(function (el) {
        el.classList.remove('open');
      });
      mobileMenu.querySelectorAll('.navbar-mobile-sub-trigger').forEach(function (el) {
        el.classList.remove('open');
      });
    }

    var origClose = closeDrawer;
    closeDrawer = function () {
      origClose();
      resetSubMenus();
    };
  }

  /* ---- Mobile Layanan Sub-Accordion ---- */
  function initMobileSubMenus() {
    var triggers = document.querySelectorAll('.navbar-mobile-sub-trigger');
    triggers.forEach(function (trigger) {
      var targetId = trigger.id.replace('-trigger', '-links');
      var panel = document.getElementById(targetId);
      if (!panel) return;

      trigger.addEventListener('click', function () {
        var isOpen = panel.classList.contains('open');
        /* close all others */
        document.querySelectorAll('.navbar-mobile-sub-links').forEach(function (el) { el.classList.remove('open'); });
        document.querySelectorAll('.navbar-mobile-sub-trigger').forEach(function (el) { el.classList.remove('open'); });
        if (!isOpen) {
          panel.classList.add('open');
          trigger.classList.add('open');
        }
      });
    });
  }

  /* ---- Scroll Reveal Animation ---- */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    var observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(function () {
            entry.target.classList.add('revealed');
          }, parseInt(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          event.preventDefault();
          var navbarHeight = 72;
          var offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---- Initialize Everything on DOM Ready ---- */
  function initGlobal() {
    initNavbarScroll();
    initMobileMenu();
    initMobileSubMenus();
    initScrollReveal();
    initSmoothScroll();
    initActiveLinks();
  }

  /* ---- Active Navigation Link Highlight ---- */
  function initActiveLinks() {
    var currentPath = window.location.pathname;
    // Handle root path
    if (currentPath === '/' || currentPath.endsWith('index.html')) {
      currentPath = 'index.html';
    }

    var allLinks = document.querySelectorAll('.navbar-nav-link, .navbar-dropdown-item, .navbar-mobile-link');
    
    allLinks.forEach(function(link) {
      var linkHref = link.getAttribute('href');
      if (!linkHref) return;

      // Remove leading slashes/dots for comparison if necessary
      var cleanHref = linkHref.replace(/^(\.\.\/|\.\/)/, '');
      var cleanPath = currentPath.replace(/^(\/)/, '');

      if (cleanPath.endsWith(cleanHref)) {
        link.classList.add('active');

        // If it's a dropdown item, highlight the parent trigger
        var dropdownContainer = link.closest('.navbar-dropdown-container');
        if (dropdownContainer) {
          var trigger = dropdownContainer.querySelector('.navbar-dropdown-trigger');
          if (trigger) trigger.classList.add('active');
        }
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobal);
  } else {
    initGlobal();
  }

})();
