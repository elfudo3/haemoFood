import { describe, it, expect } from 'vitest'
import { formatIron, formatVitaminC, formatAlcohol } from '../../utils/formatting'

describe('formatIron', () => {
  it('formats iron value with units', () => {
    expect(formatIron(2.5)).toBe('2.5 mg/100g')
  })

  it('rounds to one decimal place', () => {
    expect(formatIron(2.567)).toBe('2.6 mg/100g')
    expect(formatIron(0.123)).toBe('0.1 mg/100g')
  })

  it('handles whole numbers', () => {
    expect(formatIron(3)).toBe('3.0 mg/100g')
  })

  it('returns "No data" when value is missing', () => {
    expect(formatIron(null)).toBe('No data')
    expect(formatIron(undefined)).toBe('No data')
  })
})

describe('formatVitaminC', () => {
  it('formats vitamin C value with units', () => {
    expect(formatVitaminC(12)).toBe('12.0 mg/100g')
  })

  it('returns "No data" when value is missing', () => {
    expect(formatVitaminC(null)).toBe('No data')
  })
})

describe('formatAlcohol', () => {
  it('formats alcohol as a percentage', () => {
    expect(formatAlcohol(5.2)).toBe('5.2%')
  })

  it('returns "0%" for zero', () => {
    expect(formatAlcohol(0)).toBe('0.0%')
  })

  it('returns "No data" when value is missing', () => {
    expect(formatAlcohol(null)).toBe('No data')
  })
})