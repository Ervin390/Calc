document.addEventListener('DOMContentLoaded', () => {
    const selCat = document.getElementById('name-category');
    const selGender = document.getElementById('name-gender');
    const inputCount = document.getElementById('name-count');
    const btnGen = document.getElementById('btn-generate-names');
    const btnCopy = document.getElementById('btn-copy-names');
    const outRes = document.getElementById('name-results');

    // Mini databases (truncated for simplicity, in a real app would be huge)
    const db = {
        maleFirst: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'],
        femaleFirst: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle'],
        last: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'],
        fantasyPrefix: ['Aer', 'Al', 'Am', 'Bael', 'Bel', 'Cael', 'Cor', 'Dae', 'Dal', 'Eil', 'El', 'Fael', 'Fen', 'Gael', 'Gil', 'Hael', 'Hal', 'Ith', 'Kael', 'Kel', 'Lael', 'Lor', 'Mael', 'Mal', 'Nael', 'Nil', 'Oel', 'Pael', 'Rael', 'Ril', 'Sael', 'Syl', 'Tael', 'Thal', 'Uel', 'Vael', 'Val', 'Wael', 'Xael', 'Yel', 'Zael', 'Zil'],
        fantasySuffix: ['a', 'ar', 'as', 'dan', 'dar', 'dian', 'dor', 'drim', 'e', 'en', 'er', 'es', 'gorn', 'i', 'ia', 'ian', 'il', 'in', 'is', 'las', 'len', 'lin', 'lor', 'morn', 'o', 'on', 'or', 'os', 'phas', 'rad', 'ras', 'ren', 'rin', 'ron', 'th', 'thal', 'thor', 'u', 'us', 'yn', 'za'],
        scifiPrefix: ['Xen', 'Neb', 'Zor', 'Kry', 'Axi', 'Nova', 'Sol', 'Tek', 'Cy', 'Rex', 'Vex', 'Omi', 'Qua', 'Puls', 'Giga', 'Tera', 'Nano'],
        scifiSuffix: ['on', 'ar', 'ix', 'us', ' Prime', ' Alpha', ' Beta', ' 7', ' 9', 'tron', 'borg', 'net', 'sys', 'gen', 'flux', 'byte']
    };

    function randomEl(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generate() {
        const cat = selCat.value;
        const gender = selGender.value;
        let count = parseInt(inputCount.value);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 200) count = 200;

        let results = [];

        for (let i = 0; i < count; i++) {
            if (cat === 'human') {
                let first = '';
                if (gender === 'male') {
                    first = randomEl(db.maleFirst);
                } else if (gender === 'female') {
                    first = randomEl(db.femaleFirst);
                } else {
                    first = Math.random() > 0.5 ? randomEl(db.maleFirst) : randomEl(db.femaleFirst);
                }
                const last = randomEl(db.last);
                results.push(`${first} ${last}`);
            } else if (cat === 'fantasy') {
                const f = randomEl(db.fantasyPrefix) + randomEl(db.fantasySuffix);
                const l = randomEl(db.fantasyPrefix) + randomEl(db.fantasySuffix);
                results.push(`${f} ${l}`);
            } else if (cat === 'scifi') {
                // Sci-fi might just be one word or title
                const name = randomEl(db.scifiPrefix) + (Math.random() > 0.5 ? randomEl(db.scifiSuffix) : '');
                const full = Math.random() > 0.7 ? `${name}${randomEl(db.scifiSuffix)}` : name;
                results.push(full);
            }
        }

        // Final result pre-calculation
        const finalResults = results.join('\n');
        
        btnGen.disabled = true;
        btnGen.textContent = 'Generating...';

        const animDuration = 600 + Math.random() * 300;
        let startTime = null;

        function animateText(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (elapsed < animDuration) {
                // Generate fake intermediate random strings
                let tempResults = [];
                for (let i = 0; i < count; i++) {
                    // Pick random characters or just random names again
                    let tempWord = '';
                    if (Math.random() > 0.5) {
                        tempWord = randomEl(db.fantasyPrefix) + randomEl(db.fantasySuffix);
                    } else {
                        tempWord = randomEl(db.maleFirst) + ' ' + randomEl(db.last);
                    }
                    tempResults.push(tempWord);
                }
                outRes.classList.add('slot-animating');
                outRes.innerHTML = tempResults.join('<br>');
                requestAnimationFrame(animateText);
            } else {
                // Finish
                outRes.classList.remove('slot-animating');
                outRes.innerHTML = finalResults.replace(/\n/g, '<br>');
                btnGen.disabled = false;
                btnGen.textContent = 'Generate Names Now';
            }
        }
        
        requestAnimationFrame(animateText);
    }

    selCat.addEventListener('change', () => {
        if (selCat.value === 'human') {
            selGender.parentElement.style.opacity = '1';
            selGender.disabled = false;
        } else {
            selGender.parentElement.style.opacity = '0.5';
            selGender.disabled = true;
        }
    });

    btnGen.addEventListener('click', generate);

    btnCopy.addEventListener('click', () => {
        if (!outRes.innerText) return;
        navigator.clipboard.writeText(outRes.innerText).then(() => {
            const originalText = btnCopy.textContent;
            btnCopy.textContent = 'Copied!';
            setTimeout(() => {
                btnCopy.textContent = originalText;
            }, 2000);
        }).catch(() => {
            btnCopy.textContent = 'Press Ctrl+C';
        });
    });

    // Generate once on load
    generate();
});
