/* BMI Calculator — bmi.js */
(function () {
  'use strict';

  var unit = 'metric';

  window.setUnit = function (u) {
    unit = u;
    document.getElementById('metric-fields').hidden = (u !== 'metric');
    document.getElementById('imperial-fields').hidden = (u !== 'imperial');
    document.getElementById('btn-metric').classList.toggle('secondary', u !== 'metric');
    document.getElementById('btn-imperial').classList.toggle('secondary', u !== 'imperial');
    calculate();
  };

  var categories = [
    { max: 18.5, label: 'Underweight', color: '#457b9d' },
    { max: 25.0, label: 'Normal weight', color: '#047857' },
    { max: 30.0, label: 'Overweight', color: '#b45309' },
    { max: Infinity, label: 'Obese', color: '#dc2626' }
  ];

  function getCategory(bmi) {
    for (var i = 0; i < categories.length; i++) {
      if (bmi < categories[i].max) return categories[i];
    }
    return categories[categories.length - 1];
  }

  function calcBMI(weightKg, heightM) {
    return weightKg / (heightM * heightM);
  }

  function healthyWeightRange(heightM) {
    var low = 18.5 * heightM * heightM;
    var high = 24.9 * heightM * heightM;
    return { low: low, high: high };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btn-calc-bmi');
    if (btn) btn.addEventListener('click', calculate);

    ['bmi-weight-kg', 'bmi-height-cm', 'bmi-weight-lb', 'bmi-height-ft', 'bmi-height-in'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', calculate);
    });

    calculate();
  });

  function calculate() {
    var weightKg, heightM;

    if (unit === 'metric') {
      var kg = parseFloat(document.getElementById('bmi-weight-kg').value);
      var cm = parseFloat(document.getElementById('bmi-height-cm').value);
      if (isNaN(kg) || isNaN(cm) || kg <= 0 || cm <= 0) return;
      weightKg = kg;
      heightM = cm / 100;
    } else {
      var lb = parseFloat(document.getElementById('bmi-weight-lb').value);
      var ft = parseFloat(document.getElementById('bmi-height-ft').value) || 0;
      var inches = parseFloat(document.getElementById('bmi-height-in').value) || 0;
      if (isNaN(lb) || lb <= 0) return;
      weightKg = lb * 0.453592;
      heightM = ((ft * 12) + inches) * 0.0254;
    }

    if (heightM <= 0) return;

    var bmi = calcBMI(weightKg, heightM);
    var cat = getCategory(bmi);
    var range = healthyWeightRange(heightM);

    function fmt(n) { return n.toFixed(1); }
    function fmtKg(n) {
      if (unit === 'metric') return fmt(n) + ' kg';
      return fmt(n / 0.453592) + ' lb';
    }

    var bmiEl = document.getElementById('out-bmi');
    var catEl = document.getElementById('out-category');
    var rangeEl = document.getElementById('out-range');

    if (bmiEl) {
      bmiEl.textContent = fmt(bmi);
      bmiEl.style.color = cat.color;
    }
    if (catEl) {
      catEl.textContent = cat.label;
      catEl.style.color = cat.color;
    }
    if (rangeEl) {
      rangeEl.textContent = fmtKg(range.low) + ' to ' + fmtKg(range.high);
    }
  }
})();
