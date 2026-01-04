"use client"

import { FloatingSelect } from "@/components/ui/floating-select"
import { backgrounds } from "@/lib/backgrounds"
import type { BackgroundPreset } from "@/types"

interface BackgroundSelectorProps {
  value: BackgroundPreset
  onChange: (background: BackgroundPreset) => void
}

export const BackgroundSelector = ({
  value,
  onChange,
}: BackgroundSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBg = backgrounds.find((bg) => bg.id === e.target.value)
    if (selectedBg) {
      onChange(selectedBg)
    }
  }

  return (
    <FloatingSelect
      id="background-select"
      label="Background"
      value={value.id}
      onChange={handleChange}
      aria-label="Select background"
    >
      {backgrounds.map((bg) => (
        <option key={bg.id} value={bg.id}>
          {bg.name}
        </option>
      ))}
    </FloatingSelect>
  )
}
