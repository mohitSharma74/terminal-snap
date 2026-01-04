"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

const FloatingTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(({ className, label, id, value, onChange, ...props }, ref) => {
  const [hasValue, setHasValue] = React.useState(false)
  const textareaId = id || `floating-textarea-${React.useId()}`

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={textareaId}
        ref={ref}
        className={cn(
          "floating-input min-h-[300px] resize-y font-mono",
          hasValue && "has-value",
          className
        )}
        placeholder=" "
        value={value}
        onChange={handleChange}
        {...props}
      />
      <label htmlFor={textareaId} className="floating-label font-sans">
        {label}
      </label>
    </div>
  )
})

FloatingTextarea.displayName = "FloatingTextarea"

export { FloatingTextarea }
