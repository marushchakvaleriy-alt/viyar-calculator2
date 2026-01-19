"""
Catalog Aggregator
Reads the generated manifest.json and merges discrete catalog files into grouped JS files 
that match the order-constructor architecture.
"""
import json
import os
import re

GENERATED_DIR = 'data/catalogs/generated'
OUTPUT_DIR = 'data/catalogs'

def get_mapping_category(manifest_item):
    """
    Decides which main catalog file this item belongs to.
    Returns keys like 'hinges', 'handles', 'ldsp', etc.
    """
    cat = manifest_item['category'].lower()
    
    # Map keywords to main catalog buckets
    if 'петлі' in cat or 'завіси' in cat: return 'hinges'
    if 'ручки' in cat: return 'handles'
    if 'висування' in cat or 'шухляд' in cat or 'висувні' in cat: return 'drawer_systems'
    if 'підйомн' in cat or 'підіймачі' in cat or 'авентос' in cat: return 'lift_systems'
    if 'карго' in cat or 'кошик' in cat: return 'cargo'
    if 'сушк' in cat: return 'dryers'
    if 'освітлення' in cat or 'світильники' in cat or 'стрічка' in cat or 'профіль для світлодіодної' in cat: return 'lighting'
    if 'мийк' in cat: return 'sinks'
    if 'змішувач' in cat: return 'mixers'
    if 'техніка' in cat and 'побутова' in cat: return 'appliances'
    
    if 'крайка' in cat: return 'edges'
    if 'стільниці' in cat: return 'countertops'
    if 'фасади' in cat or 'панелі' in cat or 'скло' in cat or 'дзеркало' in cat: return 'facades'
    
    if 'плитні' in cat or 'дсп' in cat: return 'ldsp'
    
    return 'other_fittings' # Default fallback for undefined hardware

def main():
    print("Reading manifest...")
    try:
        with open(f'{GENERATED_DIR}/manifest.json', 'r', encoding='utf-8') as f:
            manifest = json.load(f)
    except FileNotFoundError:
        print("Manifest not found. Run process_all_catalogs.py first.")
        return

    # Prepare buckets
    buckets = {
        'hinges': [],
        'handles': [],
        'drawer_systems': [],
        'lift_systems': [],
        'cargo': [],
        'dryers': [],
        'lighting': [],
        'sinks': [],
        'mixers': [],
        'appliances': [],
        'edges': [],
        'countertops': [],
        'facades': [],
        'ldsp': [],
        'other_fittings': []
    }

    # Iterate manifest and load items
    for entry in manifest:
        bucket_key = get_mapping_category(entry)
        
        file_path = f"{GENERATED_DIR}/{entry['file']}"
        if not os.path.exists(file_path):
            print(f"Warning: File {file_path} missing.")
            continue
            
        # Parse the JS file content to get the array
        # Format is: window.VarName = [...];
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract JSON array part
        match = re.search(r'=\s*(\[.*\]);', content, re.DOTALL)
        if match:
            json_str = match.group(1)
            try:
                items = json.loads(json_str)
                buckets[bucket_key].extend(items)
                print(f"Merged {entry['category']} -> {bucket_key} ({len(items)} items)")
            except json.JSONDecodeError:
                print(f"Error parsing JSON in {entry['file']}")
        else:
            print(f"Could not extract data from {entry['file']}")

    # Write aggregated files
    print("\nWriting aggregated catalogs...")
    for key, items in buckets.items():
        if not items: continue
        
        var_name = f"Catalog_{key.capitalize() if key != 'ldsp' else 'Ldsp'}"
        # Formatting quirks handling
        if key == 'drawer_systems': var_name = 'Catalog_DrawerSystems'
        if key == 'lift_systems': var_name = 'Catalog_LiftSystems'
        
        output_file = f"{OUTPUT_DIR}/{key}.js"
        
        js_content = f"window.{var_name} = {json.dumps(items, ensure_ascii=False, indent=2)};\n"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"Saved {output_file} with {len(items)} items.")

if __name__ == "__main__":
    main()
