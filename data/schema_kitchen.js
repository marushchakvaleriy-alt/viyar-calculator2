const Schema = {
    "meta": {
        "version": "2.1",
        "title": "Калькулятор Кухні (Чистий)",
        "lastUpdated": "2025-12-21T08:30:00.000Z"
    },
    "processes": [
        {
            "id": "pr_construction",
            "name": "ознайомлення з ТЗ",
            "category": "cat_construction"
        },
        {
            "id": "pr_design",
            "name": "ознайомлення з ТЗ",
            "category": "cat_design"
        },
        {
            "id": "pr_assembly",
            "name": "ознайомлення з ТЗ",
            "category": "cat_assembly"
        },
        {
            "id": "pr_install",
            "name": "ознайомлення з ТЗ",
            "category": "cat_install"
        },
        {
            "id": "p1766313242326",
            "name": "іваіва",
            "category": "cat_construction"
        },
        {
            "id": "p1766313439195",
            "name": "121",
            "category": "cat_construction"
        },
        {
            "id": "p1766349186712",
            "name": "парапр",
            "category": "cat_design"
        },
        {
            "id": "p1766349191077",
            "name": "апрапра",
            "category": "cat_design"
        }
    ],
    "categories": {
        "cat_design": {
            "name": "Проєктування",
            "color": "#f3e8ff"
        },
        "cat_construction": {
            "name": "Конструювання",
            "color": "#e0f2fe"
        },
        "cat_assembly": {
            "name": "Збірка",
            "color": "#dcfce7"
        },
        "cat_install": {
            "name": "Монтаж",
            "color": "#ffedd5"
        }
    },
    "groups": [
        {
            "id": "g1766496337986",
            "title": "Основні параметри"
        },
        {
            "id": "g1766496592525",
            "title": "Стільниці"
        },
        {
            "id": "g1766333658615",
            "title": "Шафи та модулі"
        },
        {
            "id": "g1766333967602",
            "title": "Пенали та додаткові елементи"
        },
        {
            "id": "g1766309638806",
            "title": "Група 5"
        },
        {
            "id": "g1766313247644",
            "title": "Група 6"
        },
        {
            "id": "g1766313876182",
            "title": "Група 7"
        },
        {
            "id": "g1766313902439",
            "title": "Група 8"
        },
        {
            "id": "g1766317197387",
            "title": "Група 9"
        },
        {
            "id": "g1766442541622",
            "title": "Група 10"
        },
        {
            "id": "g1766442712908",
            "title": "Група 11"
        },
        {
            "id": "g1766570333290",
            "title": "Група 12"
        }
    ],
    "fields": [
        {
            "id": "f1766496361938",
            "groupId": "g1766496337986",
            "label": "Форма кухні ",
            "type": "select",
            "helpContent": "",
            "placeholderText": "",
            "options": [
                {
                    "value": "o1766496392563",
                    "label": "Пряма:"
                },
                {
                    "value": "o1766496400939",
                    "label": "Г-подібна:"
                },
                {
                    "value": "o1766496407499",
                    "label": "П-подібна:"
                },
                {
                    "value": "o1766496419251",
                    "label": "G-по периметру"
                }
            ],
            "layout": {
                "inpBorder": "#080808"
            }
        },
        {
            "id": "f1766496368202",
            "groupId": "g1766496337986",
            "label": "Острів:",
            "type": "checkbox",
            "helpContent": ""
        },
        {
            "id": "f1766496442491",
            "groupId": "g1766496337986",
            "label": "Заміри",
            "type": "select",
            "helpContent": "",
            "placeholderText": "виберіть",
            "options": [
                {
                    "value": "o1766496460772",
                    "label": "Без замірів:"
                },
                {
                    "value": "o1766496475764",
                    "label": "Замір ручний по фото:"
                },
                {
                    "value": "o1766496481508",
                    "label": "Замір 3D по фото:"
                }
            ]
        },
        {
            "id": "f1766496593741",
            "groupId": "g1766496592525",
            "label": "Нова дія",
            "type": "select_modal",
            "helpContent": "",
            "default": "Стільниці",
            "placeholderText": "",
            "labelYes": "",
            "labelNo": "",
            "modalFields": [
                {
                    "id": "mf_1766496648198",
                    "label": "Матеріал",
                    "type": "select",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1",
                            "label": "ДСП-МДФ:"
                        },
                        {
                            "value": "opt2",
                            "label": "Керамограніт-Кварц:"
                        },
                        {
                            "value": "opt1766496661462",
                            "label": "HPL компакт плита:"
                        },
                        {
                            "value": "opt1766496665997",
                            "label": "Акрил:"
                        },
                        {
                            "value": "opt1766496671549",
                            "label": "R&D (дерево-метал):"
                        }
                    ]
                },
                {
                    "id": "mf_1766496690958",
                    "label": "Форма стільниці:",
                    "type": "select",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1",
                            "label": "Прямий:"
                        },
                        {
                            "value": "opt2",
                            "label": "Г-подібний:"
                        },
                        {
                            "value": "opt1766496707021",
                            "label": "П-подібний:"
                        },
                        {
                            "value": "opt1766496709094",
                            "label": "G-по периметру"
                        }
                    ]
                },
                {
                    "id": "mf_1766496737926",
                    "label": "Опуски:",
                    "type": "checkbox_qty",
                    "default": "Додати"
                },
                {
                    "id": "mf_1766507048447",
                    "label": "ehf",
                    "type": "multiselect",
                    "default": ""
                }
            ]
        },
        {
            "id": "f1766333978620",
            "groupId": "g1766333658615",
            "label": "верхні",
            "type": "number",
            "layout": {
                "flexDirection": "row",
                "width": "w-33",
                "color": "#af1212",
                "inpBorder": "#000000"
            }
        },
        {
            "id": "f1766333983532",
            "groupId": "g1766333658615",
            "label": "антресолі",
            "type": "number",
            "layout": {
                "flexDirection": "row",
                "width": "w-33"
            }
        },
        {
            "id": "f1766333968831",
            "groupId": "g1766333658615",
            "label": "нижні",
            "type": "number",
            "helpContent": "",
            "layout": {
                "inpBorder": "#141414",
                "inputWidth": 100,
                "width": "w-33",
                "flexDirection": "row"
            }
        },
        {
            "id": "f1766333735153",
            "groupId": "g1766333658615",
            "label": "Стільниця",
            "type": "action_button",
            "helpContent": "",
            "default": "виберіть стільницю",
            "modalFields": [
                {
                    "id": "mf_1766333776809",
                    "label": "Форма",
                    "type": "select",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1",
                            "label": "Варіант 1"
                        },
                        {
                            "value": "opt2",
                            "label": "Варіант 2"
                        },
                        {
                            "value": "opt1766333782607",
                            "label": "Варіант"
                        }
                    ]
                },
                {
                    "id": "mf_1766333903042",
                    "label": "впвп",
                    "type": "checkbox_qty",
                    "default": "Додати"
                },
                {
                    "id": "mf_1766333909290",
                    "label": "Нове поле",
                    "type": "checkbox_qty",
                    "default": "Додати"
                },
                {
                    "id": "mf_1766333915357",
                    "label": "Нове поле",
                    "type": "number",
                    "default": 0
                }
            ],
            "hidden": false,
            "layout": {}
        },
        {
            "id": "f1766333688810",
            "groupId": "g1766333658615",
            "label": "заміри",
            "type": "select",
            "helpContent": "",
            "options": [
                {
                    "value": "o1766333716239",
                    "label": "без"
                },
                {
                    "value": "o1766333722830",
                    "label": "з д замір"
                }
            ],
            "layout": {}
        },
        {
            "id": "f1766349520720",
            "groupId": "g1766333967602",
            "label": "ваіваів",
            "type": "action_button",
            "helpContent": "",
            "default": "",
            "modalFields": [
                {
                    "id": "mf_1766349548336",
                    "label": "тип вимикача",
                    "type": "select",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1",
                            "label": "ваіва"
                        },
                        {
                            "value": "opt2",
                            "label": "іваіваів"
                        },
                        {
                            "value": "opt1766349555843",
                            "label": "Варіант"
                        }
                    ]
                },
                {
                    "id": "mf_1766349566127",
                    "label": "вавіа",
                    "type": "number",
                    "default": 0
                }
            ],
            "layout": {}
        },
        {
            "id": "f1766333661991",
            "groupId": "g1766333967602",
            "label": "Нова дія",
            "type": "select",
            "helpContent": "",
            "options": [
                {
                    "value": "o1766333669115",
                    "label": "пряма"
                },
                {
                    "value": "o1766333675049",
                    "label": "г подіб"
                },
                {
                    "value": "o1766333680598",
                    "label": "п подібна"
                }
            ],
            "layout": {},
            "hidden": false
        },
        {
            "id": "f1766333992329",
            "groupId": "g1766333967602",
            "label": "пенали",
            "type": "number",
            "layout": {
                "helpImg": "images/Screenshot_2.jpg",
                "help": "ецукеук"
            },
            "hidden": false
        },
        {
            "id": "f1766309640967",
            "groupId": "g1766309638806",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766309641994",
            "groupId": "g1766309638806",
            "label": "Нова дія",
            "type": "action_button",
            "helpContent": "йцй",
            "default": "",
            "modalFields": [
                {
                    "id": "mf_1766310205627",
                    "label": "Нове поле",
                    "type": "number",
                    "default": 0
                },
                {
                    "id": "mf_1766310210959",
                    "label": "Нове поле",
                    "type": "select",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1",
                            "label": "Варіант 1"
                        },
                        {
                            "value": "opt2",
                            "label": "Варіант 2"
                        }
                    ]
                },
                {
                    "id": "mf_1766310216411",
                    "label": "Нове поле",
                    "type": "checkbox_qty",
                    "default": "Додати"
                },
                {
                    "id": "mf_1766310222577",
                    "label": "Нове поле",
                    "type": "checkbox",
                    "default": ""
                }
            ],
            "layout": {}
        },
        {
            "id": "f1766313249293",
            "groupId": "g1766313247644",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766313880540",
            "groupId": "g1766313876182",
            "label": "Нова дія",
            "type": "number",
            "helpContent": "",
            "layout": {}
        },
        {
            "id": "f_trig_1766313896777",
            "groupId": "g1766313876182",
            "label": "Виклик форми",
            "type": "action_button",
            "default": "+ Додати виріб",
            "modalFields": [
                {
                    "id": "mf_1766313976390",
                    "label": "Нове поле",
                    "type": "select",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1",
                            "label": "Варіант 1"
                        },
                        {
                            "value": "opt2",
                            "label": "Варіант 2"
                        }
                    ]
                }
            ],
            "layout": {}
        },
        {
            "id": "f1766313905094",
            "groupId": "g1766313902439",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766317192190",
            "groupId": "g1766313902439",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766317193120",
            "groupId": "g1766313902439",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766317194042",
            "groupId": "g1766313902439",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766317199210",
            "groupId": "g1766317197387",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766317200267",
            "groupId": "g1766317197387",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766317202188",
            "groupId": "g1766317197387",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766317203297",
            "groupId": "g1766317197387",
            "label": "Нова дія",
            "type": "number",
            "layout": {}
        },
        {
            "id": "f1766442543916",
            "groupId": "g1766442541622",
            "label": "Нова дія",
            "type": "select",
            "helpContent": "",
            "options": [
                {
                    "value": "o1766442563919",
                    "label": "пряма"
                },
                {
                    "value": "o1766442564992",
                    "label": "гпод"
                },
                {
                    "value": "o1766442565899",
                    "label": "п под"
                }
            ],
            "layout": {
                "flexDirection": "row",
                "textAlign": "left",
                "labelWidth": 60,
                "inputWidth": 14,
                "inpBorder": "#030303",
                "inpBg": "#c5c4c4",
                "inputOffset": 0,
                "shadow": "glow"
            }
        },
        {
            "id": "f1766442585047",
            "groupId": "g1766442541622",
            "label": "Стільниця",
            "type": "select",
            "helpContent": "",
            "default": "",
            "modalFields": [
                {
                    "id": "mf_1766442635260",
                    "label": "матеріал",
                    "type": "select",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1",
                            "label": "ДСП"
                        },
                        {
                            "value": "opt2",
                            "label": "МДФ"
                        },
                        {
                            "value": "opt1766442637270",
                            "label": "керамограніт"
                        },
                        {
                            "value": "opt1766442638305",
                            "label": "вава"
                        }
                    ]
                },
                {
                    "id": "mf_1766442668132",
                    "label": "віаів",
                    "type": "checkbox",
                    "default": ""
                },
                {
                    "id": "mf_1766442685788",
                    "label": "івіф",
                    "type": "number",
                    "default": 0
                },
                {
                    "id": "mf_1766442695718",
                    "label": "іфвфів",
                    "type": "number",
                    "default": 0
                }
            ],
            "placeholderText": ""
        },
        {
            "id": "f_trig_1766442703863",
            "groupId": "g1766442541622",
            "label": "Виклик форми",
            "type": "select_modal",
            "default": "+ Додати виріб",
            "helpContent": "",
            "placeholderText": "",
            "modalFields": [
                {
                    "id": "mf_1766483571255",
                    "label": "пав",
                    "type": "number",
                    "default": 0
                },
                {
                    "id": "mf_1766496099858",
                    "label": "віаіва",
                    "type": "multiselect",
                    "default": ""
                }
            ]
        },
        {
            "id": "f1766442731103",
            "groupId": "g1766442712908",
            "label": "Нова дія",
            "type": "number"
        },
        {
            "id": "f1766442732363",
            "groupId": "g1766442712908",
            "label": "Нова дія",
            "type": "number"
        },
        {
            "id": "f1766442733241",
            "groupId": "g1766442712908",
            "label": "Нова дія",
            "type": "number"
        },
        {
            "id": "f1766570336121",
            "groupId": "g1766570333290",
            "label": "Нова дія",
            "type": "number"
        },
        {
            "id": "f1766570338225",
            "groupId": "g1766570333290",
            "label": "Нова дія",
            "type": "number"
        }
    ],
    "products": {
        "groups": [],
        "fields": []
    },
    "rules": {
        "f1766313249293": {
            "pr_construction": 10,
            "p1766313242326": 10,
            "p1766313439195": 11,
            "pr_design": "ек",
            "pr_assembly": "уеуке"
        },
        "f1766313253471": {
            "pr_construction": 11,
            "p1766313242326": 11,
            "p1766313439195": 11
        },
        "f1766313880540": {
            "pr_construction": 5,
            "p1766313242326": 5
        },
        "f1766313905094": {
            "pr_construction": 1,
            "p1766313242326": 1,
            "pr_design": 1
        },
        "f1766313955983": {
            "o1766317234708": {
                "pr_construction": 12
            },
            "o1766317235840": {
                "pr_construction": 12,
                "_total_cat_construction": "=@sum_zbira * 0.15"
            }
        },
        "f1766333661991": {
            "o1766333669115": {
                "pr_construction": 10,
                "pr_design": 10
            },
            "o1766333675049": {
                "pr_construction": 10,
                "pr_design": 10
            },
            "o1766333680598": {
                "pr_construction": 10,
                "pr_design": 10
            }
        },
        "f1766333688810": {
            "o1766333716239": {
                "pr_construction": 10,
                "pr_design": 10
            },
            "o1766333722830": {
                "pr_construction": 10
            }
        },
        "f1766333968831": {
            "pr_construction": 5,
            "pr_design": 10,
            "p1766313242326": 5,
            "_total_cat_construction": "=min(@qty, 4) * @raw",
            "p1766349186712": 1000,
            "p1766349191077": 1000,
            "_total_cat_design": "=min(@qty, 3) * @raw"
        },
        "f1766333978620": {
            "pr_construction": 5,
            "pr_design": 10
        },
        "f1766333983532": {
            "pr_construction": 5,
            "pr_design": 10
        },
        "f1766333992329": {
            "pr_construction": 5,
            "pr_design": 10
        },
        "f1766442543916": {
            "o1766442565899": {
                "pr_design": 11,
                "p1766313439195": 12,
                "p1766313242326": 12
            },
            "o1766442563919": {
                "p1766313242326": 12,
                "p1766313439195": 12
            }
        },
        "f1766442733241": {
            "pr_design": 11,
            "p1766349191077": 12,
            "pr_construction": 5,
            "p1766313439195": 5
        },
        "f1766442732363": {
            "p1766349186712": 11,
            "pr_design": 12,
            "p1766313242326": {
                "v": 5,
                "once": true
            },
            "pr_construction": 6
        },
        "f1766442731103": {
            "p1766349191077": 11,
            "pr_design": 12,
            "p1766313439195": 5,
            "pr_construction": 5
        },
        "f1766570336121": {
            "p1766349186712": 11,
            "p1766349191077": 11
        },
        "f1766570338225": {
            "p1766349191077": 11
        }
    },
    "modalFieldRules": {
        "f1766313253471_mf_1766313558207": {
            "pr_construction": 2,
            "p1766313242326": 20
        },
        "f1766313253471_mf_1766313562641": {
            "p1766313242326": 2,
            "p1766313439195": 20
        },
        "f_trig_1766313896777_mf_1766313976390": {
            "p1766313242326": 5,
            "p1766313439195": 5,
            "pr_design": 50
        },
        "f1766333735153_mf_1766333776809": {
            "pr_construction": 0,
            "opt1": {
                "pr_construction": 10,
                "pr_design": 10
            },
            "opt2": {
                "pr_construction": 10,
                "pr_design": 10
            },
            "opt1766333782607": {
                "pr_construction": 10
            },
            "pr_design": 0
        },
        "f1766333735153_mf_1766333903042": {
            "pr_construction": "=10 * @qty",
            "pr_design": 10
        },
        "f1766333735153_mf_1766333909290": {
            "pr_construction": "=10 * @qty",
            "pr_design": 10
        },
        "f1766333735153_mf_1766333915357": {
            "pr_construction": 10,
            "pr_design": 10
        },
        "f1766333735153_cat_construction": {
            "_total_cat_construction": ""
        },
        "f1766442585047_mf_1766442635260": {
            "opt1": {
                "p1766313242326": 11
            },
            "opt2": {
                "p1766313242326": 112
            },
            "opt1766442637270": {
                "p1766313242326": 112
            },
            "opt1766442638305": {
                "p1766313242326": 112
            }
        }
    },
    "layout": {
        "theme": "dark",
        "title": "кенекн",
        "version": "екнкенкен"
    }
};
window.Schema = Schema;