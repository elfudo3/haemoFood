
import { searchProducts } from './services/openFoodFacts.js'

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function test() {
  const queries = ['milk', 'liver', 'beer']

  for (const q of queries) {
    console.log(`\n--- ${q} ---`)
    try {
      const results = await searchProducts(q, 1)
      if (results[0]) {
        console.log(results[0].product_name, '|', results[0].categories_tags)
      } else {
        console.log('no results')
      }
    } catch (err) {
      console.log('error:', err.message)
    }
    await wait(3000)
  }
}

test()