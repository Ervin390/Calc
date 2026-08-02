/* Percentage Calculator — percentage.js */
(function () {
  'use strict';

  var currentTab = 'pct-of';

  window.switchTab = function (tab) {
    currentTab = tab;
    ['pct-of', 'pct-change', 'is-what'].forEach(function (t) {
      var panel = document.getElementById('panel-' + t);
      var btn = document.getElementById('tab-' + t);
      if (panel) panel.hidden = (t !== tab);
      if (btn) {
        btn.classList.toggle('secondary', t !== tab);
        btn.classList.toggle('active', t === tab);
      }
    });
    calculate();
  };

  function fmt(n) {
    if (!isFinite(n)) return 'N/A';
    return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
  }

  function calculate() {
    if (currentTab === 'pct-of') {
      var pct = parseFloat(document.getElementById('pa-pct').value);
      var num = parseFloat(document.getElementById('pa-num').value);
      var outEl = document.getElementById('out-pct-of');
      var workEl = document.getElementById('out-pct-of-work');
      if (isNaN(pct) || isNaN(num)) { outEl.textContent = ''; if (workEl) workEl.textContent = ''; return; }
      var result = (pct / 100) * num;
      outEl.textContent = fmt(result);
      if (workEl) workEl.textContent = '(' + pct + ' / 100) × ' + num + ' = ' + fmt(result);
    } else if (currentTab === 'pct-change') {
      var oldVal = parseFloat(document.getElementById('pb-old').value);
      var newVal = parseFloat(document.getElementById('pb-new').value);
      var outEl = document.getElementById('out-pct-change');
      var workEl = document.getElementById('out-pct-change-work');
      if (isNaN(oldVal) || isNaN(newVal) || oldVal === 0) { outEl.textContent = ''; if (workEl) workEl.textContent = ''; return; }
      var change = ((newVal - oldVal) / Math.abs(oldVal)) * 100;
      var sign = change >= 0 ? '+' : '';
      outEl.textContent = sign + fmt(change) + '%';
      outEl.style.color = change >= 0 ? 'var(--primary)' : 'var(--danger, #c0392b)';
      if (workEl) workEl.textContent = '((' + newVal + ' - ' + oldVal + ') / ' + Math.abs(oldVal) + ') × 100 = ' + sign + fmt(change) + '%';
    } else if (currentTab === 'is-what') {
      var part = parseFloat(document.getElementById('pc-part').value);
      var whole = parseFloat(document.getElementById('pc-whole').value);
      var outEl = document.getElementById('out-is-what');
      var workEl = document.getElementById('out-is-what-work');
      if (isNaN(part) || isNaN(whole) || whole === 0) { outEl.textContent = ''; if (workEl) workEl.textContent = ''; return; }
      var result = (part / whole) * 100;
      outEl.textContent = fmt(result) + '%';
      if (workEl) workEl.textContent = '(' + part + ' / ' + whole + ') × 100 = ' + fmt(result) + '%';
    }
  }

  function attachListeners() {
    ['pa-pct', 'pa-num', 'pb-old', 'pb-new', 'pc-part', 'pc-whole'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', calculate);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    switchTab('pct-of');
    attachListeners();
    calculate();
  });
})();
