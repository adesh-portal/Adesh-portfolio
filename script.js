'use strict';

(function () {
    const overlay = document.getElementById('boot-overlay');
    const bootLines = document.querySelectorAll('.boot-line');
    const bootAccess = document.getElementById('boot-access');
    const skipBtn = document.getElementById('boot-skip');

    function runBoot() {
        bootLines.forEach((line, i) => {
            const delay = parseInt(line.dataset.delay || i * 500);
            setTimeout(() => line.classList.add('visible'), delay);
        });

        setTimeout(() => bootAccess.classList.add('visible'), 3200);
        setTimeout(() => hideBoot(), 4400);
    }

    function hideBoot() {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAll();
    }

    function skipBoot() {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAll();
    }

    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', skipBoot);
    skipBtn && skipBtn.addEventListener('click', skipBoot);
    document.addEventListener('keydown', skipBoot, { once: true });

    setTimeout(runBoot, 200);
})();


/* ==========================================================================
   02. MAIN INIT — Called after boot completes
   ========================================================================== */
function initAll() {
    initScrollProgress();
    initNavbar();
    initHamburger();
    initHeroCanvas();
    initHeroTypewriter();
    initHeroTerminalJSON();
    initScrollReveal();
    initSkillBars();
    initOrbitCanvas();
    initNeuralVizCanvas();
    initThreatLog();
    initWorldMapCanvas();
    initNeuralBgCanvas();
    initContactCanvas();
    initCounters();
    initProjectFilters();
    initProjectModals();
    initTerminal();
    initNNMetrics();
    initParallax();
    initActiveNavHighlight();
}


/* ==========================================================================
   03. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = (window.scrollY / h) * 2100;
        bar.style.width = pct + '%';
    }, { passive: true });
}


/* ==========================================================================
   04. NAVBAR SCROLL
   ========================================================================== */
function initNavbar() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

function initHamburger() {
    const btn = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
}

function initActiveNavHighlight() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        links.forEach(l => {
            l.classList.toggle('active', l.dataset.section === current);
        });
    }, { passive: true });
}


/* ==========================================================================
   05. HERO CANVAS — Neural Network Particles
   ========================================================================== */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const nodes = [];
    const COUNT = 80;

    for (let i = 0; i < COUNT; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1,
            color: Math.random() > 0.6 ? '#00d4ff' : (Math.random() > 0.5 ? '#a855f7' : '#00ff88'),
            alpha: Math.random() * 0.5 + 0.2,
        });
    }

    let mx = -1000, my = -1000;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

            // Mouse repel
            const dx = n.x - mx, dy = n.y - my;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
                n.vx += dx / d * 0.05;
                n.vy += dy / d * 0.05;
            }

            // Draw node
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = n.color.replace(')', `, ${n.alpha})`).replace('rgb', 'rgba').replace('#00d4ff', `rgba(0,212,255,${n.alpha})`).replace('#a855f7', `rgba(168,85,247,${n.alpha})`).replace('#00ff88', `rgba(0,255,136,${n.alpha})`);
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - d / 130) * 0.15})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
}


/* ==========================================================================
   06. HERO TYPEWRITER
   ========================================================================== */
