"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface DropShadowToggleProps {
  value: boolean
  onChange: (dropShadow: boolean) => void
}

export const DropShadowToggle = ({
  value,
  onChange,
}: DropShadowToggleProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className="space-y-2">
      <Label>Shadow</Label>
      <Checkbox
        id="drop-shadow-toggle"
        label="Enable drop shadow"
        checked={value}
        onChange={handleChange}
        aria-label="Toggle drop shadow on terminal preview"
      />
    </div>
  )
}
