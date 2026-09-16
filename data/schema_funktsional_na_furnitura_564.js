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
            "label": "Корпус, кв.м",
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
            "label": "Стійка вертикальна",
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
            "label": "Стійка горизонтальна",
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
            "type": "select_modal",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-100"
            },
            "helpContent": "Оберіть елементи кухонного наповнення та вкажіть їх кількість.",
            "default": "➕ Додати наповнення",
            "modalFields": [
                {
                    "id": "mf_kitchen_hardware",
                    "label": "Елементи наповнення",
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
                }
            ],
            "placeholderText": "",
            "labelYes": "",
            "labelNo": ""
        },
        {
            "id": "f1789539703093",
            "groupId": "g1789538738995",
            "label": "Напрямні, завіси та підіймачі",
            "type": "select_modal",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-100"
            },
            "helpContent": "Оберіть механізми за підгрупами та вкажіть їхню кількість.",
            "default": "➕ Додати: напрямні, завіси, підіймачі",
            "modalFields": [
                {
                    "id": "mf_drawers",
                    "label": "📁 Висувні механізми",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_easys",
                            "label": "Easys електро-механічна система відчинення шухляд Hettich"
                        },
                        {
                            "value": "opt_metabox",
                            "label": "Метабокс (Розпродаж)"
                        },
                        {
                            "value": "opt_hidden_slides",
                            "label": "Направляючі Прихованого монтажу"
                        },
                        {
                            "value": "opt_telescopic_slides",
                            "label": "Направляючі Телескопічні"
                        },
                        {
                            "value": "opt_roller_slides",
                            "label": "Роликові направляючі (Розпродаж)"
                        },
                        {
                            "value": "opt_pullout_shelves",
                            "label": "Системи висувних полиць"
                        },
                        {
                            "value": "opt_sliding_tables",
                            "label": "Системи для розсувних столів"
                        },
                        {
                            "value": "opt_metal_box_drawers",
                            "label": "Системи шухляд з металевими боковинами"
                        },
                        {
                            "value": "opt_facade_adjust",
                            "label": "Універсальне регулювання фасаду шухляди"
                        }
                    ]
                },
                {
                    "id": "mf_hinges",
                    "label": "🚪 Завіси",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_hinge_accessories",
                            "label": "Аксесуари для завіс"
                        },
                        {
                            "value": "opt_hinge_dsp_mdf",
                            "label": "Завіси для фасадів з ДСП/МДФ"
                        },
                        {
                            "value": "opt_hinge_frame",
                            "label": "Завіси для фасадів з рамкового профілю"
                        },
                        {
                            "value": "opt_hinge_glass",
                            "label": "Завіси для фасадів зі скла"
                        },
                        {
                            "value": "opt_hinge_hidden",
                            "label": "Завіси прихованого монтажу"
                        },
                        {
                            "value": "opt_hinge_special",
                            "label": "Спеціальні завіси"
                        },
                        {
                            "value": "opt_hinge_joinery",
                            "label": "Столярні завіси"
                        }
                    ]
                },
                {
                    "id": "mf_p2o",
                    "label": "🔘 Механізми для фасадів без ручок (P2O)",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_p2o_auto",
                            "label": "Автоматичні механізми P2O"
                        },
                        {
                            "value": "opt_p2o_mounts",
                            "label": "Кріплення і відповідні планки для P2O"
                        },
                        {
                            "value": "opt_p2o_magnetic",
                            "label": "Магнітні замки"
                        },
                        {
                            "value": "opt_p2o_mortise",
                            "label": "Механізми P2O врізні"
                        },
                        {
                            "value": "opt_p2o_surface",
                            "label": "Механізми P2O накладні"
                        }
                    ]
                },
                {
                    "id": "mf_lifts_up",
                    "label": "🔼 Підіймачі (відкриття фасаду вгору)",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_gas_lift",
                            "label": "Газовий ліфт"
                        },
                        {
                            "value": "opt_lift_hafele",
                            "label": "Підіймачі Hafele"
                        },
                        {
                            "value": "opt_lift_muller",
                            "label": "Підіймачі Muller"
                        },
                        {
                            "value": "opt_lift_universal",
                            "label": "Універсальні механізми"
                        }
                    ]
                },
                {
                    "id": "mf_lifts_down",
                    "label": "🔽 Механізми (відкриття фасаду вниз)",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_gas_lift_reverse",
                            "label": "Газліфти зворотньої дії"
                        },
                        {
                            "value": "opt_kiaro",
                            "label": "Механізми Italiana Ferramenta KIARO"
                        },
                        {
                            "value": "opt_door_limiters",
                            "label": "Обмежувачі відкривання дверей"
                        },
                        {
                            "value": "opt_lift_bar_hinges",
                            "label": "Барні завіси для підіймачів"
                        }
                    ]
                }
            ],
            "placeholderText": "",
            "labelYes": "",
            "labelNo": ""
        },
        {
            "id": "f1789541033848",
            "groupId": "g1789538738995",
            "label": "Зона Джокерів та Гардеробного наповнення",
            "type": "select_modal",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-100"
            },
            "helpContent": "Оберіть елементи гардеробного наповнення та системи джокерів за підгрупами.",
            "default": "➕ Додати: Джокери та гардеробне наповнення",
            "modalFields": [
                {
                    "id": "mf_wardrobe_content",
                    "label": "👔 Гардеробне наповнення",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_trousers",
                            "label": "Брючниці"
                        },
                        {
                            "value": "opt_laundry_baskets",
                            "label": "Кошики для одягу та білизни"
                        },
                        {
                            "value": "opt_shoe_racks",
                            "label": "Кошики, полиці для взуття"
                        },
                        {
                            "value": "opt_microlifts_tie",
                            "label": "Мікроліфти, галстучниці"
                        },
                        {
                            "value": "opt_wardrobe_drawer_org",
                            "label": "Організації для шухляд"
                        },
                        {
                            "value": "opt_pantographs",
                            "label": "Пантографи"
                        },
                        {
                            "value": "opt_ironing_board",
                            "label": "Прасувальна дошка"
                        },
                        {
                            "value": "opt_foxydry",
                            "label": "Сушарки для білизни Foxydry"
                        },
                        {
                            "value": "opt_mirror_muller",
                            "label": "Дзеркало гардеробне 935*308*31 Muller"
                        },
                        {
                            "value": "opt_facade_mount_muller",
                            "label": "Кріплення фасадів для гардеробного наповнення Muller"
                        }
                    ]
                },
                {
                    "id": "mf_joker_systems",
                    "label": "🏗️ Гардеробні системи (Джокери)",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_joker_system",
                            "label": "Joker System"
                        },
                        {
                            "value": "opt_cosma",
                            "label": "Гардеробна система Cosma"
                        },
                        {
                            "value": "opt_ferro_fiori",
                            "label": "Гардеробна система Ferro Fiori"
                        },
                        {
                            "value": "opt_lumine_tubes",
                            "label": "Гардеробні труби Lumine"
                        },
                        {
                            "value": "opt_polysystem",
                            "label": "Полісистема"
                        }
                    ]
                }
            ],
            "placeholderText": "",
            "labelYes": "",
            "labelNo": ""
        },
        {
            "id": "f1789542100000",
            "groupId": "g1789538738995",
            "label": "Зона кріпильної фурнітури",
            "type": "select_modal",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-100"
            },
            "helpContent": "Оберіть з'єднувальну та кріпильну фурнітуру за підгрупами та вкажіть кількість.",
            "default": "➕ Додати: кріпильна та з'єднувальна фурнітура",
            "modalFields": [
                {
                    "id": "mf_connecting_hardware",
                    "label": "🔩 З'єднувальна фурнітура (конфірмати, мініфікси, рафікси та ін.)",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_corpus_ties",
                            "label": "Корпусні стяжки (конфірмати, мініфікси та ін.)"
                        },
                        {
                            "value": "opt_intersec_ties",
                            "label": "Міжсекційні стяжки"
                        },
                        {
                            "value": "opt_brackets_plates",
                            "label": "Монтажні куточки та пластини"
                        },
                        {
                            "value": "opt_bed_ties",
                            "label": "Стяжки для ліжок"
                        },
                        {
                            "value": "opt_shelf_ties",
                            "label": "Стяжки для полиць (рафікси та ін.)"
                        },
                        {
                            "value": "opt_countertop_ties",
                            "label": "Стяжки для стільниць"
                        },
                        {
                            "value": "opt_dowels_lamellas",
                            "label": "Шканти та ламелі"
                        }
                    ]
                },
                {
                    "id": "mf_fastener_hardware",
                    "label": "🪛 Кріпильна фурнітура (саморізи, гвинти, єврогвинти та ін.)",
                    "type": "multiselect_qty",
                    "isMultiplier": false,
                    "options": [
                        {
                            "value": "opt_bolts_studs",
                            "label": "Болти та шпильки"
                        },
                        {
                            "value": "opt_nuts_washers",
                            "label": "Гайки та шайби"
                        },
                        {
                            "value": "opt_screws_euroscrews",
                            "label": "Гвинти та єврогвинти"
                        },
                        {
                            "value": "opt_dowels_anchors",
                            "label": "Дюбелі, анкери та шуруп-крюки (Будівельні кріплення)"
                        },
                        {
                            "value": "opt_dvp_fasteners",
                            "label": "Кріплення для ДВП (ЛХДФ)"
                        },
                        {
                            "value": "opt_glass_mirror_fasteners",
                            "label": "Кріплення для скла та дзеркал"
                        },
                        {
                            "value": "opt_bushings_spacers",
                            "label": "Муфти, втулки та прокладки"
                        },
                        {
                            "value": "opt_self_tapping_screws",
                            "label": "Саморізи та шурупи"
                        }
                    ]
                }
            ],
            "placeholderText": "",
            "labelYes": "",
            "labelNo": ""
        },
        {
            "id": "f1789541881042",
            "groupId": "g1789481047588",
            "label": "Нова дія",
            "type": "number",
            "layout": {
                "inpBorder": "#000000"
            }
        },
        {
            "id": "f1789541892287",
            "groupId": "g1789481047588",
            "label": "Підсвітка",
            "type": "select_modal",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "default": "",
            "placeholderText": "",
            "labelYes": "",
            "labelNo": "",
            "modalFields": [
                {
                    "id": "mf1789541958625",
                    "label": "Кількість світових ліній",
                    "type": "number",
                    "isMultiplier": false
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