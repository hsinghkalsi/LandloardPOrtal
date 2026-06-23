import csv
import json
import re

gdrive_path = "/Users/harkamal/Library/CloudStorage/GoogleDrive-kismetinvestor@gmail.com/My Drive"

# Hardcode the properties we discovered to ensure cleanliness
properties = [
    { "id": "p_73fairfax", "name": "73 Fairfax Road", "address": "73 Fairfax Road", "units": 3, "value": 850000, "status": "Active" },
    { "id": "p_73zain", "name": "73 Zain Circle", "address": "73 Zain Circle", "units": 1, "value": 620000, "status": "Active" }
]

tenants = []
tenant_ids = set()
transactions = []

def clean_amount(val):
    if not val:
        return 0.0
    val = val.replace('$', '').replace(',', '')
    try:
        return float(val)
    except:
        return 0.0

def date_to_iso(dt_str):
    # MM/DD/YYYY to YYYY-MM-DD
    try:
        parts = dt_str.split('/')
        if len(parts) == 3:
            return f"{parts[2]}-{parts[0].zfill(2)}-{parts[1].zfill(2)}"
    except:
        pass
    return dt_str

# Parse Rent & Charges
for file_name in ["rent_payments_2025-05-28-07293030.csv", "charges_2026-01-05-083117.csv"]:
    path = f"{gdrive_path}/{file_name}"
    try:
        with open(path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                title = row.get("Lease Title", "")
                amount = clean_amount(row.get("Amount", ""))
                date = date_to_iso(row.get("Due Date", ""))
                
                prop_id = None
                tenant_name = None
                unit = ""
                
                if "73 fairfax" in title.lower():
                    prop_id = "p_73fairfax"
                    tenant_name = "Julia Martinez"
                    unit = "3L"
                elif "73 zain" in title.lower():
                    prop_id = "p_73zain"
                    if "Morgan+Robert" in title:
                        tenant_name = "Morgan & Robert"
                    else:
                        tenant_name = "Morgan & Robert" # Map the "July 2024" to same tenant
                
                # Add Tenant if unique
                if tenant_name:
                    t_id = f"t_{tenant_name.replace(' ', '').lower()}"
                    if t_id not in tenant_ids:
                        tenants.append({
                            "id": t_id,
                            "name": tenant_name,
                            "email": f"{tenant_name.split()[0].lower()}@example.com",
                            "phone": "555-0199",
                            "propertyId": prop_id,
                            "unit": unit,
                            "status": "Current"
                        })
                        tenant_ids.add(t_id)
                
                # Add Transaction (Income)
                if row.get("Status") == "PAID":
                    transactions.append({
                        "id": f"tx_rent_{file_name}_{i}",
                        "date": date,
                        "amount": amount,
                        "description": row.get("Description", "Rent"),
                        "category": "Income: Rent" if "RENT" in row.get("Category", "") else "Income: Other",
                        "propertyId": prop_id
                    })
    except Exception as e:
        print(f"Error reading {file_name}: {e}")

# Parse Chase File
path = f"{gdrive_path}/Chase9326_Activity_20250326.CSV"
try:
    with open(path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            amount = clean_amount(row.get("Amount", ""))
            date = date_to_iso(row.get("Posting Date", ""))
            desc = row.get("Description", "")
            
            # Skip Turbotenant credits if we already imported rents to avoid double counting
            if "TURBOTENANT" in desc.upper():
                continue
            
            cat = "Income: Other"
            if amount < 0:
                cat = "Expense: Other"
                if "SERVICE PLUS" in desc.upper() or "EXTERMINATIO" in desc.upper() or "HVAC" in desc.upper() or "HANDYMAN" in desc.upper():
                    cat = "Expense: Repairs"
                elif "MAGNA FINANCE" in desc.upper() or "SOUTHBRIDGE CREDIT" in desc.upper() or "WORCESTER" in desc.upper():
                    cat = "Expense: Mortgage"
                elif "WATER" in desc.upper() or "SEWER" in desc.upper():
                    cat = "Expense: Utilities"
                elif "AMAZON" in desc.upper() or "COSTCO" in desc.upper():
                    cat = "Expense: Supplies"
                
            transactions.append({
                "id": f"tx_chase_{i}",
                "date": date,
                "amount": abs(amount) if amount < 0 else amount,
                "description": desc.strip(),
                "category": cat,
                "propertyId": ""
            })
except Exception as e:
    print(f"Error reading Chase file: {e}")

# Generate JS Code
js_code = f"""let localState = {{
    properties: {json.dumps(properties, indent=8)},
    tenants: {json.dumps(tenants, indent=8)},
    transactions: {json.dumps(transactions, indent=8)},
    maintenance: [
        {{ id: 'm1', title: 'Leaky Faucet', status: 'Pending', propertyId: 'p_73fairfax' }}
    ],
    documents: [
        {{ id: 'd1', name: 'Lease Agreement', type: 'PDF' }}
    ]
}};
"""

with open("generated_state.txt", "w") as f:
    f.write(js_code)

print("Successfully generated state code to generated_state.txt")
