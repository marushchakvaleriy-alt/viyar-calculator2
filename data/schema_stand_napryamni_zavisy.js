const Schema = {
    "meta": {
        "version": "0.1-draft",
        "title": "Стенд: Напрямні та завіси (Функціональна фурнітура)",
        "lastUpdated": "2026-09-14",
        "note": "Побудовано за протоколом наради з керівником та даними стендів Львів/Дніпро: Корпус (стіна) -> Модулі (генеричні, по площі) -> Наповнення (модулі з завісами ДСП/скло/рамка, блоки шухляд, щитки Tip-On, підіймачі, поштучно за фіксованим тарифом на тип). Бали орієнтовні, потребують калібрування в Admin Matrix.",
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
        { "id": "g_corpus", "title": "КОРПУС (СТІНА / СТЕНД НАПРЯМНИХ ТА ЗАВІС)", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } },
        { "id": "g_modules", "title": "МОДУЛІ (генеричні — без або з перегородками)", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } },
        { "id": "g_content", "title": "НАПОВНЕННЯ (модулі з завісами, блоки шухляд, підіймачі, щитки)", "layout": { "titleSize": 16, "titleWeight": 700, "headerColor": "#2563eb" } }
    ],
    "fields": [
        {
            "id": "f_first_request",
            "groupId": "g_main",
            "label": "Перша заявка по цій стіні (потрібне ознайомлення з ТЗ)?",
            "type": "select_yes_no",
            "labelYes": "Так",
            "labelNo": "Ні",
            "helpContent": "Разовий бал за ознайомлення з ТЗ/кресленнями на весь стенд завіс та напрямних."
        },
        {
            "id": "f_corpus_width",
            "groupId": "g_corpus",
            "label": "Ширина корпусу, мм",
            "type": "number",
            "step": 100,
            "default": "",
            "layout": { "width": "w-33" },
            "helpContent": "Введіть ширину каркасу/стіни в міліметрах (наприклад, 3000)."
        },
        {
            "id": "f_corpus_height",
            "groupId": "g_corpus",
            "label": "Висота корпусу, мм",
            "type": "number",
            "step": 100,
            "default": "",
            "layout": { "width": "w-33" },
            "helpContent": "Введіть висоту каркасу/стіни в міліметрах (наприклад, 2400)."
        },
        {
            "id": "f_corpus_area",
            "groupId": "g_corpus",
            "label": "Площа корпусу (стіни), м²",
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
            "without_partitions": { "pr_c3": 0.5, "pr_c6": 1, "pr_d4": 0.5, "pr_a1": 0.5, "pr_a4": 1.5, "pr_a8": 0.5, "pr_i3": 0.5, "pr_i6": 1.5 },
            "with_partitions": { "pr_c3": 1, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 }
        },

        "mf_content_light": { "pr_c6": 1, "pr_i8": 2 },
        "mf_content_lock": { "pr_a1": 1, "pr_a4": 1 },

        "mf_content_type": {
            "hinge_dsp_double": { "pr_c3": 2, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 4, "pr_a8": 2, "pr_i3": 1, "pr_i6": 4 },
            "hinge_glass_double": { "pr_c3": 3, "pr_c6": 3, "pr_d4": 2, "pr_a1": 2, "pr_a4": 7, "pr_a8": 3, "pr_i3": 2, "pr_i6": 7 },
            "hinge_glass_all": { "pr_c3": 3.5, "pr_c6": 3.5, "pr_d4": 2.5, "pr_a1": 2.5, "pr_a4": 8, "pr_a8": 3.5, "pr_i3": 2.5, "pr_i6": 8 },
            "hinge_frame_double": { "pr_c3": 2.5, "pr_c6": 2.5, "pr_d4": 1.5, "pr_a1": 1.5, "pr_a4": 5, "pr_a8": 2, "pr_i3": 1.5, "pr_i6": 5 },
            "hinge_frame_high": { "pr_c3": 3, "pr_c6": 3, "pr_d4": 2, "pr_a1": 2, "pr_a4": 6, "pr_a8": 2.5, "pr_i3": 2, "pr_i6": 6 },
            "shield_tipon": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "drawer_block_3": { "pr_c3": 2.5, "pr_c6": 2.5, "pr_d4": 1.5, "pr_a1": 1.5, "pr_a4": 6, "pr_a8": 2.5, "pr_i3": 1.5, "pr_i6": 5 },
            "drawer_block_hidden": { "pr_c3": 2, "pr_c6": 2, "pr_d4": 1, "pr_a1": 1, "pr_a4": 5, "pr_a8": 2, "pr_i3": 1, "pr_i6": 4 },
            "drawer_block_thin": { "pr_c3": 2.5, "pr_c6": 2.5, "pr_d4": 1.5, "pr_a1": 1.5, "pr_a4": 6, "pr_a8": 2, "pr_i3": 1, "pr_i6": 5 },
            "drawer_roller_ball": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3.5, "pr_a8": 1.5, "pr_i3": 1, "pr_i6": 3 },
            "tray_module": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 4, "pr_a8": 1.5, "pr_i3": 1, "pr_i6": 3 },
            "lift_dsp": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 4, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 },
            "lift_frame": { "pr_c3": 2, "pr_c6": 2, "pr_d4": 1.5, "pr_a1": 1.5, "pr_a4": 5, "pr_a8": 1.5, "pr_i3": 1.5, "pr_i6": 4 },
            "down_open_dsp": { "pr_c3": 1.5, "pr_c6": 1.5, "pr_d4": 1, "pr_a1": 1, "pr_a4": 3.5, "pr_a8": 1, "pr_i3": 1, "pr_i6": 3 },
            "down_open_frame": { "pr_c3": 2, "pr_c6": 2, "pr_d4": 1.5, "pr_a1": 1.5, "pr_a4": 4.5, "pr_a8": 1.5, "pr_i3": 1.5, "pr_i6": 4 },
            "servodrive": { "pr_c3": 3, "pr_c6": 3, "pr_d4": 2, "pr_a1": 2, "pr_a4": 7, "pr_a8": 2, "pr_i3": 2, "pr_i6": 6 },
            "obklad_stand": { "pr_c3": 1, "pr_c6": 1, "pr_d4": 1, "pr_a1": 1, "pr_a4": 2, "pr_a8": 1, "pr_i3": 1, "pr_i6": 2 },
            "other_manual": {}
        }
    },
    "modalFieldRules": {},
    "layout": { "version": "v1", "title": "Стенд: Напрямні та завіси" }
};

