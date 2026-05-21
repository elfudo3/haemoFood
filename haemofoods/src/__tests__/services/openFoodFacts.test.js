import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchProducts, getProduct } from '../../services/openFoodFacts'

// replace the real fetch with a fake one we control
beforeEach(() => {
  global.fetch = vi.fn()
})

describe('searchProducts', () => {
  it('returns an array of products from the API', async () => {
    // set up the fake response
    const fakeProducts = [
      { code: '123', product_name: 'Test Milk', brands: 'TestBrand' },
      { code: '456', product_name: 'Test Beef', brands: 'MeatCo' },
    ]

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ products: fakeProducts }),
    })

    const results = await searchProducts('milk')

    // check we got the right data back
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

    await expect(searchProducts('milk')).rejects.toThrow('API error: 503')
  })

  it('sends the search query in the URL', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ products: [] }),
    })

    await searchProducts('cheese')

    // check that fetch was called with a URL containing our search term
    const calledUrl = global.fetch.mock.calls[0][0]
    expect(calledUrl).toContain('search_terms=cheese')
  })

  it('includes a custom user-agent header', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ products: [] }),
    })

    await searchProducts('cheese')

    // check the headers passed to fetch
    const calledOptions = global.fetch.mock.calls[0][1]
    expect(calledOptions.headers['User-Agent']).toContain('HaemoEat')
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

    await expect(getProduct('123')).rejects.toThrow('API error: 500')
  })
})

//Test passed: GREEN
