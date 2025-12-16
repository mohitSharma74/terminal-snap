"use client"

import { Button } from "@/components/ui/button"
import { exportAsPNG } from "@/lib/export"
import { useState, useRef } from "react"
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
    <div className="relative w-full group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea] rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 animate-gradient-rotate blur-sm"></div>
      <Button
        onClick={handleExport}
        disabled={isExporting}
        className="relative w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#5568d3] hover:to-[#6a3f91] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Export as PNG"
      >
        <Download className="mr-2 h-4 w-4" />
        {isExporting ? "Exporting..." : "Export as PNG"}
      </Button>
    </div>
  )
}


