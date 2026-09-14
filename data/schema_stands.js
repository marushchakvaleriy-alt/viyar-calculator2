const Schema = {
    "meta": {
        "version": "0.1-draft",
        "title": "Стенди (конструктор модулів)",
        "lastUpdated": "2026-09-14",
        "note": "ЧЕРНЕТКА. Бали по типах модулів — орієнтовні (виведені пропорційно з реальних сум у 'Вироби Дніпро.xlsx'), потребують калібрування в Admin Matrix за фактичними заявками.",
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
        {
            "id": "g_main",
            "title": "ОСНОВНІ ПАРАМЕТРИ ЗАЯВКИ",
            "layout": { "titleSize": 16, "titleWeight": 700, "fieldSize": 14, "fieldWeight": 600, "headerColor": "#2563eb" }
        },
        {
            "id": "g_modules",
            "title": "КОНСТРУКТОР МОДУЛІВ СТЕНДА",
            "layout": { "titleSize": 16, "titleWeight": 700, "fieldSize": 14, "fieldWeight": 600, "headerColor": "#2563eb" }
        }
    ],
    "fields": [
        {
            "id": "f_zone",
            "groupId": "g_main",
            "label": "Зона / Категорія стенда",
            "type": "select",
            "helpContent": "Довідник зон — з файлу 'Перелік зон та стендів.xlsx'. Впливає лише на групування у звітах, бали не нараховує.",
            "options": [
                { "value": "z01", "label": "01.01.01 Керамограніт, кварцит, компакт, акрил" },
                { "value": "z02", "label": "01.02.02 Фасади" },
                { "value": "z03", "label": "01.03.01.02 Адмін. меблі для шоу-румів" },
                { "value": "z04", "label": "01.03.01.03 Складські меблі" },
                { "value": "z05", "label": "01.01.04 Розсувні системи, гардеробні, скло/дзеркало, перегородки" },
                { "value": "z06", "label": "01.02.01 Плитні матеріали" },
                { "value": "z07", "label": "01.02.04 Метал" },
                { "value": "z08", "label": "01.03.03 Основне виробництво" },
                { "value": "z09", "label": "01.01.02 Функціональна фурнітура" },
                { "value": "z10", "label": "01.01.03.01 Освітлення та електротовари" },
                { "value": "z11", "label": "01.03.04 Столярне виробництво" },
                { "value": "z12", "label": "01.02.03 Кухонні комплектуючі та техніка" },
                { "value": "z13", "label": "Гардеробні системи" },
                { "value": "z14", "label": "Зона 3Д окулярів" },
                { "value": "z15", "label": "Зона видачі фурнітури" },
                { "value": "z16", "label": "Зона зберігання" },
                { "value": "z17", "label": "Зона крайки" },
                { "value": "z18", "label": "Зона менеджерів / офісні приміщення" },
                { "value": "z19", "label": "Рецепція / Клієнтська зона" },
                { "value": "z20", "label": "Ніжки та ролики" },
                { "value": "z21", "label": "Інше" }
            ]
        },
        {
            "id": "f_first_request",
            "groupId": "g_main",
            "label": "Перша заявка по цій зоні (потрібне ознайомлення з ТЗ)?",
            "type": "select_yes_no",
            "labelYes": "Так",
            "labelNo": "Ні",
            "helpContent": "Разовий бал за ознайомлення з ТЗ/кресленнями, якщо це перша заявка в межах зони — далі додаються лише модулі."
        }
    ],
    "products": { "groups": [], "fields": [] },
    "rules": {
        "f_first_request": {
            "pr_c1": 5,
            "pr_d1": 5,
            "pr_a1": 3,
            "pr_i1": 3
        },
        "mf_light": {
            "pr_c6": 1,
            "pr_i8": 2
        },
        "mf_lock": {
            "pr_a1": 1,
            "pr_a4": 1
        },
        "mf_module_type": {
            "corpus_new": { "pr_c3": 4, "pr_c6": 4, "pr_c7": 2, "pr_c9": 2, "pr_d4": 3, "pr_d8": 2, "pr_d10": 1, "pr_a1": 3, "pr_a2": 2, "pr_a4": 8, "pr_a8": 3, "pr_i3": 2, "pr_i4": 2, "pr_i6": 8 },
            "corpus_base": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_d4": 1, "pr_a1": 2, "pr_a4": 4, "pr_a8": 1, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },

            "obklad_new": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "obklad_base": { "pr_c6": 1, "pr_a1": 1, "pr_a4": 1, "pr_a8": 1, "pr_i3": 1, "pr_i6": 1 },

            "sushka_bok_new": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_c9": 1, "pr_d4": 2, "pr_d8": 1, "pr_d10": 1, "pr_a1": 2, "pr_a2": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },
            "sushka_bok_base": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },

            "sushka_out_new": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_c9": 1, "pr_d4": 2, "pr_d8": 1, "pr_d10": 1, "pr_a1": 2, "pr_a2": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },
            "sushka_out_base": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },

            "sushka_step_new": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_c9": 1, "pr_d4": 2, "pr_d8": 1, "pr_d10": 1, "pr_a1": 2, "pr_a2": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },
            "sushka_step_base": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },

            "cargo_small_new": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_c9": 1, "pr_d4": 2, "pr_d8": 1, "pr_d10": 1, "pr_a1": 2, "pr_a2": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },
            "cargo_small_base": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },

            "cargo_big_new": { "pr_c3": 4, "pr_c6": 4, "pr_c7": 2, "pr_c9": 2, "pr_d4": 3, "pr_d8": 2, "pr_d10": 1, "pr_a1": 3, "pr_a2": 2, "pr_a4": 8, "pr_a8": 3, "pr_i3": 2, "pr_i4": 2, "pr_i6": 8 },
            "cargo_big_base": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_d4": 1, "pr_a1": 2, "pr_a4": 4, "pr_a8": 1, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },

            "lift_new": { "pr_c3": 4, "pr_c6": 4, "pr_c7": 2, "pr_c9": 2, "pr_d4": 3, "pr_d8": 2, "pr_d10": 1, "pr_a1": 3, "pr_a2": 2, "pr_a4": 8, "pr_a8": 3, "pr_i3": 2, "pr_i4": 2, "pr_i6": 8 },
            "lift_base": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_d4": 1, "pr_a1": 2, "pr_a4": 4, "pr_a8": 1, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },

            "hinge_dsp_new": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_c9": 1, "pr_d4": 2, "pr_d8": 1, "pr_d10": 1, "pr_a1": 2, "pr_a2": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },
            "hinge_dsp_base": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },

            "hinge_glass_new": { "pr_c3": 4, "pr_c6": 4, "pr_c7": 2, "pr_c9": 2, "pr_d4": 3, "pr_d8": 2, "pr_d10": 1, "pr_a1": 3, "pr_a2": 2, "pr_a4": 8, "pr_a8": 3, "pr_i3": 2, "pr_i4": 2, "pr_i6": 8 },
            "hinge_glass_base": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_d4": 1, "pr_a1": 2, "pr_a4": 4, "pr_a8": 1, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },

            "drawers_new": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_c9": 1, "pr_d4": 2, "pr_d8": 1, "pr_d10": 1, "pr_a1": 2, "pr_a2": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },
            "drawers_base": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },

            "trays_new": { "pr_c3": 2, "pr_c6": 2, "pr_c7": 1, "pr_c9": 1, "pr_d4": 2, "pr_d8": 1, "pr_d10": 1, "pr_a1": 2, "pr_a2": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i4": 1, "pr_i6": 4 },
            "trays_base": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },

            "panel_new": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "panel_base": { "pr_c6": 1, "pr_a1": 1, "pr_a4": 1, "pr_a8": 1, "pr_i3": 1, "pr_i6": 1 },

            "other_manual": {}
        }
    },
    "modalFieldRules": {},
    "layout": { "version": "v1", "title": "Стенди (конструктор модулів)" }
};

