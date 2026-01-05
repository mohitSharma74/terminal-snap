"use client"

import { ModernButton } from "@/components/ui/modern-button"
import { exportAsPNG } from "@/lib/export"
import { useState } from "react"
import { Download } from "lucide-react"

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement>
}

export const ExportButton = ({ previewRef }: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false)

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

  return (
    <div className="group relative w-full">
      <div className="animate-gradient-rotate absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea] opacity-0 blur-sm transition duration-300 group-hover:opacity-100"></div>
      <ModernButton
        onClick={handleExport}
        disabled={isExporting}
        fullWidth
        className="relative w-full border-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg transition-all duration-200 hover:from-[#5568d3] hover:to-[#6a3f91] hover:shadow-xl"
        aria-label="Export as PNG"
      >
        <Download className="mr-2 size-4" />
        {isExporting ? "Exporting..." : "Export as PNG"}
      </ModernButton>
    </div>
  )
}
