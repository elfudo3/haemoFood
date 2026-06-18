// displays a single food product as a clickable card
import { Link } from 'react-router-dom'
import { getIronRating, getCategoryRating } from '../../utils/scoring'

export default function FoodCard({ product }) {
  // curated foods already have a clinically accurate rating — use it directly
  // API foods need rating calculated from iron data or category fallback
  let rating
  if (product.rating) {
    rating = product.rating
  } else {
    const iron = product.nutriments?.iron_100g ?? null
    rating = iron != null
      ? getIronRating(iron)
      : getCategoryRating(product.categories_tags || [])
  }

  // map rating to badge colours
  const badgeStyles = {
    safe: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    moderate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    avoid: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    unknown: 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400',
  }

  // map rating to display labels
  const badgeLabels = {
    safe: '🟢 Safe',
    moderate: '🟡 Moderate',
    avoid: '🔴 Avoid',
    unknown: '❓ Unknown',
  }

  // source tag config
  const sourceConfig = {
    curated: { label: 'HaemoEat', style: 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300' },
    usda: { label: 'USDA', style: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300' },
    off: { label: 'Open Food Facts', style: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300' },
  }
  const source = sourceConfig[product.source] || sourceConfig.off

  return (
    <Link
      to={`/food/${product.code}`}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-stone-200 hover:border-red-300 transition-colors dark:bg-stone-900 dark:border-stone-800 dark:hover:border-red-700"
    >

      {/* product info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-900 truncate dark:text-stone-100">
          {product.product_name || 'Unknown product'}
        </p>
        <p className="text-sm text-stone-400 truncate dark:text-stone-500">
          {product.brands || product.category || ''}
        </p>
        <span className={`text-xs px-1.5 py-0.5 rounded mt-1 inline-block ${source.style}`}>
          {source.label}
        </span>
      </div>

      {/* safety badge */}
      <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${badgeStyles[rating]}`}>
        {badgeLabels[rating]}
      </span>
    </Link>
  )
}