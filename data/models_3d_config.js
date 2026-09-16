/**
 * ==============================================================================
 * КОНФІГУРАЦІЯ 3D-МОДЕЛЕЙ ДЛЯ КАЛЬКУЛЯТОРА (MODELS 3D CONFIG)
 * Автоматично згенеровано та оновлено через Менеджер 3D
 * ==============================================================================
 */

window.MODELS_3D_CONFIG = [
    {
        "id": "stand_parametric_carcass",
        "title": "🛠️ Параметричний каркас (Стійки + Полиці)",
        "schemaMatch": "data/schema_funktsional_na_furnitura_564",
        "targetGroup": "g1789481047588",
        "type": "elastic",
        "modelUrl": "../Модельки/ImageToStl.com_Стіна.gltf",
        "baseDims": {
            "width": 3000,
            "height": 2400,
            "depth": 583
        },
        "bindings": {
            "widthField": "f1789479447252",
            "heightField": "f1789479695285",
            "verticalField": "f1789481114025",
            "horizontalField": "f1789481134462",
            "defaultDepth": 583
        },
        "hasPlinth": true,
        "hasBack": true,
        "thickness": 18,
        "color": 4675945,
        "edges": true
    },
    {
        "id": "stand_wall_funkc",
        "title": "3D Стенд корпусу (GLTF Стіна)",
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
