// Lazy AdSense loader, per doc 03 section 0.2.
//
// Does nothing unless an ad slot is actually present in the page, and only
// pulls the AdSense script once a slot comes within a screen of the
// viewport. That keeps the third-party request off the critical path so it
// cannot drag LCP down.

document.addEventListener('DOMContentLoaded', () => {
    const slots = document.querySelectorAll('ins.adsbygoogle');
    if (!slots.length) return;

    const client = slots[0].getAttribute('data-ad-client');
    if (!client) return;

    let loaded = false;

    function loadOnce() {
        if (loaded) return;
        loaded = true;
        const s = document.createElement('script');
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(client);
        document.head.appendChild(s);
        slots.forEach(() => {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
    }

    if (!('IntersectionObserver' in window)) {
        loadOnce();
        return;
    }

    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (e.isIntersecting) {
                loadOnce();
                io.disconnect();
                break;
            }
        }
    }, { rootMargin: '100% 0px' });

    slots.forEach((el) => io.observe(el));
});
