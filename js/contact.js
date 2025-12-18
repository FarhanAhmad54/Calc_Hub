/**
 * CalcHub - Contact Form Handler
 * Handles contact modal, form validation, and submission
 */

(function () {
    'use strict';

    // API endpoint - change this based on your deployment
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:'
        ? 'http://localhost:3001/api'
        : 'https://your-backend-url.com/api'; // Update this with your actual deployed backend URL

    // DOM Elements
    const headerContactBtn = document.getElementById('headerContactBtn');
    const footerContactBtn = document.getElementById('footerContactBtn');
    const contactModalOverlay = document.getElementById('contactModalOverlay');
    const contactModal = document.getElementById('contactModal');
    const contactModalClose = document.getElementById('contactModalClose');
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');
    const contactSubmitBtn = document.getElementById('contactSubmitBtn');

    // Open contact modal
    function openContactModal(e) {
        if (e) e.preventDefault();
        contactModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus first input
        setTimeout(() => {
            document.getElementById('contactName').focus();
        }, 100);
    }

    // Close contact modal
    function closeContactModal() {
        contactModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        contactForm.reset();
        contactStatus.textContent = '';
        contactStatus.className = 'contact-status';
    }

    // Show status message
    function showStatus(message, type) {
        contactStatus.textContent = message;
        contactStatus.className = `contact-status ${type}`;
    }

    // Toggle loading state
    function setLoading(isLoading) {
        const btnText = contactSubmitBtn.querySelector('.btn-text');
        const btnLoader = contactSubmitBtn.querySelector('.btn-loader');

        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            contactSubmitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            contactSubmitBtn.disabled = false;
        }
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            subject: document.getElementById('contactSubject').value.trim(),
            message: document.getElementById('contactMessage').value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        setLoading(true);
        showStatus('', '');

        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showStatus('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                // Close modal after 3 seconds on success
                setTimeout(() => {
                    closeContactModal();
                }, 3000);
            } else {
                showStatus(result.error || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showStatus('Unable to send message. Please check your connection and try again.', 'error');
        } finally {
            setLoading(false);
        }
    }

    // Event Listeners
    if (headerContactBtn) {
        headerContactBtn.addEventListener('click', openContactModal);
    }

    if (footerContactBtn) {
        footerContactBtn.addEventListener('click', openContactModal);
    }

    if (contactModalClose) {
        contactModalClose.addEventListener('click', closeContactModal);
    }

    if (contactModalOverlay) {
        contactModalOverlay.addEventListener('click', function (e) {
            if (e.target === contactModalOverlay) {
                closeContactModal();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }

    // Escape key to close modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && contactModalOverlay.classList.contains('active')) {
            closeContactModal();
        }
    });

})();
