"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ModernSliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
}

const ModernSlider = React.forwardRef<HTMLInputElement, ModernSliderProps>(
  (
    {
      className,
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      showValue = true,
      label,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value))
    }

    return (
      <div className="modern-slider-wrapper">
        {label && (
          <div className="modern-slider-label-row">
            <span className="modern-slider-label">{label}</span>
            {showValue && (
              <span className="modern-slider-value">{value}px</span>
            )}
          </div>
        )}
        <input
          type="range"
          ref={ref}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className={cn("modern-slider-input", className)}
          {...props}
        />
      </div>
    )
  }
)

ModernSlider.displayName = "ModernSlider"

export { ModernSlider }
