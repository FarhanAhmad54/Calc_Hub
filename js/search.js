// Search functionality for CalcHub
const SearchModule = {
    searchInput: null,
    searchResults: null,
    allCalculators: [],

    init() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');

        if (!this.searchInput || !this.searchResults) return;

        // Gather all calculators
        this.allCalculators = [
            ...(window.studentCalculators || []),
            ...(window.financeCalculators || []),
            ...(window.healthCalculators || []),
            ...(window.mathCalculators || []),
            ...(window.converterCalculators || []),
            ...(window.workCalculators || []),
            ...(window.dailyCalculators || []),
            ...(window.realEstateCalculators || []),
            ...(window.vehicleCalculators || []),
            ...(window.digitalCalculators || []),
            ...(window.scienceCalculators || []),
            ...(window.chemistryCalculators || []),
            ...(window.biologyCalculators || []),
            ...(window.engineeringCalculators || []),
            ...(window.weatherCalculators || []),
            ...(window.legalCalculators || []),
            ...(window.accountingCalculators || []),
            ...(window.psychologyCalculators || []),
            ...(window.manufacturingCalculators || []),
            ...(window.travelCalculators || [])
        ];

        // Event listeners
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.length > 0) {
                this.searchResults.classList.add('active');
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.searchResults.classList.remove('active');
            }
        });

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.searchInput.focus();
            }
            if (e.key === 'Escape') {
                this.searchResults.classList.remove('active');
                this.searchInput.blur();
            }
        });
    },

    handleSearch(query) {
        if (query.length < 2) {
            this.searchResults.classList.remove('active');
            return;
        }

        const results = this.search(query);
        this.renderResults(results);
        this.searchResults.classList.add('active');
    },

    search(query) {
        const q = query.toLowerCase().trim();
        const words = q.split(/\s+/);

        return this.allCalculators
            .map(calc => {
                let score = 0;
                const name = calc.name.toLowerCase();
                const desc = (calc.description || '').toLowerCase();
                const category = (calc.category || '').toLowerCase();

                // Exact match in name
                if (name.includes(q)) score += 100;

                // Word matches
                words.forEach(word => {
                    if (name.includes(word)) score += 50;
                    if (desc.includes(word)) score += 20;
                    if (category.includes(word)) score += 10;
                });

                // Starts with query
                if (name.startsWith(q)) score += 30;

                return { ...calc, score };
            })
            .filter(calc => calc.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);
    },

    renderResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    No calculators found. Try different keywords.
                </div>
            `;
            return;
        }

        this.searchResults.innerHTML = results.map(calc => `
            <div class="search-result-item" data-id="${calc.id}">
                <span class="search-result-icon">${calc.icon}</span>
                <div class="search-result-info">
                    <div class="search-result-name">${this.highlightMatch(calc.name)}</div>
                    <div class="search-result-category">${calc.category}</div>
                </div>
            </div>
        `).join('');

        // Add click handlers
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                const calc = this.allCalculators.find(c => c.id === id);
                if (calc && window.CalcHub) {
                    window.CalcHub.openCalculator(calc);
                    this.searchResults.classList.remove('active');
                    this.searchInput.value = '';
                }
            });
        });
    },

    highlightMatch(text) {
        return text; // Simple version without highlighting
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SearchModule.init();
});

if (typeof window !== 'undefined') {
    window.SearchModule = SearchModule;
}
