import pandas as pd
import sys
import json

def analyze_excel(file_path):
    try:
        # Load the Excel file
        xls = pd.ExcelFile(file_path)
        
        info = {
            "sheets": xls.sheet_names,
            "preview": {}
        }
        
        # Read a preview of each sheet
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(xls, sheet_name=sheet_name, nrows=100)
            df.dropna(how="all", inplace=True)
            df.dropna(axis=1, how="all", inplace=True)
            
            # Convert to dict, handling NaNs and datetime
            df.columns = df.columns.astype(str)
            df = df.astype(str)
            df = df.replace("nan", "")
            info["preview"][sheet_name] = df.to_dict(orient="records")
            
        with open("excel_structure.json", "w", encoding="utf-8") as f:
            json.dump(info, f, ensure_ascii=False, indent=2)
            
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        
if __name__ == "__main__":
    if len(sys.argv) > 1:
        analyze_excel(sys.argv[1])
    else:
        print("Please provide a file path.", file=sys.stderr)
