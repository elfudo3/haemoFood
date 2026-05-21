// displays a single food product as a clickable card
import { Link } from 'react-router-dom'
import { getIronRating, getCategoryRating } from '../../utils/scoring'

export default function FoodCard({ product }) {
  // extract iron from nutriments, falling back to null
  const iron = product.nutriments?.iron_100g ?? null

  // use iron rating first, fall back to category rating
  const rating = iron != null
    ? getIronRating(iron)
    : getCategoryRating(product.categories_tags || [])

  // map rating to badge colours
  const badgeStyles = {
    safe: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    avoid: 'bg-red-100 text-red-800',
    unknown: 'bg-stone-100 text-stone-500',
  }

  // map rating to display labels
  const badgeLabels = {
    safe: '🟢 Safe',
    moderate: '🟡 Moderate',
    avoid: '🔴 Avoid',
    unknown: '❓ Unknown',
  }

  return (
    <Link
      to={`/food/${product.code}`}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-stone-200 hover:border-red-300 transition-colors"
    >
      {/* product image or placeholder */}
      {product.image_small_url ? (
        <img
          src={product.image_small_url}
          alt={product.product_name}
          className="w-16 h-16 rounded object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded bg-stone-100 flex items-center justify-center text-stone-400 text-xs">
          No img
        </div>
      )}

      {/* product info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-900 truncate">
          {product.product_name || 'Unknown product'}
        </p>
        <p className="text-sm text-stone-400 truncate">
          {product.brands || 'Unknown brand'}
        </p>
      </div>

      {/* safety badge */}
      <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${badgeStyles[rating]}`}>
        {badgeLabels[rating]}
      </span>
    </Link>
  )
}