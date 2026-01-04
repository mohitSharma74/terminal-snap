"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

const FloatingSelect = React.forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ className, label, id, children, value, onChange, ...props }, ref) => {
    const [hasValue, setHasValue] = React.useState(false)
    const selectId = id || `floating-select-${React.useId()}`

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "floating-input cursor-pointer appearance-none pr-10",
            hasValue && "has-value",
            className
          )}
          value={value}
          onChange={handleChange}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "12px",
            backgroundRepeat: "no-repeat",
          }}
          {...props}
        >
          {children}
        </select>
        <label htmlFor={selectId} className="floating-label">
          {label}
        </label>
      </div>
    )
  }
)

FloatingSelect.displayName = "FloatingSelect"

export { FloatingSelect }
