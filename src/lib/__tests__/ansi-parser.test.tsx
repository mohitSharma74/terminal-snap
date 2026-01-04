import React from "react"
import { render } from "@testing-library/react"
import { parseANSI } from "../ansi-parser"
import { themes } from "../themes"

// Mock ansi-to-react
jest.mock("ansi-to-react")

describe("ansi-parser", () => {
  describe("parseANSI", () => {
    it("should return a React element", () => {
      const theme = themes[0]
      const result = parseANSI("test text", theme)
      expect(React.isValidElement(result)).toBe(true)
    })

    it("should apply theme foreground color to wrapper div", () => {
      const theme = themes[0]
      const { container } = render(parseANSI("test", theme))
      const wrapper = container.querySelector("div")

      expect(wrapper).toHaveStyle({ color: theme.foreground })
    })

    it("should pass text content to AnsiToReact component", () => {
      const theme = themes[0]
      const text = "sample terminal output"
      const { getByTestId } = render(parseANSI(text, theme))

      const ansiElement = getByTestId("ansi-to-react")
      expect(ansiElement).toHaveTextContent(text)
    })

    it("should handle empty text", () => {
      const theme = themes[0]
      const { container } = render(parseANSI("", theme))

      expect(container.querySelector("div")).toBeInTheDocument()
    })

    it("should handle different themes", () => {
      themes.forEach((theme) => {
        const { container } = render(parseANSI("test", theme))
        const wrapper = container.querySelector("div")
        expect(wrapper).toHaveStyle({ color: theme.foreground })
      })
    })

    it("should handle text with ANSI escape codes", () => {
      const theme = themes[0]
      const text = "\x1b[31mRed text\x1b[0m"
      const { getByTestId } = render(parseANSI(text, theme))

      expect(getByTestId("ansi-to-react")).toHaveTextContent(text)
    })

    it("should handle multiline text", () => {
      const theme = themes[0]
      const text = "line 1\nline 2\nline 3"
      const { getByTestId } = render(parseANSI(text, theme))

      // Note: toHaveTextContent doesn't preserve newlines in the comparison
      expect(getByTestId("ansi-to-react")).toBeInTheDocument()
      expect(getByTestId("ansi-to-react").textContent).toBe(text)
    })
  })
})
