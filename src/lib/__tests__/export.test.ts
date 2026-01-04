import { exportAsPNG } from "../export"
import { toPng } from "html-to-image"

// Mock html-to-image
jest.mock("html-to-image")

describe("export", () => {
  let mockElement: HTMLElement
  let mockLink: HTMLAnchorElement
  let mockClickFn: jest.Mock

  beforeEach(() => {
    // Create mock element with querySelectorAll
    mockElement = document.createElement("div")
    mockElement.innerHTML =
      '<div data-scrollable="true" style="max-height: 300px; overflow: auto;">Content</div>'

    // Mock document.createElement for <a> tag
    mockClickFn = jest.fn()
    mockLink = {
      download: "",
      href: "",
      click: mockClickFn,
    } as any

    jest.spyOn(document, "createElement").mockReturnValue(mockLink)

    // Reset mock
    ;(toPng as jest.Mock).mockResolvedValue("data:image/png;base64,testData")
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("exportAsPNG", () => {
    it("should call toPng with correct options", async () => {
      await exportAsPNG(mockElement)

      expect(toPng).toHaveBeenCalledWith(mockElement, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      })
    })

    it("should create download link with default filename", async () => {
      await exportAsPNG(mockElement)

      expect(mockLink.download).toBe("terminal-snap.png")
    })

    it("should create download link with custom filename", async () => {
      await exportAsPNG(mockElement, "custom-name.png")

      expect(mockLink.download).toBe("custom-name.png")
    })

    it("should set href to data URL from toPng", async () => {
      await exportAsPNG(mockElement)

      expect(mockLink.href).toBe("data:image/png;base64,testData")
    })

    it("should trigger download by clicking link", async () => {
      await exportAsPNG(mockElement)

      expect(mockClickFn).toHaveBeenCalled()
    })

    it("should temporarily remove maxHeight from scrollable elements", async () => {
      const scrollableEl = mockElement.querySelector(
        '[data-scrollable="true"]'
      ) as HTMLElement
      const originalMaxHeight = scrollableEl.style.maxHeight

      let maxHeightDuringExport = ""
      ;(toPng as jest.Mock).mockImplementation(async () => {
        maxHeightDuringExport = scrollableEl.style.maxHeight
        return "data:image/png;base64,testData"
      })

      await exportAsPNG(mockElement)

      expect(maxHeightDuringExport).toBe("none")
      expect(scrollableEl.style.maxHeight).toBe(originalMaxHeight)
    })

    it("should temporarily set overflow to visible on scrollable elements", async () => {
      const scrollableEl = mockElement.querySelector(
        '[data-scrollable="true"]'
      ) as HTMLElement
      const originalOverflow = scrollableEl.style.overflow

      let overflowDuringExport = ""
      ;(toPng as jest.Mock).mockImplementation(async () => {
        overflowDuringExport = scrollableEl.style.overflow
        return "data:image/png;base64,testData"
      })

      await exportAsPNG(mockElement)

      expect(overflowDuringExport).toBe("visible")
      expect(scrollableEl.style.overflow).toBe(originalOverflow)
    })

    it("should NOT restore styles if toPng fails (known limitation)", async () => {
      const scrollableEl = mockElement.querySelector(
        '[data-scrollable="true"]'
      ) as HTMLElement
      const originalMaxHeight = scrollableEl.style.maxHeight
      const originalOverflow = scrollableEl.style.overflow

      ;(toPng as jest.Mock).mockRejectedValue(new Error("Export failed"))

      await expect(exportAsPNG(mockElement)).rejects.toThrow("Export failed")

      // Note: Styles are NOT restored on failure (restoration is in try block, not finally)
      // This is a known limitation of the current implementation
      expect(scrollableEl.style.maxHeight).toBe("none")
      expect(scrollableEl.style.overflow).toBe("visible")
    })

    it("should throw error when toPng fails", async () => {
      ;(toPng as jest.Mock).mockRejectedValue(new Error("Export failed"))

      await expect(exportAsPNG(mockElement)).rejects.toThrow("Export failed")
    })

    it("should log error to console when export fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation()
      ;(toPng as jest.Mock).mockRejectedValue(new Error("Export failed"))

      await expect(exportAsPNG(mockElement)).rejects.toThrow()

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Export error:",
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })
  })
})
