/* Resep Sehat — List Page */
(function () {
  'use strict';

  // Category filter (visual only, frontend sim)
  var categoryBtns = document.querySelectorAll('.rs-category-btn');
  categoryBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      categoryBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // Search (visual): Enter triggers alert only as placeholder
  var searchInput = document.querySelector('.rs-search input');
  var searchBtn = document.querySelector('.rs-search-btn');
  function doSearch() {
    var v = (searchInput && searchInput.value || '').trim();
    if (!v) { searchInput && searchInput.focus(); return; }
    console.log('[resep-sehat] search:', v);
  }
  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); doSearch(); }
    });
  }

  // Animate NutriScore bar on load
  var scoreFill = document.querySelector('.rs-score-bar-fill');
  if (scoreFill) {
    var target = scoreFill.getAttribute('data-progress') || '85';
    scoreFill.style.width = '0%';
    setTimeout(function () { scoreFill.style.transition = 'width 1s ease'; scoreFill.style.width = target + '%'; }, 120);
  }
})();
