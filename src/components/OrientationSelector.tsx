"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
    <div className="space-y-2">
      <Label>Orientation</Label>
      <RadioGroup value={value} onValueChange={handleChange} name="orientation">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="portrait" id="orientation-portrait" />
          <Label
            htmlFor="orientation-portrait"
            className="font-normal cursor-pointer"
          >
            Portrait
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="landscape" id="orientation-landscape" />
          <Label
            htmlFor="orientation-landscape"
            className="font-normal cursor-pointer"
          >
            Landscape
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
