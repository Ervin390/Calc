document.addEventListener('DOMContentLoaded', () => {
    const selCat = document.getElementById('fantasy-race');
    const selGender = document.getElementById('fantasy-gender');
    const inputCount = document.getElementById('fantasy-count');
    const outRes = document.getElementById('fantasy-results');
    const btnGen = document.getElementById('btn-generate-fantasy');
    const btnCopy = document.getElementById('btn-copy-fantasy');

    const names = {
        elf: [
            ['Ael', 'Fae', 'Gala', 'Lega', 'Silo', 'Illa', 'Gilo'],
            ['rion', 'las', 'driel', 'thal', 'veth', 'wen', 'miel']
        ],
        dwarf: [
            ['Thor', 'Gim', 'Bof', 'Dwal', 'Bal', 'Glon', 'Thor'],
            ['in', 'li', 'ur', 'in', 'in', 'ar', 'old']
        ],
        orc: [
            ['Grom', 'Mok', 'Gar', 'Thr', 'Urz', 'Bol', 'Gash'],
            ['mash', 'gar', 'rosh', 'all', 'og', 'guz', 'nak']
        ],
        human: [
            ['Ald', 'Ser', 'Cor', 'Iso', 'Bren', 'Val'],
            ['ric', 'aphine', 'vus', 'lde', 'nan', 'erius']
        ],
        scifi: [
            ['Vrex', 'Sul', 'Keth', 'Nor', 'Zyx', 'Ax'],
            ['ara', '-9', 'ryn', 'ion', ' Prime', ' Alpha']
        ],
        dark: [
            ['Mor', 'Mal', 'Vex', 'Zar', 'Kael', 'Drav'],
            ['gath', 'ice', 'en', 'os', 'thoz', 'en']
        ]
    };

    function randomEl(arr) {
        if (!window.crypto || !window.crypto.getRandomValues) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
        return arr[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296 * arr.length)];
    }

    function genName() {
        const cat = selCat.value;
        const pts = names[cat] || names['elf'];
        
        let count = parseInt(inputCount.value);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 50) count = 50;
        
        let results = [];
        for (let i = 0; i < count; i++) {
            const p1 = randomEl(pts[0]);
            const p2 = randomEl(pts[1]);
            results.push(p1 + p2);
        }
        
        outRes.value = results.join('\n');
    }

    btnGen.addEventListener('click', genName);
    
    btnCopy.addEventListener('click', () => {
        if (!outRes.value) return;
        const og = btnCopy.textContent;
        navigator.clipboard.writeText(outRes.value).then(() => {
            btnCopy.textContent = 'Copied!';
        }).catch(() => {
            btnCopy.textContent = 'Press Ctrl+C';
        });
        setTimeout(() => btnCopy.textContent = og, 2000);
    });
    
    genName();
});
