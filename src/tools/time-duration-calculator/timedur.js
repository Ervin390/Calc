/* Time Duration Calculator — timedur.js */
(function () {
  'use strict';

  var currentTab = 'duration';
  var addMode = 'add';

  window.setTab = function (tab) {
    currentTab = tab;
    document.getElementById('panel-duration').hidden = (tab !== 'duration');
    document.getElementById('panel-add').hidden = (tab !== 'add');
    document.getElementById('tab-duration').classList.toggle('secondary', tab !== 'duration');
    document.getElementById('tab-add').classList.toggle('secondary', tab !== 'add');
    document.getElementById('td-results').style.display = 'none';
  };

  window.setAddMode = function (mode) {
    addMode = mode;
    document.getElementById('btn-add').classList.toggle('secondary', mode !== 'add');
    document.getElementById('btn-sub').classList.toggle('secondary', mode !== 'sub');
  };

  function parseTime(val) {
    var parts = val.split(':');
    if (parts.length < 2) return null;
    var h = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var s = parts[2] ? parseInt(parts[2], 10) : 0;
    if (isNaN(h) || isNaN(m) || isNaN(s)) return null;
    return h * 3600 + m * 60 + s;
  }

  function secondsToHHMM(s) {
    s = ((s % 86400) + 86400) % 86400;
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    return pad(h) + ':' + pad(m);
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function fmtDuration(totalSec) {
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    if (h === 0) return m + ' min';
    if (m === 0) return h + ' hr';
    return h + ' hr ' + m + ' min';
  }

  function calcDuration() {
    var startVal = document.getElementById('td-start').value;
    var endVal   = document.getElementById('td-end').value;
    var start = parseTime(startVal);
    var end   = parseTime(endVal);
    if (start === null || end === null) return;

    var diff = end - start;
    if (diff < 0) diff += 86400; // overnight
    if (diff === 0) diff = 86400;

    var totalMins = Math.round(diff / 60);
    var decimalHrs = (diff / 3600).toFixed(2);

    showResults('Duration', fmtDuration(diff), totalMins + ' min', decimalHrs + ' hrs', true);
  }

  function calcAdd() {
    var startVal = document.getElementById('ta-start').value;
    var hours    = parseFloat(document.getElementById('ta-hours').value) || 0;
    var mins     = parseFloat(document.getElementById('ta-minutes').value) || 0;
    var start = parseTime(startVal);
    if (start === null) return;

    var offset = (hours * 3600 + mins * 60) * (addMode === 'sub' ? -1 : 1);
    var result = start + offset;
    var resultStr = secondsToHHMM(result);

    showResults(addMode === 'add' ? 'Result time (add)' : 'Result time (subtract)', resultStr, '', '', false);
  }

  function showResults(label, main, mins, dec, showSec) {
    var res = document.getElementById('td-results');
    if (res) res.style.display = 'block';

    var lbl = document.getElementById('out-td-label');
    var mainEl = document.getElementById('out-td-main');
    var minsEl = document.getElementById('out-td-mins');
    var decEl  = document.getElementById('out-td-dec');
    var secRow = document.getElementById('td-secondary');

    if (lbl)    lbl.textContent  = label;
    if (mainEl) mainEl.textContent = main;
    if (secRow) secRow.style.display = showSec ? '' : 'none';
    if (minsEl) minsEl.textContent = mins;
    if (decEl)  decEl.textContent  = dec;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btnDur = document.getElementById('btn-calc-dur');
    var btnAdd = document.getElementById('btn-calc-add');
    if (btnDur) btnDur.addEventListener('click', calcDuration);
    if (btnAdd) btnAdd.addEventListener('click', calcAdd);

    ['td-start', 'td-end'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', calcDuration);
    });

    calcDuration();
  });
})();
