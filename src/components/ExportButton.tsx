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
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="w-full"
      aria-label="Export as PNG"
    >
      <Download className="mr-2 h-4 w-4" />
      {isExporting ? "Exporting..." : "Export as PNG"}
    </Button>
  )
}


