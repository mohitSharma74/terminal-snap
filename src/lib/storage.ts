import { TerminalSettings } from "@/types"
import { DEFAULT_FONT } from "./fonts"

const STORAGE_KEY = "terminalsnap-settings"
const STORAGE_VERSION = 1

export interface StoredSettings {
  version: number
  settings: TerminalSettings
  lastSaved: string
}

const DEFAULT_SETTINGS: Partial<TerminalSettings> = {
  fontFamily: DEFAULT_FONT.id,
  // Add other critical defaults if necessary, though the main app state handles most
}

export const saveSettings = (settings: TerminalSettings): void => {
  try {
    const data: StoredSettings = {
      version: STORAGE_VERSION,
      settings,
      lastSaved: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.warn("Failed to save settings to localStorage:", error)
  }
}

export const loadSettings = (): TerminalSettings | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const data = JSON.parse(raw) as StoredSettings

    // Simple version check - in future this could handle migrations
    if (data.version !== STORAGE_VERSION) {
      // eslint-disable-next-line no-console
      console.log("Settings version mismatch, ignoring stored settings")
      return null
    }

    // Merge with defaults to ensure new fields (like fontFamily) exist
    // if loading from an older version or partial state
    // Note: Since we have versioning, we can be stricter, but merging is safer
    return {
      ...DEFAULT_SETTINGS,
      ...data.settings,
    } as TerminalSettings
  } catch (error) {
    console.warn("Failed to load settings from localStorage:", error)
    return null
  }
}

export const clearSettings = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn("Failed to clear settings:", error)
  }
}
