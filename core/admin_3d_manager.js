/**
 * ==============================================================================
 * ADMIN 3D MANAGER (Менеджер 3D-Моделей для Адмін-панелі)
 * ==============================================================================
 */

(function () {
    let m3dScene = null;
    let m3dCamera = null;
    let m3dRenderer = null;
    let m3dControls = null;
    let m3dCurrentModelGroup = null;
    let m3dDimLinesGroup = null;
    let m3dAnimId = null;

    let m3dSelectedId = null;
    let m3dIsInitialized = false;

    // Поточні тестові габарити (мм)
    let m3dTestDims = {
        width: 5256,
        height: 2548,
        depth: 583
    };

    // Відкриття модального вікна менеджера
    window.open3DManagerModal = function () {
        const modal = document.getElementById('modal3DManager');
        if (!modal) return;
        modal.style.display = 'flex';

        // Ініціалізація сцени при першому відкритті
        if (!m3dIsInitialized) {
            initThreeScene();
            m3dIsInitialized = true;
        }

        // Оновлюємо селекти схем та груп
        m3dPopulateDropdowns();

        // Рендеримо список моделей
        m3dRenderModelsList();

        // Вибираємо першу модель або поточну
        const list = window.MODELS_3D_CONFIG || [];
        if (list.length > 0) {
            const idToSelect = m3dSelectedId || list[0].id;
            m3dSelectModel(idToSelect);
        } else {
            m3dAddNewModel();
        }

        // Оновлюємо розмір рендера під контейнер
        setTimeout(() => {
            onResizeCanvas();
        }, 150);
    };

    // Ініціалізація сцени Three.js
    function initThreeScene() {
        const container = document.getElementById('m3dCanvasContainer');
        if (!container) return;

        const w = container.clientWidth || 600;
        const h = container.clientHeight || 450;

        // Сцена
        m3dScene = new THREE.Scene();
        m3dScene.background = new THREE.Color(0x0b1329);

        // Камера
        m3dCamera = new THREE.PerspectiveCamera(40, w / h, 10, 50000);
        m3dCamera.position.set(4000, 2500, 5500);

        // Рендерер
        m3dRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        m3dRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        m3dRenderer.setSize(w, h);
        m3dRenderer.shadowMap.enabled = true;
        m3dRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
        m3dRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        m3dRenderer.toneMappingExposure = 1.15;

        container.appendChild(m3dRenderer.domElement);

        // Контроли (OrbitControls)
        if (typeof THREE.OrbitControls !== 'undefined') {
            m3dControls = new THREE.OrbitControls(m3dCamera, m3dRenderer.domElement);
            m3dControls.enableDamping = true;
            m3dControls.dampingFactor = 0.08;
            m3dControls.maxPolarAngle = Math.PI / 2 + 0.05; // не падати під підлогу
            m3dControls.minDistance = 200;
            m3dControls.maxDistance = 35000;
            m3dControls.target.set(0, 1200, 0);
        }

        // Освітлення
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        m3dScene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.6);
        hemiLight.position.set(0, 5000, 0);
        m3dScene.add(hemiLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
        keyLight.position.set(4000, 6000, 5000);
        m3dScene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
        fillLight.position.set(-4000, 3000, -3000);
        m3dScene.add(fillLight);

        // Підлога та сітка
        const grid = new THREE.GridHelper(10000, 40, 0x334155, 0x1e293b);
        grid.position.y = 0;
        m3dScene.add(grid);

        // Група для ліній розмірів
        m3dDimLinesGroup = new THREE.Group();
        m3dScene.add(m3dDimLinesGroup);

        // Слухач зміни розмірів
        window.addEventListener('resize', onResizeCanvas);

        // Цикл анімації
        animate();
    }

    function onResizeCanvas() {
        const container = document.getElementById('m3dCanvasContainer');
        if (!container || !m3dRenderer || !m3dCamera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;

        m3dCamera.aspect = w / h;
        m3dCamera.updateProjectionMatrix();
        m3dRenderer.setSize(w, h);
    }

    function animate() {
        m3dAnimId = requestAnimationFrame(animate);
        if (m3dControls) m3dControls.update();
        if (m3dRenderer && m3dScene && m3dCamera) {
            m3dRenderer.render(m3dScene, m3dCamera);
        }
    }

    // Заповнення випадаючих списків схем та груп
    window.m3dPopulateDropdowns = function () {
        const schemaSelect = document.getElementById('m3dSchema');
        const groupSelect = document.getElementById('m3dGroup');
        const widthSelect = document.getElementById('m3dWidthField');
        const heightSelect = document.getElementById('m3dHeightField');

        if (!schemaSelect) return;

        // 1. Схеми калькуляторів
        schemaSelect.innerHTML = '<option value="*">⭐ Будь-яка схема (*)</option>';
        if (window.CalculatorConfig && Array.isArray(window.CalculatorConfig)) {
            window.CalculatorConfig.forEach(conf => {
                if (conf.items && conf.items.length > 0) {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = (conf.icon || '') + ' ' + conf.title;
                    conf.items.forEach(sub => {
                        const opt = document.createElement('option');
                        const baseFile = (sub.file || '').replace('../data/', '').replace('.js', '');
                        opt.value = baseFile;
                        opt.textContent = (sub.icon || '') + ' ' + sub.title;
                        optgroup.appendChild(opt);
                    });
                    schemaSelect.appendChild(optgroup);
                } else if (conf.file) {
                    const opt = document.createElement('option');
                    const baseFile = (conf.file || '').replace('../data/', '').replace('.js', '');
                    opt.value = baseFile;
                    opt.textContent = (conf.icon || '') + ' ' + conf.title;
                    schemaSelect.appendChild(opt);
                }
            });
        }

        // 2. Групи поточної схеми
        if (groupSelect && window.Schema && window.Schema.groups) {
            groupSelect.innerHTML = '<option value="">-- Оберіть цільову групу --</option>';
            window.Schema.groups.forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.id;
                opt.textContent = `📁 ${g.title} (${g.id})`;
                groupSelect.appendChild(opt);
            });
        }

        // 3. Поля поточної схеми (для ширини, висоти, вертикальних стійок та полиць)
        const vertSelect = document.getElementById('m3dVerticalField');
        const horizSelect = document.getElementById('m3dHorizontalField');

        if (window.Schema && window.Schema.fields) {
            if (widthSelect) widthSelect.innerHTML = '<option value="">-- Автовизначення або виберіть --</option>';
            if (heightSelect) heightSelect.innerHTML = '<option value="">-- Автовизначення або виберіть --</option>';
            if (vertSelect) vertSelect.innerHTML = '<option value="">-- Оберіть поле для верт. стійок --</option>';
            if (horizSelect) horizSelect.innerHTML = '<option value="">-- Оберіть поле для гориз. полиць --</option>';

            window.Schema.fields.forEach(f => {
                if (widthSelect) {
                    const opt = document.createElement('option');
                    opt.value = f.id;
                    opt.textContent = `${f.label} (${f.id})`;
                    widthSelect.appendChild(opt);
                }
                if (heightSelect) {
                    const opt = document.createElement('option');
                    opt.value = f.id;
                    opt.textContent = `${f.label} (${f.id})`;
                    heightSelect.appendChild(opt);
                }
                if (vertSelect) {
                    const opt = document.createElement('option');
                    opt.value = f.id;
                    opt.textContent = `${f.label} (${f.id})`;
                    vertSelect.appendChild(opt);
                }
                if (horizSelect) {
                    const opt = document.createElement('option');
                    opt.value = f.id;
                    opt.textContent = `${f.label} (${f.id})`;
                    horizSelect.appendChild(opt);
                }
            });
        }
    };

    // Рендеринг списку моделей у лівій панелі
    window.m3dRenderModelsList = function () {
        const container = document.getElementById('m3dListContainer');
        if (!container) return;
        container.innerHTML = '';

        const list = window.MODELS_3D_CONFIG || [];

        list.forEach((item, idx) => {
            const isSelected = item.id === m3dSelectedId;
            const card = document.createElement('div');
            card.style.cssText = `
                padding: 10px 12px;
                border-radius: 8px;
                background: ${isSelected ? '#eff6ff' : '#f8fafc'};
                border: 1.5px solid ${isSelected ? '#3b82f6' : '#e2e8f0'};
                cursor: pointer;
                transition: 0.15s;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
            `;

            const isElastic = item.type === 'elastic';
            const badgeBg = isElastic ? '#e0f2fe' : '#fef3c7';
            const badgeColor = isElastic ? '#0369a1' : '#92400e';
            const badgeText = isElastic ? '📐 Еластична' : '🔍 Статична';

            card.innerHTML = `
                <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 700; font-size: 13px; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${item.title || 'Без назви'}
                    </div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                        Схема: <b>${item.schemaMatch || '*'}</b> | Група: <b>${item.targetGroup || '—'}</b>
                    </div>
                </div>
                <div style="font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 12px; background: ${badgeBg}; color: ${badgeColor}; white-space: nowrap;">
                    ${badgeText}
                </div>
            `;

            card.onclick = () => {
                m3dSelectModel(item.id);
            };

            container.appendChild(card);
        });
    };

    // Вибір моделі зі списку
    window.m3dSelectModel = function (id) {
        m3dSelectedId = id;
        m3dRenderModelsList();

        const item = (window.MODELS_3D_CONFIG || []).find(m => m.id === id);
        if (!item) return;

        // Заповнюємо форму
        document.getElementById('m3dId').value = item.id || '';
        document.getElementById('m3dTitle').value = item.title || '';
        document.getElementById('m3dSchema').value = item.schemaMatch || '*';
        document.getElementById('m3dGroup').value = item.targetGroup || '';
        document.getElementById('m3dType').value = item.type || 'elastic';
        document.getElementById('m3dEdges').value = item.edges !== false ? 'true' : 'false';
        document.getElementById('m3dUrl').value = item.modelUrl || '';

        const base = item.baseDims || { width: 5256, height: 2548, depth: 583 };
        document.getElementById('m3dBaseW').value = base.width || 5256;
        document.getElementById('m3dBaseH').value = base.height || 2548;
        document.getElementById('m3dBaseD').value = base.depth || 583;

        const bindings = item.bindings || {};
        document.getElementById('m3dWidthField').value = bindings.widthField || '';
        document.getElementById('m3dHeightField').value = bindings.heightField || '';

        m3dOnTypeChange();

        // Оновлюємо тестові слайдери габаритів під базові цієї моделі
        m3dTestDims.width = Number(base.width) || 5256;
        m3dTestDims.height = Number(base.height) || 2548;
        m3dTestDims.depth = Number(base.depth) || 583;

        syncSlidersUI();

        // Завантажуємо модель у 3D прев'ю
        m3dLoadCurrentIntoPreview();
    };

    // Додавання нової моделі
    window.m3dAddNewModel = function () {
        const newId = 'stand_model_' + Date.now();
        const newModel = {
            id: newId,
            title: "Новий 3D Стенд",
            schemaMatch: "*",
            targetGroup: "g_main",
            type: "elastic",
            modelUrl: "../Модельки/ImageToStl.com_Стіна.gltf",
            baseDims: {
                width: 5256,
                height: 2548,
                depth: 583
            },
            bindings: {
                widthField: "",
                heightField: "",
                defaultDepth: 583
            },
            color: 0x64748b,
            edges: true
        };

        if (!window.MODELS_3D_CONFIG) window.MODELS_3D_CONFIG = [];
        window.MODELS_3D_CONFIG.push(newModel);

        m3dSelectedId = newId;
        m3dRenderModelsList();
        m3dSelectModel(newId);
    };

    // Видалення поточної моделі
    window.m3dDeleteCurrentModel = function () {
        if (!confirm('Видалити цю 3D модель зі списку конфігурацій?')) return;

        const idx = (window.MODELS_3D_CONFIG || []).findIndex(m => m.id === m3dSelectedId);
        if (idx !== -1) {
            window.MODELS_3D_CONFIG.splice(idx, 1);
        }

        m3dSelectedId = (window.MODELS_3D_CONFIG && window.MODELS_3D_CONFIG.length > 0)
            ? window.MODELS_3D_CONFIG[0].id
            : null;

        m3dRenderModelsList();
        if (m3dSelectedId) {
            m3dSelectModel(m3dSelectedId);
        } else {
            m3dAddNewModel();
        }
    };

    // Зміна типу моделі (elastic vs static)
    window.m3dOnTypeChange = function () {
        const type = document.getElementById('m3dType').value;
        const elasticBox = document.getElementById('m3dElasticSettings');
        if (elasticBox) {
            elasticBox.style.display = (type === 'elastic') ? 'block' : 'none';
        }
    };

    // Збереження форми у поточну модель (в пам'ять)
    window.m3dSaveCurrentModel = function () {
        const id = document.getElementById('m3dId').value || ('stand_model_' + Date.now());
        const item = (window.MODELS_3D_CONFIG || []).find(m => m.id === id);
        if (!item) return;

        item.title = document.getElementById('m3dTitle').value.trim();
        item.schemaMatch = document.getElementById('m3dSchema').value;
        item.targetGroup = document.getElementById('m3dGroup').value;
        item.type = document.getElementById('m3dType').value;
        item.edges = document.getElementById('m3dEdges').value === 'true';
        item.modelUrl = document.getElementById('m3dUrl').value.trim();

        item.baseDims = {
            width: Number(document.getElementById('m3dBaseW').value) || 5256,
            height: Number(document.getElementById('m3dBaseH').value) || 2548,
            depth: Number(document.getElementById('m3dBaseD').value) || 583
        };

        item.bindings = {
            widthField: document.getElementById('m3dWidthField').value,
            heightField: document.getElementById('m3dHeightField').value,
            defaultDepth: item.baseDims.depth
        };

        m3dRenderModelsList();
        m3dLoadCurrentIntoPreview();

        const badge = document.getElementById('m3dStatusBadge');
        if (badge) {
            badge.innerText = 'Зміни моделі застосовано!';
            badge.style.background = 'rgba(16, 185, 129, 0.25)';
            badge.style.color = '#34d399';
            setTimeout(() => {
                badge.innerText = 'Готово';
                badge.style.background = 'rgba(2, 132, 199, 0.25)';
                badge.style.color = '#38bdf8';
            }, 2500);
        }
    };

    // Завантаження моделі у 3D сцену
    window.m3dLoadCurrentIntoPreview = function () {
        if (!m3dScene) return;

        const item = (window.MODELS_3D_CONFIG || []).find(m => m.id === m3dSelectedId);
        if (!item) return;

        const badge = document.getElementById('m3dStatusBadge');
        if (badge) {
            badge.innerText = '⏳ Завантаження...';
            badge.style.background = 'rgba(245, 158, 11, 0.25)';
            badge.style.color = '#fbbf24';
        }

        const titleEl = document.getElementById('m3dPreviewTitle');
        if (titleEl) titleEl.innerText = item.title || '3D Огляд';

        // Очищаємо попередню модель
        if (m3dCurrentModelGroup) {
            m3dScene.remove(m3dCurrentModelGroup);
            m3dCurrentModelGroup = null;
        }

        const url = item.modelUrl;
        if (!url) {
            if (badge) badge.innerText = '⚠️ Немає URL';
            return;
        }

        // Визначаємо завантажувач
        const isGlb = url.toLowerCase().endsWith('.glb') || url.toLowerCase().endsWith('.gltf');
        const isObj = url.toLowerCase().endsWith('.obj');

        const tryFallbackMemory = () => {
            if (window.TEST_STAND_GLTF && isGlb) {
                try {
                    const loader = new THREE.GLTFLoader();
                    loader.parse(JSON.stringify(window.TEST_STAND_GLTF), '', (loadedMem) => {
                        setupLoadedObject(loadedMem.scene, item);
                        if (badge) {
                            badge.innerText = '✅ Завантажено (Резерв)';
                            badge.style.background = 'rgba(16, 185, 129, 0.25)';
                            badge.style.color = '#34d399';
                        }
                    });
                } catch(e) {
                    console.warn('m3d: Memory fallback failed', e);
                }
            } else {
                const fallbackGroup = createParametricFallback(item);
                setupLoadedObject(fallbackGroup, item);
                if (badge) {
                    badge.innerText = '📦 Каркас (Тест)';
                    badge.style.background = 'rgba(148, 163, 184, 0.25)';
                    badge.style.color = '#94a3b8';
                }
            }
        };

        if (isGlb && typeof THREE.GLTFLoader !== 'undefined') {
            const loader = new THREE.GLTFLoader();
            loader.load(
                url,
                (gltf) => {
                    setupLoadedObject(gltf.scene, item);
                    if (badge) {
                        badge.innerText = '✅ Завантажено';
                        badge.style.background = 'rgba(16, 185, 129, 0.25)';
                        badge.style.color = '#34d399';
                    }
                },
                undefined,
                (err) => {
                    console.warn('m3d: Помилка первинного шляху GLTF, спроба відносного шляху...', url);
                    if (url.startsWith('../')) {
                        const altUrl = url.replace('../', '');
                        loader.load(altUrl, (gltfAlt) => {
                            setupLoadedObject(gltfAlt.scene, item);
                            if (badge) {
                                badge.innerText = '✅ Завантажено';
                                badge.style.background = 'rgba(16, 185, 129, 0.25)';
                                badge.style.color = '#34d399';
                            }
                        }, undefined, () => tryFallbackMemory());
                    } else {
                        tryFallbackMemory();
                    }
                }
            );
        } else if (isObj && typeof THREE.OBJLoader !== 'undefined') {
            const loader = new THREE.OBJLoader();
            loader.load(
                url,
                (obj) => {
                    setupLoadedObject(obj, item);
                    if (badge) {
                        badge.innerText = '✅ Завантажено (OBJ)';
                        badge.style.background = 'rgba(16, 185, 129, 0.25)';
                        badge.style.color = '#34d399';
                    }
                },
                undefined,
                (err) => {
                    console.error('Помилка завантаження OBJ:', err);
                    tryFallbackMemory();
                }
            );
        } else {
            tryFallbackMemory();
        }
    };

    function setupLoadedObject(model, config) {
        m3dCurrentModelGroup = new THREE.Group();

        const base = config.baseDims || { width: 5256, height: 2548, depth: 583 };

        const meshes = [];
        model.traverse(child => {
            if (child.isMesh && child.geometry) meshes.push(child);
        });

        if (meshes.length > 0) {
            // Розраховуємо первинний bounding box моделі
            const totalBox = new THREE.Box3();
            meshes.forEach(m => {
                m.geometry.computeBoundingBox();
                totalBox.union(m.geometry.boundingBox);
            });

            const rawSize = new THREE.Vector3();
            totalBox.getSize(rawSize);
            const rawCenter = new THREE.Vector3();
            totalBox.getCenter(rawCenter);

            // Орієнтація: якщо Z-up (CAD/STL конвертери: висота Y менша за глибину Z)
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
            const curW = Math.max(1, tempBox.max.x - tempBox.min.x);
            const curH = Math.max(1, tempBox.max.y - tempBox.min.y);
            const curD = Math.max(1, tempBox.max.z - tempBox.min.z);

            // Масштабуємо у точні міліметри базових габаритів
            const realScaleX = (base.width || 5256) / curW;
            const realScaleY = (base.height || 2548) / curH;
            const realScaleZ = (base.depth || 583) / curD;

            const mScale = new THREE.Matrix4().makeScale(realScaleX, realScaleY, realScaleZ);
            const scaledBox = tempBox.clone().applyMatrix4(mScale);
            const scaledCenter = new THREE.Vector3();
            scaledBox.getCenter(scaledCenter);

            // Вирівнюємо на підлогу (Y = 0) та центруємо по X, Z
            const shift = new THREE.Matrix4().makeTranslation(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);
            const finalM = new THREE.Matrix4().multiply(shift).multiply(mScale).multiply(M);

            const solidMaterial = new THREE.MeshStandardMaterial({
                color: config.color || 0x64748b,
                roughness: 0.65,
                metalness: 0.05,
                side: THREE.DoubleSide
            });

            const edgeMaterial = new THREE.LineBasicMaterial({
                color: 0x1e293b,
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
                m.material = solidMaterial.clone();

                if (config.edges !== false) {
                    try {
                        const eg = new THREE.EdgesGeometry(m.geometry, 25);
                        const wire = new THREE.LineSegments(eg, edgeMaterial);
                        m.add(wire);
                    } catch (e) {}
                }

                m3dCurrentModelGroup.add(m);
            });
        } else {
            m3dCurrentModelGroup.add(model);
        }

        m3dScene.add(m3dCurrentModelGroup);
        m3dCurrentModelGroup.userData.baseDims = { ...base };

        // Застосовуємо масштабування повзунків
        m3dApplyScaling();

        // Центруємо камеру навколо моделі на ідеальну відстань (заповнює 75% огляду)
        fitCameraToObject(m3dCurrentModelGroup);
    }

    function fitCameraToObject(object) {
        if (!m3dCamera || !m3dControls || !object) return;
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = m3dCamera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.35; // Комфортний відступ камери

        m3dCamera.position.set(center.x + cameraZ * 0.75, center.y + cameraZ * 0.35, center.z + cameraZ * 0.95);
        m3dControls.target.set(center.x, center.y, center.z);
        m3dControls.update();
    }

    // Створення демонстраційного каркасу, якщо файл відсутній
    function createParametricFallback(config) {
        const base = config.baseDims || { width: 5256, height: 2548, depth: 583 };
        const group = new THREE.Group();

        const mat = new THREE.MeshStandardMaterial({
            color: 0x475569,
            roughness: 0.5,
            metalness: 0.1
        });

        const geo = new THREE.BoxGeometry(base.width, base.height, base.depth);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = base.height / 2;

        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(geo),
            new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
        );
        mesh.add(edges);

        group.add(mesh);
        return group;
    }

    // Застосування масштабування від тестових слайдерів
    function m3dApplyScaling() {
        if (!m3dCurrentModelGroup) return;

        const base = m3dCurrentModelGroup.userData.baseDims || { width: 5256, height: 2548, depth: 583 };
        const scaleX = (m3dTestDims.width || base.width) / base.width;
        const scaleY = (m3dTestDims.height || base.height) / base.height;
        const scaleZ = (m3dTestDims.depth || base.depth) / base.depth;

        m3dCurrentModelGroup.scale.set(scaleX, scaleY, scaleZ);

        // Оновлюємо бейдж
        const bW = document.getElementById('m3dBadgeW');
        const bH = document.getElementById('m3dBadgeH');
        const bD = document.getElementById('m3dBadgeD');
        if (bW) bW.innerText = Math.round(m3dTestDims.width);
        if (bH) bH.innerText = Math.round(m3dTestDims.height);
        if (bD) bD.innerText = Math.round(m3dTestDims.depth);

        // Оновлюємо розмірні стрілки в 3D сцені
        updateDimensionLines(m3dTestDims.width, m3dTestDims.height, m3dTestDims.depth);
    }

    // Малювання ліній розмірів у 3D
    function updateDimensionLines(w, h, d) {
        if (!m3dDimLinesGroup) return;
        m3dDimLinesGroup.clear();

        const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });

        const halfW = w / 2;
        const halfD = d / 2;

        // 1. Лінія Ширини (перед виробом зверху або знизу)
        const wY = 20;
        const wZ = halfD + 180;
        const wGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-halfW, wY, wZ),
            new THREE.Vector3(halfW, wY, wZ)
        ]);
        m3dDimLinesGroup.add(new THREE.Line(wGeo, lineMat));

        // Виноски для ширини
        const wExtL = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-halfW, wY, halfD + 20),
            new THREE.Vector3(-halfW, wY, wZ + 50)
        ]);
        const wExtR = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(halfW, wY, halfD + 20),
            new THREE.Vector3(halfW, wY, wZ + 50)
        ]);
        m3dDimLinesGroup.add(new THREE.Line(wExtL, lineMat));
        m3dDimLinesGroup.add(new THREE.Line(wExtR, lineMat));

        // 2. Лінія Висоти (справа від виробу)
        const hX = halfW + 180;
        const hZ = 0;
        const hGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(hX, 0, hZ),
            new THREE.Vector3(hX, h, hZ)
        ]);
        m3dDimLinesGroup.add(new THREE.Line(hGeo, lineMat));

        // Виноски висоти
        const hExtB = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(halfW + 20, 0, hZ),
            new THREE.Vector3(hX + 50, 0, hZ)
        ]);
        const hExtT = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(halfW + 20, h, hZ),
            new THREE.Vector3(hX + 50, h, hZ)
        ]);
        m3dDimLinesGroup.add(new THREE.Line(hExtB, lineMat));
        m3dDimLinesGroup.add(new THREE.Line(hExtT, lineMat));
    }

    // Слухач рухів повзунків
    window.m3dOnSliderInput = function () {
        const sW = document.getElementById('m3dSliderW');
        const sH = document.getElementById('m3dSliderH');
        const sD = document.getElementById('m3dSliderD');

        m3dTestDims.width = Number(sW.value);
        m3dTestDims.height = Number(sH.value);
        m3dTestDims.depth = Number(sD.value);

        document.getElementById('m3dValW').innerText = m3dTestDims.width + ' мм';
        document.getElementById('m3dValH').innerText = m3dTestDims.height + ' мм';
        document.getElementById('m3dValD').innerText = m3dTestDims.depth + ' мм';

        m3dApplyScaling();
    };

    function syncSlidersUI() {
        const sW = document.getElementById('m3dSliderW');
        const sH = document.getElementById('m3dSliderH');
        const sD = document.getElementById('m3dSliderD');

        if (sW) {
            sW.value = m3dTestDims.width;
            document.getElementById('m3dValW').innerText = m3dTestDims.width + ' мм';
        }
        if (sH) {
            sH.value = m3dTestDims.height;
            document.getElementById('m3dValH').innerText = m3dTestDims.height + ' мм';
        }
        if (sD) {
            sD.value = m3dTestDims.depth;
            document.getElementById('m3dValD').innerText = m3dTestDims.depth + ' мм';
        }
    }

    // Скидання повзунків до базових значень моделі
    window.m3dResetTestSliders = function () {
        const item = (window.MODELS_3D_CONFIG || []).find(m => m.id === m3dSelectedId);
        if (!item) return;

        const base = item.baseDims || { width: 5256, height: 2548, depth: 583 };
        m3dTestDims.width = base.width;
        m3dTestDims.height = base.height;
        m3dTestDims.depth = base.depth;

        syncSlidersUI();
        m3dApplyScaling();
    };

    // Скидання ракурсу камери
    window.m3dResetCamera = function () {
        if (m3dCurrentModelGroup) {
            fitCameraToObject(m3dCurrentModelGroup);
        }
    };

    // Збереження ВСІЄЇ конфігурації у файл models_3d_config.js
    window.m3dSaveConfigFile = async function () {
        // Спочатку синхронізуємо поточну форму
        m3dSaveCurrentModel();

        const configJson = JSON.stringify(window.MODELS_3D_CONFIG, null, 4);

        const fileContent = `/**
 * ==============================================================================
 * КОНФІГУРАЦІЯ 3D-МОДЕЛЕЙ ДЛЯ КАЛЬКУЛЯТОРА (MODELS 3D CONFIG)
 * Автоматично згенеровано та оновлено через Менеджер 3D
 * ==============================================================================
 */

window.MODELS_3D_CONFIG = ${configJson};

// Допоміжна функція пошуку конфігурації для поточної схеми / групи
window.find3DModelConfig = function(currentSchemaConfigName, groupId, fieldId, fieldValue) {
    if (!window.MODELS_3D_CONFIG || !Array.isArray(window.MODELS_3D_CONFIG)) return null;

    const schemaStr = String(currentSchemaConfigName || '').toLowerCase();

    for (const cfg of window.MODELS_3D_CONFIG) {
        const matchSchema = cfg.schemaMatch === '*' || schemaStr.includes(cfg.schemaMatch.toLowerCase());
        if (!matchSchema) continue;

        if (groupId && cfg.targetGroup === groupId) {
            return cfg;
        }

        if (fieldId && cfg.targetField === fieldId) {
            if (!cfg.targetValue || cfg.targetValue === fieldValue) {
                return cfg;
            }
        }
    }

    return null;
};
`;

        const filename = 'data/models_3d_config.js';

        // 1. Спроба зберегти через локальний сервер (Python server 5005)
        try {
            const resp = await fetch('http://localhost:5005', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: filename, content: fileContent })
            });
            if (resp.ok) {
                alert('✅ Конфігурацію 3D-моделей успішно збережено у models_3d_config.js!');
                return;
            }
        } catch (e) {
            console.log('Локальний сервер не відповідає, переходимо до резервного збереження.');
        }

        // 2. Резервний варіант: вибір файлу через браузер
        try {
            if (window.showSaveFilePicker) {
                const handle = await window.showSaveFilePicker({
                    suggestedName: 'models_3d_config.js',
                    types: [{ accept: { 'text/javascript': ['.js'] } }]
                });
                const writ = await handle.createWritable();
                await writ.write(fileContent);
                await writ.close();
                alert('✅ Файл models_3d_config.js збережено!');
                return;
            }
        } catch (e) {
            if (e.name === 'AbortError') return;
        }

        // 3. Пряме завантаження через Blob
        const blob = new Blob([fileContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'models_3d_config.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        alert('✅ Файл models_3d_config.js підготовлено до збереження!');
    };

})();
