(function () {
    'use strict';

    const costInput = document.getElementById('mc-cost');
    const revenueInput = document.getElementById('mc-revenue');
    const marginPctInput = document.getElementById('mc-margin-pct');
    const markupPctInput = document.getElementById('mc-markup-pct');
    const modeSelect = document.getElementById('mc-mode');

    const groupCostRev = document.getElementById('mc-group-cost-rev');
    const groupCostMargin = document.getElementById('mc-group-cost-margin');
    const groupCostMarkup = document.getElementById('mc-group-cost-markup');

    const outProfit = document.getElementById('out-mc-profit');
    const outMargin = document.getElementById('out-mc-margin');
    const outMarkup = document.getElementById('out-mc-markup');
    const outRevenue = document.getElementById('out-mc-revenue');
    const outCostRatio = document.getElementById('out-mc-cost-ratio');

    function formatCurrency(val) {
        if (isNaN(val) || !isFinite(val)) return '$0.00';
        return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function formatPercent(val) {
        if (isNaN(val) || !isFinite(val)) return '0.00%';
        return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
    }

    function calculate() {
        const mode = modeSelect ? modeSelect.value : 'cost-revenue';
        const cost = parseFloat(costInput.value) || 0;

        let profit = 0;
        let revenue = 0;
        let marginPct = 0;
        let markupPct = 0;
        let costRatio = 0;

        if (mode === 'cost-revenue') {
            revenue = parseFloat(revenueInput.value) || 0;
            profit = revenue - cost;
            marginPct = revenue > 0 ? (profit / revenue) * 100 : 0;
            markupPct = cost > 0 ? (profit / cost) * 100 : 0;
            costRatio = revenue > 0 ? (cost / revenue) * 100 : 0;
        } else if (mode === 'cost-margin') {
            marginPct = parseFloat(marginPctInput.value) || 0;
            if (marginPct >= 100) {
                // Margin cannot be 100% or greater when cost > 0
                revenue = 0;
                profit = 0;
                markupPct = 0;
                costRatio = 100;
            } else {
                revenue = cost / (1 - marginPct / 100);
                profit = revenue - cost;
                markupPct = cost > 0 ? (profit / cost) * 100 : 0;
                costRatio = revenue > 0 ? (cost / revenue) * 100 : 0;
            }
        } else if (mode === 'cost-markup') {
            markupPct = parseFloat(markupPctInput.value) || 0;
            profit = cost * (markupPct / 100);
            revenue = cost + profit;
            marginPct = revenue > 0 ? (profit / revenue) * 100 : 0;
            costRatio = revenue > 0 ? (cost / revenue) * 100 : 0;
        }

        if (outProfit) outProfit.textContent = formatCurrency(profit);
        if (outMargin) outMargin.textContent = formatPercent(marginPct);
        if (outMarkup) outMarkup.textContent = formatPercent(markupPct);
        if (outRevenue) outRevenue.textContent = formatCurrency(revenue);
        if (outCostRatio) outCostRatio.textContent = formatPercent(costRatio);
    }

    function updateModeVisibility() {
        const mode = modeSelect ? modeSelect.value : 'cost-revenue';

        if (groupCostRev) groupCostRev.style.display = mode === 'cost-revenue' ? 'block' : 'none';
        if (groupCostMargin) groupCostMargin.style.display = mode === 'cost-margin' ? 'block' : 'none';
        if (groupCostMarkup) groupCostMarkup.style.display = mode === 'cost-markup' ? 'block' : 'none';

        calculate();
    }

    if (modeSelect) {
        modeSelect.addEventListener('change', updateModeVisibility);
    }

    [costInput, revenueInput, marginPctInput, markupPctInput].forEach(input => {
        if (input) {
            input.addEventListener('input', calculate);
        }
    });

    updateModeVisibility();
})();
