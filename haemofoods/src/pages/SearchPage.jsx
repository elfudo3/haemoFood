// search page — queries both databases and displays results in two columns
import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import FoodCard from '../components/food/FoodCard'
import { searchAll } from '../services/combinedSearch'

export default function SearchPage() {
  // search query typed by the user
  const [query, setQuery] = useState('')
  // results grouped by source: { off: [...], usda: [...] }
  const [results, setResults] = useState({ off: [], usda: [] })
  // loading state while waiting for API responses
  const [loading, setLoading] = useState(false)
  // error message if something goes wrong
  const [error, setError] = useState(null)
  // tracks whether the user has searched at least once (for "no results" message)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch() {
    // don't search for empty or very short queries
    if (query.trim().length < 2) return

    setLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      // searchAll queries both APIs in parallel and returns grouped results
      const grouped = await searchAll(query.trim())
      setResults(grouped)
    } catch (err) {
      setError('Something went wrong — please try again.')
      setResults({ off: [], usda: [] })
    } finally {
      setLoading(false)
    }
  }

  // check if either column has results
  const hasResults = results.off.length > 0 || results.usda.length > 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Search foods</h1>

      {/* search input and button */}
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      {/* loading spinner */}
      {loading && (
        <p className="text-stone-400 text-sm mt-6">Searching...</p>
      )}

      {/* error message */}
      {error && (
        <p className="text-red-600 text-sm mt-6">{error}</p>
      )}

      {/* results — two columns on desktop, stacked on mobile */}
      {!loading && !error && hasResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* left column — Open Food Facts (packaged/branded products) */}
          <div>
            <h2 className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-t-lg">
              🛒 Open Food Facts — packaged products
            </h2>
            <div className="flex flex-col gap-3 mt-3">
              {results.off.length > 0 ? (
                results.off.map((product) => (
                  <FoodCard key={product.code} product={product} />
                ))
              ) : (
                <p className="text-stone-400 text-sm">No packaged products found.</p>
              )}
            </div>
          </div>

          {/* right column — USDA (generic/unbranded foods) */}
          <div>
            <h2 className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-t-lg">
              🔬 USDA — generic foods
            </h2>
            <div className="flex flex-col gap-3 mt-3">
              {results.usda.length > 0 ? (
                results.usda.map((product) => (
                  <FoodCard key={product.code} product={product} />
                ))
              ) : (
                <p className="text-stone-400 text-sm">No generic foods found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* no results from either database */}
      {!loading && !error && hasSearched && !hasResults && (
        <p className="text-stone-400 text-sm mt-6">
          No products found. Try searching for a different food or brand.
        </p>
      )}
    </div>
  )
}