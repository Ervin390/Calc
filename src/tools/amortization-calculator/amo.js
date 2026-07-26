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
        
        tbody.innerHTML = '';
        currentSchedule = [];
        
        if(rate === 0 || years === 0 || P === 0) {
            oM.textContent = '$0.00';
            oI.textContent = '$0.00';
            oT.textContent = '$0.00';
            return;
        }

        const r = (rate / 100) / 12;
        const n = years * 12;
        
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        
        if (isNaN(M) || !isFinite(M)) {
            oM.textContent = '$0.00';
            oI.textContent = '$0.00';
            oT.textContent = '$0.00';
            return;
        }

        const totalCost = M * n;
        const totalInterest = totalCost - P;

        oM.textContent = fmt.format(M);
        oI.textContent = fmt.format(totalInterest);
        oT.textContent = fmt.format(totalCost);
        
        let balance = P;
        let html = '';
        
        for (let i = 1; i <= n; i++) {
            let interestForMonth = balance * r;
            let principalForMonth = M - interestForMonth;
            
            if (i === n) {
                principalForMonth = balance;
                interestForMonth = (M * n) - P - currentSchedule.reduce((sum, row) => sum + row.interest, 0); 
            }
            
            balance -= principalForMonth;
            if (balance < 0) balance = 0;
            
            currentSchedule.push({
                payment: i,
                amount: M,
                principal: principalForMonth,
                interest: interestForMonth,
                balance: balance
            });
            
            html += `<tr>
                <td style="padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb;">${i}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(M)}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(principalForMonth)}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(interestForMonth)}</td>
                <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${fmt.format(balance)}</td>
            </tr>`;
        }
        
        tbody.innerHTML = html;
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
