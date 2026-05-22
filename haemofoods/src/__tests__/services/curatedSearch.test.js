import { describe, it, expect } from 'vitest'
import { searchCurated, getCuratedProduct } from '../../services/curatedSearch'

describe('searchCurated', () => {
    it('finds foods matching a search term', () => {
        const results = searchCurated('chicken')

        expect(results.length).toBeGreaterThan(0)
        // every result should have "chicken" in the name (case insensitive)
        results.forEach(r => {
            expect(r.product_name.toLowerCase()).toContain('chicken')
        })
    })

    it('returns results in our standard product shape', () => {
        const results = searchCurated('beef')
        const product = results[0]

        // check it has all the fields our FoodCard and scoring expects
        expect(product).toHaveProperty('code')
        expect(product).toHaveProperty('product_name')
        expect(product).toHaveProperty('source', 'curated')
        expect(product).toHaveProperty('nutriments')
        expect(product.nutriments).toHaveProperty('iron_100g')
        expect(product.nutriments).toHaveProperty('vitamin-c_100g')
        expect(product.nutriments).toHaveProperty('alcohol_100g')
        expect(product).toHaveProperty('rating')
        expect(product).toHaveProperty('reason')
    })

    it('returns empty array when nothing matches', () => {
        const results = searchCurated('xyznonexistent')
        expect(results).toEqual([])
    })

    it('matches partial words', () => {
        const results = searchCurated('chick')

        expect(results.length).toBeGreaterThan(0)
    })

    it('is case insensitive', () => {
        const lower = searchCurated('salmon')
        const upper = searchCurated('SALMON')

        expect(lower).toEqual(upper)
    })

    it('also matches category names', () => {
        const results = searchCurated('dairy')

        expect(results.length).toBeGreaterThan(0)
    })
})

describe('getCuratedProduct', () => {
    it('returns a product by its curated ID', () => {
        const product = getCuratedProduct('cur_001')

        expect(product).not.toBeNull()
        expect(product.product_name).toBe('Beef Mince (Raw)')
    })

    it('returns null for unknown IDs', () => {
        const product = getCuratedProduct('cur_999')
        expect(product).toBeNull()
    })
})