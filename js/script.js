/* ============================================
   NutriNesia - Nutrition Checker Script
   Formula: Harris-Benedict BMR + Activity Factor
   ============================================ */

(function ($) {
  'use strict';

  /* ---- State ---- */
  var selectedGoal = 'maintain';
  var selectedActivity = 'sedentary';

  /* ---- Activity Multipliers ---- */
  var activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };

  /* ---- Goal Calorie Adjustments ---- */
  var goalAdjustments = {
    maintain: 0,
    lose: -500,
    gain: 300
  };

  /* ---- Goal Selector Behavior ---- */
  function initGoalSelector() {
    var goalOptions = document.querySelectorAll('.goal-option');
    var goalInput = document.getElementById('goal-input');

    goalOptions.forEach(function (option) {
      function selectGoal() {
        goalOptions.forEach(function (opt) {
          opt.classList.remove('selected');
          opt.setAttribute('aria-checked', 'false');
        });
        option.classList.add('selected');
        option.setAttribute('aria-checked', 'true');
        selectedGoal = option.getAttribute('data-goal');
        goalInput.value = selectedGoal;
      }

      option.addEventListener('click', selectGoal);
      option.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectGoal();
        }
      });
    });
  }

  /* ---- Activity Selector Behavior ---- */
  function initActivitySelector() {
    var activityOptions = document.querySelectorAll('.activity-option');
    var activityInput = document.getElementById('activity-input');

    activityOptions.forEach(function (option) {
      function selectActivity() {
        activityOptions.forEach(function (opt) {
          opt.classList.remove('selected');
          opt.setAttribute('aria-checked', 'false');
        });
        option.classList.add('selected');
        option.setAttribute('aria-checked', 'true');
        selectedActivity = option.getAttribute('data-activity');
        activityInput.value = selectedActivity;
      }

      option.addEventListener('click', selectActivity);
      option.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectActivity();
        }
      });
    });
  }

  /* ---- BMI Calculation & Classification ---- */
  function calculateBMI(weightKg, heightCm) {
    var heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  }

  function getBMICategory(bmi) {
    if (bmi < 18.5) return { label: 'Kurus (Underweight)', class: 'badge--orange', warning: true };
    if (bmi < 25.0) return { label: 'Normal', class: 'badge--green', warning: false };
    if (bmi < 30.0) return { label: 'Kelebihan Berat (Overweight)', class: 'badge--orange', warning: true };
    return { label: 'Obesitas', class: 'badge--red', warning: true };
  }

  /* ---- BMR using Harris-Benedict Formula ---- */
  function calculateBMR(gender, weightKg, heightCm, age) {
    if (gender === 'male') {
      return 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    }
    return 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
  }

  /* ---- Macro Calculation ---- */
  function calculateMacros(totalCalories, goal) {
    var proteinRatio = goal === 'gain' ? 0.30 : 0.25;
    var carbRatio = goal === 'lose' ? 0.40 : 0.50;
    var fatRatio = 1 - proteinRatio - carbRatio;

    var proteinCalories = totalCalories * proteinRatio;
    var carbCalories = totalCalories * carbRatio;
    var fatCalories = totalCalories * fatRatio;

    return {
      protein: Math.round(proteinCalories / 4),
      carb: Math.round(carbCalories / 4),
      fat: Math.round(fatCalories / 9),
      proteinPct: Math.round(proteinRatio * 100),
      carbPct: Math.round(carbRatio * 100),
      fatPct: Math.round(fatRatio * 100)
    };
  }

  /* ---- Water Recommendation ---- */
  function calculateWaterLiters(weightKg, activity) {
    var baseWater = weightKg * 0.033;
    var activityBonus = { sedentary: 0, light: 0.3, moderate: 0.5, active: 0.7 };
    return (baseWater + (activityBonus[activity] || 0)).toFixed(1);
  }

  /* ---- Generate Recommendations ---- */
  function generateRecommendations(goal, bmi, activity) {
    var recommendations = [];

    if (goal === 'lose') {
      recommendations.push('Kurangi konsumsi gula dan minuman manis, ganti dengan air putih atau infused water.');
      recommendations.push('Perbanyak sayuran hijau yang kaya serat untuk membuat kenyang lebih lama.');
      recommendations.push('Pilih metode memasak kukus, rebus, atau panggang daripada digoreng.');
    } else if (goal === 'gain') {
      recommendations.push('Konsumsi protein berkualitas tinggi seperti ayam, ikan, telur, tempe, atau tahu.');
      recommendations.push('Makan 5-6 kali sehari dalam porsi lebih kecil untuk memudahkan penyerapan nutrisi.');
      recommendations.push('Sertakan karbohidrat kompleks seperti nasi merah, ubi, dan oatmeal dalam menu harian.');
    } else {
      recommendations.push('Pertahankan pola makan 3 kali sehari dengan porsi seimbang sesuai Isi Piringku.');
      recommendations.push('Variasikan sumber protein: kombinasikan nabati (tempe/tahu) dan hewani (ikan/ayam).');
    }

    if (bmi < 18.5) {
      recommendations.push('BMI-mu tergolong kurus. Tingkatkan asupan makanan bergizi padat kalori secara bertahap.');
    } else if (bmi >= 25) {
      recommendations.push('Perhatikan ukuran porsi dan kurangi camilan tinggi kalori di antara waktu makan.');
    }

    if (activity === 'sedentary') {
      recommendations.push('Coba mulai dengan berjalan kaki 30 menit sehari untuk meningkatkan metabolisme.');
    }

    return recommendations;
  }

  /* ---- Animate Number ---- */
  function animateNumber(element, targetValue, duration) {
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(targetValue * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ---- Animate Progress Bar ---- */
  function animateProgressBar(barElement, targetWidth, delay) {
    delay = delay || 0;
    setTimeout(function () {
      barElement.style.width = targetWidth + '%';
    }, delay);
  }

  /* ---- Render Results ---- */
  function renderResults(data) {
    var emptyState = document.getElementById('result-empty-state');
    var resultContent = document.getElementById('result-content-area');

    if (emptyState) emptyState.style.display = 'none';
    if (resultContent) {
      resultContent.classList.add('visible');
    }

    // Calories
    var calorieEl = document.getElementById('result-calorie');
    if (calorieEl) animateNumber(calorieEl, data.totalCalories, 1200);

    // BMI Badge
    var bmiEl = document.getElementById('result-bmi-badge');
    if (bmiEl) {
      bmiEl.textContent = 'BMI: ' + data.bmi.toFixed(1) + ' - ' + data.bmiCategory.label;
      bmiEl.className = 'result-header__bmi-badge badge ' + data.bmiCategory.class;
    }

    // Macros
    var proteinEl = document.getElementById('result-protein');
    var carbEl = document.getElementById('result-carb');
    var fatEl = document.getElementById('result-fat');

    if (proteinEl) animateNumber(proteinEl, data.macros.protein, 1000);
    if (carbEl) animateNumber(carbEl, data.macros.carb, 1000);
    if (fatEl) animateNumber(fatEl, data.macros.fat, 1000);

    // Percentage labels
    var proteinPctEl = document.getElementById('result-protein-pct');
    var carbPctEl = document.getElementById('result-carb-pct');
    var fatPctEl = document.getElementById('result-fat-pct');

    if (proteinPctEl) proteinPctEl.textContent = data.macros.proteinPct + '%';
    if (carbPctEl) carbPctEl.textContent = data.macros.carbPct + '%';
    if (fatPctEl) fatPctEl.textContent = data.macros.fatPct + '%';

    // Progress bars
    var proteinBar = document.getElementById('protein-bar');
    var carbBar = document.getElementById('carb-bar');
    var fatBar = document.getElementById('fat-bar');

    if (proteinBar) animateProgressBar(proteinBar, data.macros.proteinPct, 400);
    if (carbBar) animateProgressBar(carbBar, data.macros.carbPct, 600);
    if (fatBar) animateProgressBar(fatBar, data.macros.fatPct, 800);

    // Water
    var waterEl = document.getElementById('result-water');
    if (waterEl) waterEl.textContent = data.water + ' L';

    // Warning
    var warningEl = document.getElementById('result-warning');
    var warningTextEl = document.getElementById('result-warning-text');
    if (data.bmiCategory.warning && warningEl && warningTextEl) {
      var warningMsg = '';
      if (data.bmi < 18.5) {
        warningMsg = 'Berat badanmu tergolong kurus (BMI: ' + data.bmi.toFixed(1) + '). Konsultasikan dengan dokter atau ahli gizi untuk mendapatkan program penambahan berat badan yang sehat.';
      } else if (data.bmi >= 30) {
        warningMsg = 'BMI-mu menunjukkan obesitas (' + data.bmi.toFixed(1) + '). Sangat disarankan untuk berkonsultasi dengan dokter sebelum memulai program diet.';
      } else {
        warningMsg = 'Berat badanmu sedikit di atas normal (BMI: ' + data.bmi.toFixed(1) + '). Program penurunan berat badan yang sehat dapat membantu mencapai BMI ideal.';
      }
      warningTextEl.textContent = warningMsg;
      warningEl.classList.add('visible');
    } else if (warningEl) {
      warningEl.classList.remove('visible');
    }

    // Recommendations
    var recList = document.getElementById('result-recommendations-list');
    if (recList) {
      recList.innerHTML = '';
      data.recommendations.forEach(function (rec) {
        var li = document.createElement('li');
        li.className = 'result-recommendation-item';
        li.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i><span>' + rec + '</span>';
        recList.appendChild(li);
      });
    }

    // Scroll to result on mobile
    if (window.innerWidth <= 960) {
      var resultPanel = document.getElementById('result-panel');
      if (resultPanel) {
        var navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
        var top = resultPanel.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    }
  }

  /* ---- Form Validation ---- */
  function validateForm() {
    var gender = document.getElementById('gender-select').value;
    var age = parseInt(document.getElementById('age-input').value);
    var height = parseInt(document.getElementById('height-input').value);
    var weight = parseInt(document.getElementById('weight-input').value);

    if (!gender) { alert('Pilih jenis kelamin terlebih dahulu.'); return false; }
    if (!age || age < 10 || age > 100) { alert('Masukkan usia yang valid (10-100 tahun).'); return false; }
    if (!height || height < 100 || height > 250) { alert('Masukkan tinggi badan yang valid (100-250 cm).'); return false; }
    if (!weight || weight < 20 || weight > 300) { alert('Masukkan berat badan yang valid (20-300 kg).'); return false; }

    return { gender, age, height, weight };
  }

  /* ---- Form Submit ---- */
  function initFormSubmit() {
    var form = document.getElementById('nutrition-checker-form');
    var submitBtn = document.getElementById('checker-submit-btn');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var inputData = validateForm();
      if (!inputData) return;

      // Button loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Menghitung...';

      // Simulate processing delay for UX
      setTimeout(function () {
        var bmr = calculateBMR(inputData.gender, inputData.weight, inputData.height, inputData.age);
        var tdee = bmr * activityMultipliers[selectedActivity];
        var totalCalories = Math.round(tdee + goalAdjustments[selectedGoal]);
        var bmi = calculateBMI(inputData.weight, inputData.height);
        var bmiCategory = getBMICategory(bmi);
        var macros = calculateMacros(totalCalories, selectedGoal);
        var water = calculateWaterLiters(inputData.weight, selectedActivity);
        var recommendations = generateRecommendations(selectedGoal, bmi, selectedActivity);

        renderResults({
          totalCalories: totalCalories,
          bmi: bmi,
          bmiCategory: bmiCategory,
          macros: macros,
          water: water,
          recommendations: recommendations
        });

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-calculator" aria-hidden="true"></i> Hitung Kebutuhan Gizi Saya';
      }, 900);
    });
  }

  /* ---- DOM Ready ---- */
  $(document).ready(function () {
    initGoalSelector();
    initActivitySelector();
    initFormSubmit();
  });

})(jQuery);