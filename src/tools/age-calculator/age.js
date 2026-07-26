document.addEventListener('DOMContentLoaded', () => {
    const inputDob = document.getElementById('age-dob');
    const inputTarget = document.getElementById('age-target');
    const btnCalc = document.getElementById('btn-calc-age');
    
    const outMain = document.getElementById('out-age-main');
    const outTotalMonths = document.getElementById('out-total-months');
    const outTotalDays = document.getElementById('out-total-days');
    const outTotalHours = document.getElementById('out-total-hours');
    const outNextBday = document.getElementById('out-next-bday');

    // Set defaults natively dynamically quickly
    const today = new Date();
    const isoToday = today.toISOString().split('T')[0];
    inputTarget.value = isoToday;
    
    function parseDateLocal(dateStr) {
        // Fix timezone drift by strictly parsing yyyy-mm-dd
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    }
    
    function diffDatesNative(d1, d2) {
        // d1 is Dob, d2 is target
        let y = d2.getFullYear() - d1.getFullYear();
        let m = d2.getMonth() - d1.getMonth();
        let d = d2.getDate() - d1.getDate();
        
        if (d < 0) {
            m -= 1;
            // Days in previous month
            const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
            d += prevMonth;
        }
        if (m < 0) {
            y -= 1;
            m += 12;
        }
        
        return { years: y, months: m, days: d };
    }
    
    function nextBirthdayMath(dob, target) {
        const nextBdayThisYear = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
        if (nextBdayThisYear < target) {
            nextBdayThisYear.setFullYear(target.getFullYear() + 1);
        }
        const diffMs = nextBdayThisYear - target;
        return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }

    function computeLogic() {
        if (!inputDob.value || !inputTarget.value) return;
        
        const dob = parseDateLocal(inputDob.value);
        const tgt = parseDateLocal(inputTarget.value);
        
        if (tgt < dob) {
            outMain.textContent = 'Invalid Target Date';
            outTotalMonths.textContent = '0';
            outTotalDays.textContent = '0';
            outTotalHours.textContent = '0';
            outNextBday.textContent = '0 Days';
            return;
        }
        
        const strictDiff = diffDatesNative(dob, tgt);
        outMain.textContent = `${strictDiff.years} Years ${strictDiff.months} Months ${strictDiff.days} Days`;
        
        // Exact flat values
        let msDiff = tgt - dob;
        const daysExact = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        const hoursExact = daysExact * 24;
        const monthsExact = (strictDiff.years * 12) + strictDiff.months;
        
        const nextB = nextBirthdayMath(dob, tgt);
        
        outTotalMonths.textContent = new Intl.NumberFormat().format(monthsExact);
        outTotalDays.textContent = new Intl.NumberFormat().format(daysExact);
        outTotalHours.textContent = new Intl.NumberFormat().format(hoursExact);
        outNextBday.textContent = `${nextB} Days`;
    }

    btnCalc.addEventListener('click', computeLogic);
    
    computeLogic();
});
