
// --- REPEATER LOGIC START ---
createRepeater: function (fieldData) {
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

    // Add initial empty item if needed, or leave empty
    // this.addRepeaterItem(list, fieldData.fields, fieldData.id);

    container.appendChild(list);
    container.appendChild(addBtn);
    return container;
},

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
        // Clone config but add unique suffix to ID
        const fieldConfig = {
            ...field,
            id: `${field.id}_${rowId}`,
            // Remove label if inside repeater to save space? Or keep it?
            // Let's keep it but maybe compact
        };

        // If field needs flex
        const el = this.createSimpleFieldWrapper(fieldConfig); // Wraps input

        // If we need label inside repeater item
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.flex = el.style.flex;
        if (field.label) {
            const lbl = document.createElement('label');
            lbl.style.fontSize = '12px';
            lbl.style.marginBottom = '2px';
            lbl.innerText = field.label;
            wrapper.appendChild(lbl);
        }
        // Unwrap 'el' from wrapper? createSimpleFieldWrapper returns div with input. 
        // We can just append el.
        // Reset el flex since wrapper handles it
        el.style.width = '100%';

        wrapper.appendChild(el);
        row.appendChild(wrapper);
    });

    // Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = '🗑️';
    removeBtn.className = 'btn btn-sm btn-danger';
    removeBtn.style.height = '38px'; // approx input height
    removeBtn.onclick = () => row.remove();

    row.appendChild(removeBtn);
    listContainer.appendChild(row);

    // Re-init events for new inputs (like autocomplete)
    // We need to call initEvents logic again for these specific inputs.
    // For now, let's rely on event delegation or manual init?
    // The original initEvents attaches to *existing* inputs. 
    // We need a way to attach autocomplete to new inputs.

    // Find inputs in this row
    const inputs = row.querySelectorAll('.catalog-input');
    inputs.forEach(input => {
        // We need to trigger this globally or expose setupAutocomplete
        // Currently setupAutocomplete is in order.html global scope. 
        // Ideally Engine should handle it, but for now let's try to trigger it.
        const listId = input.id + '_list';
        const catalogId = input.dataset.catalog;
        // We can't easily call setupAutocomplete from here if it's not on window or Engine.
        // But wait, setupAutocomplete calls are hardcoded in order.html usually? 
        // No, initEvents in engine calls setupAutocomplete? 
        // Let's check initEvents.

        if (window.setupAutocomplete) {
            window.setupAutocomplete(input.id, listId, window.getCatalog(catalogId));
        }
    });
},
// --- REPEATER LOGIC END ---

