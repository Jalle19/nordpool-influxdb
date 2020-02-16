# nordpool-influxdb

A collection of scripts for storing Nordpool price data in InfluxDB

This repository contains a collection of scripts for storing Nordpool price data in InfluxDB:

* one that fetches price data from Nordpool and outputs it as JSON
* one that reads JSON and stores it in InfluxDB

## Usage

### fetch-prices-json.js

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

### update-influxdb.js

```
INFLUX_HOST=10.110.1.6 INFLUX_DATABASE=nordpool INFLUX_USERNAME=nordpool INFLUX_PASSWORD=nordpool node scripts/update-influxdb.js < nordpool.json
```

You can combine both scripts like this:

```bash
AREA=FI CURRENCY=EUR node scripts/fetch-prices-json.js | INFLUX_HOST=10.110.1.6 INFLUX_DATABASE=nordpool INFLUX_USERNAME=nordpool INFLUX_PASSWORD=nordpool node scripts/update-influxdb.js
```

This can be useful when running from cron.

## License

GNU GENERAL PUBLIC LICENSE Version 3
