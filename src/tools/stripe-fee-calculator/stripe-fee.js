document.addEventListener('DOMContentLoaded', () => {
    const inputAmount = document.getElementById('sf-amount');
    const rateOption = document.getElementById('sf-rate-option');
    const customRateBlock = document.getElementById('sf-custom-rate-inputs');
    const customPct = document.getElementById('sf-custom-pct');
    const customFixed = document.getElementById('sf-custom-fixed');
    
    const modeStandard = document.getElementById('sf-mode-standard');
    const modeReverse = document.getElementById('sf-mode-reverse');
    
    const mainPayoutLabel = document.getElementById('sf-main-payout-label');
    const mainOutput = document.getElementById('sf-main-output');
    const mainSubtext = document.getElementById('sf-main-subtext');
    
    const bdOriginal = document.getElementById('sf-breakdown-original');
    const bdFees = document.getElementById('sf-breakdown-fees');
    const bdRatePct = document.getElementById('sf-breakdown-rate-pct');
    const bdPctAmount = document.getElementById('sf-breakdown-pct-amount');
    const bdFixedAmount = document.getElementById('sf-breakdown-fixed-amount');

    let currentMode = 'standard'; // standard or reverse

    // Rate configurations
    const rates = {
        'us-standard': { percent: 2.9, fixed: 0.30 },
        'intl': { percent: 3.9, fixed: 0.30 },
        'us-keyed': { percent: 3.5, fixed: 0.30 },
        'us-ach': { percent: 0.8, fixed: 0, cap: 5.00 },
        'custom': { percent: 2.9, fixed: 0.30 }
    };

    function getSelectedRate() {
        const option = rateOption.value;
        if (option === 'custom') {
            return {
                percent: parseFloat(customPct.value) || 0,
                fixed: parseFloat(customFixed.value) || 0,
                cap: null
            };
        }
        return rates[option] || rates['us-standard'];
    }

    function formatCurrency(val) {
        return '$' + val.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function calculate() {
        const amount = parseFloat(inputAmount.value) || 0;
        const rate = getSelectedRate();
        
        let calculatedFee = 0;
        let finalAmount = 0;
        let pctFee = 0;
        let fixedFee = rate.fixed;

        if (currentMode === 'standard') {
            // Standard: User enters payment amount, client calculates payout
            // fee = amount * pct + fixed
            pctFee = amount * (rate.percent / 100);
            calculatedFee = pctFee + fixedFee;
            if (rate.cap !== null && rate.cap !== undefined) {
                if (calculatedFee > rate.cap) {
                    calculatedFee = rate.cap;
                    // Adjust pctFee for display comparison
                    pctFee = rate.cap;
                    fixedFee = 0;
                }
            }
            finalAmount = Math.max(0, amount - calculatedFee);

            mainPayoutLabel.textContent = 'You Receive (Net Payout)';
            mainOutput.textContent = formatCurrency(finalAmount);
            mainSubtext.textContent = `from a ${formatCurrency(amount)} charge`;
            
            bdOriginal.textContent = formatCurrency(amount);
            bdFees.textContent = `-${formatCurrency(calculatedFee)}`;
            bdFees.style.color = 'var(--danger)';
        } else {
            // Reverse: User enters target payout, we calculate required charge
            // target = charge - (charge * pct + fixed)
            // charge = (target + fixed) / (1 - pct)
            const pctDec = rate.percent / 100;
            if (rate.cap !== null && rate.cap !== undefined) {
                // For ACH capped fee
                const uncappedCharge = (amount + fixedFee) / (1 - pctDec);
                const testFee = uncappedCharge * pctDec;
                if (testFee > rate.cap) {
                    calculatedFee = rate.cap;
                    finalAmount = amount + rate.cap;
                    pctFee = rate.cap;
                    fixedFee = 0;
                } else {
                    finalAmount = uncappedCharge;
                    calculatedFee = finalAmount - amount;
                    pctFee = calculatedFee;
                    fixedFee = 0;
                }
            } else {
                if (pctDec >= 1) {
                    finalAmount = 0;
                    calculatedFee = 0;
                } else {
                    finalAmount = (amount + fixedFee) / (1 - pctDec);
                    calculatedFee = finalAmount - amount;
                    pctFee = finalAmount * pctDec;
                }
            }

            mainPayoutLabel.textContent = 'You Must Charge (Total)';
            mainOutput.textContent = formatCurrency(finalAmount);
            mainSubtext.textContent = `to receive a ${formatCurrency(amount)} payout`;
            
            bdOriginal.textContent = formatCurrency(finalAmount);
            bdFees.textContent = `-${formatCurrency(calculatedFee)}`;
            bdFees.style.color = 'var(--danger)';
        }

        bdRatePct.textContent = `${rate.percent}%`;
        bdPctAmount.textContent = formatCurrency(pctFee);
        bdFixedAmount.textContent = formatCurrency(fixedFee);
    }

    // Event listeners
    inputAmount.addEventListener('input', calculate);
    rateOption.addEventListener('change', () => {
        if (rateOption.value === 'custom') {
            customRateBlock.style.display = 'block';
        } else {
            customRateBlock.style.display = 'none';
        }
        calculate();
    });
    customPct.addEventListener('input', calculate);
    customFixed.addEventListener('input', calculate);

    modeStandard.addEventListener('click', () => {
        currentMode = 'standard';
        modeStandard.classList.add('active');
        modeStandard.classList.remove('secondary');
        modeReverse.classList.add('secondary');
        modeReverse.classList.remove('active');
        document.getElementById('sf-mode-hint').textContent = 'Calculates the net payout you will receive from a total payment.';
        calculate();
    });

    modeReverse.addEventListener('click', () => {
        currentMode = 'reverse';
        modeReverse.classList.add('active');
        modeReverse.classList.remove('secondary');
        modeStandard.classList.add('secondary');
        modeStandard.classList.remove('active');
        document.getElementById('sf-mode-hint').textContent = 'Calculates the exact billing target amount needed to clear your target net earnings.';
        calculate();
    });

    // Run initial calculation
    calculate();
});
