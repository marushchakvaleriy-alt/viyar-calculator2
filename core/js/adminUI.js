/**
 * Admin UI Module
 * UI interactions for admin panel
 * @version 1.0.0
 */

const AdminUI = {
    unsavedChanges: false,

    /**
     * Initialize admin UI
     */
    init() {
        this.bindKeyboardShortcuts();
        this.bindBeforeUnload();
        console.log('[AdminUI] Initialized');
    },

    /**
     * Mark as having unsaved changes
     */
    markDirty() {
        this.unsavedChanges = true;
        this.updateSaveIndicator();
    },

    /**
     * Mark as saved
     */
    markClean() {
        this.unsavedChanges = false;
        this.updateSaveIndicator();
    },

    /**
     * Update save indicator in UI
     */
    updateSaveIndicator() {
        const hint = document.getElementById('unsavedHint');
        if (hint) {
            hint.style.display = this.unsavedChanges ? 'inline-block' : 'none';
        }
    },

    /**
     * Show modal by ID
     * @param {string} modalId - Modal element ID
     */
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    },

    /**
     * Hide modal by ID
     * @param {string} modalId - Modal element ID
     */
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    },

    /**
     * Toggle sidebar (mobile)
     * @param {boolean} show - Show or hide
     */
    toggleSidebar(show) {
        const sidebar = document.getElementById('mainSidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (sidebar) {
            sidebar.classList.toggle('active', show);
        }
        if (overlay) {
            overlay.classList.toggle('active', show);
        }
    },

    /**
     * Bind keyboard shortcuts
     */
    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S - Save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (window.saveData) window.saveData();
            }

            // Escape - Close modals
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(m => {
                    m.style.display = 'none';
                });
            }
        });
    },

    /**
     * Warn before leaving with unsaved changes
     */
    bindBeforeUnload() {
        window.addEventListener('beforeunload', (e) => {
            if (this.unsavedChanges) {
                e.preventDefault();
                e.returnValue = 'У вас є незбережені зміни!';
                return e.returnValue;
            }
        });
    },

    /**
     * Scroll to element
     * @param {string} selector - CSS selector
     */
    scrollTo(selector) {
        const el = document.querySelector(selector);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    /**
     * Highlight element temporarily
     * @param {HTMLElement} el - Element to highlight
     */
    flashHighlight(el) {
        if (!el) return;
        el.style.transition = 'background 0.3s';
        el.style.background = '#fef08a';
        setTimeout(() => {
            el.style.background = '';
        }, 1000);
    }
};

window.AdminUI = AdminUI;
