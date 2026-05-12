/* ============================================
   NutriNesia – Profile Page Logic
   ============================================ */

(function () {
  'use strict';

  function initProfile() {
    // Edit Profile Button
    var editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
      editBtn.addEventListener('click', function () {
        alert('Fitur edit profil akan segera hadir!');
      });
    }

    // Logout Button
    var logoutBtn = document.querySelector('.pf-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        if (confirm('Apakah Anda yakin ingin keluar?')) {
          window.location.href = '../index.html';
        }
      });
    }

    // Consultation Button
    var consultBtn = document.querySelector('.pf-consult-btn');
    if (consultBtn) {
      consultBtn.addEventListener('click', function () {
        window.location.href = 'konsultasi.html';
      });
    }

    // Activity items — make clickable
    var actItems = document.querySelectorAll('.pf-act-item');
    actItems.forEach(function (item) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        alert('Detail aktivitas akan segera hadir!');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile);
  } else {
    initProfile();
  }
})();
