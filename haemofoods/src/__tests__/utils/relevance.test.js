import { describe, it, expect } from 'vitest'
import { getRelevanceScore } from '../../utils/relevance'

describe('getRelevanceScore', () => {

  it('returns highest score for exact match', () => {
    expect(getRelevanceScore('salmon', 'Salmon')).toBeGreaterThan(
      getRelevanceScore('sal', 'Salmon')
    )
  })

  it('is case insensitive', () => {
    expect(getRelevanceScore('salmon', 'Salmon'))
      .toBe(getRelevanceScore('SALMON', 'Salmon'))
  })

  it('returns high score when name starts with query', () => {
    expect(getRelevanceScore('sal', 'Salmon Fillet')).toBeGreaterThan(
      getRelevanceScore('fillet', 'Salmon Fillet')
    )
  })

  it('returns medium score when a word in the name starts with query', () => {
    expect(getRelevanceScore('steak', 'Beef Steak — Sirloin')).toBeGreaterThan(
      getRelevanceScore('irl', 'Beef Steak — Sirloin')
    )
  })

  it('returns low score when query appears anywhere in the name', () => {
    const score = getRelevanceScore('irl', 'Sirloin')
    expect(score).toBeGreaterThan(0)
  })

  it('returns 0 when there is no match at all', () => {
    expect(getRelevanceScore('pizza', 'Salmon Fillet')).toBe(0)
  })

  it('scores higher when multiple words match', () => {
    expect(getRelevanceScore('chicken breast', 'Chicken Breast (Raw)')).toBeGreaterThan(
      getRelevanceScore('chicken', 'Chicken Breast (Raw)')
    )
  })

  it('scores higher when all words match vs only some', () => {
    expect(getRelevanceScore('chicken breast', 'Chicken Breast (Raw)')).toBeGreaterThan(
      getRelevanceScore('chicken breast', 'Chicken Wings (Raw)')
    )
  })

})