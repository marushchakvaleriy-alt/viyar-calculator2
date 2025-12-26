# Специфікація Схеми Калькулятора (Schema Specification)

> Технічний документ для розробників

## Огляд

Кожен калькулятор описується JavaScript-файлом (`schema_*.js`), який експортує об'єкт `Schema`.

```javascript
const Schema = { ... };
window.Schema = Schema;
```

## Структура Schema

| Поле | Тип | Опис |
|------|-----|------|
| `meta` | Object | Метадані калькулятора |
| `categories` | Object | Категорії процесів |
| `processes` | Array | Виробничі процеси |
| `groups` | Array | Групи полів |
| `fields` | Array | Поля вводу |
| `rules` | Object | Правила розрахунку |
| `products` | Object | Налаштування виробів |
| `layout` | Object | Налаштування зовнішнього вигляду |

---

## 1. meta

```javascript
"meta": {
    "version": "2.2",
    "title": "Калькулятор Кухні",
    "lastUpdated": "2025-12-26"
}
```

## 2. categories

Категорії групують процеси для підсумків.

```javascript
"categories": {
    "cat_construction": {
        "name": "Конструювання",
        "color": "#e0f2fe"
    },
    "cat_design": {
        "name": "Проєктування", 
        "color": "#f3e8ff"
    }
}
```

## 3. processes

Виробничі процеси (колонки в матриці).

```javascript
"processes": [
    {
        "id": "pr_c1",
        "name": "ознайомлення з ТЗ",
        "category": "cat_construction"
    }
]
```

## 4. groups

Групи полів для візуального розділення.

```javascript
"groups": [
    {
        "id": "g_main",
        "title": "Основні параметри"
    }
]
```

## 5. fields

### Типи полів

| Тип | Опис |
|-----|------|
| `number` | Числове поле з кількістю |
| `select` | Випадаючий список |
| `checkbox` | Чекбокс (так/ні) |
| `checkbox_qty` | Чекбокс з кількістю |
| `action_button` | Кнопка для додавання виробу |
| `select_modal` | Вибір Так/Ні з модальним вікном |

### Приклад поля

```javascript
{
    "id": "f_boxes",
    "type": "number",
    "label": "Кількість ящиків",
    "groupId": "g_main",
    "default": 1,
    "layout": {
        "width": "w-50",
        "help": "Підказка для користувача",
        "helpImg": "images/hints/boxes.jpg"
    }
}
```

### Приклад action_button

```javascript
{
    "id": "btn_furniture",
    "type": "action_button",
    "label": "Фурнітура",
    "default": "+ Додати фурнітуру",
    "groupId": "g_main",
    "modalFields": [
        {
            "id": "mf_type",
            "type": "select",
            "label": "Тип",
            "options": [
                { "value": "blum", "label": "Blum" },
                { "value": "hettich", "label": "Hettich" }
            ]
        }
    ]
}
```

## 6. rules

Правила розрахунку для кожного поля.

```javascript
"rules": {
    "f_boxes": {
        "pr_c1": 10,              // Фіксовані бали
        "pr_c2": "=@qty * 5",     // Формула
        "pr_c3": { "v": 20, "once": true }  // Одноразово
    }
}
```

### Формули

| Змінна | Опис |
|--------|------|
| `@qty` | Значення поля (кількість) |
| `@raw` | Сума рядка без множення |
| `@sum` | Повна сума рядка |
| `@sum_[alias]` | Сума категорії |

### Функції

```javascript
=min(@qty, 10) * 5
=max(@qty - 5, 0) * 3
=@qty <= 10 ? @qty * 20 : 200 + (@qty - 10) * 15
```

## 7. layout

```javascript
"layout": {
    "theme": "light",      // "light" | "dark"
    "title": "Калькулятор",
    "version": "v2.0"
}
```

---

## Приклад Повної Схеми

```javascript
const Schema = {
    "meta": {
        "version": "2.2",
        "title": "Новий калькулятор",
        "lastUpdated": "2025-12-26"
    },
    "categories": {
        "cat_construction": { "name": "Конструювання", "color": "#e0f2fe" }
    },
    "processes": [
        { "id": "pr_c1", "name": "Процес 1", "category": "cat_construction" }
    ],
    "groups": [
        { "id": "g_main", "title": "Основні параметри" }
    ],
    "fields": [
        { "id": "f1", "type": "number", "label": "Кількість", "groupId": "g_main" }
    ],
    "rules": {
        "f1": { "pr_c1": 10 }
    }
};
window.Schema = Schema;
```
