/* ============================================
   NutriNesia - Reservation Success Modal
   Shared component for konsultasi & konsultasi-detail
   ============================================ */

(function () {
  'use strict';

  // Pool of dummy queue numbers and topics for variety
  var queueNumbers = ['A-24', 'A-25', 'A-26', 'B-12', 'B-13', 'C-08'];
  var waitTimes = ['15 Menit', '20 Menit', '25 Menit', '30 Menit', '35 Menit'];

  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Build modal markup once and inject into body
  function buildModal() {
    if (document.getElementById('reservation-modal-overlay')) return;

    var overlayEl = document.createElement('div');
    overlayEl.className = 'reservation-modal-overlay';
    overlayEl.id = 'reservation-modal-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.setAttribute('aria-labelledby', 'reservation-modal-title');

    overlayEl.innerHTML = [
      '<div class="reservation-modal" role="document">',
      '  <div class="reservation-modal-header">',
      '    <button class="reservation-modal-close" id="reservation-modal-close" aria-label="Tutup">',
      '      <span class="material-symbols-outlined">close</span>',
      '    </button>',
      '    <div class="reservation-success-icon">',
      '      <span class="material-symbols-outlined">check</span>',
      '    </div>',
      '    <h2 class="reservation-modal-title" id="reservation-modal-title">Reservasi Berhasil!</h2>',
      '    <p class="reservation-modal-subtitle">Sesi konsultasi Anda telah dijadwalkan secara sistematis.</p>',
      '  </div>',
      '  <div class="reservation-modal-body">',
      '    <div class="reservation-queue-grid">',
      '      <div class="reservation-queue-card">',
      '        <div class="reservation-queue-label">Nomor Antrean</div>',
      '        <div class="reservation-queue-number" id="reservation-queue-number">A-24</div>',
      '      </div>',
      '      <div class="reservation-status-card">',
      '        <div class="reservation-status-row">',
      '          <span class="reservation-status-dot"></span>',
      '          Menunggu Antrean',
      '        </div>',
      '        <div class="reservation-status-info">Estimasi Tunggu: <strong id="reservation-wait-time">25 Menit</strong></div>',
      '      </div>',
      '    </div>',
      '    <div class="reservation-detail-list">',
      '      <div class="reservation-detail-row">',
      '        <div class="reservation-detail-label">',
      '          <span class="material-symbols-outlined">folder</span>Topik Sesi',
      '        </div>',
      '        <div class="reservation-detail-value" id="reservation-topic">Diet Manajemen Diabetes</div>',
      '      </div>',
      '      <div class="reservation-detail-row">',
      '        <div class="reservation-detail-label">',
      '          <span class="material-symbols-outlined">medical_services</span>Nutrisiwan',
      '        </div>',
      '        <div class="reservation-detail-value" id="reservation-doctor">Dr. Sarah Wijaya, Sp.GK</div>',
      '      </div>',
      '      <div class="reservation-detail-row">',
      '        <div class="reservation-detail-label">',
      '          <span class="material-symbols-outlined">calendar_month</span>Waktu &amp; Tanggal',
      '        </div>',
      '        <div class="reservation-detail-value" id="reservation-schedule">Senin, 14 Okt 2024 &bull; 14:00 WIB</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="reservation-modal-actions">',
      '    <button class="reservation-action-primary" id="reservation-action-status">Cek Status Antrean</button>',
      '    <button class="reservation-action-disabled" disabled>',
      '      <span class="material-symbols-outlined">lock</span>',
      '      Masuk Ruang Konsultasi',
      '    </button>',
      '  </div>',
      '  <p class="reservation-modal-note">Ruang konsultasi terbuka 5 menit sebelum sesi dimulai.</p>',
      '</div>'
    ].join('');

    document.body.appendChild(overlayEl);
  }

  function openModal(data) {
    buildModal();

    var overlayEl = document.getElementById('reservation-modal-overlay');
    if (!overlayEl) return;

    // Populate dynamic fields with data or randomized defaults
    var queueEl = document.getElementById('reservation-queue-number');
    var waitEl = document.getElementById('reservation-wait-time');
    var topicEl = document.getElementById('reservation-topic');
    var doctorEl = document.getElementById('reservation-doctor');
    var scheduleEl = document.getElementById('reservation-schedule');

    if (queueEl) queueEl.textContent = (data && data.queueNumber) || getRandomItem(queueNumbers);
    if (waitEl) waitEl.textContent = (data && data.waitTime) || getRandomItem(waitTimes);
    if (topicEl) topicEl.textContent = (data && data.topic) || 'Diet Manajemen Diabetes';
    if (doctorEl) doctorEl.textContent = (data && data.doctor) || 'Dr. Sarah Wijaya, Sp.GK';
    if (scheduleEl) scheduleEl.innerHTML = (data && data.schedule) || 'Senin, 14 Okt 2024 &bull; 14:00 WIB';

    // Open with next-frame to allow CSS transition
    requestAnimationFrame(function () {
      overlayEl.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    bindModalEvents();
  }

  function closeModal() {
    var overlayEl = document.getElementById('reservation-modal-overlay');
    if (!overlayEl) return;
    overlayEl.classList.remove('open');
    document.body.style.overflow = '';
  }

  var eventsBound = false;
  function bindModalEvents() {
    if (eventsBound) return;
    eventsBound = true;

    var overlayEl = document.getElementById('reservation-modal-overlay');
    var closeBtn = document.getElementById('reservation-modal-close');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (overlayEl) {
      overlayEl.addEventListener('click', function (e) {
        if (e.target === overlayEl) closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    var statusBtn = document.getElementById('reservation-action-status');
    if (statusBtn) {
      statusBtn.addEventListener('click', function () {
        statusBtn.textContent = 'Antrean Anda Sedang Diproses...';
        statusBtn.style.opacity = '0.7';
        setTimeout(function () {
          statusBtn.textContent = 'Cek Status Antrean';
          statusBtn.style.opacity = '1';
        }, 1800);
      });
    }
  }

  // Auto-attach to any element with [data-reservation-trigger]
  // Optionally read data-* attributes for context
  function initTriggers() {
    var triggers = document.querySelectorAll('[data-reservation-trigger]');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal({
          topic: trigger.getAttribute('data-topic'),
          doctor: trigger.getAttribute('data-doctor'),
          schedule: trigger.getAttribute('data-schedule')
        });
      });
    });
  }

  // Expose to global so other scripts can trigger if needed
  window.ReservationModal = {
    open: openModal,
    close: closeModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTriggers);
  } else {
    initTriggers();
  }
})();
