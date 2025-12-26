/**
 * UI Helpers Module
 * Common UI utilities for the calculator platform
 * @version 1.0.0
 */

const UIHelpers = {
    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - 'success', 'error', 'info', 'warning'
     * @param {number} duration - Duration in ms (default 3000)
     */
    showToast(message, type = 'info', duration = 3000) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${colors[type] || colors.info};
            color: white;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;

        // Add animation keyframes if not exists
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Show a confirmation modal
     * @param {string} message - Confirmation message
     * @param {string} title - Modal title
     * @returns {Promise<boolean>}
     */
    confirm(message, title = 'Підтвердження') {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;

            overlay.innerHTML = `
                <div style="background:white; padding:24px; border-radius:12px; max-width:400px; text-align:center;">
                    <h3 style="margin:0 0 12px; font-size:18px; color:#111827;">${title}</h3>
                    <p style="margin:0 0 20px; color:#6b7280;">${message}</p>
                    <div style="display:flex; gap:12px; justify-content:center;">
                        <button id="confirm-no" style="padding:8px 20px; border:1px solid #d1d5db; background:white; border-radius:6px; cursor:pointer;">Ні</button>
                        <button id="confirm-yes" style="padding:8px 20px; border:none; background:#3b82f6; color:white; border-radius:6px; cursor:pointer;">Так</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            overlay.querySelector('#confirm-yes').onclick = () => {
                overlay.remove();
                resolve(true);
            };
            overlay.querySelector('#confirm-no').onclick = () => {
                overlay.remove();
                resolve(false);
            };
        });
    },

    /**
     * Format number as currency
     * @param {number} value - Value to format
     * @param {string} currency - Currency suffix (default 'грн')
     * @returns {string}
     */
    formatCurrency(value, currency = 'грн') {
        return `${Math.round(value).toLocaleString('uk-UA')} ${currency}`;
    },

    /**
     * Debounce function calls
     * @param {Function} fn - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    debounce(fn, wait = 300) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), wait);
        };
    },

    /**
     * Generate unique ID
     * @param {string} prefix - Optional prefix
     * @returns {string}
     */
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Escape HTML to prevent XSS
     * @param {string} str - String to escape
     * @returns {string}
     */
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

window.UIHelpers = UIHelpers;
