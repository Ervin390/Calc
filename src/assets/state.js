// Global State Manager for QuixCalc
//
// Two jobs:
//   1. Restore a tool's inputs from the URL query string (shared links)
//      or, failing that, from localStorage (your own last visit).
//   2. Mirror the current inputs back into both, so a calculation can be
//      copied out of the address bar and sent to somebody else.
//
// Everything stays on the device. Nothing is sent anywhere.

document.addEventListener('DOMContentLoaded', () => {
    const pageKey = 'quixcalc_state_' + window.location.pathname;

    const inputs = document.querySelectorAll(
        'input:not([type="hidden"]):not([type="button"]):not([type="submit"]), select, textarea'
    );
    if (inputs.length === 0) return;

    // While true, nothing is written back. Stops the synthetic events we
    // fire during hydration from stamping a query string onto a URL the
    // visitor has not actually interacted with yet.
    let hydrating = true;

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.toString().length > 0) {
        // 1. A shared link wins over anything stored locally.
        inputs.forEach(input => {
            if (!input.id || !urlParams.has(input.id)) return;
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = urlParams.get(input.id) === 'true';
            } else {
                input.value = urlParams.get(input.id);
            }
        });
    } else {
        // 2. Otherwise fall back to this visitor's last session.
        try {
            const saved = localStorage.getItem(pageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                inputs.forEach(input => {
                    if (!input.id || !Object.prototype.hasOwnProperty.call(parsed, input.id)) return;
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = parsed[input.id];
                    } else {
                        input.value = parsed[input.id];
                    }
                });
            }
        } catch (e) {
            // Corrupt or unavailable storage is not worth breaking the tool over.
        }
    }

    // 3. Tell each tool's own script to recalculate from the injected values.
    //    Deferred so the page's own (defer) script has bound its listeners.
    setTimeout(() => {
        inputs.forEach(input => {
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });

        document
            .querySelectorAll('button[id^="btn-calc"], button[id^="btn-roll"], button[id^="btn-spin"], button[id^="btn-generate"]')
            .forEach(btn => btn.click());

        hydrating = false;
    }, 150);

    // 4. Persist on interaction. The URL rewrite is debounced because
    //    browsers rate-limit history updates and typing fires fast.
    let pending = null;

    function persist() {
        const state = {};
        const params = new URLSearchParams();
        let hasUrlParam = false;

        inputs.forEach(input => {
            if (!input.id) return;
            const val = (input.type === 'checkbox' || input.type === 'radio') ? input.checked : input.value;
            state[input.id] = val;

            // Textareas are excluded from the URL: a long paste would blow
            // past practical URL length limits.
            if (input.tagName.toLowerCase() !== 'textarea' && val !== '' && val !== false) {
                params.set(input.id, val);
                hasUrlParam = true;
            }
        });

        try {
            localStorage.setItem(pageKey, JSON.stringify(state));
        } catch (e) {
            // Private browsing, quota exceeded — the tool still works.
        }

        // Keep flags that are not tool inputs, so an embedded copy stays
        // in embed mode after the visitor starts typing.
        const existing = new URLSearchParams(window.location.search);
        for (const key of ['embed']) {
            if (existing.has(key)) {
                params.set(key, existing.get(key));
                hasUrlParam = true;
            }
        }

        const newUrl = window.location.pathname + (hasUrlParam ? '?' + params.toString() : '');
        if (newUrl !== window.location.pathname + window.location.search) {
            window.history.replaceState({}, '', newUrl);
        }
    }

    function saveState() {
        if (hydrating) return;
        clearTimeout(pending);
        pending = setTimeout(persist, 250);
    }

    inputs.forEach(input => {
        input.addEventListener('change', saveState);
        input.addEventListener('input', saveState);
    });
});
