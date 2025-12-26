/**
 * UI Helpers Module
 * @module uiHelpers
 * @version 3.0.0
 */

const UIHelpers = {
    /**
     * Show toast notification
     * @param {string} message
     * @param {string} type - 'success' | 'error' | 'info'
     * @param {number} duration - Duration in ms
     */
    toast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 'background: #10b981; color: white;' : ''}
            ${type === 'error' ? 'background: #ef4444; color: white;' : ''}
            ${type === 'info' ? 'background: #3b82f6; color: white;' : ''}
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Show confirmation dialog
     * @param {string} message
     * @returns {Promise<boolean>}
     */
    async confirm(message) {
        return new Promise(resolve => {
            const modal = document.createElement('div');
            modal.className = 'confirm-modal';
            modal.innerHTML = `
                <div class="confirm-box">
                    <p>${message}</p>
                    <div class="confirm-buttons">
                        <button class="btn btn-cancel">Скасувати</button>
                        <button class="btn btn-confirm">Підтвердити</button>
                    </div>
                </div>
            `;
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5); display: flex; align-items: center;
                justify-content: center; z-index: 9999;
            `;

            document.body.appendChild(modal);

            modal.querySelector('.btn-cancel').onclick = () => {
                modal.remove();
                resolve(false);
            };
            modal.querySelector('.btn-confirm').onclick = () => {
                modal.remove();
                resolve(true);
            };
        });
    },

    /**
     * Format number as currency
     * @param {number} value
     * @param {string} currency
     * @returns {string}
     */
    formatCurrency(value, currency = 'UAH') {
        return new Intl.NumberFormat('uk-UA', {
            style: 'currency',
            currency: currency
        }).format(value);
    },

    /**
     * Debounce function
     * @param {Function} fn
     * @param {number} delay
     * @returns {Function}
     */
    debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    /**
     * Generate unique ID
     * @param {string} prefix
     * @returns {string}
     */
    generateId(prefix = 'id') {
        return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Escape HTML
     * @param {string} str
     * @returns {string}
     */
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Show loading overlay
     * @param {boolean} show
     */
    loading(show) {
        let loader = document.getElementById('app-loader');
        if (show && !loader) {
            loader = document.createElement('div');
            loader.id = 'app-loader';
            loader.innerHTML = '<div class="spinner"></div>';
            loader.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(255,255,255,0.9); display: flex;
                align-items: center; justify-content: center; z-index: 9999;
            `;
            document.body.appendChild(loader);
        } else if (!show && loader) {
            loader.remove();
        }
    }
};

if (typeof module !== 'undefined') module.exports = UIHelpers;
window.UIHelpers = UIHelpers;
