/**
 * ==============================================================================
 * 3D LIVE VIEWER MODULE FOR VIYAR CALCULATOR
 * ==============================================================================
 * Забезпечує live 3D-візуалізацію стендів та фурнітури безпосередньо у формі калькулятора.
 * Підтримує еластичне розтягування (Ш × В × Г) та статичний огляд окремих виробів.
 * ==============================================================================
 */

const Viewer3D = {
    isOpen: false,
    isDocked: true,
    activeConfig: null,
    
    // Three.js State
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    customModelGroup: null,
    dimensionsGroup: null,
    
    // Geometry & Elasticity
    baseDims: { width: 5256, height: 2548, depth: 583 },
    currentDims: { width: 5256, height: 2548, depth: 583 },
    currentVertCount: 0,
    currentHorizCount: 0,
    modelScaleMultiplier: 1,
    loadedModelUrl: null,

    // DOM Elements
    widgetEl: null,
    canvasEl: null,
    labelWidth: null,
    labelHeight: null,
    labelDepth: null,
    badgeTitle: null,
    badgeDims: null,

    init() {
        if (this.widgetEl) return;
        this.injectStyles();
        this.createWidgetDOM();
        this.initThreeEngine();
    },

    injectStyles() {
        if (document.getElementById('viewer3d-styles')) return;
        const style = document.createElement('style');
        style.id = 'viewer3d-styles';
        style.innerHTML = `
            /* 3D Floating / Docked Panel */
            #viewer3d-container {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 480px;
                height: 440px;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 16px 40px -8px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08);
                display: none;
                flex-direction: column;
                z-index: 9999;
                overflow: hidden;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s, width 0.3s, height 0.3s;
                font-family: 'Inter', -apple-system, sans-serif;
            }

            #viewer3d-container.expanded {
                width: 780px;
                height: 640px;
            }

            #viewer3d-container.minimized {
                height: 48px;
                width: 320px;
            }

            /* Header */
            .viewer3d-header {
                padding: 10px 14px;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: grab;
                user-select: none;
            }

            .viewer3d-title-group {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .viewer3d-icon-box {
                width: 28px;
                height: 28px;
                background: #eff6ff;
                color: #2563eb;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 700;
            }

            .viewer3d-title {
                font-size: 13px;
                font-weight: 700;
                color: #0f172a;
            }

            .viewer3d-status {
                font-size: 10px;
                font-weight: 700;
                background: #dcfce7;
                color: #166534;
                padding: 2px 6px;
                border-radius: 999px;
            }

            .viewer3d-actions {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .viewer3d-btn-icon {
                width: 26px;
                height: 26px;
                border: none;
                background: transparent;
                border-radius: 6px;
                cursor: pointer;
                color: #64748b;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                transition: 0.15s;
            }

            .viewer3d-btn-icon:hover {
                background: #e2e8f0;
                color: #0f172a;
            }

            /* Viewport Canvas */
            .viewer3d-viewport {
                flex: 1;
                position: relative;
                background: radial-gradient(circle at 50% 40%, #ffffff 0%, #e2e8f0 100%);
                outline: none;
                overflow: hidden;
            }

            #viewer3d-canvas {
                width: 100%;
                height: 100%;
                display: block;
            }

            /* Overlay Toolbar in 3D */
            .viewer3d-overlay-toolbar {
                position: absolute;
                top: 10px;
                left: 10px;
                display: flex;
                gap: 6px;
                z-index: 10;
            }

            .viewer3d-tool-btn {
                background: rgba(255, 255, 255, 0.92);
                backdrop-filter: blur(6px);
                border: 1px solid rgba(0, 0, 0, 0.1);
                color: #334155;
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.15s;
                box-shadow: 0 1px 4px rgba(0,0,0,0.05);
            }

            .viewer3d-tool-btn:hover {
                background: #ffffff;
                color: #2563eb;
                border-color: #2563eb;
            }

            /* Color switcher */
            .viewer3d-color-palette {
                position: absolute;
                bottom: 10px;
                left: 10px;
                display: flex;
                gap: 4px;
                background: rgba(255, 255, 255, 0.9);
                padding: 4px;
                border-radius: 8px;
                border: 1px solid #cbd5e1;
                z-index: 10;
            }

            .viewer3d-palette-dot {
                width: 16px;
                height: 16px;
                border-radius: 4px;
                border: 1px solid rgba(0,0,0,0.2);
                cursor: pointer;
                transition: transform 0.15s;
            }

            .viewer3d-palette-dot:hover {
                transform: scale(1.2);
            }

            /* Dynamic 3D Dimension Badges */
            .viewer3d-dim-badge {
                position: absolute;
                color: white;
                background: rgba(15, 23, 42, 0.88);
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255, 255, 255, 0.25);
                padding: 3px 6px;
                border-radius: 5px;
                font-size: 11px;
                font-weight: 700;
                pointer-events: none;
                transform: translate(-50%, -50%);
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                z-index: 5;
            }

            /* Footer Info */
            .viewer3d-footer {
                padding: 8px 14px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                font-size: 11px;
                color: #64748b;
                display: flex;
                justify-content: space-between;
                align-items: center;
                user-select: none;
            }

            /* Trigger Button in Form Header */
            .btn-3d-trigger {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: #eff6ff;
                color: #2563eb;
                border: 1px solid #bfdbfe;
                padding: 4px 10px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-left: 10px;
            }

            .btn-3d-trigger:hover {
                background: #2563eb;
                color: #ffffff;
                border-color: #2563eb;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            }

            .btn-3d-trigger.active {
                background: #2563eb;
                color: #ffffff;
            }
        `;
        document.head.appendChild(style);
    },

    createWidgetDOM() {
        const widget = document.createElement('div');
        widget.id = 'viewer3d-container';
        widget.innerHTML = `
            <div class="viewer3d-header" id="viewer3d-drag-handle">
                <div class="viewer3d-title-group">
                    <div class="viewer3d-icon-box">📦</div>
                    <div>
                        <div class="viewer3d-title" id="viewer3d-header-title">3D Візуалізатор стенду</div>
                    </div>
                    <span class="viewer3d-status" id="viewer3d-badge-status">Наживо</span>
                </div>
                <div class="viewer3d-actions">
                    <button class="viewer3d-btn-icon" onclick="Viewer3D.toggleExpand()" title="Розгорнути/Згорнути">⤢</button>
                    <button class="viewer3d-btn-icon" onclick="Viewer3D.toggleMinimize()" title="Згорнути панель">_</button>
                    <button class="viewer3d-btn-icon" onclick="Viewer3D.close()" title="Закрити">✕</button>
                </div>
            </div>

            <div class="viewer3d-viewport" id="viewer3d-viewport-box">
                <canvas id="viewer3d-canvas"></canvas>

                <!-- 3D Toolbar -->
                <div class="viewer3d-overlay-toolbar">
                    <button class="viewer3d-tool-btn" onclick="Viewer3D.resetCamera()" title="Скинути камеру">🔄 Ракурс</button>
                    <button class="viewer3d-tool-btn" onclick="Viewer3D.setFrontView()" title="Вигляд спереду">📐 Фасад</button>
                    <button class="viewer3d-tool-btn" onclick="Viewer3D.setIsometricView()" title="Ізометрія">📦 3D</button>
                </div>

                <!-- Palette -->
                <div class="viewer3d-color-palette" title="Колір моделі">
                    <div class="viewer3d-palette-dot" style="background:#64748b;" onclick="Viewer3D.setModelColor(0x64748b)" title="Сірий"></div>
                    <div class="viewer3d-palette-dot" style="background:#334155;" onclick="Viewer3D.setModelColor(0x334155)" title="Графіт"></div>
                    <div class="viewer3d-palette-dot" style="background:#94a3b8;" onclick="Viewer3D.setModelColor(0x94a3b8)" title="Світлий"></div>
                    <div class="viewer3d-palette-dot" style="background:#e2e8f0;" onclick="Viewer3D.setModelColor(0xe2e8f0)" title="Білий"></div>
                </div>

                <!-- 3D Dimension Badges -->
                <div id="viewer3d-dim-width" class="viewer3d-dim-badge">Ш: 5256 мм</div>
                <div id="viewer3d-dim-height" class="viewer3d-dim-badge">В: 2548 мм</div>
                <div id="viewer3d-dim-depth" class="viewer3d-dim-badge">Г: 583 мм</div>

                <!-- Empty State Hint (when values are 0) -->
                <div id="viewer3d-empty-hint" style="position: absolute; inset: 0; display: none; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; text-align: center; padding: 24px; z-index: 10; background: rgba(248, 250, 252, 0.7); backdrop-filter: blur(4px);">
                    <div style="width: 56px; height: 56px; background: #eff6ff; border: 2px dashed #3b82f6; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 12px;">📐</div>
                    <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Введіть розміри корпусу</div>
                    <div style="font-size: 12px; color: #64748b; max-width: 240px; line-height: 1.4;">Вкажіть ширину або висоту у формі, щоб побудувати 3D-модель стенду</div>
                </div>
            </div>

            <div class="viewer3d-footer">
                <span id="viewer3d-footer-dims">Габарити: 5256 × 2548 × 583 мм</span>
                <span style="font-size:10px; color:#94a3b8;">🖱️ Обертання: Ліва кнопка | Zoom: Коліщатко</span>
            </div>
        `;
        document.body.appendChild(widget);

        this.widgetEl = widget;
        this.canvasEl = document.getElementById('viewer3d-canvas');
        this.labelWidth = document.getElementById('viewer3d-dim-width');
        this.labelHeight = document.getElementById('viewer3d-dim-height');
        this.labelDepth = document.getElementById('viewer3d-dim-depth');
        this.badgeTitle = document.getElementById('viewer3d-header-title');
        this.badgeDims = document.getElementById('viewer3d-footer-dims');

        // Draggable header
        this.setupDraggable(document.getElementById('viewer3d-drag-handle'), widget);
    },

    setupDraggable(handle, container) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        handle.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = container.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
            container.style.right = 'auto';
            container.style.bottom = 'auto';
            container.style.left = initialLeft + 'px';
            container.style.top = initialTop + 'px';
            document.body.style.userSelect = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            container.style.left = Math.max(10, Math.min(window.innerWidth - container.offsetWidth - 10, initialLeft + dx)) + 'px';
            container.style.top = Math.max(10, Math.min(window.innerHeight - container.offsetHeight - 10, initialTop + dy)) + 'px';
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.userSelect = '';
            }
        });
    },

    initThreeEngine() {
        const viewport = document.getElementById('viewer3d-viewport-box');

        // 1. Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf8fafc);

        // 2. Camera
        this.camera = new THREE.PerspectiveCamera(45, viewport.clientWidth / viewport.clientHeight, 10, 30000);
        this.camera.position.set(3600, 2400, 4800);

        // 3. Renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasEl, antialias: true, alpha: true });
        this.renderer.setSize(viewport.clientWidth, viewport.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // 4. OrbitControls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;
        this.controls.maxDistance = 20000;
        this.controls.minDistance = 200;
        this.controls.target.set(0, 1200, 0);

        // 5. Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.85);
        this.scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.75);
        keyLight.position.set(4000, 6000, 4500);
        keyLight.castShadow = true;
        this.scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x94a3b8, 0.4);
        fillLight.position.set(-3500, 3000, -2500);
        this.scene.add(fillLight);

        // 6. Floor Grid
        const grid = new THREE.GridHelper(12000, 60, 0x94a3b8, 0xdbeafe);
        grid.position.y = 0;
        this.scene.add(grid);

        // 7. Groups
        this.customModelGroup = new THREE.Group();
        this.dimensionsGroup = new THREE.Group();
        this.scene.add(this.customModelGroup);
        this.scene.add(this.dimensionsGroup);

        // Resize
        window.addEventListener('resize', () => this.onResize());

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (this.isOpen) {
                this.controls.update();
                this.updateScreenBadges();
                this.renderer.render(this.scene, this.camera);
            }
        };
        animate();
    },

    onResize() {
        if (!this.isOpen || !this.widgetEl) return;
        const viewport = document.getElementById('viewer3d-viewport-box');
        if (!viewport || viewport.clientWidth === 0) return;
        this.camera.aspect = viewport.clientWidth / viewport.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(viewport.clientWidth, viewport.clientHeight);
    },

    openWithConfig(cfg, formValues = {}) {
        this.init();
        this.activeConfig = cfg;
        this.widgetEl.style.display = 'flex';
        this.isOpen = true;

        if (this.badgeTitle) this.badgeTitle.textContent = cfg.title || '3D Модель';

        // Extract dimensions from bindings if present
        let w = 0;
        let h = 0;
        let d = cfg.bindings?.defaultDepth || cfg.baseDims?.depth || 583;

        if (cfg.bindings) {
            // If specific field IDs are not set, dynamically look up by label in Schema.fields
            if (!cfg.bindings.widthField && cfg.bindings.widthLabelMatch && window.Schema?.fields) {
                const fW = Schema.fields.find(f => {
                    const lbl = (f.label || '').toLowerCase();
                    return cfg.bindings.widthLabelMatch.some(m => lbl.includes(m));
                });
                if (fW) cfg.bindings.widthField = fW.id;
            }
            if (!cfg.bindings.heightField && cfg.bindings.heightLabelMatch && window.Schema?.fields) {
                const fH = Schema.fields.find(f => {
                    const lbl = (f.label || '').toLowerCase();
                    return cfg.bindings.heightLabelMatch.some(m => lbl.includes(m));
                });
                if (fH) cfg.bindings.heightField = fH.id;
            }

            if (cfg.bindings.widthField && formValues[cfg.bindings.widthField] !== undefined) {
                w = parseFloat(formValues[cfg.bindings.widthField]) || 0;
            }
            if (cfg.bindings.heightField && formValues[cfg.bindings.heightField] !== undefined) {
                h = parseFloat(formValues[cfg.bindings.heightField]) || 0;
            }
            if (cfg.bindings.depthField && formValues[cfg.bindings.depthField] !== undefined) {
                d = parseFloat(formValues[cfg.bindings.depthField]) || d;
            }
            if (cfg.bindings.verticalField && formValues[cfg.bindings.verticalField] !== undefined) {
                vertCount = parseInt(formValues[cfg.bindings.verticalField]) || 0;
            }
            if (cfg.bindings.horizontalField && formValues[cfg.bindings.horizontalField] !== undefined) {
                horizCount = parseInt(formValues[cfg.bindings.horizontalField]) || 0;
            }
        }

        this.baseDims = {
            width: cfg.baseDims?.width || 5256,
            height: cfg.baseDims?.height || 2548,
            depth: cfg.baseDims?.depth || 583
        };

        this.currentDims = { width: w, height: h, depth: d };
        this.currentVertCount = vertCount;
        this.currentHorizCount = horizCount;

        // Parametric Mode: procedural carcass generation without loading external files
        if (cfg.type === 'parametric') {
            this.renderParametricModel(w, h, d, vertCount, horizCount);
            if (this.customModelGroup.visible) {
                this.fitCameraToObject(this.customModelGroup);
            }
            this.onResize();
            this.updateTriggerButtons(true);
            return;
        }

        // Load model if not already loaded
        if (this.loadedModelUrl !== cfg.modelUrl) {
            this.loadModel(cfg.modelUrl, () => {
                this.applyDimensions(w, h, d);
                if (this.customModelGroup.visible) {
                    this.fitCameraToObject(this.customModelGroup);
                }
            });
        } else {
            this.applyDimensions(w, h, d);
            if (this.customModelGroup.visible) {
                this.fitCameraToObject(this.customModelGroup);
            }
        }

        this.onResize();
        this.updateTriggerButtons(true);
    },

    loadModel(url, onLoadCallback) {
        // Clear previous model
        while (this.customModelGroup.children.length > 0) {
            const obj = this.customModelGroup.children[0];
            this.customModelGroup.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            obj.traverse(c => { if (c.geometry) c.geometry.dispose(); });
        }

        const isGltf = url.endsWith('.gltf') || url.endsWith('.glb');
        const loader = isGltf ? new THREE.GLTFLoader() : new THREE.OBJLoader();

        const tryFallbackMemory = () => {
            if (window.TEST_STAND_GLTF && isGltf) {
                try {
                    loader.parse(JSON.stringify(window.TEST_STAND_GLTF), '', (loadedMem) => {
                        this.processLoadedModel(loadedMem.scene);
                        this.loadedModelUrl = url;
                        if (onLoadCallback) onLoadCallback();
                    });
                } catch(e) {
                    console.warn('Viewer3D: Memory fallback parse failed', e);
                }
            }
        };

        loader.load(url, (loaded) => {
            const model = isGltf ? loaded.scene : loaded;
            this.processLoadedModel(model);
            this.loadedModelUrl = url;
            if (onLoadCallback) onLoadCallback();
        }, undefined, (err) => {
            console.warn('Viewer3D: Direct load failed, trying alt path or memory fallback...', url);
            if (url.startsWith('../')) {
                const altUrl = url.replace('../', '');
                loader.load(altUrl, (loadedAlt) => {
                    const modelAlt = isGltf ? loadedAlt.scene : loadedAlt;
                    this.processLoadedModel(modelAlt);
                    this.loadedModelUrl = altUrl;
                    if (onLoadCallback) onLoadCallback();
                }, undefined, () => {
                    tryFallbackMemory();
                });
            } else {
                tryFallbackMemory();
            }
        });
    },

    processLoadedModel(model) {
        const meshes = [];
        model.traverse(child => {
            if (child.isMesh && child.geometry) meshes.push(child);
        });

        if (meshes.length === 0) return;

        // Compute raw bounding box
        const totalBox = new THREE.Box3();
        meshes.forEach(m => {
            m.geometry.computeBoundingBox();
            totalBox.union(m.geometry.boundingBox);
        });

        const rawSize = new THREE.Vector3();
        totalBox.getSize(rawSize);
        const rawCenter = new THREE.Vector3();
        totalBox.getCenter(rawCenter);

        // Build orientation matrix (Translate by -rawCenter -> Rotate X -90° -> Rotate Y 180°)
        const mCenter = new THREE.Matrix4().makeTranslation(-rawCenter.x, -rawCenter.y, -rawCenter.z);
        const mRotX = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
        const mRotY = new THREE.Matrix4().makeRotationY(Math.PI);

        const M = new THREE.Matrix4();
        if (rawSize.y < rawSize.z * 0.5) {
            M.multiply(mRotY);
            M.multiply(mRotX);
        }
        M.multiply(mCenter);

        const tempBox = totalBox.clone().applyMatrix4(M);
        const curW = tempBox.max.x - tempBox.min.x;
        const curH = tempBox.max.y - tempBox.min.y;
        const curD = tempBox.max.z - tempBox.min.z;

        // Scale factor to exact base dimensions
        const realScaleX = this.baseDims.width / curW;
        const realScaleY = this.baseDims.height / curH;
        const realScaleZ = this.baseDims.depth / curD;

        const mScale = new THREE.Matrix4().makeScale(realScaleX, realScaleY, realScaleZ);
        const scaledBox = tempBox.clone().applyMatrix4(mScale);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);

        // Ground on floor Y = 0 and center X, Z
        const shift = new THREE.Matrix4().makeTranslation(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);
        const finalM = new THREE.Matrix4().multiply(shift).multiply(mScale).multiply(M);

        const solidGreyMaterial = new THREE.MeshStandardMaterial({
            color: this.activeConfig?.color || 0x64748b,
            roughness: 0.65,
            metalness: 0.05,
            transparent: false,
            opacity: 1.0,
            side: THREE.DoubleSide,
            depthWrite: true
        });

        const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0x334155,
            linewidth: 1
        });

        meshes.forEach(m => {
            m.geometry.applyMatrix4(finalM);
            m.geometry.computeBoundingBox();
            m.geometry.computeVertexNormals();

            m.position.set(0, 0, 0);
            m.rotation.set(0, 0, 0);
            m.scale.set(1, 1, 1);

            m.castShadow = true;
            m.receiveShadow = true;
            m.material = solidGreyMaterial.clone();

            if (this.activeConfig?.edges !== false) {
                try {
                    const eg = new THREE.EdgesGeometry(m.geometry, 28);
                    const line = new THREE.LineSegments(eg, edgeMaterial);
                    m.add(line);
                } catch(e) {}
            }

            this.customModelGroup.add(m);
        });

        this.customModelGroup.position.set(0, 0, 0);
        this.customModelGroup.rotation.set(0, 0, 0);
        this.customModelGroup.scale.set(1, 1, 1);
        this.scene.updateMatrixWorld(true);
    },

    // Procedural Parametric Carcass Generator
    buildParametricCarcass(w, h, d, vertCount, horizCount, options = {}) {
        const group = new THREE.Group();

        const T = Number(options.thickness) || 18;
        const hasPlinth = options.hasPlinth !== false;
        const plinthH = hasPlinth ? 80 : 0;
        const hasBack = options.hasBack !== false;

        const mainColor = options.color || 0x475569;
        const boardMat = new THREE.MeshStandardMaterial({
            color: mainColor,
            roughness: 0.65,
            metalness: 0.05,
            side: THREE.DoubleSide
        });

        const edgeMat = new THREE.LineBasicMaterial({
            color: 0x0f172a,
            linewidth: 1.5
        });

        const addBoard = (bw, bh, bd, x, y, z) => {
            const geo = new THREE.BoxGeometry(bw, bh, bd);
            const mesh = new THREE.Mesh(geo, boardMat);
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (options.edges !== false) {
                const edges = new THREE.EdgesGeometry(geo);
                const wire = new THREE.LineSegments(edges, edgeMat);
                mesh.add(wire);
            }

            group.add(mesh);
            return mesh;
        };

        const carcassH = h - plinthH;
        const innerH = carcassH - 2 * T;
        const innerCenterY = plinthH + T + innerH / 2;

        // 1. Боковина ліва
        addBoard(T, carcassH, d, -w / 2 + T / 2, plinthH + carcassH / 2, 0);

        // 2. Боковина права
        addBoard(T, carcassH, d, w / 2 - T / 2, plinthH + carcassH / 2, 0);

        // 3. Дно
        addBoard(w - 2 * T, T, d, 0, plinthH + T / 2, 0);

        // 4. Дах
        addBoard(w - 2 * T, T, d, 0, h - T / 2, 0);

        // 5. Цокольні планки
        if (hasPlinth && plinthH > 0) {
            addBoard(w - 2 * T, plinthH, T, 0, plinthH / 2, d / 2 - 30);
            addBoard(w - 2 * T, plinthH, T, 0, plinthH / 2, -d / 2 + 30);
        }

        // 6. Задня стінка (ДВП/ХДФ 4 мм)
        if (hasBack) {
            const backMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
            const backGeo = new THREE.BoxGeometry(w - 2 * T, innerH, 4);
            const backMesh = new THREE.Mesh(backGeo, backMat);
            backMesh.position.set(0, innerCenterY, -d / 2 + 3);
            group.add(backMesh);
        }

        // 7. Стійки вертикальні (N шт)
        const N = Math.max(0, parseInt(vertCount) || 0);
        const sectionCount = N + 1;
        const totalDividersThickness = N * T;
        const usefulWidth = (w - 2 * T) - totalDividersThickness;
        const sectionW = usefulWidth / sectionCount;
        const sectionCentersX = [];

        let currentLeft = -w / 2 + T;
        for (let s = 0; s < sectionCount; s++) {
            sectionCentersX.push(currentLeft + sectionW / 2);
            currentLeft += sectionW;
            if (s < N) {
                const divX = currentLeft + T / 2;
                addBoard(T, innerH, d - (hasBack ? 10 : 0), divX, innerCenterY, (hasBack ? 4 : 0));
                currentLeft += T;
            }
        }

        // 8. Горизонтальні полиці (M шт)
        const M = Math.max(0, parseInt(horizCount) || 0);
        if (M > 0) {
            const shelfDepth = d - (hasBack ? 20 : 10);
            const shelfZ = hasBack ? 5 : 0;

            if (N === 0) {
                const shelfGap = innerH / (M + 1);
                for (let i = 1; i <= M; i++) {
                    const sy = plinthH + T + i * shelfGap;
                    addBoard(w - 2 * T, T, shelfDepth, 0, sy, shelfZ);
                }
            } else {
                const shelvesPerSec = Math.floor(M / sectionCount);
                let remainder = M % sectionCount;

                for (let s = 0; s < sectionCount; s++) {
                    const countInThisSec = shelvesPerSec + (remainder > 0 ? 1 : 0);
                    if (remainder > 0) remainder--;

                    if (countInThisSec > 0) {
                        const gap = innerH / (countInThisSec + 1);
                        const scX = sectionCentersX[s];
                        for (let j = 1; j <= countInThisSec; j++) {
                            const sy = plinthH + T + j * gap;
                            addBoard(sectionW, T, shelfDepth, scX, sy, shelfZ);
                        }
                    }
                }
            }
        }

        return group;
    },

    // Rendering Parametric Carcass Model
    renderParametricModel(targetW, targetH, targetD, vertCount, horizCount) {
        if (!this.customModelGroup) return;

        const rawW = parseFloat(targetW) || 0;
        const rawH = parseFloat(targetH) || 0;
        const rawD = parseFloat(targetD) || this.baseDims.depth || 583;
        const vCount = Math.max(0, parseInt(vertCount) || 0);
        const hCount = Math.max(0, parseInt(horizCount) || 0);

        this.currentDims = { width: rawW, height: rawH, depth: rawD };
        this.currentVertCount = vCount;
        this.currentHorizCount = hCount;

        const emptyHint = document.getElementById('viewer3d-empty-hint');

        if (rawW <= 0 && rawH <= 0) {
            this.customModelGroup.visible = false;
            this.dimensionsGroup.visible = false;
            if (this.labelWidth) this.labelWidth.style.display = 'none';
            if (this.labelHeight) this.labelHeight.style.display = 'none';
            if (this.labelDepth) this.labelDepth.style.display = 'none';
            if (emptyHint) emptyHint.style.display = 'flex';
            if (this.badgeDims) {
                this.badgeDims.innerText = 'Габарити: введіть ширину або висоту...';
            }
            return;
        }

        if (emptyHint) emptyHint.style.display = 'none';
        this.customModelGroup.visible = true;

        // Clear previous meshes
        while (this.customModelGroup.children.length > 0) {
            const obj = this.customModelGroup.children[0];
            this.customModelGroup.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            obj.traverse(c => { if (c.geometry) c.geometry.dispose(); });
        }

        const effW = Math.max(200, rawW);
        const effH = Math.max(300, rawH);
        const effD = Math.max(150, rawD);

        const carcass = this.buildParametricCarcass(
            effW,
            effH,
            effD,
            vCount,
            hCount,
            {
                thickness: this.activeConfig?.thickness || 18,
                hasPlinth: this.activeConfig?.hasPlinth !== false,
                hasBack: this.activeConfig?.hasBack !== false,
                color: this.activeConfig?.color || 0x475569,
                edges: this.activeConfig?.edges !== false
            }
        );

        this.customModelGroup.add(carcass);
        this.customModelGroup.position.set(0, 0, 0);
        this.customModelGroup.rotation.set(0, 0, 0);
        this.customModelGroup.scale.set(1, 1, 1);
        this.scene.updateMatrixWorld(true);

        const finalBox = new THREE.Box3().setFromObject(this.customModelGroup);
        this.buildDimensionLinesFromBox(finalBox, rawW, rawH, effD);
        this.dimensionsGroup.visible = true;

        const strW = rawW > 0 ? `${Math.round(rawW)}` : '...';
        const strH = rawH > 0 ? `${Math.round(rawH)}` : '...';
        const strD = `${Math.round(effD)}`;
        const partitionInfo = (vCount > 0 || hCount > 0) ? ` | Стійок: ${vCount} шт, Полиць: ${hCount} шт` : '';
        if (this.badgeDims) {
            this.badgeDims.innerText = `Габарити: ${strW} × ${strH} × ${strD} мм${partitionInfo}`;
        }
    },

    // Real-time Elastic Sizing
    applyDimensions(targetW, targetH, targetD) {
        if (!this.customModelGroup || !this.baseDims.width) return;

        const rawW = parseFloat(targetW) || 0;
        const rawH = parseFloat(targetH) || 0;
        const rawD = parseFloat(targetD) || this.baseDims.depth || 583;

        this.currentDims = { width: rawW, height: rawH, depth: rawD };

        const emptyHint = document.getElementById('viewer3d-empty-hint');

        if (this.activeConfig?.type === 'static') {
            if (emptyHint) emptyHint.style.display = 'none';
            this.customModelGroup.visible = true;
            this.customModelGroup.scale.set(1, 1, 1);
            this.dimensionsGroup.visible = false;
            if (this.badgeDims) {
                this.badgeDims.innerText = `Габарити: ${this.baseDims.width} × ${this.baseDims.height} × ${this.baseDims.depth} мм`;
            }
            return;
        }

        // Elastic Mode:
        // "поки значення 0 то модельки не має"
        if (rawW <= 0 && rawH <= 0) {
            this.customModelGroup.visible = false;
            this.dimensionsGroup.visible = false;
            if (this.labelWidth) this.labelWidth.style.display = 'none';
            if (this.labelHeight) this.labelHeight.style.display = 'none';
            if (this.labelDepth) this.labelDepth.style.display = 'none';
            if (emptyHint) emptyHint.style.display = 'flex';
            if (this.badgeDims) {
                this.badgeDims.innerText = 'Габарити: введіть ширину або висоту...';
            }
            return;
        }

        // "потім коли ми починаємо вводити цифри моделька починає зявлятися по мірі введення данних"
        if (emptyHint) emptyHint.style.display = 'none';
        this.customModelGroup.visible = true;

        // Effective dimensions for 3D scaling (never zero to avoid collapsing geometry)
        const effW = rawW > 0 ? Math.max(40, rawW) : this.baseDims.width;
        const effH = rawH > 0 ? Math.max(40, rawH) : this.baseDims.height;
        const effD = rawD > 0 ? Math.max(40, rawD) : this.baseDims.depth;

        const sx = effW / this.baseDims.width;
        const sy = effH / this.baseDims.height;
        const sz = effD / this.baseDims.depth;

        this.customModelGroup.scale.set(sx, sy, sz);
        this.scene.updateMatrixWorld(true);

        const finalBox = new THREE.Box3().setFromObject(this.customModelGroup);
        this.buildDimensionLinesFromBox(finalBox, rawW, rawH, effD);
        this.dimensionsGroup.visible = true;

        const strW = rawW > 0 ? `${Math.round(rawW)}` : '...';
        const strH = rawH > 0 ? `${Math.round(rawH)}` : '...';
        const strD = `${Math.round(effD)}`;
        if (this.badgeDims) {
            this.badgeDims.innerText = `Габарити: ${strW} × ${strH} × ${strD} мм`;
        }
    },

    buildDimensionLinesFromBox(box, rawW, rawH, rawD) {
        while (this.dimensionsGroup.children.length > 0) {
            const obj = this.dimensionsGroup.children[0];
            this.dimensionsGroup.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
        }

        const size = new THREE.Vector3();
        box.getSize(size);
        const min = box.min;
        const max = box.max;
        const w = size.x;
        const h = size.y;
        const d = size.z;

        const dimLineMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2, depthTest: false });
        const dimArrowMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, depthTest: false });

        const addLine = (p1, p2) => {
            const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
            const line = new THREE.Line(geom, dimLineMat);
            line.renderOrder = 999;
            this.dimensionsGroup.add(line);
        };

        const arrowSize = Math.max(60, Math.min(w, h, d) * 0.04);
        const addArrow = (pos, dir) => {
            const cone = new THREE.ConeGeometry(arrowSize * 0.4, arrowSize, 12);
            const mesh = new THREE.Mesh(cone, dimArrowMat);
            mesh.position.copy(pos);
            mesh.renderOrder = 999;
            if (dir === 'left') mesh.rotation.z = Math.PI / 2;
            else if (dir === 'right') mesh.rotation.z = -Math.PI / 2;
            else if (dir === 'down') mesh.rotation.z = Math.PI;
            else if (dir === 'forward') mesh.rotation.x = Math.PI / 2;
            else if (dir === 'backward') mesh.rotation.x = -Math.PI / 2;
            this.dimensionsGroup.add(mesh);
        };

        const offset = Math.max(120, Math.max(w, h) * 0.08);
        const zFront = max.z + offset * 0.4;
        const topY = max.y + offset;

        // 1. Width Dimension
        addLine(new THREE.Vector3(min.x, topY, zFront), new THREE.Vector3(max.x, topY, zFront));
        addLine(new THREE.Vector3(min.x, max.y, zFront), new THREE.Vector3(min.x, topY + offset * 0.25, zFront));
        addLine(new THREE.Vector3(max.x, max.y, zFront), new THREE.Vector3(max.x, topY + offset * 0.25, zFront));
        addArrow(new THREE.Vector3(min.x + arrowSize / 2, topY, zFront), 'left');
        addArrow(new THREE.Vector3(max.x - arrowSize / 2, topY, zFront), 'right');

        // 2. Height Dimension
        const rightX = max.x + offset;
        addLine(new THREE.Vector3(rightX, min.y, zFront), new THREE.Vector3(rightX, max.y, zFront));
        addLine(new THREE.Vector3(max.x, min.y, zFront), new THREE.Vector3(rightX + offset * 0.25, min.y, zFront));
        addLine(new THREE.Vector3(max.x, max.y, zFront), new THREE.Vector3(rightX + offset * 0.25, max.y, zFront));
        addArrow(new THREE.Vector3(rightX, min.y + arrowSize / 2, zFront), 'down');
        addArrow(new THREE.Vector3(rightX, max.y - arrowSize / 2, zFront), 'up');

        // 3. Depth Dimension
        const leftX = min.x - offset;
        const botY = min.y;
        addLine(new THREE.Vector3(leftX, botY, min.z), new THREE.Vector3(leftX, botY, max.z));
        addLine(new THREE.Vector3(min.x, botY, min.z), new THREE.Vector3(leftX - offset * 0.25, botY, min.z));
        addLine(new THREE.Vector3(min.x, botY, max.z), new THREE.Vector3(leftX - offset * 0.25, botY, max.z));
        addArrow(new THREE.Vector3(leftX, botY, min.z + arrowSize / 2), 'backward');
        addArrow(new THREE.Vector3(leftX, botY, max.z - arrowSize / 2), 'forward');

        this.dimensionsGroup.userData.points = {
            widthCenter: new THREE.Vector3((min.x + max.x) / 2, topY + offset * 0.1, zFront),
            heightCenter: new THREE.Vector3(rightX + offset * 0.1, (min.y + max.y) / 2, zFront),
            depthCenter: new THREE.Vector3(leftX - offset * 0.1, botY, (min.z + max.z) / 2)
        };

        if (this.labelWidth) {
            this.labelWidth.innerText = rawW > 0 ? `Ш: ${Math.round(rawW)} мм` : `Ш: очікує...`;
            this.labelWidth.style.opacity = rawW > 0 ? '1' : '0.65';
        }
        if (this.labelHeight) {
            this.labelHeight.innerText = rawH > 0 ? `В: ${Math.round(rawH)} мм` : `В: очікує...`;
            this.labelHeight.style.opacity = rawH > 0 ? '1' : '0.65';
        }
        if (this.labelDepth) {
            this.labelDepth.innerText = `Г: ${Math.round(rawD)} мм`;
        }
    },

    updateScreenBadges() {
        if (!this.dimensionsGroup?.userData?.points || !this.isOpen || this.activeConfig?.type === 'static' || !this.customModelGroup?.visible) {
            if (this.labelWidth) this.labelWidth.style.display = 'none';
            if (this.labelHeight) this.labelHeight.style.display = 'none';
            if (this.labelDepth) this.labelDepth.style.display = 'none';
            return;
        }

        const pts = this.dimensionsGroup.userData.points;
        const viewport = document.getElementById('viewer3d-viewport-box');
        if (!viewport) return;

        const toScreen = (pos) => {
            const v = pos.clone();
            v.project(this.camera);
            const x = (v.x * 0.5 + 0.5) * viewport.clientWidth;
            const y = (-(v.y * 0.5) + 0.5) * viewport.clientHeight;
            return { x, y, visible: v.z < 1 };
        };

        const pW = toScreen(pts.widthCenter);
        if (this.labelWidth) {
            this.labelWidth.style.left = `${pW.x}px`;
            this.labelWidth.style.top = `${pW.y}px`;
            this.labelWidth.style.display = pW.visible ? 'block' : 'none';
        }

        const pH = toScreen(pts.heightCenter);
        if (this.labelHeight) {
            this.labelHeight.style.left = `${pH.x}px`;
            this.labelHeight.style.top = `${pH.y}px`;
            this.labelHeight.style.display = pH.visible ? 'block' : 'none';
        }

        const pD = toScreen(pts.depthCenter);
        if (this.labelDepth) {
            this.labelDepth.style.left = `${pD.x}px`;
            this.labelDepth.style.top = `${pD.y}px`;
            this.labelDepth.style.display = pD.visible ? 'block' : 'none';
        }
    },

    // Form Listener Link
    onFieldChanged(fieldId, val) {
        if (!this.isOpen || !this.activeConfig) return;
        if (this.activeConfig.type !== 'elastic' && this.activeConfig.type !== 'parametric') return;
        const b = this.activeConfig.bindings || {};

        const numVal = Math.max(0, parseFloat(val) || 0);

        let w = this.currentDims.width || 0;
        let h = this.currentDims.height || 0;
        let d = this.currentDims.depth || this.baseDims.depth || 583;
        let vCount = this.currentVertCount || 0;
        let hCount = this.currentHorizCount || 0;

        const fieldDef = window.Engine?.getFieldDef ? window.Engine.getFieldDef(fieldId) : null;
        const label = (fieldDef?.label || '').toLowerCase();

        const isWidth = b.widthField === fieldId || (b.widthLabelMatch && b.widthLabelMatch.some(m => label.includes(m))) || label.includes('ширина') || label.includes('width');
        const isHeight = b.heightField === fieldId || (b.heightLabelMatch && b.heightLabelMatch.some(m => label.includes(m))) || label.includes('висота') || label.includes('height');
        const isDepth = b.depthField === fieldId || (b.depthLabelMatch && b.depthLabelMatch.some(m => label.includes(m))) || label.includes('глибина') || label.includes('depth');
        const isVertical = b.verticalField === fieldId || (label.includes('стійка') && label.includes('вертикал')) || label.includes('перегород');
        const isHorizontal = b.horizontalField === fieldId || (label.includes('стійка') && label.includes('горизон')) || label.includes('полиц');

        if (isWidth) {
            w = numVal;
        } else if (isHeight) {
            h = numVal;
        } else if (isDepth) {
            d = numVal;
        } else if (isVertical) {
            vCount = parseInt(numVal) || 0;
        } else if (isHorizontal) {
            hCount = parseInt(numVal) || 0;
        } else {
            return;
        }

        const wasHidden = !this.customModelGroup.visible;

        if (this.activeConfig.type === 'parametric') {
            this.renderParametricModel(w, h, d, vCount, hCount);
        } else {
            this.applyDimensions(w, h, d);
        }

        if (wasHidden && this.customModelGroup.visible) {
            this.fitCameraToObject(this.customModelGroup);
        }
    },

    // Camera Views
    fitCameraToObject(object) {
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.6;

        this.camera.position.set(center.x + cameraZ * 0.8, center.y + cameraZ * 0.4, center.z + cameraZ);
        this.controls.target.copy(center);
        this.controls.update();
    },

    resetCamera() {
        if (!this.customModelGroup) return;
        this.fitCameraToObject(this.customModelGroup);
    },

    setFrontView() {
        const box = new THREE.Box3().setFromObject(this.customModelGroup);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const dist = Math.max(size.x, size.y) * 1.8;
        this.controls.target.copy(center);
        this.camera.position.set(center.x, center.y, center.z + dist);
        this.controls.update();
    },

    setIsometricView() {
        const box = new THREE.Box3().setFromObject(this.customModelGroup);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const dist = Math.max(size.x, size.y) * 1.5;
        this.controls.target.copy(center);
        this.camera.position.set(center.x + dist, center.y + dist * 0.8, center.z + dist);
        this.controls.update();
    },

    setModelColor(hex) {
        if (!this.customModelGroup) return;
        this.customModelGroup.traverse(child => {
            if (child.isMesh && child.material && child.material.isMeshStandardMaterial) {
                child.material.color.setHex(hex);
            }
        });
    },

    toggleExpand() {
        this.widgetEl.classList.toggle('expanded');
        this.widgetEl.classList.remove('minimized');
        setTimeout(() => this.onResize(), 320);
    },

    toggleMinimize() {
        this.widgetEl.classList.toggle('minimized');
        this.widgetEl.classList.remove('expanded');
    },

    close() {
        if (this.widgetEl) this.widgetEl.style.display = 'none';
        this.isOpen = false;
        this.updateTriggerButtons(false);
    },

    updateTriggerButtons(active) {
        document.querySelectorAll('.btn-3d-trigger').forEach(btn => {
            if (active) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }
};

window.Viewer3D = Viewer3D;
