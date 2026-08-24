(function () {
  "use strict";

  const balanceInput = document.getElementById("mo-balance");
  const rateInput = document.getElementById("mo-rate");
  const termInput = document.getElementById("mo-term");
  const extraInput = document.getElementById("mo-extra");
  const lumpInput = document.getElementById("mo-lump");

  const outSaved = document.getElementById("out-mo-saved");
  const outMonthsSaved = document.getElementById("out-mo-months-saved");
  const outPayoff = document.getElementById("out-mo-payoff");
  const outOrigPayoff = document.getElementById("out-mo-orig-payoff");
  const outPayment = document.getElementById("out-mo-payment");
  const outTotalInt = document.getElementById("out-mo-total-int");
  const outNewInt = document.getElementById("out-mo-new-int");

  const canvas = document.getElementById("mo-chart");

  function formatCurrency(val) {
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function calcStandardPayment(principal, annualRatePct, years) {
    const r = (annualRatePct / 100) / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  function calcAmortization(principal, annualRatePct, totalMonths, monthlyPayment, extraMonthly, lumpSum) {
    const r = (annualRatePct / 100) / 12;
    let balance = principal - lumpSum;
    let totalInterest = 0;
    const balances = [Math.max(0, balance)];
    let month = 0;

    while (balance > 0 && month < 600) {
      month++;
      const interest = balance * r;
      totalInterest += interest;
      const principalPayment = Math.min(balance, (monthlyPayment + extraMonthly) - interest);
      balance -= Math.max(0, principalPayment);
      balances.push(Math.max(0, balance));
    }

    return { totalInterest, months: month, balances };
  }

  function drawChart(origBalances, newBalances) {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const maxVal = origBalances[0] || 1;
    const maxMonths = Math.max(origBalances.length, newBalances.length);

    const padding = 20;
    const plotW = width - (padding * 2);
    const plotH = height - (padding * 2);

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    function getX(m) {
      return padding + (m / maxMonths) * plotW;
    }
    function getY(v) {
      return height - padding - (v / maxVal) * plotH;
    }

    // Original balance line (Blue)
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    origBalances.forEach((b, i) => {
      const x = getX(i);
      const y = getY(b);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // New balance line (Green)
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();
    newBalances.forEach((b, i) => {
      const x = getX(i);
      const y = getY(b);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  function formatDateFromNow(monthsAhead) {
    const d = new Date();
    d.setMonth(d.getMonth() + monthsAhead);
    const mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return mNames[d.getMonth()] + " " + d.getFullYear();
  }

  function calc() {
    const balance = parseFloat(balanceInput.value) || 0;
    const ratePct = parseFloat(rateInput.value) || 0;
    const termYears = parseFloat(termInput.value) || 0;
    const extraMonthly = parseFloat(extraInput.value) || 0;
    const lumpSum = parseFloat(lumpInput.value) || 0;

    const totalMonths = termYears * 12;
    const stdPayment = calcStandardPayment(balance, ratePct, termYears);

    const orig = calcAmortization(balance, ratePct, totalMonths, stdPayment, 0, 0);
    const newAmort = calcAmortization(balance, ratePct, totalMonths, stdPayment, extraMonthly, lumpSum);

    const interestSaved = Math.max(0, orig.totalInterest - newAmort.totalInterest);
    const monthsSaved = Math.max(0, orig.months - newAmort.months);

    outSaved.textContent = formatCurrency(interestSaved);
    outMonthsSaved.textContent = monthsSaved;
    outPayoff.textContent = formatDateFromNow(newAmort.months);
    outOrigPayoff.textContent = formatDateFromNow(orig.months);
    outPayment.textContent = formatCurrency(stdPayment) + "/mo";
    outTotalInt.textContent = formatCurrency(orig.totalInterest);
    outNewInt.textContent = formatCurrency(newAmort.totalInterest);

    drawChart(orig.balances, newAmort.balances);
  }

  [balanceInput, rateInput, termInput, extraInput, lumpInput].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
