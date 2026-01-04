"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
}

const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  (
    { className, variant = "primary", fullWidth = false, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "modern-button",
          variant === "primary" && "modern-button-primary",
          variant === "secondary" && "modern-button-secondary",
          variant === "outline" && "modern-button-outline",
          fullWidth && "modern-button-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

ModernButton.displayName = "ModernButton"

export { ModernButton }
