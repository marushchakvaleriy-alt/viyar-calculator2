/**
 * Sample Schema
 * Default calculator schema for Vpoint V3
 * @version 3.0.0
 */
const Schema = {
    "meta": {
        "version": "3.0",
        "title": "Демо Калькулятор",
        "lastUpdated": "2025-12-26"
    },
    "categories": {
        "cat_construction": {
            "name": "Конструювання",
            "color": "#3b82f6"
        },
        "cat_assembly": {
            "name": "Збірка",
            "color": "#10b981"
        },
        "cat_installation": {
            "name": "Монтаж",
            "color": "#f59e0b"
        }
    },
    "processes": [
        { "id": "pr_c1", "name": "Креслення", "category": "cat_construction" },
        { "id": "pr_c2", "name": "Моделювання", "category": "cat_construction" },
        { "id": "pr_a1", "name": "Збірка", "category": "cat_assembly" },
        { "id": "pr_a2", "name": "Контроль", "category": "cat_assembly" },
        { "id": "pr_i1", "name": "Монтаж", "category": "cat_installation" },
        { "id": "pr_i2", "name": "Пуско-наладка", "category": "cat_installation" }
    ],
    "groups": [
        { "id": "g_main", "title": "Основні параметри" },
        { "id": "g_options", "title": "Опції" }
    ],
    "fields": [
        { "id": "f_modules", "type": "number", "label": "Кількість модулів", "groupId": "g_main", "default": 1 },
        { "id": "f_drawers", "type": "number", "label": "Кількість ящиків", "groupId": "g_main", "default": 0 },
        {
            "id": "f_material", "type": "select", "label": "Матеріал", "groupId": "g_main",
            "options": [
                { "value": "laminate", "label": "Ламіноване ДСП" },
                { "value": "mdf", "label": "МДФ фарбований" },
                { "value": "solid", "label": "Масив дерева" }
            ]
        },
        { "id": "f_soft_close", "type": "checkbox", "label": "Доводчики", "groupId": "g_options" },
        { "id": "f_lighting", "type": "checkbox_qty", "label": "Підсвітка", "groupId": "g_options", "default": 0 }
    ],
    "rules": {
        "f_modules": {
            "pr_c1": 15,
            "pr_c2": 20,
            "pr_a1": "=@qty * 10",
            "pr_i1": "=@qty * 5"
        },
        "f_drawers": {
            "pr_c1": 5,
            "pr_c2": 10,
            "pr_a1": "=@qty * 8",
            "pr_a2": "=@qty * 3",
            "pr_i1": "=@qty * 2"
        },
        "f_material": {
            "laminate": { "pr_c1": 0, "pr_c2": 0 },
            "mdf": { "pr_c1": 10, "pr_c2": 15 },
            "solid": { "pr_c1": 25, "pr_c2": 30 }
        },
        "f_soft_close": {
            "pr_a1": 5,
            "pr_a2": 3
        },
        "f_lighting": {
            "pr_c2": 10,
            "pr_i1": "=@qty * 5",
            "pr_i2": "=@qty * 3"
        }
    }
};

window.Schema = Schema;
