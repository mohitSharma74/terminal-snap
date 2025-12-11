import { codeToHtml } from "shiki"
import type { ShellType } from "@/types"

export const detectShellType = (text: string): ShellType => {
  const lines = text.split("\n").slice(0, 10)
  
  for (const line of lines) {
    if (line.trim().match(/^\$|^#/)) {
      return "bash"
    }
    if (line.trim().startsWith(">")) {
      return "powershell"
    }
    if (line.includes("PS ") && line.includes(">")) {
      return "powershell"
    }
  }
  
  return "bash"
}

export const highlightSyntax = async (
  text: string,
  shellType: ShellType
): Promise<string> => {
  const detectedType = shellType === "auto" ? detectShellType(text) : shellType
  
  const languageMap: Record<ShellType, string> = {
    bash: "bash",
    zsh: "bash",
    powershell: "powershell",
    auto: "bash",
  }
  
  const language = languageMap[detectedType] || "bash"
  
  try {
    const html = await codeToHtml(text, {
      lang: language,
      theme: "github-dark",
    })
    return html
  } catch (error) {
    console.error("Syntax highlighting error:", error)
    return text
  }
}


