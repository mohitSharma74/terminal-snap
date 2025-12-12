export type OSChrome = "macos" | "windows" | "linux" | "none"

export type ShellType = "bash" | "zsh" | "powershell" | "auto"

export type Orientation = "portrait" | "landscape"

export interface PaddingConfig {
  horizontal: number
  vertical: number
}

export interface OrientationPadding {
  landscape: PaddingConfig
  portrait: PaddingConfig
}

export interface ANSIColorPalette {
  black: string
  red: string
  green: string
  yellow: string
  blue: string
  magenta: string
  cyan: string
  white: string
  brightBlack: string
  brightRed: string
  brightGreen: string
  brightYellow: string
  brightBlue: string
  brightMagenta: string
  brightCyan: string
  brightWhite: string
}

export interface TerminalTheme {
  name: string
  background: string
  foreground: string
  palette: ANSIColorPalette
}

export interface BackgroundPreset {
  id: string
  name: string
  css: string
  previewColor: string
}

export interface TerminalSettings {
  text: string
  theme: TerminalTheme
  background: BackgroundPreset
  osChrome: OSChrome
  shellType: ShellType
  windowTitle?: string
  orientation: Orientation
  padding: OrientationPadding
}


