// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Label from '@packages/components/atoms/Label'

describe('Label Component', () => {
  it('renders label text correctly', () => {
    render(<Label>Username</Label>)
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Email</Label>)
    const label = screen.getByText('Email')
    expect(label).toHaveClass('custom-class')
  })

  it('supports htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('renders children correctly', () => {
    render(
      <Label>
        <span>Complex</span> Label
      </Label>
    )
    expect(screen.getByText('Complex')).toBeInTheDocument()
    expect(screen.getByText(/Label/)).toBeInTheDocument()
  })

  it('can be associated with an input', () => {
    render(
      <div>
        <Label htmlFor="username-input">Username</Label>
        <input id="username-input" />
      </div>
    )
    const label = screen.getByText('Username')
    const input = document.getElementById('username-input')
    expect(label).toHaveAttribute('for', 'username-input')
    expect(input).toBeInTheDocument()
  })

  it('passes through data attributes', () => {
    render(<Label data-testid="test-label">Test</Label>)
    const label = screen.getByTestId('test-label')
    expect(label).toBeInTheDocument()
  })
})
