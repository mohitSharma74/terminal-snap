"use client"

import { useEffect, useState } from "react"
import { parseANSI } from "@/lib/ansi-parser"
import type { TerminalSettings } from "@/types"
import { cn } from "@/lib/utils"

interface TerminalPreviewProps {
  settings: TerminalSettings
  previewRef: React.RefObject<HTMLDivElement>
}

const renderOSChrome = (
  osChrome: TerminalSettings["osChrome"],
  title: string = "Terminal"
) => {
  switch (osChrome) {
    case "macos":
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-lg">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
            {title}
          </span>
        </div>
      )
    case "windows":
      return (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-lg">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {title}
          </span>
          <div className="flex gap-2">
            <div className="w-4 h-4 flex items-center justify-center text-gray-600 dark:text-gray-400">
              <span className="text-xs">−</span>
            </div>
            <div className="w-4 h-4 flex items-center justify-center text-gray-600 dark:text-gray-400">
              <span className="text-xs">□</span>
            </div>
            <div className="w-4 h-4 flex items-center justify-center text-gray-600 dark:text-gray-400">
              <span className="text-xs">×</span>
            </div>
          </div>
        </div>
      )
    case "linux":
      return (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-lg">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {title}
          </span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <div className="w-3 h-3 rounded-full bg-gray-400" />
          </div>
        </div>
      )
    default:
      return null
  }
}

export const TerminalPreview = ({
  settings,
  previewRef,
}: TerminalPreviewProps) => {
  const [renderedContent, setRenderedContent] = useState<React.ReactElement>(
    <div />
  )

  useEffect(() => {
    const content = parseANSI(settings.text || "", settings.theme)
    setRenderedContent(content)
  }, [settings.text, settings.theme])

  const hasChrome = settings.osChrome !== "none"
  const windowTitle = settings.windowTitle || "Terminal"

  const currentPadding = settings.padding[settings.orientation]
  const paddingStyle = `${currentPadding.vertical}px ${currentPadding.horizontal}px`
  const maxWidth = settings.orientation === "landscape" ? "1280px" : "448px"

  return (
    <div
      ref={previewRef}
      className="w-full mx-auto transition-all duration-300"
      style={{
        background: settings.background.css,
        padding: paddingStyle,
        borderRadius: hasChrome ? "0 0 8px 8px" : "8px",
        boxSizing: "content-box",
        maxWidth: maxWidth,
      }}
    >
      <div
        className={cn(
          "rounded-lg overflow-hidden",
          hasChrome && "rounded-t-none"
        )}
        style={{
          backgroundColor: settings.theme.background,
          boxShadow: settings.dropShadow ? "0 20px 68px rgba(0, 0, 0, 0.55)" : "none",
        }}
      >
        {hasChrome && renderOSChrome(settings.osChrome, windowTitle)}
        <div
          className="p-6 font-mono text-sm leading-relaxed overflow-auto transition-all duration-300"
          style={{
            backgroundColor: settings.theme.background,
            color: settings.theme.foreground,
            minHeight: settings.orientation === "landscape" ? "200px" : "600px",
            maxHeight: settings.orientation === "landscape" ? "350px" : "900px",
          }}
        >
          <div className="whitespace-pre-wrap break-words">
            {renderedContent}
          </div>
        </div>
      </div>
    </div>
  )
}

