// combined search — queries both APIs and returns grouped results
import { searchProducts } from './openFoodFacts'
import { searchUSDA } from './usdaFoodData'

// returns true if a product has enough data to be useful
// we filter out products that have no iron data AND no category tags
// because we can't rate them — they'd just show "Unknown" which isn't helpful
function hasUsableData(product) {
  const iron = product.nutriments?.iron_100g
  const categories = product.categories_tags || []

  // keep it if it has real iron data (not zero from bad data)
  if (iron != null && iron > 0) return true

  // keep it if it has category tags we can use for fallback rating
  if (categories.length > 0) return true

  // otherwise it's useless — no iron, no categories, can't rate it
  return false
}

// searches both APIs at the same time, returns results grouped by source
// if one API fails, the other still works — the app never fully breaks
export async function searchAll(query) {
  // allSettled runs both in parallel and never throws
  // each result is { status: 'fulfilled', value } or { status: 'rejected', reason }
  const [offResult, usdaResult] = await Promise.allSettled([
    searchProducts(query),
    searchUSDA(query),
  ])

  // pull out OFF results, add source tag, filter out useless ones
  const off = offResult.status === 'fulfilled'
    ? offResult.value
        .map(product => ({ ...product, source: 'off' }))
        .filter(hasUsableData)
    : []

  // pull out USDA results, filter out useless ones
  // usda products already have source: 'usda' from the service
  const usda = usdaResult.status === 'fulfilled'
    ? usdaResult.value.filter(hasUsableData)
    : []

  // return as an object so the UI can display them in separate columns
  return { off, usda }
}