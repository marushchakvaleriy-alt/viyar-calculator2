/**
 * Calculator Engine
 * Runtime logic for calculator form and calculations
 * @module calculatorEngine
 * @version 3.0.0
 */

const CalculatorEngine = {
    schema: null,
    values: {},
    products: [],

    /**
     * Initialize calculator with schema
     * @param {Object} schema
     */
    init(schema) {
        this.schema = schema;
        this.values = {};
        this.products = [];

        this.renderForm();
        this.calculate();

        console.log('[CalculatorEngine] Initialized');
    },

    /**
     * Render form based on schema
     */
    renderForm() {
        const container = document.getElementById('formContainer');
        if (!container || !this.schema) return;

        container.innerHTML = '';

        (this.schema.groups || []).forEach(group => {
            const groupEl = this.createGroup(group);
            container.appendChild(groupEl);
        });
    },

    /**
     * Create group element
     * @param {Object} group
     * @returns {HTMLElement}
     */
    createGroup(group) {
        const div = document.createElement('div');
        div.className = 'calc-group';
        div.innerHTML = `<h3 class="calc-group-title">${group.title}</h3>`;

        const fields = (this.schema.fields || []).filter(f => f.groupId === group.id);
        fields.forEach(field => {
            const fieldEl = this.createField(field);
            div.appendChild(fieldEl);
        });

        return div;
    },

    /**
     * Create field element
     * @param {Object} field
     * @returns {HTMLElement}
     */
    createField(field) {
        const div = document.createElement('div');
        div.className = 'calc-field';
        div.id = 'field-' + field.id;

        switch (field.type) {
            case 'number':
                div.innerHTML = `
                    <div class="calc-field-row">
                        <label>${field.label}</label>
                        <input type="number" min="0" value="${field.default || 0}" 
                            data-field="${field.id}" onchange="CalculatorEngine.updateValue('${field.id}', this.value)">
                    </div>
                `;
                this.values[field.id] = field.default || 0;
                break;

            case 'select':
                const options = (field.options || []).map(o =>
                    `<option value="${o.value}">${o.label}</option>`
                ).join('');
                div.innerHTML = `
                    <div class="calc-field-row">
                        <label>${field.label}</label>
                        <select data-field="${field.id}" onchange="CalculatorEngine.updateValue('${field.id}', this.value)">
                            ${options}
                        </select>
                    </div>
                `;
                this.values[field.id] = field.options?.[0]?.value || '';
                break;

            case 'checkbox':
                div.innerHTML = `
                    <label class="calc-checkbox">
                        <input type="checkbox" data-field="${field.id}" 
                            onchange="CalculatorEngine.updateValue('${field.id}', this.checked)">
                        <span>${field.label}</span>
                    </label>
                `;
                this.values[field.id] = false;
                break;

            case 'checkbox_qty':
                div.innerHTML = `
                    <div class="calc-field-row">
                        <label class="calc-checkbox" style="flex: 1">
                            <input type="checkbox" data-field="${field.id}_check" 
                                onchange="CalculatorEngine.toggleCheckQty('${field.id}', this.checked)">
                            <span>${field.label}</span>
                        </label>
                        <input type="number" min="0" value="1" disabled
                            data-field="${field.id}_qty" style="width: 80px"
                            onchange="CalculatorEngine.updateValue('${field.id}', this.value)">
                    </div>
                `;
                this.values[field.id] = 0;
                break;

            case 'action_button':
                div.innerHTML = `
                    <button class="calc-action-btn" onclick="CalculatorEngine.openModal('${field.id}')">
                        ${field.default || '+ Додати'}
                    </button>
                `;
                break;
        }

        return div;
    },

    /**
     * Update field value and recalculate
     * @param {string} fieldId
     * @param {*} value
     */
    updateValue(fieldId, value) {
        if (typeof value === 'string' && !isNaN(value)) {
            value = Number(value);
        }
        this.values[fieldId] = value;
        this.calculate();
    },

    /**
     * Toggle checkbox with quantity
     * @param {string} fieldId
     * @param {boolean} checked
     */
    toggleCheckQty(fieldId, checked) {
        const qtyInput = document.querySelector(`[data-field="${fieldId}_qty"]`);
        if (qtyInput) {
            qtyInput.disabled = !checked;
            this.values[fieldId] = checked ? Number(qtyInput.value) : 0;
            this.calculate();
        }
    },

    /**
     * Calculate total points
     */
    calculate() {
        if (!this.schema) return;

        let total = 0;
        const categorySums = {};

        // Initialize category sums
        Object.keys(this.schema.categories || {}).forEach(catId => {
            categorySums[catId] = 0;
        });

        // Calculate for each field
        (this.schema.fields || []).forEach(field => {
            const qty = this.values[field.id] || 0;
            if (!qty) return;

            const rules = this.schema.rules?.[field.id] || {};

            (this.schema.processes || []).forEach(proc => {
                let val = rules[proc.id];
                if (val === undefined) return;

                // Handle once flag
                let multiplier = qty;
                if (typeof val === 'object' && val.v !== undefined) {
                    if (val.once) multiplier = 1;
                    val = val.v;
                }

                // Evaluate formula or number
                let points = 0;
                if (FormulaEngine.isFormula(val)) {
                    points = FormulaEngine.evaluate(val, { qty: multiplier });
                } else {
                    points = (parseFloat(val) || 0) * multiplier;
                }

                total += points;
                if (proc.category && categorySums[proc.category] !== undefined) {
                    categorySums[proc.category] += points;
                }
            });
        });

        // Update UI
        document.getElementById('totalScore').textContent = Math.round(total);
        this.renderCategoryBreakdown(categorySums);
    },

    /**
     * Render category breakdown
     * @param {Object} sums
     */
    renderCategoryBreakdown(sums) {
        const container = document.getElementById('categoryBreakdown');
        if (!container || !this.schema) return;

        container.innerHTML = '';

        Object.entries(sums).forEach(([catId, sum]) => {
            const cat = this.schema.categories?.[catId];
            if (!cat) return;

            const div = document.createElement('div');
            div.className = 'calc-category';
            div.innerHTML = `
                <span class="calc-category-name">${cat.name}</span>
                <span class="calc-category-value">${Math.round(sum)}</span>
            `;
            container.appendChild(div);
        });
    },

    /**
     * Open modal for action button
     * @param {string} fieldId
     */
    openModal(fieldId) {
        const field = (this.schema.fields || []).find(f => f.id === fieldId);
        if (!field || !field.modalFields) {
            UIHelpers.toast('Модалка ще не налаштована', 'info');
            return;
        }

        // TODO: Implement modal
        console.log('[CalculatorEngine] Open modal for:', fieldId);
        UIHelpers.toast('Відкриття модалки...', 'info');
    }
};

window.CalculatorEngine = CalculatorEngine;
