document.addEventListener('DOMContentLoaded', () => {
    const inputTdee = document.getElementById('macro-tdee');
    const selGoal = document.getElementById('macro-goal');
    const outProtein = document.getElementById('out-protein');
    const outCarbs = document.getElementById('out-carbs');
    const outFats = document.getElementById('out-fats');
    
    const outProPct = document.getElementById('out-pro-pct');
    const outCarPct = document.getElementById('out-car-pct');
    const outFatPct = document.getElementById('out-fat-pct');
    
    const btnCalc = document.getElementById('btn-calc-macro');

    function calculateMacros() {
        const tdee = parseFloat(inputTdee.value) || 2000;
        const goal = selGoal.value;

        let proPct, carPct, fatPct;

        if (goal === 'maintenance') {
            proPct = 0.30;
            carPct = 0.40;
            fatPct = 0.30;
        } else if (goal === 'cutting') {
            proPct = 0.40;
            carPct = 0.30;
            fatPct = 0.30;
        } else {
            // bulking
            proPct = 0.30;
            carPct = 0.50;
            fatPct = 0.20;
        }

        const proCals = tdee * proPct;
        const carCals = tdee * carPct;
        const fatCals = tdee * fatPct;

        const proGrams = Math.round(proCals / 4);
        const carGrams = Math.round(carCals / 4);
        const fatGrams = Math.round(fatCals / 9);

        outProtein.textContent = `${proGrams}g`;
        outCarbs.textContent = `${carGrams}g`;
        outFats.textContent = `${fatGrams}g`;

        outProPct.textContent = `${Math.round(proPct * 100)}%`;
        outCarPct.textContent = `${Math.round(carPct * 100)}%`;
        outFatPct.textContent = `${Math.round(fatPct * 100)}%`;
    }

    btnCalc.addEventListener('click', calculateMacros);
    calculateMacros();
});
