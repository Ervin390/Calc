document.addEventListener('DOMContentLoaded', () => {
    const inputCurrent   = document.getElementById('pr-current');
    const selectType     = document.getElementById('pr-type');
    const selectMode     = document.getElementById('pr-raise-mode');
    const inputRaise     = document.getElementById('pr-raise');
    const inputHours     = document.getElementById('pr-hours');
    const hoursWrap      = document.getElementById('pr-hours-wrap');

    const outNewAnnual   = document.getElementById('out-pr-new-annual');
    const outOldAnnual   = document.getElementById('out-pr-old-annual');
    const outMonthlyDiff = document.getElementById('out-pr-monthly-diff');
    const outAnnualDiff  = document.getElementById('out-pr-annual-diff');
    const outTable       = document.getElementById('out-pr-table');

    function fmt(n) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
    }

    function getAnnual(value, type, hours) {
        if (type === 'annual') return value;
        return value * hours * 52;
    }

    function calculate() {
        const current   = parseFloat(inputCurrent.value) || 0;
        const type      = selectType.value;
        const mode      = selectMode.value;
        const raiseVal  = parseFloat(inputRaise.value) || 0;
        const hours     = parseFloat(inputHours.value) || 40;

        hoursWrap.style.display = type === 'hourly' ? 'block' : 'none';
        document.getElementById('pr-raise').placeholder = mode === 'percent' ? 'e.g. 5' : 'e.g. 2500';

        const oldAnnual = getAnnual(current, type, hours);
        let   newAnnual;

        if (mode === 'percent') {
            newAnnual = oldAnnual * (1 + raiseVal / 100);
        } else {
            const raiseAnnual = type === 'annual' ? raiseVal : raiseVal * hours * 52;
            newAnnual = oldAnnual + raiseAnnual;
        }

        const annualDiff  = newAnnual - oldAnnual;
        const monthlyDiff = annualDiff / 12;

        outNewAnnual.textContent   = fmt(newAnnual);
        outOldAnnual.textContent   = fmt(oldAnnual);
        outMonthlyDiff.textContent = '+' + fmt(monthlyDiff);
        outAnnualDiff.textContent  = '+' + fmt(annualDiff);

        const rows = [
            { label: 'Hourly',    old: oldAnnual / 52 / hours,  nw: newAnnual / 52 / hours },
            { label: 'Weekly',    old: oldAnnual / 52,           nw: newAnnual / 52 },
            { label: 'Monthly',   old: oldAnnual / 12,           nw: newAnnual / 12 },
            { label: 'Annually',  old: oldAnnual,                nw: newAnnual },
        ];

        outTable.innerHTML = rows.map(r => `
            <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:0.4rem 0.5rem;">${r.label}</td>
                <td style="padding:0.4rem 0.5rem; text-align:right; color:#6b7280;">${fmt(r.old)}</td>
                <td style="padding:0.4rem 0.5rem; text-align:right; color:#059669; font-weight:600;">${fmt(r.nw)}</td>
            </tr>`).join('');
    }

    [inputCurrent, selectType, selectMode, inputRaise, inputHours].forEach(el => {
        el.addEventListener('input', calculate);
        el.addEventListener('change', calculate);
    });

    calculate();
});
