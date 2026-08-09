document.addEventListener('DOMContentLoaded', () => {
    const inputRate     = document.getElementById('tah-rate');
    const inputRegular  = document.getElementById('tah-regular');
    const inputOvertime = document.getElementById('tah-overtime');

    const outTotal       = document.getElementById('out-tah-total');
    const outRegular     = document.getElementById('out-tah-regular');
    const outRegularRate = document.getElementById('out-tah-regular-rate');
    const outOt          = document.getElementById('out-tah-ot');
    const outOtRate      = document.getElementById('out-tah-ot-rate');
    const outOtHourly    = document.getElementById('out-tah-ot-hourly');
    const outAnnual      = document.getElementById('out-tah-annual');

    function fmt(n) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
    }

    function calculate() {
        const rate     = parseFloat(inputRate.value)     || 0;
        const regular  = parseFloat(inputRegular.value)  || 0;
        const overtime = parseFloat(inputOvertime.value) || 0;

        const otRate       = rate * 1.5;
        const regularPay   = rate * regular;
        const overtimePay  = otRate * overtime;
        const totalPay     = regularPay + overtimePay;

        // Annualise: assume same workweek repeated 52 weeks
        const totalHoursPerWeek = regular + overtime;
        const annualEstimate = totalPay * 52;

        outTotal.textContent       = fmt(totalPay);
        outRegular.textContent     = fmt(regularPay);
        outRegularRate.textContent = regular > 0 ? `${regular} hrs @ ${fmt(rate)}/hr` : '';
        outOt.textContent          = fmt(overtimePay);
        outOtRate.textContent      = overtime > 0 ? `${overtime} hrs @ ${fmt(otRate)}/hr` : '';
        outOtHourly.textContent    = fmt(otRate) + ' / hr';
        outAnnual.textContent      = fmt(annualEstimate);
    }

    [inputRate, inputRegular, inputOvertime].forEach(el => {
        el.addEventListener('input', calculate);
    });

    // Restore from localStorage
    ['tah-rate', 'tah-regular', 'tah-overtime'].forEach(id => {
        const saved = localStorage.getItem(id);
        if (saved) document.getElementById(id).value = saved;
        document.getElementById(id).addEventListener('change', () => {
            localStorage.setItem(id, document.getElementById(id).value);
        });
    });

    calculate();
});
