"""
Split specific board material catalogs by vendors
"""
import json
import os
import re

GENERATED_DIR = 'data/catalogs/generated'

# Specific files to split
FILES_TO_SPLIT = [
    'плитні_матеріали_дсп.js',
    'плитні_матеріали_мдфплита.js',
    'плитні_матеріали_мдф_панелі.js',
    'плитні_матеріали_фанера.js',
    'плитні_матеріали_двп_плита_хдф.js',
    'плитні_матеріали_cdf_плита.js',
    'плитні_матеріали_осб.js',
    'плитні_матеріали_меблеві_щити.js',
    'плитні_матеріали_шпоновані_плити.js',
]

def safe_filename(name):
    """Create safe filename from vendor name"""
    return re.sub(r'[^\w\s-]', '', name).strip().replace(' ', '_').replace('/', '_').lower()

def safe_varname(name):
    """Create safe JavaScript variable name"""
    return re.sub(r'[^\w]', '', name.replace(' ', '').replace('/', ''))

def process_catalog_file(filepath):
    """Process a single catalog file and split by vendors"""
    filename = os.path.basename(filepath)
    print(f"\nProcessing: {filename}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract variable name and data
        match = re.match(r'window\.(\w+)\s*=\s*(\[[\s\S]*\]);', content)
        if not match:
            print(f"  ⚠️  Could not parse file format")
            return None
        
        var_name = match.group(1)
        json_str = match.group(2)
        data = json.loads(json_str)
        
        print(f"  Total items: {len(data)}")
        
        # Group by vendor
        vendors = {}
        for item in data:
            vendor = item.get('vendor', 'Unknown')
            if vendor not in vendors:
                vendors[vendor] = []
            vendors[vendor].append(item)
        
        print(f"  Found {len(vendors)} vendors")
        
        if len(vendors) <= 1:
            print(f"  ℹ️  Only one vendor, skipping split")
            return None
        
        # Get base name from filename
        base_name = filename.replace('.js', '')
        
        # Create output files for each vendor
        output_files = []
        for vendor, items in sorted(vendors.items()):
            if not vendor or vendor == 'Unknown':
                continue
            
            safe_vendor = safe_filename(vendor)
            var_vendor = safe_varname(vendor)
            
            # Create filename
            out_file = os.path.join(GENERATED_DIR, f"{base_name}_{safe_vendor}.js")
            
            # Create variable name (based on original + vendor)
            new_var_name = f"{var_name}_{var_vendor}"
            
            # Write file
            js_content = f"window.{new_var_name} = {json.dumps(items, ensure_ascii=False, indent=2)};\n"
            
            with open(out_file, 'w', encoding='utf-8') as f:
                f.write(js_content)
            
            output_files.append({
                'vendor': vendor,
                'count': len(items),
                'file': out_file,
                'var_name': new_var_name,
                'key': f"{base_name}_{safe_vendor}"
            })
            
            print(f"  ✓ {vendor}: {len(items)} items")
        
        return {
            'base_name': base_name,
            'original_file': filepath,
            'original_var': var_name,
            'vendors': output_files
        }
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return None

def main():
    print("="*70)
    print("SPLITTING BOARD MATERIAL CATALOGS BY VENDORS")
    print("="*70)
    
    results = []
    for filename in FILES_TO_SPLIT:
        filepath = os.path.join(GENERATED_DIR, filename)
        if not os.path.exists(filepath):
            print(f"\n⚠️  File not found: {filename}")
            continue
        
        result = process_catalog_file(filepath)
        if result:
            results.append(result)
    
    # Print summary
    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)
    
    total_vendors = 0
    for result in results:
        print(f"\n✓ {result['base_name']}")
        print(f"  Split into {len(result['vendors'])} vendors:")
        total_vendors += len(result['vendors'])
        for vendor_info in result['vendors']:
            print(f"    • {vendor_info['vendor']}: {vendor_info['count']} items")
    
    print(f"\n📊 Total: {len(results)} categories split into {total_vendors} vendor-specific catalogs")
    
    print("\n✓ Done! Now update catalogs.html to add these files.")

if __name__ == "__main__":
    main()
