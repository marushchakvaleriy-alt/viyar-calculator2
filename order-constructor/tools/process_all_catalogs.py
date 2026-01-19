"""
Universal Catalog Processor
Reads cards.json and creates JS catalog files for ALL categories automatically.
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Category name to JS variable name mapping
def to_var_name(category):
    # Remove special chars, convert to CamelCase
    words = re.sub(r'[^\w\s]', '', category).split()
    return ''.join(w.capitalize() for w in words)

def to_file_name(category):
    # Lowercase with underscores
    clean = re.sub(r'[^\w\s]', '', category).lower()
    return '_'.join(clean.split())

def extract_item_data(item):
    """Extract relevant fields from an item."""
    specs = item.get('specs', {})
    price_data = item.get('price', {})
    
    return {
        "id": item.get("code", ""),
        "vendor": specs.get("Виробник:", ""),
        "name": item.get("title", "").replace('"', "'"),
        "article": specs.get("Артикул:", item.get("code", "")),
        "price": price_data.get("amount", "0"),
        "image": item.get("image", ""),
        "thickness": specs.get("Товщина, мм:", ""),
        "color": specs.get("Колір:", specs.get("Відтінок кольору (лицьова):", "")),
        "material": specs.get("Матеріал:", ""),
    }

def main():
    print("Reading cards.json...")
    
    with open('data/cards.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    items = data.get('items', [])
    print(f"Total items: {len(items)}")
    
    # Group by main category (3rd level of breadcrumbs)
    # Breadcrumbs format: "Головна/Каталог/Плитні матеріали/ДСП/ДСП Egger"
    categories = {}
    
    for item in items:
        bc = item.get('breadcrumbs', '')
        if not isinstance(bc, str):
            continue
        
        parts = [p.strip() for p in bc.split('/') if p.strip() and p not in ['Головна', 'Каталог']]
        
        if len(parts) >= 1:
            # Use first meaningful category as main grouping
            main_cat = parts[0]
            
            # For more granularity, use first 2 parts if available
            if len(parts) >= 2:
                sub_cat = parts[1]
                key = f"{main_cat} > {sub_cat}"
            else:
                key = main_cat
            
            if key not in categories:
                categories[key] = []
            
            categories[key].append(extract_item_data(item))
    
    print(f"\nFound {len(categories)} categories:")
    
    # Create output directory
    out_dir = 'data/catalogs/generated'
    os.makedirs(out_dir, exist_ok=True)
    
    # Generate files
    total_items = 0
    manifest = []
    
    for cat_name, items_list in sorted(categories.items(), key=lambda x: -len(x[1])):
        file_name = to_file_name(cat_name)
        var_name = f"Catalog_{to_var_name(cat_name)}"
        
        file_path = f"{out_dir}/{file_name}.js"
        
        js_content = f"window.{var_name} = {json.dumps(items_list, ensure_ascii=False, indent=2)};\n"
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"  {len(items_list):>5} items -> {file_name}.js ({var_name})")
        total_items += len(items_list)
        
        manifest.append({
            "category": cat_name,
            "file": f"{file_name}.js",
            "variable": var_name,
            "count": len(items_list)
        })
    
    # Save manifest
    with open(f"{out_dir}/manifest.json", 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Done! {total_items} items in {len(categories)} categories")
    print(f"   Files saved to: {out_dir}/")
    print(f"   Manifest: {out_dir}/manifest.json")

if __name__ == "__main__":
    main()
