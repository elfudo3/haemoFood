import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchProducts, getProduct } from '../../services/openFoodFacts'

beforeEach(() => {
  global.fetch = vi.fn()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('searchProducts', () => {
  it('returns an array of products from the API', async () => {
    const fakeProducts = [
      { code: '123', product_name: 'Test Milk', brands: 'TestBrand' },
      { code: '456', product_name: 'Test Beef', brands: 'MeatCo' },
    ]

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ products: fakeProducts }),
    })

    const results = await searchProducts('milk')

    expect(results).toEqual(fakeProducts)
    expect(results).toHaveLength(2)
  })

  it('returns an empty array when no products found', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ products: [] }),
    })

    const results = await searchProducts('xyznonexistent')
    expect(results).toEqual([])
  })

  it('throws an error when the API returns a non-ok response', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 503,
    })

    const promise = searchProducts('milk-error-test')
    const assertion = expect(promise).rejects.toThrow('API error: 503')
    await vi.advanceTimersByTimeAsync(10000)
    await assertion
  })

  it('sends the search query in the URL', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ products: [] }),
    })

    await searchProducts('cheese')

    const calledUrl = global.fetch.mock.calls[0][0]
    expect(calledUrl).toContain('search_terms=cheese')
  })
})

describe('getProduct', () => {
  it('returns a single product by barcode', async () => {
    const fakeProduct = {
      code: '5060292302201',
      product_name: 'Test Product',
      nutriments: { iron_100g: 2.5 },
    }

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ product: fakeProduct }),
    })

    const result = await getProduct('5060292302201')
    expect(result).toEqual(fakeProduct)
  })

  it('returns null when product is not found', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ product: null }),
    })

    const result = await getProduct('0000000000000')
    expect(result).toBeNull()
  })

  it('throws an error when the API fails', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const promise = getProduct('999-error-test')
    const assertion = expect(promise).rejects.toThrow('API error: 500')
    await vi.advanceTimersByTimeAsync(10000)
    await assertion
  })
})