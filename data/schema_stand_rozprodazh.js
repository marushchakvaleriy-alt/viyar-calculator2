const Schema = {
    "meta": {
        "version": "0.1-draft",
        "title": "Стенд: Стенд розпродажу (Функціональна фурнітура)",
        "lastUpdated": "2026-09-14",
        "note": "Стенд експозиції акційних товарів та розпродажу. Бали калібруються в Admin Matrix.",
        "markup": {
            "cat_construction": 0,
            "cat_design": 0,
            "cat_assembly": 0,
            "cat_installation": 0
        }
    },
    "categories": {
        "cat_construction": { "name": "Конструювання", "color": "#e0f2fe" },
        "cat_design": { "name": "Проєктування", "color": "#f3e8ff" },
        "cat_assembly": { "name": "Збірка", "color": "#fef9c3" },
        "cat_installation": { "name": "Монтаж", "color": "#dcfce7" }
    },
    "processes": [
        { "id": "pr_c1", "name": "ознайомлення з ТЗ", "category": "cat_construction" },
        { "id": "pr_c2", "name": "моделювання приміщення", "category": "cat_construction" },
        { "id": "pr_c3", "name": "Моделювання елементу", "category": "cat_construction" },
        { "id": "pr_c4", "name": "виставити в модель", "category": "cat_construction" },
        { "id": "pr_c5", "name": "розставити ф-ру", "category": "cat_construction" },
        { "id": "pr_c6", "name": "структура виробу", "category": "cat_construction" },
        { "id": "pr_c7", "name": "креслення СБ", "category": "cat_construction" },
        { "id": "pr_c8", "name": "Креслення на індивід. виготовлення", "category": "cat_construction" },
        { "id": "pr_c9", "name": "монтажна схема", "category": "cat_construction" },
        { "id": "pr_c10", "name": "проджект на матеріал", "category": "cat_construction" },
        { "id": "pr_c11", "name": "Кф. доровартісного мат.", "category": "cat_construction" },
        { "id": "pr_c12", "name": "ф-ра проджект", "category": "cat_construction" },
        { "id": "pr_c13", "name": "ОДК", "category": "cat_construction" },
        { "id": "pr_c14", "name": "Заміна-корегув. матеріалу", "category": "cat_construction" },
        { "id": "pr_d1", "name": "ознайомлення з ТЗ", "category": "cat_design" },
        { "id": "pr_d2", "name": "Виявлення потреби, питання, пошук крішень, нерозуміння", "category": "cat_design" },
        { "id": "pr_d3", "name": "моделювання приміщення", "category": "cat_design" },
        { "id": "pr_d4", "name": "Моделювання елементу", "category": "cat_design" },
        { "id": "pr_d5", "name": "виставити в модель", "category": "cat_design" },
        { "id": "pr_d6", "name": "структура виробу -?", "category": "cat_design" },
        { "id": "pr_d7", "name": "Комунікація виробництвом, по можливості виготовлення", "category": "cat_design" },
        { "id": "pr_d8", "name": "Креслення вузлового елементу", "category": "cat_design" },
        { "id": "pr_d9", "name": "Креслення на погодження", "category": "cat_design" },
        { "id": "pr_d10", "name": "Специфікація", "category": "cat_design" },
        { "id": "pr_d11", "name": "Кольорова схема", "category": "cat_design" },
        { "id": "pr_a1", "name": "Комплектування", "category": "cat_assembly" },
        { "id": "pr_a2", "name": "Сортування", "category": "cat_assembly" },
        { "id": "pr_a3", "name": "Додаткова Індивідуальна послуга", "category": "cat_assembly" },
        { "id": "pr_a4", "name": "Збірка", "category": "cat_assembly" },
        { "id": "pr_a5", "name": "Контрольний монтаж", "category": "cat_assembly" },
        { "id": "pr_a6", "name": "Демонтаж", "category": "cat_assembly" },
        { "id": "pr_a7", "name": "Демонтаж подетальний", "category": "cat_assembly" },
        { "id": "pr_a8", "name": "Пакування помодульне", "category": "cat_assembly" },
        { "id": "pr_a9", "name": "Пакування подетальне", "category": "cat_assembly" },
        { "id": "pr_i1", "name": "перевірка приміщення", "category": "cat_installation" },
        { "id": "pr_i2", "name": "ознайомлення із кресленям", "category": "cat_installation" },
        { "id": "pr_i3", "name": "розпаковка", "category": "cat_installation" },
        { "id": "pr_i4", "name": "перевірка модулів", "category": "cat_installation" },
        { "id": "pr_i5", "name": "розмітка та сверління под монтажну планку", "category": "cat_installation" },
        { "id": "pr_i6", "name": "Монтаж", "category": "cat_installation" },
        { "id": "pr_i7", "name": "Монтаж індивід. конструктиву", "category": "cat_installation" },
        { "id": "pr_i8", "name": "Підрізка підгонка на монтажі", "category": "cat_installation" },
        { "id": "pr_i9", "name": "Встановлення фурнітури", "category": "cat_installation" },
        { "id": "pr_i10", "name": "Встановлення техніки", "category": "cat_installation" },
        { "id": "pr_i11", "name": "Монтаж підсвітки", "category": "cat_installation" },
        { "id": "pr_i12", "name": "Прибирання", "category": "cat_installation" }
    ],
    "groups": [
        { "id": "g_main", "title": "ОСНОВНІ ПАРАМЕТРИ СТЕНДУ" },
        { "id": "g_modules", "title": "МОДУЛІ ТА СЕКЦІЇ" },
        { "id": "g_content", "title": "НАПОВНЕННЯ СТЕНДУ" }
    ],
    "fields": [
        { "id": "f_shape", "groupId": "g_main", "label": "Тип стенду", "type": "select", "options": [
            { "value": "stand_wall", "label": "Пристінний стенд" },
            { "value": "stand_island", "label": "Острівний стенд / стійка" },
            { "value": "stand_table", "label": "Стіл / тумба розпродажу" }
        ]},
        { "id": "f_width", "groupId": "g_main", "label": "Ширина стенду, мм", "type": "number", "default": 1000 },
        { "id": "f_height", "groupId": "g_main", "label": "Висота стенду, мм", "type": "number", "default": 2000 },
        { "id": "f_depth", "groupId": "g_main", "label": "Глибина стенду, мм", "type": "number", "default": 400 },
        { "id": "f_light_general", "groupId": "g_main", "label": "Загальна підсвітка стенду", "type": "checkbox" }
    ],
    "rules": {},
    "modalFieldRules": {},
    "layout": { "version": "v1", "title": "Стенд: Стенд розпродажу" }
};

// --- Модулі стенду ---
Schema.fields.push({
    "id": "f_add_module",
    "groupId": "g_modules",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати секцію стенду",
    "helpContent": "Секція або полиця стенду розпродажу.",
    "modalFields": [
        {
            "id": "mf_module_type",
            "label": "Тип секції",
            "type": "select",
            "options": [
                { "value": "sec_shelf", "label": "Відкриті полиці" },
                { "value": "sec_hooks", "label": "Перфорована панель з гачками" },
                { "value": "sec_basket", "label": "Корзини розпродажу" },
                { "value": "sec_glass", "label": "Скляна вітрина під ключ" }
            ]
        },
        {
            "id": "mf_module_area",
            "label": "Площа секції, м²",
            "type": "number",
            "default": 1,
            "isMultiplier": true
        },
        { "id": "mf_module_light", "label": "З окремою підсвіткою", "type": "checkbox" }
    ]
});

window.Schema = Schema;
