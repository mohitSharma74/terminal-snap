import { toPng } from "html-to-image"

export const exportAsPNG = async (
  element: HTMLElement,
  filename: string = "terminal-snap.png"
): Promise<void> => {
  try {
    // Find all scrollable elements within the preview and temporarily adjust them
    const scrollableElements = element.querySelectorAll('[data-scrollable="true"]')
    const originalStyles: { element: HTMLElement; maxHeight: string; overflow: string }[] = []
    
    // Store original styles and remove constraints
    scrollableElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      originalStyles.push({
        element: htmlEl,
        maxHeight: htmlEl.style.maxHeight,
        overflow: htmlEl.style.overflow,
      })
      htmlEl.style.maxHeight = 'none'
      htmlEl.style.overflow = 'visible'
    })

    // Capture the image with full content visible
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      cacheBust: true,
    })
    
    // Restore original styles
    originalStyles.forEach(({ element, maxHeight, overflow }) => {
      element.style.maxHeight = maxHeight
      element.style.overflow = overflow
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


