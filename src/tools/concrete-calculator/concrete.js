(function () {
  "use strict";

  const shapeSelect = document.getElementById("cn-shape");
  const lenInput = document.getElementById("cn-length");
  const widInput = document.getElementById("cn-width");
  const depthInput = document.getElementById("cn-depth-in");
  const diamInput = document.getElementById("cn-diameter");
  const hgtInput = document.getElementById("cn-height");
  const priceInput = document.getElementById("cn-price");

  const slabWrap = document.getElementById("cn-slab-inputs");
  const columnWrap = document.getElementById("cn-column-inputs");

  const outYards = document.getElementById("out-cn-yards");
  const outCuFt = document.getElementById("out-cn-cuft");
  const outReadymix = document.getElementById("out-cn-readymix");
  const outMeters = document.getElementById("out-cn-meters");
  const out40lb = document.getElementById("out-cn-40lb");
  const out60lb = document.getElementById("out-cn-60lb");
  const out80lb = document.getElementById("out-cn-80lb");

  function formatCurrency(val) {
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const shape = shapeSelect.value;
    const pricePerYard = parseFloat(priceInput.value) || 125;

    slabWrap.style.display = (shape === "column") ? "none" : "block";
    columnWrap.style.display = (shape === "column") ? "block" : "none";

    let volumeCuFt = 0;

    if (shape === "slab" || shape === "footing") {
      const len = parseFloat(lenInput.value) || 0;
      const wid = parseFloat(widInput.value) || 0;
      const depthIn = parseFloat(depthInput.value) || 0;
      volumeCuFt = len * wid * (depthIn / 12);
    } else if (shape === "column") {
      const diamIn = parseFloat(diamInput.value) || 0;
      const heightFt = parseFloat(hgtInput.value) || 0;
      const radiusFt = (diamIn / 2) / 12;
      volumeCuFt = Math.PI * Math.pow(radiusFt, 2) * heightFt;
    }

    const volumeYards = volumeCuFt / 27;
    const volumeMeters = volumeCuFt * 0.0283168;

    // Bag calculations (including 10% waste buffer)
    const volumeWithWasteCuFt = volumeCuFt * 1.10;
    const bags40 = Math.ceil(volumeWithWasteCuFt / 0.30);
    const bags60 = Math.ceil(volumeWithWasteCuFt / 0.45);
    const bags80 = Math.ceil(volumeWithWasteCuFt / 0.60);

    const readymixCost = volumeYards * pricePerYard;

    outYards.textContent = volumeYards.toFixed(2) + " cu yd";
    outCuFt.textContent = volumeCuFt.toFixed(1) + " cu ft";
    outReadymix.textContent = formatCurrency(readymixCost);
    outMeters.textContent = volumeMeters.toFixed(2) + " m³";

    out40lb.textContent = bags40.toLocaleString("en-US") + " bags";
    out60lb.textContent = bags60.toLocaleString("en-US") + " bags";
    out80lb.textContent = bags80.toLocaleString("en-US") + " bags";
  }

  [shapeSelect, lenInput, widInput, depthInput, diamInput, hgtInput, priceInput].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
