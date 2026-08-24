(function () {
  "use strict";

  const incomeInput = document.getElementById("fr-income");
  const expensesInput = document.getElementById("fr-expenses");
  const seTaxInput = document.getElementById("fr-se-tax");
  const vacationInput = document.getElementById("fr-vacation");
  const nonbillableInput = document.getElementById("fr-nonbillable");
  const hoursInput = document.getElementById("fr-hours");

  const outRate = document.getElementById("out-fr-rate");
  const outIncomeLabel = document.getElementById("out-fr-income-label");
  const outBillableHrs = document.getElementById("out-fr-billable-hrs");
  const outGross = document.getElementById("out-fr-gross");
  const outDaily = document.getElementById("out-fr-daily");
  const outWeekly = document.getElementById("out-fr-weekly");
  const outMonthly = document.getElementById("out-fr-monthly");

  function formatCurrency(val, decimals) {
    const dec = (decimals !== undefined) ? decimals : 2;
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  function calc() {
    const targetNet = parseFloat(incomeInput.value) || 0;
    const expenses = parseFloat(expensesInput.value) || 0;
    const seTaxPct = (parseFloat(seTaxInput.value) || 0) / 100;
    const vacationDays = parseFloat(vacationInput.value) || 0;
    const nonbillablePct = (parseFloat(nonbillableInput.value) || 0) / 100;
    const hoursPerWeek = parseFloat(hoursInput.value) || 40;

    const netPlusExpenses = targetNet + expenses;
    const grossNeeded = seTaxPct < 1 ? (netPlusExpenses / (1 - seTaxPct)) : netPlusExpenses;

    const hoursPerDay = hoursPerWeek / 5;
    const totalWorkingHours = (52 * hoursPerWeek) - (vacationDays * hoursPerDay);
    const billableHours = Math.max(1, totalWorkingHours * (1 - nonbillablePct));

    const minHourlyRate = grossNeeded / billableHours;
    const dailyRate = minHourlyRate * 8;
    const weeklyBillable = minHourlyRate * (hoursPerWeek * (1 - nonbillablePct));
    const monthlyGross = grossNeeded / 12;

    outRate.textContent = formatCurrency(minHourlyRate) + "/hr";
    outIncomeLabel.textContent = formatCurrency(targetNet, 0);
    outBillableHrs.textContent = Math.round(billableHours).toLocaleString("en-US");
    outGross.textContent = formatCurrency(grossNeeded, 0);
    outDaily.textContent = formatCurrency(dailyRate, 0);
    outWeekly.textContent = formatCurrency(weeklyBillable, 0);
    outMonthly.textContent = formatCurrency(monthlyGross, 0);
  }

  [incomeInput, expensesInput, seTaxInput, vacationInput, nonbillableInput, hoursInput].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
