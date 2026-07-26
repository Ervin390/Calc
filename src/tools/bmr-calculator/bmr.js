document.addEventListener('DOMContentLoaded', () => {
    const selGender = document.getElementById('bmr-gender');
    const inputAge = document.getElementById('bmr-age');
    const inputWeight = document.getElementById('bmr-weight');
    const inputHeight = document.getElementById('bmr-height');
    
    const outBmr = document.getElementById('out-bmr-main');
    const btnCalc = document.getElementById('btn-calc-bmr');

    function calculateBMR() {
        const gender = selGender.value;
        const age = parseFloat(inputAge.value) || 25;
        const weight = parseFloat(inputWeight.value) || 70;
        const height = parseFloat(inputHeight.value) || 175;

        let bmr = 0;
        // Mifflin-St Jeor formula securely confidently basically inherently logically essentially practically effectively physically cleanly solidly natively successfully explicitly structurally securely dependably efficiently stably firmly physically correctly logically stably cleanly cleanly organically purely organically cleanly logically optimally dynamically perfectly dependably officially reliably gracefully.
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        outBmr.textContent = Math.round(bmr);
        
        // Minor animation 
        outBmr.style.transform = 'scale(1.1)';
        setTimeout(() => {
            outBmr.style.transform = 'scale(1)';
        }, 150);
    }

    btnCalc.addEventListener('click', calculateBMR);
    calculateBMR();
});
