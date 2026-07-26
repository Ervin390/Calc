document.addEventListener('DOMContentLoaded', () => {
    const f1w = document.getElementById('f1-whole');
    const f1n = document.getElementById('f1-num');
    const f1d = document.getElementById('f1-den');
    
    const f2w = document.getElementById('f2-whole');
    const f2n = document.getElementById('f2-num');
    const f2d = document.getElementById('f2-den');
    
    const opVal = document.getElementById('frac-op');
    
    const resultBox = document.getElementById('frac-result-box');
    const outResult = document.getElementById('frac-result');
    const outDec = document.getElementById('frac-decimal');
    const outSteps = document.getElementById('frac-steps');
    
    const btn = document.getElementById('btn-calc-frac');

    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        return b === 0 ? a : gcd(b, a % b);
    }
    
    function formatFrac(n, d) {
        if (d === 1) return `${n}`;
        if (n === 0) return `0`;
        return `${n}/${d}`;
    }

    function formatMixed(n, d) {
        if (n === 0) return '0';
        if (d === 1) return `${n}`;
        const isNeg = (n < 0 && d > 0) || (n > 0 && d < 0);
        let an = Math.abs(n);
        let ad = Math.abs(d);
        if (an > ad) {
            let w = Math.floor(an / ad);
            let rem = an % ad;
            let str = `${w} ${rem}/${ad}`;
            return isNeg ? `-${str}` : str;
        } else {
            return isNeg ? `-${an}/${ad}` : `${an}/${ad}`;
        }
    }

    function parseFrac(wStr, nStr, dStr) {
        const w = parseInt(wStr) || 0;
        const n = parseInt(nStr) || 0;
        const d = parseInt(dStr) || 1;
        
        let impN = (Math.abs(w) * d) + n;
        if (w < 0) impN = -impN;
        return { n: impN, d: d };
    }

    function calculateFraction() {
        const o1 = parseFrac(f1w.value, f1n.value, f1d.value);
        const o2 = parseFrac(f2w.value, f2n.value, f2d.value);
        const op = opVal.value;

        if (o1.d === 0 || o2.d === 0) {
            outResult.textContent = 'Error';
            outDec.textContent = 'Denominator cannot be zero';
            outSteps.innerHTML = '';
            return;
        }

        let rn = 0, rd = 1;
        let stepsHtml = '';

        if (op === 'add') {
            rn = (o1.n * o2.d) + (o2.n * o1.d);
            rd = o1.d * o2.d;
            stepsHtml = `<strong>Step 1:</strong> Find a common denominator by multiplying the denominators (${o1.d} × ${o2.d} = ${rd}).<br>
                         <strong>Step 2:</strong> Adjust the numerators (${o1.n} × ${o2.d} = ${o1.n * o2.d}) and (${o2.n} × ${o1.d} = ${o2.n * o1.d}).<br>
                         <strong>Step 3:</strong> Add the numerators: ${o1.n * o2.d} + ${o2.n * o1.d} = ${rn}.<br>
                         Result: ${rn}/${rd}`;
        } else if (op === 'sub') {
            rn = (o1.n * o2.d) - (o2.n * o1.d);
            rd = o1.d * o2.d;
            stepsHtml = `<strong>Step 1:</strong> Find a common denominator by multiplying the denominators (${o1.d} × ${o2.d} = ${rd}).<br>
                         <strong>Step 2:</strong> Adjust the numerators (${o1.n} × ${o2.d} = ${o1.n * o2.d}) and (${o2.n} × ${o1.d} = ${o2.n * o1.d}).<br>
                         <strong>Step 3:</strong> Subtract the numerators: ${o1.n * o2.d} - ${o2.n * o1.d} = ${rn}.<br>
                         Result: ${rn}/${rd}`;
        } else if (op === 'mul') {
            rn = o1.n * o2.n;
            rd = o1.d * o2.d;
            stepsHtml = `<strong>Step 1:</strong> Multiply the numerators (${o1.n} × ${o2.n} = ${rn}).<br>
                         <strong>Step 2:</strong> Multiply the denominators (${o1.d} × ${o2.d} = ${rd}).<br>
                         Result: ${rn}/${rd}`;
        } else if (op === 'div') {
            rn = o1.n * o2.d;
            rd = o1.d * o2.n;
            if (rd === 0) {
                 outResult.textContent = 'Error';
                 outDec.textContent = 'Cannot divide by zero';
                 outSteps.innerHTML = '';
                 return;
            }
            stepsHtml = `<strong>Step 1:</strong> Take the reciprocal of the second fraction (flip it to ${o2.d}/${o2.n}).<br>
                         <strong>Step 2:</strong> Multiply the first fraction by this reciprocal.<br>
                         <strong>Step 3:</strong> Numerators (${o1.n} × ${o2.d} = ${rn}), Denominators (${o1.d} × ${o2.n} = ${rd}).<br>
                         Result: ${rn}/${rd}`;
        }

        const divisor = Math.abs(gcd(rn, rd));
        const s_rn = rn / divisor;
        const s_rd = rd / divisor;
        
        let final_n = s_rn;
        let final_d = s_rd;
        
        if (final_d < 0) {
            final_n *= -1;
            final_d *= -1;
        }

        if (divisor > 1 || Math.abs(rn) !== Math.abs(final_n)) {
            stepsHtml += `<br><strong>Step 4:</strong> Simplify the fraction by dividing numerator and denominator by their greatest common divisor (${divisor}).<br>
                          Simplified: <strong>${formatMixed(final_n, final_d)}</strong>`;
        }

        outResult.textContent = formatMixed(final_n, final_d);
        outDec.textContent = 'Decimal: ' + (final_n / final_d).toFixed(4).replace(/\.?0+$/, '');
        outSteps.innerHTML = stepsHtml;
    }

    btn.addEventListener('click', calculateFraction);
    calculateFraction();
});
