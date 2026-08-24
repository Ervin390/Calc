(function () {
    const elMode = document.getElementById('arr-mode');
    const elMrrVal = document.getElementById('arr-mrr-val');
    const elTcvVal = document.getElementById('arr-tcv-val');
    const elMonthsVal = document.getElementById('arr-months-val');
    const elSubscribers = document.getElementById('arr-subscribers');

    const groupMrr = document.getElementById('arr-group-mrr');
    const groupContract = document.getElementById('arr-group-contract');

    const outMain = document.getElementById('out-arr-main');
    const outMrr = document.getElementById('out-arr-mrr');
    const outAcv = document.getElementById('out-arr-acv');
    const outArpu = document.getElementById('out-arr-arpu');

    function formatCurrency(val) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
    }

    function toggleMode() {
        const mode = elMode.value;
        if (mode === 'contract') {
            groupMrr.style.display = 'none';
            groupContract.style.display = 'block';
        } else {
            groupMrr.style.display = 'block';
            groupContract.style.display = 'none';
        }
        calculate();
    }

    function calculate() {
        const mode = elMode.value;
        const subscribers = parseInt(elSubscribers.value, 10) || 0;
        let arr = 0;
        let mrr = 0;

        if (mode === 'contract') {
            const tcv = parseFloat(elTcvVal.value) || 0;
            const months = parseInt(elMonthsVal.value, 10) || 1;
            if (months > 0) {
                mrr = tcv / months;
                arr = mrr * 12;
            }
        } else {
            mrr = parseFloat(elMrrVal.value) || 0;
            arr = mrr * 12;
        }

        const acv = subscribers > 0 ? arr / subscribers : 0;
        const arpu = subscribers > 0 ? mrr / subscribers : 0;

        outMain.textContent = formatCurrency(arr);
        outMrr.textContent = formatCurrency(mrr);
        outAcv.textContent = formatCurrency(acv);
        outArpu.textContent = formatCurrency(arpu);
    }

    elMode.addEventListener('change', toggleMode);
    [elMrrVal, elTcvVal, elMonthsVal, elSubscribers].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
