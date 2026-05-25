// search page — searches the curated foods database with rating filter
import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import FoodCard from '../components/food/FoodCard'
import { searchCurated } from '../services/curatedSearch'

// filter button config — label, value, colours
const FILTERS = [
  { label: 'All', value: 'all', style: 'bg-stone-100 text-stone-700 border-stone-300' },
  { label: '🟢 Safe', value: 'safe', style: 'bg-green-100 text-green-800 border-green-300' },
  { label: '🟡 Moderate', value: 'moderate', style: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { label: '🔴 Avoid', value: 'avoid', style: 'bg-red-100 text-red-800 border-red-300' },
]

export default function SearchPage() {
  // search query typed by the user
  const [query, setQuery] = useState('')
  // all results from the curated search (unfiltered)
  const [results, setResults] = useState([])
  // which rating filter is active
  const [activeFilter, setActiveFilter] = useState('all')
  // tracks whether the user has searched at least once
  const [hasSearched, setHasSearched] = useState(false)

  function handleSearch() {
    // don't search for empty or very short queries
    if (query.trim().length < 2) return

    const found = searchCurated(query.trim())
    setResults(found)
    setHasSearched(true)
    // reset filter on each new search
    setActiveFilter('all')
  }

  // apply the active filter to the results
  // if filter is 'all', show everything
  const filtered = activeFilter === 'all'
    ? results
    : results.filter(p => p.rating === activeFilter)

  const hasResults = filtered.length > 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Search foods</h1>

      {/* search input */}
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      {/* filter buttons — only show after a search */}
      {hasSearched && results.length > 0 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {FILTERS.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-opacity ${filter.style} ${
                activeFilter === filter.value ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* results count */}
      {hasSearched && results.length > 0 && (
        <p className="text-xs text-stone-400 mt-3">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' ? ` — ${activeFilter} only` : ''}
        </p>
      )}

      {/* results list */}
      {hasResults && (
        <div className="flex flex-col gap-3 mt-3">
          {filtered.map(product => (
            <FoodCard key={product.code} product={product} />
          ))}
        </div>
      )}

      {/* no results after filtering */}
      {hasSearched && results.length > 0 && filtered.length === 0 && (
        <p className="text-stone-400 text-sm mt-6">
          No {activeFilter} foods found for "{query}". Try a different filter.
        </p>
      )}

      {/* no results at all */}
      {hasSearched && results.length === 0 && (
        <p className="text-stone-400 text-sm mt-6">
          No foods found for "{query}". Try searching a different term.
        </p>
      )}
    </div>
  )
}