# API для Інтеграції

> Документ для ІТ-відділу

## Огляд

Платформа Vpoint Calculator складається з:
- **Frontend**: Статичні HTML/CSS/JS файли
- **Data**: JavaScript файли зі схемами
- **Backend**: Python HTTP сервер для локального збереження (замінити на ваш API)

## Точки Інтеграції

### 1. Збереження Схеми

**Поточна реалізація** (local_saver.py):
```
POST http://localhost:5005
Content-Type: application/json

{
    "filename": "data/schema_kitchen.js",
    "content": "const Schema = {...}; window.Schema = Schema;"
}
```

**Ваша реалізація**:
```
POST /api/calculators/save
Content-Type: application/json

{
    "calculatorId": "kitchen",
    "schema": { ... }
}
```

**Зміни в коді**:
```javascript
// admin.html, designer.html - знайдіть:
fetch('http://localhost:5005', {...})

// Замініть на:
fetch('/api/calculators/save', {...})
```

### 2. Завантаження Схеми

**Поточна реалізація**:
```html
<script src="../data/schema_kitchen.js"></script>
```

**Ваша реалізація** (опціонально):
```javascript
// Замість статичного JS-файлу
fetch('/api/calculators/kitchen')
    .then(r => r.json())
    .then(schema => {
        window.Schema = schema;
        Engine.init();
    });
```

### 3. Збереження Зображень

**Поточна реалізація**:
```
POST http://localhost:5005
Content-Type: application/json

{
    "filename": "images/hints/photo.jpg",
    "content": "data:image/jpeg;base64,..."
}
```

**Ваша реалізація**:
```
POST /api/images/upload
Content-Type: multipart/form-data

file: [binary]
path: "hints/photo.jpg"
```

## Потрібні Ендпоінти

| Метод | Шлях | Опис |
|-------|------|------|
| GET | `/api/calculators` | Список калькуляторів |
| GET | `/api/calculators/:id` | Схема калькулятора |
| POST | `/api/calculators` | Створити калькулятор |
| PUT | `/api/calculators/:id` | Оновити схему |
| DELETE | `/api/calculators/:id` | Видалити |
| POST | `/api/images/upload` | Завантажити зображення |
| GET | `/api/images/:path` | Отримати зображення |

## Бекенд Рекомендації

### Node.js/Express
```javascript
app.post('/api/calculators', (req, res) => {
    const { calculatorId, schema } = req.body;
    // Зберегти в MongoDB/PostgreSQL
    res.json({ success: true });
});
```

### Python/Django
```python
@api_view(['POST'])
def save_calculator(request):
    schema = request.data['schema']
    Calculator.objects.update_or_create(
        id=request.data['calculatorId'],
        defaults={'schema': schema}
    )
    return Response({'success': True})
```

### PHP/Laravel
```php
Route::post('/api/calculators', function (Request $request) {
    Calculator::updateOrCreate(
        ['id' => $request->calculatorId],
        ['schema' => $request->schema]
    );
    return response()->json(['success' => true]);
});
```

## Авторизація

Додайте middleware для перевірки токену:

```javascript
// Frontend - додайте до всіх fetch():
fetch('/api/...', {
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
})
```

## Контакти

Для питань звертайтесь до автора схеми.
