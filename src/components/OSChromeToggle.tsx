"use client"

import { FloatingSelect } from "@/components/ui/floating-select"
import { FloatingInput } from "@/components/ui/floating-input"
import type { OSChrome } from "@/types"

interface OSChromeToggleProps {
  value: OSChrome
  onChange: (osChrome: OSChrome) => void
  windowTitle?: string
  onTitleChange?: (title: string) => void
}

export const OSChromeToggle = ({
  value,
  onChange,
  windowTitle,
  onTitleChange,
}: OSChromeToggleProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as OSChrome)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTitleChange) {
      onTitleChange(e.target.value)
    }
  }

  return (
    <div className="space-y-4">
      <FloatingSelect
        id="os-chrome-select"
        label="Window Style"
        value={value}
        onChange={handleChange}
        aria-label="Select OS window style"
      >
        <option value="macos">macOS</option>
        <option value="windows">Windows</option>
        <option value="linux">Linux</option>
        <option value="none">None</option>
      </FloatingSelect>
      {value !== "none" && (
        <FloatingInput
          id="window-title"
          label="Window Title (Optional)"
          value={windowTitle || ""}
          onChange={handleTitleChange}
          placeholder="Terminal"
          aria-label="Window title"
        />
      )}
    </div>
  )
}
