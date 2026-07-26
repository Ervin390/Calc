document.addEventListener('DOMContentLoaded', () => {
    const selGender = document.getElementById('tdee-gender');
    const inputAge = document.getElementById('tdee-age');
    const inputWeight = document.getElementById('tdee-weight');
    const inputHeight = document.getElementById('tdee-height');
    const selActivity = document.getElementById('tdee-activity');
    
    const outTdee = document.getElementById('out-tdee');
    const outCut = document.getElementById('out-cut');
    const outBulk = document.getElementById('out-bulk');
    const outBmr = document.getElementById('out-bmr');
    const btnCalc = document.getElementById('btn-calc-tdee');

    function calculateTDEE() {
        const gender = selGender.value;
        const age = parseFloat(inputAge.value) || 25;
        const weight = parseFloat(inputWeight.value) || 70;
        const height = parseFloat(inputHeight.value) || 175;
        const activityMulti = parseFloat(selActivity.value) || 1.2;

        let bmr = 0;
        // Mifflin-St Jeor
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        const tdee = Math.round(bmr * activityMulti);
        
        // Output formatting
        outBmr.textContent = Math.round(bmr);
        outTdee.textContent = tdee;
        
        // Standard cutting/bulking is +/- 500
        outCut.textContent = (tdee - 500);
        outBulk.textContent = (tdee + 500);
        
        // Animate
        outTdee.style.transform = 'scale(1.1)';
        setTimeout(() => {
            outTdee.style.transform = 'scale(1)';
        }, 150);
    }

    btnCalc.addEventListener('click', calculateTDEE);
    
    // Auto calculate initially
    calculateTDEE();
});
