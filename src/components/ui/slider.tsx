"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
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
      <div className="space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            {showValue && (
              <span className="text-sm text-muted-foreground">{value}px</span>
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
          className={cn(
            "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer",
            "accent-primary",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-4",
            "[&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:w-4",
            "[&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-primary",
            "[&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:cursor-pointer",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-ring",
            "focus-visible:ring-offset-2",
            "disabled:opacity-50",
            "disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
