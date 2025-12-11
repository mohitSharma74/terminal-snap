"use client"

import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { themes } from "@/lib/themes"
import type { TerminalTheme } from "@/types"

interface ThemeSelectorProps {
  value: TerminalTheme
  onChange: (theme: TerminalTheme) => void
}

export const ThemeSelector = ({ value, onChange }: ThemeSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = themes.find((t) => t.name === e.target.value)
    if (selectedTheme) {
      onChange(selectedTheme)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="theme-select">Terminal Theme</Label>
      <Select
        id="theme-select"
        value={value.name}
        onChange={handleChange}
        aria-label="Select terminal theme"
      >
        {themes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.name}
          </option>
        ))}
      </Select>
    </div>
  )
}


