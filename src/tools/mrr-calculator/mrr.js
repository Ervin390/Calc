(function () {
    const elSubscribers = document.getElementById('mrr-subscribers');
    const elArpu = document.getElementById('mrr-arpu');
    const elAddons = document.getElementById('mrr-addons');

    const outTotal = document.getElementById('out-mrr-total');
    const outArr = document.getElementById('out-mrr-arr');
    const outBlendedArpu = document.getElementById('out-mrr-blended-arpu');
    const outDaily = document.getElementById('out-mrr-daily');

    function formatCurrency(val) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
    }

    function calculate() {
        const subscribers = parseInt(elSubscribers.value, 10) || 0;
        const arpu = parseFloat(elArpu.value) || 0;
        const addons = parseFloat(elAddons.value) || 0;

        const baseMrr = subscribers * arpu;
        const totalMrr = baseMrr + addons;
        const arr = totalMrr * 12;
        const blendedArpu = subscribers > 0 ? totalMrr / subscribers : 0;
        const dailyAverage = totalMrr / 30;

        outTotal.textContent = formatCurrency(totalMrr);
        outArr.textContent = formatCurrency(arr);
        outBlendedArpu.textContent = formatCurrency(blendedArpu);
        outDaily.textContent = formatCurrency(dailyAverage);
    }

    [elSubscribers, elArpu, elAddons].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
