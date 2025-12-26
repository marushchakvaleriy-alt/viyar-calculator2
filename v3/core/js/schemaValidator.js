/**
 * Schema Validator Module
 * @module schemaValidator
 * @version 3.0.0
 */

const SchemaValidator = {
    requiredFields: ['meta', 'categories', 'processes', 'groups', 'fields', 'rules'],

    /**
     * Validate schema structure
     * @param {Object} schema - Schema to validate
     * @returns {{valid: boolean, errors: string[]}}
     */
    validate(schema) {
        const errors = [];

        if (!schema || typeof schema !== 'object') {
            return { valid: false, errors: ['Schema is not an object'] };
        }

        // Check required fields
        this.requiredFields.forEach(field => {
            if (schema[field] === undefined) {
                errors.push(`Missing required field: ${field}`);
            }
        });

        // Validate meta
        if (schema.meta) {
            if (!schema.meta.title) errors.push('meta.title is required');
            if (!schema.meta.version) errors.push('meta.version is required');
        }

        // Validate processes
        if (Array.isArray(schema.processes)) {
            schema.processes.forEach((proc, idx) => {
                if (!proc.id) errors.push(`processes[${idx}] missing id`);
                if (!proc.name) errors.push(`processes[${idx}] missing name`);
                if (!proc.category) errors.push(`processes[${idx}] missing category`);
            });
        }

        // Validate groups
        if (Array.isArray(schema.groups)) {
            schema.groups.forEach((group, idx) => {
                if (!group.id) errors.push(`groups[${idx}] missing id`);
                if (!group.title) errors.push(`groups[${idx}] missing title`);
            });
        }

        // Validate fields
        if (Array.isArray(schema.fields)) {
            schema.fields.forEach((field, idx) => {
                if (!field.id) errors.push(`fields[${idx}] missing id`);
                if (!field.type) errors.push(`fields[${idx}] missing type`);
                if (!field.label) errors.push(`fields[${idx}] missing label`);
            });
        }

        return { valid: errors.length === 0, errors };
    },

    /**
     * Log validation results
     * @param {Object} result - Validation result
     */
    logResult(result) {
        if (result.valid) {
            console.log('[SchemaValidator] ✅ Schema is valid');
        } else {
            console.error('[SchemaValidator] ❌ Validation failed:');
            result.errors.forEach(err => console.error('  -', err));
        }
    }
};

if (typeof module !== 'undefined') module.exports = SchemaValidator;
window.SchemaValidator = SchemaValidator;
