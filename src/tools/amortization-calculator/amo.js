document.addEventListener('DOMContentLoaded', () => {
    const iPrin = document.getElementById('amo-principal');
    const iRate = document.getElementById('amo-rate');
    const iTerm = document.getElementById('amo-years');
    
    const oM = document.getElementById('out-monthly');
    const oI = document.getElementById('out-interest');
    const oT = document.getElementById('out-total');
    
    const btnCalc = document.getElementById('btn-calc-amo');
    const btnExport = document.getElementById('btn-export-csv');
    const tbody = document.getElementById('amo-tbody');
    
    let currentSchedule = [];

    const fmt = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    
    function calcAmortization() {
        const P = parseFloat(iPrin.value) || 0;
        const rate = parseFloat(iRate.value) || 0;
        const years = parseFloat(iTerm.value) || 0;
        const extraInput = document.getElementById('amo-extra');
        const extra = extraInput ? (parseFloat(extraInput.value) || 0) : 0;
        
        tbody.innerHTML = '';
        currentSchedule = [];
        
        if(rate === 0 || years === 0 || P === 0) {
            oM.textContent = '$0.00';
            oI.textContent = '$0.00';
            oT.textContent = '$0.00';
            const savingsBox = document.getElementById('extra-savings-box');
            if (savingsBox) savingsBox.style.display = 'none';
            return;
        }

        const r = (rate / 100) / 12;
        const n = years * 12;
        
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        
        if (isNaN(M) || !isFinite(M)) {
            oM.textContent = '$0.00';
            oI.textContent = '$0.00';
            oT.textContent = '$0.00';
            const savingsBox = document.getElementById('extra-savings-box');
            if (savingsBox) savingsBox.style.display = 'none';
            return;
        }

        // Calculate standard baseline interest
        let standardTotalInterest = 0;
        let baselineBalance = P;
        for (let i = 1; i <= n; i++) {
            let interestForMonth = baselineBalance * r;
            let principalForMonth = M - interestForMonth;
            if (i === n) {
                principalForMonth = baselineBalance;
            }
            baselineBalance -= principalForMonth;
            standardTotalInterest += interestForMonth;
        }
        
        const totalCost = M * n;
        const totalInterest = totalCost - P;

        oM.textContent = fmt.format(M);
        oI.textContent = fmt.format(totalInterest);
        oT.textContent = fmt.format(totalCost);
        
        let balance = P;
        let html = '';
        let actualTotalInterest = 0;
        let paymentCount = 0;
        
        for (let i = 1; i <= n; i++) {
            let interestForMonth = balance * r;
            if (interestForMonth < 0) interestForMonth = 0;
            
            let principalForMonth = M - interestForMonth;
            if (principalForMonth < 0) principalForMonth = 0;
            
            let actualExtra = extra;
            
            if (balance <= principalForMonth) {
                principalForMonth = balance;
                actualExtra = 0;
                balance = 0;
            } else {
                if (balance - principalForMonth <= actualExtra) {
                    actualExtra = balance - principalForMonth;
                    balance = 0;
                } else {
                    balance -= (principalForMonth + actualExtra);
                }
            }
            
            const totalPaymentThisMonth = principalForMonth + interestForMonth + actualExtra;
            actualTotalInterest += interestForMonth;
            paymentCount = i;
            
            currentSchedule.push({
                payment: i,
                amount: totalPaymentThisMonth,
                principal: principalForMonth + actualExtra,
                interest: interestForMonth,
                balance: balance
            });
            
            html += `<tr>
                <td style="padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb;">${i}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(totalPaymentThisMonth)}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(principalForMonth + actualExtra)}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(interestForMonth)}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(balance)}</td>
            </tr>`;
            
            if (balance <= 0) {
                break;
            }
        }
        
        tbody.innerHTML = html;

        // Update savings impact card
        const savingsBox = document.getElementById('extra-savings-box');
        const outSavedInterest = document.getElementById('out-saved-interest');
        const outSavedTime = document.getElementById('out-saved-time');
        
        if (savingsBox && outSavedInterest && outSavedTime) {
            if (extra > 0) {
                const interestSaved = Math.max(0, standardTotalInterest - actualTotalInterest);
                const monthsSaved = Math.max(0, n - paymentCount);
                
                outSavedInterest.textContent = fmt.format(interestSaved);
                
                if (monthsSaved >= 12) {
                    const yrs = Math.floor(monthsSaved / 12);
                    const mos = monthsSaved % 12;
                    outSavedTime.textContent = `${yrs} yr${yrs > 1 ? 's' : ''} ${mos > 0 ? mos + ' mo' : ''}`;
                } else {
                    outSavedTime.textContent = `${monthsSaved} mo${monthsSaved !== 1 ? 's' : ''}`;
                }
                
                savingsBox.style.display = 'flex';
            } else {
                savingsBox.style.display = 'none';
            }
        }
    }
    
    function exportCSV() {
        if (currentSchedule.length === 0) return;
        
        let csv = "Payment Number,Payment Amount,Principal Paid,Interest Paid,Remaining Balance\n";
        currentSchedule.forEach(row => {
            csv += `${row.payment},${row.amount.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'amortization_schedule.csv');
        a.click();
    }

    btnCalc.addEventListener('click', calcAmortization);
    btnExport.addEventListener('click', exportCSV);
    
    calcAmortization();
});