// Додаємо action_button "Додати модуль" з модальними полями окремо,
// щоб основний блок fields/rules вище лишався читабельним.
Schema.fields.push({
    "id": "f_add_module",
    "groupId": "g_modules",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати модуль",
    "helpContent": "Додайте кожен типовий модуль стенда окремо і вкажіть кількість. Оберіть 'нова розробка', якщо такого модуля ще нема в базі готових рішень, або 'типовий', якщо це вже відпрацьоване рішення з бази.",
    "modalFields": [
        {
            "id": "mf_module_type",
            "label": "Тип модуля",
            "type": "select",
            "options": [
                { "value": "corpus_new", "label": "Корпус / каркас стенда — нова розробка" },
                { "value": "corpus_base", "label": "Корпус / каркас стенда — типовий (є в базі)" },
                { "value": "obklad_new", "label": "Обклад-підпорка / декоративна накладка — нова розробка" },
                { "value": "obklad_base", "label": "Обклад-підпорка / декоративна накладка — типовий" },
                { "value": "sushka_bok_new", "label": "Сушка з боковинами — нова розробка" },
                { "value": "sushka_bok_base", "label": "Сушка з боковинами — типова" },
                { "value": "sushka_out_new", "label": "Сушка з висувним елементом — нова розробка" },
                { "value": "sushka_out_base", "label": "Сушка з висувним елементом — типова" },
                { "value": "sushka_step_new", "label": "Каскад сушок (\"сходинки\") — нова розробка" },
                { "value": "sushka_step_base", "label": "Каскад сушок (\"сходинки\") — типовий" },
                { "value": "cargo_small_new", "label": "Модуль карго 150-200 — нова розробка" },
                { "value": "cargo_small_base", "label": "Модуль карго 150-200 — типовий" },
                { "value": "cargo_big_new", "label": "Модуль карго 300-350 — нова розробка" },
                { "value": "cargo_big_base", "label": "Модуль карго 300-350 — типовий" },
                { "value": "lift_new", "label": "Модуль з підіймачем — нова розробка" },
                { "value": "lift_base", "label": "Модуль з підіймачем — типовий" },
                { "value": "hinge_dsp_new", "label": "Модуль з завісами, фасад ДСП — нова розробка" },
                { "value": "hinge_dsp_base", "label": "Модуль з завісами, фасад ДСП — типовий" },
                { "value": "hinge_glass_new", "label": "Модуль з завісами, фасад скло/рамковий — нова розробка" },
                { "value": "hinge_glass_base", "label": "Модуль з завісами, фасад скло/рамковий — типовий" },
                { "value": "drawers_new", "label": "Блок шухляд — нова розробка" },
                { "value": "drawers_base", "label": "Блок шухляд — типовий" },
                { "value": "trays_new", "label": "Модуль з лотками — нова розробка" },
                { "value": "trays_base", "label": "Модуль з лотками — типовий" },
                { "value": "panel_new", "label": "Щиток з ручками/декором — нова розробка" },
                { "value": "panel_base", "label": "Щиток з ручками/декором — типовий" },
                { "value": "other_manual", "label": "Інший елемент (бали виставити вручну в Admin)" }
            ]
        },
        {
            "id": "mf_qty",
            "label": "Кількість (шт)",
            "type": "number",
            "default": 1,
            "isMultiplier": true
        },
        {
            "id": "mf_light",
            "label": "З підсвіткою",
            "type": "checkbox"
        },
        {
            "id": "mf_lock",
            "label": "З замками / додатковою фурнітурою",
            "type": "checkbox"
        }
    ]
});

window.Schema = Schema;
