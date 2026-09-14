const Schema = {
    "meta": {
        "version": "0.1-draft",
        "title": "Стенд: Гардеробне наповнення (Функціональна фурнітура)",
        "lastUpdated": "2026-09-14",
        "note": "Побудовано за протоколом наради з керівником: Корпус (стіна/острів) -> Модулі (генеричні, без/з перегородками, по площі) -> Наповнення (гардеробна фурнітура: пантографи, брючниці, полиці для взуття, штанги, джокери тощо, поштучно за фіксованим тарифом). Бали орієнтовні, потребують калібрування в Admin Matrix.",
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
        { "id": "g_corpus", "title": "КОРПУС (СТІНА / ОСТРІВ ГАРДЕРОБУ)", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } },
        { "id": "g_modules", "title": "МОДУЛІ ТА СЕКЦІЇ (генеричні — без або з перегородками)", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } },
        { "id": "g_content", "title": "ГАРДЕРОБНЕ НАПОВНЕННЯ ТА ДЖОКЕРИ (конкретні елементи)", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } }
    ],
    "fields": [
        {
            "id": "f_first_request",
            "groupId": "g_main",
            "label": "Перша заявка по цій стіні (потрібне ознайомлення з ТЗ)?",
            "type": "select_yes_no",
            "labelYes": "Так",
            "labelNo": "Ні",
            "helpContent": "Разовий бал за ознайомлення з ТЗ/кресленнями на весь стенд гардеробу."
        },
        {
            "id": "f_corpus_area",
            "groupId": "g_corpus",
            "label": "Площа корпусу (стіни/острова), м²",
            "type": "number",
            "default": 0,
            "helpContent": "Вкажіть площу каркасу/стіни (ширина х висота)."
        }
    ],
    "products": { "groups": [], "fields": [] },
    "rules": {
        "f_first_request": { "pr_c1": 5, "pr_d1": 5, "pr_a1": 3, "pr_i1": 3 },

        "f_corpus_area": { "pr_c3": 1, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 },

        "mf_module_light": { "pr_c6": 1, "pr_i8": 2 },

        "mf_module_type": {
            "without_partitions": { "pr_c3": 0.5, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1.5, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1.5 },
            "with_partitions": { "pr_c3": 1, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 }
        },

        "mf_content_light": { "pr_c6": 1, "pr_i8": 2 },
        "mf_content_lock": { "pr_a1": 1, "pr_a4": 1 },

        "mf_content_type": {
            "pantograph": { "pr_c3": 2, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 4, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 },
            "pantograph_electric": { "pr_c3": 3, "pr_c6": 3, "pr_d4": 2, "pr_a1": 2, "pr_a4": 6, "pr_a8": 2, "pr_i3": 1, "pr_i6": 5 },
            "trouser_rack": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "shoe_rack_pullout": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "shoe_shelf_stationary": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 2, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1.5 },
            "hanger_pullout": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 2, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1 },
            "wardrobe_basket": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "organizer_tray": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 1, "pr_a4": 2, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1 },
            "wardrobe_rod": { "pr_c3": 0.5, "pr_c6": 0.5, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1 },
            "wardrobe_rod_light": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "mirror_pullout": { "pr_c3": 2, "pr_c6": 2, "pr_d4": 1.5, "pr_a1": 1, "pr_a4": 4, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 },
            "ironing_board": { "pr_c3": 2.5, "pr_c6": 2.5, "pr_d4": 1.5, "pr_a1": 1.5, "pr_a4": 5, "pr_a8": 1.5, "pr_i3": 1, "pr_i6": 4 },
            "joker_column": { "pr_c3": 1.5, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 },
            "joker_flange_connector": { "pr_c3": 0.5, "pr_c6": 0.5, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1 },
            "drawer_wardrobe": { "pr_c3": 2, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 5, "pr_a8": 2, "pr_i3": 1, "pr_i6": 4 },
            "obklad_wardrobe": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "other_manual": {}
        }
    },
    "modalFieldRules": {},
    "layout": { "version": "v1", "title": "Стенд: Гардеробне наповнення" }
};

// --- Модулі (генеричний конструктор: без/з перегородками, по площі) ---
Schema.fields.push({
    "id": "f_add_module",
    "groupId": "g_modules",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати модуль/секцію",
    "helpContent": "Секція гардеробу — коробка або ніша (без прив'язки до фурнітури). Вкажіть сумарну площу однакових секцій.",
    "modalFields": [
        {
            "id": "mf_module_type",
            "label": "Тип секції",
            "type": "select",
            "options": [
                { "value": "without_partitions", "label": "Секція без перегородок / відкрита ніша" },
                { "value": "with_partitions", "label": "Секція з внутрішніми перегородками / полицями" }
            ]
        },
        {
            "id": "mf_module_area",
            "label": "Площа секцій, м²",
            "type": "number",
            "default": 0,
            "isMultiplier": true
        },
        { "id": "mf_module_light", "label": "З підсвіткою секції", "type": "checkbox" }
    ]
});

// --- Наповнення (гардеробна фурнітура поштучно) ---
Schema.fields.push({
    "id": "f_add_content",
    "groupId": "g_content",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати гардеробний елемент",
    "helpContent": "Оберіть тип фурнітури та кількість. Тариф фіксований для кожного типу елемента.",
    "modalFields": [
        {
            "id": "mf_content_type",
            "label": "Тип елемента",
            "type": "select",
            "options": [
                { "value": "pantograph", "label": "Пантограф механічний" },
                { "value": "pantograph_electric", "label": "Пантограф електричний / моторний" },
                { "value": "trouser_rack", "label": "Брючниця висувна" },
                { "value": "shoe_rack_pullout", "label": "Полиця для взуття висувна" },
                { "value": "shoe_shelf_stationary", "label": "Полиця для взуття стаціонарна / похила" },
                { "value": "hanger_pullout", "label": "Вішалка висувна (мікроліфт для плічок)" },
                { "value": "wardrobe_basket", "label": "Кошик гардеробний висувний" },
                { "value": "organizer_tray", "label": "Органайзер / лоток для аксесуарів" },
                { "value": "wardrobe_rod", "label": "Штанга гардеробна (труба овальна/кругла)" },
                { "value": "wardrobe_rod_light", "label": "Штанга гардеробна з вбудованою LED-підсвіткою" },
                { "value": "mirror_pullout", "label": "Дзеркало висувне / поворотне" },
                { "value": "ironing_board", "label": "Прасувальна дошка вбудована / висувна" },
                { "value": "joker_column", "label": "Колона / стійка системи Joker" },
                { "value": "joker_flange_connector", "label": "Вузол з'єднання / фланець Joker" },
                { "value": "drawer_wardrobe", "label": "Блок шухляд гардеробу" },
                { "value": "obklad_wardrobe", "label": "Обклад / декоративна накладка гардеробу" },
                { "value": "other_manual", "label": "Інший елемент (бали вручну в Admin)" }
            ]
        },
        { "id": "mf_content_qty", "label": "Кількість (шт)", "type": "number", "default": 1, "isMultiplier": true },
        { "id": "mf_content_light", "label": "З підсвіткою", "type": "checkbox" },
        { "id": "mf_content_lock", "label": "З замками / блокуванням", "type": "checkbox" }
    ]
});

window.Schema = Schema;
