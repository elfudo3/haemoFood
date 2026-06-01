// search page — searches the curated foods database with rating filter
import { useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import FoodCard from '../components/food/FoodCard'
import { searchAll } from '../services/mergedSearch'
import { getIronRating, getCategoryRating } from '../utils/scoring'

// filter button config — label, value, colours
const FILTERS = [
  { label: 'All', value: 'all', style: 'bg-stone-100 text-stone-700 border-stone-300' },
  { label: '🟢 Safe', value: 'safe', style: 'bg-green-100 text-green-800 border-green-300' },
  { label: '🟡 Moderate', value: 'moderate', style: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { label: '🔴 Avoid', value: 'avoid', style: 'bg-red-100 text-red-800 border-red-300' },
]

const SOURCE_FILTERS = [
  { label: 'All Sources', value: 'all', style: 'bg-stone-100 text-stone-700 border-stone-300' },
  { label: 'HaemoFood', value: 'curated', style: 'bg-red-50 text-red-600 border-red-300' },
  { label: 'USDA', value: 'usda', style: 'bg-blue-50 text-blue-600 border-blue-300' },
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
  //true while waiting for USDA API response
  const [loading, setLoading] = useState(false)
  //which source filter is active (all, curated, usda)
  const [activeSource, setActiveSource] = useState('all')
  //whether banner is whowing or not
  const [showBanner, setShowBanner] = useState(true)

  async function handleSearch() {
    //don't search for empty or very short queries
    if (query.trim().length < 2) return

    //show loading state before the async call starts
    setLoading(true)
    setHasSearched(true)
    //reset filter on each new search
    setActiveFilter('all')
    //reset source filter too
    setActiveSource('all')

    //searchAll is async because it calls the USDA API
    const found = await searchAll(query.trim())
    setResults(found)

    //hide loading state once results are in
    setLoading(false)
  }

  //apply both filters: rating AND source
  //first filter by source, then by rating
  const filtered = results.filter(p => {
    //source filter — skip if 'all' is selected
    if (activeSource !== 'all' && p.source !== activeSource) return false

    //rating filter — skip if 'all' is selected
    if (activeFilter !== 'all') {
      //curated foods carry their own rating, API foods need it calculated
      const rating = p.rating
        || getIronRating(p.nutriments?.iron_100g ?? null)
      if (rating !== activeFilter) return false
    }

    return true
  })

  const hasResults = filtered.length > 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Search foods</h1>

      {showBanner && (
        <div className='flex justify-between items-start bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm text-stone-600 mb-4'>
          <div>
            {/*Bold intro line*/}
            <p className='font-medium text-stone-700 mb-1 text-sm'>
              Search by food name to check its iron safety rating.
            </p>
          
            <p className='text-sm text-stone-600'>
              Results are rated 🟢 Safe, 🟡 Moderate, or 🔴 Avoid based on Irish Haemochromatosis
              Association guidelines. We search our curated food database and the USDA database for each query.
            </p>
        </div>
        {/* dismiss button - ml-3 adds gap between text and button */}
        <button
          onClick={() => setShowBanner(false)}
          className='ml-3 text-stone-400 hover:text-stone-600'
          >x
          </button>
          </div>
      )}


      {/* search input */}
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      {/* filter buttons — only show after a search */}
      {hasSearched && results.length > 0 && (
        <>
          <div className="flex gap-2 mt-4 flex-wrap">
            {FILTERS.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-opacity ${filter.style} ${activeFilter === filter.value ? 'opacity-100' : 'opacity-50'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {SOURCE_FILTERS.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveSource(filter.value)}
                className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-opacity ${filter.style} ${activeSource === filter.value ? 'opacity-100' : 'opacity-50'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </>
      )}



      {loading && (
        <p className="text-stone-400 text-sm mt-6">Searching...</p>
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
      {!loading && hasSearched && results.length > 0 && filtered.length === 0 && (
        <p className="text-stone-400 text-sm mt-6">
          No {activeFilter} foods found for "{query}". Try a different filter.
        </p>
      )}

      {/* no results at all */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-stone-400 text-sm mt-6">
          No foods found for "{query}". Try searching a different term.
        </p>
      )}
    </div>
  )
}