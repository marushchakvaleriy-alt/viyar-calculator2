/**
 * Configuration Loader Module
 * @module configLoader
 * @version 3.0.0
 */

const ConfigLoader = {
    cache: new Map(),

    /**
     * Load calculator schema from file
     * @param {string} path - Path to schema file
     * @returns {Promise<Object>} Schema object
     */
    async loadSchema(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = path + '?v=' + Date.now();

            script.onload = () => {
                if (window.Schema) {
                    this.cache.set(path, window.Schema);
                    console.log('[ConfigLoader] Loaded:', path);
                    resolve(window.Schema);
                } else {
                    reject(new Error('Schema not found in ' + path));
                }
            };

            script.onerror = () => {
                reject(new Error('Failed to load ' + path));
            };

            document.head.appendChild(script);
        });
    },

    /**
     * Get config from URL parameter
     * @returns {string|null}
     */
    getConfigFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('config');
    },

    /**
     * Clear schema cache
     */
    clearCache() {
        this.cache.clear();
    }
};

// Export for both module and global usage
if (typeof module !== 'undefined') module.exports = ConfigLoader;
window.ConfigLoader = ConfigLoader;
