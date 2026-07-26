// Share and copy controls, shared by every tool.
//
// [data-share]        copies the current URL, which state.js keeps in sync
//                     with the inputs, so the link reproduces the calculation
// [data-copy="sel"]   copies the text content of the matching result element
//
// Both fall back to a manual-copy hint if the Clipboard API refuses, which
// happens on insecure origins and when the user denies permission.

document.addEventListener('DOMContentLoaded', () => {
    const bar = document.querySelector('.tool-actions');
    if (!bar) return;

    const msg = bar.querySelector('.tool-actions-msg');
    let timer = null;

    function say(text, ok) {
        if (!msg) return;
        msg.textContent = text;
        msg.classList.toggle('is-error', ok === false);
        clearTimeout(timer);
        timer = setTimeout(() => {
            msg.textContent = '';
            msg.classList.remove('is-error');
        }, 2500);
    }

    function write(text, okText) {
        if (!text) {
            say('Nothing to copy yet', false);
            return;
        }
        if (!navigator.clipboard) {
            say('Press Ctrl+C to copy', false);
            return;
        }
        navigator.clipboard.writeText(text)
            .then(() => say(okText, true))
            .catch(() => say('Press Ctrl+C to copy', false));
    }

    const shareBtn = bar.querySelector('[data-share]');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            write(window.location.href, 'Link copied');
        });
    }

    const copyBtn = bar.querySelector('[data-copy]');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const el = document.querySelector(copyBtn.getAttribute('data-copy'));
            if (!el) {
                say('Nothing to copy yet', false);
                return;
            }
            const text = ('value' in el && el.value !== undefined && el.tagName === 'TEXTAREA')
                ? el.value
                : el.innerText.replace(/\n{2,}/g, '\n').trim();
            write(text, 'Result copied');
        });
    }
});
