/* Love Calculator — love.js */
(function () {
  'use strict';

  var labels = [
    { min: 0,  max: 30,  text: 'Just Friends',    emoji: '💔' },
    { min: 30, max: 50,  text: 'Maybe Someday',   emoji: '💛' },
    { min: 50, max: 65,  text: 'Work in Progress', emoji: '🧡' },
    { min: 65, max: 80,  text: 'Great Connection',emoji: '🧡' },
    { min: 80, max: 95,  text: 'Strong Match',     emoji: '❤️' },
    { min: 95, max: 101, text: 'Perfect Match!',   emoji: '💕' }
  ];

  function getLabel(pct) {
    for (var i = 0; i < labels.length; i++) {
      if (pct >= labels[i].min && pct < labels[i].max) return labels[i];
    }
    return labels[labels.length - 1];
  }

  function calcLove(name1, name2) {
    var combined = (name1 + name2).toUpperCase().replace(/[^A-Z]/g, '');
    if (combined.length === 0) return 50;
    var counts = {};
    for (var i = 0; i < combined.length; i++) {
      var ch = combined[i];
      counts[ch] = (counts[ch] || 0) + 1;
    }
    var digits = Object.values(counts);
    while (digits.length > 2) {
      var next = [];
      var i = 0;
      while (i < digits.length) {
        if (i + 1 < digits.length) {
          var s = digits[i] + digits[digits.length - 1 - i];
          if (i !== digits.length - 1 - i) {
            if (s >= 10) { next.push(Math.floor(s / 10)); next.push(s % 10); }
            else next.push(s);
            digits.splice(digits.length - 1 - i, 1);
          }
          i++;
        } else { next.push(digits[i]); break; }
      }
      if (next.length === digits.length) break;
      digits = next;
    }
    var result = parseInt(digits.join(''), 10);
    if (isNaN(result) || result === 0) result = 42;
    result = result % 100;
    if (result < 1) result = 1;
    return result;
  }

  function calculate() {
    var n1 = (document.getElementById('love-name1').value || '').trim();
    var n2 = (document.getElementById('love-name2').value || '').trim();
    if (!n1 || !n2) return;

    var pct = calcLove(n1, n2);
    var info = getLabel(pct);

    var resultsEl = document.getElementById('love-results');
    if (resultsEl) resultsEl.style.display = 'block';

    var pctEl = document.getElementById('out-love-pct');
    if (pctEl) pctEl.textContent = pct + '%';

    var labelEl = document.getElementById('out-love-label');
    if (labelEl) labelEl.textContent = info.emoji + ' ' + info.text;

    var heartEl = document.getElementById('love-heart');
    if (heartEl) heartEl.textContent = info.emoji;

    var barEl = document.getElementById('love-bar');
    if (barEl) {
      barEl.style.width = '0%';
      setTimeout(function () { barEl.style.width = pct + '%'; }, 50);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btn-calc-love');
    if (btn) btn.addEventListener('click', calculate);

    ['love-name1', 'love-name2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') calculate();
        });
      }
    });
  });
})();
