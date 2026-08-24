(function () {
  "use strict";

  const modeSelect = document.getElementById("sc-mode");
  const dealInput = document.getElementById("sc-deal");
  const flatRateInput = document.getElementById("sc-flat-rate");
  const quotaInput = document.getElementById("sc-quota");
  const t1RateInput = document.getElementById("sc-t1-rate");
  const t2RateInput = document.getElementById("sc-t2-rate");
  const t3RateInput = document.getElementById("sc-t3-rate");
  const baseInput = document.getElementById("sc-base");
  const bonusRateInput = document.getElementById("sc-bonus-rate");

  const flatWrap = document.getElementById("sc-flat-inputs");
  const tieredWrap = document.getElementById("sc-tiered-inputs");
  const bonusWrap = document.getElementById("sc-bonus-inputs");

  const outCommission = document.getElementById("out-sc-commission");
  const outEffective = document.getElementById("out-sc-effective");
  const outTotal = document.getElementById("out-sc-total");
  const outAnnual = document.getElementById("out-sc-annual");
  const tierBreakdownWrap = document.getElementById("out-sc-tier-breakdown");
  const tierDetail = document.getElementById("out-sc-tier-detail");

  function formatCurrency(val) {
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    const mode = modeSelect.value;
    const deal = parseFloat(dealInput.value) || 0;

    flatWrap.style.display = (mode === "flat") ? "block" : "none";
    tieredWrap.style.display = (mode === "tiered") ? "block" : "none";
    bonusWrap.style.display = (mode === "bonus") ? "block" : "none";
    tierBreakdownWrap.style.display = (mode === "tiered") ? "block" : "none";

    let commission = 0;
    let baseSalary = 0;

    if (mode === "flat") {
      const rate = (parseFloat(flatRateInput.value) || 0) / 100;
      commission = deal * rate;
    } else if (mode === "tiered") {
      const quota = parseFloat(quotaInput.value) || 100000;
      const t1Rate = (parseFloat(t1RateInput.value) || 0) / 100;
      const t2Rate = (parseFloat(t2RateInput.value) || 0) / 100;
      const t3Rate = (parseFloat(t3RateInput.value) || 0) / 100;

      const t1Cap = quota * 0.5;
      const t2Cap = quota;

      let c1 = 0, c2 = 0, c3 = 0;
      if (deal <= t1Cap) {
        c1 = deal * t1Rate;
      } else if (deal <= t2Cap) {
        c1 = t1Cap * t1Rate;
        c2 = (deal - t1Cap) * t2Rate;
      } else {
        c1 = t1Cap * t1Rate;
        c2 = (t2Cap - t1Cap) * t2Rate;
        c3 = (deal - t2Cap) * t3Rate;
      }

      commission = c1 + c2 + c3;
      tierDetail.innerHTML =
        "Tier 1 (0-50%): " + formatCurrency(c1) + "<br>" +
        "Tier 2 (50-100%): " + formatCurrency(c2) + "<br>" +
        "Tier 3 (>100%): " + formatCurrency(c3);
    } else if (mode === "bonus") {
      baseSalary = parseFloat(baseInput.value) || 0;
      const bonusRate = (parseFloat(bonusRateInput.value) || 0) / 100;
      commission = deal * bonusRate;
    }

    const effectiveRate = deal > 0 ? (commission / deal) * 100 : 0;
    const totalComp = baseSalary + commission;
    const annualProjected = baseSalary + (commission * 4); // assuming quarterly pace

    outCommission.textContent = formatCurrency(commission);
    outEffective.textContent = effectiveRate.toFixed(2) + "%";
    outTotal.textContent = formatCurrency(totalComp);
    outAnnual.textContent = formatCurrency(annualProjected);
  }

  [modeSelect, dealInput, flatRateInput, quotaInput, t1RateInput, t2RateInput, t3RateInput, baseInput, bonusRateInput].forEach(el => {
    if (el) {
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    }
  });

  calc();
})();
