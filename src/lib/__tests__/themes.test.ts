import { getThemeByName, themes } from '../themes'

describe('themes', () => {
  describe('getThemeByName', () => {
    it('should return the correct theme when given a valid name', () => {
      const theme = getThemeByName('Dracula')
      expect(theme.name).toBe('Dracula')
      expect(theme.background).toBe('#282a36')
      expect(theme.foreground).toBe('#f8f8f2')
    })

    it('should return the correct theme for all available themes', () => {
      themes.forEach((expectedTheme) => {
        const theme = getThemeByName(expectedTheme.name)
        expect(theme).toEqual(expectedTheme)
      })
    })

    it('should return Dracula (first theme) as fallback when theme name is not found', () => {
      const theme = getThemeByName('NonExistentTheme')
      expect(theme.name).toBe('Dracula')
      expect(theme).toEqual(themes[0])
    })

    it('should return Dracula as fallback for empty string', () => {
      const theme = getThemeByName('')
      expect(theme.name).toBe('Dracula')
    })

    it('should handle case-sensitive theme names', () => {
      const theme = getThemeByName('dracula') // lowercase
      expect(theme.name).toBe('Dracula') // Falls back to default
    })

    it('should verify theme palette structure', () => {
      const theme = getThemeByName('Nord')
      expect(theme.palette).toHaveProperty('black')
      expect(theme.palette).toHaveProperty('red')
      expect(theme.palette).toHaveProperty('green')
      expect(theme.palette).toHaveProperty('yellow')
      expect(theme.palette).toHaveProperty('blue')
      expect(theme.palette).toHaveProperty('magenta')
      expect(theme.palette).toHaveProperty('cyan')
      expect(theme.palette).toHaveProperty('white')
      expect(theme.palette).toHaveProperty('brightBlack')
      expect(theme.palette).toHaveProperty('brightRed')
      expect(theme.palette).toHaveProperty('brightGreen')
      expect(theme.palette).toHaveProperty('brightYellow')
      expect(theme.palette).toHaveProperty('brightBlue')
      expect(theme.palette).toHaveProperty('brightMagenta')
      expect(theme.palette).toHaveProperty('brightCyan')
      expect(theme.palette).toHaveProperty('brightWhite')
    })
  })

  describe('themes array', () => {
    it('should export at least 7 themes', () => {
      expect(themes.length).toBeGreaterThanOrEqual(7)
    })

    it('should have unique theme names', () => {
      const names = themes.map((t) => t.name)
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(themes.length)
    })

    it('should have Dracula as the first theme', () => {
      expect(themes[0].name).toBe('Dracula')
    })
  })
})
