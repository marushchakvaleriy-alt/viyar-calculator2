const Schema = {
    "meta": {
        "version": "0.1-draft",
        "title": "Стенд: Кріпильна фурнітура (Функціональна фурнітура)",
        "lastUpdated": "2026-09-14",
        "note": "Стенд експозиції кріпильної фурнітури: щити/стіни зразків монтажу та з'єднань. Корпус (стіна/щит) -> Секції/панелі зразків -> Наповнення (групи та типи кріплень: стяжки, навіси, кутики, конфірмати, полкотримачі тощо). Бали орієнтовні, потребують калібрування в Admin Matrix.",
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
        { "id": "pr_i7", "name": "ПІДРІЗКА ПРОФІЛЮ ТА ФАЛЬШІВ І КАРНІЗІВ", "category": "cat_installation" },
        { "id": "pr_i8", "name": "монтаж підсвітки", "category": "cat_installation" },
        { "id": "pr_i9", "name": "Виріз отворів під розетки", "category": "cat_installation" },
        { "id": "pr_i10", "name": "прибирання та винос сміття", "category": "cat_installation" },
        { "id": "pr_i11", "name": "вирізи / зарізи", "category": "cat_installation" }
    ],
    "groups": [
        { "id": "g_main", "title": "ОСНОВНІ ПАРАМЕТРИ ЗАЯВКИ", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } },
        { "id": "g_corpus", "title": "ОСНОВА (СТІНА / ЩИТ ЕКСПОЗИЦІЇ)", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } },
        { "id": "g_modules", "title": "ПАНЕЛІ ТА КАСЕТИ ЗРАЗКІВ", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } },
        { "id": "g_content", "title": "ЗРАЗКИ КРІПИЛЬНОЇ ФУРНІТУРИ", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } }
    ],
    "fields": [
        {
            "id": "f_first_request",
            "groupId": "g_main",
            "label": "Перша заявка по цій стіні/щиту (потрібне ознайомлення з ТЗ)?",
            "type": "select_yes_no",
            "labelYes": "Так",
            "labelNo": "Ні",
            "helpContent": "Разовий бал за ознайомлення з ТЗ на весь стенд кріплень."
        },
        {
            "id": "f_corpus_width",
            "groupId": "g_corpus",
            "label": "Ширина стенду, мм",
            "type": "number",
            "step": 100,
            "default": "",
            "layout": { "width": "w-33" },
            "helpContent": "Введіть ширину стенду/щита в міліметрах (наприклад, 3000)."
        },
        {
            "id": "f_corpus_height",
            "groupId": "g_corpus",
            "label": "Висота стенду, мм",
            "type": "number",
            "step": 100,
            "default": "",
            "layout": { "width": "w-33" },
            "helpContent": "Введіть висоту стенду/щита в міліметрах (наприклад, 2400)."
        },
        {
            "id": "f_corpus_area",
            "groupId": "g_corpus",
            "label": "Площа основи стенду (стіни/щита), м²",
            "type": "number",
            "allowDecimal": true,
            "readOnly": true,
            "formula": "=(f_corpus_width * f_corpus_height) / 1000000",
            "default": 0,
            "layout": { "width": "w-33" },
            "helpContent": "Автоматично розраховується: (Ширина × Висота) / 1 000 000. Бали вартості нараховуються саме за цією площею."
        }
    ],
    "products": { "groups": [], "fields": [] },
    "rules": {
        "f_first_request": { "pr_c1": 5, "pr_d1": 5, "pr_a1": 3, "pr_i1": 3 },

        "f_corpus_area": { "pr_c3": 1, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 },

        "mf_module_light": { "pr_c6": 1, "pr_i8": 2 },

        "mf_module_type": {
            "panel_fixed": { "pr_c3": 0.5, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1.5, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1.5 },
            "panel_turnable": { "pr_c3": 1, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 }
        },

        "mf_content_light": { "pr_c6": 1, "pr_i8": 2 },

        "mf_content_type": {
            "minifix_rafix": { "pr_c3": 0.5, "pr_c6": 0.5, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1 },
            "ties_hidden": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 2, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1.5 },
            "hangers_cabinet": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 2, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1.5 },
            "shelf_holders": { "pr_c3": 0.5, "pr_c6": 0.5, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1 },
            "corners_brackets": { "pr_c3": 0.5, "pr_c6": 0.5, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1 },
            "legs_supports": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 2, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1.5 },
            "other_fastener": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 }
        }
    },
    "modalFieldRules": {},
    "layout": { "version": "v1", "title": "Стенд: Кріпильна фурнітура" }
};

// --- Панелі / касети зразків ---
Schema.fields.push({
    "id": "f_add_module",
    "groupId": "g_modules",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати панель/касету",
    "helpContent": "Панель або касета, на якій монтуються зразки кріплень.",
    "modalFields": [
        {
            "id": "mf_module_type",
            "label": "Тип панелі",
            "type": "select",
            "options": [
                { "value": "panel_fixed", "label": "Панель стаціонарна / закріплена на стіні" },
                { "value": "panel_turnable", "label": "Панель поворотна / книжка / висувна" }
            ]
        },
        {
            "id": "mf_module_area",
            "label": "Площа панелі(ей), м²",
            "type": "number",
            "default": 0,
            "isMultiplier": true
        },
        { "id": "mf_module_light", "label": "З підсвіткою панелі", "type": "checkbox" }
    ]
});

// --- Зразки кріплень ---
Schema.fields.push({
    "id": "f_add_content",
    "groupId": "g_content",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати групу зразків кріплень",
    "helpContent": "Оберіть тип зразків та кількість вузлів експозиції.",
    "modalFields": [
        {
            "id": "mf_content_type",
            "label": "Тип кріплення/вузла",
            "type": "select",
            "options": [
                { "value": "minifix_rafix", "label": "Ексцентрикові стяжки (Minifix, Rafix, шканти)" },
                { "value": "ties_hidden", "label": "Стяжки прихованого монтажу / конічні стяжки" },
                { "value": "hangers_cabinet", "label": "Навіси для шаф (регульовані, Camar, тощо)" },
                { "value": "shelf_holders", "label": "Полкотримачі (стандартні, приховані, для скла)" },
                { "value": "corners_brackets", "label": "Кутики металеві/пластикові, кутові стяжки" },
                { "value": "legs_supports", "label": "Опори, регульовані ніжки, кухонні цокольні кліпси" },
                { "value": "other_fastener", "label": "Інші зразки кріплень (бали вручну)" }
            ]
        },
        { "id": "mf_content_qty", "label": "Кількість зразків/вузлів (шт)", "type": "number", "default": 1, "isMultiplier": true },
        { "id": "mf_content_light", "label": "З акцентною підсвіткою", "type": "checkbox" }
    ]
});

window.Schema = Schema;
