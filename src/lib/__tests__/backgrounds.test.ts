import { getBackgroundById, backgrounds } from "../backgrounds"

describe("backgrounds", () => {
  describe("getBackgroundById", () => {
    it("should return the correct background when given a valid id", () => {
      const bg = getBackgroundById("gradient-purple")
      expect(bg.id).toBe("gradient-purple")
      expect(bg.name).toBe("Purple Gradient")
      expect(bg.css).toContain("linear-gradient")
    })

    it("should return the correct background for all available backgrounds", () => {
      backgrounds.forEach((expectedBg) => {
        const bg = getBackgroundById(expectedBg.id)
        expect(bg).toEqual(expectedBg)
      })
    })

    it("should return first background as fallback when id is not found", () => {
      const bg = getBackgroundById("non-existent-id")
      expect(bg).toEqual(backgrounds[0])
      expect(bg.id).toBe("gradient-purple")
    })

    it("should return first background as fallback for empty string", () => {
      const bg = getBackgroundById("")
      expect(bg).toEqual(backgrounds[0])
    })

    it("should verify background structure", () => {
      const bg = getBackgroundById("solid-white")
      expect(bg).toHaveProperty("id")
      expect(bg).toHaveProperty("name")
      expect(bg).toHaveProperty("css")
      expect(bg).toHaveProperty("previewColor")
      expect(typeof bg.id).toBe("string")
      expect(typeof bg.name).toBe("string")
      expect(typeof bg.css).toBe("string")
      expect(typeof bg.previewColor).toBe("string")
    })
  })

  describe("backgrounds array", () => {
    it("should export at least 15 backgrounds (including 5 macOS variants)", () => {
      expect(backgrounds.length).toBeGreaterThanOrEqual(15)
    })

    it("should have unique background ids", () => {
      const ids = backgrounds.map((b) => b.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(backgrounds.length)
    })

    it("should have gradient-purple as the first background", () => {
      expect(backgrounds[0].id).toBe("gradient-purple")
    })

    it("should include both gradient and solid color options", () => {
      const hasGradients = backgrounds.some((b) =>
        b.css.includes("linear-gradient")
      )
      const hasSolids = backgrounds.some((b) => b.css.startsWith("#"))
      expect(hasGradients).toBe(true)
      expect(hasSolids).toBe(true)
    })
  })

  describe("macOS abstract wallpaper backgrounds", () => {
    it("should include Sonoma Purple background", () => {
      const bg = getBackgroundById("macos-sonoma-purple")
      expect(bg.id).toBe("macos-sonoma-purple")
      expect(bg.name).toBe("Sonoma Purple")
      expect(bg.css).toContain("radial-gradient")
      expect(bg.previewColor).toBe("#8b5cf6")
    })

    it("should include Sequoia Blue background", () => {
      const bg = getBackgroundById("macos-sequoia-blue")
      expect(bg.id).toBe("macos-sequoia-blue")
      expect(bg.name).toBe("Sequoia Blue")
      expect(bg.css).toContain("radial-gradient")
      expect(bg.previewColor).toBe("#3b82f6")
    })

    it("should include Green Aurora background", () => {
      const bg = getBackgroundById("macos-green-aurora")
      expect(bg.id).toBe("macos-green-aurora")
      expect(bg.name).toBe("Green Aurora")
      expect(bg.css).toContain("radial-gradient")
      expect(bg.previewColor).toBe("#10b981")
    })

    it("should include Sunset Orange background", () => {
      const bg = getBackgroundById("macos-sunset-orange")
      expect(bg.id).toBe("macos-sunset-orange")
      expect(bg.name).toBe("Sunset Orange")
      expect(bg.css).toContain("radial-gradient")
      expect(bg.previewColor).toBe("#f97316")
    })

    it("should include Pink Flow background", () => {
      const bg = getBackgroundById("macos-pink-flow")
      expect(bg.id).toBe("macos-pink-flow")
      expect(bg.name).toBe("Pink Flow")
      expect(bg.css).toContain("radial-gradient")
      expect(bg.previewColor).toBe("#ec4899")
    })

    it("should verify all macOS backgrounds use layered gradients", () => {
      const macOSBackgrounds = [
        "macos-sonoma-purple",
        "macos-sequoia-blue",
        "macos-green-aurora",
        "macos-sunset-orange",
        "macos-pink-flow",
      ]

      macOSBackgrounds.forEach((bgId) => {
        const bg = getBackgroundById(bgId)
        expect(bg.css).toContain("radial-gradient")
        expect(bg.css).toContain("linear-gradient")
        // Verify layered gradients (multiple radial-gradient calls)
        const radialGradientCount = (bg.css.match(/radial-gradient/g) || [])
          .length
        expect(radialGradientCount).toBeGreaterThanOrEqual(2)
      })
    })

    it("should verify macOS backgrounds have proper structure", () => {
      const macOSBackgrounds = [
        "macos-sonoma-purple",
        "macos-sequoia-blue",
        "macos-green-aurora",
        "macos-sunset-orange",
        "macos-pink-flow",
      ]

      macOSBackgrounds.forEach((bgId) => {
        const bg = getBackgroundById(bgId)
        expect(bg).toHaveProperty("id")
        expect(bg).toHaveProperty("name")
        expect(bg).toHaveProperty("css")
        expect(bg).toHaveProperty("previewColor")
        expect(bg.id).toBe(bgId)
        expect(bg.previewColor).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })
  })
})
