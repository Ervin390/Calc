(function () {
  "use strict";

  const distInput = document.getElementById("cc-distance");
  const daysInput = document.getElementById("cc-days");
  const vehicleSelect = document.getElementById("cc-vehicle");
  const mpgInput = document.getElementById("cc-mpg");
  const fuelPriceInput = document.getElementById("cc-fuel-price");
  const kwhMileInput = document.getElementById("cc-kwh-mile");
  const kwhPriceInput = document.getElementById("cc-kwh-price");
  const tollInput = document.getElementById("cc-toll");
  const parkingInput = document.getElementById("cc-parking");
  const deprCheckbox = document.getElementById("cc-depreciation");

  const gasWrap = document.getElementById("cc-gas-inputs");
  const evWrap = document.getElementById("cc-ev-inputs");

  const outAnnual = document.getElementById("out-cc-annual");
  const outMiles = document.getElementById("out-cc-annual-miles");
  const outDaily = document.getElementById("out-cc-daily");
  const outMonthly = document.getElementById("out-cc-monthly");
  const outFuel = document.getElementById("out-cc-fuel");
  const outDepr = document.getElementById("out-cc-depr");
  const outTolls = document.getElementById("out-cc-tolls");
  const outParkingYr = document.getElementById("out-cc-parking-yr");
  const outRaise = document.getElementById("out-cc-raise");

  function formatCurrency(val, decimals) {
    const dec = (decimals !== undefined) ? decimals : 2;
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  function calc() {
    const distOneWay = parseFloat(distInput.value) || 0;
    const daysPerWeek = parseFloat(daysInput.value) || 5;
    const vehicle = vehicleSelect.value;
    const tollPerTrip = parseFloat(tollInput.value) || 0;
    const monthlyParking = parseFloat(parkingInput.value) || 0;
    const includeDepr = deprCheckbox.checked;

    gasWrap.style.display = (vehicle === "gas") ? "block" : "none";
    evWrap.style.display = (vehicle === "ev") ? "block" : "none";

    const roundTripMiles = distOneWay * 2;
    const annualMiles = roundTripMiles * daysPerWeek * 52;
    const annualDays = daysPerWeek * 52;

    let annualEnergyFuelCost = 0;
    if (vehicle === "gas") {
      const mpg = parseFloat(mpgInput.value) || 30;
      const fuelPrice = parseFloat(fuelPriceInput.value) || 3.50;
      annualEnergyFuelCost = (annualMiles / Math.max(1, mpg)) * fuelPrice;
    } else {
      const kwhMile = parseFloat(kwhMileInput.value) || 0.30;
      const kwhPrice = parseFloat(kwhPriceInput.value) || 0.14;
      annualEnergyFuelCost = annualMiles * kwhMile * kwhPrice;
    }

    const annualDepr = includeDepr ? (annualMiles * 0.67) : 0;
    const annualTolls = tollPerTrip * annualDays;
    const annualParking = monthlyParking * 12;

    const totalAnnualCost = annualEnergyFuelCost + annualDepr + annualTolls + annualParking;
    const dailyCost = annualDays > 0 ? (totalAnnualCost / annualDays) : 0;
    const monthlyCost = totalAnnualCost / 12;

    outAnnual.textContent = formatCurrency(totalAnnualCost, 2);
    outMiles.textContent = Math.round(annualMiles).toLocaleString("en-US");
    outDaily.textContent = formatCurrency(dailyCost, 2);
    outMonthly.textContent = formatCurrency(monthlyCost, 2);
    outFuel.textContent = formatCurrency(annualEnergyFuelCost, 0);
    outDepr.textContent = formatCurrency(annualDepr, 0);
    outTolls.textContent = formatCurrency(annualTolls, 0);
    outParkingYr.textContent = formatCurrency(annualParking, 0);
    outRaise.textContent = formatCurrency(totalAnnualCost, 0);
  }

  [distInput, daysInput, vehicleSelect, mpgInput, fuelPriceInput, kwhMileInput, kwhPriceInput, tollInput, parkingInput, deprCheckbox].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
