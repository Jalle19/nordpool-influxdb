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

new nordpool.Prices().hourly({
  area: process.env.AREA,
  currency: process.env.CURRENCY,
}, (error, results) => {
  if (error !== null) {
    throw new Error(`Failed to fetch Nordpool prices: ${error}`)
  }

  const mappedResults = results.map((result) => {
    return {
      area: result.area,
      date: result.date.unix(),
      value: result.value,
    }
  })

  console.log(JSON.stringify(mappedResults, null, 2))
})
