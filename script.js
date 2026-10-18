/* Публичный скрипт визитки.
   Копируется сборкой в docs/script.js без изменений.
   Без внешних запросов и без данных, вшитых в код: работает и при открытии файла с диска. */
(function () {
  'use strict';

  // Копирование контактов
  var buttons = document.querySelectorAll('.copy-btn[data-copy]');

  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy') || '';
      copyText(text).then(function (ok) {
        if (ok) markCopied(button);
      });
    });
  });

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(text); }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  // Запасной путь для file:// и старых браузеров
  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    document.body.appendChild(area);

    var ok = false;
    try {
      area.select();
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }

    document.body.removeChild(area);
    return ok;
  }

  function markCopied(button) {
    var label = button.getAttribute('aria-label');
    button.classList.add('is-copied');
    button.setAttribute('title', 'Скопировано');

    if (label) button.setAttribute('aria-label', label.replace(/^Скопировать/, 'Скопировано'));

    window.setTimeout(function () {
      button.classList.remove('is-copied');
      button.setAttribute('title', 'Скопировать');
      if (label) button.setAttribute('aria-label', label);
    }, 1600);
  }
})();