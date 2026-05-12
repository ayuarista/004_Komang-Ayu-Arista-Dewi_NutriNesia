/* Challenge Sehat Detail */
(function () {
  'use strict';

  var tasks = document.querySelectorAll('.csd-task input[type="checkbox"]');
  var counter = document.getElementById('csd-task-count');
  var total = tasks.length;

  function updateCount() {
    if (!counter) return;
    var done = 0;
    tasks.forEach(function (t) { if (t.checked) done++; });
    counter.textContent = done + '/' + total + ' Selesai';
  }

  tasks.forEach(function (t) { t.addEventListener('change', updateCount); });
  updateCount();

  // Countdown timer (visual; based on static target of 04:12:01 decrementing)
  var timerEl = document.getElementById('csd-timer');
  if (timerEl) {
    var remain = 4 * 3600 + 12 * 60 + 1; // seconds
    var fmt = function (n) { return n < 10 ? '0' + n : '' + n; };
    var tick = function () {
      var h = Math.floor(remain / 3600);
      var m = Math.floor((remain % 3600) / 60);
      var s = remain % 60;
      timerEl.textContent = fmt(h) + ':' + fmt(m) + ':' + fmt(s);
      if (remain > 0) remain--;
    };
    tick();
    setInterval(tick, 1000);
  }

  // Modal helpers
  var modal = document.getElementById('cs-join-modal');
  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) return closeModal();
      if (e.target.closest('[data-close="modal"]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  // Join CTA → open popup + mark joined
  var joinBtn = document.getElementById('csd-join-btn');
  if (joinBtn) {
    joinBtn.addEventListener('click', function () {
      if (joinBtn.classList.contains('joined')) {
        openModal();
        return;
      }
      joinBtn.classList.add('joined');
      joinBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Kamu Sudah Bergabung';
      openModal();
    });
  }
})();
