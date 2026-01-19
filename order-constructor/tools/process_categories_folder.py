"""
Process Pre-Split Category Files
Reads JSON files from 'categories' folder and generates JS catalogs.
"""
import json
import os
import re
import sys

# Output directory
OUT_DIR = 'data/catalogs'

def clean_name(str_val):
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

def save_catalog(name, items):
    var_name = f"Catalog_{name}"
    # Capitalize for variable name (simple logic)
    # Actually, let's map strictly to what engine expects
    var_map = {
        'ldsp': 'Ldsp',
        'edges': 'Edges',
        'facades': 'Facades',
        'countertops': 'Countertops',
        'hinges': 'Hinges',
        'handles': 'Handles',
        'drawer_systems': 'DrawerSystems',
        'lift_systems': 'LiftSystems',
        'cargo': 'Cargo',
        'dryers': 'Dryers',
        'lighting': 'Lighting',
        'appliances': 'Appliances',
        'sinks': 'Sinks',
        'mixers': 'Mixers'
    }
    
    # If name follows pattern "ldsp_egger", handle it
    if '_' in name and 'ldsp' in name:
        parts = name.split('_')
        suffix = parts[1].capitalize()
        real_var_name = f"Catalog_Ldsp_{suffix}"
    else:
        real_var_name = f"Catalog_{var_map.get(name, name.capitalize())}"
    
    filename = f"{OUT_DIR}/{name}.js"
    content = f"window.{real_var_name} = {json.dumps(items, ensure_ascii=False, indent=2)};\n"
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Saved {filename} ({len(items)} items)")

def process_file(filepath, processor_func):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            items = data.get('items', [])
            processor_func(items)
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# --- Processors ---

def process_furniture(items):
    # Splits furniture into hinges, handles, drawers, lifts, cargo, dryers
    buckets = {
        'hinges': [],
        'handles': [],
        'drawer_systems': [],
        'lift_systems': [],
        'cargo': [],
        'dryers': []
    }
    
    for item in items:
        bc = item.get('breadcrumbs', '').lower()
        mapped = map_item(item)
        
        if 'петлі' in bc:
            buckets['hinges'].append(mapped)
        elif 'ручки' in bc:
            buckets['handles'].append(mapped)
        elif 'висування' in bc or 'шухляд' in bc:
            buckets['drawer_systems'].append(mapped)
        elif 'підйомн' in bc:
            buckets['lift_systems'].append(mapped)
        elif 'карго' in bc or 'кошик' in bc:
            buckets['cargo'].append(mapped)
        elif 'сушк' in bc:
            buckets['dryers'].append(mapped)
    
    for key, lst in buckets.items():
        if lst: save_catalog(key, lst)

def process_dsp(items):
    # Splits DSP by vendor similar to before
    buckets = {}
    
    for item in items:
        bc = item.get('breadcrumbs', '')
        # Check if it is really board material (dsp/mdf)
        if 'Стільниці' in bc: continue # Skip countertops here
        
        mapped = map_item(item)
        vendor = mapped['vendor'].lower()
        
        key = 'other'
        if 'egger' in vendor: key = 'egger'
        elif 'kronospan' in vendor: key = 'kronospan'
        elif 'swiss' in vendor or 'krono' in vendor: key = 'swisskrono'
        elif 'cleaf' in vendor: key = 'cleaf'
        elif 'saviola' in vendor: key = 'saviola'
        elif 'rehau' in vendor: key = 'rehau'
        
        if key not in buckets: buckets[key] = []
        buckets[key].append(mapped)
        
    for key, lst in buckets.items():
        save_catalog(f"ldsp_{key}", lst)

def process_appliances(items):
    buckets = {
        'sinks': [],
        'mixers': [],
        'appliances': []
    }
    
    for item in items:
        bc = item.get('breadcrumbs', '').lower()
        mapped = map_item(item)
        
        if 'мийк' in bc:
            buckets['sinks'].append(mapped)
        elif 'змішувач' in bc:
            buckets['mixers'].append(mapped)
        else:
            buckets['appliances'].append(mapped)

    for key, lst in buckets.items():
        save_catalog(key, lst)

def process_simple(items, catalog_name):
    mapped_items = [map_item(i) for i in items]
    save_catalog(catalog_name, mapped_items)

# --- Main ---

def main():
    cat_dir = 'categories' # Assuming run from order-constructor folder where categories/ is
    
    # Mapping filename -> processor
    # Filenames are lowecase from list_dir
    files_map = {
        'меблевафурнітура.json': process_furniture,
        'плитніматеріали.json': process_dsp,
        'побутоватехнікатасантехніка.json': process_appliances,
        'освітленнядлямеблів.json': lambda items: process_simple(items, 'lighting'),
        'крайкаіпластикидлямеблів.json': lambda items: process_simple(items, 'edges'),
        'стільницітастінпанелі.json': lambda items: process_simple(items, 'countertops'),
        # 'склотадзеркало.json': lambda items: process_simple(items, 'facades') # Maybe? Or distinct
    }
    
    for filename, processor in files_map.items():
        path = os.path.join(cat_dir, filename)
        if os.path.exists(path):
            print(f"Processing {filename}...")
            processor(json.load(open(path, encoding='utf-8'))['items'])
        else:
            print(f"Skipping {filename} (not found)")

if __name__ == "__main__":
    main()
