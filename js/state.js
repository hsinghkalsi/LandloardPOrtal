import { db, collection, addDoc, onSnapshot } from './firebase-config.js';

// Mock Data Fallback
let localState = {
    properties: [
        {
                "id": "p_73fairfax",
                "name": "73 Fairfax Road",
                "address": "73 Fairfax Road",
                "units": 3,
                "value": 850000,
                "status": "Active"
        },
        {
                "id": "p_73zain",
                "name": "73 Zain Circle",
                "address": "73 Zain Circle",
                "units": 1,
                "value": 620000,
                "status": "Active"
        }
],
    tenants: [
        {
                "id": "t_juliamartinez",
                "name": "Julia Martinez",
                "email": "julia@example.com",
                "phone": "555-0199",
                "propertyId": "p_73fairfax",
                "unit": "3L",
                "status": "Current"
        },
        {
                "id": "t_morgan&robert",
                "name": "Morgan & Robert",
                "email": "morgan@example.com",
                "phone": "555-0199",
                "propertyId": "p_73zain",
                "unit": "",
                "status": "Current"
        }
],
    transactions: [
        {
                "id": "tx_rent_rent_payments_2025-05-28-07293030.csv_15",
                "date": "2024-10-01",
                "amount": 2000.0,
                "description": "Regular monthly charge",
                "category": "Income: Rent",
                "propertyId": "p_73fairfax"
        },
        {
                "id": "tx_rent_rent_payments_2025-05-28-07293030.csv_16",
                "date": "2024-09-01",
                "amount": 2000.0,
                "description": "Last month Rent",
                "category": "Income: Other",
                "propertyId": "p_73fairfax"
        },
        {
                "id": "tx_rent_rent_payments_2025-05-28-07293030.csv_17",
                "date": "2024-09-01",
                "amount": 2000.0,
                "description": "2000",
                "category": "Income: Other",
                "propertyId": "p_73fairfax"
        },
        {
                "id": "tx_rent_rent_payments_2025-05-28-07293030.csv_18",
                "date": "2024-09-01",
                "amount": 2000.0,
                "description": "Regular monthly charge",
                "category": "Income: Rent",
                "propertyId": "p_73fairfax"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_0",
                "date": "2025-12-24",
                "amount": 3200.0,
                "description": "First month Charge",
                "category": "Income: Other",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_1",
                "date": "2025-12-24",
                "amount": 3200.0,
                "description": "security Deposit",
                "category": "Income: Other",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_3",
                "date": "2025-10-05",
                "amount": 3400.0,
                "description": "Monthly",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_4",
                "date": "2025-09-05",
                "amount": 3400.0,
                "description": "Monthly",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_5",
                "date": "2025-08-05",
                "amount": 3400.0,
                "description": "Monthly",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_6",
                "date": "2025-07-31",
                "amount": 121.37,
                "description": "Water Bill",
                "category": "Income: Other",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_7",
                "date": "2025-07-05",
                "amount": 3400.0,
                "description": "Monthly",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_8",
                "date": "2025-06-05",
                "amount": 3400.0,
                "description": "Monthly",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_9",
                "date": "2025-05-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_10",
                "date": "2025-04-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_11",
                "date": "2025-03-28",
                "amount": 194.43,
                "description": "Water",
                "category": "Income: Other",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_12",
                "date": "2025-03-01",
                "amount": 143.0,
                "description": "Milford Sewer bill",
                "category": "Income: Other",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_13",
                "date": "2025-03-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_14",
                "date": "2025-02-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_15",
                "date": "2025-01-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_16",
                "date": "2024-12-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_17",
                "date": "2024-11-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_18",
                "date": "2024-10-20",
                "amount": 143.0,
                "description": "Milford Sewer",
                "category": "Income: Other",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_19",
                "date": "2024-10-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_20",
                "date": "2024-09-20",
                "amount": 91.21,
                "description": "water bill",
                "category": "Income: Other",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_rent_charges_2026-01-05-083117.csv_21",
                "date": "2024-09-01",
                "amount": 3300.0,
                "description": "Monthly rental charge",
                "category": "Income: Rent",
                "propertyId": "p_73zain"
        },
        {
                "id": "tx_chase_0",
                "date": "2025-03-25",
                "amount": 849.79,
                "description": "Online Payment 23797128504 To Magna finance company inc 03/25",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_1",
                "date": "2025-03-25",
                "amount": 7520.34,
                "description": "Online Payment 23797089753 To Southbridge Credit Union 03/25",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_2",
                "date": "2025-03-25",
                "amount": 83.25,
                "description": "ORIG CO NAME:City of Worceste       ORIG ID:1800948598 DESC DATE:       CO ENTRY DESCR:City of WoSEC:WEB    TRACE#:091000018353438 EED:250325   IND ID:ST-K8C2D2P8N6U8              IND NAME:KISMET INVESTEMENTS LL TRN: 0848353438TC",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_9",
                "date": "2025-03-05",
                "amount": 74.0,
                "description": "Online Payment 23947385539 To Constable Raymond Gonzalez  Licensed and 03/05",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_10",
                "date": "2025-03-04",
                "amount": 1624.0,
                "description": "ORIG CO NAME:Worcester Housin       ORIG ID:1046004472 DESC DATE:Mar    CO ENTRY DESCR:WHA   ItemSEC:PPD    TRACE#:211370701545733 EED:250304   IND ID:                             IND NAME:Kismet Investments L TRN: 0631545733TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_12",
                "date": "2025-03-03",
                "amount": 220.0,
                "description": "SERVICES PLUS DISPOSAL 508-8879818 MA        03/01",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_13",
                "date": "2025-02-28",
                "amount": 15.0,
                "description": "MONTHLY SERVICE FEE",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_16",
                "date": "2025-02-21",
                "amount": 849.79,
                "description": "Online Payment 23484899580 To Magna finance company inc 02/21",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_17",
                "date": "2025-02-21",
                "amount": 7520.34,
                "description": "Online Payment 23484845473 To Southbridge Credit Union 02/21",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_20",
                "date": "2025-02-10",
                "amount": 1100.0,
                "description": "Zelle payment to Jaqueline cruz JPM99axiu7ks",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_22",
                "date": "2025-02-06",
                "amount": 275.0,
                "description": "Zelle payment to Derek Pest control JPM99ax9pooa",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_23",
                "date": "2025-02-06",
                "amount": 335.0,
                "description": "SERVICE PLUS DISPOSA 508-8879818 MA          02/04",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_25",
                "date": "2025-02-04",
                "amount": 1624.0,
                "description": "ORIG CO NAME:Worcester Housin       ORIG ID:1046004472 DESC DATE:Feb    CO ENTRY DESCR:WHA   ItemSEC:PPD    TRACE#:211370703637993 EED:250204   IND ID:                             IND NAME:Kismet Investments L TRN: 0353637993TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_26",
                "date": "2025-01-31",
                "amount": 15.0,
                "description": "MONTHLY SERVICE FEE",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_29",
                "date": "2025-01-29",
                "amount": 0.5,
                "description": "ORIG CO NAME:       UniPayFee       ORIG ID:0000002053 DESC DATE:       CO ENTRY DESCR:  One Fee SEC:WEB    TRACE#:211372372065872 EED:250129   IND ID:202501271038275              IND NAME:HARKAMALDEEP KALSI TRN: 0292065872TC",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_30",
                "date": "2025-01-29",
                "amount": 989.32,
                "description": "ORIG CO NAME:       WORCESTER       ORIG ID:0000000355 DESC DATE:       CO ENTRY DESCR:        WSSEC:WEB    TRACE#:211372372066035 EED:250129   IND ID:202501271038275              IND NAME:HARKAMALDEEP KALSI TRN: 0292066035TC",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_31",
                "date": "2025-01-29",
                "amount": 2541.4,
                "description": "ORIG CO NAME:       WORCESTER       ORIG ID:0000000355 DESC DATE:       CO ENTRY DESCR:RealEstateSEC:WEB    TRACE#:211372372066082 EED:250129   IND ID:202501271038275              IND NAME:HARKAMALDEEP KALSI TRN: 0292066082TC",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_32",
                "date": "2025-01-24",
                "amount": 849.79,
                "description": "Online Payment 23145403123 To Magna finance company inc 01/24",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_33",
                "date": "2025-01-24",
                "amount": 7520.34,
                "description": "Online Payment 23145238980 To Southbridge Credit Union 01/24",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_34",
                "date": "2025-01-21",
                "amount": 616.24,
                "description": "WWW COSTCO COM 800-955-2292 WA               01/20",
                "category": "Expense: Supplies",
                "propertyId": ""
        },
        {
                "id": "tx_chase_35",
                "date": "2025-01-16",
                "amount": 74.0,
                "description": "Zelle payment to KENNETH MACNEIL JPM99av3iohu",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_36",
                "date": "2025-01-13",
                "amount": 1069.45,
                "description": "Zelle payment to Gajoinder Pal Handyman JPM99aurlo22",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_37",
                "date": "2025-01-08",
                "amount": 1000.0,
                "description": "Zelle payment from JAQUELINE CRUZ BACuk9m48bon",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_40",
                "date": "2025-01-06",
                "amount": 150.0,
                "description": "Zelle payment to Marciglei Martins JPM99au5pw2h",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_42",
                "date": "2025-01-03",
                "amount": 1624.0,
                "description": "ORIG CO NAME:Worcester Housin       ORIG ID:1046004472 DESC DATE:Jan    CO ENTRY DESCR:WHA   ItemSEC:PPD    TRACE#:211370702178211 EED:250103   IND ID:                             IND NAME:Kismet Investments L TRN: 0032178211TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_43",
                "date": "2025-01-02",
                "amount": 225.0,
                "description": "Zelle payment to Jaqueline cruz JPM99atzzm4f",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_44",
                "date": "2025-01-02",
                "amount": 300.0,
                "description": "Zelle payment to Jaqueline cruz JPM99atzysno",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_45",
                "date": "2025-01-02",
                "amount": 220.0,
                "description": "SERVICE PLUS DISPOSA 508-8879818 MA          01/01",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_47",
                "date": "2025-01-02",
                "amount": 2000.0,
                "description": "Zelle payment from JAQUELINE CRUZ BACs4xbo620i",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_48",
                "date": "2024-12-31",
                "amount": 2000.0,
                "description": "DEPOSIT  ID NUMBER  12405",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_49",
                "date": "2024-12-23",
                "amount": 849.79,
                "description": "Online Payment 22786176670 To Magna finance company inc 12/23",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_50",
                "date": "2024-12-23",
                "amount": 7520.34,
                "description": "Online Payment 22785942479 To Southbridge Credit Union 12/23",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_52",
                "date": "2024-12-17",
                "amount": 795.0,
                "description": "PRO-TECH EXTERMINATIO 508-757-2409 MA        12/16",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_55",
                "date": "2024-12-05",
                "amount": 220.0,
                "description": "SERVICE PLUS DISPOSA 508-8879818 MA          12/03",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_56",
                "date": "2024-12-04",
                "amount": 375.0,
                "description": "Zelle payment to Waldermar HVAC JPM99asbuxjt",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_57",
                "date": "2024-12-03",
                "amount": 1624.0,
                "description": "ORIG CO NAME:Worcester Housin       ORIG ID:1046004472 DESC DATE:Dec    CO ENTRY DESCR:WHA   ItemSEC:PPD    TRACE#:211370702905566 EED:241203   IND ID:                             IND NAME:Kismet Investments L TRN: 3382905566TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_60",
                "date": "2024-11-25",
                "amount": 150.0,
                "description": "Zelle payment to Jesus JPM99arshk3y",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_61",
                "date": "2024-11-21",
                "amount": 849.79,
                "description": "Online Payment 22488715495 To Magna finance company inc 11/21",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_62",
                "date": "2024-11-21",
                "amount": 7520.34,
                "description": "Online Payment 22488518515 To Southbridge Credit Union 11/21",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_63",
                "date": "2024-11-13",
                "amount": 220.0,
                "description": "SERVICE PLUS DISPOSA 508-8879818 MA          11/11",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_65",
                "date": "2024-11-07",
                "amount": 790.0,
                "description": "Zelle payment to Filipe Castro JPM99aqrif93",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_66",
                "date": "2024-11-07",
                "amount": 10.0,
                "description": "Zelle payment to Filipe Castro JPM99aqrhh4m",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_68",
                "date": "2024-11-04",
                "amount": 1624.0,
                "description": "ORIG CO NAME:Worcester Housin       ORIG ID:1046004472 DESC DATE:Nov    CO ENTRY DESCR:WHA   ItemSEC:PPD    TRACE#:211370702742877 EED:241104   IND ID:                             IND NAME:Kismet Investments L TRN: 3092742877TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_71",
                "date": "2024-10-25",
                "amount": 849.79,
                "description": "Online Payment 22154133494 To Magna finance company inc 10/25",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_72",
                "date": "2024-10-25",
                "amount": 7520.34,
                "description": "Online Payment 22153853443 To Southbridge Credit Union 10/25",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_73",
                "date": "2024-10-22",
                "amount": 37.18,
                "description": "Amazon.com Amzn.com/bill WA                  10/21",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_74",
                "date": "2024-10-22",
                "amount": 37.18,
                "description": "Amazon.com Amzn.com/bill WA                  10/21",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_75",
                "date": "2024-10-21",
                "amount": 0.5,
                "description": "ORIG CO NAME:       UniPayFee       ORIG ID:0000002053 DESC DATE:       CO ENTRY DESCR:  One Fee SEC:WEB    TRACE#:211372377028149 EED:241021   IND ID:20241017631373               IND NAME:HARKAMALDEEP KALSI TRN: 2957028149TC",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_76",
                "date": "2024-10-21",
                "amount": 1100.48,
                "description": "ORIG CO NAME:       WORCESTER       ORIG ID:0000000355 DESC DATE:       CO ENTRY DESCR:        WSSEC:WEB    TRACE#:211372377027843 EED:241021   IND ID:20241017631373               IND NAME:HARKAMALDEEP KALSI TRN: 2957027843TC",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_77",
                "date": "2024-10-21",
                "amount": 37.18,
                "description": "Amazon.com Amzn.com/bill WA                  10/21",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_78",
                "date": "2024-10-21",
                "amount": 58.43,
                "description": "Amazon.com Amzn.com/bill WA                  10/21",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_79",
                "date": "2024-10-09",
                "amount": 0.5,
                "description": "ORIG CO NAME:       UniPayFee       ORIG ID:0000002053 DESC DATE:       CO ENTRY DESCR:  One Fee SEC:WEB    TRACE#:211372378685672 EED:241009   IND ID:20241007561050               IND NAME:HARKAMALDEEP KALSI TRN: 2838685672TC",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_80",
                "date": "2024-10-09",
                "amount": 2080.37,
                "description": "ORIG CO NAME:       WORCESTER       ORIG ID:0000000355 DESC DATE:       CO ENTRY DESCR:RealEstateSEC:WEB    TRACE#:211372378684721 EED:241009   IND ID:20241007561050               IND NAME:HARKAMALDEEP KALSI TRN: 2838684721TC",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_81",
                "date": "2024-10-09",
                "amount": 24.81,
                "description": "AMAZON MKTPL*512SR20 Amzn.com/bill WA        10/09",
                "category": "Expense: Supplies",
                "propertyId": ""
        },
        {
                "id": "tx_chase_82",
                "date": "2024-10-09",
                "amount": 26.86,
                "description": "Amazon.com*GO33U4JZ3 Amzn.com/bill WA        10/09",
                "category": "Expense: Supplies",
                "propertyId": ""
        },
        {
                "id": "tx_chase_84",
                "date": "2024-10-04",
                "amount": 220.0,
                "description": "SERVICE PLUS DISPOSA 508-8879818 MA          10/02",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_86",
                "date": "2024-10-03",
                "amount": 1271.0,
                "description": "ORIG CO NAME:Worcester Housin       ORIG ID:1046004472 DESC DATE:Oct    CO ENTRY DESCR:WHA   ItemSEC:PPD    TRACE#:211370709160021 EED:241003   IND ID:                             IND NAME:Kismet Investments L TRN: 2779160021TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_88",
                "date": "2024-10-01",
                "amount": 180.0,
                "description": "Zelle payment to Ana Junqueira JPM99aonin62",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_90",
                "date": "2024-10-01",
                "amount": 6000.0,
                "description": "ORIG CO NAME:CENTRAL MAS-9518       ORIG ID:P142791448 DESC DATE:       CO ENTRY DESCR:RAFT      SEC:PPD    TRACE#:022000045537411 EED:241001   IND ID:                             IND NAME:KISMET INVESTMENTS LL TRN: 2755537411TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_91",
                "date": "2024-09-26",
                "amount": 93.1,
                "description": "Amazon.com Amzn.com/bill WA                  09/26",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_92",
                "date": "2024-09-24",
                "amount": 849.79,
                "description": "Online Payment 21814115043 To Magna finance company inc 09/24",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_93",
                "date": "2024-09-24",
                "amount": 7520.34,
                "description": "Online Payment 21813554393 To Southbridge Credit Union 09/24",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_94",
                "date": "2024-09-23",
                "amount": 520.0,
                "description": "Online Payment 22149144443 To Cali Law 09/23",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_95",
                "date": "2024-09-20",
                "amount": 169.97,
                "description": "Amazon.com*NE82K9RD3 Amzn.com/bill WA        09/20",
                "category": "Expense: Supplies",
                "propertyId": ""
        },
        {
                "id": "tx_chase_96",
                "date": "2024-09-18",
                "amount": 194.08,
                "description": "AMAZON MKTPL*6V01Q9H Amzn.com/bill WA        09/17",
                "category": "Expense: Supplies",
                "propertyId": ""
        },
        {
                "id": "tx_chase_100",
                "date": "2024-09-03",
                "amount": 105.0,
                "description": "SERVICE PLUS DISPOSA 508-8879818 MA          09/01",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_102",
                "date": "2024-09-03",
                "amount": 2321.0,
                "description": "ORIG CO NAME:Worcester Housin       ORIG ID:1046004472 DESC DATE:Sep    CO ENTRY DESCR:WHA   ItemSEC:PPD    TRACE#:211370704354748 EED:240903   IND ID:                             IND NAME:Kismet Investments L TRN: 2474354748TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_103",
                "date": "2024-08-29",
                "amount": 93.1,
                "description": "Amazon.com*RK0BX6B82 Amzn.com/bill WA        08/28",
                "category": "Expense: Supplies",
                "propertyId": ""
        },
        {
                "id": "tx_chase_104",
                "date": "2024-08-27",
                "amount": 300.0,
                "description": "$300 for New Checking",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_105",
                "date": "2024-08-23",
                "amount": 849.79,
                "description": "Online Payment 21508779099 To Magna finance company inc 08/23",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_106",
                "date": "2024-08-23",
                "amount": 7520.34,
                "description": "Online Payment 21508551865 To Southbridge Credit Union 08/23",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_112",
                "date": "2024-08-09",
                "amount": 0.5,
                "description": "ORIG CO NAME:       UniPayFee       ORIG ID:0000002053 DESC DATE:       CO ENTRY DESCR:  One Fee SEC:WEB    TRACE#:211372371865117 EED:240809   IND ID:20240807214766               IND NAME:HARKAMALDEEP KALSI TRN: 2221865117TC",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_113",
                "date": "2024-08-09",
                "amount": 906.86,
                "description": "ORIG CO NAME:       WORCESTER       ORIG ID:0000000355 DESC DATE:       CO ENTRY DESCR:        WSSEC:WEB    TRACE#:211372371864034 EED:240809   IND ID:20240807214766               IND NAME:HARKAMALDEEP KALSI TRN: 2221864034TC",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_114",
                "date": "2024-08-09",
                "amount": 2085.23,
                "description": "ORIG CO NAME:       WORCESTER       ORIG ID:0000000355 DESC DATE:       CO ENTRY DESCR:RealEstateSEC:WEB    TRACE#:211372371863979 EED:240809   IND ID:20240807214766               IND NAME:HARKAMALDEEP KALSI TRN: 2221863979TC",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_117",
                "date": "2024-08-05",
                "amount": 335.0,
                "description": "SERVICE PLUS DISPOSA 508-8879818 MA          08/01",
                "category": "Expense: Repairs",
                "propertyId": ""
        },
        {
                "id": "tx_chase_121",
                "date": "2024-07-29",
                "amount": 79.0,
                "description": "TT: PREMIUM SUB ANNU HTTPSTURBOTEN CO        07/28",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_122",
                "date": "2024-07-25",
                "amount": 849.79,
                "description": "Online Payment 21502550014 To Magna finance company inc 07/25",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_123",
                "date": "2024-07-25",
                "amount": 7520.34,
                "description": "Online Payment 21502796361 To Southbridge Credit Union 07/25",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_124",
                "date": "2024-07-18",
                "amount": 2416.43,
                "description": "MAGNA FINANCE 800-376-3399 MA                07/17",
                "category": "Expense: Mortgage",
                "propertyId": ""
        },
        {
                "id": "tx_chase_125",
                "date": "2024-07-10",
                "amount": 14601.86,
                "description": "REMOTE ONLINE DEPOSIT #          1",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_126",
                "date": "2024-07-03",
                "amount": 2000.0,
                "description": "REAL TIME TRANSFER RECD FROM ABA/CONTR BNK-021000021  FROM: BNF-HARKAMALDEEP S KALSI REF: 21293900682 INFO: TEXT-  IID: 20240703021000021P1BRJPC00520027499 RECD: 11:01:14 TRN: 0399760185GA",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_127",
                "date": "2024-07-02",
                "amount": 247971.78,
                "description": "WITHDRAWAL 07/02",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_128",
                "date": "2024-07-01",
                "amount": 15.0,
                "description": "DOMESTIC INCOMING WIRE FEE",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_129",
                "date": "2024-07-01",
                "amount": 15.0,
                "description": "DOMESTIC INCOMING WIRE FEE",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_130",
                "date": "2024-07-01",
                "amount": 5000.0,
                "description": "FEDWIRE CREDIT VIA: WELLS FARGO BANK, N.A./121000248 B/O: RAMNEEK SINGH KALSI , CLOVIS CA 93619/US/REF: CHASE NYC/CTR/BNF=KISMET INVESTMENTS, LLC SOUTHBOROUGH MA 01772-1830 U S/AC-000000006098 RFB=ATS0000681328 110 OBI=SCH REF(N 5025706 000058583 7999) BBI=/CHGS/USD0,00/CHGS/USD0,0 0/OCMT/USD5000,00/ IMAD: 0701I1B7033R029919 TRN: 1317861183FF",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_131",
                "date": "2024-07-01",
                "amount": 15000.0,
                "description": "FEDWIRE CREDIT VIA: WELLS FARGO BANK, N.A./121000248 B/O: RAMNEEK SINGH KALSI , CLOVIS CA 93619/US/REF: CHASE NYC/CTR/BNF=KISMET INVESTMENTS, LLC SOUTHBOROUGH MA 01772-1830 U S/AC-000000006098 RFB=ATS0000316747 267 OBI=SCH REF(N 5025706 000121514 2250) BBI=/CHGS/USD0,00/CHGS/USD0,0 0/OCMT/USD15000,00/ IMAD: 0701I1B7033R025447 TRN: 1126561183FF",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_132",
                "date": "2024-06-28",
                "amount": 25000.0,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502231 DESC DATE:240628 CO ENTRY DESCR:Ext TrnsfrSEC:PPD    TRACE#:021000026772021 EED:240628   IND ID:                             IND NAME:HARKAMALDEEP S KALSI TRN: 1806772021TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_133",
                "date": "2024-06-27",
                "amount": 25000.0,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502231 DESC DATE:240627 CO ENTRY DESCR:Ext TrnsfrSEC:PPD    TRACE#:021000022614959 EED:240627   IND ID:                             IND NAME:HARKAMALDEEP S KALSI TRN: 1792614959TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_134",
                "date": "2024-06-26",
                "amount": 25000.0,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502231 DESC DATE:240626 CO ENTRY DESCR:Ext TrnsfrSEC:PPD    TRACE#:021000026652004 EED:240626   IND ID:                             IND NAME:HARKAMALDEEP S KALSI TRN: 1786652004TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_135",
                "date": "2024-06-25",
                "amount": 100000.0,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502231 DESC DATE:240625 CO ENTRY DESCR:Ext TrnsfrSEC:PPD    TRACE#:021000027579047 EED:240625   IND ID:                             IND NAME:RAMNEEK SINGH KALSI TRN: 1777579047TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_136",
                "date": "2024-06-24",
                "amount": 25000.0,
                "description": "REAL TIME TRANSFER RECD FROM ABA/CONTR BNK-322271627  FROM: BNF-RAMNEEK SINGH KALSI REF: 21179638107 INFO: TEXT-  IID: 20240624021000021P1BRJPC00510046266 RECD: 14:51:32 TRN: 0464960176GC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_137",
                "date": "2024-06-21",
                "amount": 30000.0,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502231 DESC DATE:240621 CO ENTRY DESCR:Ext TrnsfrSEC:PPD    TRACE#:021000024418636 EED:240621   IND ID:                             IND NAME:HARKAMALDEEP S KALSI TRN: 1734418636TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_138",
                "date": "2024-06-20",
                "amount": 0.16,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502233 DESC DATE:240620 CO ENTRY DESCR:ACCTVERIFYSEC:WEB    TRACE#:021000021346645 EED:240620   IND ID:21129687203                  IND NAME:Auth TRN: 1721346645TC",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_139",
                "date": "2024-06-20",
                "amount": 0.01,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502233 DESC DATE:240620 CO ENTRY DESCR:ACCTVERIFYSEC:PPD    TRACE#:021000021346432 EED:240620   IND ID:                             IND NAME:Auth TRN: 1721346432TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_140",
                "date": "2024-06-20",
                "amount": 0.15,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502233 DESC DATE:240620 CO ENTRY DESCR:ACCTVERIFYSEC:PPD    TRACE#:021000021346505 EED:240620   IND ID:                             IND NAME:Auth TRN: 1721346505TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_141",
                "date": "2024-06-18",
                "amount": 0.77,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502233 DESC DATE:240618 CO ENTRY DESCR:ACCTVERIFYSEC:WEB    TRACE#:021000028199409 EED:240618   IND ID:21126610869                  IND NAME:Auth TRN: 1708199409TC",
                "category": "Expense: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_142",
                "date": "2024-06-18",
                "amount": 0.28,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502233 DESC DATE:240618 CO ENTRY DESCR:ACCTVERIFYSEC:PPD    TRACE#:021000028199242 EED:240618   IND ID:                             IND NAME:Auth TRN: 1708199242TC",
                "category": "Income: Other",
                "propertyId": ""
        },
        {
                "id": "tx_chase_143",
                "date": "2024-06-18",
                "amount": 0.49,
                "description": "ORIG CO NAME:JPMorgan Chase         ORIG ID:9200502233 DESC DATE:240618 CO ENTRY DESCR:ACCTVERIFYSEC:PPD    TRACE#:021000028199151 EED:240618   IND ID:                             IND NAME:Auth TRN: 1708199151TC",
                "category": "Income: Other",
                "propertyId": ""
        }
],
    maintenance: [
        { id: 'm1', title: 'Leaky Faucet', status: 'Pending', propertyId: 'p_73fairfax' }
    ],
    documents: [
        { id: 'd1', name: 'Lease Agreement', type: 'PDF' }
    ]
};


