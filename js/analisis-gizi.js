(function () {
  'use strict';

  // Constants
  const HISTORY_KEY = 'nutrinesia-scan-history';
  const DEFAULT_HISTORY = [
    {
      id: 1,
      name: 'Salad Salmon Avocado',
      score: 94,
      calories: 345,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      name: 'Gado-gado Jakarta',
      score: 86,
      calories: 420,
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 14400000).toISOString()
    },
    {
      id: 3,
      name: 'Smoothie Bowl Berry',
      score: 92,
      calories: 280,
      imageUrl: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 4,
      name: 'Ayam Bakar Taliwang',
      score: 78,
      calories: 520,
      imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  ];

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
