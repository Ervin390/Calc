(function () {
  "use strict";

  const lenInput = document.getElementById("ep-length");
  const widInput = document.getElementById("ep-width");
  const rollWidthSelect = document.getElementById("ep-roll-width");
  const wasteSelect = document.getElementById("ep-waste");
  const overlapSelect = document.getElementById("ep-overlap");

  const outMembrane = document.getElementById("out-ep-membrane");
  const outWastePct = document.getElementById("out-ep-waste-pct");
  const outRolls = document.getElementById("out-ep-rolls");
  const outNetArea = document.getElementById("out-ep-net-area");
  const outAdhesive = document.getElementById("out-ep-adhesive");
  const outTape = document.getElementById("out-ep-tape");
  const outSealant = document.getElementById("out-ep-sealant");

  function calc() {
    const length = parseFloat(lenInput.value) || 0;
    const width = parseFloat(widInput.value) || 0;
    const rollWidth = parseFloat(rollWidthSelect.value) || 15;
    const wastePct = parseFloat(wasteSelect.value) || 10;
    const overlapInches = parseFloat(overlapSelect.value) || 6;

    const netArea = length * width;
    const grossArea = netArea * (1 + (wastePct / 100));

    // standard roll is assumed 50 ft long
    const rollSqFt = rollWidth * 50;
    const rollsNeeded = Math.ceil(grossArea / Math.max(1, rollSqFt));

    // Adhesive: 1 gal per 60 sq ft
    const adhesiveGal = Math.ceil(grossArea / 60);

    // Seam tape: total linear feet of horizontal seams running length of roof
    const numberOfSeams = Math.max(0, Math.ceil(width / rollWidth) - 1);
    const seamTapeLinearFt = numberOfSeams * length * (1 + (overlapInches / 72));

    // Lap sealant: 1 tube per 100 linear ft of seam edge
    const lapSealantTubes = Math.max(1, Math.ceil(seamTapeLinearFt / 100));

    outMembrane.textContent = Math.round(grossArea).toLocaleString("en-US") + " sq ft";
    outWastePct.textContent = wastePct + "%";
    outRolls.textContent = rollsNeeded;
    outNetArea.textContent = Math.round(netArea).toLocaleString("en-US") + " sq ft";
    outAdhesive.textContent = adhesiveGal + " gal";
    outTape.textContent = Math.round(seamTapeLinearFt) + " lin ft";
    outSealant.textContent = lapSealantTubes + " tubes";
  }

  [lenInput, widInput, rollWidthSelect, wasteSelect, overlapSelect].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
