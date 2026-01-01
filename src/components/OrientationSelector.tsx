"use client"

import { ModernRadio } from "@/components/ui/modern-radio"
import type { Orientation } from "@/types"

interface OrientationSelectorProps {
  value: Orientation
  onChange: (orientation: Orientation) => void
}

export const OrientationSelector = ({
  value,
  onChange,
}: OrientationSelectorProps) => {
  const handleChange = (newValue: string) => {
    onChange(newValue as Orientation)
  }

  return (
    <div className="form-field">
      <div className="mb-2">
        <span className="text-sm font-medium text-foreground">Orientation</span>
      </div>
      <ModernRadio
        name="orientation"
        value={value}
        options={[
          { value: "portrait", label: "Portrait" },
          { value: "landscape", label: "Landscape" },
        ]}
        onChange={handleChange}
      />
    </div>
  )
}
