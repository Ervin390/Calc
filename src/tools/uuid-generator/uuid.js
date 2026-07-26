document.addEventListener('DOMContentLoaded', () => {
    const btnGenerate = document.getElementById('btn-generate');
    const btnCopy = document.getElementById('btn-copy');
    const inputCount = document.getElementById('uuid-count');
    const checkUppercase = document.getElementById('uuid-uppercase');
    const checkHyphens = document.getElementById('uuid-hyphens');
    const resultArea = document.getElementById('uuid-result');

    function generateUUIDv4() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function handleGenerate() {
        const count = Math.min(Math.max(parseInt(inputCount.value) || 1, 1), 1000);
        const uppercase = checkUppercase.checked;
        const hyphens = checkHyphens.checked;
        
        let results = [];
        for (let i = 0; i < count; i++) {
            let u = generateUUIDv4();
            if (!hyphens) u = u.replace(/-/g, '');
            if (uppercase) u = u.toUpperCase();
            results.push(u);
        }
        
        resultArea.value = results.join('\n');
    }

    btnGenerate.addEventListener('click', handleGenerate);

    btnCopy.addEventListener('click', () => {
        if (!resultArea.value) return;
        navigator.clipboard.writeText(resultArea.value).then(() => {
            const originalText = btnCopy.textContent;
            btnCopy.textContent = 'Copied!';
            setTimeout(() => {
                btnCopy.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy', err);
        });
    });

    handleGenerate();
});
