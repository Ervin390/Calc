document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('course-container');
    const btnAddRow = document.getElementById('btn-addrow');
    const toggleBtns = document.querySelectorAll('#format-toggle button');
    const resultGPA = document.getElementById('gpa-result');
    const resultCredits = document.getElementById('gpa-credits');
    const priorGpaInput = document.getElementById('prior-gpa');
    const priorCreditsInput = document.getElementById('prior-credits');

    let mode = 'unweighted';

    function attachListeners(row) {
        row.querySelectorAll('select, input').forEach(el => {
            el.addEventListener('input', calculate);
        });
    }

    [priorGpaInput, priorCreditsInput].forEach(el => el.addEventListener('input', calculate));

    // Attach to existing rows
    container.querySelectorAll('.course-row').forEach(attachListeners);

    function calculate() {
        let totalQualityPoints = 0;
        let totalCredits = 0;

        const priorGPA = parseFloat(priorGpaInput.value) || 0;
        const priorCredits = parseFloat(priorCreditsInput.value) || 0;
        
        if (priorGPA > 0 && priorCredits > 0) {
            totalQualityPoints += (priorGPA * priorCredits);
            totalCredits += priorCredits;
        }

        const rows = container.querySelectorAll('.course-row');
        rows.forEach(row => {
            const gradeVal = parseFloat(row.querySelector('.course-grade').value);
            const credits = parseFloat(row.querySelector('.course-credits').value) || 0;
            
            let extraWeight = 0;
            if (mode === 'weighted') {
                extraWeight = parseFloat(row.querySelector('.course-weight').value) || 0;
            }

            // Standard logic: F (0.0) usually doesn't get extra weight.
            // But we'll apply it simply if grade > 0, or just add directly based on standard policies.
            if (gradeVal > 0) {
                extraWeight = mode === 'weighted' ? extraWeight : 0;
            } else {
                extraWeight = 0; // Don't add honors weight to an F
            }

            const points = (gradeVal + extraWeight) * credits;
            totalQualityPoints += points;
            totalCredits += credits;
        });

        if (totalCredits > 0) {
            const finalGPA = totalQualityPoints / totalCredits;
            resultGPA.textContent = finalGPA.toFixed(2);
        } else {
            resultGPA.textContent = "0.00";
        }
        
        resultCredits.textContent = totalCredits.toString();
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toggleBtns.forEach(b => b.classList.add('secondary'));
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            e.target.classList.remove('secondary');
            e.target.classList.add('active');
            
            mode = e.target.getAttribute('data-val');
            
            const weightCols = container.querySelectorAll('.weight-col');
            if (mode === 'weighted') {
                weightCols.forEach(col => col.style.display = 'block');
            } else {
                weightCols.forEach(col => col.style.display = 'none');
            }
            
            calculate();
        });
    });

    btnAddRow.addEventListener('click', () => {
        const rowHTML = `
            <div style="flex:2; min-width:150px;">
                <input type="text" placeholder="New Course" class="course-name" style="margin-bottom:0;">
            </div>
            <div style="flex:1; min-width:80px;">
                <select class="course-grade" style="margin-bottom:0;">
                    <option value="4.0">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.3">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.3">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.3">D+</option>
                    <option value="1.0">D</option>
                    <option value="0.0">F</option>
                </select>
            </div>
            <div style="flex:1; min-width:80px;">
                <input type="number" class="course-credits" value="3" min="0" step="0.5" style="margin-bottom:0;">
            </div>
            <div class="weight-col" style="flex:1; min-width:80px; display:${mode === 'weighted' ? 'block' : 'none'};">
                <select class="course-weight" style="margin-bottom:0;">
                    <option value="0">Regular</option>
                    <option value="0.5">Honors (+0.5)</option>
                    <option value="1.0">AP/IB/Col (+1.0)</option>
                </select>
            </div>
        `;
        const newRow = document.createElement('div');
        newRow.className = 'course-row';
        newRow.style = 'display: flex; gap: 1rem; align-items:flex-end; margin-bottom: 1rem; flex-wrap: wrap;';
        newRow.innerHTML = rowHTML;
        
        container.appendChild(newRow);
        attachListeners(newRow);
        calculate();
    });

    calculate();
});
