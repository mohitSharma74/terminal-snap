"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ModernRadioOption {
  value: string
  label: string
  id?: string
}

export interface ModernRadioProps {
  name: string
  value: string
  options: ModernRadioOption[]
  onChange: (value: string) => void
  className?: string
}

const ModernRadio = React.forwardRef<HTMLDivElement, ModernRadioProps>(
  ({ name, value, options, onChange, className }, ref) => {
    const handleChange = (optionValue: string) => {
      onChange(optionValue)
    }

    return (
      <div ref={ref} className={cn("modern-radio-group", className)}>
        {options.map((option) => {
          const optionId = option.id || `${name}-${option.value}`
          const isChecked = value === option.value

          return (
            <div key={option.value} className="modern-radio-wrapper">
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => handleChange(option.value)}
                className="modern-radio-input"
              />
              <label htmlFor={optionId} className="modern-radio-label">
                {option.label}
              </label>
            </div>
          )
        })}
      </div>
    )
  }
)

ModernRadio.displayName = "ModernRadio"

export { ModernRadio }
