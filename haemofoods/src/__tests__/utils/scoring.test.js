import { describe, it, expect } from 'vitest'
import { getIronRating } from '../../utils/scoring'

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