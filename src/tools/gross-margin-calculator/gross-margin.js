(function () {
    const elRevenue = document.getElementById('gm-revenue');
    const elCogs = document.getElementById('gm-cogs');

    const outPct = document.getElementById('out-gm-pct');
    const outProfit = document.getElementById('out-gm-profit');
    const outCogsRatio = document.getElementById('out-gm-cogs-ratio');
    const outMarkup = document.getElementById('out-gm-markup');

    function formatCurrency(val) {
        const prefix = val < 0 ? '-$' : '$';
        const absVal = Math.abs(val);
        return prefix + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(absVal);
    }

    function calculate() {
        const revenue = parseFloat(elRevenue.value) || 0;
        const cogs = parseFloat(elCogs.value) || 0;

        if (revenue <= 0) {
            outPct.textContent = '0.00%';
            outProfit.textContent = '$0.00';
            outCogsRatio.textContent = '0.00%';
            outMarkup.textContent = '0.00%';
            return;
        }

        const grossProfit = revenue - cogs;
        const marginPct = (grossProfit / revenue) * 100;
        const cogsRatioPct = (cogs / revenue) * 100;
        const markupPct = cogs > 0 ? (grossProfit / cogs) * 100 : 0;

        outPct.textContent = marginPct.toFixed(2) + '%';
        outProfit.textContent = formatCurrency(grossProfit);
        outCogsRatio.textContent = cogsRatioPct.toFixed(2) + '%';
        outMarkup.textContent = cogs > 0 ? markupPct.toFixed(2) + '%' : 'N/A';
    }

    [elRevenue, elCogs].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
