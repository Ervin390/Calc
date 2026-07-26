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
