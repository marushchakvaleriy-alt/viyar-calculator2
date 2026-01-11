const Schema = {
    "meta": {
        "version": "2.2",
        "title": "Новий калькулятор",
        "lastUpdated": "2026-01-09"
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
            "id": "g1767963732768",
            "title": "рооро"
        },
        {
            "id": "g1767987129232",
            "title": "праовлоа"
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
            "label": "Нова дія",
            "type": "number",
            "layout": {
                "width": "w-50",
                "inpBorder": "#0f0f0f"
            }
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
            "pr_i1": 10
        },
        "f1767963691670": {
            "pr_c1": 0,
            "_total_cat_construction": "= val == 0 ? 0 : val <= 5 ? 5 : val <= 10 ? 7 : val <= 15 ? 9 : 11",
            "pr_a1": 10,
            "pr_a3": 10,
            "pr_i1": 10
        },
        "f1767963695152": {
            "pr_c1": 10,
            "pr_a1": 10,
            "pr_i1": 10
        },
        "f1767963696506": {
            "pr_c1": 10,
            "pr_a1": 10,
            "pr_i1": 10
        }
    },
    "modalFieldRules": {
        "f1767987131252_mf_1767987337619": {
            "pr_c1": 10,
            "pr_c2": 10
        },
        "f1767987131252_mf_1767987351323": {
            "pr_c2": 10
        }
    }
};
window.Schema = Schema;