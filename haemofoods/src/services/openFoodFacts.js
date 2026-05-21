// use the vite proxy in development, direct URL in production
const BASE_URL = import.meta.env.DEV ? '/api' : 'https://world.openfoodfacts.org'

// simple in-memory cache to avoid repeat API calls
const cache = new Map()

// helper — fetch with automatic retry on 503/429 errors
async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options)
      if (response.ok) return response
      if ((response.status === 503 || response.status === 429) && i < retries) {
        await new Promise(r => setTimeout(r, 2000 * (i + 1)))
        continue
      }
      throw new Error(`API error: ${response.status}`)
    } catch (err) {
      if (err.name === 'AbortError') throw err
      if (i < retries) {
        await new Promise(r => setTimeout(r, 2000 * (i + 1)))
        continue
      }
      throw err
    }
  }
}

// search for products by name, returns an array of matching products
export async function searchProducts(query, page = 1, signal) {
  // check cache first
  const cacheKey = `search:${query}:${page}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)

  const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=20&fields=code,product_name,brands,image_small_url,categories_tags,nutriments&sort_by=unique_scans_n`

  const response = await fetchWithRetry(url, { signal })
  const data = await response.json()
  const products = data.products || []

  // store in cache for next time
  cache.set(cacheKey, products)
  return products
}

// fetch a single product by its barcode, returns the product object or null
export async function getProduct(barcode) {
  // check cache first
  const cacheKey = `product:${barcode}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)

  const url = `${BASE_URL}/api/v2/product/${barcode}.json?fields=code,product_name,brands,image_small_url,image_url,categories_tags,nutriments`

  const response = await fetchWithRetry(url)
  const data = await response.json()
  const product = data.product || null

  // store in cache for next time
  cache.set(cacheKey, product)
  return product
}