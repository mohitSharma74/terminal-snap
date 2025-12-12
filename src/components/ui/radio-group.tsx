"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
  name: string
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined)

const useRadioGroup = () => {
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup")
  }
  return context
}

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
  name?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, name = "radio-group", children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn("grid gap-2", className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  id: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, id, value, ...props }, ref) => {
    const { value: groupValue, onValueChange, name } = useRadioGroup()
    const isChecked = value === groupValue

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(event.target.value)
    }

    return (
      <input
        ref={ref}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className={cn(
          "h-4 w-4 rounded-full border-2 border-input focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
          isChecked && "border-primary bg-primary",
          className
        )}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
