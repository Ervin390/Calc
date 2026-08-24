(function () {
  "use strict";

  const sqftInput = document.getElementById("bt-sqft");
  const ceilingSelect = document.getElementById("bt-ceiling");
  const sunSelect = document.getElementById("bt-sun");
  const insulSelect = document.getElementById("bt-insulation");
  const occupantsInput = document.getElementById("bt-occupants");

  const addZoneBtn = document.getElementById("bt-add-zone");
  const zonesList = document.getElementById("bt-zones-list");

  const outBtu = document.getElementById("out-bt-btu");
  const outTons = document.getElementById("out-bt-tons");
  const outUnit = document.getElementById("out-bt-unit");
  const outZonesTotalWrap = document.getElementById("out-bt-zones-total");
  const outZonesDetail = document.getElementById("out-bt-zones-detail");
  const outCondenser = document.getElementById("out-bt-condenser");

  let zones = [];
  let zoneCounter = 0;

  function calcSingleRoom(sqft, ceilingMult, sunMult, insulMult, occ) {
    const base = sqft * 25;
    let adjusted = base * ceilingMult * sunMult * insulMult;
    if (occ > 2) {
      adjusted += (occ - 2) * 600;
    }
    return adjusted;
  }

  function getStandardUnitClass(btu) {
    const sizes = [9000, 12000, 18000, 24000, 30000, 36000, 48000];
    for (let s of sizes) {
      if (s >= btu) return s;
    }
    return Math.ceil(btu / 6000) * 6000;
  }

  function calc() {
    const mainSqft = parseFloat(sqftInput.value) || 0;
    const ceilingMult = parseFloat(ceilingSelect.value) || 1.0;
    const sunMult = parseFloat(sunSelect.value) || 1.0;
    const insulMult = parseFloat(insulSelect.value) || 1.0;
    const occupants = parseFloat(occupantsInput.value) || 2;

    const mainBtu = calcSingleRoom(mainSqft, ceilingMult, sunMult, insulMult, occupants);
    const mainUnit = getStandardUnitClass(mainBtu);

    let totalSystemBtu = mainBtu;
    let zoneBreakdownHtml = "Room 1 (Main): " + Math.round(mainBtu).toLocaleString("en-US") + " BTU (" + mainUnit.toLocaleString("en-US") + " BTU unit)<br>";

    zones.forEach((z, idx) => {
      const zSqft = parseFloat(document.getElementById("bt-z-sqft-" + z.id)?.value) || 0;
      const zBtu = calcSingleRoom(zSqft, 1.0, 1.0, 1.0, 2);
      const zUnit = getStandardUnitClass(zBtu);
      totalSystemBtu += zBtu;
      zoneBreakdownHtml += "Room " + (idx + 2) + ": " + Math.round(zBtu).toLocaleString("en-US") + " BTU (" + zUnit.toLocaleString("en-US") + " BTU unit)<br>";
    });

    const tons = mainBtu / 12000;

    outBtu.textContent = Math.round(mainBtu).toLocaleString("en-US") + " BTU";
    outTons.textContent = tons.toFixed(1);
    outUnit.textContent = mainUnit.toLocaleString("en-US") + " BTU unit";

    if (zones.length > 0) {
      outZonesTotalWrap.style.display = "block";
      outZonesDetail.innerHTML = zoneBreakdownHtml;
      const condenserSize = getStandardUnitClass(totalSystemBtu);
      outCondenser.textContent = condenserSize.toLocaleString("en-US") + " BTU (" + Math.round(totalSystemBtu).toLocaleString("en-US") + " total demand)";
    } else {
      outZonesTotalWrap.style.display = "none";
    }
  }

  if (addZoneBtn) {
    addZoneBtn.addEventListener("click", () => {
      zoneCounter++;
      const zId = zoneCounter;
      zones.push({ id: zId });

      const div = document.createElement("div");
      div.id = "bt-zone-row-" + zId;
      div.style.cssText = "display: flex; gap: 0.5rem; align-items: center; margin-top: 0.5rem;";
      div.innerHTML = `
        <span style="font-size:0.85rem; color: #4b5563; min-width: 60px;">Room ${zones.length + 1}:</span>
        <input type="number" id="bt-z-sqft-${zId}" value="200" min="50" max="3000" step="25" style="flex:1;" placeholder="sq ft">
        <button type="button" data-remove="${zId}" class="secondary" style="padding:0.25rem 0.6rem; font-size:0.8rem;">&times;</button>
      `;
      zonesList.appendChild(div);

      const inp = document.getElementById("bt-z-sqft-" + zId);
      if (inp) inp.addEventListener("input", calc);

      const remBtn = div.querySelector(`[data-remove="${zId}"]`);
      if (remBtn) {
        remBtn.addEventListener("click", () => {
          zones = zones.filter(z => z.id !== zId);
          div.remove();
          calc();
        });
      }

      calc();
    });
  }

  [sqftInput, ceilingSelect, sunSelect, insulSelect, occupantsInput].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
