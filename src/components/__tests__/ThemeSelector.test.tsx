import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { ThemeSelector } from "../ThemeSelector"
import { themes } from "@/lib/themes"

describe("ThemeSelector", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it("should render without crashing", () => {
    const { container } = render(
      <ThemeSelector value={themes[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it("should match snapshot", () => {
    const { container } = render(
      <ThemeSelector value={themes[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should display all available themes as options when dropdown is opened", () => {
    render(<ThemeSelector value={themes[0]} onChange={mockOnChange} />)

    // Open the custom dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Check that all theme options are displayed in the listbox
    const listbox = screen.getByRole("listbox")
    const options = screen.getAllByRole("option")

    // Should have same number of options as themes (excluding hidden select options)
    expect(options.length).toBeGreaterThanOrEqual(themes.length)

    // Verify each theme name appears in options
    themes.forEach((theme, index) => {
      expect(options[index]).toHaveTextContent(theme.name)
    })
  })

  it("should show currently selected theme value", () => {
    render(<ThemeSelector value={themes[1]} onChange={mockOnChange} />)

    // The selected theme name should be displayed in the trigger button
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveTextContent(themes[1].name)

    // Also check the hidden native select has the correct value
    const hiddenSelect = document.querySelector("select.sr-only") as HTMLSelectElement
    expect(hiddenSelect).toHaveValue(themes[1].name)
  })

  it("should call onChange when theme is selected via custom dropdown", () => {
    render(<ThemeSelector value={themes[0]} onChange={mockOnChange} />)

    // Open the dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Click on "Nord" theme option (index 1 in themes array)
    const options = screen.getAllByRole("option")
    const nordIndex = themes.findIndex(t => t.name === "Nord")
    fireEvent.click(options[nordIndex])

    // Verify onChange was called with the Nord theme
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Nord" })
    )
  })

  it("should close dropdown after selecting a theme", () => {
    render(<ThemeSelector value={themes[0]} onChange={mockOnChange} />)

    // Open the dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Verify dropdown is open
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    // Select a theme
    const options = screen.getAllByRole("option")
    const nordIndex = themes.findIndex(t => t.name === "Nord")
    fireEvent.click(options[nordIndex])

    // Verify dropdown is closed
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("should not call onChange when non-existent theme is selected", () => {
    render(<ThemeSelector value={themes[0]} onChange={mockOnChange} />)

    // Manually trigger the hidden select with non-existent theme
    const hiddenSelect = document.querySelector("select.sr-only") as HTMLSelectElement
    fireEvent.change(hiddenSelect, { target: { value: "NonExistentTheme" } })

    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it("should have proper accessibility label", () => {
    render(<ThemeSelector value={themes[0]} onChange={mockOnChange} />)

    expect(screen.getByLabelText("Terminal Theme")).toBeInTheDocument()
  })

  it("should open dropdown with keyboard (Enter key)", () => {
    render(<ThemeSelector value={themes[0]} onChange={mockOnChange} />)

    const trigger = screen.getByRole("button")
    fireEvent.keyDown(trigger, { key: "Enter" })

    // Dropdown should be open
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("should mark currently selected theme in dropdown", () => {
    render(<ThemeSelector value={themes[1]} onChange={mockOnChange} />)

    // Open dropdown
    const trigger = screen.getByRole("button")
    fireEvent.click(trigger)

    // Get all option elements
    const options = screen.getAllByRole("option")

    // The second option (themes[1]) should have the selected class
    expect(options[1]).toHaveClass("custom-dropdown-option-selected")
  })
})
