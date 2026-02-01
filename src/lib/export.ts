import { toPng, toBlob } from "html-to-image"

export const copyToClipboard = async (element: HTMLElement): Promise<void> => {
  try {
    // Find all scrollable elements within the preview and temporarily adjust them
    const scrollableElements = element.querySelectorAll(
      '[data-scrollable="true"]'
    )
    const originalStyles: {
      element: HTMLElement
      maxHeight: string
      overflow: string
    }[] = []

    // Store original styles and remove constraints
    scrollableElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      originalStyles.push({
        element: htmlEl,
        maxHeight: htmlEl.style.maxHeight,
        overflow: htmlEl.style.overflow,
      })
      htmlEl.style.maxHeight = "none"
      htmlEl.style.overflow = "visible"
    })

    const blob = await toBlob(element, {
      pixelRatio: 2,
      quality: 1.0,
      backgroundColor: "#ffffff",
      cacheBust: true,
    })

    // Restore original styles
    originalStyles.forEach(({ element, maxHeight, overflow }) => {
      element.style.maxHeight = maxHeight
      element.style.overflow = overflow
    })

    if (!blob) {
      throw new Error("Failed to generate image blob")
    }

    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
  } catch (error) {
    console.error("Copy to clipboard failed:", error)
    throw error
  }
}

export const exportAsPNG = async (
  element: HTMLElement,
  filename: string = "terminal-snap.png"
): Promise<void> => {
  try {
    // Find all scrollable elements within the preview and temporarily adjust them
    const scrollableElements = element.querySelectorAll(
      '[data-scrollable="true"]'
    )
    const originalStyles: {
      element: HTMLElement
      maxHeight: string
      overflow: string
    }[] = []

    // Store original styles and remove constraints
    scrollableElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      originalStyles.push({
        element: htmlEl,
        maxHeight: htmlEl.style.maxHeight,
        overflow: htmlEl.style.overflow,
      })
      htmlEl.style.maxHeight = "none"
      htmlEl.style.overflow = "visible"
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
