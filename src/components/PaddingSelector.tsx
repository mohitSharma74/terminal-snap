"use client"

import { ModernSlider } from "@/components/ui/modern-slider"
import type { Orientation, PaddingConfig } from "@/types"

interface PaddingSelectorProps {
  orientation: Orientation
  value: PaddingConfig
  onChange: (padding: PaddingConfig) => void
}

export const PaddingSelector = ({
  orientation,
  value,
  onChange,
}: PaddingSelectorProps) => {
  const handleHorizontalChange = (horizontal: number) => {
    onChange({ ...value, horizontal })
  }

  const handleVerticalChange = (vertical: number) => {
    onChange({ ...value, vertical })
  }

  return (
    <div className="form-field">
      <div className="mb-4">
        <span className="text-sm font-medium text-foreground">
          Padding ({orientation === "landscape" ? "Landscape" : "Portrait"})
        </span>
      </div>
      <div className="space-y-4 pl-1">
        <ModernSlider
          label="Horizontal (Left/Right)"
          value={value.horizontal}
          onChange={handleHorizontalChange}
          min={0}
          max={80}
          step={4}
          aria-label={`${orientation} horizontal padding`}
        />
        <ModernSlider
          label="Vertical (Top/Bottom)"
          value={value.vertical}
          onChange={handleVerticalChange}
          min={0}
          max={80}
          step={4}
          aria-label={`${orientation} vertical padding`}
        />
      </div>
    </div>
  )
}
