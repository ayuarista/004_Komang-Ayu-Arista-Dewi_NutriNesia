(function () {
  'use strict';

  const HISTORY_KEY = 'nutrinesia-scan-history';

  function initScannerResult() {
    var storedResult = null;
    try {
      storedResult = JSON.parse(localStorage.getItem('nutrinesia-analysis-result') || 'null');
    } catch (error) {
      storedResult = null;
    }

    if (storedResult) {
      renderResult(storedResult);
    }
    
    renderHistory();
  }

  function renderResult(result) {
    var scoreValue = document.getElementById('scoreValue');
    var scoreBarFill = document.getElementById('scoreBarFill');
    var scoreLabel = document.getElementById('scoreLabel');

    var macroKalori = document.getElementById('macroKalori');
    var macroProtein = document.getElementById('macroProtein');
    var macroLemak = document.getElementById('macroLemak');
    var macroGula = document.getElementById('macroGula');

    var healthierChoices = document.getElementById('healthierChoices');

    if (scoreValue && scoreBarFill && scoreLabel) {
      const score = result.score;
      const scoreClass = score >= 80 ? 'high' : (score >= 60 ? 'med' : 'low');
      
      scoreValue.textContent = String(score);
      scoreValue.className = 'score-value ' + scoreClass;
      
      scoreBarFill.style.width = String(score) + '%';
      scoreBarFill.className = 'score-bar-fill ' + scoreClass;
      
      scoreLabel.textContent = result.scoreLabel;
      scoreLabel.style.color = 'var(--color-on-surface)';
      scoreLabel.style.fontStyle = 'normal';
    }

    if (macroKalori && macroProtein && macroLemak && macroGula) {
      macroKalori.textContent = String(result.macros.kalori) + ' kkal';
      macroProtein.textContent = String(result.macros.protein) + ' g';
      macroLemak.textContent = String(result.macros.lemak) + ' g';
      macroGula.textContent = String(result.macros.gula) + ' g';

      [macroKalori, macroProtein, macroLemak, macroGula].forEach(el => {
        el.classList.remove('macro-value-empty');
        el.style.color = 'var(--color-on-surface)';
        el.style.fontWeight = '800';
      });
    }

    if (healthierChoices) {
      healthierChoices.innerHTML = '';
      healthierChoices.className = 'alternative-list-active';
      result.healthierChoices.forEach(function (choice) {
        var item = document.createElement('div');
        item.className = 'alternative-item';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = 'var(--space-3)';
        item.style.marginBottom = 'var(--space-3)';
        item.style.fontSize = '14px';
        item.innerHTML = '<span class="material-symbols-outlined" style="color:var(--color-secondary); font-size:20px;">check_circle</span><span>' + choice + '</span>';
        healthierChoices.appendChild(item);
      });
    }
  }

  function renderHistory() {
    const historyGrid = document.getElementById('historyGrid');
    if (!historyGrid) return;

    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    historyGrid.innerHTML = '';

    if (history.length === 0) {
      historyGrid.innerHTML = '<p style="opacity:0.5; grid-column: 1/-1; text-align:center; padding: var(--space-8);">Belum ada riwayat scan.</p>';
      return;
    }

    history.forEach(item => {
      const scoreClass = item.score >= 80 ? 'high' : (item.score >= 60 ? 'med' : 'low');
      const timeAgo = formatTimeAgo(item.timestamp);
      
      const itemEl = document.createElement('div');
      itemEl.className = 'history-item';
      itemEl.onclick = () => {
          window.location.href = 'analisis-gizi-result.html';
      };
      itemEl.innerHTML = `
        <div class="history-image-wrap">
          <img src="${item.imageUrl}" alt="${item.name}" class="history-image">
          <div class="history-score ${scoreClass}">${item.score}</div>
        </div>
        <div class="history-info">
          <h4 class="history-title">${item.name}</h4>
          <p class="history-meta">${item.calories} kkal • ${timeAgo}</p>
        </div>
      `;
      historyGrid.appendChild(itemEl);
    });
  }

  function formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + ' menit lalu';
    if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + ' jam lalu';
    if (diffInSeconds < 172800) return 'Kemarin';
    return Math.floor(diffInSeconds / 86400) + ' hari lalu';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScannerResult);
  } else {
    initScannerResult();
  }
})();
