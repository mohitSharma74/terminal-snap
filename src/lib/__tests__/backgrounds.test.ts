import { getBackgroundById, backgrounds } from '../backgrounds'

describe('backgrounds', () => {
  describe('getBackgroundById', () => {
    it('should return the correct background when given a valid id', () => {
      const bg = getBackgroundById('gradient-purple')
      expect(bg.id).toBe('gradient-purple')
      expect(bg.name).toBe('Purple Gradient')
      expect(bg.css).toContain('linear-gradient')
    })

    it('should return the correct background for all available backgrounds', () => {
      backgrounds.forEach((expectedBg) => {
        const bg = getBackgroundById(expectedBg.id)
        expect(bg).toEqual(expectedBg)
      })
    })

    it('should return first background as fallback when id is not found', () => {
      const bg = getBackgroundById('non-existent-id')
      expect(bg).toEqual(backgrounds[0])
      expect(bg.id).toBe('gradient-purple')
    })

    it('should return first background as fallback for empty string', () => {
      const bg = getBackgroundById('')
      expect(bg).toEqual(backgrounds[0])
    })

    it('should verify background structure', () => {
      const bg = getBackgroundById('solid-white')
      expect(bg).toHaveProperty('id')
      expect(bg).toHaveProperty('name')
      expect(bg).toHaveProperty('css')
      expect(bg).toHaveProperty('previewColor')
      expect(typeof bg.id).toBe('string')
      expect(typeof bg.name).toBe('string')
      expect(typeof bg.css).toBe('string')
      expect(typeof bg.previewColor).toBe('string')
    })
  })

  describe('backgrounds array', () => {
    it('should export at least 10 backgrounds', () => {
      expect(backgrounds.length).toBeGreaterThanOrEqual(10)
    })

    it('should have unique background ids', () => {
      const ids = backgrounds.map((b) => b.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(backgrounds.length)
    })

    it('should have gradient-purple as the first background', () => {
      expect(backgrounds[0].id).toBe('gradient-purple')
    })

    it('should include both gradient and solid color options', () => {
      const hasGradients = backgrounds.some((b) => b.css.includes('linear-gradient'))
      const hasSolids = backgrounds.some((b) => b.css.startsWith('#'))
      expect(hasGradients).toBe(true)
      expect(hasSolids).toBe(true)
    })
  })
})
