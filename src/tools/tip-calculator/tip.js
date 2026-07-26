document.addEventListener('DOMContentLoaded', () => {
    const inputBill = document.getElementById('tip-bill');
    const inputCustom = document.getElementById('tip-custom');
    const inputSplit = document.getElementById('tip-split');
    const presetBtns = document.querySelectorAll('.preset-btn');
    
    const outTip = document.getElementById('out-tip');
    const outTotal = document.getElementById('out-total');
    const outPerson = document.getElementById('out-person');
    
    let currentPercent = 20;

    function formatMoney(num) {
        return '$' + num.toFixed(2);
    }

    function calculate() {
        const billStr = inputBill.value.trim();
        const splitStr = inputSplit.value.trim();
        
        let bill = parseFloat(billStr);
        if (isNaN(bill) || bill < 0) bill = 0;
        
        let split = parseInt(splitStr);
        if (isNaN(split) || split < 1) split = 1;
        
        let customPct = parseFloat(inputCustom.value);
        let actualPercent = currentPercent;
        if (!isNaN(customPct) && customPct >= 0) {
            actualPercent = customPct;
            // Clear active state of presets if custom is used
            presetBtns.forEach(b => b.classList.add('secondary'));
            presetBtns.forEach(b => b.classList.remove('active'));
        }

        const tipAmount = bill * (actualPercent / 100);
        const totalAmount = bill + tipAmount;
        const perPerson = totalAmount / split;

        outTip.textContent = formatMoney(tipAmount);
        outTotal.textContent = formatMoney(totalAmount);
        outPerson.textContent = formatMoney(perPerson);
    }

    presetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active styling
            presetBtns.forEach(b => b.classList.add('secondary'));
            presetBtns.forEach(b => b.classList.remove('active'));
            
            e.target.classList.remove('secondary');
            e.target.classList.add('active');
            
            // Set value and clear custom
            currentPercent = parseFloat(e.target.getAttribute('data-val'));
            inputCustom.value = '';
            
            calculate();
        });
    });

    inputBill.addEventListener('input', calculate);
    inputCustom.addEventListener('input', calculate);
    inputSplit.addEventListener('input', calculate);
});
