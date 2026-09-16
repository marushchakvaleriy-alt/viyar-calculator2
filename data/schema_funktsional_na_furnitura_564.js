const Schema = {
    "meta": {
        "version": "v.1",
        "title": "Функціональна фурнітура",
        "lastUpdated": "2026-09-15"
    },
    "categories": {
        "cat_construction": {
            "name": "Конструювання",
            "color": "#e0f2fe"
        },
        "cat_design": {
            "name": "Проєктування",
            "color": "#f3e8ff"
        },
        "cat_assembly": {
            "name": "Збірка",
            "color": "#fef9c3"
        },
        "cat_installation": {
            "name": "Монтаж",
            "color": "#dcfce7"
        }
    },
    "processes": [
        {
            "id": "pr_c1",
            "name": "ознайомлення з ТЗ",
            "category": "cat_construction"
        },
        {
            "id": "pr_c2",
            "name": "моделювання приміщення",
            "category": "cat_construction"
        },
        {
            "id": "pr_c3",
            "name": "Моделювання елементу",
            "category": "cat_construction"
        },
        {
            "id": "pr_c4",
            "name": "виставити в модель",
            "category": "cat_construction"
        },
        {
            "id": "pr_c5",
            "name": "розставити ф-ру",
            "category": "cat_construction"
        },
        {
            "id": "pr_c6",
            "name": "структура виробу",
            "category": "cat_construction"
        },
        {
            "id": "pr_c7",
            "name": "креслення СБ",
            "category": "cat_construction"
        },
        {
            "id": "pr_c8",
            "name": "Креслення на індивід. виготовлення",
            "category": "cat_construction"
        },
        {
            "id": "pr_c9",
            "name": "монтажна схема",
            "category": "cat_construction"
        },
        {
            "id": "pr_c10",
            "name": "проджект на матеріал",
            "category": "cat_construction"
        },
        {
            "id": "pr_c11",
            "name": "Кф. доровартісного мат.",
            "category": "cat_construction"
        },
        {
            "id": "pr_c12",
            "name": "ф-ра проджект",
            "category": "cat_construction"
        },
        {
            "id": "pr_c13",
            "name": "ОДК",
            "category": "cat_construction"
        },
        {
            "id": "pr_c14",
            "name": "Заміна-корегув. матеріалу",
            "category": "cat_construction"
        },
        {
            "id": "pr_d1",
            "name": "ознайомлення з ТЗ",
            "category": "cat_design"
        },
        {
            "id": "pr_d2",
            "name": "Виявлення потреби, питання, пошук крішень, нерозуміння",
            "category": "cat_design"
        },
        {
            "id": "pr_d3",
            "name": "моделювання приміщення",
            "category": "cat_design"
        },
        {
            "id": "pr_d4",
            "name": "Моделювання елементу",
            "category": "cat_design"
        },
        {
            "id": "pr_d5",
            "name": "виставити в модель",
            "category": "cat_design"
        },
        {
            "id": "pr_d6",
            "name": "структура виробу -?",
            "category": "cat_design"
        },
        {
            "id": "pr_d7",
            "name": "Комунікація виробництвом, по можливості виготовлення",
            "category": "cat_design"
        },
        {
            "id": "pr_d8",
            "name": "Креслення вузлового елементу",
            "category": "cat_design"
        },
        {
            "id": "pr_d9",
            "name": "Креслення на погодження",
            "category": "cat_design"
        },
        {
            "id": "pr_d10",
            "name": "Специфікація",
            "category": "cat_design"
        },
        {
            "id": "pr_d11",
            "name": "Кольорова схема",
            "category": "cat_design"
        },
        {
            "id": "pr_a1",
            "name": "Комплектування",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a2",
            "name": "Сортування",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a3",
            "name": "Додаткова Індивідуальна послуга",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a4",
            "name": "Збірка",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a5",
            "name": "Контрольний монтаж",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a6",
            "name": "Демонтаж",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a7",
            "name": "Демонтаж подетальний",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a8",
            "name": "Пакування помодульне",
            "category": "cat_assembly"
        },
        {
            "id": "pr_a9",
            "name": "Пакування подетальне",
            "category": "cat_assembly"
        },
        {
            "id": "pr_i1",
            "name": "перевірка приміщення",
            "category": "cat_installation"
        },
        {
            "id": "pr_i2",
            "name": "ознайомлення із кресленям",
            "category": "cat_installation"
        },
        {
            "id": "pr_i3",
            "name": "розпаковка",
            "category": "cat_installation"
        },
        {
            "id": "pr_i4",
            "name": "перевірка модулів",
            "category": "cat_installation"
        },
        {
            "id": "pr_i5",
            "name": "розмітка та сверління под монтажну планку",
            "category": "cat_installation"
        },
        {
            "id": "pr_i6",
            "name": "Монтаж",
            "category": "cat_installation"
        },
        {
            "id": "pr_i7",
            "name": "ПІДРІЗКА ПРОФІЛЮ ТА ФАЛЬШІВ І КАРНІЗІВ",
            "category": "cat_installation"
        },
        {
            "id": "pr_i8",
            "name": "монтаж підсвітки",
            "category": "cat_installation"
        },
        {
            "id": "pr_i9",
            "name": "Виріз отворів під розетки",
            "category": "cat_installation"
        },
        {
            "id": "pr_i10",
            "name": "прибирання та винос сміття",
            "category": "cat_installation"
        },
        {
            "id": "pr_i11",
            "name": "вирізи / зарізи",
            "category": "cat_installation"
        }
    ],
    "groups": [
        {
            "id": "g_main",
            "title": "Основні параметри"
        },
        {
            "id": "g1789481047588",
            "title": "КОНСТРУКТИВ"
        },
        {
            "id": "g1789538738995",
            "title": "НАПОВНЕННЯ"
        }
    ],
    "fields": [
        {
            "id": "f1789479447252",
            "groupId": "g_main",
            "label": "ширина(мм)",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-33"
            }
        },
        {
            "id": "f1789479695285",
            "groupId": "g_main",
            "label": "висота(мм)",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-33"
            }
        },
        {
            "id": "f1789479349868",
            "groupId": "g_main",
            "label": "Корпус",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-33",
                "helpImg": "images/hints/стіна.jpg",
                "glass": true,
                "shadow": "none"
            },
            "helpContent": "",
            "allowDecimal": true,
            "formula": "=(f1789479447252 * f1789479695285) / 1000000",
            "readOnly": true
        },
        {
            "id": "f1789481049587",
            "groupId": "g1789481047588",
            "label": "Модулі",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-33",
                "flexDirection": "column",
                "textAlign": "center"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1789481114025",
            "groupId": "g1789481047588",
            "label": "Стілька вертикальна",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-33",
                "textAlign": "center"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1789481134462",
            "groupId": "g1789481047588",
            "label": "Стілька вертикальна",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-33",
                "textAlign": "center"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1789538740557",
            "groupId": "g1789538738995",
            "label": "Кухонне наповнення",
            "type": "action_button",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-100"
            },
            "helpContent": "Оберіть елементи кухонного наповнення та вкажіть їх кількість.",
            "default": "➕ Додати наповнення",
            "modalFields": [
                {
                    "id": "mf_kitchen_hardware",
                    "label": "Елементи кухонного наповнення",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "cargo_low",
                            "label": "Карго низьке"
                        },
                        {
                            "value": "cargo_high",
                            "label": "Карго високе"
                        },
                        {
                            "value": "magic_corners",
                            "label": "Магічні кути"
                        },
                        {
                            "value": "kitchen_baskets",
                            "label": "Кошики кухонні"
                        },
                        {
                            "value": "countertop_plates",
                            "label": "Накладки для стільниць"
                        },
                        {
                            "value": "dish_dryers",
                            "label": "Сушарки і піддони"
                        },
                        {
                            "value": "sink_trays",
                            "label": "Піддони під мийку"
                        },
                        {
                            "value": "kitchen_plinths",
                            "label": "Бортики кухонні"
                        },
                        {
                            "value": "shelves",
                            "label": "Полички"
                        },
                        {
                            "value": "waste_systems",
                            "label": "Системи для (сортування) сміття"
                        },
                        {
                            "value": "drawer_org",
                            "label": "Системи організацій для шухляд"
                        }
                    ]
                },
                {
                    "id": "mf1789539618104",
                    "label": "напрямні, завіси та підіймачі",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt1",
                            "label": "Варіант 1"
                        }
                    ]
                }
            ]
        }
    ],
    "products": {
        "groups": [],
        "fields": []
    },
    "rules": {},
    "modalFieldRules": {}
};
window.Schema = Schema;