const Schema = {
    "meta": {
        "version": "2.2",
        "title": "Новий калькулятор",
        "lastUpdated": "2026-01-09",
        "markup": {
            "cat_construction": 10,
            "cat_design": 10,
            "cat_assembly": 10,
            "cat_installation": 10
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
            "title": "ОСНОВНІ ПАРАМЕТРИ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1767987129232",
            "title": "ДОДАТКОВІ ПАРАМЕТРИ ДЛЯ ПРОЄКТУВАННЯ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768680996055",
            "title": "МАТЕРІАЛИ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768680413215",
            "title": "СТІЛЬНИЦЯ",
            "layout": {
                "width": "50%",
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768682348005",
            "title": "ФАРТУХ",
            "layout": {
                "width": "50%",
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768682883092",
            "title": "МОДУЛІ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768688857668",
            "title": "ДОДАТКОВІ ЕЛЕМЕНТИ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768690215898",
            "title": "ФУНКЦІОНАЛЬНА ФУРНІТУРА",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 12,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768692820958",
            "title": "РУЧКИ",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        },
        {
            "id": "g1768692944843",
            "title": "Підсвітка",
            "layout": {
                "titleSize": 16,
                "titleWeight": 700,
                "fieldSize": 14,
                "fieldWeight": 600,
                "headerColor": "#2563eb"
            }
        }
    ],
    "fields": [
        {
            "id": "f1767963693179",
            "groupId": "g_main",
            "label": "Форма кухні",
            "type": "select",
            "layout": {
                "inpBorder": "#0d0d0d",
                "placeholder": "ввести 0 або значення",
                "inputWidth": 100,
                "width": "w-50"
            },
            "helpContent": "",
            "placeholderText": "--Виберіть--",
            "options": [
                {
                    "value": "o1768126302128",
                    "label": "Пряма"
                },
                {
                    "value": "o1768126358353",
                    "label": "Г-подібна"
                },
                {
                    "value": "o1768126364753",
                    "label": " П-подібна"
                },
                {
                    "value": "o1768126371016",
                    "label": "G-подібна (по периметру)"
                }
            ]
        },
        {
            "id": "f1767963695152",
            "groupId": "g_main",
            "label": "Наявність острова",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#0d0d0d",
                "placeholder": "ввести 0 або значення",
                "inputWidth": 100,
                "width": "w-50"
            },
            "helpContent": ""
        },
        {
            "id": "f1767963696506",
            "groupId": "g_main",
            "label": "Нестандартна геометрія приміщення",
            "type": "select_yes_no",
            "layout": {
                "placeholder": "опис",
                "helpImg": "images/hints/Gemini_Generated_Image_vp3maavp3maavp3m.png",
                "help": "наявність колон, вентюшахт, балок, виступів тощо",
                "width": "w-50",
                "inpBorder": "#0f0f0f"
            },
            "helpContent": ""
        },
        {
            "id": "f1768127632277",
            "groupId": "g_main",
            "label": "Заміри                                         ",
            "type": "select",
            "layout": {
                "width": "w-50",
                "inpBorder": "#0f0f0f",
                "placeholder": ""
            },
            "helpContent": "",
            "placeholderText": "",
            "options": [
                {
                    "value": "o1768134080487",
                    "label": "Без замірів"
                },
                {
                    "value": "o1768134108853",
                    "label": "Замір ручний по фото"
                },
                {
                    "value": "o1768134116972",
                    "label": "Замір 3D по фото"
                }
            ]
        },
        {
            "id": "f1768676820324",
            "groupId": "g_main",
            "label": "Техніка",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "inputWidth": 30,
                "placeholder": "ввести 0 або значення"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768676867732",
            "groupId": "g1767987129232",
            "label": "Підготовка карти заміру",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50"
            },
            "helpContent": ""
        },
        {
            "id": "f1768679130585",
            "groupId": "g1767987129232",
            "label": "Підготовка монтажних схем для комунікацій",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50"
            },
            "helpContent": ""
        },
        {
            "id": "f1768679146785",
            "groupId": "g1767987129232",
            "label": "Переклад (Крелсення)",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50"
            },
            "helpContent": ""
        },
        {
            "id": "f1768679185689",
            "groupId": "g1767987129232",
            "label": "Креслення на погодження в дюймовій системі",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50"
            },
            "helpContent": ""
        },
        {
            "id": "f1768681003870",
            "groupId": "g1768680996055",
            "label": "",
            "type": "action_button",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "column",
                "inputWidth": 100,
                "width": "w-100",
                "fontSize": 16
            },
            "helpContent": "",
            "default": "Додати матеріал",
            "modalFields": [
                {
                    "id": "mf_1768681046495",
                    "label": "Загальна к-ть матеріалів:",
                    "type": "number",
                    "default": 0,
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681064200",
                    "label": "ДСП",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681261606",
                    "label": "МДФ плити",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681274358",
                    "label": "Фарба/плівка 'прямі'",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681285630",
                    "label": "Фарба/плівка 'фрезеровані'",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681300509",
                    "label": "Шпоновані 'прямі'",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681310974",
                    "label": "Шпоновані 'фрезеровані'",
                    "type": "checkbox",
                    "default": 0,
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681323565",
                    "label": "Алюм. рамкові",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681333870",
                    "label": "Скло-дзеркало",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681348062",
                    "label": "ARPA/Fenix",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681398606",
                    "label": "HPL фасади Fiushin",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681415400",
                    "label": "HPL компакт плита",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681427238",
                    "label": "МДФ фасади з індивідуальним фрезеруванням к-сть штук",
                    "type": "number",
                    "default": 0,
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768681431479",
                    "label": "перехід текстури(кількість матеріалів з переходом текстур)",
                    "type": "number",
                    "default": 0,
                    "layout": {
                        "inpBorder": "#000000"
                    }
                }
            ]
        },
        {
            "id": "f1768680415543",
            "groupId": "g1768680413215",
            "label": "",
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
                    "id": "mf_1768680514535",
                    "label": "Матеріал",
                    "type": "select",
                    "default": 0,
                    "layout": {
                        "inpBorder": "#000000"
                    },
                    "options": [
                        {
                            "value": "opt1",
                            "label": "ДСП-МДФ"
                        },
                        {
                            "value": "opt1768680602856",
                            "label": "Керамограніт-Кварц"
                        },
                        {
                            "value": "opt1768680610239",
                            "label": "HPL компакт плита"
                        },
                        {
                            "value": "opt1768680619775",
                            "label": "Акрил"
                        },
                        {
                            "value": "opt1768680624711",
                            "label": "R&D (дерево-метал)"
                        }
                    ]
                },
                {
                    "id": "mf_1768680648375",
                    "label": "Форма стільниці",
                    "type": "select",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    },
                    "options": [
                        {
                            "value": "opt1",
                            "label": "Пряма"
                        },
                        {
                            "value": "opt2",
                            "label": "Г-подібна"
                        },
                        {
                            "value": "opt1768680679271",
                            "label": "П-подібна"
                        },
                        {
                            "value": "opt1768680684147",
                            "label": "G-подібна (по периметру)"
                        }
                    ]
                },
                {
                    "id": "mf_1768680731607",
                    "label": "Опуски",
                    "type": "checkbox_qty",
                    "default": "Додати",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                }
            ]
        },
        {
            "id": "f1768682469949",
            "groupId": "g1768682348005",
            "label": "",
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
                    "id": "mf_1768682541004",
                    "label": "ДСП-МДФ",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768682626758",
                    "label": "Керамограніт-Кварц",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768682643916",
                    "label": "ДСП-МДФ",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768682662885",
                    "label": "Акрил",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768682673916",
                    "label": "Скло",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768682686428",
                    "label": "R&D (дерево-метал)",
                    "type": "checkbox",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                }
            ]
        },
        {
            "id": "f1768682886611",
            "groupId": "g1768682883092",
            "label": "Нижні модул",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768682914364",
            "groupId": "g1768682883092",
            "label": "Верхні модулі",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768682927420",
            "groupId": "g1768682883092",
            "label": "Антресолі",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768682937380",
            "groupId": "g1768682883092",
            "label": "Пенали",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768688860220",
            "groupId": "g1768688857668",
            "label": "",
            "type": "select_modal",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "default": "",
            "modalFields": [
                {
                    "id": "mf_1768688973044",
                    "label": "Фальш горизонтальні - Карниз",
                    "type": "select_yes_no",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768688989525",
                    "label": "Фальш вертикальні",
                    "type": "select_yes_no",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768689016476",
                    "label": "Металоконструкція рамкова",
                    "type": "checkbox_qty",
                    "default": "Додати",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768689037228",
                    "label": "Металоконструкція обʼємна",
                    "type": "checkbox_qty",
                    "default": "Додати",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768689059772",
                    "label": "Вентмагістраль",
                    "type": "select_yes_no",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    }
                },
                {
                    "id": "mf_1768689088836",
                    "label": "Деталь R&D, гнутий елемент тощо",
                    "type": "multiselect",
                    "default": "",
                    "layout": {
                        "inpBorder": "#000000"
                    },
                    "options": [
                        {
                            "value": "opt1",
                            "label": "Кількість типів елементів"
                        },
                        {
                            "value": "opt2",
                            "label": "Загальна кількість деталей"
                        }
                    ]
                }
            ],
            "placeholderText": "",
            "labelYes": "",
            "labelNo": ""
        },
        {
            "id": "f1768690218763",
            "groupId": "g1768690215898",
            "label": "Ящики",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "placeholder": "вкажіть кількість або 0",
                "inputOffset": 0,
                "labelWidth": 117,
                "width": "w-50",
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": true,
                "spaced": true,
                "padding": 11,
                "gap": 1,
                "color": "#0d0c0c",
                "fontSize": 10,
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal",
                "textAlign": "left"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690258315",
            "groupId": "g1768690215898",
            "label": "Висувна полиця",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 123,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": true,
                "spaced": true,
                "padding": 11,
                "gap": 1,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690271642",
            "groupId": "g1768690215898",
            "label": "Підйомні механізми",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 123,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": false,
                "spaced": true,
                "padding": 11,
                "gap": 1,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690281586",
            "groupId": "g1768690215898",
            "label": "Карго/сушки",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 123,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": false,
                "spaced": true,
                "padding": 11,
                "gap": 1,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690295730",
            "groupId": "g1768690215898",
            "label": "Магічний кут",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 123,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": false,
                "spaced": false,
                "padding": 11,
                "gap": 1,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690305298",
            "groupId": "g1768690215898",
            "label": "Servo-Drive",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 123,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": true,
                "spaced": true,
                "padding": 11,
                "gap": 1,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690315195",
            "groupId": "g1768690215898",
            "label": "Консольні полиці",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 123,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": false,
                "spaced": true,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal",
                "gap": 1,
                "padding": 11
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690327098",
            "groupId": "g1768690215898",
            "label": "Висувний механізм для верхніх шухляд",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 123,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": false,
                "spaced": false,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal",
                "gap": 1,
                "padding": 11
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690334882",
            "groupId": "g1768690215898",
            "label": "Системи розсувних дверей (Revego, Hawa, Salice, pocket doors)",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 121,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": true,
                "spaced": false,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal",
                "gap": 1,
                "padding": 11
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768690344482",
            "groupId": "g1768690215898",
            "label": "Slide M, WingLine L",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "flexDirection": "row",
                "inputWidth": 100,
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0",
                "fontSize": 10,
                "inputOffset": 0,
                "textAlign": "left",
                "labelWidth": 119,
                "fontWeight": "400",
                "marginTop": -10,
                "marginLeft": 0,
                "cardRadius": 25,
                "uppercase": false,
                "color": "#0d0c0c",
                "inpBorderWidth": 0,
                "inpRadius": 8,
                "lineHeight": "1",
                "fontStyle": "normal",
                "spaced": true,
                "gap": 1,
                "padding": 11
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768216195464",
            "groupId": "g1767963732768",
            "label": "Модулі з підсвіткою",
            "type": "number",
            "helpContent": "",
            "layout": {
                "inpBorder": "#0c0d0d",
                "width": "w-25",
                "placeholder": "виберіть 0 або значення"
            },
            "allowDecimal": true
        },
        {
            "id": "f1768216216136",
            "groupId": "g1767963732768",
            "label": "підсвітка робочої зони",
            "type": "select_yes_no",
            "helpContent": "",
            "layout": {
                "inpBorder": "#0c0d0d",
                "width": "w-25"
            }
        },
        {
            "id": "f1768216347896",
            "groupId": "g1767963732768",
            "label": "Підсвітка цоколя",
            "type": "select_yes_no",
            "helpContent": "",
            "layout": {
                "inpBorder": "#0c0d0d",
                "width": "w-25"
            }
        },
        {
            "id": "f1768216371104",
            "groupId": "g1767963732768",
            "label": "Окремі елементи з підсвітко ",
            "type": "number",
            "layout": {
                "inpBorder": "#0c0d0d",
                "width": "w-25",
                "placeholder": "виберіть 0 або значення"
            }
        },
        {
            "id": "f1768679269552",
            "groupId": "g1768679265657",
            "label": "Загальна к-ть матеріалів",
            "type": "number",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768679291776",
            "groupId": "g1768679265657",
            "label": "Вид матеріалів",
            "type": "multiselect",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "placeholderText": "",
            "options": [
                {
                    "value": "o1768679317504",
                    "label": "ДСП"
                },
                {
                    "value": "o1768679326600",
                    "label": "ХДФ / ДВП"
                },
                {
                    "value": "o1768679333864",
                    "label": "МДФ плити"
                },
                {
                    "value": "o1768680282240",
                    "label": "Фарба/плівка 'прямі'"
                },
                {
                    "value": "o1768680291295",
                    "label": "Фарба/плівка 'фрезеровані'"
                },
                {
                    "value": "o1768680299767",
                    "label": "Шпоновані 'прямі'"
                },
                {
                    "value": "o1768680308735",
                    "label": "Шпоновані 'фрезеровані'"
                },
                {
                    "value": "o1768680317623",
                    "label": "Алюмінієві фасади"
                },
                {
                    "value": "o1768680326071",
                    "label": "Скло/Дзеркало"
                },
                {
                    "value": "o1768680346007",
                    "label": "ARPA/Fenix"
                },
                {
                    "value": "o1768680351215",
                    "label": "HPL компакт плита"
                },
                {
                    "value": "o1768680361087",
                    "label": "HPL фасади FUSION"
                }
            ]
        },
        {
            "id": "f1768680369784",
            "groupId": "g1768679265657",
            "label": "МДФ фасади з індивідуальним фрезеруванням",
            "type": "number",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768680388879",
            "groupId": "g1768679265657",
            "label": "Перехід текстури",
            "type": "number",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768688295430",
            "groupId": "g1768688291559",
            "label": "Фальш горизонтальні - Карниз",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": ""
        },
        {
            "id": "f1768688326668",
            "groupId": "g1768688291559",
            "label": "Фальш вертикальні",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000"
            },
            "helpContent": ""
        },
        {
            "id": "f1768692947766",
            "groupId": "g1768692944843",
            "label": "Модулі з підсвіткою:(к-ть)",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768692967646",
            "groupId": "g1768692944843",
            "label": "Підсвітка робочої зони",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50"
            },
            "helpContent": "",
            "options": [
                {
                    "value": "o1768692987646",
                    "label": "Підсвітка цоколя"
                }
            ]
        },
        {
            "id": "f1768693014206",
            "groupId": "g1768692944843",
            "label": "Підсвітка цоколя",
            "type": "select_yes_no",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50"
            },
            "helpContent": ""
        },
        {
            "id": "f1768693027791",
            "groupId": "g1768692944843",
            "label": "Окремі елементи з підсвітко",
            "type": "number",
            "layout": {
                "inpBorder": "#000000",
                "width": "w-50",
                "placeholder": "вкажіть кількість або 0"
            },
            "helpContent": "",
            "allowDecimal": false
        },
        {
            "id": "f1768693176830",
            "groupId": "g1768692820958",
            "label": "",
            "type": "select_modal",
            "layout": {
                "inpBorder": "#000000",
                "inputWidth": 36
            },
            "helpContent": "",
            "default": "",
            "placeholderText": "",
            "labelYes": "",
            "labelNo": "",
            "modalFields": [
                {
                    "id": "mf1768693267102",
                    "label": "GOLA низ",
                    "type": "checkbox"
                },
                {
                    "id": "mf1768693275998",
                    "label": "GOLA верх",
                    "type": "checkbox"
                },
                {
                    "id": "mf1768693286111",
                    "label": "GOLA вертикальна",
                    "type": "checkbox"
                },
                {
                    "id": "mf1768693293621",
                    "label": "Торцев",
                    "type": "checkbox"
                },
                {
                    "id": "mf1768693304269",
                    "label": "Фрезеровані",
                    "type": "checkbox"
                },
                {
                    "id": "mf1768693318077",
                    "label": "Рush-to-open",
                    "type": "checkbox"
                },
                {
                    "id": "mf1768693326438",
                    "label": "Інші",
                    "type": "checkbox"
                }
            ]
        }
    ],
    "products": {
        "groups": [],
        "fields": []
    },
    "rules": {
        "f1767963693179": {
            "pr_c1": 10,
            "pr_c2": 0,
            "pr_a1": 10,
            "pr_a2": 10,
            "pr_i1": 10,
            "o1768126302128": {
                "pr_c1": 3,
                "pr_c3": 1,
                "pr_c2": 1,
                "pr_c7": 3,
                "pr_c6": 2,
                "pr_c9": 3,
                "pr_c12": 3,
                "pr_d1": 3,
                "pr_d2": 6,
                "pr_d3": 1,
                "pr_d6": 1,
                "pr_d9": 6,
                "pr_d10": 2,
                "pr_d11": 1,
                "pr_i1": 3,
                "pr_i2": 2
            },
            "o1768126358353": {
                "pr_c1": 3,
                "pr_c6": 3,
                "pr_c7": 3,
                "pr_c2": 2,
                "pr_c3": 3,
                "pr_c9": 4,
                "pr_c12": 3,
                "pr_d1": 3,
                "pr_d2": 6,
                "pr_d3": 2,
                "pr_d6": 1,
                "pr_d9": 12,
                "pr_d10": 2,
                "pr_d11": 1,
                "pr_i1": 3,
                "pr_i2": 2
            },
            "o1768126364753": {
                "pr_c1": 3,
                "pr_c4": 0,
                "pr_c5": 0,
                "pr_c2": 4,
                "pr_c3": 4,
                "pr_c7": 3,
                "pr_c6": 3,
                "pr_c9": 6,
                "pr_c12": 3,
                "pr_d1": 3,
                "pr_d2": 6,
                "pr_d3": 4,
                "pr_d6": 1,
                "pr_d9": 18,
                "pr_d10": 2,
                "pr_d11": 1,
                "pr_i1": 3,
                "pr_i2": 2
            },
            "o1768126371016": {
                "pr_c1": 3,
                "pr_c2": 6,
                "pr_c3": 6,
                "pr_c7": 3,
                "pr_c6": 3,
                "pr_c9": 8,
                "pr_c12": 3,
                "pr_d1": 3,
                "pr_d2": 6,
                "pr_d3": 6,
                "pr_d6": 1,
                "pr_d9": 24,
                "pr_d10": 2,
                "pr_d11": 1,
                "pr_i1": 3,
                "pr_i2": 2
            }
        },
        "f1767963691670": {
            "pr_c1": 0,
            "_total_cat_construction": "= val == 0 ? 0 : val <= 5 ? 5 : val <= 10 ? 7 : val <= 15 ? 9 : 11",
            "pr_a1": 10,
            "pr_a3": 10,
            "pr_i1": 10
        },
        "f1767963695152": {
            "pr_c1": 2,
            "pr_a1": 0,
            "pr_i1": 1,
            "pr_i2": 1,
            "pr_c6": 1,
            "pr_d6": 1,
            "pr_d9": 3
        },
        "f1767963696506": {
            "pr_c1": 1,
            "pr_a1": 0,
            "pr_i1": 3,
            "pr_c2": 3,
            "pr_c9": 1,
            "pr_d1": 1,
            "pr_d3": 3,
            "pr_i2": 3
        },
        "f1768127632277": {
            "o1768134080487": {
                "pr_c1": 0,
                "pr_c2": 1
            },
            "o1768134108853": {
                "pr_c1": 1,
                "pr_c5": 0,
                "pr_c6": 1,
                "pr_c7": 0,
                "pr_c2": 6,
                "pr_c9": 2,
                "pr_d1": 2,
                "pr_d3": 4
            },
            "o1768134116972": {
                "pr_c1": 1,
                "pr_c4": 0,
                "pr_c2": 3,
                "pr_c6": 1,
                "pr_d1": 2,
                "pr_d3": 2
            }
        },
        "f1768216195464": {
            "pr_c1": {
                "v": 10,
                "once": true
            },
            "_total_cat_construction": "= val == 0 ? 0 : val <= 5 ? 10 : val <= 10 ? 15 : val <= 15 ? 20 : 21",
            "pr_d1": 100
        },
        "f1768216216136": {
            "pr_c1": 10,
            "pr_d1": 100
        },
        "f1768216347896": {
            "pr_c1": 10,
            "pr_d1": 100
        },
        "f1768216371104": {
            "pr_c1": 10,
            "pr_d1": 100
        },
        "f1768471219330": {
            "o1768471244481": {
                "pr_c3": 10,
                "pr_c4": 10,
                "pr_c5": 10,
                "pr_c1": 10
            },
            "o1768471243553": {
                "pr_c5": 10,
                "pr_c1": 10
            },
            "o1768471245257": {
                "pr_c3": 10,
                "pr_c1": 10
            }
        },
        "f1768471497645": {
            "o1768471512757": {
                "pr_c3": 10,
                "pr_c1": 10
            },
            "o1768471511981": {
                "pr_c4": 10,
                "pr_c1": 10
            },
            "o1768471513597": {
                "pr_c4": 10,
                "pr_c1": 10
            }
        },
        "f1768471064143": {
            "pr_c1": 10
        },
        "f1768471066582": {
            "pr_c1": 10,
            "pr_c7": 0
        },
        "f1768471062862": {
            "pr_c1": 10
        },
        "f1768679291776": {
            "o1768679317504": {
                "pr_c1": 10
            },
            "o1768679326600": {
                "pr_c1": 10
            },
            "o1768679333864": {
                "pr_c1": 10
            },
            "o1768680282240": {
                "pr_c1": 10
            },
            "o1768680291295": {
                "pr_c1": 10
            },
            "o1768680299767": {
                "pr_c1": 10
            },
            "o1768680308735": {
                "pr_c1": 10
            },
            "o1768680326071": {
                "pr_c1": 10
            },
            "o1768680317623": {
                "pr_c1": 10
            },
            "o1768680346007": {
                "pr_c1": 10
            },
            "o1768680351215": {
                "pr_c1": 10
            },
            "o1768680361087": {
                "pr_c1": 10
            }
        },
        "f1768679269552": {
            "pr_c1": 10
        },
        "f1768680388879": {
            "pr_c1": 10
        },
        "f1768680369784": {
            "pr_c1": 10
        },
        "f1768682914364": {
            "pr_c1": 0,
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_d4": 1,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a8": 1,
            "pr_a9": 1
        },
        "f1768682927420": {
            "pr_c1": 0,
            "pr_c5": 1,
            "pr_c4": 1,
            "pr_d4": 1,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a8": 1,
            "pr_a9": 1
        },
        "f1768682886611": {
            "pr_c1": 0,
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_d4": 1,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a9": 1
        },
        "f1768682937380": {
            "pr_c1": 0,
            "pr_c5": 1,
            "pr_c4": 2,
            "pr_d4": 2,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a9": 1
        },
        "f1768690281586": {
            "pr_c1": 0,
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_d4": 1,
            "pr_a8": 1,
            "pr_a5": 1,
            "pr_a3": 2
        },
        "f1768690315195": {
            "pr_c1": 0,
            "pr_c4": 1,
            "pr_c12": 1,
            "pr_d4": 1,
            "pr_a8": 1,
            "pr_a9": 1,
            "pr_a5": 1,
            "pr_a3": 1
        },
        "f1768690327098": {
            "pr_c1": 2,
            "pr_c4": 2,
            "pr_d4": 1,
            "pr_d1": 1,
            "pr_a8": 1,
            "pr_a9": 1,
            "pr_a5": 1,
            "pr_a3": 1
        },
        "f1768690334882": {
            "pr_c1": 3,
            "pr_c5": 2,
            "pr_c10": 2,
            "pr_c12": 3,
            "pr_c9": 4,
            "pr_c4": 4,
            "pr_c3": 6,
            "pr_c14": 3,
            "pr_c13": 3,
            "pr_d5": 1,
            "pr_d6": 1,
            "pr_d7": 2,
            "pr_d2": 2,
            "pr_d8": 1,
            "pr_d4": 5,
            "pr_d1": 3,
            "pr_a8": 1,
            "pr_a9": 1,
            "pr_a5": 1,
            "pr_a3": 12
        },
        "f1768690344482": {
            "pr_c1": 0,
            "pr_c4": 1,
            "pr_c3": 1,
            "pr_c5": 1,
            "pr_c12": 1,
            "pr_d4": 1,
            "pr_d1": 1,
            "pr_a9": 2,
            "pr_a8": 2,
            "pr_a5": 4,
            "pr_a3": 6
        },
        "f1768690295730": {
            "pr_c1": 2,
            "pr_c4": 2,
            "pr_d1": 1,
            "pr_d4": 2,
            "pr_a8": 1,
            "pr_a5": 1,
            "pr_a3": 2,
            "pr_a9": 2
        },
        "f1768690305298": {
            "pr_c1": 2,
            "pr_c12": 2,
            "pr_c4": 3,
            "pr_d1": 1,
            "pr_a8": 1,
            "pr_a9": 1,
            "pr_a5": 1,
            "pr_a3": 1
        },
        "f1768690271642": {
            "pr_c1": 0,
            "pr_c4": 2,
            "pr_d4": 1,
            "pr_a9": 1,
            "pr_a8": 1,
            "pr_a5": 1,
            "pr_a3": 1
        },
        "f1768690258315": {
            "pr_c1": 0,
            "pr_c4": 2,
            "pr_d4": 1,
            "pr_a8": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a3": 1
        },
        "f1768690218763": {
            "pr_c1": 0,
            "pr_c4": 1,
            "pr_d4": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a8": 1,
            "pr_a3": 1
        },
        "f1768692826392": {
            "pr_c1": 10,
            "o1768692886182": {
                "pr_c1": 10
            },
            "o1768692895015": {
                "pr_c1": 10
            },
            "o1768692902839": {
                "pr_c1": 10
            },
            "o1768692913726": {
                "pr_c1": 10
            },
            "o1768692919638": {
                "pr_c1": 10
            }
        },
        "f1768692947766": {
            "pr_c1": 0,
            "pr_c5": 1,
            "pr_c4": 1,
            "pr_c12": 1,
            "pr_c8": 2,
            "pr_d4": 1,
            "pr_d9": 1,
            "pr_a2": 1,
            "pr_a4": 2
        },
        "f1768693027791": {
            "pr_c1": 0,
            "pr_c3": 1,
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_c12": 1,
            "pr_c8": 2,
            "pr_d4": 1,
            "pr_d5": 1,
            "pr_d9": 1,
            "pr_a4": 2
        },
        "f1768692967646": {
            "pr_c1": 0,
            "pr_c5": 1,
            "pr_c12": 1,
            "pr_c4": 2,
            "pr_c8": 2,
            "pr_d4": 1,
            "pr_d5": 1,
            "pr_d9": 1,
            "pr_a9": 1,
            "pr_a8": 1,
            "pr_a5": 2,
            "pr_a6": 2
        },
        "f1768693014206": {
            "pr_c1": 0,
            "pr_c5": 1,
            "pr_c4": 1,
            "pr_c3": 1,
            "pr_c12": 1,
            "pr_c8": 2,
            "pr_d4": 1,
            "pr_d5": 1,
            "pr_d9": 1,
            "pr_a9": 1,
            "pr_a8": 1,
            "pr_a5": 2,
            "pr_a6": 2
        },
        "f1768679146785": {
            "pr_c1": 3,
            "pr_c6": 3,
            "pr_c8": 3,
            "pr_d9": 6,
            "pr_d10": 2
        },
        "f1768676820324": {
            "pr_c1": 3,
            "pr_c3": 2,
            "pr_c4": 1,
            "pr_d1": 2,
            "pr_d4": 1,
            "pr_d5": 1,
            "pr_a2": 1,
            "pr_a5": 2,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a9": 1,
            "pr_a8": 2
        },
        "f1768679130585": {
            "pr_d9": 3
        },
        "f1768676867732": {
            "pr_d9": 3
        },
        "f1768679185689": {
            "pr_d9": 3
        }
    },
    "modalFieldRules": {
        "f1767987131252_mf_1767987337619": {
            "pr_c1": 10,
            "pr_c2": 10
        },
        "f1767987131252_mf_1767987351323": {
            "pr_c2": 10
        },
        "f1768559493803_mf_1768559510172": {
            "opt2": {
                "pr_c1": 10
            },
            "opt1": {
                "pr_c1": 10
            }
        },
        "f1768559493803_mf_1768576336731": {
            "pr_c1": 10,
            "pr_c2": 10
        },
        "f1768559493803_mf_1768576309962": {
            "pr_c2": 10
        },
        "f1768680415543_mf_1768680648375": {
            "pr_c1": 0,
            "opt1": {
                "pr_c1": 0,
                "pr_c4": 1,
                "pr_c3": 1,
                "pr_a6": 1,
                "pr_a5": 1
            },
            "opt1768680679271": {
                "pr_c1": 0,
                "pr_c4": 1,
                "pr_c3": 3,
                "pr_a5": 3,
                "pr_a6": 3
            },
            "opt2": {
                "pr_c1": 0,
                "pr_c4": 1,
                "pr_c3": 2,
                "pr_a5": 2,
                "pr_a6": 2
            },
            "opt1768680684147": {
                "pr_c1": 0,
                "pr_c4": 1,
                "pr_c3": 4,
                "pr_a5": 4,
                "pr_a6": 4
            }
        },
        "f1768680415543_mf_1768680731607": {
            "pr_c1": 0,
            "pr_c3": 1,
            "pr_c4": 1,
            "pr_d4": 1
        },
        "f1768680415543_mf_1768680514535": {
            "opt1768680610239": {
                "pr_c1": 1,
                "pr_c3": 1,
                "pr_c5": 1,
                "pr_c9": 1,
                "pr_c12": 1,
                "pr_c10": 2,
                "pr_c13": 1,
                "pr_d4": 2,
                "pr_a1": 1,
                "pr_a2": 1,
                "pr_a5": 2,
                "pr_a6": 2
            },
            "opt1768680602856": {
                "pr_c1": 1,
                "pr_c3": 1,
                "pr_c5": 1,
                "pr_c9": 1,
                "pr_c8": 4,
                "pr_c10": 2,
                "pr_d4": 2,
                "pr_d7": 2
            },
            "opt1": {
                "pr_c1": 1,
                "pr_c3": 1,
                "pr_c5": 1,
                "pr_c9": 1,
                "pr_c10": 1,
                "pr_c12": 1,
                "pr_d4": 1,
                "pr_a2": 1,
                "pr_a1": 1,
                "pr_a6": 2,
                "pr_a5": 2
            },
            "opt1768680624711": {
                "pr_c1": 1,
                "pr_c5": 1,
                "pr_c9": 1,
                "pr_c12": 1,
                "pr_c3": 4,
                "pr_c8": 4,
                "pr_d4": 2,
                "pr_d7": 2,
                "pr_a1": 1,
                "pr_a2": 1,
                "pr_a5": 3,
                "pr_a6": 3
            },
            "opt1768680619775": {
                "pr_c1": 1,
                "pr_c3": 1,
                "pr_c5": 1,
                "pr_c9": 1,
                "pr_c10": 2,
                "pr_c13": 1,
                "pr_d7": 1,
                "pr_d4": 2
            }
        },
        "f1768681003870_mf_1768681261606": {
            "pr_c1": 0,
            "pr_c10": 2,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681274358": {
            "pr_c1": 0,
            "pr_c10": 3,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681064200": {
            "pr_c1": 0,
            "pr_c10": 1,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681285630": {
            "pr_c1": 0,
            "pr_c10": 3,
            "pr_c4": 2,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 3
        },
        "f1768681003870_mf_1768681300509": {
            "pr_c1": 0,
            "pr_c10": 3,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681310974": {
            "pr_c1": 0,
            "pr_c10": 3,
            "pr_c4": 2,
            "pr_c13": 2,
            "pr_c14": 1,
            "pr_d4": 3
        },
        "f1768681003870_mf_1768681323565": {
            "pr_c1": 0,
            "pr_c10": 3,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 2
        },
        "f1768681003870_mf_1768681333870": {
            "pr_c1": 0,
            "pr_c10": 1,
            "pr_c4": 1,
            "pr_c13": 1,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681348062": {
            "pr_c1": 0,
            "pr_c10": 2,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681398606": {
            "pr_c1": 0,
            "pr_c10": 3,
            "pr_c13": 2,
            "pr_c14": 1,
            "pr_d4": 2
        },
        "f1768681003870_mf_1768681415400": {
            "pr_c1": 0,
            "pr_c10": 3,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681427238": {
            "pr_c1": 0,
            "pr_c10": 1,
            "pr_c13": 2,
            "pr_d4": 1
        },
        "f1768681003870_mf_1768681431479": {
            "pr_c1": 0,
            "pr_c8": 3,
            "pr_d9": 1
        },
        "f1768682469949_mf_1768682626758": {
            "pr_c1": 0,
            "pr_c3": 1,
            "pr_c8": 1,
            "pr_c12": 1,
            "pr_d4": 1
        },
        "f1768682469949_mf_1768682643916": {
            "pr_c1": 0,
            "pr_c3": 1,
            "pr_c12": 1,
            "pr_d4": 1
        },
        "f1768682469949_mf_1768682541004": {
            "pr_c1": 0,
            "pr_c3": 1,
            "pr_c12": 1,
            "pr_d4": 1
        },
        "f1768682469949_mf_1768682662885": {
            "pr_c1": 0,
            "pr_c3": 1,
            "pr_c8": 1,
            "pr_c12": 1,
            "pr_d4": 1
        },
        "f1768682469949_mf_1768682673916": {
            "pr_c1": 0,
            "pr_c3": 1,
            "pr_c8": 1,
            "pr_c12": 1,
            "pr_d4": 1
        },
        "f1768682469949_mf_1768682686428": {
            "pr_c1": 0,
            "pr_c3": 2,
            "pr_c4": 1,
            "pr_c8": 1,
            "pr_c9": 1,
            "pr_c12": 1,
            "pr_d4": 2
        },
        "f1768688860220_mf_1768689088836": {
            "opt1": {
                "pr_c1": 0,
                "pr_c8": 3,
                "pr_c2": 0,
                "pr_c3": 1,
                "pr_d5": 1,
                "pr_d9": 1,
                "pr_d8": 3,
                "pr_a2": 1
            },
            "opt2": {
                "pr_c1": 0,
                "pr_c3": 0,
                "pr_c4": 1,
                "pr_c5": 1,
                "pr_d6": 1,
                "pr_a2": 1,
                "pr_a4": 1,
                "pr_a5": 1,
                "pr_a6": 1,
                "pr_a7": 1,
                "pr_a8": 1,
                "pr_a9": 1
            },
            "pr_c1": 0
        },
        "f1768688860220_mf_1768688973044": {
            "pr_c1": 0,
            "pr_c3": 3,
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_d5": 1,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a8": 1,
            "pr_a9": 1
        },
        "f1768688860220_mf_1768689016476": {
            "pr_c1": 0,
            "pr_c3": 2,
            "pr_c5": 1,
            "pr_c4": 1,
            "pr_c8": 3,
            "pr_d5": 1,
            "pr_d8": 1,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a8": 1,
            "pr_a9": 1
        },
        "f1768688860220_mf_1768689037228": {
            "pr_c1": 0,
            "pr_c3": 4,
            "pr_c4": 1,
            "pr_c5": 2,
            "pr_c8": 3,
            "pr_d8": 1,
            "pr_d5": 3,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a8": 1,
            "pr_a9": 1
        },
        "f1768688860220_mf_1768689059772": {
            "pr_c1": 1,
            "pr_c3": 2,
            "pr_c4": 1,
            "pr_c12": 1,
            "pr_c13": 1,
            "pr_d1": 1,
            "pr_d2": 2,
            "pr_d5": 2
        },
        "f1768688860220_mf_1768688989525": {
            "pr_c1": 0,
            "pr_c3": 2,
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_d5": 1,
            "pr_a2": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a7": 1,
            "pr_a8": 1,
            "pr_a9": 1
        },
        "f1768681003870_mf_1768681046495": {
            "pr_c10": 1,
            "pr_c13": 1,
            "pr_c14": 1,
            "pr_d4": 1
        },
        "f1768693176830_mf1768693267102": {
            "pr_c4": 1,
            "pr_c3": 1,
            "pr_c12": 2,
            "pr_d4": 2,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1,
            "pr_a8": 1,
            "pr_a9": 1
        },
        "f1768693176830_mf1768693275998": {
            "pr_c4": 1,
            "pr_c3": 1,
            "pr_c12": 2,
            "pr_d4": 1,
            "pr_a9": 1,
            "pr_a8": 1,
            "pr_a4": 1,
            "pr_a5": 1,
            "pr_a6": 1
        },
        "f1768693176830_mf1768693286111": {
            "pr_c4": 1,
            "pr_c12": 2,
            "pr_d4": 1,
            "pr_a8": 1,
            "pr_a9": 1,
            "pr_a6": 1,
            "pr_a5": 1,
            "pr_a4": 1
        },
        "f1768693176830_mf1768693304269": {
            "pr_c4": 1,
            "pr_c3": 1,
            "pr_c10": 2,
            "pr_d4": 2
        },
        "f1768693176830_mf1768693293621": {
            "pr_c4": 1,
            "pr_c3": 1,
            "pr_c12": 2,
            "pr_d4": 2
        },
        "f1768693176830_mf1768693318077": {
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_c10": 1,
            "pr_d4": 2
        },
        "f1768693176830_mf1768693326438": {
            "pr_c4": 1,
            "pr_c5": 1,
            "pr_c10": 1,
            "pr_d4": 2
        }
    },
    "layout": {
        "title": "Кухні",
        "theme": "dark",
        "groupGap": 0,
        "baseFontSize": 11
    }
};
window.Schema = Schema;