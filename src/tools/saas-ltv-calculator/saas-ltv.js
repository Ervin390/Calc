(function () {
    const elArpu = document.getElementById('ltv-arpu');
    const elChurn = document.getElementById('ltv-churn');
    const elMargin = document.getElementById('ltv-margin');

    const outGross = document.getElementById('out-ltv-gross');
    const outLifespan = document.getElementById('out-ltv-lifespan');
    const outNet = document.getElementById('out-ltv-net');
    const outAnnual = document.getElementById('out-ltv-annual');

    function formatCurrency(val) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
    }

    function calculate() {
        const arpu = parseFloat(elArpu.value) || 0;
        const churnPct = parseFloat(elChurn.value) || 0;
        const marginPct = parseFloat(elMargin.value) || 0;

        if (churnPct <= 0 || arpu <= 0) {
            outGross.textContent = '$0.00';
            outLifespan.textContent = '0.0 months';
            outNet.textContent = '$0.00';
            outAnnual.textContent = '$0.00';
            return;
        }

        const churnDecimal = churnPct / 100;
        const marginDecimal = marginPct / 100;

        const lifespanMonths = 1 / churnDecimal;
        const grossLtv = arpu / churnDecimal;
        const netLtv = grossLtv * marginDecimal;
        const annualArpu = arpu * 12;

        outGross.textContent = formatCurrency(grossLtv);
        outLifespan.textContent = lifespanMonths.toFixed(1) + ' months';
        outNet.textContent = formatCurrency(netLtv);
        outAnnual.textContent = formatCurrency(annualArpu);
    }

    [elArpu, elChurn, elMargin].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