// If Firebase is initialized, we use this reactive state
const cloudState = {
    properties: [],
    units: [],
    leases: [],
    tenants: [],
    transactions: [],
    users: []
};

// Data Migration Script for hierarchical properties
if (!localState.units) localState.units = [];
if (!localState.leases) localState.leases = [];

// Migrate old scalar units to relational units
localState.properties.forEach(prop => {
    if (typeof prop.units === 'number' && prop.units > 0 && !localState.units.find(u => u.propertyId === prop.id)) {
        for (let i = 1; i <= prop.units; i++) {
            localState.units.push({
                id: `u_${prop.id}_${i}`,
                propertyId: prop.id,
                name: prop.units === 1 ? 'Single Family' : `Unit ${i}`,
                status: 'Vacant',
                beds: 1,
                baths: 1,
                rent: 0
            });
        }
    }
});

// Map tenants to their units if not already mapped
localState.tenants.forEach(tenant => {
    if (tenant.propertyId && (!tenant.leaseId || !tenant.unitId)) {
        const propUnits = localState.units.filter(u => u.propertyId === tenant.propertyId);
        let targetUnit = propUnits.find(u => u.name === tenant.unit || u.name === `Unit ${tenant.unit}`) || propUnits[0];
        if (targetUnit) {
            targetUnit.status = 'Occupied';
            const leaseId = `l_${tenant.id}`;
            localState.leases.push({
                id: leaseId,
                unitId: targetUnit.id,
                propertyId: tenant.propertyId,
                startDate: '2024-01-01',
                endDate: '2025-01-01',
                rentAmount: targetUnit.rent || 2000,
                status: 'Active'
            });
            tenant.leaseId = leaseId;
            tenant.unitId = targetUnit.id;
        }
    }
});

