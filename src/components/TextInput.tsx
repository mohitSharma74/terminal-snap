"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ChangeEvent } from "react"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
}

const exampleTerminalOutput = `$ npm install -g terminal-snap
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

export const TextInput = ({ value, onChange }: TextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="terminal-input">Terminal Output</Label>
      <Textarea
        id="terminal-input"
        value={value}
        onChange={handleChange}
        placeholder={exampleTerminalOutput}
        className="min-h-[300px] font-mono text-sm"
        aria-label="Terminal output input"
      />
    </div>
  )
}


