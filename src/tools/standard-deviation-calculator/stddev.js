document.addEventListener('DOMContentLoaded', () => {
    const inputE = document.getElementById('stddev-input');
    const btnCalc = document.getElementById('btn-calc-std');
    const btnClear = document.getElementById('btn-clear-std');
    
    const resultBox = document.getElementById('std-result-box');
    const outCount = document.getElementById('out-count');
    const outMean = document.getElementById('out-mean');
    const outMedian = document.getElementById('out-median');
    const outSample = document.getElementById('out-sample');
    const outPop = document.getElementById('out-pop');
    const outVar = document.getElementById('out-variance');
    const canvas = document.getElementById('hist-canvas');

    function drawHistogram(arr) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        if (arr.length < 2) return;

        const min = Math.min(...arr);
        const max = Math.max(...arr);
        let bins = 10;
        if (arr.length < 10) bins = 5;
        
        const binSize = (max - min) / bins || 1; 
        const freqs = new Array(bins).fill(0);

        arr.forEach(val => {
            let binIdx = Math.floor((val - min) / binSize);
            if(binIdx >= bins) binIdx = bins - 1;
            freqs[binIdx]++;
        });

        const maxFreq = Math.max(...freqs);
        
        const barWidth = width / bins;
        ctx.fillStyle = '#2563eb';
        
        freqs.forEach((f, i) => {
            const barHeight = (f / maxFreq) * (height - 20);
            ctx.fillRect(i * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
        });
    }

    function calculateStats() {
        const text = inputE.value;
        const arr = text.split(/[\s,]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));

        if (arr.length === 0) {
            resultBox.style.display = 'none';
            return;
        }

        resultBox.style.display = 'block';
        const n = arr.length;
        const sum = arr.reduce((a, b) => a + b, 0);
        const mean = sum / n;
        
        // Median
        const sorted = [...arr].sort((a,b) => a-b);
        let median = 0;
        const mid = Math.floor(n / 2);
        if (n % 2 !== 0) {
            median = sorted[mid];
        } else {
            median = (sorted[mid - 1] + sorted[mid]) / 2;
        }
        
        let sqSum = 0;
        for (let i = 0; i < n; i++) {
            sqSum += Math.pow(arr[i] - mean, 2);
        }

        const popVar = sqSum / n;
        const popStd = Math.sqrt(popVar);
        
        let sampVar = 0, sampStd = 0;
        if (n > 1) {
            sampVar = sqSum / (n - 1);
            sampStd = Math.sqrt(sampVar);
        }

        outCount.textContent = n;
        outMean.textContent = mean.toFixed(4).replace(/\.?0+$/, '');
        outMedian.textContent = median.toFixed(4).replace(/\.?0+$/, '');
        outPop.textContent = popStd.toFixed(4).replace(/\.?0+$/, '');
        outSample.textContent = n > 1 ? sampStd.toFixed(4).replace(/\.?0+$/, '') : 'N/A';
        outVar.textContent = sampVar ? sampVar.toFixed(4).replace(/\.?0+$/, '') : popVar.toFixed(4).replace(/\.?0+$/, '');
        
        const outSteps = document.getElementById('out-steps');
        if (outSteps) {
            let stepsHtml = '';
            
            // Step 1: Mean
            stepsHtml += `<p style="margin-top:0;"><strong>Step 1: Calculate the Mean (Average)</strong><br>`;
            stepsHtml += `Sum the values: ${arr.join(' + ')} = <strong>${sum}</strong><br>`;
            stepsHtml += `Divide by the count (n = ${n}): ${sum} / ${n} = <strong>${mean.toFixed(4).replace(/\.?0+$/, '')}</strong></p>`;
            
            // Step 2: Squared Differences
            stepsHtml += `<p><strong>Step 2: Calculate Each Squared Difference From the Mean</strong><br>`;
            stepsHtml += `<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; margin: 10px 0; font-size:0.85rem;">`;
            stepsHtml += `<tr style="border-bottom:1.5px solid var(--border); font-weight:700;"><td style="padding:6px; color:var(--text-sub);">Value (x)</td><td style="padding:6px; color:var(--text-sub);">x - Mean</td><td style="padding:6px; color:var(--text-sub); text-align:right;">(x - Mean)²</td></tr>`;
            
            let sumSqDev = 0;
            arr.forEach(val => {
                const dev = val - mean;
                const sqDev = Math.pow(dev, 2);
                sumSqDev += sqDev;
                stepsHtml += `<tr style="border-bottom:1px solid var(--border);"><td style="padding:6px; font-weight:600;">${val}</td><td style="padding:6px;">${val} - ${mean.toFixed(2)} = ${dev.toFixed(2)}</td><td style="padding:6px; text-align:right; font-family:monospace;">${sqDev.toFixed(4).replace(/\.?0+$/, '')}</td></tr>`;
            });
            stepsHtml += `<tr style="font-weight:700; background:var(--card-bg);"><td colspan="2" style="padding:6px;">Sum of Squared Differences (SS)</td><td style="padding:6px; text-align:right; font-family:monospace; color:var(--primary);">${sumSqDev.toFixed(4).replace(/\.?0+$/, '')}</td></tr>`;
            stepsHtml += `</table></div></p>`;

            // Step 3 & 4: Variance and Standard Deviation
            stepsHtml += `<p style="margin-bottom:0;"><strong>Step 3: Calculate Variance and Standard Deviation</strong><br>`;
            
            // Sample
            if (n > 1) {
                const sVarVal = sumSqDev / (n - 1);
                const sStdVal = Math.sqrt(sVarVal);
                stepsHtml += `<span style="display:block; margin-top:0.5rem;"><strong>Sample</strong> (Bessel's correction):</span>`;
                stepsHtml += `• Variance (s²) = ${sumSqDev.toFixed(4).replace(/\.?0+$/, '')} / (${n} - 1) = <strong>${sVarVal.toFixed(4).replace(/\.?0+$/, '')}</strong><br>`;
                stepsHtml += `• Std Dev (s) = √${sVarVal.toFixed(4).replace(/\.?0+$/, '')} = <strong>${sStdVal.toFixed(4).replace(/\.?0+$/, '')}</strong><br>`;
            } else {
                stepsHtml += `<span style="display:block; margin-top:0.5rem; color:var(--warning);"><strong>Sample Std Dev (s):</strong> N/A (requires at least 2 data points)</span>`;
            }
            
            // Population
            const pVarVal = sumSqDev / n;
            const pStdVal = Math.sqrt(pVarVal);
            stepsHtml += `<span style="display:block; margin-top:0.5rem;"><strong>Population</strong>:</span>`;
            stepsHtml += `• Variance (σ²) = ${sumSqDev.toFixed(4).replace(/\.?0+$/, '')} / ${n} = <strong>${pVarVal.toFixed(4).replace(/\.?0+$/, '')}</strong><br>`;
            stepsHtml += `• Std Dev (σ) = √${pVarVal.toFixed(4).replace(/\.?0+$/, '')} = <strong>${pStdVal.toFixed(4).replace(/\.?0+$/, '')}</strong></p>`;

            outSteps.innerHTML = stepsHtml;
        }

        drawHistogram(arr);
    }

    btnCalc.addEventListener('click', calculateStats);
    btnClear.addEventListener('click', () => {
        inputE.value = '';
        resultBox.style.display = 'none';
    });
    
    if (inputE.value.trim() !== '') {
        calculateStats();
    }
});
