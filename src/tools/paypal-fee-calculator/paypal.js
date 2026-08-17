(function () {
    'use strict';

    const amountInput = document.getElementById('pf-amount');
    const rateOptionSelect = document.getElementById('pf-rate-option');
    const customInputsDiv = document.getElementById('pf-custom-rate-inputs');
    const customPctInput = document.getElementById('pf-custom-pct');
    const customFixedInput = document.getElementById('pf-custom-fixed');

    const modeStandardBtn = document.getElementById('pf-mode-standard');
    const modeReverseBtn = document.getElementById('pf-mode-reverse');
    const modeHintP = document.getElementById('pf-mode-hint');

    const mainPayoutLabel = document.getElementById('pf-main-payout-label');
    const mainOutputDiv = document.getElementById('pf-main-output');
    const mainSubtextP = document.getElementById('pf-main-subtext');

    const breakdownOriginalSpan = document.getElementById('pf-breakdown-original');
    const breakdownFeesSpan = document.getElementById('pf-breakdown-fees');
    const breakdownRatePctSpan = document.getElementById('pf-breakdown-rate-pct');
    const breakdownPctAmountDiv = document.getElementById('pf-breakdown-pct-amount');
    const breakdownFixedAmountDiv = document.getElementById('pf-breakdown-fixed-amount');

    let currentMode = 'standard';

    const RATES = {
        'us-standard': { pct: 3.49, fixed: 0.49 },
        'intl': { pct: 4.99, fixed: 0.49 },
        'keyed': { pct: 3.49, fixed: 0.49 },
        'qr-high': { pct: 1.90, fixed: 0.10 },
        'qr-low': { pct: 2.40, fixed: 0.05 },
        'micro': { pct: 5.00, fixed: 0.05 }
    };

    function formatCurrency(val) {
        if (isNaN(val) || !isFinite(val)) return '$0.00';
        return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function getRateValues() {
        const sel = rateOptionSelect ? rateOptionSelect.value : 'us-standard';
        if (sel === 'custom') {
            return {
                pct: parseFloat(customPctInput.value) || 0,
                fixed: parseFloat(customFixedInput.value) || 0
            };
        }
        return RATES[sel] || RATES['us-standard'];
    }

    function calculate() {
        const inputAmount = parseFloat(amountInput.value) || 0;
        const rate = getRateValues();
        const pctDec = rate.pct / 100;

        if (currentMode === 'standard') {
            const feePctAmount = inputAmount * pctDec;
            const totalFee = feePctAmount + rate.fixed;
            const netPayout = Math.max(0, inputAmount - totalFee);

            if (mainPayoutLabel) mainPayoutLabel.textContent = 'You Receive (Net Payout)';
            if (mainOutputDiv) mainOutputDiv.textContent = formatCurrency(netPayout);
            if (mainSubtextP) mainSubtextP.textContent = `from a ${formatCurrency(inputAmount)} payment`;

            if (breakdownOriginalSpan) breakdownOriginalSpan.textContent = formatCurrency(inputAmount);
            if (breakdownFeesSpan) breakdownFeesSpan.textContent = `-${formatCurrency(totalFee)}`;
            if (breakdownRatePctSpan) breakdownRatePctSpan.textContent = `${rate.pct}%`;
            if (breakdownPctAmountDiv) breakdownPctAmountDiv.textContent = formatCurrency(feePctAmount);
            if (breakdownFixedAmountDiv) breakdownFixedAmountDiv.textContent = formatCurrency(rate.fixed);
        } else {
            // Reverse mode: calculate required gross invoice to clear inputAmount net
            const grossInvoice = (inputAmount + rate.fixed) / Math.max(0.0001, 1 - pctDec);
            const feePctAmount = grossInvoice * pctDec;
            const totalFee = grossInvoice - inputAmount;

            if (mainPayoutLabel) mainPayoutLabel.textContent = 'You Must Charge (Gross Invoice)';
            if (mainOutputDiv) mainOutputDiv.textContent = formatCurrency(grossInvoice);
            if (mainSubtextP) mainSubtextP.textContent = `to receive exactly ${formatCurrency(inputAmount)} net`;

            if (breakdownOriginalSpan) breakdownOriginalSpan.textContent = formatCurrency(inputAmount);
            if (breakdownFeesSpan) breakdownFeesSpan.textContent = `+${formatCurrency(totalFee)}`;
            if (breakdownRatePctSpan) breakdownRatePctSpan.textContent = `${rate.pct}%`;
            if (breakdownPctAmountDiv) breakdownPctAmountDiv.textContent = formatCurrency(feePctAmount);
            if (breakdownFixedAmountDiv) breakdownFixedAmountDiv.textContent = formatCurrency(rate.fixed);
        }
    }

    function toggleMode(mode) {
        currentMode = mode;
        if (mode === 'standard') {
            if (modeStandardBtn) {
                modeStandardBtn.classList.add('active');
                modeStandardBtn.classList.remove('secondary');
            }
            if (modeReverseBtn) {
                modeReverseBtn.classList.remove('active');
                modeReverseBtn.classList.add('secondary');
            }
            if (modeHintP) modeHintP.textContent = 'Calculates the net payout you will receive from a total payment.';
        } else {
            if (modeReverseBtn) {
                modeReverseBtn.classList.add('active');
                modeReverseBtn.classList.remove('secondary');
            }
            if (modeStandardBtn) {
                modeStandardBtn.classList.remove('active');
                modeStandardBtn.classList.add('secondary');
            }
            if (modeHintP) modeHintP.textContent = 'Calculates the exact billing amount to invoice to clear your target net payout.';
        }
        calculate();
    }

    function updateRateVisibility() {
        const isCustom = rateOptionSelect && rateOptionSelect.value === 'custom';
        if (customInputsDiv) customInputsDiv.style.display = isCustom ? 'block' : 'none';
        calculate();
    }

    if (rateOptionSelect) rateOptionSelect.addEventListener('change', updateRateVisibility);
    if (modeStandardBtn) modeStandardBtn.addEventListener('click', () => toggleMode('standard'));
    if (modeReverseBtn) modeReverseBtn.addEventListener('click', () => toggleMode('reverse'));

    [amountInput, customPctInput, customFixedInput].forEach(inp => {
        if (inp) inp.addEventListener('input', calculate);
    });

    updateRateVisibility();
})();
