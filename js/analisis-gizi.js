(function () {
  'use strict';

  // Constants
  const HISTORY_KEY = 'nutrinesia-scan-history';


  function initScanner() {
    var dropzone = document.getElementById('scannerDropzone');
    var uploadBtn = document.getElementById('uploadBtn');
    var analyzeBtn = document.getElementById('analyzeBtn');
    var scannerPreview = document.getElementById('scannerPreview');
    var scannerLaser = document.getElementById('scannerLaser');

    // Default image for simulation
    var defaultImageUrl = "../images/babi-guling.png";

    if (uploadBtn && analyzeBtn) {
      uploadBtn.addEventListener('click', function () {
        showDefaultImage();
      });

      analyzeBtn.addEventListener('click', function () {
        startAnalysis();
      });
    }

    if (dropzone) {
      dropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', function (e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        showDefaultImage();
      });
    }

    function showDefaultImage() {
      var uploadPlaceholder = document.getElementById('uploadPlaceholder');
      if (scannerPreview) {
        scannerPreview.src = defaultImageUrl;
        scannerPreview.style.display = "block";
      }
      if (uploadPlaceholder) {
        uploadPlaceholder.style.display = 'none';
      }
      uploadBtn.style.display = 'none';
      analyzeBtn.style.display = 'flex';
    }

    function startAnalysis() {
      // Clear analyze button
      analyzeBtn.style.display = 'none';
      
      // Show laser for 1 second then switch to full-page loading
      if (scannerLaser) {
        scannerLaser.style.display = "block";
        scannerLaser.style.animation = "scanLaser 1.5s infinite linear alternate";
      }

      setTimeout(function() {
        var loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'ai-loading-overlay';
        loadingOverlay.innerHTML = `
          <div class="ai-loading-wrapper">
            <img src="../images/nutribot.png" alt="NutriBot" class="ai-loading-bot-img">
            <div class="ai-loading-spinner-ring"></div>
          </div>
          <h2 class="ai-loading-text">AI Sedang Menganalisis</h2>
          <p class="ai-loading-subtext">Mengidentifikasi jenis makanan dan kandungan nutrisi...</p>
        `;
        document.body.appendChild(loadingOverlay);

        var scanResult = {
          score: 88,
          scoreLabel: 'Sangat Baik',
          macros: { kalori: 485, protein: 28, lemak: 14, karbo: 52 },
          foodName: 'Salmon Salad Special',
          imageUrl: defaultImageUrl,
          timestamp: new Date().toISOString()
        };

        localStorage.setItem('nutrinesia-analysis-result', JSON.stringify(scanResult));
        saveToHistory(scanResult);

        setTimeout(function () {
          window.location.href = 'analisis-gizi-result.html';
        }, 2000);
      }, 1000);
    }
  }

  function getHistory() {
    let history = localStorage.getItem(HISTORY_KEY);
    if (!history) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(DEFAULT_HISTORY));
      return DEFAULT_HISTORY;
    }
    return JSON.parse(history);
  }

  function saveToHistory(result) {
    let history = getHistory();
    var historyItem = {
      id: Date.now(),
      name: result.foodName,
      score: result.score,
      calories: result.macros.kalori,
      imageUrl: result.imageUrl,
      timestamp: result.timestamp
    };

    history.unshift(historyItem);
    if (history.length > 10) history = history.slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScanner);
  } else {
    initScanner();
  }
})();
