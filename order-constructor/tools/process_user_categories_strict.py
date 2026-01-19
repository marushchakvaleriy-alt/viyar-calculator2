"""
Strict User Category Processor
Converts each file in 'categories/' directly to a JS catalog file 1-to-1.
No splitting, no merging.
"""
import json
import os
import re

IN_DIR = 'categories'
OUT_DIR = 'data/catalogs'

# Map filenames to nice variable names and output filenames
# (transliteration would be better but simple mapping is safer for now)
FILE_MAP = {
    'виробничіпослуги.json': 'services_production',
    'крайкаіпластикидлямеблів.json': 'edges_plastics',
    'меблевафурнітура.json': 'furniture_fittings',
    'освітленнядлямеблів.json': 'lighting',
    'плитніматеріали.json': 'board_materials',
    'побутоватехнікатасантехніка.json': 'appliances_plumbing',
    'покриттяпідлоги.json': 'flooring',
    'розсувнісистемидлядверей.json': 'sliding_systems',
    'склотадзеркало.json': 'glass_mirror',
    'стільницітастінпанелі.json': 'countertops_panels',
    'інструментиівитратніматеріали.json': 'tools_consumables'
}

def clean_name(str_val):
    if not str_val: return ""
    return str_val.replace('"', "'").strip()

def map_item(item):
    specs = item.get('specs', {})
    price = item.get('price', {})
    
    return {
        "id": item.get("code", ""),
        "vendor": specs.get("Виробник:", ""),
        "name": clean_name(item.get("title", "")),
        "article": specs.get("Артикул:", item.get("code", "")),
        "price": price.get("amount", "0"),
        "image": item.get("image", ""),
        "thickness": specs.get("Товщина, мм:", ""),
        "color": specs.get("Колір:", specs.get("Відтінок кольору (лицьова):", ""))
    }

def main():
    if not os.path.exists(IN_DIR):
        print(f"Directory {IN_DIR} not found!")
        return

    print("Processing user categories strictly...")
    
    # 1. Clean old catalogs to avoid confusion? 
    # Maybe backup? Let's just overwrite known ones.
    
    generated_vars = []

    for filename in os.listdir(IN_DIR):
        if not filename.endswith('.json'): continue
        
        file_key = filename.lower()
        if file_key not in FILE_MAP:
            print(f"Skipping unknown file: {filename}")
            continue
            
        out_name = FILE_MAP[file_key]
        var_name = "Catalog_" + ''.join(word.capitalize() for word in out_name.split('_'))
        
        in_path = os.path.join(IN_DIR, filename)
        out_path = os.path.join(OUT_DIR, out_name + ".js")
        
        try:
            with open(in_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                items = data.get('items', [])
                
            mapped_items = [map_item(i) for i in items]
            
            js_content = f"window.{var_name} = {json.dumps(mapped_items, ensure_ascii=False, indent=2)};\n"
            
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(js_content)
                
            print(f"Converted {filename} -> {out_name}.js ({len(mapped_items)} items)")
            generated_vars.append({'file': out_name + ".js", 'var': var_name})
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    # Write a loader helper or just print instructions
    print("\nDONE. Generated catalogs:")
    for g in generated_vars:
        print(f"  <script src=\"data/catalogs/{g['file']}\"></script> ({g['var']})")

if __name__ == "__main__":
    main()
