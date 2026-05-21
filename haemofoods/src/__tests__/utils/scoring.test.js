import { describe, it, expect } from 'vitest'
import { getIronRating, getCategoryRating } from '../../utils/scoring'

describe('getIronRating', () => {
  it('returns "safe" for iron below 1.5mg per 100g', () => {
    expect(getIronRating(0.5)).toBe('safe')
    expect(getIronRating(1.4)).toBe('safe')
    expect(getIronRating(0)).toBe('safe')
  })

  it('returns "moderate" for iron between 1.5 and 3.5mg', () => {
    expect(getIronRating(1.5)).toBe('moderate')
    expect(getIronRating(2.8)).toBe('moderate')
    expect(getIronRating(3.5)).toBe('moderate')
  })

  it('returns "avoid" for iron above 3.5mg', () => {
    expect(getIronRating(3.6)).toBe('avoid')
    expect(getIronRating(12)).toBe('avoid')
  })

  it('returns "unknown" when iron data is null or undefined', () => {
    expect(getIronRating(null)).toBe('unknown')
    expect(getIronRating(undefined)).toBe('unknown')
  })
})


describe('getCategoryRating', () => {
  it('returns "avoid" for meats', () => {
    expect(getCategoryRating(['en:meats', 'en:meats-and-their-products'])).toBe('avoid')
  })

  it('returns "avoid" for offals', () => {
    expect(getCategoryRating(['en:offals'])).toBe('avoid')
  })

  it('returns "avoid" for pork', () => {
    expect(getCategoryRating(['en:pork', 'en:pork-and-its-products'])).toBe('avoid')
  })

  it('returns "avoid" for shellfish and molluscs', () => {
    expect(getCategoryRating(['en:seafood', 'en:mollusc', 'en:mussels'])).toBe('avoid')
  })

  it('returns "moderate" for cereals', () => {
    expect(getCategoryRating(['en:cereals-and-potatoes', 'en:breakfast-cereals'])).toBe('moderate')
  })

  it('returns "moderate" for legumes', () => {
    expect(getCategoryRating(['en:legumes-and-their-products'])).toBe('moderate')
  })

  it('returns "moderate" for fish', () => {
    expect(getCategoryRating(['en:fishes', 'en:fishes-and-their-products'])).toBe('moderate')
  })

  it('returns "safe" for dairy', () => {
    expect(getCategoryRating(['en:dairies', 'en:milks'])).toBe('safe')
  })

  it('returns "safe" for fruits and vegetables', () => {
    expect(getCategoryRating(['en:fruits-and-vegetables-based-foods', 'en:vegetables-based-foods'])).toBe('safe')
  })

  it('returns "unknown" for unrecognised categories', () => {
    expect(getCategoryRating(['en:something-random'])).toBe('unknown')
  })

  it('returns "unknown" for empty or missing categories', () => {
    expect(getCategoryRating([])).toBe('unknown')
    expect(getCategoryRating(null)).toBe('unknown')
  })

  it('returns the worst rating when multiple categories match', () => {
    // product tagged as both dairy and meat should return avoid
    expect(getCategoryRating(['en:dairies', 'en:meats'])).toBe('avoid')
  })
})