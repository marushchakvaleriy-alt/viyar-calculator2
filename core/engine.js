/**
 * Viyar Calculator V2 - Runtime Engine
 * 
 * Responsibilities:
 * 1. Build UI from Schema.fields
 * 2. Listen to Input functionality
 * 3. Calculate Points based on Schema.rules
 * 4. Update UI
 */

const Engine = {
    state: {}, // Holds current values { f_id: value }

    addedProducts: [],
    buttonContainers: {}, // Maps buttonId to container element
    activeCategories: new Set(), // Set of active category IDs

    init() {
        console.log("Engine Initializing...");
        // Initialize all categories as active by default
        Object.keys(Schema.categories || {}).forEach(cid => this.activeCategories.add(cid));

        this.injectStyles();
        this.renderForm();
        this.calculate(); // Initial calculation
    },

    getFieldDef(fId) {
        if (!Schema || !Schema.fields) return null;

        // Optimized recursive search
        const findIn = (fields) => {
            for (const f of fields) {
                if (f.id === fId) return f;
                if (f.modalFields && f.modalFields.length > 0) {
                    const found = findIn(f.modalFields);
                    if (found) return found;
                }
                // Check options for nested fields if applicable (though structure suggests simple options usually)
                if (f.options && Array.isArray(f.options)) {
                    // Some schemas might have fields inside options? Unlikely based on current structure but safe to check if needed.
                    // Current Schema structure has fields in 'modalFields'.
                }
            }
            return null;
        };

        return findIn(Schema.fields);
    },

    injectStyles() {
        if (document.getElementById('engine-grid-styles')) return;
        const style = document.createElement('style');
        style.id = 'engine-grid-styles';
        style.innerHTML = `
            *, *::before, *::after { box-sizing: border-box; }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                font-family: 'Inter', sans-serif;
            }
            .group {
                margin-bottom: 0; /* Let gap handle spacing */
                padding: 15px;
                background: rgba(255,255,255,0.03);
            }
            .group-header {
                font-size: 18px;
                font-weight: 800;
                margin-bottom: 20px;
                color: inherit;
            }
            .group-body { 
                display: grid !important; 
                grid-template-columns: repeat(12, 1fr); 
                gap: 15px;
                align-items: stretch; /* Equal height for all fields in row */
            }
            .field { 
                grid-column: span 12; 
                display: flex !important;
                flex-direction: column !important;
                border-radius: 8px;
                transition: all 0.2s ease;
                height: 100%; /* Fill grid cell height */
            }
            .field.hidden {
                display: none !important;
            }
            .field label { 
                margin-bottom: 8px;
                font-weight: 600;
                font-size: 14px;
                flex-shrink: 0; /* Label doesn't shrink */
            }
            .field > div { 
                margin-top: auto !important; /* Push input container to bottom */
            }
            .field input, .field select {
                padding: 10px 12px;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 8px;
                background: rgba(255,255,255,0.05);
                color: inherit;
                outline: none;
                font-size: 14px;
                box-sizing: border-box;
            }
            
            /* Light Theme Overrides */
            body.light-theme {
                background: #f3f4f6;
                color: #111827;
            }
            body.light-theme .container {
                background: white;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            body.light-theme .field input, body.light-theme .field select {
                background: white;
                border: 1px solid #d1d5db;
                color: #111827;
            }
            body.light-theme .group-header { color: #111827; }
            body.light-theme .field label { color: #374151; }

            .field.w-25 { grid-column: span 3; }
            .field.w-33 { grid-column: span 4; }
            .field.w-50 { grid-column: span 6; }
            .field.w-66 { grid-column: span 8; }
            .field.w-75 { grid-column: span 9; }
            .field.w-100 { grid-column: span 12; }
            
            /* Rich Tooltips */
            .help-container {
                position: relative;
                display: inline-flex;
                align-items: center;
                margin-left: 6px;
            }
            .help-icon {
                width: 16px;
                height: 16px;
                background: #9ca3af;
                color: #fff;
                border-radius: 50%;
                font-size: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: help;
                font-weight: 800;
            }
            .help-tooltip {
                visibility: hidden;
                position: absolute;
                top: calc(100% + 10px);
                left: 50%;
                transform: translateX(-50%) translateY(-10px);
                background: #1e293b;
                color: #fff;
                padding: 12px;
                border-radius: 10px;
                width: 250px;
                z-index: 1000;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
                font-size: 12px;
                line-height: 1.4;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: none;
            }
            .help-tooltip::after {
                content: '';
                position: absolute;
                bottom: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: transparent transparent #1e293b transparent;
            }
            .help-container:hover .help-tooltip {
                visibility: visible;
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            .help-tooltip img {
                width: 100%;
                max-height: 180px;
                height: auto;
                border-radius: 6px;
                margin-bottom: 8px;
                object-fit: cover;
                display: block;
            }
            
            @media (max-width: 768px) {
                .field { grid-column: span 12 !important; }
            }
        `;
        document.head.appendChild(style);
    },

    // --- UI BUILDER ---
    renderForm() {
        const headerContainer = document.getElementById('calcHeader');
        if (headerContainer) {
            headerContainer.innerHTML = `
                <div class="calc-header-wrapper">
                    <div class="calc-title">
                        ${Schema.layout?.title || Schema.meta?.title || 'Калькулятор'}
                        <span class="calc-badge">${Schema.layout?.version || Schema.meta?.version || 'v2.2'}</span>
                    </div>
                </div>
            `;
        }

        const container = document.getElementById('formContainer');
        if (!container) return;
        container.innerHTML = '';

        // Enforce Clean Light Theme
        document.body.classList.add('light-theme');

        // Render category selectors
        this.renderCategoryToggles();

        Schema.groups.forEach((group, idx) => {
            const gl = group.layout || {};
            const groupEl = document.createElement('div');
            groupEl.className = 'group';

            // Ensure container allows wrapping
            if (!container.style.display) {
                container.style.display = 'flex';
                container.style.flexWrap = 'wrap';
                container.style.gap = (Schema.layout?.groupGap !== undefined ? Schema.layout.groupGap : 20) + 'px';
                container.style.alignItems = 'flex-start'; // Prevent stretching height
            }

            // Apply group styling
            if (gl.width) {
                groupEl.style.width = gl.width;
                // If using flex, flex-basis is better
                groupEl.style.flex = `0 0 ${gl.width}`;

                // Safer calcs for sub-pixel rounding
                if (gl.width === '50%') groupEl.style.flex = `0 0 calc(50% - 11px)`;
                else if (gl.width === '33.33%') groupEl.style.flex = `0 0 calc(33.33% - 14px)`;
                else if (gl.width === '25%') groupEl.style.flex = `0 0 calc(25% - 16px)`;
                else groupEl.style.flex = `0 0 100%`;
            } else {
                groupEl.style.flex = '0 0 100%';
                groupEl.style.width = '100%';
            }

            if (gl.background) {
                groupEl.style.background = gl.background;
            } else {
                groupEl.style.background = '#ffffff';
                groupEl.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            }

            if (gl.borderWidth) {
                groupEl.style.border = `${gl.borderWidth}px solid ${gl.borderColor || '#e2e8f0'}`;
            } else {
                groupEl.style.border = '1px solid #e2e8f0';
            }
            groupEl.style.borderRadius = '14px';

            const header = document.createElement('div');
            header.className = 'group-header';
            // Apply font size and weight with !important
            let titleStyles = '';
            if (gl.titleSize) titleStyles += `font-size: ${gl.titleSize}px !important; `;
            if (gl.titleWeight) titleStyles += `font-weight: ${gl.titleWeight} !important;`;
            if (gl.headerColor) titleStyles += `color: ${gl.headerColor} !important;`;
            // For Engine, we usually don't use badge style background unless requested, 
            // but if user set it in Designer, we might as well show it to keep consistency.
            // However, Engine style '.group-header' is block-level.
            // Let's apply it if present.
            if (gl.headerBg) {
                titleStyles += `background-color: ${gl.headerBg} !important;`;
                titleStyles += `padding: 4px 10px; border-radius: 6px; display: inline-block;`;
            }
            if (titleStyles) header.style.cssText = titleStyles;

            header.textContent = (gl.showNumbering ? `${idx + 1}. ` : '') + (group.title || 'Group');
            groupEl.appendChild(header);

            const body = document.createElement('div');
            body.className = 'group-body';

            // Find fields for this group
            const fields = Schema.fields.filter(f => f.groupId === group.id && !f.hidden);
            fields.forEach(field => {
                const fieldEl = this.createFieldElement(field);

                // Apply group-level field label styles if set
                if (gl.fieldSize || gl.fieldWeight) {
                    const label = fieldEl.querySelector('label');
                    if (label) {
                        if (gl.fieldSize) label.style.fontSize = gl.fieldSize + 'px';
                        if (gl.fieldWeight) label.style.fontWeight = gl.fieldWeight;
                    }
                }

                body.appendChild(fieldEl);
            });

            groupEl.appendChild(body);
            container.appendChild(groupEl);
        });

        // Re-render products list (it was just created in the DOM)
        this.renderAddedProducts();
    },

    createFieldElement(field) {
        const l = field.layout || {};
        const widthClass = l.width || 'w-100';
        const wrapper = document.createElement('div');
        wrapper.id = 'field_wrapper_' + field.id;
        wrapper.dataset.fieldId = field.id;
        wrapper.className = `field ${widthClass}${field.hidden ? ' hidden' : ''}`;

        // Apply wrapper-level styling
        if (l.flexDirection) {
            wrapper.style.setProperty('flex-direction', l.flexDirection, 'important');
            if (l.flexDirection === 'row') {
                wrapper.style.setProperty('display', 'flex', 'important');
                wrapper.style.alignItems = 'center';
            }
        }
        if (l.gap) wrapper.style.gap = l.gap + 'px';
        if (l.padding) wrapper.style.padding = l.padding + 'px';

        // Effects
        if (l.glass) {
            wrapper.style.backdropFilter = 'blur(10px)';
            wrapper.style.backgroundColor = 'rgba(255,255,255,0.03)';
            wrapper.style.border = '1px solid rgba(255,255,255,0.1)';
        }

        if (l.shadow && l.shadow !== 'none') {
            if (l.shadow === 'subtle') wrapper.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            if (l.shadow === 'deep') wrapper.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.3)';
            if (l.shadow === 'glow') wrapper.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.2)';
        }

        if (l.marginTop) wrapper.style.marginTop = l.marginTop + 'px';
        if (l.marginBottom) wrapper.style.marginBottom = l.marginBottom + 'px';

        const label = document.createElement('label');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '5px';
        label.textContent = field.label;

        const helpText = field.helpContent || l.help;
        if (helpText || l.helpImg) {
            const helpContainer = document.createElement('span');
            helpContainer.className = 'help-container';

            const helpIcon = document.createElement('span');
            helpIcon.className = 'help-icon';
            helpIcon.textContent = '?';

            const tooltip = document.createElement('div');
            tooltip.className = 'help-tooltip';

            if (l.helpImg) {
                const img = document.createElement('img');

                // Base path resolution
                let src = l.helpImg;
                if (src.startsWith('images/')) {
                    // If it's just 'images/name.jpg', try to see if it should be in hints/
                    // though we also have a fallback below.
                    src = '../' + src;
                }

                img.src = src;

                // Fallback mechanism: if image doesn't load from root images/, try images/hints/
                img.onerror = () => {
                    if (l.helpImg.startsWith('images/') && !l.helpImg.includes('images/hints/')) {
                        const fallbackSrc = '../images/hints/' + l.helpImg.replace('images/', '');
                        if (img.src !== window.location.origin + fallbackSrc.replace('..', '')) {
                            console.log("Image fallback triggered for:", l.helpImg);
                            img.src = fallbackSrc;
                        }
                    }
                };

                tooltip.appendChild(img);
            }

            if (helpText) {
                const text = document.createElement('div');
                text.textContent = helpText;
                tooltip.appendChild(text);
            }

            helpContainer.appendChild(helpIcon);
            helpContainer.appendChild(tooltip);
            label.appendChild(helpContainer);
        }

        if (l.flexDirection === 'row') {
            label.style.margin = '0';
            label.style.flex = `0 0 ${l.labelWidth || 120}px`;
        }

        // Apply label styling
        if (l.fontSize) label.style.fontSize = l.fontSize + 'px';
        if (l.fontWeight) label.style.fontWeight = l.fontWeight;
        if (l.color) label.style.color = l.color;
        if (l.uppercase) label.style.textTransform = 'uppercase';
        if (l.spaced) label.style.letterSpacing = '1px';
        if (l.lineHeight) label.style.lineHeight = l.lineHeight;
        if (l.fontStyle) label.style.fontStyle = l.fontStyle;

        if (l.textAlign) {
            label.style.textAlign = l.textAlign;
            label.style.justifyContent = l.textAlign === 'center' ? 'center' : (l.textAlign === 'right' ? 'flex-end' : 'flex-start');
        } else {
            label.style.justifyContent = 'flex-start';
        }

        wrapper.appendChild(label);

        // -- INPUT CONTAINER (The "Cell") --
        const inputContainer = document.createElement('div');
        inputContainer.style.flex = '1';
        inputContainer.style.display = 'flex';
        inputContainer.style.alignItems = 'flex-end'; // Align input at the BOTTOM of container
        inputContainer.style.justifyContent = 'flex-start';
        inputContainer.style.width = '100%';
        inputContainer.style.minWidth = '0'; // Prevent flex items from expanding
        inputContainer.style.overflow = (field.type === 'action_button' || field.type === 'select_modal') ? 'visible' : 'hidden';
        if (field.type === 'action_button' || field.type === 'select_modal') {
            inputContainer.style.position = 'relative';
            inputContainer.style.zIndex = '10';
            inputContainer.style.alignItems = 'flex-start'; // Keep buttons at TOP for modal fields
        }

        const inputWrapper = document.createElement('div');
        inputWrapper.style.width = (l.inputWidth || 100) + '%';
        inputWrapper.style.marginLeft = (l.inputOffset || 0) + 'px';
        inputWrapper.style.maxWidth = `calc(100% - ${l.inputOffset || 0}px)`; // Constrain wrapper
        inputContainer.appendChild(inputWrapper);

        const applyStyleToInput = (inp) => {
            inp.style.width = '100%';
            if (l.placeholder) inp.placeholder = l.placeholder;
            if (l.inpBorder) {
                inp.style.borderColor = l.inpBorder;
                inp.style.borderStyle = 'solid';
                inp.style.borderWidth = '1px';
            }
            if (l.inpBg) inp.style.backgroundColor = l.inpBg;
        };

        let inputElement; // This will hold the actual interactive element for the generic listener

        if (field.type === 'select') {
            const select = document.createElement('select');
            select.id = 'input_' + field.id;
            const pText = field.placeholderText || field.label || 'Виберіть...';
            const defaultValue = (this.state[field.id] !== undefined) 
                ? this.state[field.id] 
                : (field.default !== undefined ? field.default : "");

            const placeholder = document.createElement('option');
            placeholder.value = "";
            placeholder.textContent = pText;
            placeholder.disabled = true;
            if (!defaultValue) {
                placeholder.selected = true;
            }
            select.appendChild(placeholder);

            const opts = field.options && field.options.length > 0 ? field.options : [{ value: 'default', label: 'Default' }];
            opts.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.label;
                if (defaultValue && String(opt.value) === String(defaultValue)) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            applyStyleToInput(select);
            select.value = defaultValue;
            this.state[field.id] = defaultValue;
            inputElement = select;
            inputWrapper.appendChild(inputElement);

        } else if (field.type === 'checkbox') {
            const checkboxContainer = document.createElement('div');
            checkboxContainer.style.display = 'flex';
            checkboxContainer.style.alignItems = 'center';

            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.style.width = '20px';
            chk.style.height = '20px';
            if (this.state[field.id] !== undefined) {
                chk.checked = (this.state[field.id] == 1);
            } else {
                chk.checked = Boolean(field.default);
                this.state[field.id] = chk.checked ? 1 : 0;
            }

            checkboxContainer.appendChild(chk);
            inputElement = chk;
            inputWrapper.appendChild(checkboxContainer);

        } else if (field.type === 'action_button') {
            const btnContainer = document.createElement('div');
            btnContainer.style.display = 'flex';
            btnContainer.style.flexDirection = 'column';
            btnContainer.style.justifyContent = 'flex-start'; // Keep button at TOP
            btnContainer.style.gap = '8px';
            btnContainer.style.width = '100%';
            btnContainer.style.height = '100%'; // Fill available height

            const btn = document.createElement('button');
            btn.textContent = field.default || '+ Додати виріб';
            btn.style.backgroundColor = l.btnBg || '#2563eb';
            btn.style.color = l.btnColor || '#fff';
            btn.style.fontSize = (l.btnFontSize || 14) + 'px';
            btn.style.padding = (l.btnPadding || 12) + 'px 20px';
            btn.style.borderRadius = (l.btnRadius || 8) + 'px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.fontWeight = '600';
            btn.style.width = '100%';
            btn.style.transition = '0.2s';

            btn.onclick = (e) => {
                e.preventDefault();
                if (window.openProductModal) window.openProductModal(field.id);
            };
            btnContainer.appendChild(btn);

            const productsContainer = document.createElement('div');
            productsContainer.id = `products_${field.id}`;
            productsContainer.style.cssText = `display:flex; flex-direction:column; gap:8px; margin-top:8px; width:100%; position:relative; z-index:100;`;
            btnContainer.appendChild(productsContainer);
            this.buttonContainers[field.id] = productsContainer;

            inputWrapper.appendChild(btnContainer);

        } else if (field.type === 'select_modal') {
            const selectContainer = document.createElement('div');
            selectContainer.style.display = 'flex';
            selectContainer.style.flexDirection = 'column';
            selectContainer.style.gap = '8px';
            selectContainer.style.width = '100%';

            const select = document.createElement('select');
            const pText = field.placeholderText || field.label || 'Виберіть...';
            const placeholder = document.createElement('option');
            placeholder.value = "placeholder";
            placeholder.textContent = pText;
            placeholder.disabled = true;
            select.appendChild(placeholder);

            const optsArr = [
                { value: 'no', label: field.labelNo || 'Ні' },
                { value: 'yes', label: field.labelYes || 'Так' }
            ];
            optsArr.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.label;
                select.appendChild(option);
            });
            applyStyleToInput(select);

            // Check if there's already a product for this field
            const existingProduct = this.addedProducts.find(p => p.buttonId === field.id);
            if (existingProduct) {
                select.value = 'yes';
            } else {
                select.value = 'placeholder';
            }
            this.state[field.id] = select.value;

            select.onchange = (e) => {
                const selectedVal = e.target.value;
                this.state[field.id] = selectedVal;
                if (selectedVal === 'yes') {
                    if (window.openProductModal) window.openProductModal(field.id);
                } else {
                    // Remove products for this field if switched to "No"
                    this.addedProducts = this.addedProducts.filter(p => p.buttonId !== field.id);
                    this.renderAddedProducts();
                    this.calculate();
                }
            };
            selectContainer.appendChild(select);

            const productsContainer = document.createElement('div');
            productsContainer.id = `products_${field.id}`;
            productsContainer.style.cssText = `display:flex; flex-direction:column; gap:8px; margin-top:8px; width:100%;`;
            selectContainer.appendChild(productsContainer);
            this.buttonContainers[field.id] = productsContainer;

            inputWrapper.appendChild(selectContainer);
            // We don't set inputElement here to avoid double listeners since we handled onchange manually
        } else if (field.type === 'checkbox_qty') {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '10px';
            row.style.width = '100%';

            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.style.width = '20px';
            chk.style.height = '20px';

            const qty = document.createElement('input');
            qty.type = 'number';
            qty.style.width = '60px';
            qty.value = 1;

            row.appendChild(chk);
            row.appendChild(qty);

            if (this.state[field.id]) {
                chk.checked = this.state[field.id].checked;
                qty.value = this.state[field.id].qty;
            } else {
                this.state[field.id] = { checked: false, qty: 1 };
            }
            const update = () => {
                this.state[field.id] = { checked: chk.checked, qty: Number(qty.value) || 0 };
                this.calculate();
            };
            chk.onchange = update;
            qty.oninput = update;

            inputWrapper.appendChild(row);
        } else if (field.type === 'select_yes_no') {
            const select = document.createElement('select');

            // Default placeholder
            const optDefault = document.createElement('option');
            optDefault.value = "";
            optDefault.textContent = "-- Виберіть --";
            optDefault.disabled = true;
            if (!field.default && field.default !== 0) {
                optDefault.selected = true;
            }
            select.appendChild(optDefault);

            const optNo = document.createElement('option');
            optNo.value = "0";
            optNo.textContent = field.labelNo || "Ні";
            select.appendChild(optNo);

            const optYes = document.createElement('option');
            optYes.value = "1";
            optYes.textContent = field.labelYes || "Так";
            select.appendChild(optYes);

            // Set Initial State
            if (this.state[field.id] !== undefined) {
                select.value = String(this.state[field.id]);
            } else {
                if (field.default === 1 || field.default === '1') {
                    select.value = "1";
                    this.state[field.id] = 1;
                } else if (field.default === 0 || field.default === '0') {
                    select.value = "0";
                    this.state[field.id] = 0;
                } else {
                    // No default set, so it stays on placeholder
                    select.value = "";
                    this.state[field.id] = 0; // Default to 0 points if nothing selected
                }
            }

            // Important: Handle change to update state
            select.onchange = (e) => {
                this.state[field.id] = Number(e.target.value) || 0;
                this.calculate();
            };

            applyStyleToInput(select);
            inputElement = null; // We handled onchange manually
            inputWrapper.appendChild(select);

        } else if (field.type === 'multiselect') {
            const list = document.createElement('div');
            list.style.cssText = 'display:flex; flex-direction:column; gap:6px; margin-top:5px; width:100%';

            // Ensure state is array
            if (!Array.isArray(this.state[field.id])) {
                this.state[field.id] = [];
            }

            (field.options || []).forEach(opt => {
                const item = document.createElement('label');
                item.style.cssText = 'display:flex; align-items:center; gap:10px; cursor:pointer; font-size:14px; padding:4px 0; color:inherit;';

                const chk = document.createElement('input');
                chk.type = 'checkbox';
                chk.value = opt.value;
                chk.style.width = '18px';
                chk.style.height = '18px';
                chk.style.accentColor = '#2563eb';
                chk.checked = this.state[field.id].includes(opt.value);

                chk.onchange = (e) => {
                    if (e.target.checked) {
                        if (!this.state[field.id].includes(opt.value)) this.state[field.id].push(opt.value);
                    } else {
                        this.state[field.id] = this.state[field.id].filter(v => v !== opt.value);
                    }
                    this.calculate();
                };

                const span = document.createElement('span');
                span.textContent = opt.label;

                item.appendChild(chk);
                item.appendChild(span);
                list.appendChild(item);
            });

            inputElement = null; // Handled manually
            inputWrapper.appendChild(list);

        } else if (field.type === 'number') {
            const numContainer = document.createElement('div');
            numContainer.style.cssText = 'display:flex; align-items:center; width:100%; border:1px solid rgba(255,255,255,0.15); border-radius:8px; overflow:hidden; background:rgba(255,255,255,0.05); position:relative;';
            
            // Light theme support
            if (document.body.classList.contains('light-theme') || (Schema.layout && Schema.layout.theme === 'light')) {
                numContainer.style.borderColor = '#d1d5db';
                numContainer.style.background = '#ffffff';
            }

            const isComputed = !!field.formula || !!field.readOnly;
            const step = field.step || (field.allowDecimal ? 0.1 : 1);

            const btnMinus = document.createElement('button');
            btnMinus.type = 'button';
            btnMinus.textContent = '−';
            btnMinus.style.cssText = 'width:38px; height:38px; border:none; background:rgba(120,120,120,0.12); color:inherit; font-size:18px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; user-select:none; transition:0.2s; flex-shrink:0;';

            const input = document.createElement('input');
            input.id = 'input_' + field.id;
            input.type = 'number';
            input.min = 0;
            input.step = step;
            input.style.cssText = 'flex:1; width:100%; min-width:0; text-align:center; border:none; background:transparent; color:inherit; font-size:15px; font-weight:700; padding:8px 4px; outline:none; -moz-appearance:textfield;';
            if (l.placeholder) input.placeholder = l.placeholder;

            if (isComputed) {
                input.readOnly = true;
                input.style.cursor = 'default';
                numContainer.style.background = '#f8fafc';
                numContainer.style.border = '1.5px dashed #94a3b8';
                btnMinus.style.display = 'none';
            }

            const btnPlus = document.createElement('button');
            btnPlus.type = 'button';
            btnPlus.textContent = '+';
            btnPlus.style.cssText = 'width:38px; height:38px; border:none; background:rgba(120,120,120,0.12); color:inherit; font-size:18px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; user-select:none; transition:0.2s; flex-shrink:0;';
            if (isComputed) {
                btnPlus.style.display = 'none';
            }

            if (this.state[field.id] !== undefined) {
                input.value = this.state[field.id] !== '' ? this.state[field.id] : '';
            } else {
                input.value = (field.default !== undefined && field.default !== '') ? field.default : '';
                this.state[field.id] = input.value !== '' ? (Number(input.value) || 0) : 0;
            }

            const updateVal = (newVal) => {
                let val = Math.max(0, Number(newVal) || 0);
                if (field.allowDecimal) {
                    val = Math.round(val * 100) / 100;
                } else {
                    val = Math.round(val);
                }
                input.value = val === 0 && !field.default ? '' : val;
                this.state[field.id] = val;
                this.calculate();
            };

            btnMinus.onmouseover = () => btnMinus.style.background = 'rgba(120,120,120,0.25)';
            btnMinus.onmouseout = () => btnMinus.style.background = 'rgba(120,120,120,0.12)';
            btnMinus.onclick = (e) => {
                e.preventDefault();
                let current = Number(input.value) || 0;
                updateVal(Math.max(0, current - step));
            };

            btnPlus.onmouseover = () => btnPlus.style.background = 'rgba(120,120,120,0.25)';
            btnPlus.onmouseout = () => btnPlus.style.background = 'rgba(120,120,120,0.12)';
            btnPlus.onclick = (e) => {
                e.preventDefault();
                let current = Number(input.value) || 0;
                updateVal(current + step);
            };

            input.addEventListener('input', (e) => {
                let raw = String(e.target.value).replace(',', '.');
                let val = Math.max(0, Number(raw) || 0);
                this.state[field.id] = val;
                this.calculate();
            });

            numContainer.appendChild(btnMinus);
            numContainer.appendChild(input);
            numContainer.appendChild(btnPlus);

            if (isComputed) {
                const autoBadge = document.createElement('span');
                autoBadge.style.cssText = 'position:absolute; right:8px; font-size:11px; font-weight:700; color:#3b82f6; background:#eff6ff; padding:2px 6px; border-radius:4px; pointer-events:none;';
                autoBadge.textContent = 'авто';
                numContainer.appendChild(autoBadge);
            }

            inputWrapper.appendChild(numContainer);
            inputElement = null; // Handled manually

        } else {
            const input = document.createElement('input');
            input.type = 'text';
            if (this.state[field.id] !== undefined) {
                input.value = this.state[field.id];
            } else {
                input.value = field.default || '';
                this.state[field.id] = input.value;
            }
            applyStyleToInput(input);
            inputElement = input;
            inputWrapper.appendChild(inputElement);
        }

        // Generic Event Listener (for simple inputs)
        if (inputElement) {
            const handleEvent = (e) => {
                let val = e.target.value;
                if (field.type === 'checkbox') val = e.target.checked ? 1 : 0;
                this.state[field.id] = val;
                this.calculate();
            };
            inputElement.addEventListener('input', handleEvent);
            inputElement.addEventListener('change', handleEvent);
        }

        wrapper.appendChild(inputContainer);
        return wrapper;
    },

    // --- PRODUCT MANAGEMENT ---
    addProduct(buttonId, data, existingId = null) {
        const productPoints = this.calculateProductPoints(data, buttonId);

        // Generate name from custom name field, first select field, or use button default
        let name = "Виріб";
        if (data.mf_custom_name) {
            name = data.mf_custom_name;
        } else {
            const button = Schema.fields.find(f => f.id === buttonId);
            if (button && button.modalFields) {
                const firstSelect = button.modalFields.find(f => f.type === 'select');
                if (firstSelect && data[firstSelect.id]) {
                    const opt = firstSelect.options.find(o => o.value === data[firstSelect.id]);
                    if (opt) name = opt.label;
                } else {
                    name = button.default || button.label || "Виріб";
                }
            }
        }

        if (existingId) {
            const index = this.addedProducts.findIndex(p => p.id === existingId);
            if (index !== -1) {
                this.addedProducts[index].name = name;
                this.addedProducts[index].data = data;
                this.addedProducts[index].points = productPoints;
                this.addedProducts[index].buttonId = buttonId;
            }
        } else {
            this.addedProducts.push({
                id: Date.now(),
                name: name,
                data: data,
                points: productPoints,
                buttonId: buttonId
            });
        }

        this.renderAddedProducts();
        this.calculate();
    },

    updateProduct(id, data) {
        const prod = this.addedProducts.find(p => p.id === id);
        if (prod) {
            const productPoints = this.calculateProductPoints(data, prod.buttonId);

            // Update name from custom name field or first select field
            const button = Schema.fields.find(f => f.id === prod.buttonId);
            if (data.mf_custom_name) {
                prod.name = data.mf_custom_name;
            } else if (button && button.modalFields) {
                const firstSelect = button.modalFields.find(f => f.type === 'select');
                if (firstSelect && data[firstSelect.id]) {
                    const opt = firstSelect.options.find(o => o.value === data[firstSelect.id]);
                    if (opt) prod.name = opt.label;
                }
            }

            prod.data = data;
            prod.points = productPoints;
            this.renderAddedProducts();
            this.calculate();
        }
    },

    editProduct(id) {
        const prod = this.addedProducts.find(p => p.id === id);
        if (prod && window.openProductModal) {
            window.openProductModal(prod.buttonId, prod);  // Pass buttonId to open correct modal
        }
    },

    removeProduct(index) {
        if (index >= 0 && index < this.addedProducts.length) {
            this.addedProducts.splice(index, 1);
            this.renderAddedProducts();
            this.calculate();
        }
    },

    renderAddedProducts() {
        // Clear all button containers first
        Object.keys(this.buttonContainers).forEach(buttonId => {
            const container = this.buttonContainers[buttonId];
            if (container) {
                container.innerHTML = '';
            }
        });

        if (this.addedProducts.length === 0) return;

        // Group products by buttonId
        const productsByButton = {};
        this.addedProducts.forEach((prod, index) => {
            if (!prod.buttonId) return;
            if (!productsByButton[prod.buttonId]) {
                productsByButton[prod.buttonId] = [];
            }
            productsByButton[prod.buttonId].push({ prod, index });
        });

        // Render products under their respective buttons
        Object.keys(productsByButton).forEach(buttonId => {
            const container = this.buttonContainers[buttonId];
            if (!container) return;

            productsByButton[buttonId].forEach(({ prod, index }) => {
                const el = document.createElement('div');
                el.className = 'product-item';
                const buttonField = Schema.fields.find(f => f.id === buttonId);
                const bl = buttonField?.layout || {};

                el.innerHTML = '';
                el.style.cssText = `
                    background: ${bl.prodBg || 'white'}; 
                    padding: 12px 15px; 
                    margin-bottom: 8px; 
                    border-radius: 12px;
                    border: 1px solid #e5e7eb; 
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                    display: flex; 
                    flex-direction: column; 
                    gap: 8px; 
                    position: relative;
                    animation: slideIn 0.3s ease-out; 
                    transition: 0.2s;
                    width: ${bl.prodWidth || '100%'};
                    z-index: 101;
                `;

                // Calculate total cost including category sums
                let totalCost = 0;
                if (prod.points._catSums) {
                    Object.values(prod.points._catSums).forEach(v => totalCost += v);
                } else {
                    Schema.processes.forEach(proc => { totalCost += (prod.points[proc.id] || 0); });
                }
                totalCost = Math.round(totalCost);

                // Generate Summary Chips
                const summary = this.getProductSummary(prod.data, prod.buttonId);
                const chipsHtml = summary.map(s => `<span style="background:#f3f4f6; color:#4b5563; padding:2px 8px; border-radius:999px; font-size:11px; font-weight:500;">${s}</span>`).join('');

                el.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                            <div style="font-weight:700; font-size:14px; color:#111827;">${prod.name}</div>
                            <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">${chipsHtml}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-weight:800; color:#2563eb; font-size:15px;">${totalCost} ViPoint</div>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #f3f4f6; padding-top:8px; margin-top:4px;">
                        <button onclick="Engine.editProduct(${prod.id})" style="background:none; border:none; color:#2563eb; font-size:12px; font-weight:600; cursor:pointer; padding:4px 8px; border-radius:4px;">✏️ Редагувати</button>
                        <button onclick="Engine.removeProduct(${index})" style="background:none; border:none; color:#ef4444; font-size:12px; font-weight:600; cursor:pointer; padding:4px 8px; border-radius:4px;">🗑️ Видалити</button>
                    </div>
                `;
                container.appendChild(el);
            });
        });
    },

    getProductSummary(data, buttonId) {
        const summary = [];
        if (!buttonId) return summary;

        const button = Schema.fields.find(f => f.id === buttonId);
        if (!button || !button.modalFields) return summary;

        button.modalFields.forEach(field => {
            const val = data[field.id];
            if (!val && val !== 0 && val !== false) return;

            if (field.type === 'select') {
                const opt = field.options?.find(o => o.value === val);
                if (opt && val !== 'none' && val !== '0' && val !== '') summary.push(opt.label);
            } else if (field.type === 'checkbox') {
                if (val === true || val === 1) summary.push(field.label);
            } else if (field.type === 'checkbox_qty' && val && val.checked) {
                summary.push(`${field.label} (${val.qty})`);
            } else if (field.type === 'number' && val > 0) {
                summary.push(`${field.label}: ${val}`);
            } else if ((field.type === 'multiselect' || field.type === 'multiselect_qty') && Array.isArray(val) && val.length > 0) {
                const isQty = field.type === 'multiselect_qty';
                const labels = val.map(v => {
                    const optVal = isQty ? v.value : v;
                    const optQty = isQty ? v.qty : null;
                    const opt = field.options?.find(o => o.value === optVal);
                    const label = opt ? opt.label : optVal;
                    return isQty ? `${label} (${optQty})` : label;
                }).filter(Boolean);
                if (labels.length > 0) summary.push(labels.join(', '));
            }
        });

        // Add multiplier to summary if > 1
        const multField = button.modalFields.find(mf => mf.isMultiplier);
        if (multField && data[multField.id] && Number(data[multField.id]) > 1) {
            summary.push(`${multField.label}: ${data[multField.id]}`);
        }

        return summary;
    },

    calculateProductPoints(data, buttonId) {
        const points = {};
        Schema.processes.forEach(p => points[p.id] = 0);
        if (!buttonId) return points;

        const button = Schema.fields.find(f => f.id === buttonId);
        if (!button || !button.modalFields) return points;

        // Pass 1: Individual processes
        const catSums = {};
        Object.keys(Schema.categories).forEach(c => catSums[c] = 0);

        Object.keys(data).forEach(fieldId => {
            const val = data[fieldId];
            const mf = button.modalFields.find(f => f.id === fieldId);
            const ruleKey = `${buttonId}_${fieldId}`;
            const ruleSet = Schema.modalFieldRules?.[ruleKey] || Schema.rules[fieldId];
            if (!mf || !ruleSet) return;

            if (mf.type === 'select' || mf.type === 'multiselect' || mf.type === 'multiselect_qty') {
                const isMultQty = mf.type === 'multiselect_qty';
                const values = (mf.type === 'multiselect' || isMultQty) ? (Array.isArray(val) ? val : []) : [val];
                values.forEach(v => {
                    const optVal = isMultQty ? v.value : v;
                    const optQty = isMultQty ? (Number(v.qty) || 1) : null;
                    const active = ruleSet[optVal];
                    if (active) this.applyPoints(active, points, optQty, catSums, mf);
                });
            } else {
                let qty = val;
                if (mf.type === 'checkbox_qty') qty = val?.qty || 0;
                else if (mf.type === 'checkbox') qty = val ? 1 : 0;
                this.applyPoints(ruleSet, points, qty, catSums, mf);
            }
        });

        // Pass 2: Modal Field Totals (Override)
        Object.keys(data).forEach(fieldId => {
            const val = data[fieldId];
            const mf = button.modalFields.find(f => f.id === fieldId);
            const ruleKey = `${buttonId}_${fieldId}`; // Corrected from `${buttonId}_fieldId`
            const ruleSet = Schema.modalFieldRules?.[ruleKey]; // Corrected from `${buttonId}_${fieldId}`
            if (!mf || !ruleSet) return;

            const isMultQty = mf.type === 'multiselect_qty';
            const values = (mf.type === 'multiselect' || isMultQty) ? (Array.isArray(val) ? val : []) : [val];

            values.forEach(v => {
                const optVal = isMultQty ? v.value : v;
                const optQty = isMultQty ? (Number(v.qty) || 1) : (mf.type === 'checkbox_qty' ? val?.qty : v);
                const targetRules = (mf.type === 'select' || mf.type === 'multiselect' || isMultQty) ? ruleSet[optVal] : ruleSet;
                if (!targetRules) return;

                Object.keys(Schema.categories).forEach(cid => {
                    const formula = targetRules[`_total_${cid}`];
                    if (!formula) return;

                    // Calculate current sum for this field/category
                    const tempSums = {};
                    Object.keys(Schema.categories).forEach(c => tempSums[c] = 0);
                    this.applyPoints(targetRules, null, optQty, tempSums, mf);
                    const currentSum = tempSums[cid] || 0;

                    let finalVal = 0;
                    if (String(formula).startsWith('=')) {
                        finalVal = this.evaluateFormulaExtended(formula, optQty, { '@sum': currentSum });
                    } else if (!isNaN(formula)) {
                        finalVal = currentSum + Number(formula);
                    }

                    catSums[cid] += (finalVal - currentSum);
                });
            });
        });

        // Apply overall multiplier if exists
        const multField = button.modalFields.find(mf => mf.isMultiplier);
        const multiplier = multField ? (Number(data[multField.id]) || 1) : 1;
        
        if (multiplier !== 1) {
            Object.keys(catSums).forEach(cid => {
                catSums[cid] *= multiplier;
            });
            Object.keys(points).forEach(pid => {
                if (pid.startsWith('_')) return;
                points[pid] *= multiplier;
            });
        }

        // We return an object that allows renderResults to see the per-category contribution
        // To keep the card total simple, we map catSums back to a single number for the card helper
        points._catSums = catSums;
        return points;
    },

    // --- CONDITIONAL VISIBILITY (DEPENDS ON) ---
    updateConditionalVisibility() {
        if (!Schema || !Schema.fields) return;

        Schema.fields.forEach(f => {
            if (!f.dependsOn || !f.dependsOn.field) return;

            const wrapper = document.getElementById('field_wrapper_' + f.id);
            if (!wrapper) return;

            const parentVal = this.state[f.dependsOn.field];
            const allowed = Array.isArray(f.dependsOn.values)
                ? f.dependsOn.values
                : (f.dependsOn.value !== undefined ? [f.dependsOn.value] : []);

            const isVisible = allowed.map(String).includes(String(parentVal));

            if (isVisible) {
                wrapper.classList.remove('hidden');
                wrapper.style.removeProperty('display');
            } else {
                wrapper.classList.add('hidden');
                wrapper.style.setProperty('display', 'none', 'important');
                if (this.state[f.id] !== 0 && this.state[f.id] !== '') {
                    this.state[f.id] = (f.type === 'number') ? 0 : '';
                    const inp = document.getElementById('input_' + f.id);
                    if (inp) inp.value = '';
                }
            }
        });
    },

    // --- COMPUTED / FORMULA FIELDS ---
    evaluateComputedFields() {
        if (!Schema || !Schema.fields) return;

        Schema.fields.forEach(f => {
            if (!f.formula) return;

            let expr = String(f.formula).trim();
            if (expr.startsWith('=')) expr = expr.substring(1).trim();

            // Replace field IDs (e.g. f_corpus_width) with their values from this.state
            expr = expr.replace(/\b(f_[a-zA-Z0-9_]+)\b/g, (match, fId) => {
                const val = this.state[fId];
                return (Number(val) || 0);
            });

            try {
                expr = expr.replace(/min\(/g, 'Math.min(').replace(/max\(/g, 'Math.max(');
                expr = expr.replace(/ceil\(/g, 'Math.ceil(').replace(/floor\(/g, 'Math.floor(').replace(/round\(/g, 'Math.round(');
                const res = new Function(`return (${expr})`)();
                let finalVal = (isNaN(res) || !isFinite(res)) ? 0 : Number(res);

                if (f.allowDecimal) {
                    finalVal = Math.round(finalVal * 100) / 100;
                } else {
                    finalVal = Math.round(finalVal);
                }

                this.state[f.id] = finalVal;

                // Sync DOM input if rendered
                const inputEl = document.getElementById('input_' + f.id);
                if (inputEl) {
                    inputEl.value = (finalVal === 0 && !f.default) ? '' : finalVal;
                }
            } catch (e) {
                console.warn(`Formula evaluation error for ${f.id}:`, e);
            }
        });
    },

    // --- CALCULATION KERNEL ---
    calculate() {
        this.detailedMatrix = {}; // Reset details
        const points = {};
        Schema.processes.forEach(p => points[p.id] = 0);

        // Variables for Pass 2
        const catSums = {};
        Object.keys(Schema.categories || {}).forEach(cid => catSums[cid] = 0);

        // PASS -1: Update Conditional Visibility of fields based on dependsOn
        this.updateConditionalVisibility();

        // PASS 0: Evaluate Computed Form Fields (e.g. Area = Width * Height)
        this.evaluateComputedFields();

        // PASS 1: Raw Processes and Simple Rules
        this.processPass1(points, catSums);

        // Update catSums from products (Correct pass-by-pass)
        this.addedProducts.forEach(prod => {
            if (prod.points._catSums) {
                Object.keys(prod.points._catSums).forEach(cid => {
                    const val = (prod.points._catSums[cid] || 0);
                    catSums[cid] += val;

                    // Detail Matrix for Product
                    const key = 'prod_' + prod.id;
                    if (!this.detailedMatrix[key]) {
                        // Find button to get group info? 
                        // We will map it later using Schema.fields
                        this.detailedMatrix[key] = { label: prod.name, values: {}, isProduct: true, buttonId: prod.buttonId };
                    }
                    if (!this.detailedMatrix[key].values[cid]) this.detailedMatrix[key].values[cid] = 0;
                    this.detailedMatrix[key].values[cid] += val;
                });
            } else {
                Object.keys(prod.points).forEach(pId => {
                    const proc = Schema.processes.find(px => px.id === pId);
                    if (proc && proc.category) {
                        const val = (prod.points[pId] || 0);
                        catSums[proc.category] += val;

                        // Detail Matrix for Product
                        const key = 'prod_' + prod.id;
                        if (!this.detailedMatrix[key]) {
                            this.detailedMatrix[key] = { label: prod.name, values: {}, isProduct: true, buttonId: prod.buttonId };
                        }
                        if (!this.detailedMatrix[key].values[proc.category]) this.detailedMatrix[key].values[proc.category] = 0;
                        this.detailedMatrix[key].values[proc.category] += val;
                    }
                });
            }
        });

        // PASS 2: Category Total Formulas (Override sums if formula exists)
        this.processPass2(points, catSums);

        // --- MARKUP LOGIC (PASS 3) ---
        const originalCatSums = { ...catSums };

        if (Schema.meta && Schema.meta.markup) {
            Object.keys(Schema.categories).forEach(cid => {
                const markupPercent = Schema.meta.markup[cid] || 0;
                if (markupPercent > 0) {
                    const original = catSums[cid] || 0;
                    catSums[cid] = original * (1 + markupPercent / 100);
                }
            });
        }

        this.renderResults(points, catSums, originalCatSums);
    },

    processPass1(points, catSums) {
        // Main Form - ONLY process fields that are currently in state (rendered)
        Object.keys(this.state).forEach(fId => {
            const val = this.state[fId];
            const ruleSet = Schema.rules[fId];
            const fDef = this.getFieldDef(fId);
            if (!fDef || !ruleSet) return;

            if (fDef.type === 'select') {
                const active = ruleSet[val];
                if (active) this.applyPoints(active, points, null, catSums, fDef);
            } else if (fDef.type === 'number' || fDef.type === 'checkbox' || fDef.type === 'select_yes_no') {
                // Apply Math.ceil() for decimal fields only if roundUp is explicitly set
                let processedVal = val;
                if (fDef.type === 'number' && fDef.allowDecimal) {
                    processedVal = fDef.roundUp ? Math.ceil(Number(val) || 0) : (Number(val) || 0);
                }
                this.applyPoints(ruleSet, points, processedVal, catSums, fDef);
            } else if (fDef.type === 'checkbox_qty') {
                if (val && val.checked) this.applyPoints(ruleSet, points, val.qty, catSums, fDef);
            } else if (fDef.type === 'multiselect') {
                if (Array.isArray(val)) {
                    val.forEach(v => {
                        const active = ruleSet[v];
                        if (active) this.applyPoints(active, points, null, catSums, fDef);
                    });
                }
            }
        });
    },

    processPass2(points, catSums) {
        const globalVars = this.getCategoryVars(catSums);

        // Final adjustments will be applied to the global catSums
        const adjustments = {};
        Object.keys(Schema.categories || {}).forEach(cid => adjustments[cid] = 0);

        Object.keys(this.state).forEach(fId => {
            const fVal = this.state[fId];
            const fDef = this.getFieldDef(fId);
            const ruleSet = Schema.rules[fId];
            if (!fDef || !ruleSet) return;

            let ruleObjects = [];
            if (fDef.type === 'multiselect') {
                if (Array.isArray(fVal)) ruleObjects = fVal.map(v => ruleSet[v]).filter(Boolean);
            } else if (fDef.type === 'select') {
                if (ruleSet[fVal]) ruleObjects = [ruleSet[fVal]];
            } else {
                ruleObjects = [ruleSet];
            }

            ruleObjects.forEach(targetRules => {
                Object.keys(Schema.categories).forEach(cid => {
                    const valInSigma = targetRules[`_total_${cid}`];
                    if (!valInSigma) return;

                    // 1. Calculate Row Sums
                    const rowSums = {};
                    const rawSums = {};
                    Object.keys(Schema.categories).forEach(c => { rowSums[c] = 0; rawSums[c] = 0; });

                    // contextVal: For multiselect/select, the rule is active so multiplier is 1 or whatever applyPoints does?
                    // applyPoints generic logic:
                    // if fieldDef is multiselect/select, contextVal is usually null?
                    // In processPass1 for select: applyPoints(active, points, null...)
                    // But here we might need contextVal for formulas using @qty?
                    // For select/multiselect, @qty is usually 1 (it's "is selected").
                    // For number inputs, fVal is the number.

                    // Let's determine correct contextVal for this iteration
                    let contextVal = fVal;
                    if (fDef.type === 'multiselect' || fDef.type === 'select') contextVal = 1;
                    // Actually, in the original code: applyPoints(targetRules, null, fVal, rowSums, fDef);
                    // For select, fVal is the string value (e.g. "opt1"). applyPoints treats it as multiplier=1 because logic matches "if fieldDef...". 
                    // Wait, applyPoints line 1069:
                    // if (fieldDef.type === 'number'...) multiplier = Number(contextVal)
                    // if select, it falls through to val = Number(val) * 1. 

                    // So for select/multiselect, we should pass ONE (1) or the value?
                    // If I pass "opt1" to Number(), it is NaN. 
                    // applyPoints checks "if (typeof val === 'string' ... formula ...)"
                    // If generic number point: val * multiplier.

                    // Safe bet: For multiselect/select, the "quantity" of that option is 1.

                    const effectiveVal = (fDef.type === 'multiselect' || fDef.type === 'select') ? 1 : fVal;

                    this.applyPoints(targetRules, null, effectiveVal, rowSums, fDef);
                    this.applyPoints(targetRules, null, 1, rawSums, fDef);

                    const currentSum = rowSums[cid] || 0;
                    const rawSum = rawSums[cid] || 0;

                    // 2. Evaluate formula or fixed number
                    let result = 0;
                    const isZeroInput = (fDef.type === 'number' && (Number(effectiveVal) || 0) === 0) ||
                                        (fDef.type === 'select_yes_no' && (Number(effectiveVal) || 0) === 0) ||
                                        (fDef.type === 'checkbox' && !effectiveVal) ||
                                        (fDef.type === 'checkbox_qty' && (!effectiveVal || !effectiveVal.checked || !effectiveVal.qty));

                    if (isZeroInput) {
                        result = 0;
                    } else if (String(valInSigma).startsWith('=')) {
                        result = this.evaluateFormulaExtended(valInSigma, effectiveVal, {
                            ...globalVars,
                            '@sum': currentSum,
                            '@raw': rawSum
                        });
                    } else if (!isNaN(valInSigma)) {
                        result = currentSum + Number(valInSigma);
                    }

                    // Apply difference to the global total
                    const diff = result - currentSum;
                    adjustments[cid] += diff;

                    // Update Detailed Matrix (Pass 2 Adjustment)
                    if (diff !== 0) {
                        if (!this.detailedMatrix[fId]) {
                            this.detailedMatrix[fId] = { label: fDef.label, values: {} };
                        }
                        if (!this.detailedMatrix[fId].values[cid]) this.detailedMatrix[fId].values[cid] = 0;
                        this.detailedMatrix[fId].values[cid] += diff;
                    }
                });
            });
        });

        // Apply adjustments
        Object.keys(adjustments).forEach(cid => catSums[cid] += adjustments[cid]);
    },

    getCategoryVars(catSums) {
        const vars = {};
        // Map common aliases
        const aliases = {
            'cat_construction': 'konst',
            'cat_design': 'proekt',
            'cat_assembly': 'zbira',
            'cat_install': 'montaz'
        };
        Object.keys(Schema.categories || {}).forEach(cid => {
            const sum = catSums[cid] || 0;
            vars[`@sum_${cid}`] = sum;
            if (aliases[cid]) vars[`@sum_${aliases[cid]}`] = sum;
        });
        return vars;
    },

    applyPoints(rules, totalPoints, contextVal = null, catSums = null, fieldDef = null) {
        Object.keys(rules).forEach(procId => {
            if (procId.startsWith('_total_')) return;

            let val = rules[procId];
            let isOnce = false;

            if (val && typeof val === 'object' && val.v !== undefined) {
                isOnce = !!val.once;
                val = val.v;
            }

            if (typeof val === 'string' && val.startsWith('=')) {
                // BUGFIX: If field is numeric/checkbox_qty and value is 0/falsy, do NOT evaluate formula 
                // (unless it's a checkbox which might have a formula for "unchecked" state, but usually unchecked = 0)
                if (fieldDef && (fieldDef.type === 'number' || fieldDef.type === 'checkbox_qty' || fieldDef.type === 'select_yes_no')) {
                    const numericInput = Number(contextVal) || 0;
                    if (numericInput === 0) {
                        val = 0;
                    } else {
                        val = this.evaluateFormulaExtended(val, contextVal, {});
                    }
                } else if (fieldDef && fieldDef.type === 'checkbox') {
                    // Checkbox: contextVal is true/false (from processPass1 passing '1' or '0' logic?? actually processPass1 passes boolean or 1/0? 
                    // processPass1 passes "1" for checkbox true? No, let's look at processPass1. 
                    // It passes processedVal. processPass1 says: if (fDef.type === 'checkbox') ... applyPoints(..., processedVal, ...)
                    // Actually processPass1 does: if (type === 'checkbox') applyPoints(..., processedVal) where processedVal is val (checked?)
                    // Wait, processPass1: "if (fDef.type === 'checkbox') ... multiplier = contextVal ? 1 : 0".
                    // So contextVal is likely the boolean or 0/1. If 0, multiplier is 0. 
                    // But here we are inside "if string starts with =" block.

                    // If checkbox is falsy, we generally expect 0 points regardless of formula, 
                    // UNLESS the formula specifically handles false state. But usually unchecked = 0 points.
                    if (!contextVal) val = 0;
                    else val = this.evaluateFormulaExtended(val, contextVal, {});
                } else {
                    // For 'select' or 'multiselect', contextVal might be the option ID or similar, or 1?
                    // In processPass1 for SELECT, it passes null as contextVal. 
                    // So specific Select options triggering formulas will evaluate with contextVal=null (which becomes 0 in regex).
                    val = this.evaluateFormulaExtended(val, contextVal, {});
                }
            } else {
                // Determine multiplier
                let multiplier = 1;
                if (!isOnce && fieldDef) {
                    if (fieldDef.type === 'checkbox') multiplier = contextVal ? 1 : 0;
                    else if (fieldDef.type === 'number' || fieldDef.type === 'checkbox_qty' || fieldDef.type === 'select_yes_no') multiplier = Number(contextVal) || 0;
                }
                val = Number(val) * multiplier;
            }

            const numVal = Number(val) || 0;
            if (totalPoints && totalPoints[procId] !== undefined) {
                totalPoints[procId] += numVal;
            }
            if (catSums) {
                const proc = Schema.processes.find(px => px.id === procId);
                if (proc && proc.category) {
                    catSums[proc.category] += numVal;

                    // Detailed Matrix (Pass 1)
                    // Only track if it's the main accumulation phase (totalPoints is provided)
                    if (totalPoints && fieldDef && numVal !== 0) {
                        if (!this.detailedMatrix[fieldDef.id]) {
                            this.detailedMatrix[fieldDef.id] = { label: fieldDef.label, values: {} };
                        }
                        if (!this.detailedMatrix[fieldDef.id].values[proc.category]) this.detailedMatrix[fieldDef.id].values[proc.category] = 0;
                        this.detailedMatrix[fieldDef.id].values[proc.category] += numVal;
                    }
                }
            }
        });
    },

    evaluateFormulaExtended(formula, val, extraVars = {}) {
        if (!formula || typeof formula !== 'string') return 0;
        let expr = formula.trim();
        if (expr.startsWith('=')) expr = expr.substring(1).trim();
        if (!expr) return 0;

        // Clean numeric val
        let numVal = 0;
        if (val !== null && val !== undefined) {
            if (typeof val === 'number') numVal = isNaN(val) ? 0 : val;
            else if (typeof val === 'string') numVal = Number(val.replace(',', '.')) || 0;
            else if (typeof val === 'boolean') numVal = val ? 1 : 0;
        }

        // Inject val / x / @qty
        expr = expr.replace(/\bval\b/g, numVal);
        expr = expr.replace(/\bx\b/g, numVal);
        expr = expr.replace(/@qty/g, numVal);

        // Sort keys by length descending to avoid prefix replacement issues (@sum vs @sum_konst)
        const keys = Object.keys(extraVars || {}).sort((a, b) => b.length - a.length);

        keys.forEach(key => {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(escapedKey + '(?![a-zA-Z0-9_])', 'g');
            const varVal = Number(extraVars[key]) || 0;
            expr = expr.replace(re, varVal);
        });

        // Any remaining unrecognized @sum_... vars should be safely replaced with 0
        expr = expr.replace(/@[a-zA-Z0-9_]+/g, '0');

        // Math helpers
        expr = expr.replace(/min\(/g, 'Math.min(').replace(/max\(/g, 'Math.max(');
        expr = expr.replace(/ceil\(/g, 'Math.ceil(').replace(/floor\(/g, 'Math.floor(').replace(/round\(/g, 'Math.round(').replace(/abs\(/g, 'Math.abs(');

        try {
            // Use a clean scope for evaluation
            const res = new Function(`return (${expr})`)();
            return isNaN(res) || !isFinite(res) ? 0 : Number(res);
        } catch (e) {
            console.warn("Formula Evaluation Warning:", expr, e);
            return 0;
        }
    },

    renderCategoryToggles() {
        const container = document.getElementById('categorySelection');
        if (!container) return;

        container.innerHTML = `
            <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.06em; display: flex; align-items: center; gap: 8px;">
                <span style="background: #2563eb; width: 4px; height: 12px; border-radius: 2px;"></span>
                Процеси для розрахунку
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;" id="catToggleList"></div>
        `;

        const list = container.querySelector('#catToggleList');
        Object.keys(Schema.categories).forEach(cid => {
            const cat = Schema.categories[cid];
            const isActive = this.activeCategories.has(cid);

            const btn = document.createElement('button');
            btn.style.cssText = `
                padding: 7px 16px;
                border-radius: 999px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                border: 1.5px solid ${isActive ? '#2563eb' : '#e2e8f0'};
                background: ${isActive ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#ffffff'};
                color: ${isActive ? '#ffffff' : '#64748b'};
                text-decoration: ${isActive ? 'none' : 'line-through'};
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                gap: 7px;
                user-select: none;
                box-shadow: ${isActive ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none'};
            `;

            btn.innerHTML = `
                <span style="display: inline-flex; width: 15px; height: 15px; border-radius: 50%; background: ${isActive ? 'rgba(255,255,255,0.25)' : '#e2e8f0'}; align-items: center; justify-content: center; font-size: 9px; font-weight: 800;">
                    ${isActive ? '✓' : ''}
                </span>
                ${cat.name}
            `;

            btn.onclick = () => {
                if (this.activeCategories.has(cid)) {
                    this.activeCategories.delete(cid);
                } else {
                    this.activeCategories.add(cid);
                }
                this.renderCategoryToggles();
                this.calculate();
            };

            list.appendChild(btn);
        });
    },

    importState: function (doc) {
        try {
            if (!doc) return;
            console.log("📥 Importing State:", doc);

            // 1. Restore State
            if (doc.state) {
                this.state = typeof doc.state === 'string' ? JSON.parse(doc.state) : doc.state;
            }

            // 2. Restore Added Products
            if (doc.addedProducts) {
                this.addedProducts = typeof doc.addedProducts === 'string' ? JSON.parse(doc.addedProducts) : doc.addedProducts;
            } else {
                this.addedProducts = [];
            }

            // 3. Restore Categories
            if (doc.activeCategories) {
                // Convert array back to Set if needed, or handle array
                if (Array.isArray(doc.activeCategories)) {
                    this.activeCategories = new Set(doc.activeCategories);
                } else {
                    this.activeCategories = doc.activeCategories;
                }

                // Update UI toggles
                this.renderCategoryToggles();
            }

            // 4. Re-render everything
            this.renderForm();
            this.renderAddedProducts();
            this.calculate();

        } catch (err) {
            console.error("Import Error:", err);
            alert("Помилка відновлення стану: " + err.message);
        }
    },

    saveToCloud: async function () {
        console.log("🔥 saveToCloud TRIGGERED " + new Date().toISOString());

        if (!window.Auth || !window.Auth.user) {
            console.warn("User not logged in");
            window.Auth.login();
            return;
        }

        try {
            console.log("Gathering data...");

            // Open the enhanced save modal
            const modal = document.getElementById('saveModal');
            if (modal) {
                modal.style.display = 'flex';
                // Pre-fill date/time or existing title if loaded
                const titleInput = document.getElementById('saveTitle');
                if (titleInput && !titleInput.value) {
                    const now = new Date();
                    const dateStr = now.toLocaleDateString('uk-UA') + ' ' + now.toLocaleTimeString('uk-UA').slice(0, 5);
                    titleInput.value = `Проект ${dateStr}`;
                }
            } else {
                console.error("Save modal not found!");
                alert("Помилка інтерфейсу: вікно збереження не знайдено.");
            }
        } catch (e) {
            console.error("Save Error:", e);
        }
    },

    finalizeSave: function () {
        // Gather data from modal
        const title = document.getElementById('saveTitle').value || 'Без назви';
        const manager = document.getElementById('saveManager').value || '';
        const product = document.getElementById('saveProduct').value || '';
        const comment = document.getElementById('saveComment').value || '';

        // Collect State
        const total = parseInt(document.getElementById('totalScore')?.innerText.replace(/\D/g, '') || '0');
        // Helper to find name from Config List
        let bestName = 'Невідомий калькулятор';

        // 1. Try to find in CalculatorConfig (Global list)
        if (window.CalculatorConfig && window.currentConfigFile) {
            let allConfigItems = [];
            window.CalculatorConfig.forEach(c => {
                if (c.items) allConfigItems.push(...c.items);
                else allConfigItems.push(c);
            });
            const found = allConfigItems.find(c => c.file && (window.currentConfigFile.includes(c.file) || c.file.includes(window.currentConfigFile)));
            if (found && found.title) bestName = found.title;
        }

        // 2. Fallback to Schema internal titles if not found in list
        if (bestName === 'Невідомий калькулятор') {
            if (window.Schema && window.Schema.layout && window.Schema.layout.title) bestName = window.Schema.layout.title;
            else if (window.Schema && window.Schema.title) bestName = window.Schema.title;
            else if (window.Schema && window.Schema.meta && window.Schema.meta.title) bestName = window.Schema.meta.title;
        }

        const data = {
            title: title,
            totalCost: total,
            state: this.state, // Pass object directly, Auth will handle stringify if needed or Firestore supports objects
            addedProducts: this.addedProducts,
            activeCategories: Array.from(this.activeCategories),
            configPath: window.currentConfigFile, // Save which config was used

            // New Metadata
            metadata: {
                manager: manager,
                productName: product,
                comment: comment,
                calcName: bestName,
                calcVersion: (window.Schema && window.Schema.layout && window.Schema.layout.version)
                    ? window.Schema.layout.version
                    : (window.Schema && window.Schema.meta && window.Schema.meta.version)
                        ? window.Schema.meta.version
                        : (window.Schema && window.Schema.version) ? window.Schema.version : 'v1'
            }
        };

        // Call Auth
        window.Auth.saveCalculation(data).then(() => {
            document.getElementById('saveModal').style.display = 'none';
            // alert("✅ Розрахунок успішно збережено!");
        }).catch(error => {
            console.error("Save Crash:", error);
            alert("Помилка збереження: " + error.message);
        });
    },

    // Global helper for close button
    closeSaveModal: function () {
        const modal = document.getElementById('saveModal');
        if (modal) modal.style.display = 'none';
    },

    renderResults(points, catSums, originalCatSums = null) {
        // Render to UI
        let grandTotal = 0;
        const catColors = {
            'cat_construction': '#0284c7', // Sky Blue
            'cat_design': '#7c3aed',       // Violet/Purple
            'cat_installation': '#16a34a', // Emerald
            'cat_assembly': '#d97706'      // Amber
        };

        const resultsPanel = document.getElementById('resultsContainer') || document.getElementById('resultsPanel');
        if (resultsPanel) resultsPanel.innerHTML = '';
        Object.keys(Schema.categories).forEach(cid => {
            const isActive = this.activeCategories.has(cid);
            const sum = Math.round(catSums[cid] || 0); // Final Sum (with Markup)
            if (isActive) grandTotal += sum;

            const dotColor = catColors[cid] || '#3b82f6';

            let markupHtml = '';
            // Only show markup info if there is a markup and potential for points
            if (originalCatSums && Schema.meta && Schema.meta.markup) {
                const markup = Schema.meta.markup[cid] || 0;
                if (markup > 0 && originalCatSums[cid] > 0) {
                    const orig = Math.round(originalCatSums[cid]);
                    markupHtml = `<div style="font-size:11px; color:#94a3b8; text-align:right; margin-top:2px;">
                        Базовий: ${orig.toLocaleString()} (+${markup}%)
                     </div>`;
                }
            }

            const row = document.createElement('div');
            row.style.cssText = `
                display: flex; 
                justify-content: space-between; 
                align-items: center;
                margin-bottom: 8px; 
                font-size: 13.5px;
                padding: 7px 10px;
                border-radius: 8px;
                background: ${isActive ? '#f8fafc' : 'transparent'};
                transition: 0.2s ease;
                opacity: ${isActive ? '1' : '0.35'};
                filter: ${isActive ? 'none' : 'grayscale(1)'};
                text-decoration: ${isActive ? 'none' : 'line-through'};
            `;

            row.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="width:8px; height:8px; border-radius:50%; background:${isActive ? dotColor : '#cbd5e1'}; flex-shrink:0;"></span>
                    <span style="font-weight:600; color:#334155;">${Schema.categories[cid].name}</span>
                </div>
                <div style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span style="font-weight:700; color:${isActive ? '#0f172a' : '#94a3b8'}; font-size:14px;">${sum.toLocaleString()} <span style="font-size:11px; font-weight:600; color:#64748b">ViPoint</span></span>
                    ${markupHtml}
                </div>
            `;
            if (resultsPanel) resultsPanel.appendChild(row);
        });

        const totalScoreEl = document.getElementById('totalScore');
        if (totalScoreEl) totalScoreEl.innerText = `${Math.round(grandTotal).toLocaleString()} ViPoint`;

        // Render Action Buttons (Details + PDF + Reset + Save)
        const scoreCard = document.querySelector('.results-score-card') || totalScoreEl?.parentElement;
        const resultsPanelEl = document.querySelector('.results-panel');

        if (scoreCard) {
            let btnContainer = document.getElementById('resBtnContainer');
            if (!btnContainer) {
                btnContainer = document.createElement('div');
                btnContainer.id = 'resBtnContainer';
                btnContainer.style.cssText = 'display:flex; gap:8px; margin-top:14px; margin-bottom:12px;';
                scoreCard.parentElement.insertBefore(btnContainer, scoreCard.nextSibling);
            }

            // Details Button
            if (!document.getElementById('detailsBtn')) {
                const btn = document.createElement('button');
                btn.id = 'detailsBtn';
                btn.innerText = '📋 Деталі';
                btn.style.cssText = `
                    flex: 1;
                    padding: 9px 8px;
                    background: #ffffff;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 10px;
                    color: #475569;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                `;
                btn.onmouseover = () => { btn.style.borderColor = '#93c5fd'; btn.style.color = '#2563eb'; btn.style.background = '#eff6ff'; };
                btn.onmouseout = () => { btn.style.borderColor = '#e2e8f0'; btn.style.color = '#475569'; btn.style.background = '#ffffff'; };
                btn.onclick = () => this.showProcessDetails(points, catSums, originalCatSums);
                btnContainer.appendChild(btn);
            } else {
                document.getElementById('detailsBtn').onclick = () => this.showProcessDetails(points, catSums, originalCatSums);
            }

            // PDF Button
            if (!document.getElementById('pdfBtn')) {
                const btn = document.createElement('button');
                btn.id = 'pdfBtn';
                btn.innerText = '📄 PDF';
                btn.style.cssText = `
                    flex: 1;
                    padding: 9px 8px;
                    background: #ffffff;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 10px;
                    color: #475569;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                `;
                btn.onmouseover = () => { btn.style.borderColor = '#fca5a5'; btn.style.color = '#dc2626'; btn.style.background = '#fef2f2'; };
                btn.onmouseout = () => { btn.style.borderColor = '#e2e8f0'; btn.style.color = '#475569'; btn.style.background = '#ffffff'; };
                btn.onclick = () => this.generatePDF(points, catSums, originalCatSums);
                btnContainer.appendChild(btn);
            } else {
                document.getElementById('pdfBtn').onclick = () => this.generatePDF(points, catSums, originalCatSums);
            }

            // Reset Button
            if (!document.getElementById('resetFormBtn')) {
                const btn = document.createElement('button');
                btn.id = 'resetFormBtn';
                btn.innerText = '🔄 Скинути';
                btn.title = 'Очистити всі поля форми';
                btn.style.cssText = `
                    flex: 1;
                    padding: 9px 8px;
                    background: #ffffff;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 10px;
                    color: #475569;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                `;
                btn.onmouseover = () => { btn.style.borderColor = '#cbd5e1'; btn.style.color = '#0f172a'; btn.style.background = '#f1f5f9'; };
                btn.onmouseout = () => { btn.style.borderColor = '#e2e8f0'; btn.style.color = '#475569'; btn.style.background = '#ffffff'; };
                btn.onclick = () => this.resetForm();
                btnContainer.appendChild(btn);
            } else {
                document.getElementById('resetFormBtn').onclick = () => this.resetForm();
            }
        }

        // Inject Save Button
        if (resultsPanelEl && !document.getElementById('btnSaveCloud')) {
            const btn = document.createElement('button');
            btn.id = 'btnSaveCloud';
            btn.innerHTML = '💾 Зберегти розрахунок';
            btn.style.cssText = `
                display: block;
                width: 100%;
                margin-top: 14px;
                padding: 12px 16px;
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: #ffffff;
                border: none;
                border-radius: 12px;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
                transition: all 0.2s ease;
            `;
            btn.onmouseover = () => { btn.style.transform = 'translateY(-1px)'; btn.style.boxShadow = '0 6px 18px rgba(37, 99, 235, 0.35)'; };
            btn.onmouseout = () => { btn.style.transform = 'translateY(0)'; btn.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.25)'; };
            btn.onclick = () => {
                this.saveToCloud();
            };

            const btnContainer = document.getElementById('resBtnContainer');
            if (btnContainer && btnContainer.nextSibling) {
                resultsPanelEl.insertBefore(btn, btnContainer.nextSibling);
            } else {
                resultsPanelEl.appendChild(btn);
            }
        }
    },

    resetForm() {
        if (!confirm("Очистити всі введені дані та скинути калькулятор?")) return;
        this.state = {};
        this.addedProducts = [];
        this.renderForm();
        this.calculate();
    },

    async generatePDF(points, catSums, originalCatSums) {
        if (!window.jspdf) {
            alert('Бібліотека PDF ще не завантажилась. Спробуйте через секунду.');
            return;
        }

        const clientName = prompt("Введіть ім'я клієнта для КП:", "Клієнт");
        if (clientName === null) return; // Users cancelled

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load Roboto Font for Cyrillic
        try {
            document.body.style.cursor = 'wait';
            // Using a reliable CDN for Roboto Regular
            const fontUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf';
            const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());

            // Add font to VFS
            doc.addFileToVFS('Roboto-Regular.ttf', btoa(new Uint8Array(fontBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')));
            doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
            doc.setFont('Roboto');
        } catch (e) {
            console.error('Font load error:', e);
            alert('Не вдалося завантажити шрифт для кирилиці. PDF може бути некоректним (спробуйте ще раз).');
        } finally {
            document.body.style.cursor = 'default';
        }

        // --- PDF CONTENT ---

        // Header
        doc.setFontSize(22);
        doc.setTextColor(37, 99, 235); // Blue
        const title = (Schema.meta && Schema.meta.title) ? Schema.meta.title : 'Viyar Calculator';
        doc.text(title, 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Дата: ${new Date().toLocaleDateString()}`, 14, 26);

        // Info Box
        doc.setDrawColor(226, 232, 240);
        doc.setFillColor(248, 250, 252);
        doc.rect(14, 32, 182, 24, 'FD');

        doc.setFontSize(10);
        doc.setTextColor(51);
        doc.text(`👤 Клієнт: ${clientName}`, 18, 41);
        doc.text(`📑 Проект: ${document.getElementById('saveTitle')?.value || 'Новий проект'}`, 18, 48);

        // Prepare Columns (Process Categories)
        const columns = [{ header: 'Поле / Процес', dataKey: 'label' }];
        const colIds = Object.keys(Schema.categories);
        colIds.forEach(cid => {
            columns.push({ header: Schema.categories[cid].name.toUpperCase(), dataKey: cid, halign: 'right' });
        });

        // Prepare Rows
        const rows = [];
        const grandTotals = {};
        colIds.forEach(cid => grandTotals[cid] = 0);
        let finalGrandTotal = 0;

        const fmt = (val) => {
            if (!val) return '-';
            // USER REQUEST: Show points WITHOUT correction coefficient
            return Math.round(val).toLocaleString();
        };

        // Helper to check markup
        const getMarkup = (cid) => (Schema.meta && Schema.meta.markup) ? (Schema.meta.markup[cid] || 0) : 0;

        // Iterate Groups
        if (this.detailedMatrix) {
            // Keep track of processed items to handle ungrouped later
            const processedKeys = new Set();

            Schema.groups.forEach(group => {
                const groupRows = [];
                const groupTotals = {};
                colIds.forEach(c => groupTotals[c] = 0);
                let groupHasData = false;

                // Find fields for this group
                const groupFields = Schema.fields.filter(f => f.groupId === group.id);

                const processField = (fieldDef, isNested = false) => {
                    const fieldId = fieldDef.id;

                    // 1. Standard Field
                    const data = this.detailedMatrix[fieldId];
                    if (data) {
                        processedKeys.add(fieldId);
                        const hasVal = colIds.some(cid => data.values[cid]);
                        if (hasVal) {
                            groupHasData = true;
                            const row = { label: isNested ? `  ${data.label}` : data.label };
                            colIds.forEach(cid => {
                                const val = data.values[cid] || 0;
                                groupTotals[cid] += val;
                                row[cid] = fmt(val, getMarkup(cid));
                            });
                            groupRows.push(row);
                        }
                    }

                    // 2. Linked Products
                    const productKeys = Object.keys(this.detailedMatrix).filter(k =>
                        this.detailedMatrix[k].isProduct && this.detailedMatrix[k].buttonId === fieldId
                    );
                    productKeys.forEach(pkey => {
                        processedKeys.add(pkey);
                        const pData = this.detailedMatrix[pkey];
                        groupHasData = true;
                        const row = { label: `  ↳ ${pData.label}` }; // Indent
                        colIds.forEach(cid => {
                            const val = pData.values[cid] || 0;
                            groupTotals[cid] += val;
                            row[cid] = fmt(val, getMarkup(cid));
                        });
                        // Add only if not duplicate
                        groupRows.push(row);
                    });

                    // 3. Recursive: Check modalFields
                    if (fieldDef.modalFields && fieldDef.modalFields.length > 0) {
                        fieldDef.modalFields.forEach(mf => processField(mf, true));
                    }
                };

                // Process fields
                groupFields.forEach(f => processField(f));

                if (groupHasData) {
                    // Group Header
                    rows.push([{ content: `<< ${group.title} >>`, colSpan: columns.length, styles: { fillColor: [241, 245, 249], fontStyle: 'bold', textColor: 50 } }]);
                    // Data Rows
                    groupRows.forEach(r => rows.push(r));
                    // Group Subtotal
                    const subRow = { label: 'Всього по групі:' };
                    colIds.forEach(cid => {
                        grandTotals[cid] += groupTotals[cid];
                        const val = groupTotals[cid];
                        subRow[cid] = val > 0 ? Math.round(val * (1 + getMarkup(cid) / 100)).toLocaleString() : '-';
                    });
                    // Style subrow? autoTable styles usually separate, but we can pass styles in "didParseCell" or specific row structure
                    // For simple usage, we put it as a row and style it via hooks or just let it be. 
                    // To style specifically, we can use the array format with styles
                    const subRowArray = [{ content: 'Всього по групі:', styles: { fontStyle: 'bold', halign: 'right' } }];
                    colIds.forEach(cid => {
                        subRowArray.push({ content: subRow[cid], styles: { fontStyle: 'bold', halign: 'right' } });
                    });
                    rows.push(subRowArray);
                }
            });

            // Ungrouped
            const allKeys = Object.keys(this.detailedMatrix);
            const leftover = allKeys.filter(k => !processedKeys.has(k));
            if (leftover.length > 0) {
                const groupRows = [];
                let groupHasData = false;
                const groupTotals = {};
                colIds.forEach(c => groupTotals[c] = 0);

                leftover.forEach(key => {
                    const data = this.detailedMatrix[key];
                    const hasVal = colIds.some(cid => data.values[cid]);
                    if (hasVal) {
                        groupHasData = true;
                        const row = { label: `${data.label} ${data.isProduct ? '(Інше)' : ''}` };
                        colIds.forEach(cid => {
                            const val = data.values[cid] || 0;
                            groupTotals[cid] += val;
                            row[cid] = fmt(val, getMarkup(cid));
                        });
                        groupRows.push(row);
                    }
                });

                if (groupHasData) {
                    rows.push([{ content: `<< ІНШЕ >>`, colSpan: columns.length, styles: { fillColor: [241, 245, 249], fontStyle: 'bold', textColor: 50 } }]);
                    groupRows.forEach(r => rows.push(r));
                    const subRowArray = [{ content: 'Всього інше:', styles: { fontStyle: 'bold', halign: 'right' } }];
                    colIds.forEach(cid => {
                        grandTotals[cid] += groupTotals[cid];
                        const val = groupTotals[cid];
                        subRowArray.push({ content: val > 0 ? Math.round(val * (1 + getMarkup(cid) / 100)).toLocaleString() : '-', styles: { fontStyle: 'bold', halign: 'right' } });
                    });
                    rows.push(subRowArray);
                }
            }
        }

        // Generate Table
        doc.autoTable({
            startY: 65,
            columns: columns,
            body: rows,
            styles: { font: 'Roboto', fontStyle: 'normal', fontSize: 9 },
            headStyles: { fillColor: [59, 130, 246] },
            columnStyles: {
                label: { cellWidth: 'auto' },
                // dynamic cols usually auto width
            },
            theme: 'grid'
        });

        // Final Total
        let totalVal = 0;
        // Also show Total WITHOUT markup
        colIds.forEach(cid => totalVal += grandTotals[cid]);

        const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY + 10 : 80;
        doc.setFontSize(14);
        doc.setTextColor(37, 99, 235);
        doc.text(`ВСЬОГО: ${Math.round(totalVal).toLocaleString()} ViPoint`, 196, finalY, { align: 'right' });

        // Footer Sign
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('__________________________ (Підпис)', 14, finalY + 20);

        // Save
        const fileName = `${clientName}_Calculation.pdf`;
        doc.save(fileName);
    },

    showProcessDetails(points, catSums, originalCatSums) {
        // Define switchTab globally so it works (innerHTML script doesn't execute)
        if (!window.switchTab) {
            window.switchTab = function (tabId) {
                document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
                document.getElementById(tabId).style.display = 'block';
                document.querySelectorAll('.tab-btn').forEach(el => {
                    el.style.borderBottom = '3px solid transparent';
                    el.style.color = '#64748b';
                });
                const activeBtn = document.getElementById('btn_' + tabId);
                if (activeBtn) {
                    activeBtn.style.borderBottom = '3px solid #3b82f6';
                    activeBtn.style.color = '#3b82f6';
                }
            };
        }

        // =========================================================
        // VIEW 1: MATRIX (Detailed Breakdown by Processes)
        // =========================================================
        const categories = Object.keys(Schema.categories).map(cid => ({
            id: cid,
            name: Schema.categories[cid].name,
            markup: (Schema.meta && Schema.meta.markup) ? (Schema.meta.markup[cid] || 0) : 0
        }));

        let htmlRows = '';
        let grandTotals = {};
        categories.forEach(c => grandTotals[c.id] = 0);
        let matrixGrandTotal = 0;

        const fmt = (val) => {
            if (!val) return `<span style="color:#e2e8f0">-</span>`;
            // USER REQUEST: Show points WITHOUT correction coefficient
            return `<span style="font-weight:600; color:#334155">${Math.round(val).toLocaleString()}</span>`;
        };

        if (this.detailedMatrix) {
            // 1. Identify all fields that have data
            const fieldsWithData = Object.keys(this.detailedMatrix);
            const processedFields = new Set();

            // 2. Iterate Defined Groups
            if (Schema.groups && Schema.groups.length > 0) {
                Schema.groups.forEach(group => {
                    let groupRowsHtml = '';
                    let groupHasData = false;
                    const groupTotals = {};
                    categories.forEach(c => groupTotals[c.id] = 0);

                    // Find fields for this group
                    const groupFields = Schema.fields.filter(f => f.groupId === group.id);

                    const processField = (fieldDef, isNested = false) => {
                        const fieldId = fieldDef.id;

                        // 1. Check Field itself
                        const data = this.detailedMatrix[fieldId];
                        if (data) {
                            processedFields.add(fieldId);
                            const hasVal = categories.some(c => data.values[c.id]);
                            if (hasVal) {
                                groupHasData = true;
                                let cells = categories.map(c => {
                                    const val = data.values[c.id] || 0;
                                    groupTotals[c.id] += val;
                                    return `<td style="text-align:right; padding:8px; border-bottom:1px solid #f1f5f9">${fmt(val, c.markup)}</td>`;
                                }).join('');

                                const indentStyle = isNested ? 'padding-left:20px; color:#6b7280' : 'color:#475569';
                                groupRowsHtml += `
                                        <tr>
                                            <td style="padding:8px; border-bottom:1px solid #f1f5f9; ${indentStyle}">${data.label}</td>
                                            ${cells}
                                        </tr>
                                    `;
                            }
                        }

                        // 2. Check Products linked to this field
                        const productKeys = Object.keys(this.detailedMatrix).filter(k =>
                            this.detailedMatrix[k].isProduct && this.detailedMatrix[k].buttonId === fieldId
                        );
                        productKeys.forEach(pkey => {
                            processedFields.add(pkey);
                            const pData = this.detailedMatrix[pkey];
                            groupHasData = true;
                            let cells = categories.map(c => {
                                const val = pData.values[c.id] || 0;
                                groupTotals[c.id] += val;
                                return `<td style="text-align:right; padding:8px; border-bottom:1px solid #f1f5f9">${fmt(val, c.markup)}</td>`;
                            }).join('');

                            groupRowsHtml += `
                                    <tr style="background:#fcfaff">
                                        <td style="padding:8px; border-bottom:1px solid #f1f5f9; color:#6b7280; padding-left:20px">↳ ${pData.label}</td>
                                        ${cells}
                                    </tr>
                                `;
                        });

                        // 3. Check specific inputs inside this field (like checkbox_qty internal logic?) - usually covered by fieldId

                        // 4. RECURSIVE: Check modalFields
                        if (fieldDef.modalFields && fieldDef.modalFields.length > 0) {
                            fieldDef.modalFields.forEach(mf => processField(mf, true));
                        }
                    };

                    // Process all top-level fields in this group
                    groupFields.forEach(f => processField(f));

                    if (groupHasData) {
                        htmlRows += `
                                <tr style="background:#f1f5f9; font-weight:bold; color:#1e293b">
                                    <td colspan="${categories.length + 1}" style="padding:10px; border-top:2px solid #e2e8f0"><< ${group.title} >></td>
                                </tr>
                                ${groupRowsHtml}
                                <tr style="font-weight:bold; background:#f8fafc">
                                    <td style="padding:8px; text-align:right">Всього по групі:</td>
                                    ${categories.map(c => {
                            grandTotals[c.id] += groupTotals[c.id];
                            return `<td style="text-align:right; padding:8px">${fmt(groupTotals[c.id], c.markup)}</td>`;
                        }).join('')}
                                </tr>
                            `;

                    }
                });
            }

            // 3. Render Ungrouped / Leftover Fields
            const leftoverKeys = fieldsWithData.filter(k => !processedFields.has(k));

            // Check if we have ungrouped products associated with missing buttons?
            // Or completely standalone fields (e.g. products without buttonId usually don't happen but...)

            if (leftoverKeys.length > 0) {
                let groupTotals = {};
                categories.forEach(c => groupTotals[c.id] = 0);
                let leftoverRows = '';

                leftoverKeys.forEach(key => {
                    const data = this.detailedMatrix[key];
                    let cells = categories.map(c => {
                        const val = data.values[c.id] || 0;
                        groupTotals[c.id] += val;
                        return `<td style="text-align:right; padding:8px; border-bottom:1px solid #f1f5f9">${fmt(val, c.markup)}</td>`;
                    }).join('');

                    leftoverRows += `
                        <tr>
                            <td style="padding:8px; border-bottom:1px solid #f1f5f9; color:#475569">${data.label} ${data.isProduct ? '(Виріб)' : ''}</td>
                            ${cells}
                        </tr>
                    `;
                });

                htmlRows += `
                    <tr style="background:#f8fafc">
                        <td colspan="${categories.length + 1}" style="padding:10px; font-weight:700; color:#1e293b; font-size:12px; text-transform:uppercase; border-top:2px solid #e2e8f0; border-bottom:1px solid #e2e8f0">
                            << Інше / Не згруповане >>
                        </td>
                    </tr>
                    ${leftoverRows}
                 `;

                let totalCells = categories.map(c => {
                    grandTotals[c.id] += groupTotals[c.id];
                    const val = groupTotals[c.id];
                    return `<td style="text-align:right; padding:8px; font-weight:700; color:#1e293b; background:#f8fafc; border-bottom:1px solid #e2e8f0">${val > 0 ? Math.round(val * (1 + c.markup / 100)).toLocaleString() : '-'}</td>`;
                }).join('');

                htmlRows += `
                    <tr>
                        <td style="padding:8px; text-align:right; font-size:11px; font-weight:600; color:#64748b; background:#f8fafc; border-bottom:1px solid #e2e8f0">Всього по іншому:</td>
                        ${totalCells}
                    </tr>
                 `;
            }
        }

        // Calculate Matrix Grand Total
        let matrixHeaderCols = categories.map(c => `<th style="padding:10px; text-align:right; color:#64748b; font-size:11px; font-weight:600">${c.name.toUpperCase()}</th>`).join('');
        let matrixGrandTotalCells = categories.map(c => {
            const val = grandTotals[c.id];
            // Also show Total WITHOUT markup for consistency in this view
            const final = val;
            matrixGrandTotal += final;
            return `<td style="text-align:right; padding:12px; font-weight:800; color:#2563eb; background:#eff6ff; border-top:2px solid #bfdbfe">${Math.round(final).toLocaleString()}</td>`;
        }).join('');

        const matrixHtml = `
            <table style="width:100%; border-collapse:collapse; font-size:13px; font-family:sans-serif;">
                <thead>
                    <tr>
                        <th style="padding:10px; text-align:left; color:#94a3b8; font-size:11px; font-weight:600; border-bottom:2px solid #e2e8f0">ПОЛЕ / ПРОЦЕС</th>
                        ${matrixHeaderCols}
                    </tr>
                </thead>
                <tbody>
                    ${htmlRows || '<tr><td colspan="10" style="padding:20px; text-align:center">Немає даних (спробуйте "Список")</td></tr>'}
                    <tr>
                        <td style="padding:12px; text-align:right; font-weight:800; color:#1e3a8a; background:#eff6ff; border-top:2px solid #bfdbfe">ЗАГАЛЬНИЙ ПІДСУМОК:</td>
                        ${matrixGrandTotalCells}
                    </tr>
                </tbody>
            </table>
        `;


        // =========================================================
        // VIEW 2: LIST (Original Breakdown by Categories)
        // =========================================================
        const grouped = {};
        Object.keys(Schema.categories).forEach(cid => {
            grouped[cid] = { meta: Schema.categories[cid], items: [], totalPoints: 0, totalCost: 0 };
        });

        // Collect Points
        Object.keys(points).forEach(pid => {
            const pts = points[pid];
            if (pts > 0 && pid !== '_catSums') {
                const proc = Schema.processes.find(p => p.id === pid);
                if (proc && grouped[proc.category]) {
                    grouped[proc.category].items.push({ name: proc.name, points: pts });
                }
            }
        });

        this.addedProducts.forEach(prod => {
            if (prod.points) {
                Object.keys(prod.points).forEach(pid => {
                    if (pid === '_catSums') return;
                    const pts = prod.points[pid];
                    if (pts > 0) {
                        const proc = Schema.processes.find(p => p.id === pid);
                        if (proc && grouped[proc.category]) {
                            grouped[proc.category].items.push({ name: `[${prod.name}] ${proc.name}`, points: pts });
                        }
                    }
                });
            }
        });

        let listHtml = '<div style="display:flex; gap:20px; overflow-x:auto; padding-bottom:10px;">';
        let listGrandTotal = 0;

        Object.keys(grouped).forEach(cid => {
            const group = grouped[cid];
            if (group.items.length === 0) return;

            const markup = (Schema.meta && Schema.meta.markup) ? (Schema.meta.markup[cid] || 0) : 0;
            group.items.forEach(item => group.totalPoints += item.points);
            group.totalCost = group.totalPoints * (1 + markup / 100);
            listGrandTotal += group.totalCost;

            group.items.sort((a, b) => a.name.localeCompare(b.name));

            let itemsHtml = group.items.map(item => {
                const itemCost = item.points * (1 + markup / 100);
                return `
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:11px; border-bottom:1px dashed #e2e8f0; padding-bottom:2px;">
                        <span style="color:#334155; padding-right:5px;">${item.name}</span>
                        <span style="white-space:nowrap; font-weight:600; color:#475569;">${Math.round(itemCost).toLocaleString()}</span>
                    </div>
                `;
            }).join('');

            listHtml += `
                <div style="flex:1; min-width:250px; border:1px solid #e2e8f0; border-radius:8px; display:flex; flex-direction:column; background:white; overflow:hidden;">
                    <div style="padding:10px; background:${group.meta.color || '#f1f5f9'}; border-bottom:1px solid rgba(0,0,0,0.05); text-align:center;">
                        <div style="font-weight:700; font-size:13px; color:#1e293b; text-transform:uppercase;">${group.meta.name}</div>
                        ${markup > 0 ? `<div style="font-size:10px; color:#64748b;">+${markup}%</div>` : ''}
                    </div>
                    <div style="padding:10px; flex:1; overflow-y:auto; max-height:400px;">${itemsHtml}</div>
                    <div style="padding:10px; background:#f8fafc; border-top:1px solid #e2e8f0; text-align:right;">
                        <span style="font-size:14px; font-weight:700; color:#3b82f6;">${Math.round(group.totalCost).toLocaleString()}</span>
                    </div>
                </div>
            `;
        });
        listHtml += '</div>';

        // =========================================================
        // RENDER MODAL WITH TABS
        // =========================================================
        let modal = document.getElementById('detailsModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'detailsModal';
            modal.className = 'modal';
            modal.style.display = 'none';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-box" style="width: 95%; max-width: 1200px; height: 90vh; display:flex; flex-direction:column;">
                <div class="modal-header" style="background: white; border-bottom:1px solid #e2e8f0; padding: 10px 25px; display:block;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
                         <div style="display:flex; align-items:center; gap:10px;">
                            <h3 style="margin:0; color:#1e293b; font-size:18px;">📋 Деталізація</h3>
                            <span style="background:#eff6ff; color:#3b82f6; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:700;">
                                ${Math.round(listGrandTotal).toLocaleString()} ViPoint
                            </span>
                        </div>
                        <button class="modal-close" onclick="document.getElementById('detailsModal').style.display='none'" style="color:#64748b; font-size:28px; line-height:1;">&times;</button>
                    </div>
                    
                    <div style="display:flex; gap:20px;">
                        <button id="btn_tabMatrix" class="tab-btn" onclick="switchTab('tabMatrix')" style="background:none; border:none; border-bottom:3px solid #3b82f6; color:#3b82f6; font-weight:600; padding:5px 0; cursor:pointer; font-size:14px;">
                            Матриця (По процесах)
                        </button>
                        <button id="btn_tabList" class="tab-btn" onclick="switchTab('tabList')" style="background:none; border:none; border-bottom:3px solid transparent; color:#64748b; font-weight:600; padding:5px 0; cursor:pointer; font-size:14px;">
                            Список (По категоріях)
                        </button>
                    </div>
                </div>

                <div class="modal-body" style="padding:0; flex:1; overflow-y:auto; background:white; position:relative;">
                    <div id="tabMatrix" class="tab-content" style="padding:20px;">
                         <!-- Warning removed, let's see logic -->
                        ${matrixHtml}
                    </div>
                    <div id="tabList" class="tab-content" style="padding:20px; display:none;">
                         ${listHtml}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }
};

window.Engine = Engine;
