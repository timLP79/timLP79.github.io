// Signal that JS is available (enables fade-in CSS)
document.documentElement.classList.add('js');

// ===== Active nav link =====
(function () {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(function (link) {
        const href = link.getAttribute('href');
        const matchesPath = path === '/' + href;
        const isHomeDefault = href === 'index.html' && path === '/';
        if (matchesPath || isHomeDefault) {
            link.classList.add('active');
        }
    });
})();

// ===== Fade-in on scroll =====
(function () {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });
})();

// ===== Project filter =====
(function () {
    const pills = document.querySelectorAll('.filter-pill');
    if (!pills.length) return;

    pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
            pills.forEach(function (p) { p.classList.remove('active'); });
            pill.classList.add('active');

            const tag = pill.dataset.filter;

            document.querySelectorAll('.card[data-tags]').forEach(function (card) {
                const tags = card.dataset.tags.split(' ');
                const show = tag === 'all' || tags.includes(tag);
                card.style.display = show ? '' : 'none';
                if (show) card.classList.add('visible');
            });

            document.querySelectorAll('.section-group').forEach(function (group) {
                const hasVisible = Array.from(group.querySelectorAll('.card[data-tags]'))
                    .some(function (c) { return c.style.display !== 'none'; });
                group.style.display = hasVisible ? '' : 'none';
            });
        });
    });
})();
