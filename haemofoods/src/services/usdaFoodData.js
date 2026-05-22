const BASE_URL = import.meta.env.DEV ? '/usda-api' : 'https://api.nal.usda.gov/fdc/v1'
const API_KEY = import.meta.env.VITE_USDA_API_KEY

//simple in-memory cache to avoid repeat API calls
const cache = new Map()

// helper — pulls a nutrient value out of the search results nutrient array
// each nutrient has a nutrientId number, we use that to find the right one
function findNutrient(foodNutrients, nutrientId) {
    const nutrient = foodNutrients.find(n => n.nutrientId === nutrientId)
    return nutrient ? nutrient.value : undefined
  }

// helper — same thing but for the detail endpoint, which has a different shape
// detail uses { nutrient: { id: 1089 }, amount: 0.37 } instead of { nutrientId: 1089, value: 0.37 }
function findNutrientDetail(foodNutrients, nutrientId) {
    const nutrient = foodNutrients.find(n => n.nutrient && n.nutrient.id === nutrientId)
    return nutrient ? nutrient.amount : undefined
  }

//transforms a raw USDA food object into the same shape our app uses everywhere
function transformFood(food, nutrientExtractor) {
    const nutrients = food.foodNutrients || []

    return {
        code: `usda_${food.fdcId}`,
        product_name: food.description || 'Unknown product',
        brands: food.brandOwner || '',
        image_small_url: null,                    // usda doesn't provide images
        source: 'usda',
        nutriments: {
            'iron_100g': nutrientExtractor(nutrients, 1089),       // iron
            'vitamin-c_100g': nutrientExtractor(nutrients, 1162),  // vitamin c
            'alcohol_100g': nutrientExtractor(nutrients, 1018),    // alcohol
        },
        categories_tags: [],                      // usda doesn't use category tags like OFF
    }
}

export async function searchUSDA(query) {
    //check cache first
    const cacheKey = `usda-search:${query}`
    if (cache.has(cacheKey)) return cache.get(cacheKey)

    try{
        const url = `${BASE_URL}/foods/search?api_key=${API_KEY}&query=${query}&pageSize=20&dataType=Foundation,SR%20Legacy`

        const response = await fetch(url)
        if (!response.ok) return []

        const data = await response.json()
        const foods = data.foods || []

        const products = foods.map(food => transformFood(food, findNutrient))

        //store in cache for next time
        cache.set(cacheKey, products)
        return products
    } catch (error) {
        return null
    }
}

export async function getUSDAProduct(fdcId) {
    const cacheKey = `usda-detail:${fdcId}`
    if (cache.has(cacheKey)) return cache.get(cacheKey)
  
    try {
      const url = `${BASE_URL}/food/${fdcId}?api_key=${API_KEY}`
  
      const response = await fetch(url)
      if (!response.ok) return null
  
      const food = await response.json()
  
      // detail endpoint uses different nutrient shape, so we use findNutrientDetail
      const product = transformFood(food, findNutrientDetail)
  
      cache.set(cacheKey, product)
      return product
    } catch (error) {
      return []
    }
  }
