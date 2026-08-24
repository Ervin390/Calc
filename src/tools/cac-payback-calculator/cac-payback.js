(function () {
    const elCac = document.getElementById('payback-cac');
    const elArpu = document.getElementById('payback-arpu');
    const elMargin = document.getElementById('payback-margin');

    const outMonths = document.getElementById('out-payback-months');
    const outStatus = document.getElementById('out-payback-status');
    const outMarginArpu = document.getElementById('out-payback-margin-arpu');
    const outYears = document.getElementById('out-payback-years');

    function formatCurrency(val) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
    }

    function calculate() {
        const cac = parseFloat(elCac.value) || 0;
        const arpu = parseFloat(elArpu.value) || 0;
        const marginPct = parseFloat(elMargin.value) || 0;

        if (cac <= 0 || arpu <= 0 || marginPct <= 0) {
            outMonths.textContent = '0.0 months';
            outStatus.textContent = 'Invalid Input';
            outStatus.style.color = 'var(--text-muted)';
            outMarginArpu.textContent = '$0.00';
            outYears.textContent = '0.00 years';
            return;
        }

        const marginDecimal = marginPct / 100;
        const monthlyMarginProfit = arpu * marginDecimal;
        const paybackMonths = cac / monthlyMarginProfit;
        const paybackYears = paybackMonths / 12;

        outMonths.textContent = paybackMonths.toFixed(1) + ' months';
        outMarginArpu.textContent = formatCurrency(monthlyMarginProfit);
        outYears.textContent = paybackYears.toFixed(2) + ' years';

        if (paybackMonths <= 12) {
            outStatus.textContent = 'Excellent (Under 12 Months)';
            outStatus.style.color = '#059669';
        } else if (paybackMonths <= 18) {
            outStatus.textContent = 'Good (12-18 Months)';
            outStatus.style.color = '#2563eb';
        } else if (paybackMonths <= 24) {
            outStatus.textContent = 'Acceptable (18-24 Months)';
            outStatus.style.color = '#d97706';
        } else {
            outStatus.textContent = 'High Cash Drag (Over 24 Months)';
            outStatus.style.color = '#dc2626';
        }
    }

    [elCac, elArpu, elMargin].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
