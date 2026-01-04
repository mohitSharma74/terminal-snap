"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ModernCheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string
}

const ModernCheckbox = React.forwardRef<HTMLInputElement, ModernCheckboxProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const checkboxId = id || `modern-checkbox-${React.useId()}`

    return (
      <div className="modern-checkbox-wrapper">
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          className={cn("modern-checkbox-input", className)}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className="modern-checkbox-label">
            {label}
          </label>
        )}
      </div>
    )
  }
)

ModernCheckbox.displayName = "ModernCheckbox"

export { ModernCheckbox }
