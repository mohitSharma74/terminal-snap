import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { FloatingSelect } from "../floating-select"

describe("FloatingSelect", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  const renderFloatingSelect = (value = "option1") => {
    return render(
      <FloatingSelect
        label="Test Label"
        value={value}
        onChange={mockOnChange}
        id="test-select"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </FloatingSelect>
    )
  }

  it("should render without crashing", () => {
    const { container } = renderFloatingSelect()
    expect(container.firstChild).toBeInTheDocument()
  })

  it("should display the label", () => {
    renderFloatingSelect()
    expect(screen.getByText("Test Label")).toBeInTheDocument()
  })

  it("should display selected option label", () => {
    renderFloatingSelect("option2")
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveTextContent("Option 2")
  })

  it("should open dropdown menu when clicked", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Dropdown should be closed initially
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()

    // Click to open
    fireEvent.click(trigger)

    // Dropdown should be open
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("should display all options when dropdown is open", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    fireEvent.click(trigger)

    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent("Option 1")
    expect(options[1]).toHaveTextContent("Option 2")
    expect(options[2]).toHaveTextContent("Option 3")
  })

  it("should call onChange when an option is selected", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)

    // Click on option 2 - use getAllByRole to get options from dropdown
    const options = screen.getAllByRole("option")
    fireEvent.click(options[1]) // Option 2 is at index 1

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "option2" }),
      })
    )
  })

  it("should close dropdown after selecting an option", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    // Select option - use getAllByRole to get options from dropdown
    const options = screen.getAllByRole("option")
    fireEvent.click(options[1]) // Option 2 is at index 1

    // Dropdown should be closed
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("should close dropdown when clicking outside", async () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    // Click outside
    fireEvent.mouseDown(document.body)

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    })
  })

  it("should open/close dropdown with Enter key", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Open with Enter
    fireEvent.keyDown(trigger, { key: "Enter" })
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    // Close with Enter
    fireEvent.keyDown(trigger, { key: "Enter" })
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("should open/close dropdown with Space key", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Open with Space
    fireEvent.keyDown(trigger, { key: " " })
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    // Close with Space
    fireEvent.keyDown(trigger, { key: " " })
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("should close dropdown with Escape key", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    // Close with Escape
    fireEvent.keyDown(trigger, { key: "Escape" })
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("should navigate options with ArrowDown key", () => {
    renderFloatingSelect("option1")
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)

    // Press ArrowDown
    fireEvent.keyDown(trigger, { key: "ArrowDown" })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "option2" }),
      })
    )
  })

  it("should navigate options with ArrowUp key", () => {
    renderFloatingSelect("option2")
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)

    // Press ArrowUp
    fireEvent.keyDown(trigger, { key: "ArrowUp" })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "option1" }),
      })
    )
  })

  it("should not navigate beyond last option with ArrowDown", () => {
    renderFloatingSelect("option3")
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)

    // Press ArrowDown (should stay at option3)
    fireEvent.keyDown(trigger, { key: "ArrowDown" })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "option3" }),
      })
    )
  })

  it("should not navigate beyond first option with ArrowUp", () => {
    renderFloatingSelect("option1")
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)

    // Press ArrowUp (should stay at option1)
    fireEvent.keyDown(trigger, { key: "ArrowUp" })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "option1" }),
      })
    )
  })

  it("should mark selected option with correct class", () => {
    renderFloatingSelect("option2")
    const trigger = screen.getByRole("button")

    // Open dropdown
    fireEvent.click(trigger)

    const options = screen.getAllByRole("option")
    expect(options[1]).toHaveClass("custom-dropdown-option-selected")
    expect(options[0]).not.toHaveClass("custom-dropdown-option-selected")
    expect(options[2]).not.toHaveClass("custom-dropdown-option-selected")
  })

  it("should set aria-expanded attribute correctly", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    // Initially closed
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    // Open dropdown
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    // Close dropdown
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("should have proper accessibility attributes", () => {
    renderFloatingSelect()
    const trigger = screen.getByRole("button")

    expect(trigger).toHaveAttribute("aria-haspopup", "listbox")
    expect(trigger).toHaveAttribute("tabIndex", "0")
  })

  it("should contain hidden native select for form compatibility", () => {
    const { container } = renderFloatingSelect()
    const hiddenSelect = container.querySelector("select.sr-only")

    expect(hiddenSelect).toBeInTheDocument()
    expect(hiddenSelect).toHaveAttribute("aria-hidden", "true")
    expect(hiddenSelect).toHaveAttribute("tabIndex", "-1")
  })
})
