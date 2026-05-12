/* Komunitas Detail — Forum Post Detail */
(function () {
  'use strict';

  /* Like button toggle */
  var likeBtn = document.querySelector('.kd-action-btn.like');
  if (likeBtn) {
    likeBtn.addEventListener('click', function () {
      var icon = likeBtn.querySelector('.material-symbols-outlined');
      if (likeBtn.classList.contains('liked')) {
        likeBtn.classList.remove('liked');
        icon.style.fontVariationSettings = "'FILL' 0";
      } else {
        likeBtn.classList.add('liked');
        icon.style.fontVariationSettings = "'FILL' 1";
      }
    });
  }

  /* Comment submit feedback */
  var submitBtn = document.querySelector('.kd-comment-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var textarea = document.querySelector('.kd-textarea');
      if (textarea && textarea.value.trim()) {
        var origText = submitBtn.textContent;
        submitBtn.textContent = 'Terkirim!';
        submitBtn.style.background = 'var(--color-secondary)';
        setTimeout(function () {
          submitBtn.textContent = origText;
          submitBtn.style.background = '';
          textarea.value = '';
        }, 1500);
      }
    });
  }
})();
