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
            "id": "f1766681994475",
            "groupId": "g_main",
            "label": "Нова дія",
            "type": "number"
        },
        {
            "id": "f1766681995533",
            "groupId": "g_main",
            "label": "Нова дія",
            "type": "select_modal",
            "helpContent": "",
            "default": "",
            "placeholderText": "",
            "labelYes": "йо",
            "labelNo": "ні",
            "modalFields": [
                {
                    "id": "mf_1766682073571",
                    "label": "івіфвфі",
                    "type": "checkbox_qty",
                    "default": "Додати"
                },
                {
                    "id": "mf_1766682084214",
                    "label": "121",
                    "type": "number",
                    "default": 0
                }
            ]
        },
        {
            "id": "f1766681991880",
            "groupId": "g_main",
            "label": "Нова дія",
            "type": "select",
            "helpContent": "",
            "placeholderText": "",
            "options": [
                {
                    "value": "o1766682008103",
                    "label": "фівфівф"
                },
                {
                    "value": "o1766682008951",
                    "label": "фівфів"
                },
                {
                    "value": "o1766682009715",
                    "label": "фівфів"
                }
            ]
        }
    ],
    "products": {
        "groups": [],
        "fields": []
    },
    "rules": {
        "f1766681991880": {
            "o1766682008951": {
                "pr_c2": 11,
                "pr_c3": 11,
                "pr_c6": 12,
                "pr_c7": 12
            },
            "o1766682008103": {
                "pr_c3": 11
            },
            "o1766682009715": {
                "pr_c8": 12
            }
        }
    },
    "modalFieldRules": {}
};
window.Schema = Schema;