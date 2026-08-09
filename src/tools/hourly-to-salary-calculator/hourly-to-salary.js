document.addEventListener('DOMContentLoaded', () => {
    const selectMode  = document.getElementById('hts-mode');
    const inputAmount = document.getElementById('hts-amount');
    const inputHours  = document.getElementById('hts-hours');
    const inputWeeks  = document.getElementById('hts-weeks');
    const outTable    = document.getElementById('out-hts-table');
    const outHourly   = document.getElementById('out-hts-hourly');

    function fmt(n) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
    }

    function toAnnual(amount, mode, hours, weeks) {
        switch (mode) {
            case 'hourly':    return amount * hours * weeks;
            case 'weekly':    return amount * weeks;
            case 'biweekly':  return amount * 26;
            case 'monthly':   return amount * 12;
            case 'annual':    return amount;
            default:          return amount;
        }
    }

    function calculate() {
        const amount = parseFloat(inputAmount.value) || 0;
        const hours  = parseFloat(inputHours.value)  || 40;
        const weeks  = parseFloat(inputWeeks.value)  || 52;
        const mode   = selectMode.value;

        const annual   = toAnnual(amount, mode, hours, weeks);
        const days     = weeks * 5;
        const hourly   = annual / (hours * weeks);

        const rows = [
            { label: 'Hourly',      value: hourly },
            { label: 'Daily (8hr)', value: hourly * 8 },
            { label: 'Weekly',      value: annual / weeks },
            { label: 'Bi-Weekly',   value: annual / 26 },
            { label: 'Semi-Monthly (2x/month)', value: annual / 24 },
            { label: 'Monthly',     value: annual / 12 },
            { label: 'Annually',    value: annual },
        ];

        outTable.innerHTML = rows.map(r => `
            <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 0.5rem; color: #374151;">${r.label}</td>
                <td style="padding: 0.5rem; text-align: right; font-weight: 600; color: #111827;">${fmt(r.value)}</td>
            </tr>`).join('');

        outHourly.textContent = fmt(hourly) + ' / hr';
    }

    [selectMode, inputAmount, inputHours, inputWeeks].forEach(el => {
        el.addEventListener('input', calculate);
        el.addEventListener('change', calculate);
    });

    // localStorage
    ['hts-amount', 'hts-hours', 'hts-weeks'].forEach(id => {
        const saved = localStorage.getItem(id);
        if (saved) document.getElementById(id).value = saved;
        document.getElementById(id).addEventListener('change', () => {
            localStorage.setItem(id, document.getElementById(id).value);
        });
    });

    calculate();
});
