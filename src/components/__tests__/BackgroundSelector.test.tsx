import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { BackgroundSelector } from "../BackgroundSelector"
import { backgrounds } from "@/lib/backgrounds"

describe("BackgroundSelector", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it("should render without crashing", () => {
    const { container } = render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it("should match snapshot", () => {
    const { container } = render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should display all available backgrounds as options when dropdown is opened", () => {
    render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    // Open the custom dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Check that all background options are displayed in the listbox
    screen.getByRole("listbox")
    const options = screen.getAllByRole("option")

    // Should have same number of options as backgrounds (excluding hidden select options)
    expect(options.length).toBeGreaterThanOrEqual(backgrounds.length)

    // Verify each background name appears in options
    backgrounds.forEach((bg, index) => {
      expect(options[index]).toHaveTextContent(bg.name)
    })
  })

  it("should show currently selected background value", () => {
    render(
      <BackgroundSelector value={backgrounds[1]} onChange={mockOnChange} />
    )

    // The selected background name should be displayed in the trigger button
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveTextContent(backgrounds[1].name)

    // Also check the hidden native select has the correct value
    const hiddenSelect = document.querySelector(
      "select.sr-only"
    ) as HTMLSelectElement
    expect(hiddenSelect).toHaveValue(backgrounds[1].id)
  })

  it("should call onChange when background is selected via custom dropdown", () => {
    render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    // Find a background to select (using first available background that's not already selected)
    const targetBg = backgrounds[1]

    // Open the dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Click on the background option (index 1 in backgrounds array)
    const options = screen.getAllByRole("option")
    fireEvent.click(options[1])

    // Verify onChange was called with the correct background
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: targetBg.id })
    )
  })

  it("should close dropdown after selecting a background", () => {
    render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    // Open the dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Verify dropdown is open
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    // Select a background
    const options = screen.getAllByRole("option")
    fireEvent.click(options[1])

    // Verify dropdown is closed
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("should not call onChange when non-existent background is selected", () => {
    render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    // Manually trigger the hidden select with non-existent background
    const hiddenSelect = document.querySelector(
      "select.sr-only"
    ) as HTMLSelectElement
    fireEvent.change(hiddenSelect, { target: { value: "non-existent-bg" } })

    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it("should have proper accessibility label", () => {
    render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    expect(screen.getByLabelText("Background")).toBeInTheDocument()
  })

  it("should open dropdown with keyboard (Enter key)", () => {
    render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    const trigger = screen.getByRole("button")
    fireEvent.keyDown(trigger, { key: "Enter" })

    // Dropdown should be open
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("should mark currently selected background in dropdown", () => {
    render(
      <BackgroundSelector value={backgrounds[1]} onChange={mockOnChange} />
    )

    // Open dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Get all option elements
    const options = screen.getAllByRole("option")

    // The second option (backgrounds[1]) should have the selected class
    expect(options[1]).toHaveClass("custom-dropdown-option-selected")
  })
})
