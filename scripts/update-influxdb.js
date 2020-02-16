const fs = require('fs')
const Influx = require('influx')

const requiredEnvVars = [
  'INFLUX_HOST',
  'INFLUX_DATABASE',
  'INFLUX_USERNAME',
  'INFLUX_PASSWORD',
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${requiredEnvVars.join(', ')} must be specified`)
  }
}

const jsonData = fs.readFileSync(0, 'utf-8')
const prices = JSON.parse(jsonData)

const influx = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST,
  database: process.env.INFLUX_DATABASE,
  username: process.env.INFLUX_USERNAME,
  password: process.env.INFLUX_PASSWORD,
  schema: [
    {
      measurement: 'prices',
      fields: {
        value: Influx.FieldType.FLOAT
      },
      tags: [
        'area'
      ]
    }
  ]
})

influx.getDatabaseNames().then((names) => {
  if (!names.includes(process.env.INFLUX_DATABASE)) {
    throw new Error(`The specified database "${process.env.INFLUX_DATABASE}" does not exist`)
  }

  for (const point of prices) {
    influx.writePoints([
      {
        measurement: 'prices',
        tags: { area: point.area },
        fields: { value: point.value },
        timestamp: point.date * 1000 * 1000 * 1000, // nanoseconds
      }
    ])
  }
})