// --- Модулі (генеричний конструктор: без/з перегородками, по площі) ---
Schema.fields.push({
    "id": "f_add_module",
    "groupId": "g_modules",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати модуль/коробку",
    "helpContent": "Модуль — загальний каркас або ніша (без прив'язки до завіс чи напрямних). Вкажіть сумарну площу однакових модулів.",
    "modalFields": [
        {
            "id": "mf_module_type",
            "label": "Тип модуля",
            "type": "select",
            "options": [
                { "value": "without_partitions", "label": "Модуль без перегородок" },
                { "value": "with_partitions", "label": "Модуль з перегородками" }
            ]
        },
        {
            "id": "mf_module_area",
            "label": "Площа модуля(ів), м²",
            "type": "number",
            "default": 0,
            "isMultiplier": true
        },
        { "id": "mf_module_light", "label": "З підсвіткою модуля", "type": "checkbox" }
    ]
});

// --- Наповнення (модулі з завісами, блоки шухляд, щитки тощо) ---
Schema.fields.push({
    "id": "f_add_content",
    "groupId": "g_content",
    "label": "",
    "type": "action_button",
    "default": "➕ Додати наповнення (завіси / напрямні)",
    "helpContent": "Оберіть тип вузла/елемента та вкажіть кількість.",
    "modalFields": [
        {
            "id": "mf_content_type",
            "label": "Тип елемента",
            "type": "select",
            "options": [
                { "value": "hinge_dsp_double", "label": "Модуль з завісами: фасад ДСП, подвійні боковини" },
                { "value": "hinge_glass_double", "label": "Модуль з завісами: фасад скло, подвійні боковини" },
                { "value": "hinge_glass_all", "label": "Модуль з завісами: фасад скло + корпус скло" },
                { "value": "hinge_frame_double", "label": "Модуль з завісами: рамковий фасад, подвійні боковини" },
                { "value": "hinge_frame_high", "label": "Модуль з завісами високий: рамковий фасад" },
                { "value": "shield_tipon", "label": "Щиток / панель з Tip-On" },
                { "value": "drawer_block_3", "label": "Блок шухляд (3 шт) з напрямними" },
                { "value": "drawer_block_hidden", "label": "Шухляда з напрямними прихованого монтажу" },
                { "value": "drawer_block_thin", "label": "Тонкостінна шухляда (Legrabox, тощо)" },
                { "value": "drawer_roller_ball", "label": "Шухляда з кульковими/роликовими напрямними" },
                { "value": "tray_module", "label": "Модуль з висувними лотками" },
                { "value": "lift_dsp", "label": "Модуль з підіймачем: фасад ДСП" },
                { "value": "lift_frame", "label": "Модуль з підіймачем: рамковий фасад" },
                { "value": "down_open_dsp", "label": "Модуль відкривання вниз: фасад ДСП" },
                { "value": "down_open_frame", "label": "Модуль відкривання вниз: рамковий фасад" },
                { "value": "servodrive", "label": "Електрична система відкривання (Servo-Drive / електропривід)" },
                { "value": "obklad_stand", "label": "Обклад / декоративна накладка стенду" },
                { "value": "other_manual", "label": "Інший елемент (бали вручну в Admin)" }
            ]
        },
        { "id": "mf_content_qty", "label": "Кількість (шт)", "type": "number", "default": 1, "isMultiplier": true },
        { "id": "mf_content_light", "label": "З підсвіткою", "type": "checkbox" },
        { "id": "mf_content_lock", "label": "З замками", "type": "checkbox" }
    ]
});

window.Schema = Schema;
