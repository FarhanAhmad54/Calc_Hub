// Ad Popup Controller
// Handles ad popups with 5-second countdown timer

(function () {
    'use strict';

    // Config
    const COUNTDOWN_SECONDS = 5;

    // ==================== Initial Page Load Ad ====================
    const adPopupOverlay = document.getElementById('adPopupOverlay');
    const adTimer = document.getElementById('adTimer');
    const adCloseBtn = document.getElementById('adCloseBtn');

    let initialCountdown = COUNTDOWN_SECONDS;
    let initialCountdownInterval = null;

    // Initialize initial ad popup
    function initInitialAdPopup() {
        if (!adPopupOverlay || !adTimer || !adCloseBtn) {
            console.warn('Initial ad popup elements not found');
            return;
        }

        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        // Start countdown
        startInitialCountdown();

        // Close button click handler
        adCloseBtn.addEventListener('click', closeInitialAdPopup);
    }

    function startInitialCountdown() {
        updateInitialTimerDisplay();

        initialCountdownInterval = setInterval(() => {
            initialCountdown--;

            if (initialCountdown <= 0) {
                clearInterval(initialCountdownInterval);
                showInitialCloseButton();
            } else {
                updateInitialTimerDisplay();
            }
        }, 1000);
    }

    function updateInitialTimerDisplay() {
        adTimer.textContent = `Skip in ${initialCountdown}s`;
    }

    function showInitialCloseButton() {
        adTimer.style.display = 'none';
        adCloseBtn.style.display = 'flex';
    }

    function closeInitialAdPopup() {
        adPopupOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // ==================== Category Click Ad ====================
    const categoryAdPopupOverlay = document.getElementById('categoryAdPopupOverlay');
    const categoryAdTimer = document.getElementById('categoryAdTimer');
    const categoryAdCloseBtn = document.getElementById('categoryAdCloseBtn');

    let categoryCountdown = COUNTDOWN_SECONDS;
    let categoryCountdownInterval = null;
    let pendingCategoryCallback = null;

    // Initialize category ad popup
    function initCategoryAdPopup() {
        if (!categoryAdPopupOverlay || !categoryAdTimer || !categoryAdCloseBtn) {
            console.warn('Category ad popup elements not found');
            return;
        }

        // Close button click handler
        categoryAdCloseBtn.addEventListener('click', closeCategoryAdPopup);
    }

    // Show category ad popup (called when user clicks a category)
    function showCategoryAd(callback) {
        if (!categoryAdPopupOverlay) {
            // If ad popup doesn't exist, just run the callback
            if (callback) callback();
            return;
        }

        pendingCategoryCallback = callback;

        // Reset state
        categoryCountdown = COUNTDOWN_SECONDS;
        categoryAdTimer.textContent = `Skip in ${categoryCountdown}s`;
        categoryAdTimer.style.display = 'inline-block';
        categoryAdCloseBtn.style.display = 'none';

        // Show the popup
        categoryAdPopupOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Start countdown
        startCategoryCountdown();
    }

    function startCategoryCountdown() {
        if (categoryCountdownInterval) {
            clearInterval(categoryCountdownInterval);
        }

        categoryCountdownInterval = setInterval(() => {
            categoryCountdown--;

            if (categoryCountdown <= 0) {
                clearInterval(categoryCountdownInterval);
                showCategoryCloseButton();
            } else {
                categoryAdTimer.textContent = `Skip in ${categoryCountdown}s`;
            }
        }, 1000);
    }

    function showCategoryCloseButton() {
        categoryAdTimer.style.display = 'none';
        categoryAdCloseBtn.style.display = 'flex';
    }

    function closeCategoryAdPopup() {
        categoryAdPopupOverlay.classList.add('hidden');
        document.body.style.overflow = '';

        // Execute the pending callback (show the category)
        if (pendingCategoryCallback) {
            pendingCategoryCallback();
            pendingCategoryCallback = null;
        }
    }

    // Expose function globally for use in app.js
    window.showCategoryAd = showCategoryAd;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initInitialAdPopup();
            initCategoryAdPopup();
        });
    } else {
        initInitialAdPopup();
        initCategoryAdPopup();
    }
})();
