// --- User Interface Mutation & Dynamic Card Generator Engine ---

window.UIController = {
    init() {
        this.renderWhyChooseMe();
        this.renderTimeline();
        this.renderCoursework();
        this.renderResponsibilities();
        this.renderSecurityProtocols();
        this.renderServices();
        this.renderProjects('all');
        this.renderSkills();
        this.renderCertificates('all');
        this.renderTestimonials();
    },

    renderWhyChooseMe() {
        const container = document.getElementById('why-choose-me-container');
        if (!container) return;
        container.innerHTML = portfolioData.whyChooseMe.map(item => `
            <div class="col-md-6 reveal-on-scroll">
                <div class="why-card glass-card h-100">
                    <i class="${item.icon}"></i>
                    <h4 class="my-2">${item.title}</h4>
                    <p class="text-muted text-sm">${item.desc}</p>
                </div>
            </div>
        `).join('');
    },

    renderTimeline() {
        const container = document.querySelector('.timeline-wrapper');
        if (!container) return;
        let lineHTML = `<div class="timeline-wrapper">`;
        portfolioData.timeline.forEach((node, idx) => {
            const side = idx % 2 === 0 ? 'left' : 'right';
            lineHTML += `
                <div class="timeline-node ${side} reveal-on-scroll">
                    <span class="time-year">${node.year}</span>
                    <div class="glass-card">
                        <h4>${node.title}</h4>
                        <p class="text-muted text-sm mt-2">${node.desc}</p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = lineHTML;
    },

    renderCoursework() {
        const container = document.getElementById('coursework-container');
        if (container) {
            container.innerHTML = portfolioData.coursework.map(c => `<span class="course-tag">${c}</span>`).join('');
        }
    },

    renderResponsibilities() {
        const container = document.getElementById('resp-container');
        if (container) {
            container.innerHTML = portfolioData.responsibilities.map(r => `<span class="resp-tag">${r}</span>`).join('');
        }
    },

    renderSecurityProtocols() {
        const container = document.getElementById('security-container');
        if (!container) return;
        container.innerHTML = portfolioData.securityProtocols.map(p => `
            <div class="sec-node">
                <i class="fa-solid fa-shield-halved"></i>
                <div>
                    <h4>${p.title}</h4>
                    <p>${p.desc}</p>
                </div>
            </div>
        `).join('');
    },

    renderServices() {
        const container = document.getElementById('services-container');
        if (!container) return;
        container.innerHTML = portfolioData.services.map(s => `
            <div class="col-md-6 col-lg-3 reveal-on-scroll">
                <div class="glass-card h-100 text-center">
                    <div class="info-icon mx-auto mb-3"><i class="${s.icon}"></i></div>
                    <h4>${s.title}</h4>
                    <p class="text-muted text-sm mt-2">${s.desc}</p>
                </div>
            </div>
        `).join('');
    },

    renderProjects(filter) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        const filtered = filter === 'all' ? portfolioData.projects : portfolioData.projects.filter(p => p.category === filter || p.technologies.includes(filter));
        
        grid.innerHTML = filtered.map((p, idx) => `
            <div class="col-md-6 reveal-on-scroll">
                <div class="project-card glass-card">
                    <div class="project-meta-header">
                        <i class="fa-regular fa-folder-open folder-icon"></i>
                        <div class="project-links">
                            <a href="${p.github}" target="_blank" aria-label="Source"><i class="fa-brands fa-github"></i></a>
                            <a href="${p.demo}" aria-label="Demo Link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                    <h4>${p.title}</h4>
                    <p class="text-muted text-sm mt-2 flex-grow-1">${p.description}</p>
                    <div class="proj-techs">
                        ${p.technologies.map(t => `<span class="tech-span">${t}</span>`).join('')}
                    </div>
                    <button class="btn btn-outline view-details-btn btn-sm" data-proj-idx="${idx}">Inspect Architecture</button>
                </div>
            </div>
        `).join('');
        
        this.bindModalTriggers(filtered);
    },

    bindModalTriggers(currentProjects) {
        document.querySelectorAll('[data-proj-idx]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.getAttribute('data-proj-idx');
                this.openProjectModal(currentProjects[idx]);
            });
        });
    },

    openProjectModal(proj) {
        const modal = document.getElementById('project-modal');
        const content = document.getElementById('modal-injected-content');
        if (!modal || !content) return;

        content.innerHTML = `
            <h3 class="text-accent mb-2">${proj.title}</h3>
            <span class="badge btn-primary px-2 py-1 text-xs mb-3 d-inline-block">${proj.category} Framework Architecture</span>
            <div class="mb-3">
                <h5><i class="fa-solid fa-triangle-exclamation text-secondary"></i> Identified Problem Constraints</h5>
                <p class="text-muted text-sm">${proj.problem}</p>
            </div>
            <div class="mb-3">
                <h5><i class="fa-solid fa-circle-check text-accent"></i> Executed Resolution Pipeline</h5>
                <p class="text-muted text-sm">${proj.solution}</p>
            </div>
            <div class="mt-4 d-flex gap-2">
                <a href="${proj.github}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> Source Repository</a>
            </div>
        `;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    },

    renderSkills() {
        const wrapper = document.getElementById('skills-matrix-wrapper');
        if (!wrapper) return;
        wrapper.innerHTML = portfolioData.skills.map(cat => `
            <div class="col-md-6 col-lg-4 reveal-on-scroll">
                <div class="skills-cat-card glass-card h-100">
                    <h3>${cat.category}</h3>
                    <div class="skills-list-nodes">
                        ${cat.items.map(i => `<span class="skill-node">${i}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderCertificates(filter) {
        const grid = document.getElementById('certs-grid');
        if (!grid) return;
        const filtered = filter === 'all' ? portfolioData.certificates : portfolioData.certificates.filter(c => c.type === filter);
        
        grid.innerHTML = filtered.map(c => `
            <div class="col-md-6 col-lg-4 reveal-on-scroll">
                <div class="cert-card glass-card">
                    <div class="cert-meta-top">
                        <span class="cert-badge">${c.type}</span>
                        <i class="fa-solid fa-certificate text-accent"></i>
                    </div>
                    <h4>${c.title}</h4>
                    <span class="cert-issuer">${c.provider}</span>
                </div>
            </div>
        `).join('');
    },

    renderTestimonials() {
        const container = document.getElementById('testimonial-track');
        if (!container) return;
        container.innerHTML = portfolioData.testimonials.map(t => `
            <div class="testimonial-slide">
                <div class="test-card glass-card">
                    <p>"${t.quote}"</p>
                    <span class="test-author">${t.author}</span>
                    <span class="test-role">${t.role || 'Verified Peer'}</span>
                </div>
            </div>
        `).join('');
    }
};