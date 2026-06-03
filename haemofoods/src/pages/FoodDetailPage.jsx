// food detail page — shows full safety score, nutrients and category tags
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../services/openFoodFacts'
import { getUSDAProduct } from '../services/usdaFoodData'
import { getCuratedProduct } from '../services/curatedSearch'
import { getIronRating, getCategoryRating } from '../utils/scoring'
import { formatIron, formatVitaminC, formatAlcohol } from '../utils/formatting'
import { SYSTEM_PROMPT } from '../constants/haemoBotPrompt'

export default function FoodDetailPage() {
  const { code } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //stores HaemoBot's clinical interpretation once it arrives
  const [botReply, setBotReply] = useState(null)
  //true while waiting for HaemoBot's response
  const [botLoading, setBotLoading] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        let data

        if (code.startsWith('cur_')) {
          // curated product — instant local lookup, no API call
          data = getCuratedProduct(code)
        } else if (code.startsWith('usda_')) {
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

  // curated foods carry their own clinically accurate rating
  // API foods need rating calculated from iron data or category fallback
  let rating
  if (product.rating) {
    rating = product.rating
  } else {
    rating = iron != null
      ? getIronRating(iron)
      : getCategoryRating(product.categories_tags || [])
  }

  // rating display config
  const ratingConfig = {
    safe: { label: '🟢 Safe', bg: 'bg-green-100 text-green-800', message: 'Low iron content — safe to eat' },
    moderate: { label: '🟡 Moderate', bg: 'bg-yellow-100 text-yellow-800', message: 'Moderate iron content — limit intake' },
    avoid: { label: '🔴 Avoid', bg: 'bg-red-100 text-red-800', message: 'High iron content — best avoided' },
    unknown: { label: '❓ Unknown', bg: 'bg-stone-100 text-stone-500', message: 'Not enough data to determine safety' },
  }

  const { label, bg } = ratingConfig[rating]

  // curated foods have a detailed clinical reason — use it instead of the generic message
  const message = product.reason || ratingConfig[rating].message

  // source tag config
  const sourceConfig = {
    curated: { label: 'HaemoEat', style: 'bg-red-50 text-red-600' },
    usda: { label: 'USDA', style: 'bg-blue-50 text-blue-600' },
    off: { label: 'Open Food Facts', style: 'bg-emerald-50 text-emerald-600' },
  }
  const source = sourceConfig[product.source] || sourceConfig.off

  async function askHaemoBot() {
    setBotLoading(true)
    setBotReply(null)

    const prompt = `The user is viewing "${product.product_name}" which has ${iron != null ? iron + 'mg' : 'unknown'} iron per 100g and is rated ${rating}. In 2-3 sentences, give a clinical interpretation for a haemochromatosis patient. Is this heme or non-heme iron? Are there any absorption factors (vitamin C, phytates, oxalates, alcohol) relevant to this food?`

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: '~anthropic/claude-haiku-latest',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
        }),
      })

      const data = await response.json()
      setBotReply(data.choices[0].message.content)
    } catch (err) {
      setBotReply('Sorry, I couldn\'t connect to HaemoBot. Try again in a moment')
    } finally {
      setBotLoading(false)
    }
  }


  return (
    <div>
      {/* back link */}
      <Link to="/search" className="text-sm text-red-700 hover:underline">
        ← Back to search
      </Link>

      {/* product header */}
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-stone-900">
          {product.product_name || 'Unknown product'}
        </h1>
        <p className="text-stone-400">{product.brands || product.category || ''}</p>
        <span className={`text-xs px-1.5 py-0.5 rounded mt-2 inline-block ${source.style}`}>
          {source.label}
        </span>
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

      {/* data source disclaimer - only shown for HaemoFood curated results */}
      {product.source === 'curated' && (
        <div className='bg-blue-50 rounded-lg p-4 mb-3 text-xs text-blue-700'>
          <p className='font-semibold mb-1'>About this data</p>
          <p>
            Nutritional values are estimates based on {product.dataSource === 'estimated'
              ? 'typical recipe calculations'
              : `${product.dataSource} data`
            } and may vary between brands, preparation methods and serving sizes.
            Ratings are based on clinical guidance from the Irish Haemochromatosis Association.
          </p>
        </div>
      )}

      {/* category tags — only shown for API products that have them */}
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

      {/* haemobot clinical interpretation */}
      <div className="p-0.5 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 mb-6 transition-all duration-200 hover:scale-[1.001] hover:shadow-lg hover:shadow-pink-500/20">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/images/HaemoBot_v1.png"
              alt="HaemoBot"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2 className="font-bold text-stone-900">Ask HaemoBot</h2>
          </div>

          {botReply && (
            <p className="text-sm text-stone-700 bg-stone-50 rounded-lg p-3 mb-3">
              {botReply}
            </p>
          )}

          {!botReply && (
            <button
              onClick={askHaemoBot}
              disabled={botLoading}
              className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${botLoading
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-pink-500 to-orange-400 text-white focus:ring-4 focus:outline-none focus:ring-pink-300 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/20 active:scale-[0.98]'
                }`}
            >
              {botLoading ? 'Asking HaemoBot...' : 'Detailed information on this product'}
            </button>
          )}
        </div>
      </div>

      {/* disclaimer */}
      <div className="bg-stone-100 rounded-lg p-4 text-xs text-stone-400">
        Always consult your dietitian — this tool is a guide, not medical advice.
      </div>

    </div>
  )
}