"use client"

import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
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
    <div className="space-y-2">
      <Label htmlFor="shell-type-select">Shell Type</Label>
      <Select
        id="shell-type-select"
        value={value}
        onChange={handleChange}
        aria-label="Select shell type"
      >
        <option value="auto">Auto-detect</option>
        <option value="bash">Bash</option>
        <option value="zsh">Zsh</option>
        <option value="powershell">PowerShell</option>
      </Select>
    </div>
  )
}


