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
        className="flex-1 px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:ring-red-500"
      />
      <button
        onClick={onSearch}
        className="px-6 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-br text-white font-medium rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-900/20 active:scale-[0.98]"
      >
        Search
      </button>
    </div>
  )
}