"use client"

import { useState, useRef } from "react"
import { TextInput } from "@/components/TextInput"
import { ThemeSelector } from "@/components/ThemeSelector"
import { BackgroundSelector } from "@/components/BackgroundSelector"
import { OSChromeToggle } from "@/components/OSChromeToggle"
import { ShellTypeSelector } from "@/components/ShellTypeSelector"
import { TerminalPreview } from "@/components/TerminalPreview"
import { ExportButton } from "@/components/ExportButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getThemeByName } from "@/lib/themes"
import { getBackgroundById } from "@/lib/backgrounds"
import type { TerminalSettings } from "@/types"

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

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">TerminalSnap</h1>
          <p className="text-muted-foreground">
            Create beautiful terminal screenshots for your documentation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <TextInput
                  value={settings.text}
                  onChange={handleTextChange}
                />
                <ThemeSelector
                  value={settings.theme}
                  onChange={handleThemeChange}
                />
                <BackgroundSelector
                  value={settings.background}
                  onChange={handleBackgroundChange}
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
          <div className="flex items-start justify-center">
            <TerminalPreview settings={settings} previewRef={previewRef} />
          </div>
        </div>
      </div>
    </main>
  )
}


