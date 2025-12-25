const Schema = {
    "meta": {
        "version": "2.2",
        "title": "Кухні",
        "lastUpdated": "2025-12-25"
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
        }
    ],
    "fields": [
        {
            "id": "f1766685439293",
            "groupId": "g_main",
            "label": "Нова дія",
            "type": "action_button",
            "helpContent": "",
            "default": "",
            "modalFields": [
                {
                    "id": "mf_1766685454721",
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
                        },
                        {
                            "value": "opt1766685456123",
                            "label": "Варіант"
                        },
                        {
                            "value": "opt1766685456828",
                            "label": "Варіант"
                        },
                        {
                            "value": "opt1766685457386",
                            "label": "Варіант"
                        }
                    ]
                }
            ]
        },
        {
            "id": "f1766685440801",
            "groupId": "g_main",
            "label": "Нова дія",
            "type": "select_modal",
            "helpContent": "",
            "default": "",
            "placeholderText": "",
            "labelYes": "",
            "labelNo": "",
            "modalFields": [
                {
                    "id": "mf_1766685494989",
                    "label": "вафів",
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
                    "id": "mf_1766686707494",
                    "label": "аакуак",
                    "type": "multiselect",
                    "default": "",
                    "options": [
                        {
                            "value": "opt1766686709797",
                            "label": "Варіант"
                        },
                        {
                            "value": "opt1766686711312",
                            "label": "Варіант"
                        },
                        {
                            "value": "opt1766686712086",
                            "label": "Варіант"
                        },
                        {
                            "value": "opt1766686712797",
                            "label": "Варіант"
                        },
                        {
                            "value": "opt1766686713554",
                            "label": "Варіант"
                        }
                    ]
                }
            ],
            "layout": {
                "width": "w-33",
                "flexDirection": "row",
                "padding": 11,
                "gap": -8,
                "labelWidth": 93,
                "fontSize": 17,
                "inpBorder": "#19191a",
                "inputWidth": 100,
                "inputOffset": 0,
                "shadow": "subtle",
                "prodBg": "#d2d1d1"
            }
        },
        {
            "id": "f1766685441558",
            "groupId": "g_main",
            "label": "Нова дія",
            "type": "number"
        },
        {
            "id": "f1766685442405",
            "groupId": "g_main",
            "label": "Нова дія",
            "type": "number"
        }
    ],
    "products": {
        "groups": [],
        "fields": []
    },
    "rules": {
        "f1766685441558": {
            "pr_c4": 12,
            "pr_c5": 12,
            "pr_c6": 12
        }
    },
    "modalFieldRules": {
        "f1766685439293_mf_1766685454721": {
            "opt2": {
                "pr_c3": 12,
                "pr_c5": 12
            },
            "opt1766685456123": {
                "pr_c4": 12
            },
            "opt1766685456828": {
                "pr_c7": 13
            }
        },
        "f1766685440801_mf_1766686707494": {
            "opt1766686712086": {
                "pr_c3": 12,
                "pr_c4": 12
            },
            "opt1766686711312": {
                "pr_c5": 12,
                "pr_c6": 12
            }
        }
    }
};
window.Schema = Schema;