// Determine if we have a valid database connection
const hasDb = db !== undefined;

export const Store = {
    getProperties: () => hasDb && cloudState.properties.length > 0 ? cloudState.properties : localState.properties,
    getUnits: () => hasDb && cloudState.units.length > 0 ? cloudState.units : localState.units,
    getLeases: () => hasDb && cloudState.leases.length > 0 ? cloudState.leases : localState.leases,
    getTenants: () => hasDb ? cloudState.tenants : localState.tenants,
    getTransactions: () => hasDb && cloudState.transactions.length > 0 ? cloudState.transactions : localState.transactions,
    getMaintenance: () => localState.maintenance,
    getDocuments: () => localState.documents,
    
    getDashboardStats: () => {
        const props = Store.getProperties();
        const tenants = Store.getTenants();
        const txs = Store.getTransactions();

        const totalProperties = props.length;
        const allUnits = Store.getUnits();
        const totalUnits = allUnits.length;
        const occupiedUnits = allUnits.filter(u => u.status === 'Occupied').length;
        const occupancyRate = totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
        
        const monthlyIncome = txs
            .filter(t => t.amount > 0 && t.date.startsWith('2026-06'))
            .reduce((sum, t) => sum + t.amount, 0);
            
        const monthlyExpenses = txs
            .filter(t => t.amount < 0 && t.date.startsWith('2026-06'))
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        return {
            totalProperties,
            occupancyRate,
            monthlyIncome,
            monthlyExpenses
        };
    },

    addProperty: async (property) => {
        const id = 'p' + Date.now();
        const newProp = { id, ...property };
        
        if (hasDb && db) {
            try {
                const { doc, setDoc } = window.firebaseFirestore;
                await setDoc(doc(db, 'properties', id), newProp);
            } catch (e) {
                console.error("Error adding to Firestore", e);
            }
        } else {
            localState.properties.push(newProp);
            document.dispatchEvent(new CustomEvent('stateChanged'));
        }
    },
    
    updateProperty: async (id, updates) => {
        if (hasDb && db) {
            try {
                const { doc, updateDoc } = window.firebaseFirestore;
                await updateDoc(doc(db, 'properties', id), updates);
            } catch (e) {
                console.error("Error updating Firestore", e);
            }
        } else {
            const index = localState.properties.findIndex(p => p.id === id);
            if (index !== -1) {
                localState.properties[index] = { ...localState.properties[index], ...updates };
                document.dispatchEvent(new CustomEvent('stateChanged'));
            }
        }
    },
    
    addTenant: async (tenant) => {
        const id = 't' + Date.now();
        const newTenant = { id, ...tenant };
        
        if (hasDb && db) {
            try {
                const { doc, setDoc } = window.firebaseFirestore;
                await setDoc(doc(db, 'tenants', id), newTenant);
            } catch (e) {
                console.error("Error adding to Firestore", e);
            }
        } else {
            localState.tenants.push(newTenant);
            document.dispatchEvent(new CustomEvent('stateChanged'));
        }
    },
    
    addTransaction: async (tx) => {
        const id = 'tx' + Date.now();
        const newTx = { id, ...tx };
        
        if (hasDb && db) {
            try {
                const { doc, setDoc } = window.firebaseFirestore;
                await setDoc(doc(db, 'transactions', id), newTx);
            } catch (e) {
                console.error("Error adding to Firestore", e);
            }
        } else {
            localState.transactions.push(newTx);
            document.dispatchEvent(new CustomEvent('stateChanged'));
        }
    },

    // Users
    getUsers: () => {
        return hasDb ? cloudState.users : [];
    },

    updateUserStatus: async (uid, newRole) => {
        if (!hasDb) return;
        try {
            const { doc, updateDoc } = window.firebaseFirestore;
            await updateDoc(doc(db, 'users', uid), {
                role: newRole
            });
        } catch (e) {
            console.error("Error updating user status:", e);
        }
    },

    initRealtimeListeners: () => {
        if (!hasDb) return;

        console.log("Initializing Firestore listeners...");
        // Listen to properties collection
        onSnapshot(collection(db, "properties"), (snapshot) => {
            cloudState.properties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            document.dispatchEvent(new Event('stateChanged'));
        });

        // Listen to transactions collection
        onSnapshot(collection(db, "transactions"), (snapshot) => {
            cloudState.transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            document.dispatchEvent(new Event('stateChanged'));
        });

        // Listen to users collection
        onSnapshot(collection(db, "users"), (snapshot) => {
            cloudState.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            document.dispatchEvent(new Event('stateChanged'));
        });
    }
};
