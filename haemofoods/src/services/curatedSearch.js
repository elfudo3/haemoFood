// search service for the curated foods database
// returns instant results with guaranteed iron data and correct ratings
import CURATED_FOODS from '../constants/curatedFoods'

// transforms a curated food entry into the standard product shape
// that our FoodCard, scoring, and detail page all expect
function toProduct(food) {
  return {
    code: food.id,
    product_name: food.name,
    brands: '',
    dataSource: food.source,
    source: 'curated',
    category: food.category,
    rating: food.rating,
    reason: food.reason,
    nutriments: {
      'iron_100g': food.iron,
      'vitamin-c_100g': food.vitaminC,
      'alcohol_100g': food.alcohol,
    },
    categories_tags: [],
  }
}

// searches the curated database by food name or category
// returns an array of products in the standard shape
export function searchCurated(query) {
  const searchTerm = query.toLowerCase().trim()

  if (!searchTerm) return []

  // match against food name and category
  const matches = CURATED_FOODS.filter(food =>
    food.name.toLowerCase().includes(searchTerm) ||
    food.category.toLowerCase().includes(searchTerm)
  )

  return matches.map(toProduct)
}

// fetches a single curated product by its ID (e.g. "cur_001")
export function getCuratedProduct(id) {
  const food = CURATED_FOODS.find(f => f.id === id)
  return food ? toProduct(food) : null
}