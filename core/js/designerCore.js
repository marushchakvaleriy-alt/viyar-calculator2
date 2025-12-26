/**
 * Designer Core Module
 * Core logic for dashboard designer
 * @version 1.0.0
 */

const DesignerCore = {
    /**
     * Initialize designer
     * @param {Object} dashboardConfig - Dashboard configuration
     */
    init(dashboardConfig) {
        this.config = dashboardConfig || {};
        console.log('[DesignerCore] Initialized');
    },

    /**
     * Get dashboard title
     * @returns {string}
     */
    getTitle() {
        return this.config.title || 'Vpoint Calculator';
    },

    /**
     * Set dashboard title
     * @param {string} title - New title
     */
    setTitle(title) {
        this.config.title = title;
    },

    /**
     * Get theme settings
     * @returns {Object}
     */
    getTheme() {
        return this.config.theme || {
            primaryColor: '#3b82f6',
            backgroundColor: '#0f172a',
            textColor: '#ffffff'
        };
    },

    /**
     * Update theme setting
     * @param {string} key - Theme key
     * @param {string} value - Theme value
     */
    setThemeSetting(key, value) {
        if (!this.config.theme) {
            this.config.theme = {};
        }
        this.config.theme[key] = value;
    },

    /**
     * Get hero section config
     * @returns {Object}
     */
    getHero() {
        return this.config.hero || {
            title: 'Ласкаво просимо',
            subtitle: 'Виберіть калькулятор'
        };
    },

    /**
     * Update hero section
     * @param {Object} heroConfig - Hero configuration
     */
    setHero(heroConfig) {
        this.config.hero = { ...this.config.hero, ...heroConfig };
    },

    /**
     * Get calculator cards configuration
     * @returns {Array}
     */
    getCards() {
        return this.config.cards || [];
    },

    /**
     * Add new calculator card
     * @param {Object} card - Card configuration
     */
    addCard(card) {
        if (!this.config.cards) {
            this.config.cards = [];
        }
        this.config.cards.push(card);
    },

    /**
     * Remove calculator card
     * @param {number} index - Card index
     */
    removeCard(index) {
        if (this.config.cards && this.config.cards[index]) {
            this.config.cards.splice(index, 1);
        }
    },

    /**
     * Reorder cards
     * @param {number} fromIndex - From index
     * @param {number} toIndex - To index
     */
    reorderCards(fromIndex, toIndex) {
        if (!this.config.cards) return;
        const [card] = this.config.cards.splice(fromIndex, 1);
        this.config.cards.splice(toIndex, 0, card);
    },

    /**
     * Export configuration as JS file content
     * @returns {string}
     */
    exportToJS() {
        return `const DashboardConfig = ${JSON.stringify(this.config, null, 4)};\nwindow.DashboardConfig = DashboardConfig;`;
    },

    /**
     * Generate preview HTML
     * @returns {string}
     */
    generatePreviewHTML() {
        const theme = this.getTheme();
        const hero = this.getHero();

        return `
            <div style="background: ${theme.backgroundColor}; color: ${theme.textColor}; padding: 40px; min-height: 300px;">
                <h1 style="color: ${theme.primaryColor}">${hero.title}</h1>
                <p>${hero.subtitle}</p>
            </div>
        `;
    }
};

window.DesignerCore = DesignerCore;