function initHeroTypewriter() {
    const el = document.getElementById('hero-typewriter');
    if (!el) return;

    const phrases = [
        'AI models that learn.',
        'cybersecurity systems.',
        'full-stack applications.',
        'neural networks.',
        'secure APIs.',
        'intelligent solutions.'
    ];

    let idx = 0, char = 0, deleting = false, speed = 85;

    function type() {
        const phrase = phrases[idx];
        el.textContent = phrase.substring(0, char);

        if (!deleting) {
            char++;
            speed = 85;
            if (char > phrase.length) { deleting = true; speed = 2000; }
        } else {
            char--;
            speed = 40;
            if (char === 0) { deleting = false; idx = (idx + 1) % phrases.length; speed = 400; }
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 800);
}


/* ==========================================================================
   07. HERO TERMINAL JSON OUTPUT
   ========================================================================== */
function initHeroTerminalJSON() {
    const el = document.getElementById('skills-json-output');
    if (!el) return;

    const json = `{
  "domains": ["AI/ML", "CyberSec", "Dev"],
  "languages": ["Python", "Java", "JS"],
  "frameworks": ["TensorFlow", "React"],
  "tools": ["Kali", "Git", "Docker"],
  "gpa": "9.2 / 10.0"
}`;

    let i = 0;
    const interval = setInterval(() => {
        el.textContent = json.slice(0, i);
        i++;
        if (i > json.length) clearInterval(interval);
    }, 18);
}


/* ==========================================================================
   08. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .et-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--delay') || '0');
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    // Trigger skill bars on about section
                    const fills = entry.target.querySelectorAll('.sbi-fill, .ac-fill');
                    fills.forEach(f => {
                        setTimeout(() => {
                            f.style.width = f.style.getPropertyValue('--w') || getComputedStyle(f).getPropertyValue('--w');
                        }, 100);
                    });
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(t => observer.observe(t));
}


/* ==========================================================================
   09. SKILL BARS
   ========================================================================== */
function initSkillBars() {
    const bars = document.querySelectorAll('.sbi-fill, .ac-fill');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = el.style.getPropertyValue('--w') || getComputedStyle(el).getPropertyValue('--w');
                setTimeout(() => { el.style.width = target; }, 200);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(b => obs.observe(b));
}


/* ==========================================================================
   10. SKILLS ORBIT CANVAS
   ========================================================================== */
function initOrbitCanvas() {
    const canvas = document.getElementById('skills-orbit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const infoPanel = document.getElementById('orbit-info');
    const oipDefault = infoPanel.querySelector('.oip-default');
    const oipDetail = document.getElementById('oip-detail');
    const oipName = document.getElementById('oip-name');
    const oipCat = document.getElementById('oip-category');
    const oipBar = document.getElementById('oip-bar');
    const oipDesc = document.getElementById('oip-desc');

    const skills = [
        { name: 'Python', cat: 'Language', r: 70, angle: 0, speed: 0.008, color: '#fcc43c', icon: '🐍', pct: 88, desc: 'Primary language for AI/ML pipelines, scripting, automation, and backend services.' },
        { name: 'React', cat: 'Frontend', r: 120, angle: 1.2, speed: 0.006, color: '#58c4dc', icon: '⚛', pct: 85, desc: 'Building interactive SPAs, custom hooks, state management, and glassmorphic UIs.' },
        { name: 'TensorFlow', cat: 'AI/ML', r: 165, angle: 2.5, speed: 0.004, color: '#ff8a00', icon: '🧠', pct: 80, desc: 'Training CNNs, RNNs, and building end-to-end ML pipelines for production.' },
        { name: 'Java', cat: 'Language', r: 70, angle: 3.1, speed: -0.009, color: '#f89820', icon: '☕', pct: 87, desc: 'Core OOP, multithreading, JDBC database connectivity, and Spring framework basics.' },
        { name: 'Cybersecurity', cat: 'Security', r: 120, angle: 4.3, speed: -0.005, color: '#00ff88', icon: '🛡', pct: 78, desc: 'Network defense, penetration testing, cryptography, and OWASP threat modeling.' },
        { name: 'Node.js', cat: 'Backend', r: 165, angle: 5.2, speed: 0.003, color: '#6cc24a', icon: '⬡', pct: 82, desc: 'RESTful APIs, WebSocket servers, authentication flows, and microservices.' },
        { name: 'SQL / MySQL', cat: 'Database', r: 95, angle: 0.8, speed: -0.007, color: '#00758f', icon: '🗄', pct: 86, desc: 'Relational design, normalization (1NF-BCNF), indexing, complex joins, and ORM.' },
        { name: 'PyTorch', cat: 'AI/ML', r: 140, angle: 2.0, speed: 0.005, color: '#ee4c2c', icon: '🔥', pct: 75, desc: 'Dynamic computation graphs, custom training loops, and research-grade model building.' },
        { name: 'JavaScript', cat: 'Language', r: 200, angle: 3.8, speed: -0.003, color: '#f7df1e', icon: '⚡', pct: 91, desc: 'DOM manipulation, async/await, canvas animations, and real-time web applications.' },
        { name: 'Linux', cat: 'OS', r: 95, angle: 5.8, speed: 0.007, color: '#ff7b00', icon: '🐧', pct: 80, desc: 'CLI proficiency, bash scripting, process management, networking tools, and Kali.' },
    ];

    function resize() {
        const size = canvas.parentElement.offsetWidth;
        canvas.width = size;
        canvas.height = size;
    }
    resize();
    window.addEventListener('resize', resize);

    let mx = -1000, my = -1000;
    let hovered = null;

    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mx = -1000; my = -1000;
        hovered = null;
        oipDefault.style.display = 'flex';
        oipDetail.style.display = 'none';
    });

    function drawOrbit() {
        const W = canvas.width;
        const H = canvas.height;
        const cx = W / 2;
        const cy = H / 2;

        ctx.clearRect(0, 0, W, H);

        // Draw orbit rings
        [70, 95, 120, 140, 165, 200].forEach(r => {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        hovered = null;

        skills.forEach(s => {
            s.angle += s.speed;
            const x = cx + s.r * Math.cos(s.angle);
            const y = cy + s.r * Math.sin(s.angle);
            const dist = Math.hypot(mx - x, my - y);
            const isHov = dist < 26;
            if (isHov) hovered = s;

            // Connection line
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.strokeStyle = isHov
                ? `${s.color}50`
                : 'rgba(255,255,255,0.04)';
            ctx.lineWidth = isHov ? 1.5 : 0.8;
            ctx.setLineDash(isHov ? [5, 4] : []);
            ctx.stroke();
            ctx.setLineDash([]);

            // Glow aura
            if (isHov) {
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 36);
                grad.addColorStop(0, s.color + '30');
                grad.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.arc(x, y, 36, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // Node circle
            ctx.beginPath();
            ctx.arc(x, y, isHov ? 22 : 18, 0, Math.PI * 2);
            ctx.fillStyle = isHov
                ? s.color + '22'
                : 'rgba(8, 15, 35, 0.9)';
            ctx.strokeStyle = isHov ? s.color : 'rgba(255,255,255,0.12)';
            ctx.lineWidth = isHov ? 2 : 1.2;
            if (isHov) ctx.shadowBlur = 14;
            ctx.shadowColor = s.color;
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Label
            ctx.fillStyle = isHov ? '#fff' : 'rgba(255,255,255,0.7)';
            ctx.font = `bold ${isHov ? 8.5 : 7.5}px 'Space Grotesk', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const label = s.name.split('/')[0].split('.')[0].substring(0, 8);
            ctx.fillText(label, x, y);
        });

        // Update info panel
        if (hovered) {
            oipDefault.style.display = 'none';
            oipDetail.style.display = 'block';
            oipName.textContent = hovered.name;
            oipCat.textContent = hovered.cat.toUpperCase();
            oipBar.style.width = hovered.pct + '%';
            oipBar.style.background = `linear-gradient(90deg, ${hovered.color}, #a855f7)`;
            oipDesc.textContent = hovered.desc;
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'crosshair';
        }

        requestAnimationFrame(drawOrbit);
    }
    drawOrbit();
}


/* ==========================================================================
   11. NEURAL NETWORK VIZ (AI Lab panel)
   ========================================================================== */
const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let time = 0;

const particles = [];

for (let i = 0; i < 120; i++) {
    particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 80 + Math.random() * 180,
        size: 1 + Math.random() * 3,
        speed: 0.002 + Math.random() * 0.004
    });
}

function draw() {

    const w = canvas.width;
    const h = canvas.height;

    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // GRID

    ctx.strokeStyle = "rgba(255,255,255,.04)";

    for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    // OUTER RINGS

    for (let r = 120; r <= 240; r += 40) {

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            r,
            time * 0.003,
            Math.PI * 2 + time * 0.003
        );

        ctx.strokeStyle =
            "rgba(0,212,255,.15)";

        ctx.lineWidth = 1;

        ctx.stroke();
    }

    // CORE GLOW

    const glow =
        ctx.createRadialGradient(
            cx, cy, 0,
            cx, cy, 120
        );

    glow.addColorStop(
        0,
        "rgba(0,212,255,.9)"
    );

    glow.addColorStop(
        1,
        "rgba(0,212,255,0)"
    );

    ctx.beginPath();
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // CORE

    ctx.beginPath();
    ctx.arc(
        cx,
        cy,
        30 + Math.sin(time * 0.05) * 5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#00d4ff";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#00d4ff";
    ctx.fill();

    ctx.shadowBlur = 0;

    // PARTICLES

    particles.forEach(p => {

        p.angle += p.speed;

        const x =
            cx + Math.cos(p.angle) * p.radius;

        const y =
            cy + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(
            x,
            y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#a855f7";
        ctx.fill();

        // CONNECTION TO CORE

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);

        ctx.strokeStyle =
            "rgba(168,85,247,.08)";

        ctx.stroke();
    });

    // SCAN LINE

    const scan =
        (time * 2) % (h + 100);

    ctx.fillStyle =
        "rgba(0,212,255,.04)";

    ctx.fillRect(
        0,
        scan,
        w,
        40
    );

    time++;

    requestAnimationFrame(draw);
}

draw();


/* ==========================================================================
   12. NN METRICS UPDATER (AI Lab)
   ========================================================================== */
function initNNMetrics() {
    const lossEl = document.getElementById('nn-loss');
    const accEl = document.getElementById('nn-acc');
    const epochEl = document.getElementById('nn-epoch');
    const progressEl = document.getElementById('np-progress');

    if (!lossEl) return;

    let epoch = 47;
    let loss = 0.0412;
    let acc = 94.7;

    setInterval(() => {
        epoch = Math.min(100, epoch + 1);
        loss = Math.max(0.005, loss - Math.random() * 0.002 + Math.random() * 0.0005);
        acc = Math.min(99.9, acc + Math.random() * 0.1 - 0.02);

        lossEl.textContent = loss.toFixed(4);
        accEl.textContent = acc.toFixed(1) + '%';
        epochEl.textContent = epoch + '/100';
        progressEl.style.width = epoch + '%';

        if (epoch >= 100) epoch = 0;
    }, 1800);
}


/* ==========================================================================
   13. WORLD MAP SIMULATION (Cybersecurity)
   ========================================================================== */
function initWorldMapCanvas() {
    const canvas = document.getElementById('world-map-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Simplified dot-map continents
    const dots = [];
    const continentRegions = [
        // North America
        ...Array.from({ length: 30 }, () => ({ x: 0.1 + Math.random() * 0.18, y: 0.15 + Math.random() * 0.3 })),
        // South America
        ...Array.from({ length: 20 }, () => ({ x: 0.2 + Math.random() * 0.1, y: 0.48 + Math.random() * 0.3 })),
        // Europe
        ...Array.from({ length: 25 }, () => ({ x: 0.42 + Math.random() * 0.1, y: 0.15 + Math.random() * 0.2 })),
        // Africa
        ...Array.from({ length: 20 }, () => ({ x: 0.44 + Math.random() * 0.1, y: 0.35 + Math.random() * 0.3 })),
        // Asia
        ...Array.from({ length: 40 }, () => ({ x: 0.55 + Math.random() * 0.25, y: 0.1 + Math.random() * 0.35 })),
        // Oceania
        ...Array.from({ length: 10 }, () => ({ x: 0.78 + Math.random() * 0.12, y: 0.6 + Math.random() * 0.2 })),
    ];

    // Active threats (animated)
    const threats = Array.from({ length: 8 }, () => ({
        src: { x: Math.random(), y: Math.random() * 0.7 },
        dst: { x: 0.45 + Math.random() * 0.1, y: 0.35 + Math.random() * 0.1 }, // target: India
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        color: Math.random() > 0.4 ? '#ff4d6d' : '#f59e0b',
        active: Math.random() > 0.3
    }));

    function drawMap() {
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // Draw continent dots
        continentRegions.forEach(d => {
            ctx.beginPath();
            ctx.arc(d.x * W, d.y * H, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
            ctx.fill();
        });

        // Draw threat arcs
        threats.forEach(t => {
            if (!t.active) return;
            t.progress += t.speed;
            if (t.progress > 1) { t.progress = 0; t.active = Math.random() > 0.15; }

            const sx = t.src.x * W, sy = t.src.y * H;
            const ex = t.dst.x * W, ey = t.dst.y * H;
            const mx2 = (sx + ex) / 2, my2 = Math.min(sy, ey) - 50;

            // Draw arc trail
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.quadraticCurveTo(mx2, my2, ex, ey);
            ctx.strokeStyle = t.color + '18';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw moving dot
            const bt = t.progress;
            const px = (1 - bt) * (1 - bt) * sx + 2 * (1 - bt) * bt * mx2 + bt * bt * ex;
            const py = (1 - bt) * (1 - bt) * sy + 2 * (1 - bt) * bt * my2 + bt * bt * ey;

            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = t.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = t.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Target marker (India/defender)
        const tx = 0.65 * W, ty = 0.38 * H;
        ctx.beginPath();
        ctx.arc(tx, ty, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,136,0.3)';
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        // Pulse rings
        const pTime = Date.now() / 1000;
        [1, 2].forEach(i => {
            const radius = 12 + ((pTime * 0.8 + i * 0.5) % 1) * 25;
            const alpha = 1 - ((pTime * 0.8 + i * 0.5) % 1);
            ctx.beginPath();
            ctx.arc(tx, ty, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,255,136,${alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        requestAnimationFrame(drawMap);
    }
    drawMap();
}


/* ==========================================================================
   14. THREAT LOG UPDATER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       THREAT LOG
    ========================== */

    const threatLog =
        document.getElementById("threat-log");

    const threatEvents = [

        {
            type: "blocked",
            msg: "SQL Injection blocked — Database Layer"
        },

        {
            type: "blocked",
            msg: "Brute Force Attack prevented"
        },

        {
            type: "monitored",
            msg: "Suspicious Traffic Pattern detected"
        },

        {
            type: "blocked",
            msg: "XSS Payload filtered"
        },

        {
            type: "monitored",
            msg: "DNS Anomaly under observation"
        },

        {
            type: "blocked",
            msg: "Port Scan blocked by Firewall"
        },

        {
            type: "monitored",
            msg: "Geo-location login anomaly"
        },

        {
            type: "blocked",
            msg: "CSRF attack attempt denied"
        }
    ];

    function addThreatEvent() {

        if (!threatLog) return;

        const ev =
            threatEvents[
            Math.floor(
                Math.random() *
                threatEvents.length
            )
            ];

        const now = new Date();

        const time =
            now.toLocaleTimeString();

        const entry =
            document.createElement("div");

        entry.className =
            "tl-entry";

        entry.innerHTML = `
            <span class="tl-time">${time}</span>

            <span class="tl-type ${ev.type}">
                ${ev.type === "blocked"
                ? "BLOCKED"
                : "MONITOR"
            }
            </span>

            <span class="tl-msg">
                ${ev.msg}
            </span>
        `;

        entry.style.opacity = "0";
        entry.style.transform =
            "translateY(-10px)";

        threatLog.prepend(entry);

        requestAnimationFrame(() => {

            entry.style.transition =
                "all .35s ease";

            entry.style.opacity = "1";

            entry.style.transform =
                "translateY(0)";
        });

        while (
            threatLog.children.length > 8
        ) {
            threatLog.removeChild(
                threatLog.lastChild
            );
        }
    }

    setInterval(
        addThreatEvent,
        3000
    );

    /* =========================
       THREAT MAP CANVAS
    ========================== */

    const canvas =
        document.getElementById(
            "world-map-canvas"
        );

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width =
            canvas.offsetWidth;

        canvas.height =
            canvas.offsetHeight;
    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    /* Countries / Regions */

    const regions = [

        {
            name: "USA",
            x: 0.15,
            y: 0.30
        },

        {
            name: "Europe",
            x: 0.38,
            y: 0.25
        },

        {
            name: "Middle East",
            x: 0.48,
            y: 0.40
        },

        {
            name: "India",
            x: 0.58,
            y: 0.38
        },

        {
            name: "China",
            x: 0.72,
            y: 0.30
        },

        {
            name: "Japan",
            x: 0.84,
            y: 0.32
        },

        {
            name: "Australia",
            x: 0.82,
            y: 0.72
        },

        {
            name: "Africa",
            x: 0.42,
            y: 0.62
        }
    ];

    const attacks = [];

    function createAttack() {

        let from =
            regions[
            Math.floor(
                Math.random() *
                regions.length
            )
            ];

        let to =
            regions[
            Math.floor(
                Math.random() *
                regions.length
            )
            ];

        if (from === to) return;

        attacks.push({

            from,

            to,

            progress: 0,

            speed:
                0.006 +
                Math.random() *
                0.008
        });
    }

    setInterval(
        createAttack,
        1200
    );

    function drawBackgroundGrid() {

        const w = canvas.width;
        const h = canvas.height;

        ctx.strokeStyle =
            "rgba(255,255,255,.03)";

        ctx.lineWidth = 1;

        for (
            let x = 0;
            x < w;
            x += 40
        ) {

            ctx.beginPath();

            ctx.moveTo(x, 0);

            ctx.lineTo(x, h);

            ctx.stroke();
        }

        for (
            let y = 0;
            y < h;
            y += 40
        ) {

            ctx.beginPath();

            ctx.moveTo(0, y);

            ctx.lineTo(w, y);

            ctx.stroke();
        }
    }

    function animate() {

        const w =
            canvas.width;

        const h =
            canvas.height;

        ctx.clearRect(
            0,
            0,
            w,
            h
        );

        drawBackgroundGrid();

        /* Draw regions */

        regions.forEach(region => {

            const x =
                region.x * w;

            const y =
                region.y * h;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                6,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#00ff88";

            ctx.shadowBlur = 15;

            ctx.shadowColor =
                "#00ff88";

            ctx.fill();

            ctx.shadowBlur = 0;

            ctx.fillStyle =
                "#94a3b8";

            ctx.font =
                "12px monospace";

            ctx.fillText(
                region.name,
                x + 10,
                y + 4
            );
        });

        /* Draw attacks */

        attacks.forEach(
            (
                attack,
                index
            ) => {

                const sx =
                    attack.from.x *
                    w;

                const sy =
                    attack.from.y *
                    h;

                const ex =
                    attack.to.x *
                    w;

                const ey =
                    attack.to.y *
                    h;

                /* attack line */

                ctx.beginPath();

                ctx.moveTo(
                    sx,
                    sy
                );

                ctx.lineTo(
                    ex,
                    ey
                );

                ctx.strokeStyle =
                    "rgba(255,77,109,.18)";

                ctx.lineWidth = 1.5;

                ctx.stroke();

                attack.progress +=
                    attack.speed;

                const px =
                    sx +
                    (ex - sx) *
                    attack.progress;

                const py =
                    sy +
                    (ey - sy) *
                    attack.progress;

                /* moving packet */

                ctx.beginPath();

                ctx.arc(
                    px,
                    py,
                    4,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "#ff4d6d";

                ctx.shadowBlur = 20;

                ctx.shadowColor =
                    "#ff4d6d";

                ctx.fill();

                ctx.shadowBlur = 0;

                if (
                    attack.progress >= 1
                ) {

                    attacks.splice(
                        index,
                        1
                    );
                }
            }
        );

        requestAnimationFrame(
            animate
        );
    }

    animate();

});


/* ==========================================================================
   15. BACKGROUND NEURAL CANVAS (ai lab section bg)
   ========================================================================== */
function initNeuralBgCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
    }));

    function draw() {
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;

            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(168,85,247,0.5)';
            ctx.fill();
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - d / 120) * 0.3})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
}


/* ==========================================================================
   16. CONTACT CANVAS (Wave / Satellite lines)
   ========================================================================== */
function initContactCanvas() {
    const canvas = document.getElementById('contact-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;

    function draw() {
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // Animated wave lines
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            for (let x = 0; x <= W; x += 4) {
                const y = H * 0.5 +
                    Math.sin((x / W) * Math.PI * 3 + t * 0.02 + i * 0.8) * (30 + i * 15) +
                    Math.sin((x / W) * Math.PI * 5 + t * 0.015 + i) * 15;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 + i * 0.01})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        t++;
        requestAnimationFrame(draw);
    }
    draw();
}


/* ==========================================================================
   17. ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const gpaCounters = document.querySelectorAll('.gpa-counter');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.target) || 0;
                animateCounter(el, 0, target, 1800);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => obs.observe(c));
    gpaCounters.forEach(c => {
        const val = parseFloat(c.textContent);
        const obs2 = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                obs2.unobserve(c);
            }
        }, { threshold: 0.5 });
        obs2.observe(c);
    });
}

function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(start + (end - start) * eased);
        el.textContent = value >= 1000 ? value.toLocaleString() : value;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = end >= 1000 ? end.toLocaleString() : end;
    }
    requestAnimationFrame(update);
}


/* ==========================================================================
   18. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
    const btns = document.querySelectorAll('.pf-btn');
    const cards = document.querySelectorAll('.pj-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const cats = card.dataset.category || '';
                const show = filter === 'all' || cats.split(' ').includes(filter);
                card.style.display = show ? 'flex' : 'none';
                if (show) {
                    card.animate([
                        { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
                        { opacity: 1, transform: 'scale(1) translateY(0)' }
                    ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
                }
            });
        });
    });
}


/* ==========================================================================
   19. PROJECT MODALS
   ========================================================================== */
const projectData = {
    trading: {
        tag: 'Full-Stack · Web Analytics',
        title: 'Neon Trading Dashboard',
        image: 'assets/project-trading.png',
        color: '#00d4ff',
        desc: 'A premium, high-fidelity stock and cryptocurrency portfolio tracker that simulates live price feeds, detailed chart visualizers, and a full transaction history ledger. Built with a glassmorphic dark theme and fully responsive.',
        features: [
            'Live-updating ticker feeds with neon green/red trend indicators',
            'Interactive charting with date-range filters (1D, 1W, 1M, 1Y)',
            'Transaction Ledger: purchase logs, commission calculations, P&L',
            'Responsive glassmorphic layout optimized for all viewports',
        ],
        tech: ['Vanilla JavaScript', 'CSS Grid / Flexbox', 'Chart.js', 'Canvas API', 'Local Storage'],
    },
    codehub: {
        tag: 'Tool · Web Systems',
        title: 'CodeHub Workspace',
        image: 'assets/project-editor.png',
        color: '#a855f7',
        desc: 'An online collaborative sandbox workspace simulation. Features a real-time file tree, multi-tab code editing with syntax highlighting, theme switching, and a mock terminal execution simulator.',
        features: [
            'Simulated file browser with nested folder/file creation',
            'Multi-tab editor: switch code blocks dynamically in one workspace',
            'Visual theme choices: Neon Purple, Dracula Dark, Space Retro',
            'Mock terminal with compile status output simulation',
        ],
        tech: ['React.js', 'Vite', 'PrismJS', 'CSS Flexbox', 'Socket.io (mock)'],
    },
    dbms: {
        tag: 'Academic · Database',
        title: 'BCA Portal Optimizer',
        icon: '🗄',
        color: '#00d4ff',
        desc: 'A comprehensive academic planning software optimizing college scheduling databases. Employs normalization from 1NF to BCNF to reduce scheduling redundancies and speed up student query times with a Python GUI.',
        features: [
            'Normalized schema maps courses, semesters, professors, and grades',
            'SQL optimization: indices for GPA rank queries and timetable lookups',
            'Python GUI backend manages tables, parses XML, outputs SVG reports',
        ],
        tech: ['MySQL Server', 'Python', 'SQLAlchemy ORM', 'Tkinter', 'XML Parsing'],
    },
    ids: {
        tag: 'AI · Cybersecurity',
        title: 'ML Intrusion Detection System',
        icon: '🛡',
        color: '#00ff88',
        desc: 'A machine-learning powered network intrusion detection system trained on the NSL-KDD dataset. Uses an ensemble of Random Forest and LSTM models to achieve 97%+ accuracy in classifying attack types in real-time network traffic.',
        features: [
            'Random Forest + LSTM ensemble model with 97.3% accuracy on NSL-KDD',
            'Real-time traffic classification: DoS, Probe, R2L, U2R attack categories',
            'Web dashboard with live threat visualization and alert system',
            'Feature engineering pipeline with PCA dimensionality reduction',
        ],
        tech: ['Python', 'Scikit-learn', 'TensorFlow/Keras', 'Pandas', 'Flask', 'Matplotlib'],
    },
    nlp: {
        tag: 'AI · NLP',
        title: 'NLP Sentiment Analyzer',
        icon: '🧠',
        color: '#a855f7',
        desc: 'Real-time sentiment analysis engine using fine-tuned BERT on Twitter datasets. Classifies tweets as positive, negative, or neutral with 91% F1-score. Exposed as a REST API with a React dashboard for visualization.',
        features: [
            'BERT fine-tuning on 50K+ labeled Twitter/social media samples',
            '91% F1-score across 3-class sentiment classification',
            'Flask REST API for real-time inference with batch processing',
            'React frontend with live sentiment distribution charts',
        ],
        tech: ['PyTorch', 'HuggingFace Transformers', 'BERT', 'Flask', 'React', 'Plotly'],
    },
    crypto: {
        tag: 'Cybersecurity · Tool',
        title: 'Cryptography Toolkit',
        icon: '🔐',
        color: '#f59e0b',
        desc: 'An interactive cryptography laboratory demonstrating core security concepts. Features AES/RSA encryption demos, SHA hash generation, a password strength analyzer with breach checking, and JWT token decoder.',
        features: [
            'AES-128/256 and RSA-2048 encrypt/decrypt demonstration',
            'Hash generator: MD5, SHA-1, SHA-256, SHA-512, bcrypt',
            'Password strength analyzer with zxcvbn scoring algorithm',
            'JWT decoder and validator with algorithm info display',
        ],
        tech: ['Python', 'Cryptography library', 'JavaScript', 'CryptoJS', 'Flask', 'HTML5'],
    },
};

function initProjectModals() {
    const overlay = document.getElementById('pj-modal');
    const closeBtn = document.getElementById('pj-modal-close');
    const content = document.getElementById('pj-modal-content');

    document.querySelectorAll('.pj-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.project;
            const data = projectData[id];
            if (!data) return;

            const imgHTML = data.image
                ? `<img src="${data.image}" alt="${data.title}" class="modal-img">`
                : `<div class="modal-placeholder" style="color:${data.color}"><i style="color:${data.color}">${data.icon || '⚡'}</i></div>`;

            content.innerHTML = `
                <span class="modal-tag">${data.tag}</span>
                <h2 class="modal-title">${data.title}</h2>
                ${imgHTML}
                <p class="modal-desc">${data.desc}</p>
                <div class="modal-sub">Key Features</div>
                <ul class="modal-features">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <div class="modal-sub">Tech Stack</div>
                <div class="modal-tech">
                    ${data.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="modal-actions">
                    <a href="https://github.com" target="_blank" class="btn-primary">
                        <i class="fa-brands fa-github"></i> View Code
                    </a>
                    <button class="btn-ghost" onclick="document.getElementById('pj-modal').classList.remove('active')">
                        Close
                    </button>
                </div>
            `;

            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}


/* ==========================================================================
   20. INTERACTIVE TERMINAL
   ========================================================================== */
const terminalCommands = {
    help: () => `
<span style="color:#00d4ff;">╔══════════════════════════════════════════╗</span>
<span style="color:#00d4ff;">║    ADESH COMMAND CENTER — HELP MENU     ║</span>
<span style="color:#00d4ff;">╚══════════════════════════════════════════╝</span>

<span style="color:#00ff88;">STANDARD COMMANDS:</span>
  <span style="color:#00d4ff;">help</span>          — Show this menu
  <span style="color:#00d4ff;">whoami</span>        — Display operator profile
  <span style="color:#00d4ff;">skills</span>        — Full tech stack breakdown
  <span style="color:#00d4ff;">projects</span>      — List all projects
  <span style="color:#00d4ff;">certifications</span>— Credentials & achievements
  <span style="color:#00d4ff;">education</span>     — Academic profile
  <span style="color:#00d4ff;">contact</span>       — Secure contact channels
  <span style="color:#00d4ff;">clear</span>         — Clear terminal

<span style="color:#f59e0b;">SECRET COMMANDS (try them!):</span>
  <span style="color:#a855f7;">whoami</span>        — Classified operator dossier
  <span style="color:#a855f7;">matrix-mode</span>   — Activate the Matrix
  <span style="color:#a855f7;">hack-the-system</span>— ??? 
  <span style="color:#a855f7;">sudo reveal-secret</span> — Hidden intel
  <span style="color:#a855f7;">activate-ai</span>   — Summon the intelligence
`,

    whoami: () => `
<span style="color:#00ff88;">OPERATOR PROFILE — CLASSIFIED</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
  Name       : ADESH
  Clearance  : ALPHA-7
  Role       : AI Engineer | Cyber Specialist | Dev
  Location   : New Delhi, India [ENCRYPTED]
  CGPA       : 9.2/10.0 [OUTSTANDING]
  Status     : <span style="color:#00ff88;">● ACTIVE</span>
  Mission    : Building intelligent, secure systems
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color:#f59e0b;">"The best security is invisible. The best AI is indistinguishable from intelligence."</span>
`,

    skills: () => `
<span style="color:#00ff88;">TECHNICAL COMPETENCY MATRIX</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color:#a855f7;">AI / MACHINE LEARNING:</span>
  TensorFlow    [████████░░] 82%
  PyTorch       [███████░░░] 75%
  Scikit-learn  [████████░░] 85%
  Data Science  [████████░░] 88%

<span style="color:#00ff88;">CYBERSECURITY:</span>
  Network Sec   [███████░░░] 78%
  Cryptography  [███████░░░] 76%
  Pen Testing   [██████░░░░] 70%
  SOC/SIEM      [███████░░░] 72%

<span style="color:#00d4ff;">FULL-STACK DEV:</span>
  JavaScript    [█████████░] 91%
  React.js      [████████░░] 85%
  Node.js       [████████░░] 82%
  Python        [████████░░] 88%
  SQL/MySQL     [████████░░] 86%
`,

    projects: () => `
<span style="color:#00ff88;">PROJECT REPOSITORY — ACTIVE BUILDS</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
[01] <span style="color:#00d4ff;">Neon Trading Dashboard</span>     [WEB · JS · Chart.js]
     Live stock tracker with glassmorphic UI

[02] <span style="color:#00d4ff;">CodeHub Workspace</span>          [REACT · NODE · WS]
     Collaborative code editor with terminal

[03] <span style="color:#00d4ff;">BCA Portal Optimizer</span>       [DBMS · PYTHON · SQL]
     Academic scheduling with BCNF normalization

[04] <span style="color:#00ff88;">ML Intrusion Detection</span>     [AI · SECURITY · PY]
     97.3% accuracy network threat classifier

[05] <span style="color:#a855f7;">NLP Sentiment Analyzer</span>     [BERT · PYTORCH · NLP]
     Fine-tuned BERT with Flask + React dashboard

[06] <span style="color:#f59e0b;">Cryptography Toolkit</span>       [SECURITY · PYTHON]
     AES/RSA demo, hash gen, password analyzer
`,

    certifications: () => `
<span style="color:#00ff88;">CERTIFICATIONS & CREDENTIALS</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
[✓] <span style="color:#f59e0b;">Google IT Support Professional</span>     [Coursera]
[✓] <span style="color:#f59e0b;">Introduction to Cybersecurity</span>      [Cisco NetAcad]
[✓] <span style="color:#f59e0b;">Python for Everybody</span>              [University of Michigan]
[✓] <span style="color:#f59e0b;">Machine Learning Foundations</span>      [Andrew Ng / Coursera]
[✓] <span style="color:#f59e0b;">SQL & Database Design</span>             [IBM / Coursera]
[◌] <span style="color:#00d4ff;">CompTIA Security+</span>                 [IN PROGRESS]
[◌] <span style="color:#00d4ff;">AWS Cloud Practitioner</span>            [IN PROGRESS]
`,

    education: () => `
<span style="color:#00ff88;">ACADEMIC PROFILE</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
  Degree     : Bachelor of Computer Applications (BCA)
  Institute  : Delhi Tech College
  CGPA       : 9.2 / 10.0
  Status     : <span style="color:#00ff88;">ACTIVE STUDENT</span>

  Core Subjects:
  • Data Structures & Algorithms (DSA)
  • Database Management Systems (DBMS)
  • Computer Networks & Security
  • Machine Learning & AI Fundamentals
  • Object-Oriented Programming (Java/C++)
  • Web Technologies & Full-Stack Dev
`,

    contact: () => `
<span style="color:#00ff88;">SECURE COMMUNICATION CHANNELS</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
  Email    : adeshtrivedi49@gmail.com
  GitHub   : https://github.com/adesh-portal?tab=repositories
  LinkedIn : linkedin.com/in/adesh-bca
  Location : New Delhi, India [UTC+5:30]
  Status   : <span style="color:#00ff88;">● Open to internships & remote roles</span>

  Scroll down to use the secure contact form ↓
`,

    'matrix-mode': () => {
        activateMatrix();
        return `<span style="color:#00ff88;">INITIATING MATRIX PROTOCOL...</span>\n<span style="color:#00ff88;">Reality override in 3... 2... 1...</span>\n<span style="color:#f59e0b;">(Click anywhere to exit)</span>`;
    },

    'hack-the-system': () => `
<span style="color:#ff4d6d;">INITIATING BREACH SEQUENCE...</span>
<span style="color:#00d4ff;">████████████████████████ 100%</span>
<span style="color:#ff4d6d;">ERROR: Access denied.</span>
<span style="color:#f59e0b;">This system is protected by Adesh's security architecture.</span>
<span style="color:#00ff88;">Countermeasure deployed. Your IP has been logged. Just kidding! 😄</span>
<span style="color:#00d4ff;">Nice try though. Maybe hire me instead? → contact</span>
`,

    'sudo reveal-secret': () => `
<span style="color:#a855f7;">CLASSIFIED INTEL DECRYPTED</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color:#00ff88;">Secret #1:</span> I debug with console.log and I'm not ashamed.
<span style="color:#00ff88;">Secret #2:</span> My first "AI model" was just if/else statements.
<span style="color:#00ff88;">Secret #3:</span> I've read the entire OWASP Top 10 for fun.
<span style="color:#00ff88;">Secret #4:</span> I believe dark mode should be the default, always.
<span style="color:#a855f7;">End of classified transmission.</span>
`,

    'activate-ai': () => `
<span style="color:#a855f7;">◉ NEURAL INTELLIGENCE UNIT ONLINE</span>
<span style="color:#00d4ff;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color:#00ff88;">Loading model weights...</span>    [██████████] Done
<span style="color:#00ff88;">Initializing inference...</span>  [██████████] Done
<span style="color:#00ff88;">Connecting to knowledge base..</span> Done

<span style="color:#a855f7;">AI RESPONSE:</span>
Adesh is a highly capable engineer with expertise spanning
AI/ML, Cybersecurity, and Full-Stack Development. His work
demonstrates strong problem-solving skills and a passion for
building systems that are both intelligent and secure.

Probability of being an excellent hire: <span style="color:#00ff88;">99.7%</span>
`,

    clear: () => null,
};

function initTerminal() {
    const input = document.getElementById('terminal-input');
    const log = document.getElementById('terminal-log');

    if (!input || !log) return;

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';
            if (cmd) runCmd(cmd);
        }
    });
}

function runCmd(cmd) {
    const log = document.getElementById('terminal-log');
    if (!log) return;

    // Echo command
    const promptLine = document.createElement('div');
    promptLine.className = 'tw-line prompt-line';
    promptLine.innerHTML = `<span style="color:#00ff88;font-weight:700;">adesh@cmd:~$</span> <span style="color:#00d4ff;">${escapeHtml(cmd)}</span>`;
    log.appendChild(promptLine);

    if (cmd === 'clear') {
        log.innerHTML = '';
        return;
    }

    const handler = terminalCommands[cmd];
    const responseLine = document.createElement('div');
    responseLine.className = 'tw-line';
    responseLine.style.whiteSpace = 'pre';

    if (handler) {
        const result = handler();
        if (result !== null) {
            responseLine.innerHTML = result;
        }
    } else {
        responseLine.className = 'tw-line error';
        responseLine.textContent = `Command not found: '${cmd}'. Type 'help' for available commands.`;
    }

    log.appendChild(responseLine);

    const spacer = document.createElement('div');
    spacer.className = 'tw-line';
    spacer.innerHTML = '&nbsp;';
    log.appendChild(spacer);

    log.scrollTop = log.scrollHeight;
}

function activateMatrix() {
    const overlay = document.getElementById('matrix-overlay');
    overlay.classList.add('active');
    overlay.innerHTML = '<canvas id="matrix-canvas"></canvas>';

    const canvas = document.getElementById('matrix-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()アイウエオカキクケコ';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    let matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px Fira Code, monospace';

        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 40);

    const stop = () => {
        clearInterval(matrixInterval);
        overlay.classList.remove('active');
        overlay.innerHTML = '';
        document.removeEventListener('click', stop);
        document.removeEventListener('keydown', stop);
    };

    setTimeout(() => {
        document.addEventListener('click', stop, { once: true });
        document.addEventListener('keydown', stop, { once: true });
    }, 500);
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}


/* ==========================================================================
   21. PARALLAX ON MOUSE MOVE
   ========================================================================== */
function initParallax() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    hero.addEventListener('mousemove', e => {
        const rect = hero.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;

        const orbs = hero.querySelectorAll('.floating-orb');
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 8;
            orb.style.transform = `translate(${xPct * factor}px, ${yPct * factor}px)`;
        });

        const techOrbs = hero.querySelectorAll('.tech-orb');
        techOrbs.forEach((orb, i) => {
            const factor = (i + 1) * 5;
            const base = orb.style.transform.replace(/translate\([^)]+\)/g, '');
            orb.style.transform = `${base} translate(${xPct * factor}px, ${yPct * factor}px)`;
        });
    });
}


/* ==========================================================================
   22. CONTACT FORM
   ========================================================================== */

function sendToWhatsApp(e) {
    e.preventDefault();

    // Replace with your WhatsApp number (Country Code + Number)
    const phone = "918924032004";

    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const subject = document.getElementById("cf-subject").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    const text = `*📩 New Portfolio Enquiry*

👤 *Name:* ${name}
📧 *Email:* ${email}
📌 *Subject:* ${subject}

💬 *Message:*
${message}

----------------------------
Sent from Portfolio Website`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    document.getElementById("contact-form").reset();
}
/* ==========================================================================
   23. SMOOTH HOVER ON PROJECT CARDS (3D Tilt)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pj-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPct = (x / rect.width - 0.5) * 2;
            const yPct = (y / rect.height - 0.5) * 2;
            card.style.transform = `translateY(-8px) rotateX(${-yPct * 4}deg) rotateY(${xPct * 4}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
