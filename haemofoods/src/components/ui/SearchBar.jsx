// search input field — calls onSearch when the user types
export default function SearchBar({ value, onChange, placeholder }) {
    return (
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Search for a food...'}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
        />
      </div>
    )
  }