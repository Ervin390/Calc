(function () {
    const elStart = document.getElementById('nrr-start');
    const elExpansion = document.getElementById('nrr-expansion');
    const elContraction = document.getElementById('nrr-contraction');
    const elChurn = document.getElementById('nrr-churn');

    const outMain = document.getElementById('out-nrr-main');
    const outEnding = document.getElementById('out-nrr-ending');
    const outGrr = document.getElementById('out-nrr-grr');
    const outDelta = document.getElementById('out-nrr-delta');

    function formatCurrency(val) {
        const prefix = val < 0 ? '-$' : '$';
        const absVal = Math.abs(val);
        return prefix + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(absVal);
    }

    function calculate() {
        const startMrr = parseFloat(elStart.value) || 0;
        const expansion = parseFloat(elExpansion.value) || 0;
        const contraction = parseFloat(elContraction.value) || 0;
        const churn = parseFloat(elChurn.value) || 0;

        if (startMrr <= 0) {
            outMain.textContent = '0.00%';
            outEnding.textContent = '$0.00';
            outGrr.textContent = '0.00%';
            outDelta.textContent = '$0.00';
            return;
        }

        const endingMrr = startMrr + expansion - contraction - churn;
        const netDelta = expansion - contraction - churn;
        const nrrPct = (endingMrr / startMrr) * 100;
        const grrMrr = Math.max(0, startMrr - contraction - churn);
        const grrPct = (grrMrr / startMrr) * 100;

        outMain.textContent = nrrPct.toFixed(2) + '%';
        outEnding.textContent = formatCurrency(endingMrr);
        outGrr.textContent = grrPct.toFixed(2) + '%';
        outDelta.textContent = (netDelta >= 0 ? '+' : '') + formatCurrency(netDelta);
    }

    [elStart, elExpansion, elContraction, elChurn].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
