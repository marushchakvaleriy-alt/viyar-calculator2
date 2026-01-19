import json
import os
import sys

# Set encoding to utf-8 for console output
sys.stdout.reconfigure(encoding='utf-8')

try:
    with open('data/cards.json', 'r', encoding='utf-8') as f:
        data_json = json.load(f)
        items = data_json.get('items', [])

    # We are looking for "Плитні матеріали" -> "ДСП" and what comes next
    # breadcrumbs string looks like: "Головна/Каталог/Плитні матеріали/ДСП/ДСП Cleaf"
    
    categories = {}

    for item in items:
        breadcrumbs_str = item.get('breadcrumbs', '')
        # Convert string "A/B/C" to list ["A", "B", "C"]
        if isinstance(breadcrumbs_str, str):
            breadcrumbs = breadcrumbs_str.split('/')
        else:
            continue
            
        if 'ДСП' in breadcrumbs:
            idx = breadcrumbs.index('ДСП')
            if idx + 1 < len(breadcrumbs):
                sub = breadcrumbs[idx+1]
                categories[sub] = categories.get(sub, 0) + 1
    
    print("Categories under ДСП:")
    for cat, count in categories.items():
        print(f"{cat}: {count}")

except Exception as e:
    print(f"Error: {e}")
