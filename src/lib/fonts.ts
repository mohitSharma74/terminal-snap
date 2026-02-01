import {
  Fira_Code,
  JetBrains_Mono,
  Victor_Mono,
  IBM_Plex_Mono,
  Roboto_Mono,
  Space_Mono,
  Inconsolata,
} from "next/font/google"

// Configure Google Fonts
const firaCode = Fira_Code({ subsets: ["latin"], display: "swap" })
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap" })
const victorMono = Victor_Mono({ subsets: ["latin"], display: "swap" })
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
})
const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" })
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})
const inconsolata = Inconsolata({ subsets: ["latin"], display: "swap" })

export interface TerminalFont {
  id: string
  name: string
  fontFamily: string
  style?: React.CSSProperties
  type: "google" | "system"
}

export const TERMINAL_FONTS: TerminalFont[] = [
  {
    id: "fira-code",
    name: "Fira Code",
    fontFamily: firaCode.style.fontFamily,
    style: firaCode.style,
    type: "google",
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    fontFamily: jetBrainsMono.style.fontFamily,
    style: jetBrainsMono.style,
    type: "google",
  },
  {
    id: "cascadia-code",
    name: "Cascadia Code",
    fontFamily: "'Cascadia Code', 'Segoe UI Mono', 'Courier New', monospace",
    type: "system",
  },
  {
    id: "sf-mono",
    name: "SF Mono",
    fontFamily:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    type: "system",
  },
  {
    id: "consolas",
    name: "Consolas",
    fontFamily: "Consolas, 'Courier New', monospace",
    type: "system",
  },
  {
    id: "victor-mono",
    name: "Victor Mono",
    fontFamily: victorMono.style.fontFamily,
    style: victorMono.style,
    type: "google",
  },
  {
    id: "ibm-plex-mono",
    name: "IBM Plex Mono",
    fontFamily: ibmPlexMono.style.fontFamily,
    style: ibmPlexMono.style,
    type: "google",
  },
  {
    id: "roboto-mono",
    name: "Roboto Mono",
    fontFamily: robotoMono.style.fontFamily,
    style: robotoMono.style,
    type: "google",
  },
  {
    id: "space-mono",
    name: "Space Mono",
    fontFamily: spaceMono.style.fontFamily,
    style: spaceMono.style,
    type: "google",
  },
  {
    id: "inconsolata",
    name: "Inconsolata",
    fontFamily: inconsolata.style.fontFamily,
    style: inconsolata.style,
    type: "google",
  },
]

export const DEFAULT_FONT = TERMINAL_FONTS[0]

export const getFontById = (id: string): TerminalFont => {
  return TERMINAL_FONTS.find((f) => f.id === id) || DEFAULT_FONT
}
