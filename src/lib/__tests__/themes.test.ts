import { getThemeByName, themes } from "../themes"

describe("themes", () => {
  describe("getThemeByName", () => {
    it("should return the correct theme when given a valid name", () => {
      const theme = getThemeByName("Dracula")
      expect(theme.name).toBe("Dracula")
      expect(theme.background).toBe("#282a36")
      expect(theme.foreground).toBe("#f8f8f2")
    })

    it("should return the correct theme for all available themes", () => {
      themes.forEach((expectedTheme) => {
        const theme = getThemeByName(expectedTheme.name)
        expect(theme).toEqual(expectedTheme)
      })
    })

    it("should return Dracula (first theme) as fallback when theme name is not found", () => {
      const theme = getThemeByName("NonExistentTheme")
      expect(theme.name).toBe("Dracula")
      expect(theme).toEqual(themes[0])
    })

    it("should return Dracula as fallback for empty string", () => {
      const theme = getThemeByName("")
      expect(theme.name).toBe("Dracula")
    })

    it("should handle case-sensitive theme names", () => {
      const theme = getThemeByName("dracula") // lowercase
      expect(theme.name).toBe("Dracula") // Falls back to default
    })

    it("should verify theme palette structure", () => {
      const theme = getThemeByName("Nord")
      expect(theme.palette).toHaveProperty("black")
      expect(theme.palette).toHaveProperty("red")
      expect(theme.palette).toHaveProperty("green")
      expect(theme.palette).toHaveProperty("yellow")
      expect(theme.palette).toHaveProperty("blue")
      expect(theme.palette).toHaveProperty("magenta")
      expect(theme.palette).toHaveProperty("cyan")
      expect(theme.palette).toHaveProperty("white")
      expect(theme.palette).toHaveProperty("brightBlack")
      expect(theme.palette).toHaveProperty("brightRed")
      expect(theme.palette).toHaveProperty("brightGreen")
      expect(theme.palette).toHaveProperty("brightYellow")
      expect(theme.palette).toHaveProperty("brightBlue")
      expect(theme.palette).toHaveProperty("brightMagenta")
      expect(theme.palette).toHaveProperty("brightCyan")
      expect(theme.palette).toHaveProperty("brightWhite")
    })
  })

  describe("themes array", () => {
    it("should export at least 10 themes (including 3 Catppuccin variants)", () => {
      expect(themes.length).toBeGreaterThanOrEqual(10)
    })

    it("should have unique theme names", () => {
      const names = themes.map((t) => t.name)
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(themes.length)
    })

    it("should have Dracula as the first theme", () => {
      expect(themes[0].name).toBe("Dracula")
    })
  })

  describe("Catppuccin themes", () => {
    it("should include Catppuccin Mocha theme", () => {
      const theme = getThemeByName("Catppuccin Mocha")
      expect(theme.name).toBe("Catppuccin Mocha")
      expect(theme.background).toBe("#1e1e2e")
      expect(theme.foreground).toBe("#cdd6f4")
    })

    it("should include Catppuccin Frappe theme", () => {
      const theme = getThemeByName("Catppuccin Frappe")
      expect(theme.name).toBe("Catppuccin Frappe")
      expect(theme.background).toBe("#303446")
      expect(theme.foreground).toBe("#c6d0f5")
    })

    it("should include Catppuccin Macchiato theme", () => {
      const theme = getThemeByName("Catppuccin Macchiato")
      expect(theme.name).toBe("Catppuccin Macchiato")
      expect(theme.background).toBe("#24273a")
      expect(theme.foreground).toBe("#cad3f5")
    })

    it("should verify Catppuccin Mocha palette colors", () => {
      const theme = getThemeByName("Catppuccin Mocha")
      expect(theme.palette.red).toBe("#f38ba8")
      expect(theme.palette.green).toBe("#a6e3a1")
      expect(theme.palette.blue).toBe("#89b4fa")
      expect(theme.palette.magenta).toBe("#f5c2e7")
      expect(theme.palette.cyan).toBe("#94e2d5")
    })

    it("should verify Catppuccin Frappe palette colors", () => {
      const theme = getThemeByName("Catppuccin Frappe")
      expect(theme.palette.red).toBe("#e78284")
      expect(theme.palette.green).toBe("#a6d189")
      expect(theme.palette.blue).toBe("#8caaee")
      expect(theme.palette.magenta).toBe("#f4b8e4")
      expect(theme.palette.cyan).toBe("#81c8be")
    })

    it("should verify Catppuccin Macchiato palette colors", () => {
      const theme = getThemeByName("Catppuccin Macchiato")
      expect(theme.palette.red).toBe("#ed8796")
      expect(theme.palette.green).toBe("#a6da95")
      expect(theme.palette.blue).toBe("#8aadf4")
      expect(theme.palette.magenta).toBe("#f5bde6")
      expect(theme.palette.cyan).toBe("#8bd5ca")
    })

    it("should verify all Catppuccin themes have complete ANSI palette", () => {
      const catppuccinThemes = [
        "Catppuccin Mocha",
        "Catppuccin Frappe",
        "Catppuccin Macchiato",
      ]

      catppuccinThemes.forEach((themeName) => {
        const theme = getThemeByName(themeName)
        expect(theme.palette).toHaveProperty("black")
        expect(theme.palette).toHaveProperty("red")
        expect(theme.palette).toHaveProperty("green")
        expect(theme.palette).toHaveProperty("yellow")
        expect(theme.palette).toHaveProperty("blue")
        expect(theme.palette).toHaveProperty("magenta")
        expect(theme.palette).toHaveProperty("cyan")
        expect(theme.palette).toHaveProperty("white")
        expect(theme.palette).toHaveProperty("brightBlack")
        expect(theme.palette).toHaveProperty("brightRed")
        expect(theme.palette).toHaveProperty("brightGreen")
        expect(theme.palette).toHaveProperty("brightYellow")
        expect(theme.palette).toHaveProperty("brightBlue")
        expect(theme.palette).toHaveProperty("brightMagenta")
        expect(theme.palette).toHaveProperty("brightCyan")
        expect(theme.palette).toHaveProperty("brightWhite")
      })
    })
  })
})
