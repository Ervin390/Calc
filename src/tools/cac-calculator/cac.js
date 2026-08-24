(function () {
    const elAdSpend = document.getElementById('cac-ad-spend');
    const elSalaries = document.getElementById('cac-salaries');
    const elOverhead = document.getElementById('cac-overhead');
    const elCustomers = document.getElementById('cac-customers');

    const outMain = document.getElementById('out-cac-main');
    const outTotal = document.getElementById('out-cac-total');
    const outMktg = document.getElementById('out-cac-mktg');
    const outSales = document.getElementById('out-cac-sales');

    function formatCurrency(val) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
    }

    function calculate() {
        const adSpend = parseFloat(elAdSpend.value) || 0;
        const salaries = parseFloat(elSalaries.value) || 0;
        const overhead = parseFloat(elOverhead.value) || 0;
        const customers = parseInt(elCustomers.value, 10) || 0;

        const totalSpend = adSpend + salaries + overhead;

        if (customers <= 0) {
            outMain.textContent = '$0.00';
            outTotal.textContent = '$0.00';
            outMktg.textContent = '$0.00';
            outSales.textContent = '$0.00';
            return;
        }

        const cac = totalSpend / customers;
        const mktgPerCustomer = adSpend / customers;
        const salesPerCustomer = (salaries + overhead) / customers;

        outMain.textContent = formatCurrency(cac);
        outTotal.textContent = formatCurrency(totalSpend);
        outMktg.textContent = formatCurrency(mktgPerCustomer);
        outSales.textContent = formatCurrency(salesPerCustomer);
    }

    [elAdSpend, elSalaries, elOverhead, elCustomers].forEach(input => {
        if (input) input.addEventListener('input', calculate);
    });

    calculate();
})();
