"use client"

import { useState, useRef } from "react"
import { TextInput } from "@/components/TextInput"
import { ThemeSelector } from "@/components/ThemeSelector"
import { BackgroundSelector } from "@/components/BackgroundSelector"
import { OSChromeToggle } from "@/components/OSChromeToggle"
import { ShellTypeSelector } from "@/components/ShellTypeSelector"
import { OrientationSelector } from "@/components/OrientationSelector"
import { PaddingSelector } from "@/components/PaddingSelector"
import { DropShadowToggle } from "@/components/DropShadowToggle"
import { TerminalPreview } from "@/components/TerminalPreview"
import { ExportButton } from "@/components/ExportButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getThemeByName } from "@/lib/themes"
import { getBackgroundById } from "@/lib/backgrounds"
import type { TerminalSettings, PaddingConfig } from "@/types"

const defaultTerminalOutput = `$ npm install -g terminal-snap
npm WARN deprecated package@1.0.0: This package is no longer maintained
added 245 packages in 15s

$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/components/TerminalPreview.tsx

$ git add .
$ git commit -m "feat: add terminal preview component"
[main a1b2c3d] feat: add terminal preview component
 1 file changed, 45 insertions(+), 12 deletions(-)

$ git push
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.
To https://github.com/user/terminal-snap.git
   a1b2c3d..f4e5d6a  main -> main`

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null)

  const [settings, setSettings] = useState<TerminalSettings>({
    text: defaultTerminalOutput,
    theme: getThemeByName("Dracula"),
    background: getBackgroundById("gradient-purple"),
    osChrome: "macos",
    shellType: "auto",
    windowTitle: "Terminal",
    orientation: "landscape",
    padding: {
      landscape: {
        horizontal: 32,
        vertical: 24,
      },
      portrait: {
        horizontal: 20,
        vertical: 32,
      },
    },
    dropShadow: true,
  })

  const handleTextChange = (text: string) => {
    setSettings((prev) => ({ ...prev, text }))
  }

  const handleThemeChange = (theme: typeof settings.theme) => {
    setSettings((prev) => ({ ...prev, theme }))
  }

  const handleBackgroundChange = (background: typeof settings.background) => {
    setSettings((prev) => ({ ...prev, background }))
  }

  const handleOSChromeChange = (osChrome: typeof settings.osChrome) => {
    setSettings((prev) => ({ ...prev, osChrome }))
  }

  const handleShellTypeChange = (shellType: typeof settings.shellType) => {
    setSettings((prev) => ({ ...prev, shellType }))
  }

  const handleTitleChange = (windowTitle: string) => {
    setSettings((prev) => ({ ...prev, windowTitle }))
  }

  const handleOrientationChange = (
    orientation: typeof settings.orientation
  ) => {
    setSettings((prev) => ({ ...prev, orientation }))
  }

  const handlePaddingChange = (padding: PaddingConfig) => {
    setSettings((prev) => ({
      ...prev,
      padding: {
        ...prev.padding,
        [prev.orientation]: padding,
      },
    }))
  }

  const handleDropShadowChange = (dropShadow: boolean) => {
    setSettings((prev) => ({ ...prev, dropShadow }))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center">
            <img
              src="/hero-with-subtitle.svg"
              alt="TerminalSnap"
              className="mx-auto mb-1 w-1/2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <OrientationSelector
                  value={settings.orientation}
                  onChange={handleOrientationChange}
                />
                <PaddingSelector
                  orientation={settings.orientation}
                  value={settings.padding[settings.orientation]}
                  onChange={handlePaddingChange}
                />
                <TextInput value={settings.text} onChange={handleTextChange} />
                <ThemeSelector
                  value={settings.theme}
                  onChange={handleThemeChange}
                />
                <BackgroundSelector
                  value={settings.background}
                  onChange={handleBackgroundChange}
                />
                <DropShadowToggle
                  value={settings.dropShadow}
                  onChange={handleDropShadowChange}
                />
                <OSChromeToggle
                  value={settings.osChrome}
                  onChange={handleOSChromeChange}
                  windowTitle={settings.windowTitle}
                  onTitleChange={handleTitleChange}
                />
                <ShellTypeSelector
                  value={settings.shellType}
                  onChange={handleShellTypeChange}
                />
                <ExportButton previewRef={previewRef} />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex items-center justify-center">
            <TerminalPreview settings={settings} previewRef={previewRef} />
          </div>
        </div>
      </div>
    </main>
  )
}
