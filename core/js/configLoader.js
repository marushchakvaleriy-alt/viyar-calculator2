/**
 * Config Loader Module
 * Unified schema and configuration loading
 * @version 1.0.0
 */

const ConfigLoader = {
    cache: {},

    /**
     * Load a schema file
     * @param {string} path - Path to schema file (e.g., 'data/schema_kitchen.js')
     * @returns {Promise<Object>} Loaded schema
     */
    async loadSchema(path) {
        if (this.cache[path]) {
            return this.cache[path];
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = path + '?v=' + Date.now();
            script.onload = () => {
                if (window.Schema) {
                    this.cache[path] = window.Schema;
                    resolve(window.Schema);
                } else {
                    reject(new Error('Schema not found in ' + path));
                }
            };
            script.onerror = () => reject(new Error('Failed to load ' + path));
            document.head.appendChild(script);
        });
    },

    /**
     * Get config file path from URL parameter
     * @returns {string|null} Config path or null
     */
    getConfigFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('config');
    },

    /**
     * Clear cache
     */
    clearCache() {
        this.cache = {};
    }
};

window.ConfigLoader = ConfigLoader;
