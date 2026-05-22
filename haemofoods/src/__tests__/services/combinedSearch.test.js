import { describe, it, expect, vi } from 'vitest'
import { searchAll } from '../../services/combinedSearch'
import * as off from '../../services/openFoodFacts'
import * as usda from '../../services/usdaFoodData'

// mock both API modules so no real fetch calls happen
vi.mock('../../services/openFoodFacts')
vi.mock('../../services/usdaFoodData')

describe('searchAll', () => {
  it('returns results grouped by source', async () => {
    // set up fake responses from both APIs
    off.searchProducts.mockResolvedValue([
      { code: '123', product_name: 'OFF Milk', nutriments: { iron_100g: 0.1 } },
    ])
    usda.searchUSDA.mockResolvedValue([
      { code: 'usda_171705', product_name: 'Whole milk', source: 'usda', nutriments: { iron_100g: 0.03 } },
    ])

    const results = await searchAll('milk')

    // check OFF results are in the off array with source tag
    expect(results.off).toHaveLength(1)
    expect(results.off[0].source).toBe('off')

    // check USDA results are in the usda array
    expect(results.usda).toHaveLength(1)
    expect(results.usda[0].source).toBe('usda')
  })

  it('filters out products with no iron and no categories', async () => {
    off.searchProducts.mockResolvedValue([
      // this one has iron data — should be kept
      { code: '123', product_name: 'Good Product', nutriments: { iron_100g: 2.5 } },
      // this one has nothing useful — should be filtered out
      { code: '456', product_name: 'Useless Product', nutriments: {} },
    ])
    usda.searchUSDA.mockResolvedValue([])

    const results = await searchAll('test')

    // only the good product should remain
    expect(results.off).toHaveLength(1)
    expect(results.off[0].product_name).toBe('Good Product')
    expect(results.usda).toHaveLength(0)
  })

  it('keeps products with categories even without iron data', async () => {
    off.searchProducts.mockResolvedValue([
      // no iron data but has category tags — we can use fallback rating
      { code: '123', product_name: 'Categorised', nutriments: {}, categories_tags: ['en:dairies'] },
    ])
    usda.searchUSDA.mockResolvedValue([])

    const results = await searchAll('test')

    expect(results.off).toHaveLength(1)
  })

  it('still returns OFF results if USDA fails', async () => {
    off.searchProducts.mockResolvedValue([
      { code: '123', product_name: 'OFF Milk', nutriments: { iron_100g: 0.1 } },
    ])
    // USDA is down — should not crash the whole search
    usda.searchUSDA.mockRejectedValue(new Error('USDA down'))

    const results = await searchAll('milk')

    // OFF results still come through
    expect(results.off).toHaveLength(1)
    // USDA returns empty, not an error
    expect(results.usda).toHaveLength(0)
  })

  it('still returns USDA results if OFF fails', async () => {
    // OFF is down — should not crash the whole search
    off.searchProducts.mockRejectedValue(new Error('OFF down'))
    usda.searchUSDA.mockResolvedValue([
      { code: 'usda_171705', product_name: 'Whole milk', source: 'usda', nutriments: { iron_100g: 0.03 } },
    ])

    const results = await searchAll('milk')

    // OFF returns empty, not an error
    expect(results.off).toHaveLength(0)
    // USDA results still come through
    expect(results.usda).toHaveLength(1)
  })

  it('returns empty arrays if both APIs fail', async () => {
    // both APIs are down
    off.searchProducts.mockRejectedValue(new Error('OFF down'))
    usda.searchUSDA.mockRejectedValue(new Error('USDA down'))

    const results = await searchAll('milk')

    // both return empty arrays, no crash
    expect(results.off).toEqual([])
    expect(results.usda).toEqual([])
  })
})