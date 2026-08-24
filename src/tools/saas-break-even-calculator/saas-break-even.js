(function () {
    const elFixed = document.getElementById('be-fixed');
    const elArpu = document.getElementById('be-arpu');
    const elMargin = document.getElementById('be-margin');
    const elCurrent = document.getElementById('be-current');

    const outCustomers = document.getElementById('out-be-customers');
    const outMrr = document.getElementById('out-be-mrr');
    const outGap = document.getElementById('out-be-gap');
    const outProfit = document.getElementById('out-be-profit');

    function formatCurrency(val) {
        const prefix = val < 0 ? '-$' : '$';
        const absVal = Math.abs(val);
        return prefix + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(absVal);
    }

    function calculate() {
        const fixed = parseFloat(elFixed.value) || 0;
        const arpu = parseFloat(elArpu.value) || 0;
        const marginPct = parseFloat(elMargin.value) || 0;
        const currentSubscribers = parseInt(elCurrent.value, 10) || 0;

        if (fixed <= 0 || arpu <= 0 || marginPct <= 0) {
            outCustomers.textContent = '0 accounts';
            outMrr.textContent = '$0.00';
            outGap.textContent = '0 accounts';
            outProfit.textContent = '$0.00';
            return;
        }

        const marginDecimal = marginPct / 100;
        const netMarginPerUser = arpu * marginDecimal;
        const breakEvenCustomers = Math.ceil(fixed / netMarginPerUser);
        const breakEvenMrr = breakEvenCustomers * arpu;

        const gap = breakEvenCustomers - currentSubscribers;
        const currentMarginProfit = currentSubscribers * netMarginPerUser;
        const netMonthlyProfit = currentMarginProfit - fixed;

        outCustomers.textContent = breakEvenCustomers.toLocaleString('en-US') + ' accounts';
        outMrr.textContent = formatCurrency(breakEvenMrr);

        if (gap > 0) {
            outGap.textContent = gap.toLocaleString('en-US') + ' more needed';
            outGap.style.color = '#dc2626';
        } else if (gap === 0) {
            outGap.textContent = 'At Break-Even';
            outGap.style.color = '#2563eb';
        } else {
            outGap.textContent = Math.abs(gap).toLocaleString('en-US') + ' surplus accounts';
            outGap.style.color = '#059669';
        }

        outProfit.textContent = formatCurrency(netMonthlyProfit);
        if (netMonthlyProfit >= 0) {
            outProfit.style.color = '#059669';
        } else {
            outProfit.style.color = '#dc2626';
        }
    }

    [elFixed, elArpu, elMargin, elCurrent].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
