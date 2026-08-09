// Days Until Calculator
(function () {
    const presets = {
        christmas: () => { const d = new Date(); return new Date(d.getFullYear() + (d.getMonth() >= 11 && d.getDate() > 25 ? 1 : 0), 11, 25); },
        newyear: () => { const d = new Date(); return new Date(d.getFullYear() + (d.getMonth() === 11 && d.getDate() >= 31 ? 1 : (d.getMonth() > 0 ? 1 : 0)), 0, 1); },
        halloween: () => { const d = new Date(); return new Date(d.getFullYear() + (d.getMonth() >= 9 && d.getDate() > 31 ? 1 : (d.getMonth() > 9 ? 1 : 0)), 9, 31); },
        valentines: () => { const d = new Date(); return new Date(d.getFullYear() + (d.getMonth() >= 1 && d.getDate() > 14 ? 1 : (d.getMonth() > 1 ? 1 : 0)), 1, 14); },
        thanksgiving: () => {
            const d = new Date();
            const yr = d.getFullYear() + (d.getMonth() === 10 && d.getDate() > 28 ? 1 : (d.getMonth() > 10 ? 1 : 0));
            const nov1 = new Date(yr, 10, 1).getDay();
            const day = 26 - nov1 + (nov1 <= 4 ? 0 : 7);
            return new Date(yr, 10, day);
        }
    };

    const presetLabels = {
        christmas: 'Until Christmas 🎄',
        newyear: 'Until New Year 🎆',
        halloween: 'Until Halloween 🎃',
        valentines: "Until Valentine's Day ❤️",
        thanksgiving: 'Until Thanksgiving 🦃'
    };

    function calculate(targetDate, label) {
        const now = new Date();
        const target = new Date(targetDate);
        target.setHours(0, 0, 0, 0);

        const diffMs = target - now;
        const absDiff = Math.abs(diffMs);
        const days = Math.floor(absDiff / 86400000);
        const hours = Math.floor((absDiff % 86400000) / 3600000);
        const minutes = Math.floor((absDiff % 3600000) / 60000);
        const weeks = (days / 7).toFixed(1);

        const result = document.getElementById('days-result');
        result.style.display = 'block';

        document.getElementById('event-label').textContent = label || 'Countdown';
        document.getElementById('out-days').textContent = diffMs < 0 ? `-${days}` : days;
        document.getElementById('out-hours').textContent = hours;
        document.getElementById('out-minutes').textContent = minutes;
        document.getElementById('out-weeks').textContent = weeks;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = target.toLocaleDateString(undefined, options);
        document.getElementById('out-date-str').textContent = diffMs < 0
            ? `That date was ${days} days ago — ${dateStr}`
            : `That is ${dateStr}`;

        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    document.querySelectorAll('[data-preset]').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.preset;
            const date = presets[key]();
            const dateStr = date.toISOString().slice(0, 10);
            document.getElementById('target-date').value = dateStr;
            document.getElementById('event-name').value = '';
            calculate(date, presetLabels[key]);
        });
    });

    document.getElementById('btn-calc-days').addEventListener('click', () => {
        const raw = document.getElementById('target-date').value;
        if (!raw) { alert('Please select a date first.'); return; }
        const name = document.getElementById('event-name').value.trim();
        const label = name ? `Until ${name}` : 'Countdown';
        calculate(new Date(raw + 'T00:00:00'), label);
    });
})();
