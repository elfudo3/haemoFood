import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchAll } from '../../services/mergedSearch'

//mock the curated search module
vi.mock('../../services/curatedSearch', () => ({
  searchCurated: vi.fn(),
}))

//mock the USDA search module
vi.mock('../../services/usdaFoodData', () => ({
  searchUSDA: vi.fn(),
}))

//import the mocked functions so we can control what they return
import { searchCurated } from '../../services/curatedSearch'
import { searchUSDA } from '../../services/usdaFoodData'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('searchAll', () => {

  it('returns curated and USDA results sorted by relevance score', async () => {
    searchCurated.mockReturnValue([
      { code: 'cur_001', product_name: 'Chicken Breast', source: 'curated' },
    ])
    searchUSDA.mockResolvedValue([
      { code: 'usda_100', product_name: 'Chicken', source: 'usda' },
    ])

    const results = await searchAll('chicken')

    //chicken breast has "chicken" as a word-start match (50)
    //chicken is an exact match (100)
    //so USDA result should come first
    expect(results[0].product_name).toBe('Chicken')
    expect(results[1].product_name).toBe('Chicken Breast')
  })

  it('attaches a relevanceScore to each result', async () => {
    searchCurated.mockReturnValue([
      { code: 'cur_001', product_name: 'Salmon Fillet', source: 'curated' },
    ])
    searchUSDA.mockResolvedValue([])

    const results = await searchAll('salmon')

    expect(results[0]).toHaveProperty('relevanceScore')
    expect(results[0].relevanceScore).toBeGreaterThan(0)
  })

  it('still returns curated results when USDA fails', async () => {
    searchCurated.mockReturnValue([
      { code: 'cur_001', product_name: 'Beef Mince', source: 'curated' },
    ])
    searchUSDA.mockRejectedValue(new Error('API down'))

    const results = await searchAll('beef')

    expect(results).toHaveLength(1)
    expect(results[0].product_name).toBe('Beef Mince')
  })

  it('returns empty array when both sources return nothing', async () => {
    searchCurated.mockReturnValue([])
    searchUSDA.mockResolvedValue([])

    const results = await searchAll('xyznotfound')

    expect(results).toEqual([])
  })

  it('returns empty array for empty query', async () => {
    const results = await searchAll('')
    expect(results).toEqual([])
  })

  it('does not return duplicate results from both sources', async () => {
    searchCurated.mockReturnValue([
      { code: 'cur_001', product_name: 'Salmon Fillet', source: 'curated' },
    ])
    searchUSDA.mockResolvedValue([
      { code: 'usda_100', product_name: 'Salmon Fillet', source: 'usda' },
    ])

    const results = await searchAll('salmon')

    //curated should be preferred over USDA when names match
    expect(results).toHaveLength(1)
    expect(results[0].source).toBe('curated')
  })

})