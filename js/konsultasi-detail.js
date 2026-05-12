/* ============================================
   NutriNesia - Konsultasi Detail Page Logic
   Day selector, time slot selector, and reservation
   trigger that uses the shared reservation modal.
   ============================================ */

(function () {
  'use strict';

  /* ---- Day Selector ---- */
  function initDaySelector() {
    var days = document.querySelectorAll('.kd-day:not(.disabled)');
    days.forEach(function (day) {
      day.addEventListener('click', function () {
        days.forEach(function (d) { d.classList.remove('active'); });
        day.classList.add('active');
      });
    });
  }

  /* ---- Time Slot Selector ---- */
  function initTimeslots() {
    var slots = document.querySelectorAll('.kd-timeslot');
    slots.forEach(function (slot) {
      slot.addEventListener('click', function () {
        slots.forEach(function (s) { s.classList.remove('active'); });
        slot.classList.add('active');
      });
    });
  }

  /* ---- Ambil Nomor Antrean → open reservation modal ---- */
  function initReservationButton() {
    var btn = document.getElementById('kd-reservation-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!window.ReservationModal) return;

      // Gather currently selected day & time for context
      var activeDay = document.querySelector('.kd-day.active');
      var activeSlot = document.querySelector('.kd-timeslot.active');

      var dayLabel = activeDay ? activeDay.querySelector('.kd-day-label') : null;
      var dayNum = activeDay ? activeDay.querySelector('.kd-day-num') : null;
      var dayText = dayLabel && dayNum
        ? (dayLabel.textContent.trim() + ', ' + dayNum.textContent.trim() + ' Okt 2024')
        : 'Senin, 21 Okt 2024';

      var timeText = activeSlot ? activeSlot.textContent.trim().split(' - ')[0] + ' WIB' : '09:00 WIB';

      window.ReservationModal.open({
        topic: 'Diet Sehat untuk Mahasiswa',
        doctor: 'Sarah Az-Zahra, S.Gz',
        schedule: dayText + ' &bull; ' + timeText
      });
    });
  }

  function init() {
    initDaySelector();
    initTimeslots();
    initReservationButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
