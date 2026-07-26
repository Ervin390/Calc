// Site search.
//
// The index is a single small JSON file fetched the first time the dialog
// opens, so it costs nothing on pages where nobody searches. Matching is a
// plain scored substring search, which is plenty for around ninety entries
// and avoids shipping a search library.

document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('search-open');
    const dialog = document.getElementById('search-dialog');
    if (!openBtn || !dialog) return;

    const input = dialog.querySelector('#search-input');
    const list = dialog.querySelector('#search-results');
    const empty = dialog.querySelector('#search-empty');
    const closeBtn = dialog.querySelector('#search-close');

    let index = null;
    let loading = null;
    let active = -1;
    let lastFocus = null;

    function load() {
        if (index) return Promise.resolve(index);
        if (loading) return loading;
        loading = fetch('/search-index.json')
            .then((r) => r.json())
            .then((data) => { index = data; return data; })
            .catch(() => { index = []; return index; });
        return loading;
    }

    function score(item, q) {
        const title = item.t.toLowerCase();
        const desc = (item.d || '').toLowerCase();
        if (title === q) return 100;
        if (title.startsWith(q)) return 80;
        if (title.includes(q)) return 60;
        // every word of the query present somewhere in the title
        const words = q.split(/\s+/).filter(Boolean);
        if (words.length > 1 && words.every((w) => title.includes(w))) return 45;
        if (desc.includes(q)) return 25;
        return 0;
    }

    function render(items, q) {
        list.innerHTML = '';
        active = -1;
        if (!items.length) {
            empty.hidden = false;
            empty.textContent = q ? 'Nothing matched "' + q + '"' : '';
            return;
        }
        empty.hidden = true;
        items.forEach((item, i) => {
            const li = document.createElement('li');
            li.setAttribute('role', 'option');
            li.id = 'search-opt-' + i;
            li.setAttribute('aria-selected', 'false');
            li.innerHTML =
                '<a href="' + item.u + '">' +
                '<span class="search-icon" aria-hidden="true">' + item.i + '</span>' +
                '<span class="search-text"><strong>' + item.t + '</strong>' +
                '<span class="search-desc">' + (item.d || '') + '</span></span>' +
                '<span class="search-kind">' + item.k + '</span></a>';
            list.appendChild(li);
        });
    }

    function search() {
        const q = input.value.trim().toLowerCase();
        if (!q) {
            render((index || []).filter((x) => x.k === 'tool').slice(0, 8), '');
            return;
        }
        const hits = (index || [])
            .map((x) => ({ x: x, s: score(x, q) }))
            .filter((r) => r.s > 0)
            .sort((a, b) => b.s - a.s || a.x.t.length - b.x.t.length)
            .slice(0, 10)
            .map((r) => r.x);
        render(hits, q);
    }

    function move(delta) {
        const opts = list.querySelectorAll('li');
        if (!opts.length) return;
        if (active >= 0) opts[active].setAttribute('aria-selected', 'false');
        active = (active + delta + opts.length) % opts.length;
        const el = opts[active];
        el.setAttribute('aria-selected', 'true');
        input.setAttribute('aria-activedescendant', el.id);
        el.scrollIntoView({ block: 'nearest' });
    }

    function open() {
        lastFocus = document.activeElement;
        dialog.hidden = false;
        document.body.style.overflow = 'hidden';
        openBtn.setAttribute('aria-expanded', 'true');
        load().then(search);
        input.focus();
    }

    function close() {
        dialog.hidden = true;
        document.body.style.overflow = '';
        openBtn.setAttribute('aria-expanded', 'false');
        input.value = '';
        list.innerHTML = '';
        if (lastFocus) lastFocus.focus();
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) close();
    });

    input.addEventListener('input', search);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
        else if (e.key === 'Enter') {
            const opts = list.querySelectorAll('li a');
            if (active >= 0 && opts[active]) { e.preventDefault(); window.location.href = opts[active].href; }
            else if (opts[0]) { e.preventDefault(); window.location.href = opts[0].href; }
        } else if (e.key === 'Escape') { close(); }
    });

    document.addEventListener('keydown', (e) => {
        if (!dialog.hidden && e.key === 'Escape') { close(); return; }
        if (dialog.hidden && e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
            e.preventDefault();
            open();
        }
    });
});
