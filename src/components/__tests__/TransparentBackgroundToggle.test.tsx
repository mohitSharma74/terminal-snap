import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { TransparentBackgroundToggle } from "../TransparentBackgroundToggle"

describe("TransparentBackgroundToggle", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it("should render without crashing", () => {
    const { container } = render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it("should match snapshot when unchecked", () => {
    const { container } = render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should match snapshot when checked", () => {
    const { container } = render(
      <TransparentBackgroundToggle value={true} onChange={mockOnChange} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should display the label", () => {
    render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )
    expect(screen.getByText("Transparent background")).toBeInTheDocument()
  })

  it("should display the section title", () => {
    render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )
    expect(screen.getByText("Transparency")).toBeInTheDocument()
  })

  it("should render checkbox in unchecked state when value is false", () => {
    render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )

    const checkbox = screen.getByRole("checkbox", {
      name: /transparent background/i,
    }) as HTMLInputElement
    expect(checkbox).not.toBeChecked()
  })

  it("should render checkbox in checked state when value is true", () => {
    render(<TransparentBackgroundToggle value={true} onChange={mockOnChange} />)

    const checkbox = screen.getByRole("checkbox", {
      name: /transparent background/i,
    }) as HTMLInputElement
    expect(checkbox).toBeChecked()
  })

  it("should call onChange with true when checkbox is checked", () => {
    render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )

    const checkbox = screen.getByRole("checkbox", {
      name: /transparent background/i,
    })
    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(true)
  })

  it("should call onChange with false when checkbox is unchecked", () => {
    render(<TransparentBackgroundToggle value={true} onChange={mockOnChange} />)

    const checkbox = screen.getByRole("checkbox", {
      name: /transparent background/i,
    })
    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(false)
  })

  it("should have proper accessibility attributes", () => {
    render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )

    const checkbox = screen.getByRole("checkbox", {
      name: /transparent background/i,
    })
    expect(checkbox).toHaveAttribute(
      "aria-label",
      "Toggle transparent background for outer padding area"
    )
  })

  it("should toggle state multiple times", () => {
    const { rerender } = render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )

    const checkbox = screen.getByRole("checkbox", {
      name: /transparent background/i,
    })

    // First toggle (false -> true)
    fireEvent.click(checkbox)
    expect(mockOnChange).toHaveBeenCalledWith(true)

    // Rerender with new value
    rerender(
      <TransparentBackgroundToggle value={true} onChange={mockOnChange} />
    )

    // Second toggle (true -> false)
    fireEvent.click(checkbox)
    expect(mockOnChange).toHaveBeenCalledWith(false)

    expect(mockOnChange).toHaveBeenCalledTimes(2)
  })

  it("should have correct id for the checkbox", () => {
    render(
      <TransparentBackgroundToggle value={false} onChange={mockOnChange} />
    )

    const checkbox = screen.getByRole("checkbox", {
      name: /transparent background/i,
    })
    expect(checkbox).toHaveAttribute("id", "transparent-background-toggle")
  })
})
