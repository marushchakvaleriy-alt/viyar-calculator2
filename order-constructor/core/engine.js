/**
 * Engine.js - Dynamic Form Builder
 * Renders the form based on config_form.js configuration.
 */

const Engine = {
    // Initialize the engine
    init: function (config, containerId) {
        this.config = config;
        this.container = document.getElementById(containerId);

        if (!this.container) {
            console.error('Engine: Container not found');
            return;
        }

        this.render();
        this.initEvents();
    },

    // Render the entire form
    render: function () {
        this.container.innerHTML = '';

        this.config.sections.forEach(section => {
            const sectionEl = this.createSection(section);
            this.container.appendChild(sectionEl);
        });
    },

    // Create a collapsible section
    createSection: function (sectionData) {
        const section = document.createElement('div');
        section.className = 'section';
        section.id = sectionData.id;

        // Header
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <span>${sectionData.title}</span>
            <span class="toggle">▼</span>
        `;
        header.onclick = () => {
            section.classList.toggle('collapsed');
            // Save state if needed
        };

        // Body
        const body = document.createElement('div');
        body.className = 'section-body';

        // Render items (fields/subsections)
        sectionData.items.forEach(item => {
            if (item.type === 'subsection') {
                body.appendChild(this.createSubsection(item));
            } else if (item.type === 'row') {
                body.appendChild(this.createRow(item));
            } else if (item.type === 'html') {
                const div = document.createElement('div');
                div.innerHTML = item.content;
                body.appendChild(div);
            } else {
                body.appendChild(this.createField(item));
            }
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    },

    // Create a subsection
    createSubsection: function (subData) {
        const sub = document.createElement('div');
        sub.className = 'subsection';

        if (subData.title) {
            const title = document.createElement('div');
            title.className = 'subsection-title';
            title.textContent = subData.title;
            sub.appendChild(title);
        }

        subData.fields.forEach(field => {
            if (field.type === 'row') {
                sub.appendChild(this.createRow(field));
            } else {
                sub.appendChild(this.createField(field));
            }
        });

        return sub;
    },

    // Create a row of fields
    createRow: function (rowData) {
        const row = document.createElement('div');
        row.className = 'field-row';
        if (rowData.className) row.className += ' ' + rowData.className; // Apply custom class (e.g., excel-row)

        rowData.items.forEach(item => {
            if (item.type === 'label') {
                row.appendChild(this.createLabelItem(item));
            } else if (item.label && !rowData.className?.includes('excel-row')) {
                // Normal behavior: Full field with label inside row (unless it's an excel row where we separate them)
                row.appendChild(this.createField(item));
            } else {
                // Just input (or input with hidden label context)
                row.appendChild(this.createSimpleFieldWrapper(item));
            }
        });

        return row;
    },

    // Standalone Label Item
    createLabelItem: function (item) {
        const div = document.createElement('div');
        div.className = 'field-label-item';
        div.innerText = item.label;

        if (item.width) {
            div.style.width = item.width;
            div.style.flex = `0 0 ${item.width}`;
        } else {
            div.style.flex = '1';
        }

        if (item.indent) {
            div.style.paddingLeft = '20px';
        }

        return div;
    },

    // Wrapper for input only (inside row)
    createSimpleFieldWrapper: function (item) {
        // If specific width
        const wrapper = document.createElement('div');
        wrapper.className = 'field-wrapper';

        if (item.width && item.width !== 'flex') {
            wrapper.style.maxWidth = item.width;
            wrapper.style.flex = '0 0 ' + item.width;
        } else if (item.flexGrow) {
            wrapper.style.flex = item.flexGrow;
        } else {
            wrapper.style.flex = 1;
        }

        wrapper.appendChild(this.createInputElement(item));
        return wrapper;
    },

    createInputOnly: function (item) {
        // Same logic as createSimpleFieldWrapper but returning the element directly or wrapped?
        // createSimpleFieldWrapper handles the flex/width layout
        return this.createSimpleFieldWrapper(item);
    },

    // Create a Label element
    createLabel: function (fieldData) {
        const label = document.createElement('label');
        label.className = 'field-label';
        label.innerHTML = fieldData.label;

        if (fieldData.hint) {
            label.innerHTML += ` <span class="hint">${fieldData.hint}</span>`;
        }
        return label;
    },

    // Create a standard field group (Label + Input)
    createField: function (fieldData) {
        const group = document.createElement('div');
        group.className = 'field-group';

        if (fieldData.label) {
            group.appendChild(this.createLabel(fieldData));
        }

        group.appendChild(this.createInputElement(fieldData));
        return group;
    },

    // Create the input element based on type
    createInputElement: function (fieldData) {
        let input;

        switch (fieldData.type) {
            case 'repeater':
                return this.createRepeater(fieldData);
            case 'catalog':
                const wrapper = document.createElement('div');
                wrapper.className = 'autocomplete-wrapper';

                input = document.createElement('input');
                input.type = 'text';
                input.className = 'field-input catalog-input';
                input.id = fieldData.id;
                input.dataset.catalog = fieldData.catalogId;
                if (fieldData.filterBy) input.dataset.filterBy = fieldData.filterBy;
                if (fieldData.placeholder) input.placeholder = fieldData.placeholder;

                const list = document.createElement('div');
                list.className = 'autocomplete-list';
                list.id = fieldData.id + '_list';

                wrapper.appendChild(input);
                wrapper.appendChild(list);
                return wrapper;

            case 'select':
                input = document.createElement('select');
                input.className = 'field-input';
                input.id = fieldData.id;

                fieldData.options.forEach(opt => {
                    const option = document.createElement('option');
                    // Treat any option starting with "—" as an empty value (placeholder)
                    const isPlaceholder = opt.trim().startsWith('—');
                    option.value = isPlaceholder ? '' : opt;
                    option.textContent = opt;
                    input.appendChild(option);
                });
                return input;

            case 'textarea':
                input = document.createElement('textarea');
                input.className = 'field-input';
                input.id = fieldData.id;
                if (fieldData.placeholder) input.placeholder = fieldData.placeholder;
                return input;

            case 'toggle':
                const toggleWrapper = document.createElement('div');
                toggleWrapper.className = 'toggle-field';

                if (fieldData.label) {
                    const span = document.createElement('span');
                    span.textContent = fieldData.label;
                    toggleWrapper.appendChild(span);
                }

                const btnGroup = document.createElement('div');
                btnGroup.className = 'toggle-btn';
                btnGroup.id = fieldData.id;

                // Using dataset for state tracking
                btnGroup.dataset.value = fieldData.defaultValue ? 'true' : 'false';

                const btnPlus = document.createElement('button');
                btnPlus.type = 'button';
                btnPlus.textContent = '+';
                btnPlus.onclick = () => this.setToggle(fieldData.id, true);

                const btnMinus = document.createElement('button');
                btnMinus.type = 'button';
                btnMinus.textContent = '−';
                btnMinus.onclick = () => this.setToggle(fieldData.id, false);

                if (fieldData.defaultValue) btnPlus.classList.add('active-plus');
                else btnMinus.classList.add('active-minus');

                btnGroup.appendChild(btnPlus);
                btnGroup.appendChild(btnMinus);
                toggleWrapper.appendChild(btnGroup);
                return toggleWrapper;

            default: // text
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'field-input';
                input.id = fieldData.id;
                if (fieldData.placeholder) input.placeholder = fieldData.placeholder;
                if (fieldData.value) input.value = fieldData.value;
                if (fieldData.defaultValue) input.value = fieldData.defaultValue;
                return input;
        }
    },

    // Helper for Toggle logic
    setToggle: function (id, state) {
        const group = document.getElementById(id);
        if (!group) return;

        const btns = group.getElementsByTagName('button');
        if (state) {
            btns[0].classList.add('active-plus');
            btns[1].classList.remove('active-minus');
            group.dataset.value = 'true';
        } else {
            btns[0].classList.remove('active-plus');
            btns[1].classList.add('active-minus');
            group.dataset.value = 'false';
        }
        // Trigger generic change event if needed
    },

    // Initialize Auto-complete and other events
    initEvents: function () {
        // Re-attach autocomplete logic from original script
        // This assumes setupAutocomplete is globally available or we move it here
        if (typeof setupAllAutocompletes === 'function') {
            setupAllAutocompletes();
        } else {
            // Fallback: attach to all .catalog-input
            const inputs = document.querySelectorAll('.catalog-input');
            inputs.forEach(input => {
                const catalogId = input.dataset.catalog;
                const listId = input.id + '_list';
                if (window.setupAutocomplete) {
                    window.setupAutocomplete(input.id, listId, window['Catalog_' + this.capitalize(catalogId)]);
                }
            });
        }
    },

    capitalize: function (s) {
        if (!s) return '';
        // Special cases mapping
        const map = {
            'ldsp': 'LDSP',
            'edges': 'Edges',
            'facades': 'Facades',
            'countertops': 'Countertops',
            'hinges': 'Hinges',
            'handles': 'Handles',
            'drawer_systems': 'DrawerSystems',
            'lift_systems': 'LiftSystems',
            'cargo': 'Cargo',
            'dryers': 'Dryers',
            'lighting': 'Lighting',
            'appliances': 'Appliances',
            'sinks': 'Sinks',
            'mixers': 'Mixers'
        };
        return map[s] || (s.charAt(0).toUpperCase() + s.slice(1));
    },

    // --- REPEATER LOGIC START ---
    createRepeater: function (fieldData) {
        if (fieldData.layout === 'table') {
            return this.createTableRepeater(fieldData);
        }

        const container = document.createElement('div');
        container.className = 'repeater-container';
        container.id = fieldData.id;

        const list = document.createElement('div');
        list.className = 'repeater-list';
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '10px';

        // Add Button
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'btn btn-sm btn-primary';
        addBtn.innerText = '+ Додати позицію';
        addBtn.style.marginTop = '10px';
        addBtn.onclick = () => {
            this.addRepeaterItem(list, fieldData.fields, fieldData.id);
        };

        // Add initial empty item
        // this.addRepeaterItem(list, fieldData.fields, fieldData.id);

        container.appendChild(list);
        container.appendChild(addBtn);
        return container;
    },

    createTableRepeater: function (fieldData) {
        const container = document.createElement('div');
        container.className = 'repeater-table-container';
        container.id = fieldData.id;

        const table = document.createElement('table');
        table.className = 'repeater-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        // Header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        fieldData.fields.forEach(field => {
            const th = document.createElement('th');
            th.innerText = field.label || '';
            th.style.padding = '8px';
            th.style.borderBottom = '2px solid #e2e8f0';
            th.style.textAlign = 'left';
            th.style.fontSize = '12px';
            th.style.color = '#64748b';
            if (field.width) th.style.width = field.width;
            headerRow.appendChild(th);
        });
        // Action column
        const actionTh = document.createElement('th');
        actionTh.style.width = '40px';
        headerRow.appendChild(actionTh);

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        tbody.id = fieldData.id + '_tbody';
        table.appendChild(tbody);

        container.appendChild(table);

        // Add Button
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'btn btn-sm btn-primary';
        addBtn.innerText = '+ Додати рядок';
        addBtn.style.marginTop = '10px';
        addBtn.onclick = () => {
            this.addTableRepeaterItem(tbody, fieldData.fields, fieldData.id);
        };

        // Add initial row
        this.addTableRepeaterItem(tbody, fieldData.fields, fieldData.id);

        container.appendChild(addBtn);
        return container;
    },

    addTableRepeaterItem: function (tbody, itemFields, parentId) {
        const index = tbody.children.length;
        const rowId = `${parentId}_${index}`;

        const tr = document.createElement('tr');
        tr.className = 'repeater-row';
        tr.style.borderBottom = '1px solid #f1f5f9';

        itemFields.forEach(field => {
            const td = document.createElement('td');
            td.style.padding = '8px';

            const fieldConfig = {
                ...field,
                id: `${field.id}_${rowId}`,
                label: null // No label in cell
            };

            // Create input
            const inputEl = this.createInputElement(fieldConfig);
            inputEl.style.width = '100%';

            // If it's a catalog, we need to handle the wrapper manually or reuse createInputElement logic which returns wrapper
            // createInputElement for catalog returns wrapper.

            td.appendChild(inputEl);
            tr.appendChild(td);
        });

        // Delete Action
        const actionTd = document.createElement('td');
        actionTd.style.textAlign = 'center';
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '×';
        removeBtn.className = 'btn-icon-danger';
        removeBtn.style.color = 'red';
        removeBtn.style.background = 'none';
        removeBtn.style.border = 'none';
        removeBtn.style.fontSize = '18px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.onclick = () => tr.remove();

        actionTd.appendChild(removeBtn);
        tr.appendChild(actionTd);

        tbody.appendChild(tr);

        // Re-init events
        const inputs = tr.querySelectorAll('.catalog-input');
        inputs.forEach(input => {
            const listId = input.id + '_list';
            const catalogId = input.dataset.catalog;
            if (window.setupAutocomplete && window.getCatalog) {
                window.setupAutocomplete(input.id, listId, window.getCatalog(catalogId));
            }
        });
    },

    // Legacy list repeater
    addRepeaterItem: function (listContainer, itemFields, parentId) {
        const index = listContainer.children.length;
        const rowId = `${parentId}_${index}`;

        const row = document.createElement('div');
        row.className = 'repeater-item';
        row.style.display = 'flex';
        row.style.gap = '10px';
        row.style.alignItems = 'flex-end';
        row.style.background = '#f8fafc';
        row.style.padding = '10px';
        row.style.borderRadius = '8px';
        row.style.border = '1px solid #e2e8f0';

        // Render fields for this item
        itemFields.forEach(field => {
            const fieldConfig = {
                ...field,
                id: `${field.id}_${rowId}`
            };

            const el = this.createSimpleFieldWrapper(fieldConfig);

            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.flex = el.style.flex; // Propagate flex
            if (el.style.maxWidth) wrapper.style.maxWidth = el.style.maxWidth; // Propagate max-width

            if (field.label) {
                const lbl = document.createElement('label');
                lbl.style.fontSize = '12px';
                lbl.style.marginBottom = '2px';
                lbl.innerText = field.label;
                wrapper.appendChild(lbl);
            }

            el.style.width = '100%';
            wrapper.appendChild(el);
            row.appendChild(wrapper);
        });

        // Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '🗑️';
        removeBtn.className = 'btn btn-sm btn-danger';
        removeBtn.style.height = '38px';
        removeBtn.onclick = () => row.remove();

        row.appendChild(removeBtn);
        listContainer.appendChild(row);

        // Re-init events for new inputs
        const inputs = row.querySelectorAll('.catalog-input');
        inputs.forEach(input => {
            const listId = input.id + '_list';
            const catalogId = input.dataset.catalog;
            // Dirty check for setupAutocomplete
            if (window.setupAutocomplete && window.getCatalog) {
                window.setupAutocomplete(input.id, listId, window.getCatalog(catalogId));
            }
        });
    }
    // --- REPEATER LOGIC END ---
};

window.Engine = Engine;
