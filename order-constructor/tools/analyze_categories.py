import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

try:
    with open('data/cards.json', 'r', encoding='utf-8') as f:
        data_json = json.load(f)
        items = data_json.get('items', [])

    print(f"Всього елементів у cards.json: {len(items)}")
    print()
    
    # Collect ALL unique breadcrumb paths (first 3 levels)
    paths = {}
    for item in items:
        bc = item.get('breadcrumbs', '')
        if isinstance(bc, str):
            parts = bc.split('/')
            # Take first 3-4 meaningful parts (skip Головна, Каталог)
            key_parts = [p for p in parts if p not in ['Головна', 'Каталог', '']][:3]
            key = ' > '.join(key_parts)
            paths[key] = paths.get(key, 0) + 1

    # Sort by count
    sorted_paths = sorted(paths.items(), key=lambda x: -x[1])
    
    print("Категорії у cards.json (топ 50):")
    print("-" * 60)
    for path, count in sorted_paths[:50]:
        print(f"{count:>6}  {path}")

except Exception as e:
    print(f"Error: {e}")
