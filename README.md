# nordpool-influxdb

A collection of scripts for storing Nordpool price data in InfluxDB

This repository contains a collection of scripts for storing Nordpool price data in InfluxDB:

* one that fetches price data from Nordpool and outputs it as JSON
* one that reads JSON and stores it in InfluxDB

## Usage

### nordpool-json.js

```bash
AREA=FI CURRENCY=EUR node scripts/fetch-prices-json.js > nordpool.json
```

The JSON is an array of objects like this:

```json
{
  "area": "FI",
  "date": 1581890400000,
  "value": 8.39
}
```
