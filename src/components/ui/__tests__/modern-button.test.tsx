import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModernButton } from '../modern-button'

describe('ModernButton', () => {
  it('should render without crashing', () => {
    const { container } = render(<ModernButton>Click me</ModernButton>)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should match snapshot with default variant', () => {
    const { container } = render(<ModernButton>Click me</ModernButton>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match snapshot with secondary variant', () => {
    const { container } = render(<ModernButton variant="secondary">Click me</ModernButton>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match snapshot with outline variant', () => {
    const { container } = render(<ModernButton variant="outline">Click me</ModernButton>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match snapshot with fullWidth prop', () => {
    const { container } = render(<ModernButton fullWidth>Click me</ModernButton>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ModernButton onClick={handleClick}>Click me</ModernButton>
    )

    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply custom className', () => {
    const { container } = render(
      <ModernButton className="custom-class">Click me</ModernButton>
    )

    const button = container.querySelector('button')
    expect(button).toHaveClass('custom-class')
  })

  it('should be disabled when disabled prop is true', () => {
    const { container } = render(<ModernButton disabled>Click me</ModernButton>)

    const button = container.querySelector('button')
    expect(button).toBeDisabled()
  })

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<ModernButton ref={ref}>Click me</ModernButton>)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
