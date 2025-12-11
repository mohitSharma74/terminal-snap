"use client"

import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onTitleChange) {
      onTitleChange(e.target.value)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="os-chrome-select">Window Style</Label>
        <Select
          id="os-chrome-select"
          value={value}
          onChange={handleChange}
          aria-label="Select OS window style"
        >
          <option value="macos">macOS</option>
          <option value="windows">Windows</option>
          <option value="linux">Linux</option>
          <option value="none">None</option>
        </Select>
      </div>
      {value !== "none" && (
        <div className="space-y-2">
          <Label htmlFor="window-title">Window Title (Optional)</Label>
          <Textarea
            id="window-title"
            value={windowTitle || ""}
            onChange={handleTitleChange}
            placeholder="Terminal"
            className="min-h-[60px]"
            aria-label="Window title"
          />
        </div>
      )}
    </div>
  )
}


