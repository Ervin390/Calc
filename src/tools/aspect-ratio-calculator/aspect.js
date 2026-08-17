(function () {
    'use strict';

    function gcd(a, b) {
        a = Math.abs(Math.round(a));
        b = Math.abs(Math.round(b));
        return b === 0 ? a : gcd(b, a % b);
    }

    const w1Input = document.getElementById('arc-w1');
    const h1Input = document.getElementById('arc-h1');
    const w2Input = document.getElementById('arc-w2');
    const h2Input = document.getElementById('arc-h2');

    const outRatioSpan = document.getElementById('arc-out-ratio');
    const outDecimalSpan = document.getElementById('arc-out-decimal');
    const previewBox = document.getElementById('arc-preview-box');
    const previewLabel = document.getElementById('arc-preview-label');
    const presetSelect = document.getElementById('arc-preset');

    function updateRatio(lastChanged) {
        let w1 = parseFloat(w1Input.value) || 0;
        let h1 = parseFloat(h1Input.value) || 0;

        if (w1 <= 0 || h1 <= 0) return;

        // Simplify ratio using GCD
        const divisor = gcd(w1, h1);
        const rw = Math.round(w1 / divisor);
        const rh = Math.round(h1 / divisor);
        const decimalRatio = (w1 / h1).toFixed(2);

        if (outRatioSpan) outRatioSpan.textContent = `${rw}:${rh}`;
        if (outDecimalSpan) outDecimalSpan.textContent = `${decimalRatio}:1`;

        // Calculate missing dimension based on user input focus
        if (lastChanged === 'w2') {
            const w2 = parseFloat(w2Input.value) || 0;
            if (w2 > 0) {
                const calculatedH2 = Math.round(w2 * (h1 / w1));
                h2Input.value = calculatedH2;
            }
        } else {
            const w2 = parseFloat(w2Input.value) || 0;
            if (w2 > 0) {
                const calculatedH2 = Math.round(w2 * (h1 / w1));
                h2Input.value = calculatedH2;
            } else {
                const h2 = parseFloat(h2Input.value) || 0;
                if (h2 > 0) {
                    const calculatedW2 = Math.round(h2 * (w1 / h1));
                    w2Input.value = calculatedW2;
                }
            }
        }

        updatePreview(w1, h1, rw, rh);
    }

    function updatePreview(w, h, rw, rh) {
        if (!previewBox) return;

        const maxDim = 220; // max size in px
        let boxWidth, boxHeight;

        if (w >= h) {
            boxWidth = maxDim;
            boxHeight = Math.max(30, Math.round(maxDim * (h / w)));
        } else {
            boxHeight = maxDim;
            boxWidth = Math.max(30, Math.round(maxDim * (w / h)));
        }

        previewBox.style.width = `${boxWidth}px`;
        previewBox.style.height = `${boxHeight}px`;

        if (previewLabel) {
            previewLabel.textContent = `${Math.round(w)} × ${Math.round(h)} (${rw}:${rh})`;
        }
    }

    function setPresetRatio(rW, rH) {
        w1Input.value = rW;
        h1Input.value = rH;
        updateRatio('w1');
    }

    function handlePresetSelect() {
        if (!presetSelect || !presetSelect.value) return;
        const [w, h] = presetSelect.value.split('x').map(Number);
        if (w && h) {
            w1Input.value = w;
            h1Input.value = h;
            w2Input.value = w;
            updateRatio('w1');
        }
    }

    // Attach Event Listeners
    if (w1Input) w1Input.addEventListener('input', () => updateRatio('w1'));
    if (h1Input) h1Input.addEventListener('input', () => updateRatio('h1'));
    if (w2Input) w2Input.addEventListener('input', () => updateRatio('w2'));
    if (h2Input) h2Input.addEventListener('input', () => updateRatio('h2'));
    if (presetSelect) presetSelect.addEventListener('change', handlePresetSelect);

    // Preset Buttons
    document.querySelectorAll('[data-ratio]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const ratioStr = btn.getAttribute('data-ratio');
            const [rW, rH] = ratioStr.split(':').map(Number);
            if (rW && rH) setPresetRatio(rW, rH);
        });
    });

    // Initial Calculation
    updateRatio('w1');
})();
