// Hours Calculator
(function () {
    // Mode toggle
    const modeToggle = document.getElementById('mode-toggle');
    const timecardMode = document.getElementById('timecard-mode');
    const betweenMode = document.getElementById('between-mode');

    modeToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            modeToggle.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.classList.add('secondary'); });
            btn.classList.add('active'); btn.classList.remove('secondary');
            const mode = btn.dataset.mode;
            timecardMode.style.display = mode === 'timecard' ? '' : 'none';
            betweenMode.style.display = mode === 'between' ? '' : 'none';
            document.getElementById('hours-result').style.display = 'none';
        });
    });

    // Parse time string HH:MM into total minutes
    function toMinutes(timeStr) {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    }

    // Format decimal hours to Xh Ym
    function formatHM(totalMins) {
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        return `${h}h ${m}m`;
    }

    function showResult(totalMins, rate, breakdowns) {
        const dec = (totalMins / 60).toFixed(2);
        document.getElementById('out-total-hours').textContent = formatHM(totalMins);
        document.getElementById('out-decimal-hours').textContent = dec;

        const payBox = document.getElementById('pay-box');
        if (rate) {
            const pay = (parseFloat(dec) * parseFloat(rate)).toFixed(2);
            document.getElementById('out-pay').textContent = '$' + pay;
            payBox.style.display = '';
        } else {
            payBox.style.display = 'none';
        }

        const bd = document.getElementById('shift-breakdown');
        if (breakdowns && breakdowns.length > 1) {
            let html = '<div style="margin-top: 1rem; font-size: 0.9rem;"><strong>Shift Breakdown:</strong><ul style="margin-top: 0.5rem; padding-left: 1.25rem; color: var(--text-muted);">';
            breakdowns.forEach(s => {
                html += `<li>${s.day}: ${s.start} – ${s.end} (${formatHM(s.worked)}, ${(s.worked / 60).toFixed(2)} hrs)</li>`;
            });
            html += '</ul></div>';
            bd.innerHTML = html;
        } else {
            bd.innerHTML = '';
        }

        document.getElementById('hours-result').style.display = '';
        document.getElementById('hours-result').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Add shift row
    document.getElementById('btn-add-shift').addEventListener('click', () => {
        const container = document.getElementById('shift-rows');
        const original = container.querySelector('.shift-row');
        const clone = original.cloneNode(true);
        // clear label from clones
        clone.querySelectorAll('label').forEach(l => l.remove());
        container.appendChild(clone);
    });

    // Calculate timecard
    document.getElementById('btn-calc-hours').addEventListener('click', () => {
        const rows = document.querySelectorAll('.shift-row');
        let totalMins = 0;
        const breakdowns = [];
        let valid = true;

        rows.forEach(row => {
            const startEl = row.querySelector('.shift-start');
            const endEl = row.querySelector('.shift-end');
            const breakEl = row.querySelector('.shift-break');
            const dayEl = row.querySelector('.shift-day');

            if (!startEl || !endEl) return;

            let start = toMinutes(startEl.value);
            let end = toMinutes(endEl.value);
            const brk = parseInt(breakEl.value) || 0;
            const day = dayEl ? dayEl.value : '';

            if (end <= start) end += 1440; // overnight
            const worked = Math.max(0, end - start - brk);
            totalMins += worked;

            breakdowns.push({ day, start: startEl.value, end: endEl.value, worked });
        });

        if (!valid) return;
        const rate = document.getElementById('hourly-rate').value;
        showResult(totalMins, rate, breakdowns);
    });

    // Calculate time between
    document.getElementById('btn-calc-between').addEventListener('click', () => {
        const start = toMinutes(document.getElementById('start-time').value);
        let end = toMinutes(document.getElementById('end-time').value);
        const brk = parseInt(document.getElementById('between-break').value) || 0;

        if (end <= start) end += 1440;
        const worked = Math.max(0, end - start - brk);
        showResult(worked, null, null);
    });
})();
