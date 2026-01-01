import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import ButtonGroup from '@packages/components/molecules/ButtonGroup'
import Button from '@packages/components/atoms/Button'

describe('ButtonGroup molecule', () => {
  it('renders children correctly', () => {
    render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    )

    expect(screen.getByText('Button 1')).toBeInTheDocument()
    expect(screen.getByText('Button 2')).toBeInTheDocument()
  })

  it('renders with horizontal orientation by default', () => {
    render(
      <ButtonGroup data-testid="button-group">
        <Button>Button 1</Button>
      </ButtonGroup>
    )

    const group = screen.getByTestId('button-group')
    expect(group).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('renders with vertical orientation when specified', () => {
    render(
      <ButtonGroup orientation="vertical" data-testid="button-group">
        <Button>Button 1</Button>
      </ButtonGroup>
    )

    const group = screen.getByTestId('button-group')
    expect(group).toHaveAttribute('data-orientation', 'vertical')
  })

  it('has role="group"', () => {
    render(
      <ButtonGroup>
        <Button>Button 1</Button>
      </ButtonGroup>
    )

    const group = screen.getByRole('group')
    expect(group).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ButtonGroup className="custom-class" data-testid="button-group">
        <Button>Button 1</Button>
      </ButtonGroup>
    )

    const group = screen.getByTestId('button-group')
    expect(group).toHaveClass('custom-class')
  })

  it('forwards ref to div element', () => {
    const ref = { current: null }
    render(
      <ButtonGroup ref={ref}>
        <Button>Button 1</Button>
      </ButtonGroup>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
