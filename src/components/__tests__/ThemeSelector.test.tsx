import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ThemeSelector } from '../ThemeSelector'
import { themes } from '@/lib/themes'

describe('ThemeSelector', () => {
  it('should render without crashing', () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <ThemeSelector value={themes[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <ThemeSelector value={themes[0]} onChange={mockOnChange} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display all available themes as options', () => {
    const mockOnChange = jest.fn()
    const { getAllByRole } = render(
      <ThemeSelector value={themes[0]} onChange={mockOnChange} />
    )

    const options = getAllByRole('option')
    expect(options).toHaveLength(themes.length)
  })

  it('should show currently selected theme value', () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <ThemeSelector value={themes[1]} onChange={mockOnChange} />
    )

    const select = container.querySelector('select')
    expect(select).toHaveValue(themes[1].name)
  })

  it('should call onChange when theme is selected', () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <ThemeSelector value={themes[0]} onChange={mockOnChange} />
    )

    const select = container.querySelector('select')!
    fireEvent.change(select, { target: { value: 'Nord' } })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Nord' })
    )
  })

  it('should not call onChange when non-existent theme is selected', () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <ThemeSelector value={themes[0]} onChange={mockOnChange} />
    )

    const select = container.querySelector('select')!
    fireEvent.change(select, { target: { value: 'NonExistentTheme' } })

    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
