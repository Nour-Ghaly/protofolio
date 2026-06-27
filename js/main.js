// --- Application Root Layer Entry Core Node Architecture ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Instantiation structural nodes data configurations
    if (window.UIController) window.UIController.init();
    
    // 2. Load presentation behaviors and custom interactions layers
    if (window.AnimationEngine) window.AnimationEngine.init();
    
    // 3. Mount validation endpoint monitoring components
    if (window.ContactEngine) window.ContactEngine.init();
    
    // 4. Global Structural Dynamic Elements Listeners Core
    setupGlobalNavigation();
    setupSliders();
});

function setupGlobalNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    // Interactive Filter Data Triggers Bindings
    setupDataFilters();
    setupModalCloseMechanics();
}

function setupDataFilters() {
    // Project Filters Mapping
    const projFilters = document.querySelectorAll('#project-filters .filter-btn');
    projFilters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            projFilters.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            if (window.UIController) window.UIController.renderProjects(e.currentTarget.getAttribute('data-filter'));
        });
    });

    // Certificate Filters Mapping
    const certFilters = document.querySelectorAll('#cert-filters .filter-btn');
    certFilters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            certFilters.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            if (window.UIController) window.UIController.renderCertificates(e.currentTarget.getAttribute('data-filter'));
        });
    });
}

function setupModalCloseMechanics() {
    const modal = document.getElementById('project-modal');
    const closeBg = document.getElementById('modal-close-bg');
    const closeBtn = document.getElementById('modal-close-btn');
    
    if (!modal) return;
    const hide = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };
    if (closeBg) closeBg.addEventListener('click', hide);
    if (closeBtn) closeBtn.addEventListener('click', hide);
}

function setupSliders() {
    const track = document.getElementById('testimonial-track');
    const next = document.getElementById('slider-next');
    const prev = document.getElementById('slider-prev');
    if (!track || !next || !prev) return;

    let idx = 0;
    const slides = track.children;
    
    const update = () => {
        if(idx >= slides.length) idx = 0;
        if(idx < 0) idx = slides.length - 1;
        track.style.transform = `translateX(-${idx * 100}%)`;
    };

    next.addEventListener('click', () => { idx++; update(); });
    prev.addEventListener('click', () => { idx--; update(); });
}