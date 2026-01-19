"""
Test split - only OSB
"""
import json
import os
import re

GENERATED_DIR = 'data/catalogs/generated'
filename = 'плитні_матеріали_осб.js'

filepath = os.path.join(GENERATED_DIR, filename)

print(f"Processing: {filename}")

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract variable name and data
match = re.match(r'window\.(\w+)\s*=\s*(\[[\s\S]*\]);', content)
var_name = match.group(1)
json_str = match.group(2)
data = json.loads(json_str)

print(f"Total items: {len(data)}")

# Group by vendor
vendors = {}
for item in data:
    vendor = item.get('vendor', 'Unknown')
    if vendor not in vendors:
        vendors[vendor] = []
    vendors[vendor].append(item)

print(f"Vendors found: {list(vendors.keys())}")
print("Done!")
