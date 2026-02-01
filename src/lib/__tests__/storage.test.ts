import { saveSettings, loadSettings, clearSettings } from "../storage"
import { DEFAULT_FONT } from "../fonts"
import type { ANSIColorPalette, TerminalSettings } from "@/types"

const mockSettings: TerminalSettings = {
  text: "test",
  theme: {
    name: "test-theme",
    background: "#000",
    foreground: "#fff",
    palette: {} as ANSIColorPalette,
  },
  background: {
    id: "test-bg",
    name: "Test BG",
    css: "black",
    previewColor: "black",
  },
  osChrome: "macos",
  shellType: "bash",
  windowTitle: "Test",
  orientation: "landscape",
  fontFamily: "fira-code",
  padding: {
    landscape: { horizontal: 10, vertical: 10 },
    portrait: { horizontal: 10, vertical: 10 },
  },
  dropShadow: true,
}

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it("should save settings to localStorage", () => {
    saveSettings(mockSettings)
    const stored = localStorage.getItem("terminalsnap-settings")
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored as string)
    expect(parsed.settings).toEqual(mockSettings)
    expect(parsed.version).toBe(1)
  })

  it("should load settings from localStorage", () => {
    saveSettings(mockSettings)
    const loaded = loadSettings()
    expect(loaded).toEqual(expect.objectContaining(mockSettings))
  })

  it("should return null if no settings in localStorage", () => {
    const loaded = loadSettings()
    expect(loaded).toBeNull()
  })

  it("should merge with defaults when loading", () => {
    const partialSettings = { ...mockSettings }
    // @ts-expect-error - Testing missing field fallback
    delete partialSettings.fontFamily

    localStorage.setItem(
      "terminalsnap-settings",
      JSON.stringify({
        version: 1,
        settings: partialSettings,
        lastSaved: new Date().toISOString(),
      })
    )

    const loaded = loadSettings()
    expect(loaded?.fontFamily).toBe(DEFAULT_FONT.id)
  })

  it("should clear settings", () => {
    saveSettings(mockSettings)
    clearSettings()
    expect(localStorage.getItem("terminalsnap-settings")).toBeNull()
  })

  it("should handle version mismatch", () => {
    localStorage.setItem(
      "terminalsnap-settings",
      JSON.stringify({
        version: 999,
        settings: mockSettings,
        lastSaved: new Date().toISOString(),
      })
    )
    const loaded = loadSettings()
    expect(loaded).toBeNull()
  })
})
