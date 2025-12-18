// CalcHub - Main Application
const CalcHub = {
    categories: [
        { id: 'student', name: 'Student & Education', icon: '🎓', color: '#667eea', calculators: () => window.studentCalculators || [] },
        { id: 'finance', name: 'Finance & Money', icon: '💰', color: '#00d4aa', calculators: () => window.financeCalculators || [] },
        { id: 'health', name: 'Health & Fitness', icon: '🏥', color: '#ff6b6b', calculators: () => window.healthCalculators || [] },
        { id: 'math', name: 'Math & Basic', icon: '📐', color: '#feca57', calculators: () => window.mathCalculators || [] },
        { id: 'converter', name: 'Unit Conversion', icon: '📏', color: '#54a0ff', calculators: () => window.converterCalculators || [] },
        { id: 'work', name: 'Work & Productivity', icon: '🧑‍💼', color: '#5f27cd', calculators: () => window.workCalculators || [] },
        { id: 'daily', name: 'Daily Life & Misc', icon: '🌍', color: '#10ac84', calculators: () => window.dailyCalculators || [] },
        { id: 'realestate', name: 'Real Estate & Housing', icon: '🏠', color: '#e17055', calculators: () => window.realEstateCalculators || [] },
        { id: 'vehicle', name: 'Vehicle & Transport', icon: '🚗', color: '#0984e3', calculators: () => window.vehicleCalculators || [] },
        { id: 'digital', name: 'Digital & Tech', icon: '💻', color: '#6c5ce7', calculators: () => window.digitalCalculators || [] },
        { id: 'science', name: 'Physics', icon: '⚛️', color: '#00b894', calculators: () => window.scienceCalculators || [] },
        { id: 'chemistry', name: 'Chemistry', icon: '⚗️', color: '#e84393', calculators: () => window.chemistryCalculators || [] },
        { id: 'biology', name: 'Biology & Medical', icon: '🧬', color: '#fd79a8', calculators: () => window.biologyCalculators || [] },
        { id: 'engineering', name: 'Engineering', icon: '⚙️', color: '#636e72', calculators: () => window.engineeringCalculators || [] },
        { id: 'weather', name: 'Weather & Environment', icon: '🌦️', color: '#74b9ff', calculators: () => window.weatherCalculators || [] },
        { id: 'legal', name: 'Legal & Government', icon: '⚖️', color: '#a29bfe', calculators: () => window.legalCalculators || [] },
        { id: 'accounting', name: 'Accounting', icon: '🧾', color: '#fab1a0', calculators: () => window.accountingCalculators || [] },
        { id: 'psychology', name: 'Psychology & Behavior', icon: '🪷', color: '#81ecec', calculators: () => window.psychologyCalculators || [] },
        { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', color: '#b2bec3', calculators: () => window.manufacturingCalculators || [] },
        { id: 'travel', name: 'Travel & Tourism', icon: '✈️', color: '#fdcb6e', calculators: () => window.travelCalculators || [] },
        { id: 'statistics', name: 'Statistics & Data Analysis', icon: '📚', color: '#00cec9', calculators: () => window.statisticsCalculators || [] },
        { id: 'aptitude', name: 'Logic & Aptitude', icon: '🧠', color: '#e17055', calculators: () => window.aptitudeCalculators || [] },
        { id: 'textile', name: 'Textile & Fashion', icon: '🧵', color: '#d63031', calculators: () => window.textileCalculators || [] },
        { id: 'agriculture', name: 'Agriculture & Farming', icon: '🧑‍🌾', color: '#27ae60', calculators: () => window.agricultureCalculators || [] },
        { id: 'construction', name: 'Construction', icon: '🏗️', color: '#7f8c8d', calculators: () => window.constructionCalculators || [] },
        { id: 'cooking', name: 'Cooking & Kitchen', icon: '🍳', color: '#e74c3c', calculators: () => window.cookingCalculators || [] },
        { id: 'gaming', name: 'Gaming & Esports', icon: '🎮', color: '#9b59b6', calculators: () => window.gamingCalculators || [] },
        { id: 'lifeplanning', name: 'Life Planning & Decisions', icon: '🎯', color: '#1abc9c', calculators: () => window.lifeplanningCalculators || [] }
    ],

    currentCategory: null,

    init() {
        this.renderCategories();
        this.setupModal();
        this.setupBackButton();
        this.setupPopularDropdown();
        this.animateStats();
        this.createParticles();
    },

    // Popular calculators used worldwide
    popularCalculators: [
        { id: 'percentage', name: 'Percentage Calculator', icon: '📊', category: 'Math & Basic', description: 'Most used calculator globally' },
        { id: 'bmi', name: 'BMI Calculator', icon: '⚖️', category: 'Health & Fitness', description: 'Body Mass Index calculator' },
        { id: 'loan-emi', name: 'Loan EMI Calculator', icon: '🏦', category: 'Finance & Money', description: 'Calculate monthly payments' },
        { id: 'age', name: 'Age Calculator', icon: '🎂', category: 'Daily Life', description: 'Calculate exact age' },
        { id: 'gpa', name: 'GPA Calculator', icon: '📚', category: 'Student & Education', description: 'Grade Point Average' },
        { id: 'tip', name: 'Tip Calculator', icon: '💵', category: 'Daily Life', description: 'Restaurant tip calculator' },
        { id: 'compound-interest', name: 'Compound Interest Calculator', icon: '📈', category: 'Finance & Money', description: 'Investment growth' },
        { id: 'calories', name: 'Calorie Calculator', icon: '🍎', category: 'Health & Fitness', description: 'Daily calorie needs' },
        { id: 'discount', name: 'Discount Calculator', icon: '🏷️', category: 'Math & Basic', description: 'Sale price calculator' },
        { id: 'length-converter', name: 'Length Converter', icon: '📏', category: 'Unit Conversion', description: 'Convert units of length' },
        { id: 'temperature', name: 'Temperature Converter', icon: '🌡️', category: 'Unit Conversion', description: 'Celsius to Fahrenheit' },
        { id: 'area', name: 'Area Calculator', icon: '📐', category: 'Math & Basic', description: 'Calculate surface area' },
        { id: 'time-zone', name: 'Time Zone Converter', icon: '🌍', category: 'Daily Life', description: 'World time zones' },
        { id: 'fuel-cost', name: 'Fuel Cost Calculator', icon: '⛽', category: 'Vehicle & Transport', description: 'Trip fuel expenses' },
        { id: 'mortgage', name: 'Mortgage Calculator', icon: '🏠', category: 'Real Estate', description: 'Home loan payments' },
    ],

    setupPopularDropdown() {
        const btn = document.getElementById('popularBtn');
        const dropdown = document.getElementById('popularDropdown');
        const grid = document.getElementById('popularGrid');

        if (!btn || !dropdown || !grid) return;

        // Render popular calculators
        grid.innerHTML = this.popularCalculators.map((calc, i) => `
            <div class="popular-item" data-calc-id="${calc.id}" style="animation: fadeInUp 0.3s ease ${i * 0.05}s forwards; opacity: 0;">
                <span class="popular-item-icon">${calc.icon}</span>
                <div class="popular-item-info">
                    <div class="popular-item-name">${calc.name}</div>
                    <div class="popular-item-category">${calc.category}</div>
                </div>
                <span class="popular-item-badge">#${i + 1}</span>
            </div>
        `).join('');

        // Toggle dropdown
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== btn) {
                dropdown.classList.remove('active');
            }
        });

        // Handle calculator click
        grid.querySelectorAll('.popular-item').forEach(item => {
            item.addEventListener('click', () => {
                const calcId = item.dataset.calcId;
                dropdown.classList.remove('active');

                // Find the calculator in all categories
                for (const category of this.categories) {
                    const calcs = category.calculators();
                    const calc = calcs.find(c => c.id === calcId);
                    if (calc) {
                        this.openCalculator(calc);
                        return;
                    }
                }

                // If not found by exact id, try partial match
                for (const category of this.categories) {
                    const calcs = category.calculators();
                    const calc = calcs.find(c => c.id.includes(calcId) || c.name.toLowerCase().includes(calcId.replace('-', ' ')));
                    if (calc) {
                        this.openCalculator(calc);
                        return;
                    }
                }
            });
        });
    },

    createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    },

    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (target === 100 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    },

    renderCategories() {
        const grid = document.getElementById('categoryGrid');
        if (!grid) return;

        grid.innerHTML = this.categories.map((cat, i) => `
            <div class="category-card" data-category="${cat.id}" style="animation-delay: ${i * 0.1}s">
                <span class="category-icon">${cat.icon}</span>
                <h3 class="category-name">${cat.name}</h3>
                <p class="category-count">${cat.calculators().length} calculators</p>
                <div class="category-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            </div>
        `).join('');

        // Add click handlers
        grid.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const catId = card.dataset.category;
                const category = this.categories.find(c => c.id === catId);
                if (category) {
                    // Show category ad first, then show category after user closes ad
                    if (typeof window.showCategoryAd === 'function') {
                        window.showCategoryAd(() => {
                            this.showCategory(category);
                        });
                    } else {
                        this.showCategory(category);
                    }
                }
            });
        });
    },

    showCategory(category) {
        this.currentCategory = category;
        document.getElementById('currentCategory').textContent = category.name;
        document.getElementById('btnBack').style.display = 'flex';
        document.getElementById('categories').style.display = 'none';
        document.querySelector('.hero').style.display = 'none';
        document.getElementById('calculatorList').classList.add('active');

        const grid = document.getElementById('calculatorGrid');
        const calcs = category.calculators();

        grid.innerHTML = calcs.map((calc, i) => `
            <div class="calculator-card" data-id="${calc.id}" style="animation: fadeInUp 0.3s ease ${i * 0.02}s forwards; opacity: 0;">
                <div class="calculator-card-header">
                    <span class="calculator-card-icon">${calc.icon}</span>
                    <div class="calculator-card-info">
                        <h4 class="calculator-card-name">${calc.name}</h4>
                        <p class="calculator-card-category">${calc.description || calc.category}</p>
                    </div>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.calculator-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const calc = calcs.find(c => c.id === id);
                if (calc) this.openCalculator(calc);
            });
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    setupBackButton() {
        const btn = document.getElementById('btnBack');
        if (!btn) return;
        btn.addEventListener('click', () => {
            this.currentCategory = null;
            document.getElementById('categories').style.display = 'block';
            document.querySelector('.hero').style.display = 'block';
            document.getElementById('calculatorList').classList.remove('active');
            btn.style.display = 'none';
        });
    },

    setupModal() {
        const overlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeModal();
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    },

    openCalculator(calc) {
        const overlay = document.getElementById('modalOverlay');
        const icon = document.getElementById('modalIcon');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');
        const result = document.getElementById('modalResult');

        icon.textContent = calc.icon;
        title.textContent = calc.name;
        result.style.display = 'none';

        // Build form
        let formHTML = calc.fields.map(field => {
            let input;
            if (field.type === 'select') {
                input = `<select class="form-select" id="${field.id}" name="${field.id}">
                    ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>`;
            } else {
                input = `<input type="${field.type}" class="form-input" id="${field.id}" name="${field.id}" 
                    placeholder="${field.placeholder || ''}" ${field.step ? `step="${field.step}"` : ''}>`;
            }
            return `
                <div class="form-group">
                    <label class="form-label">${field.label}</label>
                    ${input}
                </div>
            `;
        }).join('');

        formHTML += `<button type="submit" class="btn-calculate">Calculate</button>`;
        body.innerHTML = `<form id="calcForm">${formHTML}</form>`;

        // Form submit
        document.getElementById('calcForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const values = {};
            calc.fields.forEach(field => {
                values[field.id] = document.getElementById(field.id).value;
            });

            try {
                const res = calc.calculate(values);
                if (res.error) {
                    this.showResult('❌ Error', res.error);
                } else {
                    this.showResult(res.result, res.details);
                }
            } catch (err) {
                this.showResult('❌ Error', 'Please check your inputs');
            }
        });

        overlay.classList.add('active');
        setTimeout(() => document.querySelector('.form-input, .form-select')?.focus(), 100);
    },

    showResult(value, details) {
        const result = document.getElementById('modalResult');
        const valueEl = document.getElementById('resultValue');
        const detailsEl = document.getElementById('resultDetails');

        valueEl.textContent = value;
        detailsEl.innerHTML = details || '';
        result.style.display = 'block';
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    closeModal() {
        document.getElementById('modalOverlay')?.classList.remove('active');
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    CalcHub.init();
});

if (typeof window !== 'undefined') {
    window.CalcHub = CalcHub;
}
