import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { BackgroundSelector } from "../BackgroundSelector"
import { backgrounds } from "@/lib/backgrounds"

describe("BackgroundSelector", () => {
  it("should render without crashing", () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it("should match snapshot", () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("should display all available backgrounds as options", () => {
    const mockOnChange = jest.fn()
    const { getAllByRole } = render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    const options = getAllByRole("option")
    expect(options).toHaveLength(backgrounds.length)
  })

  it("should show currently selected background value", () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <BackgroundSelector value={backgrounds[1]} onChange={mockOnChange} />
    )

    const select = container.querySelector("select")
    expect(select).toHaveValue(backgrounds[1].id)
  })

  it("should call onChange when background is selected", () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    const select = container.querySelector("select")!
    fireEvent.change(select, { target: { value: "solid-white" } })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: "solid-white" })
    )
  })

  it("should not call onChange when non-existent background is selected", () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <BackgroundSelector value={backgrounds[0]} onChange={mockOnChange} />
    )

    const select = container.querySelector("select")!
    fireEvent.change(select, { target: { value: "non-existent-bg" } })

    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
