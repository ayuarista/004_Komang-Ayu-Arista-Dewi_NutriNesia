/* ============================================
   NutriNesia - Konsultasi Page Logic
   Frontend-only: search filter, category filter & card interactions
   ============================================ */

(function () {
  'use strict';

  var currentFilter = null;

  /* ---- Filter Cards ---- */
  function filterCards() {
    var searchInput = document.getElementById('konsultasi-search');
    var grid = document.getElementById('konsultasi-catalog-grid');
    if (!searchInput || !grid) return;

    var cards = grid.querySelectorAll('.konsultasi-card');
    var query = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var title = card.querySelector('.konsultasi-card-title');
      var doctor = card.querySelector('.konsultasi-doctor-name');
      var tag = card.querySelector('.konsultasi-tag');

      var titleText = title ? title.textContent.toLowerCase() : '';
      var doctorText = doctor ? doctor.textContent.toLowerCase() : '';
      var tagText = tag ? tag.textContent.toLowerCase() : '';
      var tagClass = tag ? tag.className : '';

      // Search match
      var searchMatch = !query || titleText.indexOf(query) !== -1 ||
        doctorText.indexOf(query) !== -1 || tagText.indexOf(query) !== -1;

      // Category filter match
      var categoryMatch = !currentFilter || currentFilter === 'all' || tagClass.indexOf('konsultasi-tag-' + currentFilter) !== -1;

      var shouldShow = searchMatch && categoryMatch;
      card.style.display = shouldShow ? '' : 'none';
      if (shouldShow) visibleCount++;
    });

    // Update empty state
    updateEmptyState(grid, visibleCount, query);
  }

  /* ---- Empty State ---- */
  function updateEmptyState(grid, visibleCount, query) {
    var existingEmpty = grid.querySelector('.konsultasi-empty-state');
    
    if (visibleCount === 0) {
      if (!existingEmpty) {
        var emptyState = document.createElement('div');
        emptyState.className = 'konsultasi-empty-state';
        emptyState.innerHTML = `
          <span class="material-symbols-outlined">search_off</span>
          <p class="konsultasi-empty-title">Pencarian tidak ditemukan</p>
          <p class="konsultasi-empty-desc">Coba gunakan kata kunci lain atau ubah filter kategori</p>
        `;
        grid.appendChild(emptyState);
      }
    } else if (existingEmpty) {
      existingEmpty.remove();
    }
  }

  /* ---- Search Filter ---- */
  function initSearchFilter() {
    var searchInput = document.getElementById('konsultasi-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', filterCards);
  }

  /* ---- Category Filter Chips ---- */
  function initCategoryFilter() {
    var categoryContainer = document.getElementById('konsultasi-categories');
    if (!categoryContainer) return;

    var chips = categoryContainer.querySelectorAll('.konsultasi-category-chip');
    
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        // Update active state
        chips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        // Filter cards
        currentFilter = this.getAttribute('data-filter');
        filterCards();
      });
    });
  }

  /* ---- Card Click → konsultasi-detail.html ---- */
  function initCardLinks() {
    var grid = document.getElementById('konsultasi-catalog-grid');
    if (!grid) return;

    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.konsultasi-card');
      if (card) {
        window.location.href = 'konsultasi-detail.html';
      }
    });
  }

  /* ---- Init ---- */
  function init() {
    initSearchFilter();
    initCategoryFilter();
    initCardLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
