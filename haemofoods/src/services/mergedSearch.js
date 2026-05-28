import { searchCurated } from './curatedSearch'
import { searchUSDA } from './usdaFoodData'
import { getRelevanceScore } from '../utils/relevance'

export async function searchAll(query) {
  //bail out early if the query is empty or just whitespace
  if (!query || !query.trim()) return []

  const trimmedQuery = query.trim()

  //search curated foods locally — instant, never fails
  const curatedResults = searchCurated(trimmedQuery)

  //search USDA — async, might fail if API is down
  //wrapping in try/catch so a USDA failure doesn't kill the whole search
  let usdaResults = []
  try {
    usdaResults = await searchUSDA(trimmedQuery)
  } catch (err) {
    //USDA is down — that's fine, we still have curated results
    console.warn('USDA search failed:', err.message)
  }

  //deduplicate — if a food name exists in both sources, keep curated only
  //curated data has clinical ratings so it's always preferred
  const curatedNames = new Set(
    curatedResults.map(product => product.product_name.toLowerCase())
  )

  //filter out any USDA result whose name already exists in curated
  const uniqueUSDA = usdaResults.filter(
    product => !curatedNames.has(product.product_name.toLowerCase())
  )

  //combine both arrays into one
  const allResults = [...curatedResults, ...uniqueUSDA]

  //score every result against the query using our relevance function
  //attach the score as a property so the UI could use it later if needed
  const scored = allResults.map(product => ({
    ...product,
    relevanceScore: getRelevanceScore(trimmedQuery, product.product_name),
  }))

  //sort by relevance score — highest first
  //if two results have the same score, their original order is preserved
  scored.sort((a, b) => b.relevanceScore - a.relevanceScore)

  return scored
}