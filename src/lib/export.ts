import { toPng } from "html-to-image"

export const exportAsPNG = async (
  element: HTMLElement,
  filename: string = "terminal-snap.png"
): Promise<void> => {
  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    })
    
    const link = document.createElement("a")
    link.download = filename
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error("Export error:", error)
    throw error
  }
}


