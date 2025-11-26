import requests
import json
from datetime import datetime

def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

# ----------------------------
# 1) INFLATION (OCDE - DP_LIVE)
# ----------------------------

def get_oecd(series, countries):
    url = f"https://stats.oecd.org/SDMX-JSON/data/DP_LIVE/{series}.{countries}.A/all?contentType=application/json"
    r = requests.get(url).json()

    obs = r["dataSets"][0]["observations"]
    structure = r["structure"]["dimensions"]["observation"][0]["values"]
    dates = [v["id"] for v in structure]

    data = { "dates": dates }
    series_values = r["structure"]["dimensions"]["series"][0]["values"]

    for i, country in enumerate(countries.split("+")):
        data[country.lower()] = [obs.get(f"0:{i}:{t}", [None])[0] for t in range(len(dates))]

    return data

inflation = get_oecd("CPI", "FRA+EA19")
save_json("data/inflation.json", inflation)

unemployment = get_oecd("UNEMP", "FRA+EA19")
save_json("data/unemployment.json", unemployment)


# ----------------------------
# 2) GDP (OCDE)
# ----------------------------

gdp = get_oecd("B1_GE", "FRA+EA19")
save_json("data/gdp.json", gdp)

# ----------------------------
# 3) INDUSTRIAL PRODUCTION (OCDE)
# ----------------------------

ipi = get_oecd("PROD", "FRA")
save_json("data/ipi.json", ipi)

# ----------------------------
# 4) CURRENT ACCOUNT (OCDE)
# ----------------------------

ca = get_oecd("BCA", "FRA")
save_json("data/current_account.json", ca)


# ----------------------------
# 5) EUR/USD (BCE SDW)
# ----------------------------

def get_bce(series):
    url = f"https://sdw-wsrest.ecb.europa.eu/service/data/EXR/D.{series}.EUR.SP00.A"
    r = requests.get(url, headers={'Accept': 'application/vnd.sdmx.data+json;version=1.0.0'}).json()

    items = r['data']['series']['0:0:0:0:0']['observations']
    dates = []
    values = []

    for i, val in items.items():
        date = r['data']['structure']['dimensions']['observation'][0]['values'][int(i)]['id']
        dates.append(date)
        values.append(val[0])

    return { "dates": dates, "values": values }

eurusd = get_bce("USD")
save_json("data/eurusd.json", eurusd)


# ----------------------------
# 6) BOND YIELD (BCE SDW – 10Y France)
# ----------------------------

bond = get_bce("FRT")
save_json("data/bond_yield.json", bond)

# ----------------------------
# 7) ECB MAIN REFINANCING RATE
# ----------------------------

def get_ecb_rate():
    url = "https://sdw-wsrest.ecb.europa.eu/service/data/FM/M.R.FR.L02A.U2.EUR.R.A"
    r = requests.get(url, headers={'Accept': 'application/vnd.sdmx.data+json;version=1.0.0'}).json()

    obs = r['data']['series']['0:0:0:0:0']['observations']
    dates = []
    values = []

    for i, val in obs.items():
        date = r['data']['structure']['dimensions']['observation'][0]['values'][int(i)]['id']
        dates.append(date)
        values.append(val[0])

    return { "dates": dates, "values": values }

ecb = get_ecb_rate()
save_json("data/ecb_rates.json", ecb)

print("Data updated at", datetime.now())
