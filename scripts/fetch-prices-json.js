const requiredEnvVars = [
  'AREA',
  'CURRENCY',
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${requiredEnvVars.join(', ')} must be specified`)
  }
}

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const day = now.getDate()
const currentDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

const dayAheadPricesUrl = `https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices?date=${currentDate}&market=DayAhead&deliveryArea=${process.env.AREA}&currency=${process.env.CURRENCY}`

void (async () => {
  const response = await fetch(dayAheadPricesUrl)
  const results = await response.json()

  const mappedResults = results['multiAreaEntries'].map(entry => {
    return {
      area: process.env.AREA,
      date: Date.parse(entry['deliveryStart']) / 1000,
      value: entry['entryPerArea'][process.env.AREA],
    }
  })

  console.log(JSON.stringify(mappedResults, null, 2))
})()
