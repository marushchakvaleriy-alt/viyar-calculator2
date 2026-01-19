"""
Split board_materials catalog by vendors
"""
import json

IN_FILE = 'data/catalogs/board_materials.js'
OUT_DIR = 'data/catalogs'

def main():
    print("Splitting board materials by vendors...")
    
    try:
        # Read JS file
        with open(IN_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract JSON data
        json_str = content.replace('window.Catalog_BoardMaterials = ', '').rstrip(';\n')
        data = json.loads(json_str)
        
        # Group by vendor
        vendors = {}
        for item in data:
            vendor = item.get('vendor', 'Unknown')
            if vendor not in vendors:
                vendors[vendor] = []
            vendors[vendor].append(item)
        
        # Write separate files for each vendor
        for vendor, items in sorted(vendors.items()):
            if not vendor or vendor == 'Unknown':
                continue
            
            # Create safe filename
            safe_vendor = vendor.replace(' ', '_').replace('/', '_').lower()
            var_name = f"Catalog_BoardMaterials_{vendor.replace(' ', '').replace('/', '')}"
            out_file = f"{OUT_DIR}/board_materials_{safe_vendor}.js"
            
            js_content = f"window.{var_name} = {json.dumps(items, ensure_ascii=False, indent=2)};\n"
            
            with open(out_file, 'w', encoding='utf-8') as f:
                f.write(js_content)
            
            print(f"  ✓ {vendor}: {len(items)} items -> {safe_vendor}.js")
        
        print(f"\n✓ Total vendors: {len(vendors)}")
        print("\nДодайте до catalogs.html:")
        for vendor in sorted(vendors.keys()):
            if vendor and vendor != 'Unknown':
                safe_vendor = vendor.replace(' ', '_').replace('/', '_').lower()
                print(f'  <script src="data/catalogs/board_materials_{safe_vendor}.js"></script>')
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
