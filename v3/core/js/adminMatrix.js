/**
 * Admin Matrix Module
 * Renders and manages the admin matrix table
 * @module adminMatrix
 * @version 3.0.0
 */

const AdminMatrix = {
    schema: null,
    options: {},
    collapsed: [],

    /**
     * Render matrix table
     * @param {HTMLElement} table - Table element
     * @param {Object} schema - Schema object
     * @param {Object} options - Options (onUpdate, onSave)
     */
    render(table, schema, options = {}) {
        this.schema = schema;
        this.options = options;

        if (!table || !schema) return;

        table.innerHTML = '';

        // Header Row 1 - Categories
        const h1 = document.createElement('tr');
        h1.innerHTML = '<th class="col-sticky">Параметри</th>';

        Object.entries(schema.categories || {}).forEach(([catId, cat]) => {
            const procs = (schema.processes || []).filter(p => p.category === catId);
            const th = document.createElement('th');
            th.colSpan = procs.length || 1;
            th.className = 'th-category';
            th.style.background = cat.color || '#3b82f6';
            th.innerHTML = cat.name;
            h1.appendChild(th);
        });
        table.appendChild(h1);

        // Header Row 2 - Processes
        const h2 = document.createElement('tr');
        h2.innerHTML = '<th class="col-sticky">Процес</th>';

        (schema.processes || []).forEach(proc => {
            const th = document.createElement('th');
            th.className = 'th-process';
            th.textContent = proc.name;
            h2.appendChild(th);
        });
        table.appendChild(h2);

        // Groups and Fields
        (schema.groups || []).forEach(group => {
            // Group Row
            const gRow = document.createElement('tr');
            gRow.className = 'row-group';
            gRow.id = 'group-' + group.id;

            const gTd = document.createElement('td');
            gTd.colSpan = (schema.processes || []).length + 1;
            gTd.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="cursor: pointer; font-size: 12px;" onclick="AdminMatrix.toggleGroup('${group.id}')">▼</span>
                    <input class="cell-input" style="font-weight: 700; text-align: left; border: none;" 
                        value="${group.title}" 
                        onchange="AdminMatrix.updateGroupTitle('${group.id}', this.value)">
                    <button onclick="AdminMatrix.addField('${group.id}')" style="background: none; border: none; cursor: pointer; opacity: 0.5;">➕</button>
                </div>
            `;
            gRow.appendChild(gTd);
            table.appendChild(gRow);

            // Fields in group
            const fields = (schema.fields || []).filter(f => f.groupId === group.id);
            fields.forEach(field => {
                const fRow = this.createFieldRow(field);
                table.appendChild(fRow);
            });

            // Add field hint
            const addRow = document.createElement('tr');
            addRow.innerHTML = `
                <td colspan="${(schema.processes || []).length + 1}">
                    <div class="add-row-hint" onclick="AdminMatrix.addField('${group.id}')">
                        + Додати поле
                    </div>
                </td>
            `;
            table.appendChild(addRow);
        });
    },

    /**
     * Create field row
     * @param {Object} field
     * @returns {HTMLElement}
     */
    createFieldRow(field) {
        const tr = document.createElement('tr');
        tr.className = 'row-field';

        // Label cell
        const labelTd = document.createElement('td');
        labelTd.className = 'col-sticky';
        labelTd.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 10px; opacity: 0.5;">${field.type || 'num'}</span>
                <input class="cell-input" style="text-align: left; font-weight: 600; flex: 1;" 
                    value="${field.label}" 
                    onchange="AdminMatrix.updateFieldLabel('${field.id}', this.value)">
                <button onclick="AdminMatrix.deleteField('${field.id}')" 
                    style="background: none; border: none; color: #ef4444; cursor: pointer; opacity: 0.5;">❌</button>
            </div>
        `;
        tr.appendChild(labelTd);

        // Process cells
        (this.schema.processes || []).forEach(proc => {
            const td = document.createElement('td');
            const val = this.schema.rules?.[field.id]?.[proc.id] || '';

            const input = document.createElement('input');
            input.className = 'cell-input' + (String(val).startsWith('=') ? ' cell-formula' : '');
            input.value = typeof val === 'object' ? val.v : val;
            input.onchange = (e) => this.updateRule(field.id, proc.id, e.target.value);

            td.appendChild(input);
            tr.appendChild(td);
        });

        return tr;
    },

    /**
     * Update rule value
     * @param {string} fieldId
     * @param {string} processId
     * @param {*} value
     */
    updateRule(fieldId, processId, value) {
        if (!this.schema.rules) this.schema.rules = {};
        if (!this.schema.rules[fieldId]) this.schema.rules[fieldId] = {};

        // Parse number if possible
        if (!isNaN(value) && value !== '' && !value.startsWith('=')) {
            value = Number(value);
        }

        this.schema.rules[fieldId][processId] = value;

        if (this.options.onUpdate) this.options.onUpdate();
    },

    /**
     * Update group title
     * @param {string} groupId
     * @param {string} title
     */
    updateGroupTitle(groupId, title) {
        const group = (this.schema.groups || []).find(g => g.id === groupId);
        if (group) {
            group.title = title;
            if (this.options.onUpdate) this.options.onUpdate();
        }
    },

    /**
     * Update field label
     * @param {string} fieldId
     * @param {string} label
     */
    updateFieldLabel(fieldId, label) {
        const field = (this.schema.fields || []).find(f => f.id === fieldId);
        if (field) {
            field.label = label;
            if (this.options.onUpdate) this.options.onUpdate();
        }
    },

    /**
     * Add new field to group
     * @param {string} groupId
     */
    addField(groupId) {
        const label = prompt('Назва нового поля:');
        if (!label) return;

        if (!this.schema.fields) this.schema.fields = [];
        this.schema.fields.push({
            id: 'f_' + Date.now(),
            groupId: groupId,
            label: label,
            type: 'number'
        });

        if (this.options.onUpdate) this.options.onUpdate();

        // Re-render
        const table = document.getElementById('matrixTable');
        if (table) this.render(table, this.schema, this.options);
    },

    /**
     * Delete field
     * @param {string} fieldId
     */
    deleteField(fieldId) {
        if (!confirm('Видалити це поле?')) return;

        this.schema.fields = (this.schema.fields || []).filter(f => f.id !== fieldId);
        if (this.schema.rules) delete this.schema.rules[fieldId];

        if (this.options.onUpdate) this.options.onUpdate();

        const table = document.getElementById('matrixTable');
        if (table) this.render(table, this.schema, this.options);
    },

    /**
     * Toggle group collapse
     * @param {string} groupId
     */
    toggleGroup(groupId) {
        const idx = this.collapsed.indexOf(groupId);
        if (idx === -1) this.collapsed.push(groupId);
        else this.collapsed.splice(idx, 1);

        const table = document.getElementById('matrixTable');
        if (table) this.render(table, this.schema, this.options);
    }
};

window.AdminMatrix = AdminMatrix;
