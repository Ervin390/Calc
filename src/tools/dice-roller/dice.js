document.addEventListener('DOMContentLoaded', () => {
    const selType = document.getElementById('dice-type');
    const inputCount = document.getElementById('dice-count');
    const inputMod = document.getElementById('dice-mod');
    const btnRoll = document.getElementById('btn-roll');
    const outTotal = document.getElementById('out-total');
    const outIndividual = document.getElementById('out-individual');

    // Cryptographically secure random integer between min and max inclusive
    function secureRandomInt(min, max) {
        if (!window.crypto || !window.crypto.getRandomValues) {
            // Fallback
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const range = max - min + 1;
        const maxRange = 256; 
        const maxValid = maxRange - (maxRange % range);
        
        let randomArray = new Uint8Array(1);
        do {
            window.crypto.getRandomValues(randomArray);
        } while (randomArray[0] >= maxValid);
        
        return min + (randomArray[0] % range);
    }

    function doRoll() {
        const sides = parseInt(selType.value);
        let count = parseInt(inputCount.value);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 100) count = 100; // Limit to 100
        
        let mod = parseInt(inputMod.value);
        if (isNaN(mod)) mod = 0;

        let rolls = [];
        let sum = 0;

        // Perform fast visual shake if possible
        outTotal.style.transform = 'scale(1.1)';
        btnRoll.disabled = true;
        btnRoll.textContent = 'Rolling...';

        let rollDuration = 600 + (Math.random() * 400); // 600-1000ms
        let startTime = null;

        function animateRoll(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            // Generate random intermediate values for the animation display
            let tempRolls = [];
            let tempSum = 0;
            for (let i = 0; i < count; i++) {
                const tr = Math.floor(Math.random() * sides) + 1; // Fake math.random for speed in animation
                tempRolls.push(tr);
                tempSum += tr;
            }

            const tempGrand = tempSum + mod;
            let tempIndStr = tempRolls.map(r => `<span style="display:inline-block; width: 36px; height: 36px; line-height: 36px; text-align: center; border: 2px solid var(--primary); border-radius: 8px; font-weight: bold; margin: 0.25rem;">${r}</span>`).join('');
            if (mod !== 0) {
                const modSign = mod > 0 ? '+' : '';
                tempIndStr += `<span style="margin-left: 0.5rem; font-weight: bold;">${modSign}${mod}</span>`;
            }

            outTotal.textContent = tempGrand;
            outIndividual.innerHTML = tempIndStr;

            if (elapsed < rollDuration) {
                requestAnimationFrame(animateRoll);
            } else {
                // Final cryptographically secure roll
                let finalRolls = [];
                let finalSum = 0;
                for (let i = 0; i < count; i++) {
                    const result = secureRandomInt(1, sides);
                    finalRolls.push(result);
                    finalSum += result;
                }
                const grandTotal = finalSum + mod;
                
                let indStr = finalRolls.map(r => `<span style="display:inline-block; width: 36px; height: 36px; line-height: 36px; text-align: center; border: 2px solid var(--primary); border-radius: 8px; font-weight: bold; background: var(--primary); color: white; margin: 0.25rem; transition: transform 0.2s;">${r}</span>`).join('');
                if (mod !== 0) {
                    const modSign = mod > 0 ? '+' : '';
                    indStr += `<span style="margin-left: 0.5rem; font-weight: bold;">${modSign}${mod}</span>`;
                }
                
                outTotal.textContent = grandTotal;
                outTotal.style.transform = 'scale(1.2) translateY(-5px)';
                outTotal.style.color = '#10b981'; // Green pop
                
                setTimeout(() => {
                    outTotal.style.transform = 'scale(1) translateY(0)';
                    outTotal.style.color = 'var(--text-main)'; // Revert back to original color
                    btnRoll.disabled = false;
                    btnRoll.textContent = 'Roll Dice';
                }, 300);

                outIndividual.innerHTML = indStr;
            }
        }
        
        requestAnimationFrame(animateRoll);
    }

    btnRoll.addEventListener('click', doRoll);
});
