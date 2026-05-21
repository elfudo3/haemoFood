// search input with a submit button — triggers search on click or Enter key
export default function SearchBar({ value, onChange, onSearch, placeholder }) {
    // handle Enter key press
    function handleKeyDown(e) {
      if (e.key === 'Enter') {
        onSearch()
      }
    }
  
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Search for a food...'}
          className="flex-1 px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
        />
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition-colors"
        >
          Search
        </button>
      </div>
    )
  }