const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Logo: build from one shared source, draw on load, replay on hover ── */
const src = document.getElementById('logo-src');
document.querySelectorAll('.logo').forEach(svg => {
    [...src.children].forEach(p => svg.append(p.cloneNode(true)));
});
const replay = svg => {
    svg.classList.remove('draw');
    void svg.getBoundingClientRect();
    svg.classList.add('draw');
};
document.querySelectorAll('.logo').forEach(svg => {
    svg.addEventListener('mouseenter', () => replay(svg));
});
replay(document.querySelector('.hero-logo'));

/* ── Smooth scroll (subtle) ── */
let cur = scrollY, target = scrollY, raf = null;
const maxY = () => document.documentElement.scrollHeight - innerHeight;

function tick() {
    cur += (target - cur) * 0.14;
    scrollTo(0, cur);
    if (Math.abs(target - cur) > 0.5) {
        raf = requestAnimationFrame(tick);
    } else {
        cur = target;
        scrollTo(0, cur);
        raf = null;
    }
}
function goTo(y) {
    target = Math.max(0, Math.min(y, maxY()));
    if (!raf) raf = requestAnimationFrame(tick);
}

if (!reduce) {
    addEventListener('wheel', e => {
        if (e.ctrlKey) return; // let pinch-zoom through
        e.preventDefault();
        if (!raf) cur = target = scrollY;
        goTo(target + e.deltaY * (e.deltaMode === 1 ? 33 : 1));
    }, { passive: false });

    addEventListener('scroll', () => {
        if (!raf) cur = target = scrollY;
    });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const el = document.querySelector(a.getAttribute('href'));
        if (!el) return;
        e.preventDefault();
        if (reduce) return el.scrollIntoView();
        if (!raf) cur = scrollY;
        goTo(el.id === 'top' ? 0 : el.getBoundingClientRect().top + scrollY - (document.querySelector('header').offsetHeight + 8));
    });
});

/* ── Nav letter-roll (uses sibling-index() where supported) ── */
document.querySelectorAll('.nav a').forEach(a => {
    const t = a.textContent.trim();
    a.setAttribute('aria-label', t);
    a.innerHTML = [...t].map(c => `<span aria-hidden="true" data-l="${c}"></span>`).join('');
});

/* ── Theme toggle ── */
document.getElementById('theme').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
});

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            en.target.classList.add('in');
            revealObs.unobserve(en.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Typewriter quote ── */
const q = document.getElementById('quote');
if (q) {
    const text = q.dataset.text, hl = q.dataset.hl.split(' ');
    const chars = [];
    q.setAttribute('aria-label', text);
    text.split(' ').forEach((word, i, arr) => {
        const w = document.createElement('span');
        w.className = 'w' + (hl.includes(word) ? ' hl' : '');
        w.setAttribute('aria-hidden', 'true');
        [...word].forEach(ch => {
            const c = document.createElement('span');
            c.className = 'c';
            c.textContent = ch;
            w.append(c);
            chars.push(c);
        });
        q.append(w);
        if (i < arr.length - 1) q.append(' ');
    });
    new IntersectionObserver((entries, obs) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        if (reduce) return chars.forEach(c => c.classList.add('on'));
        let i = 0;
        const t = setInterval(() => {
            chars[i++].classList.add('on');
            if (i >= chars.length) clearInterval(t);
        }, 38);
    }, { threshold: 0.6 }).observe(q);
}

/* ── Copy Discord handle with feedback ── */
const discord = document.getElementById('discord');
discord.addEventListener('click', async () => {
    const label = discord.textContent;
    try { await navigator.clipboard.writeText('@_pippz_'); } catch (e) {}
    discord.textContent = 'Copied ✓';
    setTimeout(() => (discord.textContent = label), 1600);
});
