/* Calorie Calculator — calorie.js */
(function () {
  'use strict';

  var unit = 'metric';

  window.setUnit = function (u) {
    unit = u;
    document.getElementById('metric-fields').hidden = (u !== 'metric');
    document.getElementById('imperial-fields').hidden = (u !== 'imperial');
    document.getElementById('btn-metric').classList.toggle('secondary', u !== 'metric');
    document.getElementById('btn-imperial').classList.toggle('secondary', u !== 'imperial');
  };

  function calcBMR(gender, age, weightKg, heightCm) {
    if (gender === 'male') {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    }
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btn-calc-cal');
    if (btn) btn.addEventListener('click', calculate);

    // Live recalculate on change
    ['cal-gender', 'cal-age', 'cal-weight-kg', 'cal-height-cm', 'cal-weight-lb', 'cal-height-in', 'cal-activity'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', calculate);
    });

    calculate();
  });

  function calculate() {
    var gender = document.getElementById('cal-gender').value;
    var age = parseFloat(document.getElementById('cal-age').value);
    var activity = parseFloat(document.getElementById('cal-activity').value);

    var weightKg, heightCm;
    if (unit === 'metric') {
      weightKg = parseFloat(document.getElementById('cal-weight-kg').value);
      heightCm = parseFloat(document.getElementById('cal-height-cm').value);
    } else {
      var lb = parseFloat(document.getElementById('cal-weight-lb').value);
      var inches = parseFloat(document.getElementById('cal-height-in').value);
      weightKg = lb * 0.453592;
      heightCm = inches * 2.54;
    }

    if (!gender || [age, activity, weightKg, heightCm].some(function (v) { return isNaN(v) || v <= 0; })) return;

    var bmr = calcBMR(gender, age, weightKg, heightCm);
    var maintenance = bmr * activity;
    var cut = maintenance - 500;
    var bulk = maintenance + 300;

    function fmt(n) { return Math.round(n).toLocaleString('en-US'); }

    document.getElementById('out-bmr').textContent = fmt(bmr) + ' kcal';
    document.getElementById('out-maintenance').textContent = fmt(maintenance);
    document.getElementById('out-cut').textContent = fmt(cut < 1200 ? 1200 : cut);
    document.getElementById('out-bulk').textContent = fmt(bulk);
  }
})();
