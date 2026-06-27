// --- Production-Ready Form Transmission Handler ---

window.ContactEngine = {
    init() {
        const form = document.getElementById('portfolio-contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            this.toggleState(true);
            
            const payload = {
                name: document.getElementById('frm-name').value,
                email: document.getElementById('frm-email').value,
                subject: document.getElementById('frm-subject').value,
                message: document.getElementById('frm-msg').value
            };

            try {
                // Production API Node Configuration: Replace url target with Formspree endpoint if needed
                const response = await fetch('https://formspree.io/f/YOUR_ENDPOINT_HERE', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    this.showFeedback('Transmission safely routed to Nour Ghaly endpoint pipeline.', 'success');
                    form.reset();
                } else {
                    throw new Error('Endpoint rejected payload state parameters.');
                }
            } catch (err) {
                // Safe Fallback UI Interaction Layer
                this.showFeedback('Network routing failure. Please transmit direct payload parameters via: nourghaly111@gmail.com', 'error');
            } finally {
                this.toggleState(false);
            }
        });
    },

    toggleState(isLoading) {
        const txt = document.querySelector('.btn-txt');
        const loader = document.querySelector('.btn-loader');
        const btn = document.getElementById('submit-btn');
        if(!btn) return;
        
        btn.disabled = isLoading;
        if (isLoading) {
            txt.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            txt.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    },

    showFeedback(msg, status) {
        const box = document.getElementById('form-feedback');
        if (!box) return;
        box.textContent = msg;
        box.className = `form-feedback-box ${status}`;
        box.classList.remove('hidden');
    }
};