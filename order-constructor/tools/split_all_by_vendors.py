"""
Split all board material catalogs by vendors
"""
import json
import os
import re

CATALOG_DIR = 'data/catalogs'
GENERATED_DIR = 'data/catalogs/generated'

# Categories to split (based on file patterns)
CATEGORIES_TO_SPLIT = [
    'dsp',  # ДСП
    'mdf',  # МДФ
    'fanera',  # Фанера
    'hdf',  # ХДФ/ДВП
    'sdf',  # СДФ
    'osb',  # OSB
    'hpl',  # Пластик HPL
]

def safe_filename(name):
    """Create safe filename from vendor name"""
    return re.sub(r'[^\w\s-]', '', name).strip().replace(' ', '_').lower()

def safe_varname(name):
    """Create safe JavaScript variable name"""
    return re.sub(r'[^\w]', '', name.replace(' ', ''))

def process_catalog_file(filepath):
    """Process a single catalog file and split by vendors"""
    print(f"\nProcessing: {filepath}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract variable name and data
        match = re.match(r'window\.(\w+)\s*=\s*(\[[\s\S]*\]);', content)
        if not match:
            print(f"  ⚠️  Could not parse file format")
            return
        
        var_name = match.group(1)
        json_str = match.group(2)
        data = json.loads(json_str)
        
        # Group by vendor
        vendors = {}
        for item in data:
            vendor = item.get('vendor', 'Unknown')
            if vendor not in vendors:
                vendors[vendor] = []
            vendors[vendor].append(item)
        
        if len(vendors) <= 1:
            print(f"  ℹ️  Only one vendor, skipping split")
            return
        
        # Get base name from original variable
        base_name = var_name.replace('Catalog_', '')
        
        # Create output files for each vendor
        output_files = []
        for vendor, items in sorted(vendors.items()):
            if not vendor or vendor == 'Unknown':
                continue
            
            safe_vendor = safe_filename(vendor)
            var_vendor = safe_varname(vendor)
            
            # Create filename
            out_file = os.path.join(GENERATED_DIR, f"{base_name.lower()}_{safe_vendor}.js")
            
            # Create variable name
            new_var_name = f"Catalog_{base_name}_{var_vendor}"
            
            # Write file
            js_content = f"window.{new_var_name} = {json.dumps(items, ensure_ascii=False, indent=2)};\n"
            
            with open(out_file, 'w', encoding='utf-8') as f:
                f.write(js_content)
            
            output_files.append({
                'vendor': vendor,
                'count': len(items),
                'file': out_file,
                'var_name': new_var_name,
                'key': f"{base_name.lower()}_{safe_vendor}"
            })
            
            print(f"  ✓ {vendor}: {len(items)} items -> {os.path.basename(out_file)}")
        
        return {
            'base_name': base_name,
            'original_file': filepath,
            'vendors': output_files
        }
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return None

def main():
    print("Splitting board material catalogs by vendors...\n")
    
    # Create generated directory if it doesn't exist
    os.makedirs(GENERATED_DIR, exist_ok=True)
    
    # Find all catalog files in generated directory
    results = []
    for filename in os.listdir(GENERATED_DIR):
        if not filename.endswith('.js'):
            continue
        
        # Check if it matches our categories
        should_process = False
        for category in CATEGORIES_TO_SPLIT:
            if category in filename.lower():
                should_process = True
                break
        
        if not should_process:
            continue
        
        filepath = os.path.join(GENERATED_DIR, filename)
        result = process_catalog_file(filepath)
        if result:
            results.append(result)
    
    # Print summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    for result in results:
        print(f"\n{result['base_name']}:")
        print(f"  Original: {os.path.basename(result['original_file'])}")
        print(f"  Split into {len(result['vendors'])} vendors:")
        for vendor_info in result['vendors']:
            print(f"    - {vendor_info['vendor']}: {vendor_info['count']} items")
    
    # Generate script tags
    print("\n" + "="*60)
    print("ADD TO catalogs.html:")
    print("="*60)
    for result in results:
        print(f"\n<!-- {result['base_name']} by vendor -->")
        for vendor_info in result['vendors']:
            print(f'<script src="{vendor_info["file"].replace(os.sep, "/")}"></script>')
    
    print("\n✓ Done!")

if __name__ == "__main__":
    main()
