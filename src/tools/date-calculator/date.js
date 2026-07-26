document.addEventListener('DOMContentLoaded', () => {
    const inputStart = document.getElementById('date-start');
    const inputOp = document.getElementById('date-op');
    const inputY = document.getElementById('date-y');
    const inputM = document.getElementById('date-m');
    const inputD = document.getElementById('date-d');
    const outMain = document.getElementById('out-date-main');
    const btnCalc = document.getElementById('btn-calc-date');

    const today = new Date();
    inputStart.value = today.toISOString().split('T')[0];

    function calculateTarget() {
        const startStr = inputStart.value;
        if (!startStr) return;

        const [y, m, d] = startStr.split('-').map(Number);
        
        let dateObj = new Date(y, m - 1, d);

        const op = inputOp.value === 'add' ? 1 : -1;
        
        const yAdd = (parseInt(inputY.value) || 0) * op;
        const mAdd = (parseInt(inputM.value) || 0) * op;
        const dAdd = (parseInt(inputD.value) || 0) * op;

        dateObj.setFullYear(dateObj.getFullYear() + yAdd);
        dateObj.setMonth(dateObj.getMonth() + mAdd);
        dateObj.setDate(dateObj.getDate() + dAdd);

        const finalOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        outMain.textContent = dateObj.toLocaleDateString(undefined, finalOptions);
    }

    btnCalc.addEventListener('click', calculateTarget);
    calculateTarget();
});
