"use client"

import { FloatingSelect } from "@/components/ui/floating-select"
import { TERMINAL_FONTS } from "@/lib/fonts"

interface FontSelectorProps {
  value: string
  onChange: (fontId: string) => void
}

const FontSelector = ({ value, onChange }: FontSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <FloatingSelect
      id="font-select"
      label="Font Family"
      value={value}
      onChange={handleChange}
      aria-label="Select terminal font"
    >
      {TERMINAL_FONTS.map((font) => (
        <option key={font.id} value={font.id}>
          {font.name}
        </option>
      ))}
    </FloatingSelect>
  )
}

export default FontSelector
