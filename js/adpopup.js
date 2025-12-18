// Ad Popup Controller
// Handles the ad popup with 5-second countdown timer

(function () {
    'use strict';

    // DOM Elements
    const adPopupOverlay = document.getElementById('adPopupOverlay');
    const adTimer = document.getElementById('adTimer');
    const adCloseBtn = document.getElementById('adCloseBtn');

    // Config
    const COUNTDOWN_SECONDS = 5;
    let countdown = COUNTDOWN_SECONDS;
    let countdownInterval = null;

    // Initialize ad popup
    function initAdPopup() {
        if (!adPopupOverlay || !adTimer || !adCloseBtn) {
            console.warn('Ad popup elements not found');
            return;
        }

        // Start countdown
        startCountdown();

        // Close button click handler
        adCloseBtn.addEventListener('click', closeAdPopup);
    }

    // Start the countdown timer
    function startCountdown() {
        updateTimerDisplay();

        countdownInterval = setInterval(() => {
            countdown--;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                showCloseButton();
            } else {
                updateTimerDisplay();
            }
        }, 1000);
    }

    // Update timer display
    function updateTimerDisplay() {
        adTimer.textContent = `Skip in ${countdown}s`;
    }

    // Show close button after countdown
    function showCloseButton() {
        adTimer.style.display = 'none';
        adCloseBtn.style.display = 'flex';
    }

    // Close the ad popup
    function closeAdPopup() {
        adPopupOverlay.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Prevent scrolling when ad is shown
    function preventScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            preventScroll();
            initAdPopup();
        });
    } else {
        preventScroll();
        initAdPopup();
    }
})();
