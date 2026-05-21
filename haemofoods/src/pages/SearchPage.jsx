// search page — user types a query, sees matching food products
import { useState, useEffect } from 'react'
import SearchBar from '../components/ui/SearchBar'
import FoodCard from '../components/food/FoodCard'
import { useDebounce } from '../hooks/useDebounce'
import { searchProducts } from '../services/openFoodFacts'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // only search after the user stops typing for 400ms
  const debouncedQuery = useDebounce(query, 350)

  useEffect(() => {
    // don't search for empty or very short queries
    if (debouncedQuery.length < 2) {
      setResults([])
      return
    }

    // create an abort controller to cancel this request if a new one starts
    const controller = new AbortController()

    async function doSearch() {
      setLoading(true)
      setError(null)
      try {
        const products = await searchProducts(debouncedQuery, 1, controller.signal)
        setResults(products)
      } catch (err) {
        // ignore aborted requests — they're expected
        if (err.name === 'AbortError') return
        setError('Could not reach the food database. Try again in a moment.')
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    doSearch()

    // cleanup — abort this request if the query changes before it finishes
    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Search foods</h1>

      <SearchBar value={query} onChange={setQuery} />

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
      {!loading && !error && debouncedQuery.length >= 2 && results.length === 0 && (
        <p className="text-stone-400 text-sm mt-6">
          No products found. Try searching for a different food or brand.
        </p>
      )}
    </div>
  )
}