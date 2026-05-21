// use the vite proxy in development, direct URL in production
const BASE_URL = import.meta.env.DEV ? '/api' : 'https://world.openfoodfacts.org'

// search for products by name, returns an array of matching products
export async function searchProducts(query, page = 1, signal) {
  // build the search URL with query params for JSON response, pagination and required fields
  const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=10&fields=code,product_name,brands,image_small_url,categories_tags,nutriments`

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  // return the products array, or empty array if none found
  return data.products || []
}

// fetch a single product by its barcode, returns the product object or null
export async function getProduct(barcode) {
  // use the v2 API endpoint with specific fields to keep the response small
  const url = `${BASE_URL}/api/v2/product/${barcode}.json?fields=code,product_name,brands,image_small_url,image_url,categories_tags,nutriments`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  return data.product || null
}