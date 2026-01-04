"use client"

import { FloatingSelect } from "@/components/ui/floating-select"
import type { ShellType } from "@/types"

interface ShellTypeSelectorProps {
  value: ShellType
  onChange: (shellType: ShellType) => void
}

export const ShellTypeSelector = ({
  value,
  onChange,
}: ShellTypeSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ShellType)
  }

  return (
    <FloatingSelect
      id="shell-type-select"
      label="Shell Type"
      value={value}
      onChange={handleChange}
      aria-label="Select shell type"
    >
      <option value="auto">Auto-detect</option>
      <option value="bash">Bash</option>
      <option value="zsh">Zsh</option>
      <option value="powershell">PowerShell</option>
    </FloatingSelect>
  )
}
