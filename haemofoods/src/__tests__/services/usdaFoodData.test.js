import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchUSDA, getUSDAProduct } from '../../services/usdaFoodData'

// mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

beforeEach(() => {
  mockFetch.mockClear()
})

describe('searchUSDA', () => {
  it('returns an array of products from USDA search', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        foods: [
          {
            fdcId: 171705,
            description: 'Chicken breast, raw',
            brandOwner: null,
            foodNutrients: [
              { nutrientId: 1089, nutrientName: 'Iron, Fe', value: 0.37, unitName: 'MG' },
              { nutrientId: 1162, nutrientName: 'Vitamin C, total ascorbic acid', value: 0, unitName: 'MG' },
            ],
          },
        ],
      }),
    })

    const results = await searchUSDA('chicken breast')

    expect(results).toHaveLength(1)
    expect(results[0]).toEqual({
      code: 'usda_171705',
      product_name: 'Chicken breast, raw',
      brands: '',
      image_small_url: null,
      source: 'usda',
      nutriments: {
        'iron_100g': 0.37,
        'vitamin-c_100g': 0,
        'alcohol_100g': undefined,
      },
      categories_tags: [],
    })
  })

  it('returns an empty array when no results found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ foods: [] }),
    })

    const results = await searchUSDA('xyznonexistent')
    expect(results).toEqual([])
  })

  it('returns an empty array when the API errors', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 })

    const results = await searchUSDA('chicken')
    expect(results).toEqual([])
  })
})

describe('getUSDAProduct', () => {
  it('fetches a single product by FDC ID', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        fdcId: 171705,
        description: 'Chicken breast, raw',
        brandOwner: null,
        foodNutrients: [
          { nutrient: { id: 1089, name: 'Iron, Fe' }, amount: 0.37, unitName: 'MG' },
          { nutrient: { id: 1162, name: 'Vitamin C, total ascorbic acid' }, amount: 0, unitName: 'MG' },
          { nutrient: { id: 1018, name: 'Alcohol, ethyl' }, amount: 0, unitName: 'G' },
        ],
      }),
    })

    const product = await getUSDAProduct('171705')

    expect(product).toEqual({
      code: 'usda_171705',
      product_name: 'Chicken breast, raw',
      brands: '',
      image_small_url: null,
      source: 'usda',
      nutriments: {
        'iron_100g': 0.37,
        'vitamin-c_100g': 0,
        'alcohol_100g': 0,
      },
      categories_tags: [],
    })
  })

  it('returns null when the API errors', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 })

    const product = await getUSDAProduct('999999999')
    expect(product).toBeNull()
  })
})