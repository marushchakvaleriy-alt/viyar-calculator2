/**
 * Admin Matrix Module
 * Core logic for the matrix table in admin panel
 * @version 1.0.0
 */

const AdminMatrix = {
    /**
     * Render the full matrix table
     * @param {HTMLElement} container - Container element
     * @param {Object} schema - Schema object
     */
    render(container, schema) {
        if (!schema || !schema.processes) {
            console.error('[AdminMatrix] Invalid schema');
            return;
        }

        // Build category headers
        const categories = schema.categories || {};
        const processes = schema.processes || [];

        // Group processes by category
        const procsByCategory = {};
        processes.forEach(proc => {
            if (!procsByCategory[proc.category]) {
                procsByCategory[proc.category] = [];
            }
            procsByCategory[proc.category].push(proc);
        });

        console.log('[AdminMatrix] Rendering matrix with', processes.length, 'processes');
    },

    /**
     * Get cell value from rules
     * @param {Object} rules - Rules object
     * @param {string} fieldId - Field ID
     * @param {string} processId - Process ID
     * @returns {*} Cell value
     */
    getCellValue(rules, fieldId, processId) {
        if (!rules || !rules[fieldId]) return null;
        return rules[fieldId][processId] || null;
    },

    /**
     * Set cell value in rules
     * @param {Object} rules - Rules object
     * @param {string} fieldId - Field ID
     * @param {string} processId - Process ID
     * @param {*} value - New value
     */
    setCellValue(rules, fieldId, processId, value) {
        if (!rules[fieldId]) {
            rules[fieldId] = {};
        }

        if (value === '' || value === null || value === undefined) {
            delete rules[fieldId][processId];
        } else {
            rules[fieldId][processId] = value;
        }
    },

    /**
     * Calculate row sum
     * @param {Object} rules - Rules object
     * @param {string} fieldId - Field ID
     * @param {Array} processes - Processes array
     * @returns {number} Sum
     */
    calculateRowSum(rules, fieldId, processes) {
        if (!rules || !rules[fieldId]) return 0;

        let sum = 0;
        processes.forEach(proc => {
            const val = rules[fieldId][proc.id];
            if (typeof val === 'number') {
                sum += val;
            } else if (typeof val === 'string' && !val.startsWith('=')) {
                sum += parseFloat(val) || 0;
            }
        });
        return sum;
    },

    /**
     * Export rules to JSON
     * @param {Object} schema - Full schema
     * @returns {string} JSON string
     */
    exportToJSON(schema) {
        return JSON.stringify(schema.rules, null, 2);
    },

    /**
     * Import rules from JSON
     * @param {Object} schema - Schema to update
     * @param {string} jsonStr - JSON string
     * @returns {boolean} Success
     */
    importFromJSON(schema, jsonStr) {
        try {
            const rules = JSON.parse(jsonStr);
            schema.rules = rules;
            return true;
        } catch (e) {
            console.error('[AdminMatrix] Import error:', e);
            return false;
        }
    }
};

window.AdminMatrix = AdminMatrix;
