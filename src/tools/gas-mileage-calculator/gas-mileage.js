document.addEventListener('DOMContentLoaded', () => {
    let isImperial = true;

    const btnImperial     = document.getElementById('btn-imperial');
    const btnMetric       = document.getElementById('btn-metric');
    const imperialInputs  = document.getElementById('imperial-inputs');
    const metricInputs    = document.getElementById('metric-inputs');

    const inputMiles      = document.getElementById('gm-miles');
    const inputGallons    = document.getElementById('gm-gallons');
    const inputKm         = document.getElementById('gm-km');
    const inputLiters     = document.getElementById('gm-liters');
    const inputPrice      = document.getElementById('gm-price');
    const inputAnnual     = document.getElementById('gm-annual-miles');

    const outMpg          = document.getElementById('out-gm-mpg');
    const outLabel        = document.getElementById('out-gm-efficiency-label');
    const outPerMile      = document.getElementById('out-gm-per-mile');
    const outAnnualCost   = document.getElementById('out-gm-annual');
    const outTripCost     = document.getElementById('out-gm-trip-cost');
    const outTripGallons  = document.getElementById('out-gm-trip-gallons');

    function fmt(n) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
    }

    function setMode(imperial) {
        isImperial = imperial;
        if (imperial) {
            imperialInputs.style.display = 'block';
            metricInputs.style.display   = 'none';
            btnImperial.style.background = 'var(--primary, #2563eb)';
            btnImperial.style.color      = '#fff';
            btnMetric.style.background   = '#e5e7eb';
            btnMetric.style.color        = '#374151';
            document.querySelector('label[for="gm-price"]').textContent = 'Fuel Price ($ per gallon)';
            document.querySelector('label[for="gm-annual-miles"]').textContent = 'Miles Driven Per Year';
        } else {
            imperialInputs.style.display = 'none';
            metricInputs.style.display   = 'block';
            btnMetric.style.background   = 'var(--primary, #2563eb)';
            btnMetric.style.color        = '#fff';
            btnImperial.style.background = '#e5e7eb';
            btnImperial.style.color      = '#374151';
            document.querySelector('label[for="gm-price"]').textContent = 'Fuel Price ($ per liter)';
            document.querySelector('label[for="gm-annual-miles"]').textContent = 'Kilometers Driven Per Year';
        }
        calculate();
    }

    function calculate() {
        const price      = parseFloat(inputPrice.value)  || 0;
        const annualDist = parseFloat(inputAnnual.value) || 0;

        if (isImperial) {
            const miles   = parseFloat(inputMiles.value)   || 0;
            const gallons = parseFloat(inputGallons.value) || 0;

            if (miles <= 0 || gallons <= 0) return;

            const mpg        = miles / gallons;
            const costPerMile = price / mpg;
            const annualCost  = costPerMile * annualDist;
            const tripCost    = gallons * price;

            outMpg.textContent         = mpg.toFixed(1) + ' MPG';
            outLabel.textContent       = 'Fuel Efficiency';
            outPerMile.textContent     = '$' + costPerMile.toFixed(3) + ' / mile';
            outAnnualCost.textContent  = fmt(annualCost) + ' / yr';
            outTripCost.textContent    = fmt(tripCost);
            outTripGallons.textContent = gallons.toFixed(2) + ' gal';
        } else {
            const km     = parseFloat(inputKm.value)     || 0;
            const liters = parseFloat(inputLiters.value) || 0;

            if (km <= 0 || liters <= 0) return;

            const l100km      = (liters / km) * 100;
            const costPerKm   = (price * liters) / km;
            const annualCost  = costPerKm * annualDist;
            const tripCost    = liters * price;

            outMpg.textContent         = l100km.toFixed(2) + ' L/100km';
            outLabel.textContent       = 'Fuel Efficiency';
            outPerMile.textContent     = '$' + costPerKm.toFixed(3) + ' / km';
            outAnnualCost.textContent  = fmt(annualCost) + ' / yr';
            outTripCost.textContent    = fmt(tripCost);
            outTripGallons.textContent = liters.toFixed(2) + ' L';
        }
    }

    btnImperial.addEventListener('click', () => setMode(true));
    btnMetric.addEventListener('click',   () => setMode(false));

    [inputMiles, inputGallons, inputKm, inputLiters, inputPrice, inputAnnual].forEach(el => {
        el.addEventListener('input', calculate);
    });

    calculate();
});
