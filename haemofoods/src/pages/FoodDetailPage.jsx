// food detail page — shows full safety score, nutrients and category tags
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../services/openFoodFacts'
import { getUSDAProduct } from '../services/usdaFoodData'
import { getIronRating, getCategoryRating } from '../utils/scoring'
import { formatIron, formatVitaminC, formatAlcohol } from '../utils/formatting'

export default function FoodDetailPage() {
  const { code } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        let data

        // check if this is a USDA product (codes start with "usda_")
        if (code.startsWith('usda_')) {
          // strip the "usda_" prefix to get the real FDC ID
          const fdcId = code.replace('usda_', '')
          data = await getUSDAProduct(fdcId)
        } else {
          // regular barcode — look it up on Open Food Facts
          data = await getProduct(code)
        }

        setProduct(data)
      } catch (err) {
        setError('Could not load product details. Try again in a moment.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [code])

  if (loading) return <p className="text-stone-400">Loading...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!product) return <p className="text-stone-400">Product not found.</p>

  // extract nutrient values
  const iron = product.nutriments?.iron_100g ?? null
  const vitaminC = product.nutriments?.['vitamin-c_100g'] ?? null
  const alcohol = product.nutriments?.alcohol_100g ?? null

  // determine safety rating — iron first, then category fallback
  const rating = iron != null
    ? getIronRating(iron)
    : getCategoryRating(product.categories_tags || [])

  // rating display config
  const ratingConfig = {
    safe: { label: '🟢 Safe', bg: 'bg-green-100 text-green-800', message: 'Low iron content — safe to eat' },
    moderate: { label: '🟡 Moderate', bg: 'bg-yellow-100 text-yellow-800', message: 'Moderate iron content — limit intake' },
    avoid: { label: '🔴 Avoid', bg: 'bg-red-100 text-red-800', message: 'High iron content — best avoided' },
    unknown: { label: '❓ Unknown', bg: 'bg-stone-100 text-stone-500', message: 'Not enough data to determine safety' },
  }

  const { label, bg, message } = ratingConfig[rating]

  return (
    <div>
      {/* back link */}
      <Link to="/search" className="text-sm text-red-700 hover:underline">
        ← Back to search
      </Link>

      {/* product header */}
      <div className="flex items-start gap-6 mt-4 mb-6">
        {product.image_url || product.image_small_url ? (
          <img
            src={product.image_url || product.image_small_url}
            alt={product.product_name}
            className="w-32 h-32 rounded-lg object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400">
            No image
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            {product.product_name || 'Unknown product'}
          </h1>
          <p className="text-stone-400">{product.brands || 'Unknown brand'}</p>
          {/* source tag so user knows where the data came from */}
          <span className={`text-xs px-1.5 py-0.5 rounded mt-2 inline-block ${
            product.source === 'usda'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-emerald-50 text-emerald-600'
          }`}>
            {product.source === 'usda' ? 'USDA' : 'Open Food Facts'}
          </span>
        </div>
      </div>

      {/* safety rating banner */}
      <div className={`rounded-lg p-4 mb-6 ${bg}`}>
        <p className="text-lg font-bold">{label}</p>
        <p className="text-sm mt-1">{message}</p>
      </div>

      {/* nutrient breakdown */}
      <div className="bg-white rounded-lg border border-stone-200 p-4 mb-6">
        <h2 className="font-bold text-stone-900 mb-3">Nutrient Breakdown</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-500">Iron</span>
            <span className="font-medium text-stone-800">{formatIron(iron)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Vitamin C</span>
            <span className="font-medium text-stone-800">{formatVitaminC(vitaminC)}</span>
          </div>
          {vitaminC != null && vitaminC > 0 && (
            <p className="text-xs text-yellow-700 bg-yellow-50 rounded p-2">
              ⚠️ Vitamin C increases iron absorption — be mindful when eating iron-rich foods alongside this product
            </p>
          )}
          <div className="flex justify-between">
            <span className="text-stone-500">Alcohol</span>
            <span className="font-medium text-stone-800">{formatAlcohol(alcohol)}</span>
          </div>
          {alcohol != null && alcohol > 0 && (
            <p className="text-xs text-yellow-700 bg-yellow-50 rounded p-2">
              ⚠️ Alcohol causes liver stress — particularly important for haemochromatosis patients
            </p>
          )}
        </div>
      </div>

      {/* category tags — only shown if available (OFF products have these, USDA don't) */}
      {product.categories_tags && product.categories_tags.length > 0 && (
        <div className="bg-white rounded-lg border border-stone-200 p-4 mb-6">
          <h2 className="font-bold text-stone-900 mb-3">Category Tags</h2>
          <div className="flex flex-wrap gap-2">
            {product.categories_tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full"
              >
                {tag.replace('en:', '')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* disclaimer */}
      <div className="bg-stone-100 rounded-lg p-4 text-xs text-stone-400">
        Always consult your dietitian — this tool is a guide, not medical advice.
      </div>
    </div>
  )
}