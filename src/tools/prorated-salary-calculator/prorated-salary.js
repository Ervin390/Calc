(function () {
  "use strict";

  const salaryInput = document.getElementById("ps-salary");
  const methodSelect = document.getElementById("ps-method");
  const daysWorkedInput = document.getElementById("ps-days-worked");
  const totalWorkingInput = document.getElementById("ps-total-working");
  const totalCalendarInput = document.getElementById("ps-total-calendar");

  const workingWrap = document.getElementById("ps-working-total-wrap");
  const calendarWrap = document.getElementById("ps-calendar-total-wrap");

  const outPay = document.getElementById("out-ps-pay");
  const outDays = document.getElementById("out-ps-days");
  const outDaily = document.getElementById("out-ps-daily");
  const outFull = document.getElementById("out-ps-full");
  const outDeducted = document.getElementById("out-ps-deducted");
  const outAbsent = document.getElementById("out-ps-absent");

  function formatCurrency(val) {
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const salary = parseFloat(salaryInput.value) || 0;
    const method = methodSelect.value;
    const daysWorked = parseFloat(daysWorkedInput.value) || 0;

    workingWrap.style.display = (method === "working") ? "block" : "none";
    calendarWrap.style.display = (method === "calendar") ? "block" : "none";

    let dailyRate = 0;
    let totalPeriodDays = 0;
    let fullPeriodPay = 0;

    if (method === "working") {
      dailyRate = salary / 260;
      totalPeriodDays = parseFloat(totalWorkingInput.value) || 22;
      fullPeriodPay = dailyRate * totalPeriodDays;
    } else {
      dailyRate = salary / 365;
      totalPeriodDays = parseFloat(totalCalendarInput.value) || 30;
      fullPeriodPay = dailyRate * totalPeriodDays;
    }

    const effectiveWorked = Math.min(daysWorked, totalPeriodDays);
    const proratedPay = dailyRate * effectiveWorked;
    const absentDays = Math.max(0, totalPeriodDays - effectiveWorked);
    const deductedPay = dailyRate * absentDays;

    outPay.textContent = formatCurrency(proratedPay);
    outDays.textContent = effectiveWorked;
    outDaily.textContent = formatCurrency(dailyRate);
    outFull.textContent = formatCurrency(fullPeriodPay);
    outDeducted.textContent = formatCurrency(deductedPay);
    outAbsent.textContent = absentDays;
  }

  [salaryInput, methodSelect, daysWorkedInput, totalWorkingInput, totalCalendarInput].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
