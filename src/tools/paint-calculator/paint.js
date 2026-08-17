(function () {
  "use strict";

  const unitSelect = document.getElementById("pt-unit");
  const lengthInput = document.getElementById("pt-length");
  const widthInput = document.getElementById("pt-width");
  const heightInput = document.getElementById("pt-height");
  const doorsInput = document.getElementById("pt-doors");
  const windowsInput = document.getElementById("pt-windows");
  const coatsInput = document.getElementById("pt-coats");
  const ceilingCheckbox = document.getElementById("pt-ceiling");

  const outGallons = document.getElementById("out-pt-gallons");
  const outRecommend = document.getElementById("out-pt-recommend");
  const outArea = document.getElementById("out-pt-area");
  const outTotalCoverage = document.getElementById("out-pt-total-coverage");
  const outLiters = document.getElementById("out-pt-liters");
  const unitLabels = document.querySelectorAll(".unit-label");

  function calc() {
    const isFt = unitSelect.value === "ft";
    unitLabels.forEach(el => el.textContent = isFt ? "ft" : "m");

    const length = parseFloat(lengthInput.value) || 0;
    const width = parseFloat(widthInput.value) || 0;
    const height = parseFloat(heightInput.value) || 0;
    const doors = parseInt(doorsInput.value, 10) || 0;
    const windows = parseInt(windowsInput.value, 10) || 0;
    const coats = Math.max(1, parseInt(coatsInput.value, 10) || 1);
    const includeCeiling = ceilingCheckbox.checked;

    // Gross surface areas
    let grossWallArea = 2 * (length + width) * height;
    let ceilingArea = includeCeiling ? (length * width) : 0;

    // Subtractions per door and window
    // 1 Door = 21 sq ft (2 m²)
    // 1 Window = 15 sq ft (1.4 m²)
    let doorSub = isFt ? (doors * 21) : (doors * 2.0);
    let windowSub = isFt ? (windows * 15) : (windows * 1.4);

    let netAreaPerCoat = Math.max(0, (grossWallArea - doorSub - windowSub) + ceilingArea);
    let totalCoverageNeeded = netAreaPerCoat * coats;

    // Spreading rates:
    // 1 Gallon = 350 sq ft
    // 1 Liter = 9 sq meters
    let gallonsNeeded = isFt ? (totalCoverageNeeded / 350) : (totalCoverageNeeded / 9 / 3.78541);
    let litersNeeded = isFt ? (gallonsNeeded * 3.78541) : (totalCoverageNeeded / 9);

    if (!isFt) {
      gallonsNeeded = litersNeeded / 3.78541;
    }

    outGallons.textContent = (isFt ? gallonsNeeded : litersNeeded).toFixed(1) + (isFt ? " Gallons" : " Liters");
    outArea.textContent = Math.round(netAreaPerCoat) + (isFt ? " sq ft" : " m²");
    outTotalCoverage.textContent = Math.round(totalCoverageNeeded) + (isFt ? " sq ft" : " m²");
    outLiters.textContent = (isFt ? litersNeeded : gallonsNeeded).toFixed(1) + (isFt ? " Liters" : " Gallons");

    // Can recommendations
    let roundedGallons = Math.ceil(gallonsNeeded);
    let recommendText = "";
    if (roundedGallons <= 1) {
      recommendText = "1 Gallon Can";
    } else {
      recommendText = roundedGallons + " Gallon Cans";
    }
    outRecommend.textContent = recommendText;
  }

  [unitSelect, lengthInput, widthInput, heightInput, doorsInput, windowsInput, coatsInput, ceilingCheckbox].forEach(el => {
    if (el) el.addEventListener("input", calc);
    if (el) el.addEventListener("change", calc);
  });

  calc();
})();
