"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
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
    <div className="space-y-4">
      <Label>
        Padding ({orientation === "landscape" ? "Landscape" : "Portrait"})
      </Label>
      <div className="space-y-4 pl-1">
        <Slider
          label="Horizontal (Left/Right)"
          value={value.horizontal}
          onChange={handleHorizontalChange}
          min={0}
          max={80}
          step={4}
          aria-label={`${orientation} horizontal padding`}
        />
        <Slider
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
