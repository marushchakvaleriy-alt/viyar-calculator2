"""
Generate catalogConfigs structure for split catalogs
"""
import os
import re

GENERATED_DIR = 'data/catalogs/generated'

# Find all split catalog files
split_files = {}

for filename in os.listdir(GENERATED_DIR):
    if not filename.endswith('.js'):
        continue
    
    # Check if it's a split file (has vendor suffix)
    # Pattern: category_vendor.js
    parts = filename.replace('.js', '').split('_')
    
    # Known vendors
    vendors = ['agt', 'arpa', 'belviso', 'bel', 'viso', 'cleaf', 'egger', 'kronospan', 
               'niemann', 'rehau', 'swisskrono', 'swiss', 'krono', 'viyarfronts']
    
    # Check if last part is a vendor
    if len(parts) >= 2:
        last_part = parts[-1].lower()
        is_vendor = any(v in last_part for v in vendors)
        
        if is_vendor:
            # This is a split file
            category = '_'.join(parts[:-1])
            vendor = parts[-1]
            
            if category not in split_files:
                split_files[category] = []
            
            split_files[category].append({
                'vendor': vendor,
                'filename': filename
            })

print("Found split categories:")
print("="*60)

for category, vendors in sorted(split_files.items()):
    if len(vendors) > 1:  # Only categories with multiple vendors
        print(f"\n{category}:")
        for v in vendors:
            print(f"  - {v['vendor']}: {v['filename']}")

print(f"\n\nTotal: {len([c for c in split_files.values() if len(c) > 1])} categories with multiple vendors")
