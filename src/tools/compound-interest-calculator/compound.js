document.addEventListener('DOMContentLoaded', () => {
    const inputPrincipal = document.getElementById('ci-principal');
    const inputRate = document.getElementById('ci-rate');
    const inputYears = document.getElementById('ci-years');
    const inputContribution = document.getElementById('ci-contribution');
    const selectFreq = document.getElementById('ci-frequency');
    
    const outTotal = document.getElementById('out-ci-total');
    const outDeposits = document.getElementById('out-ci-deposits');
    const outInterest = document.getElementById('out-ci-interest');
    const btnCalc = document.getElementById('btn-calculate-ci');
    
    const canvas = document.getElementById('ci-chart');
    const ctx = canvas.getContext('2d');
    
    function formatMoney(num) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
    
    function drawChart(yearlyData) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (yearlyData.length < 2) return;
        
        const padding = 40;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;
        
        const maxVal = yearlyData[yearlyData.length - 1].total;
        
        const xStep = width / (yearlyData.length - 1);
        const yRatio = maxVal > 0 ? height / maxVal : 1;
        
        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + height);
        ctx.lineTo(padding + width, padding + height);
        ctx.strokeStyle = '#9ca3af';
        ctx.stroke();
        
        // Draw total area
        ctx.beginPath();
        ctx.moveTo(padding, padding + height);
        for (let i = 0; i < yearlyData.length; i++) {
            const x = padding + i * xStep;
            const y = padding + height - (yearlyData[i].total * yRatio);
            ctx.lineTo(x, y);
        }
        ctx.lineTo(padding + width, padding + height);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.2)';
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(padding, padding + height - (yearlyData[0].total * yRatio));
        for (let i = 1; i < yearlyData.length; i++) {
            const x = padding + i * xStep;
            const y = padding + height - (yearlyData[i].total * yRatio);
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    
    function calculate() {
        const principal = parseFloat(inputPrincipal.value) || 0;
        const rate = (parseFloat(inputRate.value) || 0) / 100;
        let years = parseInt(inputYears.value) || 0;
        const contrib = parseFloat(inputContribution.value) || 0;
        const freq = parseInt(selectFreq.value) || 12; // Compounds per year
        
        if (years > 100) years = 100;
        
        let total = principal;
        let totalDeposits = principal;
        
        let yearlyData = [];
        yearlyData.push({ year: 0, total: total, deposits: totalDeposits });
        
        // Month by month for accuracy if needed, or by compounding period.
        // We do it by year internally for the chart
        
        let periodsPerYear = freq;
        // if monthly contribution, but compounding is annually? 
        // Standard calculator assumes contribution happens at the same frequency as compounding for simplicity,
        // or we convert it to monthly iterative math.
        
        let currentBalance = principal;
        let totalContribs = principal;
        
        // Iterate by months
        const monthlyRate = rate / 12;
        const compoundMonths = 12 / freq; // How many months pass before compounding happens
        
        for (let y = 1; y <= years; y++) {
            for (let m = 1; m <= 12; m++) {
                currentBalance += contrib;
                totalContribs += contrib;
                
                // If it's a compounding month
                if (m % compoundMonths === 0) {
                    const periodRate = rate / freq;
                    currentBalance += currentBalance * periodRate;
                }
            }
            yearlyData.push({ year: y, total: currentBalance, deposits: totalContribs });
        }
        
        const finalInterest = currentBalance - totalContribs;
        
        outTotal.textContent = formatMoney(currentBalance);
        outDeposits.textContent = formatMoney(totalContribs);
        outInterest.textContent = formatMoney(finalInterest);
        
        // Adjust canvas resolution
        canvas.width = canvas.clientWidth * window.devicePixelRatio;
        canvas.height = Math.max(250, canvas.clientHeight) * window.devicePixelRatio;
        
        drawChart(yearlyData);
    }
    
    btnCalc.addEventListener('click', calculate);
    window.addEventListener('resize', calculate);
    
    calculate();
});
