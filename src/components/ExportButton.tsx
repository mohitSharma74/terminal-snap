"use client"

import { ModernButton } from "@/components/ui/modern-button"
import { exportAsPNG, copyToClipboard } from "@/lib/export"
import { useState } from "react"
import { Download, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement>
}

export const ExportButton = ({ previewRef }: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleExport = async () => {
    if (!previewRef.current) {
      return
    }

    setIsExporting(true)
    try {
      await exportAsPNG(previewRef.current, "terminal-snap.png")
    } catch (error) {
      console.error("Failed to export:", error)
      alert("Failed to export image. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopy = async () => {
    if (!previewRef.current) return

    setIsCopying(true)
    try {
      await copyToClipboard(previewRef.current)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      alert("Failed to copy image to clipboard.")
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <div className="flex gap-3">
      <div className="group relative flex-1">
        <div className="animate-gradient-rotate absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea] opacity-0 blur-sm transition duration-300 group-hover:opacity-100"></div>
        <ModernButton
          onClick={handleExport}
          disabled={isExporting}
          fullWidth
          className="relative w-full border-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg transition-all duration-200 hover:from-[#5568d3] hover:to-[#6a3f91] hover:shadow-xl"
          aria-label="Export as PNG"
        >
          <Download className="mr-2 size-4" />
          {isExporting ? "Exporting..." : "Download PNG"}
        </ModernButton>
      </div>

      <div className="flex-1">
        <ModernButton
          onClick={handleCopy}
          disabled={isCopying}
          fullWidth
          variant="secondary"
          className={cn(
            "border-gray-200 bg-white/50 text-gray-700 hover:bg-white/80 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-800/80",
            copySuccess && "text-green-600 dark:text-green-400"
          )}
          aria-label="Copy to Clipboard"
        >
          {copySuccess ? (
            <Check className="mr-2 size-4" />
          ) : (
            <Copy className="mr-2 size-4" />
          )}
          {copySuccess ? "Copied!" : "Copy Image"}
        </ModernButton>
      </div>
    </div>
  )
}
