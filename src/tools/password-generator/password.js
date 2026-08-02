/* Password Generator — password.js */
(function () {
  'use strict';

  var UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var LOWER   = 'abcdefghijklmnopqrstuvwxyz';
  var NUMBERS = '0123456789';
  var SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  function getCharset() {
    var cs = '';
    if (document.getElementById('opt-upper').checked)   cs += UPPER;
    if (document.getElementById('opt-lower').checked)   cs += LOWER;
    if (document.getElementById('opt-numbers').checked) cs += NUMBERS;
    if (document.getElementById('opt-symbols').checked) cs += SYMBOLS;
    if (!cs) cs = LOWER + NUMBERS;
    return cs;
  }

  function generate() {
    var len = parseInt(document.getElementById('pwd-length').value, 10);
    var charset = getCharset();
    var arr = new Uint32Array(len);
    window.crypto.getRandomValues(arr);
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += charset[arr[i] % charset.length];
    }
    return pwd;
  }

  function calcStrength(pwd) {
    var score = 0;
    if (pwd.length >= 8)  score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (pwd.length >= 24) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 3)  return { label: 'Weak',      color: '#dc2626', pct: 25 };
    if (score <= 5)  return { label: 'Fair',       color: '#b45309', pct: 50 };
    if (score <= 6)  return { label: 'Strong',     color: '#047857', pct: 75 };
    return               { label: 'Very Strong', color: '#1d3557', pct: 100 };
  }

  function updatePassword() {
    var pwd = generate();
    var outEl = document.getElementById('out-password');
    if (outEl) outEl.textContent = pwd;

    var str = calcStrength(pwd);
    var wrap = document.getElementById('strength-wrap');
    var bar = document.getElementById('strength-bar');
    var lbl = document.getElementById('strength-label');
    if (wrap) wrap.style.display = 'block';
    if (bar) { bar.style.width = str.pct + '%'; bar.style.background = str.color; }
    if (lbl) { lbl.textContent = str.label; lbl.style.color = str.color; }
  }

  function copyPwd() {
    var outEl = document.getElementById('out-password');
    var text = outEl ? outEl.textContent : '';
    if (!text || text.includes('Click Generate')) return;
    navigator.clipboard.writeText(text).then(function () {
      var msg = document.getElementById('copy-msg');
      if (msg) { msg.textContent = 'Copied!'; setTimeout(function () { msg.textContent = ''; }, 2000); }
    }).catch(function () {
      var msg = document.getElementById('copy-msg');
      if (msg) { msg.textContent = 'Copy failed.'; }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById('pwd-length');
    var display = document.getElementById('length-display');
    if (slider) {
      slider.addEventListener('input', function () {
        if (display) display.textContent = slider.value;
        updatePassword();
      });
    }

    var genBtn = document.getElementById('btn-generate');
    if (genBtn) genBtn.addEventListener('click', updatePassword);

    ['btn-copy', 'btn-copy2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', copyPwd);
    });

    ['opt-upper', 'opt-lower', 'opt-numbers', 'opt-symbols'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', updatePassword);
    });

    updatePassword();
  });
})();
