/**
 * ==============================================================================
 * КОНФІГУРАЦІЯ 3D-МОДЕЛЕЙ ДЛЯ КАЛЬКУЛЯТОРА (MODELS 3D CONFIG)
 * Автоматично згенеровано та оновлено через Менеджер 3D
 * ==============================================================================
 */

window.MODELS_3D_CONFIG = [
    {
        "id": "stand_wall_funkc",
        "title": "3D Стенд корпусу (Стіна)",
        "schemaMatch": "*",
        "targetGroup": "g_main",
        "type": "elastic",
        "modelUrl": "../Модельки/ImageToStl.com_Стіна.gltf",
        "baseDims": {
            "width": 5256,
            "height": 2548,
            "depth": 583
        },
        "bindings": {
            "widthField": "f1789479447252",
            "heightField": "f1789479695285",
            "defaultDepth": 583
        },
        "color": 6583435,
        "edges": true
    },
    {
        "id": "stand_wall_universal",
        "title": "3D Стенд (Основні параметри)",
        "schemaMatch": "*",
        "targetGroup": "g_main",
        "type": "elastic",
        "modelUrl": "../Модельки/ImageToStl.com_Стіна.gltf",
        "baseDims": {
            "width": 5256,
            "height": 2548,
            "depth": 583
        },
        "bindings": {
            "widthField": "",
            "heightField": "",
            "defaultDepth": 583
        },
        "color": 6583435,
        "edges": true
    }
];

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
