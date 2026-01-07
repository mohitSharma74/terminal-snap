import React from "react"
import { render } from "@testing-library/react"
import { TerminalPreview } from "../TerminalPreview"
import { themes } from "@/lib/themes"
import { backgrounds } from "@/lib/backgrounds"
import type { TerminalSettings } from "@/types"

// Mock dependencies
jest.mock("@/lib/ansi-parser")
jest.mock("ansi-to-react")

const mockSettings: TerminalSettings = {
  text: "$ npm install\n$ npm run dev",
  theme: themes[0],
  background: backgrounds[0],
  osChrome: "macos",
  shellType: "bash",
  windowTitle: "Terminal",
  orientation: "landscape",
  padding: {
    landscape: { horizontal: 80, vertical: 80 },
    portrait: { horizontal: 40, vertical: 80 },
  },
  dropShadow: true,
  transparentBackground: false,
}

describe("TerminalPreview", () => {
  it("should render without crashing", () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <TerminalPreview settings={mockSettings} previewRef={ref} />
    )
    expect(container.firstChild).toBeDefined()
  })

  it("should match snapshot with macOS chrome", () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <TerminalPreview settings={mockSettings} previewRef={ref} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should match snapshot with Windows chrome", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, osChrome: "windows" as const }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should match snapshot with Linux chrome", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, osChrome: "linux" as const }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should match snapshot with no chrome", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, osChrome: "none" as const }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should match snapshot with drop shadow disabled", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, dropShadow: false }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should match snapshot in portrait orientation", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, orientation: "portrait" as const }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should apply correct theme background color", () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <TerminalPreview settings={mockSettings} previewRef={ref} />
    )

    const terminalContent = container.querySelector(".font-mono")
    expect(terminalContent).toHaveStyle({
      backgroundColor: mockSettings.theme.background,
      color: mockSettings.theme.foreground,
    })
  })

  it("should apply correct padding based on orientation", () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <TerminalPreview settings={mockSettings} previewRef={ref} />
    )

    const previewContainer = container.firstChild as HTMLElement
    expect(previewContainer).toHaveStyle({
      padding: "80px 80px",
    })
  })

  it("should display window title when chrome is enabled", () => {
    const ref = React.createRef<HTMLDivElement>()
    const { getByText } = render(
      <TerminalPreview settings={mockSettings} previewRef={ref} />
    )

    expect(getByText("Terminal")).toBeInTheDocument()
  })

  it("should use default title when windowTitle is not provided", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, windowTitle: undefined }
    const { getByText } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )

    expect(getByText("Terminal")).toBeInTheDocument()
  })

  it("should apply background CSS when transparentBackground is false", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, transparentBackground: false }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )

    const previewContainer = container.firstChild as HTMLElement
    expect(previewContainer).toHaveStyle({
      background: mockSettings.background.css,
    })
  })

  it("should apply transparent background when transparentBackground is true", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, transparentBackground: true }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )

    const previewContainer = container.firstChild as HTMLElement
    expect(previewContainer).toHaveStyle({
      background: "transparent",
    })
  })

  it("should match snapshot with transparent background enabled", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, transparentBackground: true }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should keep terminal window background solid even when outer is transparent", () => {
    const ref = React.createRef<HTMLDivElement>()
    const settings = { ...mockSettings, transparentBackground: true }
    const { container } = render(
      <TerminalPreview settings={settings} previewRef={ref} />
    )

    // The terminal content should still have theme background
    const terminalContent = container.querySelector(".font-mono")
    expect(terminalContent).toHaveStyle({
      backgroundColor: mockSettings.theme.background,
    })
  })
})
