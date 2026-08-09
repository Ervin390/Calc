document.addEventListener('DOMContentLoaded', () => {
    const inputDistance   = document.getElementById('tc-distance');
    const inputMpg        = document.getElementById('tc-mpg');
    const inputPrice      = document.getElementById('tc-price');
    const inputPassengers = document.getElementById('tc-passengers');
    const inputExtra      = document.getElementById('tc-extra');

    const outTotal      = document.getElementById('out-tc-total');
    const outFuel       = document.getElementById('out-tc-fuel');
    const outPerPerson  = document.getElementById('out-tc-per-person');
    const outGallons    = document.getElementById('out-tc-gallons');
    const outPerMile    = document.getElementById('out-tc-per-mile');
    const outRoundtrip  = document.getElementById('out-tc-roundtrip');

    function fmt(n) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
    }

    function calculate() {
        const distance   = parseFloat(inputDistance.value)   || 0;
        const mpg        = parseFloat(inputMpg.value)        || 1;
        const price      = parseFloat(inputPrice.value)      || 0;
        const passengers = parseInt(inputPassengers.value)   || 1;
        const extra      = parseFloat(inputExtra.value)      || 0;

        const gallons    = distance / mpg;
        const fuelCost   = gallons * price;
        const totalCost  = fuelCost + extra;
        const perPerson  = totalCost / passengers;
        const perMile    = totalCost / (distance || 1);
        const roundtrip  = totalCost * 2;

        outTotal.textContent     = fmt(totalCost);
        outFuel.textContent      = fmt(fuelCost);
        outPerPerson.textContent = fmt(perPerson);
        outGallons.textContent   = gallons.toFixed(1) + ' gal';
        outPerMile.textContent   = '$' + perMile.toFixed(3);
        outRoundtrip.textContent = fmt(roundtrip);
    }

    [inputDistance, inputMpg, inputPrice, inputPassengers, inputExtra].forEach(el => {
        el.addEventListener('input', calculate);
    });

    // localStorage
    ['tc-distance', 'tc-mpg', 'tc-price'].forEach(id => {
        const saved = localStorage.getItem(id);
        if (saved) document.getElementById(id).value = saved;
        document.getElementById(id).addEventListener('change', () => {
            localStorage.setItem(id, document.getElementById(id).value);
        });
    });

    calculate();
});
