const Schema = {
    "meta": {
        "version": "0.3-draft",
        "title": "Стенд: Кухонне наповнення (Функціональна фурнітура)",
        "lastUpdated": "2026-09-14",
        "note": "Побудовано за протоколом наради з керівником: Корпус (стіна) -> Модулі (генеричні, без/з перегородками, рахуються по площі) -> Наповнення (конкретна фурнітура: карго/сушки/підіймачі/..., рахується поштучно за фіксованим тарифом на тип, без поділу 'новий/типовий'). Спочатку тільки зона 'Кухонне наповнення' (Львів) — інші підзони функціональної фурнітури (гардеробне наповнення, напрямні/завіси, кріпильна фурнітура) будуть окремими калькуляторами за тим самим шаблоном пізніше. Бали — орієнтовні, потребують калібрування в Admin Matrix.",
        "markup": {
            "cat_construction": 0,
            "cat_design": 0,
            "cat_assembly": 0,
            "cat_installation": 0
        }
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
            "title": "ОСНОВНІ ПАРАМЕТРИ ЗАЯВКИ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g_corpus",
            "title": "КОРПУС (СТІНА / ОСТРІВ)",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g_modules",
            "title": "МОДУЛІ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g_content",
            "title": "НАПОВНЕННЯ (конкретна фурнітура всередині модулів)",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "headerColor": "#2563eb"
            }
        }
    ],
    "fields": [
        {
            "id": "f_first_request",
            "groupId": "g_main",
            "label": "Розробка нового",
            "type": "select_yes_no",
            "labelYes": "Так",
            "labelNo": "Ні",
            "helpContent": "Разовий бал за ознайомлення з ТЗ/кресленнями на весь стенд."
        },
        {
            "id": "f_corpus_height",
            "groupId": "g_corpus",
            "label": "Висота стін, мм",
            "type": "number",
            "step": 100,
            "default": 2400,
            "layout": {
                "width": "w-50"
            },
            "helpContent": "Висота стін/каркасу стенду в міліметрах (наприклад, 2400)."
        },
        {
            "id": "f_corpus_area",
            "groupId": "g_corpus",
            "label": "Загальна площа стін, м²",
            "type": "number",
            "allowDecimal": true,
            "readOnly": true,
            "formula": "=((f_wall_1_width + f_wall_2_width + f_wall_3_width + f_wall_4_width) * f_corpus_height) / 1000000",
            "default": 0,
            "layout": {
                "width": "w-50"
            },
            "helpContent": "Сумарна площа всіх стін: (Ш1 + Ш2 + Ш3 + Ш4) × Висота / 1 000 000. Саме вона рахує вартість!"
        },
        {
            "id": "f_wall_1_width",
            "groupId": "g_corpus",
            "label": "Ширина стіни 1, мм",
            "type": "number",
            "step": 100,
            "default": 3000,
            "layout": {
                "width": "w-50"
            },
            "helpContent": "Ширина першої (основної) стіни в міліметрах.",
            "allowDecimal": false,
            "dependsOn": {
                "field": "f1789383248090",
                "values": [
                    "o1789383283336",
                    "o1789383316905",
                    "o1789383324903",
                    "o1789383333252"
                ]
            }
        },
        {
            "id": "f_wall_2_width",
            "groupId": "g_corpus",
            "label": "Ширина стіни 2, мм",
            "type": "number",
            "step": 100,
            "default": "",
            "dependsOn": {
                "field": "f1789383248090",
                "values": [
                    "o1789383316905",
                    "o1789383324903",
                    "o1789383333252"
                ]
            },
            "layout": {
                "width": "w-50"
            },
            "helpContent": "Ширина другої стіни (з'являється для Г-, П- або G-подібних форм).",
            "allowDecimal": false
        },
        {
            "id": "f_wall_3_width",
            "groupId": "g_corpus",
            "label": "Ширина стіни 3, мм",
            "type": "number",
            "step": 100,
            "default": "",
            "dependsOn": {
                "field": "f1789383248090",
                "values": [
                    "o1789383324903",
                    "o1789383333252"
                ]
            },
            "layout": {
                "width": "w-50"
            },
            "helpContent": "Ширина третьої стіни (з'являється для П- або G-подібних форм).",
            "allowDecimal": false
        },
        {
            "id": "f_wall_4_width",
            "groupId": "g_corpus",
            "label": "Ширина стіни 4, мм",
            "type": "number",
            "step": 100,
            "default": "",
            "dependsOn": {
                "field": "f1789383248090",
                "values": [
                    "o1789383333252"
                ]
            },
            "layout": {
                "width": "w-50"
            },
            "helpContent": "Ширина четвертої стіни (з'являється для G-по периметру).",
            "allowDecimal": false
        },
        {
            "id": "f_add_module",
            "groupId": "g_modules",
            "label": "",
            "type": "number",
            "default": "➕ Додати модуль",
            "helpContent": "Модуль — це загальна коробка всередині корпусу (без прив'язки до конкретної фурнітури). Якщо однакових модулів декілька — вкажіть їх сумарну площу.",
            "modalFields": [
                {
                    "id": "mf_module_type",
                    "label": "Тип модуля",
                    "type": "select",
                    "options": [
                        {
                            "value": "without_partitions",
                            "label": "Модуль без перегородок"
                        },
                        {
                            "value": "with_partitions",
                            "label": "Модуль з перегородками"
                        }
                    ]
                },
                {
                    "id": "mf_module_area",
                    "label": "Площа модуля(ів), м²",
                    "type": "number",
                    "default": 0,
                    "isMultiplier": true
                },
                {
                    "id": "mf_module_light",
                    "label": "З підсвіткою",
                    "type": "checkbox"
                }
            ],
            "allowDecimal": false
        },
        {
            "id": "f_add_content",
            "groupId": "g_content",
            "label": "",
            "type": "action_button",
            "default": "➕ Додати фурнітуру",
            "helpContent": "Оберіть тип елемента і вкажіть кількість. Тариф не залежить від бренду/кольору — беремо найскладніший реальний варіант як еталон.",
            "modalFields": [
                {
                    "id": "mf_content_type",
                    "label": "Тип елемента",
                    "type": "select",
                    "options": [
                        {
                            "value": "cargo_150",
                            "label": "Карго  низьке"
                        },
                        {
                            "value": "cargo_300_high",
                            "label": "Карго високе"
                        },
                        {
                            "value": "opt1789384664593",
                            "label": "Кошики кухонні"
                        },
                        {
                            "value": "sushka_bok",
                            "label": "Сушка в вехню базу"
                        },
                        {
                            "value": "lift_simple",
                            "label": "Підіймач простий (газліфт)"
                        },
                        {
                            "value": "lift_premium",
                            "label": "Підіймач преміум (/Müller/Blum)"
                        },
                        {
                            "value": "magic_corner",
                            "label": "Магічний кут"
                        },
                        {
                            "value": "basket",
                            "label": "Системи для (сортування) сміття"
                        },
                        {
                            "value": "hinge_glass",
                            "label": "Системи організацій для шухляд"
                        }
                    ]
                }
            ]
        },
        {
            "id": "f1789383248090",
            "groupId": "g_main",
            "label": "Форма вироба",
            "type": "select",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "placeholderText": "",
            "options": [
                {
                    "value": "o1789383283336",
                    "label": "Пряма"
                },
                {
                    "value": "o1789383316905",
                    "label": "Г-подібна"
                },
                {
                    "value": "o1789383324903",
                    "label": "П-подібна"
                },
                {
                    "value": "o1789383333252",
                    "label": "G-по периметру"
                }
            ]
        },
        {
            "id": "f1789384337124",
            "groupId": "g_modules",
            "label": "Стійки вертикальні",
            "type": "number",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1789384434554",
            "groupId": "g_modules",
            "label": "Стійка горизонтальна",
            "type": "number",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "allowDecimal": false
        }
    ],
    "products": {
        "groups": [],
        "fields": []
    },
    "rules": {
        "f_first_request": {
            "pr_c1": 5,
            "pr_d1": 5,
            "pr_a1": 3,
            "pr_i1": 3
        },
        "f_corpus_area": {
            "pr_c3": 1,
            "pr_c6": 2,
            "pr_d4": 1,
            "pr_a1": 1,
            "pr_a4": 3,
            "pr_a8": 1,
            "pr_i3": 1,
            "pr_i6": 3
        },
        "mf_module_light": {
            "pr_c6": 1,
            "pr_i8": 2
        },
        "mf_module_type": {
            "without_partitions": {
                "pr_c3": 0.5,
                "pr_c6": 1,
                "pr_d4": 0.5,
                "pr_a1": 0.5,
                "pr_a4": 1.5,
                "pr_a8": 0.5,
                "pr_i3": 0.5,
                "pr_i6": 1.5
            },
            "with_partitions": {
                "pr_c3": 1,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 3,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 3
            }
        },
        "mf_content_light": {
            "pr_c6": 1,
            "pr_i8": 2
        },
        "mf_content_lock": {
            "pr_a1": 1,
            "pr_a4": 1
        },
        "mf_content_type": {
            "cargo_150": {
                "pr_c3": 1,
                "pr_c6": 1,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 3,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 2
            },
            "cargo_200": {
                "pr_c3": 1,
                "pr_c6": 1,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 4,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 3
            },
            "cargo_300": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 6,
                "pr_a8": 2,
                "pr_i3": 1,
                "pr_i6": 4
            },
            "cargo_350": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 2,
                "pr_a1": 2,
                "pr_a4": 7,
                "pr_a8": 2,
                "pr_i3": 2,
                "pr_i6": 5
            },
            "cargo_150_high": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 5,
                "pr_a8": 2,
                "pr_i3": 1,
                "pr_i6": 4
            },
            "cargo_300_high": {
                "pr_c3": 3,
                "pr_c6": 3,
                "pr_d4": 2,
                "pr_a1": 2,
                "pr_a4": 8,
                "pr_a8": 3,
                "pr_i3": 2,
                "pr_i6": 6
            },
            "sushka_bok": {
                "pr_c3": 1,
                "pr_c6": 1,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 3,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 2
            },
            "sushka_out": {
                "pr_c3": 1,
                "pr_c6": 1,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 3,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 2
            },
            "sushka_step": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 5,
                "pr_a8": 2,
                "pr_i3": 1,
                "pr_i6": 4
            },
            "lift_simple": {
                "pr_c3": 1,
                "pr_c6": 1,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 3,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 3
            },
            "lift_premium": {
                "pr_c3": 3,
                "pr_c6": 3,
                "pr_d4": 2,
                "pr_a1": 2,
                "pr_a4": 8,
                "pr_a8": 3,
                "pr_i3": 2,
                "pr_i6": 8
            },
            "magic_corner": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 5,
                "pr_a8": 2,
                "pr_i3": 1,
                "pr_i6": 4
            },
            "tray": {
                "pr_c3": 1,
                "pr_a1": 1,
                "pr_a4": 2,
                "pr_a8": 1,
                "pr_i6": 1
            },
            "basket": {
                "pr_a1": 0.5,
                "pr_a4": 1,
                "pr_a8": 0.5,
                "pr_i6": 1
            },
            "drawer_block": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 5,
                "pr_a8": 2,
                "pr_i3": 1,
                "pr_i6": 4
            },
            "hinge_dsp": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 4,
                "pr_a8": 2,
                "pr_i3": 1,
                "pr_i6": 4
            },
            "hinge_glass": {
                "pr_c3": 3,
                "pr_c6": 3,
                "pr_d4": 2,
                "pr_a1": 2,
                "pr_a4": 7,
                "pr_a8": 3,
                "pr_i3": 2,
                "pr_i6": 7
            },
            "countertop_dsp": {
                "pr_c3": 2,
                "pr_c6": 2,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 4,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 3
            },
            "countertop_compact": {
                "pr_c3": 4,
                "pr_c6": 3,
                "pr_d4": 2,
                "pr_a1": 2,
                "pr_a4": 8,
                "pr_a8": 2,
                "pr_i3": 1,
                "pr_i6": 6
            },
            "obklad": {
                "pr_c3": 1,
                "pr_c6": 1,
                "pr_d4": 1,
                "pr_a1": 1,
                "pr_a4": 2,
                "pr_a8": 1,
                "pr_i3": 1,
                "pr_i6": 2
            },
            "other_manual": {}
        }
    },
    "modalFieldRules": {
        "f_add_content_mf_content_type": {
            "cargo_150": {
                "pr_c1": 1
            },
            "sushka_bok": {
                "pr_c1": 1
            },
            "lift_simple": {
                "pr_c1": 1
            },
            "lift_premium": {
                "pr_c1": 1
            },
            "magic_corner": {
                "pr_c1": 1
            },
            "tray": {
                "pr_c1": 1
            },
            "basket": {
                "pr_c1": 1
            }
        }
    },
    "layout": {
        "version": "v1",
        "title": "Стенд: Кухонне наповнення"
    }
};
window.Schema = Schema;