/**
 * Formula Engine Module
 * Evaluates mathematical formulas with variable substitution
 * @version 1.0.0
 */

const FormulaEngine = {
    /**
     * Evaluate a formula string
     * @param {string} formula - Formula starting with '=' (e.g., '=@qty * 10')
     * @param {number} qty - Quantity value (replaces @qty)
     * @param {Object} vars - Additional variables (e.g., { '@sum_konst': 150 })
     * @returns {number} Calculated result
     */
    evaluate(formula, qty = 0, vars = {}) {
        if (!formula || typeof formula !== 'string') return 0;

        let expr = formula.startsWith('=') ? formula.substring(1).trim() : formula.trim();
        if (!expr) return 0;

        // Replace built-in variables
        expr = expr.replace(/\bval\b/g, qty);
        expr = expr.replace(/@qty/g, qty);

        // Sort keys by length (longest first) to avoid partial replacements
        const keys = Object.keys(vars).sort((a, b) => b.length - a.length);

        keys.forEach(key => {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(escapedKey + '(?![a-zA-Z0-9_])', 'g');
            expr = expr.replace(re, vars[key]);
        });

        // Replace math function names with Math.* equivalents
        expr = expr.replace(/\bmin\s*\(/g, 'Math.min(');
        expr = expr.replace(/\bmax\s*\(/g, 'Math.max(');
        expr = expr.replace(/\bceil\s*\(/g, 'Math.ceil(');
        expr = expr.replace(/\bfloor\s*\(/g, 'Math.floor(');
        expr = expr.replace(/\bround\s*\(/g, 'Math.round(');
        expr = expr.replace(/\babs\s*\(/g, 'Math.abs(');

        try {
            const result = new Function(`return (${expr})`)();
            return isNaN(result) ? 0 : Number(result);
        } catch (e) {
            console.error('[FormulaEngine] Evaluation error:', expr, e);
            return 0;
        }
    },

    /**
     * Check if a value is a formula
     * @param {*} value - Value to check
     * @returns {boolean}
     */
    isFormula(value) {
        return typeof value === 'string' && value.startsWith('=');
    },

    /**
     * Extract variables used in a formula
     * @param {string} formula - Formula to analyze
     * @returns {string[]} Array of variable names
     */
    extractVariables(formula) {
        if (!this.isFormula(formula)) return [];

        const matches = formula.match(/@[a-zA-Z_][a-zA-Z0-9_]*/g);
        return matches ? [...new Set(matches)] : [];
    },

    /**
     * Validate formula syntax
     * @param {string} formula - Formula to validate
     * @returns {{valid: boolean, error: string|null}}
     */
    validate(formula) {
        if (!this.isFormula(formula)) {
            return { valid: true, error: null }; // Not a formula, always valid
        }

        try {
            // Replace variables with dummy values for syntax check
            let testExpr = formula.substring(1);
            testExpr = testExpr.replace(/@[a-zA-Z_][a-zA-Z0-9_]*/g, '1');
            testExpr = testExpr.replace(/\bval\b/g, '1');
            testExpr = testExpr.replace(/\bmin\s*\(/g, 'Math.min(');
            testExpr = testExpr.replace(/\bmax\s*\(/g, 'Math.max(');
            testExpr = testExpr.replace(/\bceil\s*\(/g, 'Math.ceil(');
            testExpr = testExpr.replace(/\bfloor\s*\(/g, 'Math.floor(');
            testExpr = testExpr.replace(/\bround\s*\(/g, 'Math.round(');

            new Function(`return (${testExpr})`);
            return { valid: true, error: null };
        } catch (e) {
            return { valid: false, error: e.message };
        }
    }
};

window.FormulaEngine = FormulaEngine;
