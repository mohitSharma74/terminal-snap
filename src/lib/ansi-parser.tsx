import React from "react"
import AnsiToReact from "ansi-to-react"
import type { TerminalTheme } from "@/types"

export const parseANSI = (
  text: string,
  theme: TerminalTheme
): React.ReactElement => {
  return (
    <div style={{ color: theme.foreground }}>
      <AnsiToReact className="ansi" linkify={false}>
        {text}
      </AnsiToReact>
    </div>
  )
}
