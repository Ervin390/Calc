(function () {
  "use strict";

  const shapeSelect = document.getElementById("ml-shape");
  const unitSelect = document.getElementById("ml-unit");
  const lengthInput = document.getElementById("ml-length");
  const widthInput = document.getElementById("ml-width");
  const diameterInput = document.getElementById("ml-diameter");
  const depthInput = document.getElementById("ml-depth");
  const bagSizeSelect = document.getElementById("ml-bag-size");

  const groupRect = document.getElementById("ml-group-rect");
  const groupCircle = document.getElementById("ml-group-circle");

  const outYards = document.getElementById("out-ml-yards");
  const outBags = document.getElementById("out-ml-bags");
  const outArea = document.getElementById("out-ml-area");
  const outCuFt = document.getElementById("out-ml-cuft");
  const outCuMeters = document.getElementById("out-ml-cu-meters");

  const unitDimLabels = document.querySelectorAll(".unit-dim");
  const unitDepthLabels = document.querySelectorAll(".unit-depth");

  function calc() {
    const isRect = shapeSelect.value === "rect";
    const isFt = unitSelect.value === "ft";

    groupRect.style.display = isRect ? "block" : "none";
    groupCircle.style.display = isRect ? "none" : "block";

    unitDimLabels.forEach(el => el.textContent = isFt ? "ft" : "m");
    unitDepthLabels.forEach(el => el.textContent = isFt ? "in" : "cm");

    let areaSqFt = 0;
    if (isRect) {
      const l = parseFloat(lengthInput.value) || 0;
      const w = parseFloat(widthInput.value) || 0;
      areaSqFt = isFt ? (l * w) : (l * w * 10.7639);
    } else {
      const d = parseFloat(diameterInput.value) || 0;
      const r = d / 2;
      areaSqFt = isFt ? (Math.PI * r * r) : (Math.PI * r * r * 10.7639);
    }

    const depthVal = parseFloat(depthInput.value) || 0;
    const depthInFt = isFt ? (depthVal / 12) : (depthVal / 30.48);

    const totalCuFt = areaSqFt * depthInFt;
    const totalCuYards = totalCuFt / 27;
    const totalCuMeters = totalCuFt * 0.0283168;

    const bagCuFt = parseFloat(bagSizeSelect.value) || 2.0;
    const bagsNeeded = Math.ceil(totalCuFt / bagCuFt);

    outYards.textContent = (isFt ? totalCuYards : totalCuMeters).toFixed(2) + (isFt ? " Cubic Yards" : " Cubic Meters");
    outBags.textContent = bagsNeeded + " Bags (" + bagCuFt + " cu ft)";
    outArea.textContent = Math.round(isFt ? areaSqFt : (areaSqFt / 10.7639)) + (isFt ? " sq ft" : " m²");
    outCuFt.textContent = totalCuFt.toFixed(1) + " cu ft";
    outCuMeters.textContent = (isFt ? totalCuMeters : totalCuYards).toFixed(2) + (isFt ? " Cubic Meters" : " Cubic Yards");
  }

  [shapeSelect, unitSelect, lengthInput, widthInput, diameterInput, depthInput, bagSizeSelect].forEach(el => {
    if (el) el.addEventListener("input", calc);
    if (el) el.addEventListener("change", calc);
  });

  calc();
})();
