/**
 * Formula Engine Module
 * @module formulaEngine
 * @version 3.0.0
 */

const FormulaEngine = {
    /**
     * Evaluate a formula string
     * @param {string} formula - Formula starting with =
     * @param {Object} context - Context with variables (@qty, @sum, etc.)
     * @returns {number}
     */
    evaluate(formula, context = {}) {
        if (!formula || typeof formula !== 'string') return 0;
        if (!formula.startsWith('=')) return parseFloat(formula) || 0;

        let expr = formula.substring(1).trim();
        if (!expr) return 0;

        // Replace variables (order matters - longest first)
        // 1. Category sums: @sum_konstruktsiya, @sum_zbira, etc.
        expr = expr.replace(/@sum_([a-z0-9_]+)/g, (_, alias) => {
            return context['sum_' + alias] || 0;
        });

        // 2. Row raw sum
        expr = expr.replace(/@raw/g, context.raw || 0);

        // 3. Row sum
        expr = expr.replace(/@sum/g, context.sum || 0);

        // 4. Quantity
        expr = expr.replace(/@qty/g, context.qty || 0);
        expr = expr.replace(/\bval\b/g, context.qty || 0);

        // Replace math functions
        expr = expr.replace(/\bmin\(/g, 'Math.min(');
        expr = expr.replace(/\bmax\(/g, 'Math.max(');
        expr = expr.replace(/\bceil\(/g, 'Math.ceil(');
        expr = expr.replace(/\bfloor\(/g, 'Math.floor(');
        expr = expr.replace(/\bround\(/g, 'Math.round(');
        expr = expr.replace(/\babs\(/g, 'Math.abs(');

        // Validate - only allow safe characters
        if (!/^[\d\s+\-*/%().,?:<>=!&|Math.minaxceflround]+$/.test(expr)) {
            console.warn('[FormulaEngine] Unsafe expression:', expr);
            return 0;
        }

        try {
            const result = new Function(`return (${expr})`)();
            return isNaN(result) ? 0 : Number(result.toFixed(2));
        } catch (err) {
            console.error('[FormulaEngine] Error:', err.message);
            return 0;
        }
    },

    /**
     * Check if value is a formula
     * @param {*} value
     * @returns {boolean}
     */
    isFormula(value) {
        return typeof value === 'string' && value.startsWith('=');
    },

    /**
     * Validate formula syntax
     * @param {string} formula
     * @returns {{valid: boolean, error?: string}}
     */
    validate(formula) {
        if (!formula || !formula.startsWith('=')) {
            return { valid: true };
        }

        try {
            // Replace variables with test values
            let test = formula.substring(1)
                .replace(/@sum_[a-z0-9_]+/g, '100')
                .replace(/@raw/g, '100')
                .replace(/@sum/g, '100')
                .replace(/@qty/g, '1')
                .replace(/\bval\b/g, '1')
                .replace(/\bmin\(/g, 'Math.min(')
                .replace(/\bmax\(/g, 'Math.max(');

            new Function(`return (${test})`)();
            return { valid: true };
        } catch (err) {
            return { valid: false, error: err.message };
        }
    }
};

if (typeof module !== 'undefined') module.exports = FormulaEngine;
window.FormulaEngine = FormulaEngine;
