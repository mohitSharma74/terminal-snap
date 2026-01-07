"use client"

import { ModernCheckbox } from "@/components/ui/modern-checkbox"

interface TransparentBackgroundToggleProps {
  value: boolean
  onChange: (transparentBackground: boolean) => void
}

export const TransparentBackgroundToggle = ({
  value,
  onChange,
}: TransparentBackgroundToggleProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className="form-field">
      <div className="mb-2">
        <span className="text-sm font-medium text-foreground">Transparency</span>
      </div>
      <ModernCheckbox
        id="transparent-background-toggle"
        label="Transparent background"
        checked={value}
        onChange={handleChange}
        aria-label="Toggle transparent background for outer padding area"
      />
    </div>
  )
}
