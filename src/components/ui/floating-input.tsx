"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, id, value, onChange, ...props }, ref) => {
    const [hasValue, setHasValue] = React.useState(false)
    const generatedId = React.useId()
    const inputId = id || `floating-input-${generatedId}`

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== "")
      onChange?.(e)
    }

    React.useEffect(() => {
      if (value) {
        setHasValue(String(value) !== "")
      }
    }, [value])

    return (
      <div className="floating-label-group">
        <input
          id={inputId}
          ref={ref}
          className={cn("floating-input", hasValue && "has-value", className)}
          placeholder=" "
          value={value}
          onChange={handleChange}
          {...props}
        />
        <label htmlFor={inputId} className="floating-label">
          {label}
        </label>
      </div>
    )
  }
)

FloatingInput.displayName = "FloatingInput"

export { FloatingInput }
