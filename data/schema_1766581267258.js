const Schema = {
    "meta": {
        "version": "2.1",
        "title": "Новий калькулятор",
        "lastUpdated": "2025-12-24T13:01:07.258Z"
    },
    "processes": [
        {
            "id": "pr_setup",
            "name": "Налаштування",
            "category": "cat_main"
        },
        {
            "id": "p1766581303610",
            "name": "апрапр",
            "category": "cat_main"
        }
    ],
    "categories": {
        "cat_main": {
            "name": "Основні",
            "color": "#e0f2fe"
        },
        "cat_1766581288082": {
            "name": "апрапрп",
            "color": "#f0fdf4"
        }
    },
    "groups": [
        {
            "id": "g_main",
            "title": "Загальні параметри"
        },
        {
            "id": "g1766581298186",
            "title": "апрапр"
        }
    ],
    "fields": [
        {
            "id": "f1766581309099",
            "groupId": "g1766581298186",
            "label": "Нова дія",
            "type": "action_button",
            "helpContent": "",
            "default": ""
        }
    ],
    "products": {
        "groups": [],
        "fields": []
    },
    "rules": {}
};
window.Schema = Schema;