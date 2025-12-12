"use client"

import React from "react"
import Convert from "ansi-to-html"
import type { TerminalTheme } from "@/types"

export const parseANSI = (
  text: string,
  theme: TerminalTheme
): React.ReactElement => {
  const convert = new Convert({
    fg: theme.foreground,
    bg: theme.background,
    colors: {
      0: theme.palette.black,
      1: theme.palette.red,
      2: theme.palette.green,
      3: theme.palette.yellow,
      4: theme.palette.blue,
      5: theme.palette.magenta,
      6: theme.palette.cyan,
      7: theme.palette.white,
      8: theme.palette.brightBlack,
      9: theme.palette.brightRed,
      10: theme.palette.brightGreen,
      11: theme.palette.brightYellow,
      12: theme.palette.brightBlue,
      13: theme.palette.brightMagenta,
      14: theme.palette.brightCyan,
      15: theme.palette.brightWhite,
    },
    newline: false,
    escapeXML: false,
    stream: false,
  })
  
  const html = convert.toHtml(text)
  
  return (
    <div
      style={{ 
        color: theme.foreground,
        backgroundColor: theme.background,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

