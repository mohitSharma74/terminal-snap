import { getFontById, TERMINAL_FONTS, DEFAULT_FONT } from "../fonts"

describe("fonts", () => {
  it("should have a default font", () => {
    expect(DEFAULT_FONT).toBeDefined()
    expect(DEFAULT_FONT.id).toBe("fira-code")
  })

  it("should return the correct font by id", () => {
    const font = getFontById("jetbrains-mono")
    expect(font.id).toBe("jetbrains-mono")
    expect(font.name).toBe("JetBrains Mono")
  })

  it("should return default font for invalid id", () => {
    const font = getFontById("invalid-font-id")
    expect(font).toEqual(DEFAULT_FONT)
  })

  it("should have valid font configurations", () => {
    TERMINAL_FONTS.forEach((font) => {
      expect(font.id).toBeDefined()
      expect(font.name).toBeDefined()
      expect(font.fontFamily).toBeDefined()
      expect(font.type).toMatch(/google|system/)
      if (font.type === "google") {
        expect(font.style).toBeDefined()
      }
    })
  })
})
