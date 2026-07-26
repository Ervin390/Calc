// Embed code builder for /embed/.
//
// Produces a sandboxed, lazily loaded iframe pointing at a tool page, plus
// a live preview so the person copying it can see what their readers get.

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('embed-tool');
    const height = document.getElementById('embed-height');
    const credit = document.getElementById('embed-credit');
    const code = document.getElementById('embed-code');
    const preview = document.getElementById('embed-preview');
    if (!select || !code) return;

    const ORIGIN = window.location.origin;

    function build() {
        const opt = select.options[select.selectedIndex];
        const path = select.value;
        const name = opt ? opt.getAttribute('data-name') : 'Calculator';
        let h = parseInt(height.value, 10);
        if (isNaN(h) || h < 300) h = 300;
        if (h > 1600) h = 1600;

        const src = ORIGIN + path + '?embed=1';
        const iframe =
            '<iframe src="' + src + '"\n' +
            '        title="' + name + ' by QuixCalc"\n' +
            '        width="100%" height="' + h + '"\n' +
            '        style="border:1px solid #dcdcde;border-radius:10px;max-width:100%"\n' +
            '        loading="lazy"\n' +
            '        sandbox="allow-scripts allow-same-origin"></iframe>';

        const line = credit && credit.checked
            ? '\n<p style="font-size:0.8rem;text-align:right;margin-top:0.35rem">' +
              '<a href="' + ORIGIN + path + '" target="_blank" rel="noopener">' + name + '</a> by QuixCalc</p>'
            : '';

        code.value = iframe + line;
        return { src: src, h: h, name: name };
    }

    function render() {
        const { src, h, name } = build();
        preview.innerHTML = '';
        const f = document.createElement('iframe');
        f.src = src;
        f.title = name + ' preview';
        f.width = '100%';
        f.height = String(h);
        f.style.border = '0';
        f.style.display = 'block';
        f.loading = 'lazy';
        f.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        preview.appendChild(f);
    }

    // Rebuild the snippet on every change, but only reload the preview frame
    // when the target or its size actually changes.
    select.addEventListener('change', render);
    height.addEventListener('change', render);
    height.addEventListener('input', build);
    if (credit) credit.addEventListener('change', build);

    render();
});
