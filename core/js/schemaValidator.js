/**
 * Schema Validator Module
 * Validates schema structure before use
 * @version 1.0.0
 */

const SchemaValidator = {
    requiredFields: ['categories', 'processes', 'groups', 'fields'],

    /**
     * Validate a schema object
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
            if (!schema[field]) {
                errors.push(`Missing required field: ${field}`);
            }
        });

        // Validate categories
        if (schema.categories && typeof schema.categories !== 'object') {
            errors.push('categories must be an object');
        }

        // Validate processes
        if (schema.processes && !Array.isArray(schema.processes)) {
            errors.push('processes must be an array');
        } else if (schema.processes) {
            schema.processes.forEach((proc, i) => {
                if (!proc.id) errors.push(`Process ${i} missing id`);
                if (!proc.name) errors.push(`Process ${i} missing name`);
                if (!proc.category) errors.push(`Process ${i} missing category`);
            });
        }

        // Validate groups
        if (schema.groups && !Array.isArray(schema.groups)) {
            errors.push('groups must be an array');
        }

        // Validate fields
        if (schema.fields && !Array.isArray(schema.fields)) {
            errors.push('fields must be an array');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Log validation results to console
     * @param {Object} schema - Schema to validate
     */
    logValidation(schema) {
        const result = this.validate(schema);
        if (result.valid) {
            console.log('[SchemaValidator] Schema is valid');
        } else {
            console.error('[SchemaValidator] Schema validation failed:');
            result.errors.forEach(err => console.error('  - ' + err));
        }
        return result;
    }
};

window.SchemaValidator = SchemaValidator;
