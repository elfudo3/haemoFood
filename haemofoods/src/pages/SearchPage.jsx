// search page — user types a query and clicks search to find food products
import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import FoodCard from '../components/food/FoodCard'
import { searchProducts } from '../services/openFoodFacts'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch() {
    // don't search for empty or very short queries
    if (query.trim().length < 2) return

    setLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      const products = await searchProducts(query.trim())
      setResults(products)
    } catch (err) {
      setError('The food database is busy — this is a free service and can be slow. Please wait a moment and try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Search foods</h1>

      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      {/* loading state */}
      {loading && (
        <p className="text-stone-400 text-sm mt-6">Searching...</p>
      )}

      {/* error state */}
      {error && (
        <p className="text-red-600 text-sm mt-6">{error}</p>
      )}

      {/* results list */}
      {!loading && !error && results.length > 0 && (
        <div className="flex flex-col gap-3 mt-6">
          {results.map((product) => (
            <FoodCard key={product.code} product={product} />
          ))}
        </div>
      )}

      {/* no results state */}
      {!loading && !error && hasSearched && results.length === 0 && (
        <p className="text-stone-400 text-sm mt-6">
          No products found. Try searching for a different food or brand.
        </p>
      )}
    </div>
  )
}