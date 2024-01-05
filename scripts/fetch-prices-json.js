const nordpool = require('nordpool')

const requiredEnvVars = [
  'AREA',
  'CURRENCY',
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${requiredEnvVars.join(', ')} must be specified`)
  }
}

const prices = new nordpool.Prices()

;(async () => {
  const results = await prices.hourly({
    area: process.env.AREA,
    currency: process.env.CURRENCY,
  })

  const mappedResults = results.map((result) => {
    return {
      area: result.area,
      date: Date.parse(result.date) / 1000,
      value: result.value,
    }
  })

  console.log(JSON.stringify(mappedResults, null, 2))
})()
