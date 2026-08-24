(function () {
  "use strict";

  const lenInput = document.getElementById("rb-length");
  const widInput = document.getElementById("rb-width");
  const spacingSelect = document.getElementById("rb-spacing");
  const customSpacingWrap = document.getElementById("rb-custom-spacing");
  const customSpacingInput = document.getElementById("rb-custom-in");
  const barSizeSelect = document.getElementById("rb-bar-size");
  const priceInput = document.getElementById("rb-price");

  const outLinear = document.getElementById("out-rb-linear");
  const outBars = document.getElementById("out-rb-bars");
  const outWeight = document.getElementById("out-rb-weight");
  const outCost = document.getElementById("out-rb-cost");
  const outDetail = document.getElementById("out-rb-detail");

  const barWeights = {
    "3": 0.376,
    "4": 0.668,
    "5": 1.043,
    "6": 1.502
  };

  function formatCurrency(val) {
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const len = parseFloat(lenInput.value) || 0;
    const wid = parseFloat(widInput.value) || 0;
    const spacingKey = spacingSelect.value;
    let spacingInches = 12;

    if (spacingKey === "custom") {
      customSpacingWrap.style.display = "block";
      spacingInches = parseFloat(customSpacingInput.value) || 12;
    } else {
      customSpacingWrap.style.display = "none";
      spacingInches = parseFloat(spacingKey) || 12;
    }

    const spacingFt = spacingInches / 12;
    const barSizeKey = barSizeSelect.value;
    const unitWeight = barWeights[barSizeKey] || 0.668;
    const pricePerLb = parseFloat(priceInput.value) || 0;

    // Grid runs
    const longRows = Math.floor(wid / Math.max(0.1, spacingFt)) + 1;
    const longLinearFt = longRows * len;

    const crossRows = Math.floor(len / Math.max(0.1, spacingFt)) + 1;
    const crossLinearFt = crossRows * wid;

    const totalLinearFt = longLinearFt + crossLinearFt;
    const barsNeeded = Math.ceil(totalLinearFt / 20); // 20-ft standard rebar length
    const totalWeightLb = totalLinearFt * unitWeight;
    const totalCost = totalWeightLb * pricePerLb;

    outLinear.textContent = Math.round(totalLinearFt).toLocaleString("en-US") + " lin ft";
    outBars.textContent = barsNeeded.toLocaleString("en-US");
    outWeight.textContent = Math.round(totalWeightLb).toLocaleString("en-US") + " lb";
    outCost.textContent = formatCurrency(totalCost);

    outDetail.innerHTML =
      `Long runs (${longRows} rows x ${len} ft): ${Math.round(longLinearFt)} ft<br>` +
      `Cross runs (${crossRows} rows x ${wid} ft): ${Math.round(crossLinearFt)} ft`;
  }

  [lenInput, widInput, spacingSelect, customSpacingInput, barSizeSelect, priceInput].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
