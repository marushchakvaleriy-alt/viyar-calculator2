import json
import os

def process_dsp_split():
    try:
        with open('data/cards.json', 'r', encoding='utf-8') as f:
            data_json = json.load(f)
            items = data_json.get('items', [])
        
        # Categories mapping
        # Maps breadcrumb sub-category to filename suffix and window variable suffix
        # e.g. "ДСП Egger" -> "egger" -> window.Catalog_Ldsp_Egger
        
        categories = {
            'ДСП Egger': 'egger',
            'ЛДСП Egger': 'egger', # Merge
            'ДСП Kronospan': 'kronospan',
            'ДСП Swiss Krono': 'swisskrono',
            'ДСП Cleaf': 'cleaf',
            'Saviola': 'saviola',
            'ДСП Rehau Rauvisio Grip': 'rehau'
        }
        
        # Buckets
        buckets = {key: [] for key in set(categories.values())}
        buckets['other'] = []
        
        for item in items:
            breadcrumbs_str = item.get('breadcrumbs', '')
            if not isinstance(breadcrumbs_str, str): continue
            
            breadcrumbs = breadcrumbs_str.split('/')
            
            # Check if it is DSP
            if 'Плитні матеріали' in breadcrumbs and 'ДСП' in breadcrumbs:
                # Find category
                found = False
                for cat_name, key in categories.items():
                    if cat_name in breadcrumbs:
                        # Extract data
                        entry = {
                            "id": item.get("code", ""),
                            "vendor": item.get("specs", {}).get("Виробник:", "N/A"),
                            "name": item.get("title", "").replace('"', ''),
                            "article": item.get("specs", {}).get("Декор:", ""), 
                            # Note: Article might be in Title or Code. Viyar often puts article in title.
                            # Let's try to parse article more smartly or just use code/title.
                            # For consistency with previous script, let's keep it simple.
                            "price": item.get("price", {}).get("amount", "0"),
                            "image": item.get("image", ""),
                            "thickness": item.get("specs", {}).get("Товщина, мм:", "")
                        }
                        buckets[key].append(entry)
                        found = True
                        break
                
                if not found:
                    entry = {
                        "id": item.get("code", ""),
                        "vendor": item.get("specs", {}).get("Виробник:", "Other"),
                        "name": item.get("title", "").replace('"', ''),
                        "article": "",
                        "price": item.get("price", {}).get("amount", "0"),
                        "image": item.get("image", ""),
                        "thickness": item.get("specs", {}).get("Товщина, мм:", "")
                    }
                    buckets['other'].append(entry)

        # Write files
        idx = 0
        for key, entries in buckets.items():
            if not entries: continue
            
            var_name = f"Catalog_Ldsp_{key.capitalize()}"
            filename = f"data/catalogs/ldsp_{key}.js"
            
            # Add to list of generated files
            print(f"Generating {filename} with {len(entries)} items...")
            
            js_content = f"window.{var_name} = {json.dumps(entries, ensure_ascii=False, indent=4)};\n"
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(js_content)
                
            idx += 1

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    process_dsp_split()
