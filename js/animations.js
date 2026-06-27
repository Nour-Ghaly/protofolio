// --- Core Animation Mechanics, Observers, Custom Cursors & Terminals ---

window.AnimationEngine = {
    init() {
        this.setupPreloader();
        this.setupCustomCursor();
        this.setupTypingEffect();
        this.setupTerminalSimulator();
        this.setupScrollObserver();
        this.setupParallax();
    },

    setupPreloader() {
        const bar = document.getElementById('load-progress');
        const preloader = document.getElementById('preloader');
        if (!bar || !preloader) return;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 8;
            bar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.classList.add('hidden'), 500);
                }, 200);
            }
        }, 30);
    },

    setupCustomCursor() {
        const cursor = document.getElementById('custom-cursor');
        if (!cursor || 'ontouchstart' in window) {
            if (cursor) cursor.style.display = 'none';
            return;
        }

        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        document.querySelectorAll('a, button, .filter-btn, [data-proj-idx]').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    },

    setupTypingEffect() {
        const target = document.getElementById('typing-text');
        if (!target) return;
        const words = ['Backend Developer', 'Django Specialist', 'Full-Stack Engineer', 'Problem Solver'];
        let wordIdx = 0, charIdx = 0, isDeleting = false;

        function type() {
            const current = words[wordIdx];
            if (isDeleting) {
                target.textContent = current.substring(0, charIdx - 1);
                charIdx--;
            } else {
                target.textContent = current.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 40 : 80;
            if (!isDeleting && charIdx === current.length) {
                typeSpeed = 1800; // Pause at end node
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typeSpeed = 400;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    },

    setupTerminalSimulator() {
        const body = document.getElementById('terminal-body');
        if (!body) return;
        const scripts = [
            "Initializing integrated backend system parameters...",
            "Connecting secure remote PostgreSQL database storage architecture...",
            "Migrating localized models via Django ORM map configurations...",
            "Deploying scalable core application endpoints successfully.",
            "Nour Ghaly Core Sandbox Framework State: Ready for active optimization pipelines."
        ];
        
        let delay = 300;
        scripts.forEach((str, i) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.innerHTML = `<span>$ </span>${str}`;
                body.appendChild(line);
            }, delay * (i + 1.5));
        });
    },

    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    // Execute count animations if element is stat node
                    if(e.target.classList.contains('stat-num')) {
                        this.animateCounter(e.target);
                    }
                }
            });
        }, { threshold: 0.1 });

        // Add standard elements
        setTimeout(() => {
            document.querySelectorAll('.reveal-on-scroll, .glass-card, .timeline-node').forEach(el => {
                el.classList.add('reveal-on-scroll');
                observer.observe(el);
            });
            document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));
        }, 100);
    },

    animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        let current = 0;
        const steps = 40;
        const increment = target / steps;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;
            if (step >= steps) {
                el.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
                clearInterval(timer);
            } else {
                el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
        }, 20);
    },

    setupParallax() {
        const frame = document.getElementById('parallax-frame');
        if (!frame || 'ontouchstart' in window) return;
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 35;
            const y = (window.innerHeight / 2 - e.clientY) / 35;
            frame.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    }
};