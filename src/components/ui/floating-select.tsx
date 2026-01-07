"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

interface SelectOption {
  value: string
  label: string
}

const FloatingSelect = React.forwardRef<HTMLSelectElement, FloatingSelectProps>(
  (
    { className, label, id, children, value, onChange, disabled, ...props },
    ref
  ) => {
    const [hasValue, setHasValue] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value || "")
    const generatedId = React.useId()
    const selectId = id || `floating-select-${generatedId}`
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // Extract options from children
    const options: SelectOption[] = React.useMemo(() => {
      const opts: SelectOption[] = []
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === "option") {
          opts.push({
            value: String(child.props.value),
            label: String(child.props.children),
          })
        }
      })
      return opts
    }, [children])

    // Find selected option label
    const selectedLabel =
      options.find((opt) => opt.value === selectedValue)?.label || ""

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen])

    // Update internal state when value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(String(value))
        setHasValue(String(value) !== "")
      }
    }, [value])

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue)
      setHasValue(optionValue !== "")
      setIsOpen(false)

      // Create synthetic event for onChange
      if (onChange) {
        const syntheticEvent = {
          target: { value: optionValue },
          currentTarget: { value: optionValue },
        } as React.ChangeEvent<HTMLSelectElement>
        onChange(syntheticEvent)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setIsOpen(!isOpen)
      } else if (e.key === "Escape") {
        setIsOpen(false)
      } else if (e.key === "ArrowDown" && isOpen) {
        e.preventDefault()
        const currentIndex = options.findIndex(
          (opt) => opt.value === selectedValue
        )
        const nextIndex = Math.min(currentIndex + 1, options.length - 1)
        handleSelect(options[nextIndex].value)
      } else if (e.key === "ArrowUp" && isOpen) {
        e.preventDefault()
        const currentIndex = options.findIndex(
          (opt) => opt.value === selectedValue
        )
        const prevIndex = Math.max(currentIndex - 1, 0)
        handleSelect(options[prevIndex].value)
      }
    }

    return (
      <div className="floating-label-group" ref={dropdownRef}>
        {/* Hidden native select for form compatibility */}
        <select
          ref={ref}
          id={selectId}
          value={selectedValue}
          onChange={onChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          disabled={disabled}
          {...props}
        >
          {children}
        </select>

        {/* Custom dropdown trigger */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          className={cn(
            "floating-input relative cursor-pointer appearance-none pr-10",
            hasValue && "has-value",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
        >
          <span className="block truncate">{selectedLabel}</span>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className={cn(
                "transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            >
              <path fill="#06b6d4" d="M6 9L1 4h10z" />
            </svg>
          </span>
        </div>

        {/* Custom dropdown menu */}
        {isOpen && (
          <div className="custom-dropdown-menu">
            <ul role="listbox" className="custom-dropdown-list">
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  className={cn(
                    "custom-dropdown-option",
                    option.value === selectedValue &&
                      "custom-dropdown-option-selected"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <label
          htmlFor={selectId}
          className="floating-label pointer-events-none"
        >
          {label}
        </label>
      </div>
    )
  }
)

FloatingSelect.displayName = "FloatingSelect"

export { FloatingSelect }
