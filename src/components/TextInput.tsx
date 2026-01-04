"use client"

import { FloatingTextarea } from "@/components/ui/floating-textarea"
import type { ChangeEvent } from "react"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
}

export const TextInput = ({ value, onChange }: TextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <FloatingTextarea
      id="terminal-input"
      label="Terminal Output"
      value={value}
      onChange={handleChange}
      aria-label="Terminal output input"
    />
  )
}
