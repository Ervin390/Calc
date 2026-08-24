(function () {
  "use strict";

  const rentInput = document.getElementById("pr-rent");
  const modeSelect = document.getElementById("pr-mode");
  const dayInput = document.getElementById("pr-day");
  const monthSelect = document.getElementById("pr-month");
  const methodSelect = document.getElementById("pr-method");

  const outTotal = document.getElementById("out-pr-total");
  const outDays = document.getElementById("out-pr-days");
  const outDaily = document.getElementById("out-pr-daily");
  const outMonthDays = document.getElementById("out-pr-month-days");
  const outRemaining = document.getElementById("out-pr-remaining");

  const monthDaysMap = {
    "1": 31, "2": 28, "2l": 29, "3": 31, "4": 30, "5": 31, "6": 30,
    "7": 31, "8": 31, "9": 30, "10": 31, "11": 30, "12": 31
  };

  function formatCurrency(val) {
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const rent = parseFloat(rentInput.value) || 0;
    const mode = modeSelect.value;
    const day = parseInt(dayInput.value, 10) || 1;
    const mKey = monthSelect.value;
    const method = methodSelect.value;

    const totalDaysInMonth = monthDaysMap[mKey] || 30;
    const maxDay = totalDaysInMonth;
    if (day > maxDay) {
      dayInput.value = maxDay;
    }

    const effectiveDay = Math.min(Math.max(1, day), totalDaysInMonth);

    let daysCharged = 0;
    if (mode === "movein") {
      daysCharged = (totalDaysInMonth - effectiveDay) + 1;
    } else {
      daysCharged = effectiveDay;
    }

    let dailyRate = 0;
    if (method === "avg") {
      dailyRate = rent / 30.42;
    } else {
      dailyRate = rent / totalDaysInMonth;
    }

    const totalDue = dailyRate * daysCharged;
    const remainingBalance = Math.max(0, rent - totalDue);

    outTotal.textContent = formatCurrency(totalDue);
    outDays.textContent = daysCharged;
    outDaily.textContent = formatCurrency(dailyRate);
    outMonthDays.textContent = totalDaysInMonth + (method === "avg" ? " (using 30.42 avg)" : "");
    outRemaining.textContent = formatCurrency(remainingBalance);
  }

  [rentInput, modeSelect, dayInput, monthSelect, methodSelect].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
