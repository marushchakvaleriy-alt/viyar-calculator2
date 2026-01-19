"""
Split Blum catalog by categories and add unique IDs
"""
import json
import hashlib

IN_FILE = 'categories/Блюм.json'
OUT_DIR = 'data/catalogs'

# Category mapping based on breadcrumbs and title
CATEGORY_MAP = {
    'aventos': {
        'name': 'blum_aventos',
        'var': 'Catalog_BlumAventos',
        'keywords': ['AVENTOS', 'підіймальн', 'підйомн'],
        'icon': '⬆️'
    },
    'tandembox': {
        'name': 'blum_tandembox',
        'var': 'Catalog_BlumTandembox',
        'keywords': ['TANDEMBOX', 'TANDEM'],
        'icon': '📦'
    },
    'legrabox': {
        'name': 'blum_legrabox',
        'var': 'Catalog_BlumLegrabox',
        'keywords': ['LEGRABOX', 'LEGRA'],
        'icon': '📦'
    },
    'movento': {
        'name': 'blum_movento',
        'var': 'Catalog_BlumMovento',
        'keywords': ['MOVENTO'],
        'icon': '➡️'
    },
    'hinges': {
        'name': 'blum_hinges',
        'var': 'Catalog_BlumHinges',
        'keywords': ['Завіса', 'петл', 'CLIP'],
        'icon': '🔗'
    },
    'servo': {
        'name': 'blum_servo',
        'var': 'Catalog_BlumServo',
        'keywords': ['SERVO-DRIVE', 'SERVO'],
        'icon': '⚡'
    },
    'tipon': {
        'name': 'blum_tipon',
        'var': 'Catalog_BlumTipOn',
        'keywords': ['TIP-ON'],
        'icon': '👆'
    },
    'other': {
        'name': 'blum_other',
        'var': 'Catalog_BlumOther',
        'keywords': [],
        'icon': '🔧'
    }
}

def generate_id(item):
    """Generate unique ID from SKU or product data"""
    # Use SKU if available
    sku = item.get('sku', '')
    if sku:
        # Clean SKU and use as base
        clean_sku = sku.replace(' ', '_').replace('.', '_')
        return f"blum_{clean_sku}"
    
    # Fallback: hash of title + description
    text = f"{item.get('title', '')}{item.get('description', '')}"
    hash_obj = hashlib.md5(text.encode('utf-8'))
    return f"blum_{hash_obj.hexdigest()[:12]}"

def categorize_item(item):
    """Determine category for item"""
    text = f"{item.get('breadcrumbs', '')} {item.get('title', '')} {item.get('description', '')}".lower()
    
    # Check each category
    for cat_key, cat_info in CATEGORY_MAP.items():
        if cat_key == 'other':
            continue
        for keyword in cat_info['keywords']:
            if keyword.lower() in text:
                return cat_key
    
    return 'other'

def map_blum_item(item, category):
    """Map Blum item to catalog format with ID"""
    specs = item.get('specs', {})
    
    vendor = "Blum"
    article = item.get('sku', item.get('id', ''))
    title = item.get('title', '')
    desc = item.get('description', '')
    full_name = f"{title} {desc}".strip()
    
    # Generate unique ID
    unique_id = generate_id(item)
    
    return {
        "id": unique_id,
        "original_id": item.get('id', ''),
        "vendor": vendor,
        "name": full_name,
        "article": article,
        "price": "0",
        "image": item.get('image_url', ''),
        "category": specs.get('Система/Серія', ''),
        "color": specs.get('Колір', ''),
        "technology": specs.get('Технологія', ''),
        "url": item.get('product_url', ''),
        "blum_category": category
    }

def main():
    print("Processing Blum catalog with categories and IDs...")
    
    try:
        with open(IN_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if isinstance(data, list):
            items = data
        else:
            items = data.get('items', [])
        
        # Categorize items
        categorized = {key: [] for key in CATEGORY_MAP.keys()}
        
        for item in items:
            category = categorize_item(item)
            mapped = map_blum_item(item, category)
            categorized[category].append(mapped)
        
        # Write separate files for each category
        total = 0
        for cat_key, cat_info in CATEGORY_MAP.items():
            cat_items = categorized[cat_key]
            if not cat_items:
                print(f"  ⚠️  {cat_info['name']}: 0 items (skipped)")
                continue
            
            out_path = f"{OUT_DIR}/{cat_info['name']}.js"
            js_content = f"window.{cat_info['var']} = {json.dumps(cat_items, ensure_ascii=False, indent=2)};\n"
            
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(js_content)
            
            print(f"  ✓ {cat_info['name']}.js: {len(cat_items)} items")
            total += len(cat_items)
        
        print(f"\n✓ Total: {total} items processed")
        print(f"\nДодайте до order.html:")
        for cat_key, cat_info in CATEGORY_MAP.items():
            if categorized[cat_key]:
                print(f'  <script src="data/catalogs/{cat_info["name"]}.js"></script>')
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
