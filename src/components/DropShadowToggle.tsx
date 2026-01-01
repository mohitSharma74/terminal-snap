"use client"

import { ModernCheckbox } from "@/components/ui/modern-checkbox"

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
    <div className="form-field">
      <div className="mb-2">
        <span className="text-sm font-medium text-foreground">Shadow</span>
      </div>
      <ModernCheckbox
        id="drop-shadow-toggle"
        label="Enable drop shadow"
        checked={value}
        onChange={handleChange}
        aria-label="Toggle drop shadow on terminal preview"
      />
    </div>
  )
}
