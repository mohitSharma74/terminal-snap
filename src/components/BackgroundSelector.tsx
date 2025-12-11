"use client"

import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
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
    <div className="space-y-2">
      <Label htmlFor="background-select">Background</Label>
      <Select
        id="background-select"
        value={value.id}
        onChange={handleChange}
        aria-label="Select background"
      >
        {backgrounds.map((bg) => (
          <option key={bg.id} value={bg.id}>
            {bg.name}
          </option>
        ))}
      </Select>
    </div>
  )
}


