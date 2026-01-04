import React from 'react'

const AnsiToReact = ({ children }: { children: string; className?: string; linkify?: boolean }) => {
  return <span data-testid="ansi-to-react">{children}</span>
}

export default AnsiToReact
