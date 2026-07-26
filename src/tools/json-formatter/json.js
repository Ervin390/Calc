document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('json-input');
    const outputArea = document.getElementById('json-output');
    const alertBox = document.getElementById('json-alert');
    
    const btnFormat = document.getElementById('btn-format');
    const btnMinify = document.getElementById('btn-minify');
    const btnCopy = document.getElementById('btn-copy-json');

    function hideError() {
        alertBox.style.display = 'none';
        alertBox.textContent = '';
    }

    function showError(msg) {
        alertBox.style.display = 'block';
        alertBox.textContent = msg;
    }

    function processJSON(mode) {
        hideError();
        const raw = inputArea.value.trim();
        if (!raw) {
            outputArea.value = '';
            return;
        }

        try {
            const parsed = JSON.parse(raw);
            if (mode === 'format') {
                outputArea.value = JSON.stringify(parsed, null, 4);
            } else {
                outputArea.value = JSON.stringify(parsed);
            }
        } catch (e) {
            showError('Invalid JSON format: ' + e.message);
        }
    }

    btnFormat.addEventListener('click', () => processJSON('format'));
    btnMinify.addEventListener('click', () => processJSON('minify'));

    btnCopy.addEventListener('click', () => {
        if (!outputArea.value) return;
        navigator.clipboard.writeText(outputArea.value).then(() => {
            const originalText = btnCopy.textContent;
            btnCopy.textContent = 'Copied!';
            setTimeout(() => {
                btnCopy.textContent = originalText;
            }, 2000);
        }).catch(() => {
            btnCopy.textContent = 'Press Ctrl+C';
        });
    });
});
