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

    injectStyles() {
        if (document.getElementById('engine-grid-styles')) return;
        const style = document.createElement('style');
        style.id = 'engine-grid-styles';
        style.innerHTML = `
            .group {
                margin-bottom: 40px;
                padding: 15px;
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
            }
            .field { 
                grid-column: span 12; 
                display: flex;
                flex-direction: column;
                border-radius: 8px;
                transition: all 0.2s ease;
            }
            .field label { 
                margin-bottom: 8px;
                font-weight: 600;
                font-size: 14px;
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
                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:20px; border-bottom:2px solid #e5e7eb; padding-bottom:15px;">
                    <div style="font-size:24px; font-weight:800; color:#111827">${Schema.layout?.title || 'Калькулятор'}</div>
                    <div style="font-size:12px; opacity:0.6">${Schema.layout?.version || 'v2.0'}</div>
                </div>
            `;
        }

        const container = document.getElementById('formContainer');
        container.innerHTML = '';

        // Apply Global Theme
        const theme = (Schema.layout && Schema.layout.theme) || 'dark';
        document.body.classList.toggle('light-theme', theme === 'light');

        // Render category selectors
        this.renderCategoryToggles();

        Schema.groups.forEach((group, idx) => {
            const gl = group.layout || {};
            const groupEl = document.createElement('div');
            groupEl.className = 'group';

            // Apply group styling
            if (gl.background) {
                groupEl.style.background = gl.background;
            } else if (theme === 'light') {
                groupEl.style.background = '#ffffff';
                groupEl.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }

            if (gl.borderWidth || theme === 'light') {
                groupEl.style.border = `${gl.borderWidth || 1}px solid ${gl.borderColor || (theme === 'light' ? '#e5e7eb' : 'rgba(255,255,255,0.1)')}`;
                groupEl.style.borderRadius = '12px';
            }

            const header = document.createElement('div');
            header.className = 'group-header';

            const numPrefix = gl.showNumbering ? `${idx + 1}. ` : '';
            header.textContent = numPrefix + group.title;
            groupEl.appendChild(header);

            const body = document.createElement('div');
            body.className = 'group-body';

            // Find fields for this group
            const fields = Schema.fields.filter(f => f.groupId === group.id && !f.hidden);
            fields.forEach(field => {
                const fieldEl = this.createFieldElement(field);
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
        wrapper.className = `field ${widthClass}${field.hidden ? ' hidden' : ''}`;

        // Apply wrapper-level styling
        if (l.flexDirection) {
            wrapper.style.flexDirection = l.flexDirection;
            if (l.flexDirection === 'row') {
                wrapper.style.display = 'flex';
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

        if (l.help || l.helpImg) {
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

            if (l.help) {
                const text = document.createElement('div');
                text.textContent = l.help;
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
        inputContainer.style.alignItems = 'center';
        inputContainer.style.justifyContent = 'flex-start';
        inputContainer.style.width = '100%';
        inputContainer.style.minWidth = '0'; // Prevent flex items from expanding
        inputContainer.style.overflow = (field.type === 'action_button' || field.type === 'select_modal') ? 'visible' : 'hidden';
        if (field.type === 'action_button' || field.type === 'select_modal') {
            inputContainer.style.position = 'relative';
            inputContainer.style.zIndex = '10';
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
            const pText = field.placeholderText || field.label || 'Виберіть...';

            const placeholder = document.createElement('option');
            placeholder.value = "";
            placeholder.textContent = pText;
            placeholder.disabled = true;
            placeholder.selected = true;
            select.appendChild(placeholder);

            const opts = field.options && field.options.length > 0 ? field.options : [{ value: 'default', label: 'Default' }];
            opts.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.label;
                select.appendChild(option);
            });
            applyStyleToInput(select);
            if (this.state[field.id] !== undefined) {
                select.value = this.state[field.id];
            } else {
                this.state[field.id] = "";
            }
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
            btnContainer.style.gap = '8px';
            btnContainer.style.width = '100%';

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

        } else {
            const input = document.createElement('input');
            input.type = field.type === 'number' ? 'number' : 'text';
            if (this.state[field.id] !== undefined) {
                input.value = this.state[field.id];
            } else {
                input.value = field.default || '';
                this.state[field.id] = field.type === 'number' ? (Number(input.value) || 0) : input.value;
            }
            applyStyleToInput(input);
            inputElement = input;
            inputWrapper.appendChild(inputElement);
        }

        // Generic Event Listener (for simple inputs)
        if (inputElement) {
            inputElement.addEventListener('input', (e) => {
                let val = e.target.value;
                if (field.type === 'number') val = Number(val) || 0;
                if (field.type === 'checkbox') val = e.target.checked ? 1 : 0;
                this.state[field.id] = val;
                this.calculate();
            });
        }

        wrapper.appendChild(inputContainer);
        return wrapper;
    },

    // --- PRODUCT MANAGEMENT ---
    addProduct(buttonId, data, existingId = null) {
        const productPoints = this.calculateProductPoints(data, buttonId);

        // Generate name from first select field or use button default
        let name = "Виріб";
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

            // Update name from first select field
            const button = Schema.fields.find(f => f.id === prod.buttonId);
            if (button && button.modalFields) {
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
                    min-width: fit-content;
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
            } else if (field.type === 'multiselect' && Array.isArray(val) && val.length > 0) {
                const labels = val.map(v => {
                    const opt = field.options?.find(o => o.value === v);
                    return opt ? opt.label : v;
                }).filter(Boolean);
                if (labels.length > 0) summary.push(labels.join(', '));
            }
        });
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

            let qty = val;
            if (mf.type === 'select' || mf.type === 'multiselect') {
                const values = mf.type === 'multiselect' ? (Array.isArray(val) ? val : []) : [val];
                values.forEach(v => {
                    const active = ruleSet[v];
                    if (active) this.applyPoints(active, points, null, catSums, mf);
                });
            } else {
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

            const values = (mf.type === 'multiselect') ? (Array.isArray(val) ? val : []) : [val];

            values.forEach(v => {
                const targetRules = (mf.type === 'select' || mf.type === 'multiselect') ? ruleSet[v] : ruleSet;
                if (!targetRules) return;

                Object.keys(Schema.categories).forEach(cid => {
                    const formula = targetRules[`_total_${cid}`];
                    if (!formula) return;

                    // Calculate current sum for this field/category
                    const tempSums = {};
                    Object.keys(Schema.categories).forEach(c => tempSums[c] = 0);
                    this.applyPoints(targetRules, null, (mf.type === 'checkbox_qty' ? val?.qty : v), tempSums, mf);
                    const currentSum = tempSums[cid] || 0;

                    let finalVal = 0;
                    if (String(formula).startsWith('=')) {
                        finalVal = this.evaluateFormulaExtended(formula, (mf.type === 'checkbox_qty' ? val?.qty : v), { '@sum': currentSum }); // Reverted contextVal and extraVars to original logic
                    } else if (!isNaN(formula)) {
                        finalVal = currentSum + Number(formula); // Reverted to original logic for fixed numbers
                    }

                    catSums[cid] += (finalVal - currentSum); // Reverted to original logic
                });
            });
        });

        // We return an object that allows renderResults to see the per-category contribution
        // To keep the card total simple, we map catSums back to a single number for the card helper
        points._catSums = catSums;
        return points;
    },

    // --- CALCULATION KERNEL ---
    calculate() {
        const points = {};
        Schema.processes.forEach(p => points[p.id] = 0);

        // Variables for Pass 2
        const catSums = {};
        Object.keys(Schema.categories || {}).forEach(cid => catSums[cid] = 0);

        // PASS 1: Raw Processes and Simple Rules
        this.processPass1(points, catSums);

        // Update catSums from products (Correct pass-by-pass)
        this.addedProducts.forEach(prod => {
            if (prod.points._catSums) {
                Object.keys(prod.points._catSums).forEach(cid => {
                    catSums[cid] += (prod.points._catSums[cid] || 0);
                });
            } else {
                Object.keys(prod.points).forEach(pId => {
                    const proc = Schema.processes.find(px => px.id === pId);
                    if (proc && proc.category) catSums[proc.category] += (prod.points[pId] || 0);
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
            const fDef = Schema.fields.find(f => f.id === fId);
            if (!fDef || !ruleSet) return;

            if (fDef.type === 'select') {
                const active = ruleSet[val];
                if (active) this.applyPoints(active, points, null, catSums, fDef);
            } else if (fDef.type === 'number' || fDef.type === 'checkbox' || fDef.type === 'select_yes_no') {
                this.applyPoints(ruleSet, points, val, catSums, fDef);
            } else if (fDef.type === 'checkbox_qty') {
                if (val && val.checked) this.applyPoints(ruleSet, points, val.qty, catSums, fDef);
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
            const fDef = Schema.fields.find(f => f.id === fId);
            const ruleSet = Schema.rules[fId];
            if (!fDef || !ruleSet) return;

            // For select_yes_no, we treat it like a number/checkbox (ruleSet is the object), not like 'select' (where ruleSet is a map of values)
            const targetRules = (fDef.type === 'select') ? ruleSet[fVal] : ruleSet;
            if (!targetRules) return;

            Object.keys(Schema.categories).forEach(cid => {
                const valInSigma = targetRules[`_total_${cid}`];
                if (!valInSigma) return;

                // 1. Calculate Row Sums
                const rowSums = {};
                const rawSums = {};
                Object.keys(Schema.categories).forEach(c => { rowSums[c] = 0; rawSums[c] = 0; });

                this.applyPoints(targetRules, null, fVal, rowSums, fDef);
                this.applyPoints(targetRules, null, 1, rawSums, fDef);

                const currentSum = rowSums[cid] || 0;
                const rawSum = rawSums[cid] || 0;

                // 2. Evaluate formula or fixed number
                let result = 0;
                if (String(valInSigma).startsWith('=')) {
                    // Formula replaces the sum unless @sum is used
                    // Provide @raw (points in row) and @sum (raw * qty)
                    result = this.evaluateFormulaExtended(valInSigma, fVal, {
                        ...globalVars,
                        '@sum': currentSum,
                        '@raw': rawSum
                    });
                } else if (!isNaN(valInSigma)) {
                    // Raw number in Sigma means "Add this to the sum"
                    result = currentSum + Number(valInSigma);
                }

                // Apply difference to the global total
                adjustments[cid] += (result - currentSum);
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
                val = this.evaluateFormulaExtended(val, contextVal, {});
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
                if (proc && proc.category) catSums[proc.category] += numVal;
            }
        });
    },

    evaluateFormulaExtended(formula, val, extraVars) {
        let expr = formula.substring(1).trim();
        if (!expr) return 0;

        // Inject val (qty)
        expr = expr.replace(/\bval\b/g, val || 0);
        expr = expr.replace(/@qty/g, val || 0);

        // Sort keys by length descending to avoid prefix replacement issues (@sum vs @sum_konst)
        const keys = Object.keys(extraVars).sort((a, b) => b.length - a.length);

        keys.forEach(key => {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(escapedKey + '(?![a-zA-Z0-9_])', 'g');
            expr = expr.replace(re, extraVars[key]);
        });

        // Math helpers
        expr = expr.replace(/min\(/g, 'Math.min(').replace(/max\(/g, 'Math.max(');
        expr = expr.replace(/ceil\(/g, 'Math.ceil(').replace(/floor\(/g, 'Math.floor(').replace(/round\(/g, 'Math.round(');

        try {
            // Use a clean scope for evaluation
            const res = new Function(`return (${expr})`)();
            return isNaN(res) ? 0 : Number(res);
        } catch (e) {
            console.error("Formula Evaluation Error:", expr, e);
            return 0;
        }
    },

    renderCategoryToggles() {
        const container = document.getElementById('categorySelection');
        if (!container) return;

        container.innerHTML = `
            <div style="font-size: 11px; font-weight: 800; color: #6b7280; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;">
                <span style="background: #6366f1; width: 4px; height: 12px; border-radius: 2px;"></span>
                Процеси для розрахунку
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;" id="catToggleList"></div>
        `;

        const list = container.querySelector('#catToggleList');
        Object.keys(Schema.categories).forEach(cid => {
            const cat = Schema.categories[cid];
            const isActive = this.activeCategories.has(cid);

            const primaryColor = '#2563eb'; // Deep Blue
            const btn = document.createElement('button');
            btn.style.cssText = `
                padding: 6px 14px;
                border-radius: 999px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                border: 2px solid ${isActive ? primaryColor : '#d1d5db'};
                background: ${isActive ? primaryColor : 'white'};
                color: ${isActive ? 'white' : '#9ca3af'};
                text-decoration: ${isActive ? 'none' : 'line-through'};
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                gap: 6px;
                user-select: none;
                box-shadow: ${isActive ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none'};
            `;

            btn.innerHTML = `
                <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; background: ${isActive ? 'rgba(255,255,255,0.3)' : '#cbd5e1'}; display: flex; align-items: center; justify-content: center; font-size: 8px;">
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
            // Normalize paths for comparison (remove 'data/' prefix if needed or match partial)
            const found = window.CalculatorConfig.find(c => window.currentConfigFile.includes(c.file) || c.file.includes(window.currentConfigFile));
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
        const resultsPanel = document.getElementById('resultsContainer') || document.querySelector('.results-panel div[style*="border-bottom"]');
        if (!resultsPanel) return;

        resultsPanel.innerHTML = '';
        Object.keys(Schema.categories).forEach(cid => {
            const isActive = this.activeCategories.has(cid);
            const sum = Math.round(catSums[cid] || 0); // Final Sum (with Markup)
            if (isActive) grandTotal += sum;

            let markupHtml = '';
            // Only show markup info if there is a markup and potential for points
            if (originalCatSums && Schema.meta && Schema.meta.markup) {
                const markup = Schema.meta.markup[cid] || 0;
                // Check if this category has points (based on originalCatSums)
                if (markup > 0 && originalCatSums[cid] > 0) {
                    const orig = Math.round(originalCatSums[cid]);
                    markupHtml = `<div style="font-size:10px; color:#64748b; text-align:right; margin-top:2px;">
                        Оригінал: ${orig.toLocaleString()} (+${markup}%)
                     </div>`;
                }
            }

            const row = document.createElement('div');
            row.style.cssText = `
                display:flex; 
                justify-content:space-between; 
                margin-bottom:10px; 
                font-size:13px;
                transition: 0.3s;
                opacity: ${isActive ? '1' : '0.3'};
                filter: ${isActive ? 'none' : 'grayscale(1)'};
                text-decoration: ${isActive ? 'none' : 'line-through'};
            `;

            row.innerHTML = `
                <span>${Schema.categories[cid].name}</span> 
                <div style="display:flex; flex-direction:column; align-items:flex-end;">
                    <span style="font-weight:600; color:${isActive ? '#3b82f6' : '#9ca3af'}">${sum.toLocaleString()} ViPoint</span>
                    ${markupHtml}
                </div>
            `;
            resultsPanel.appendChild(row);
        });

        const totalScoreEl = document.getElementById('totalScore');
        if (totalScoreEl) totalScoreEl.innerText = `${Math.round(grandTotal).toLocaleString()} ViPoint`;

        // Render Action Buttons (Details + PDF)
        const headerContainer = document.querySelector('.results-header');
        if (headerContainer) {
            // Container for buttons
            let btnContainer = document.getElementById('resBtnContainer');
            if (!btnContainer) {
                btnContainer = document.createElement('div');
                btnContainer.id = 'resBtnContainer';
                btnContainer.style.cssText = 'display:flex; gap:10px; margin-top:10px';
                headerContainer.appendChild(btnContainer);
            }

            // Details Button
            if (!document.getElementById('detailsBtn')) {
                const btn = document.createElement('button');
                btn.id = 'detailsBtn';
                btn.innerText = '📋 Деталі';
                btn.style.cssText = `
                    flex: 1;
                    padding: 8px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    color: #64748b;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                `;
                btn.onmouseover = () => { btn.style.background = '#f1f5f9'; btn.style.color = '#3b82f6'; };
                btn.onmouseout = () => { btn.style.background = 'white'; btn.style.color = '#64748b'; };
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
                    padding: 8px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    color: #ef4444;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                `;
                btn.onmouseover = () => { btn.style.background = '#fef2f2'; btn.style.color = '#dc2626'; };
                btn.onmouseout = () => { btn.style.background = 'white'; btn.style.color = '#ef4444'; };
                btn.onclick = () => this.generatePDF(points, catSums, originalCatSums);
                btnContainer.appendChild(btn);
            } else {
                document.getElementById('pdfBtn').onclick = () => this.generatePDF(points, catSums, originalCatSums);
            }
        }

        // Inject Save Button
        const totalContainer = totalScoreEl?.parentElement;
        if (totalContainer && !document.getElementById('btnSaveCloud')) {
            const btn = document.createElement('button');
            btn.id = 'btnSaveCloud';
            btn.innerHTML = '☁️ Зберегти';
            btn.style.cssText = `
                display: block;
                width: 100%;
                margin-top: 15px;
                padding: 10px;
                background: linear-gradient(135deg, #2563eb, #1d4ed8);
                color: white;
                border: none;
                border-radius: 12px;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
                transition: all 0.2s;
            `;
            btn.onmouseover = () => btn.style.transform = 'translateY(-2px)';
            btn.onmouseout = () => btn.style.transform = 'translateY(0)';
            btn.onclick = () => {
                console.log("🔘 Button 'Save' Clicked!");
                this.saveToCloud();
            };

            // Insert after the total score block
            totalContainer.parentElement.appendChild(btn);
        }
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

        // Prepare Table Data
        const rows = [];
        let grandTotal = 0;

        // Group by Category (Reuse Logic)
        const categories = {};
        Object.keys(Schema.categories).forEach(cid => {
            categories[cid] = { meta: Schema.categories[cid], items: [] };
        });

        // Collect Items
        Object.keys(points).forEach(pid => {
            const pts = points[pid];
            if (pts > 0 && pid !== '_catSums') {
                const proc = Schema.processes.find(p => p.id === pid);
                if (proc && categories[proc.category]) {
                    const markup = (Schema.meta && Schema.meta.markup) ? (Schema.meta.markup[proc.category] || 0) : 0;
                    const cost = pts * (1 + markup / 100);
                    categories[proc.category].items.push({
                        proc: proc.name,
                        cost: cost
                    });
                }
            }
        });

        // Products
        this.addedProducts.forEach(prod => {
            if (prod.points) {
                Object.keys(prod.points).forEach(pid => {
                    if (pid === '_catSums') return;
                    const pts = prod.points[pid];
                    if (pts > 0) {
                        const proc = Schema.processes.find(p => p.id === pid);
                        if (proc && categories[proc.category]) {
                            const markup = (Schema.meta && Schema.meta.markup) ? (Schema.meta.markup[proc.category] || 0) : 0;
                            const cost = pts * (1 + markup / 100);
                            categories[proc.category].items.push({
                                proc: `[${prod.name}] ${proc.name}`,
                                cost: cost
                            });
                        }
                    }
                });
            }
        });

        // Build Rows for AutoTable
        Object.keys(categories).forEach(cid => {
            const cat = categories[cid];
            if (cat.items.length > 0) {
                // Sort
                cat.items.sort((a, b) => a.proc.localeCompare(b.proc));

                // Category Header per section or just grouping in table? AutoTable 'grouping' is complex.
                // We will manually add header rows.
                rows.push([{ content: cat.meta.name.toUpperCase(), colSpan: 2, styles: { fillColor: [241, 245, 249], fontStyle: 'bold', textColor: 50 } }]);

                let catTotal = 0;
                cat.items.forEach(item => {
                    rows.push([item.proc, Math.round(item.cost).toLocaleString()]);
                    catTotal += item.cost;
                });
                grandTotal += catTotal;

                // Category Subtotal
                rows.push([{ content: 'Разом за категорією:', styles: { halign: 'right', fontStyle: 'bold' } }, { content: Math.round(catTotal).toLocaleString(), styles: { fontStyle: 'bold' } }]);
            }
        });

        // Generate Table
        doc.autoTable({
            startY: 65,
            head: [['Процес / Найменування', 'Вартість (ViPoint)']],
            body: rows,
            styles: { font: 'Roboto', fontStyle: 'normal' },
            headStyles: { fillColor: [59, 130, 246] },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 40, halign: 'right' }
            }
        });

        // Final Total
        const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY + 10 : 80;
        doc.setFontSize(14);
        doc.setTextColor(37, 99, 235);
        doc.text(`ВСЬОГО: ${Math.round(grandTotal).toLocaleString()} ViPoint`, 196, finalY, { align: 'right' });

        // Footer Sign
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('__________________________ (Підпис)', 14, finalY + 20);

        // Save
        const fileName = `${clientName}_Calculation.pdf`;
        doc.save(fileName);
    },

    showProcessDetails(points, catSums, originalCatSums) {
        // Prepare Data grouped by Category
        const grouped = {};
        Object.keys(Schema.categories).forEach(cid => {
            grouped[cid] = {
                meta: Schema.categories[cid],
                items: [],
                totalPoints: 0,
                totalCost: 0
            };
        });

        // 1. Collect Process Points
        Object.keys(points).forEach(pid => {
            const pts = points[pid];
            if (pts > 0 && pid !== '_catSums') {
                const proc = Schema.processes.find(p => p.id === pid);
                if (proc && grouped[proc.category]) {
                    grouped[proc.category].items.push({
                        name: proc.name,
                        points: pts
                    });
                }
            }
        });

        // 2. Collect Product Points
        this.addedProducts.forEach(prod => {
            if (prod.points) {
                Object.keys(prod.points).forEach(pid => {
                    if (pid === '_catSums') return;
                    const pts = prod.points[pid];
                    if (pts > 0) {
                        const proc = Schema.processes.find(p => p.id === pid);
                        if (proc && grouped[proc.category]) {
                            grouped[proc.category].items.push({
                                name: `[${prod.name}] ${proc.name}`,
                                points: pts
                            });
                        }
                    }
                });
            }
        });

        // HTML Builder for Columns
        let columnsHtml = '';
        let grandTotal = 0;

        Object.keys(grouped).forEach(cid => {
            const group = grouped[cid];
            if (group.items.length === 0) return; // Skip empty categories

            // Calculate Totals
            const markup = (Schema.meta && Schema.meta.markup) ? (Schema.meta.markup[cid] || 0) : 0;
            group.items.forEach(item => {
                group.totalPoints += item.points;
            });
            group.totalCost = group.totalPoints * (1 + markup / 100);
            grandTotal += group.totalCost;

            // Sort items by name
            group.items.sort((a, b) => a.name.localeCompare(b.name));

            // Build Column HTML
            let itemsHtml = group.items.map(item => {
                const itemCost = item.points * (1 + markup / 100);
                return `
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:11px; border-bottom:1px dashed #e2e8f0; padding-bottom:2px;">
                        <span style="color:#334155; padding-right:5px;">${item.name}</span>
                        <span style="white-space:nowrap; font-weight:600; color:#475569;">
                            ${Math.round(itemCost).toLocaleString()}
                            ${markup > 0 ? `<span style="font-size:9px; color:#94a3b8">(${Math.round(item.points)})</span>` : ''}
                        </span>
                    </div>
                `;
            }).join('');

            columnsHtml += `
                <div style="flex:1; min-width:220px; border-right:1px solid #e2e8f0; display:flex; flex-direction:column; background:white;">
                    <div style="padding:12px; background:${group.meta.color || '#f1f5f9'}; border-bottom:1px solid rgba(0,0,0,0.05); text-align:center;">
                        <div style="font-weight:700; font-size:13px; color:#1e293b; text-transform:uppercase; letter-spacing:0.05em;">${group.meta.name}</div>
                        ${markup > 0 ? `<div style="font-size:10px; color:#64748b; margin-top:2px;">Кор. коеф.: +${markup}%</div>` : ''}
                    </div>
                    <div style="padding:12px; flex:1; overflow-y:auto; max-height:400px;">
                        ${itemsHtml}
                    </div>
                    <div style="padding:12px; background:#f8fafc; border-top:1px solid #e2e8f0; text-align:right;">
                        <div style="font-size:10px; color:#64748b;">Разом за категорією</div>
                        <div style="font-size:16px; font-weight:700; color:#3b82f6;">${Math.round(group.totalCost).toLocaleString()}</div>
                        ${markup > 0 ? `<div style="font-size:10px; color:#94a3b8; margin-top:2px;">Оригінал: ${Math.round(group.totalPoints).toLocaleString()}</div>` : ''}
                    </div>
                </div>
            `;
        });

        // Create or Reuse Modal (Update Width)
        let modal = document.getElementById('detailsModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'detailsModal';
            modal.className = 'modal';
            modal.style.display = 'none';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-box" style="width: 90%; max-width: 1200px; height: 80vh; display:flex; flex-direction:column;">
                <div class="modal-header" style="background: white; border-bottom:1px solid #e2e8f0; padding: 15px 25px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <h3 style="margin:0; color:#1e293b; font-size:18px;">📋 Деталізація Розрахунку</h3>
                        <span style="background:#eff6ff; color:#3b82f6; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:700;">
                            ВСЬОГО: ${Math.round(grandTotal).toLocaleString()} ViPoint
                        </span>
                    </div>
                    <button class="modal-close" onclick="document.getElementById('detailsModal').style.display='none'" style="color:#64748b; font-size:28px; line-height:1;">&times;</button>
                </div>
                <div class="modal-body" style="padding:0; flex:1; overflow:hidden; background:#f8fafc;">
                    <div style="display:flex; height:100%; overflow-x:auto;">
                        ${columnsHtml || '<div style="padding:40px; text-align:center; color:#94a3b8; width:100%">Немає активних процесів</div>'}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }
};

window.Engine = Engine;
