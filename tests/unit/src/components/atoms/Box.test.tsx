// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Box from '@packages/components/atoms/Box'

describe('Box Component', () => {
  it('renders as a div by default', () => {
    render(<Box data-testid="box">Content</Box>)
    const box = screen.getByTestId('box')
    expect(box.tagName).toBe('DIV')
  })

  it('renders children correctly', () => {
    render(<Box>Test Content</Box>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders as a different component when specified', () => {
    render(
      <Box component="section" data-testid="box">
        Content
      </Box>
    )
    const box = screen.getByTestId('box')
    expect(box.tagName).toBe('SECTION')
  })

  it('passes through className prop', () => {
    render(
      <Box className="custom-class" data-testid="box">
        Content
      </Box>
    )
    const box = screen.getByTestId('box')
    expect(box).toHaveClass('custom-class')
  })

  it('passes through HTML attributes', () => {
    render(
      <Box id="test-id" role="banner" data-testid="box">
        Content
      </Box>
    )
    const box = screen.getByTestId('box')
    expect(box).toHaveAttribute('id', 'test-id')
    expect(box).toHaveAttribute('role', 'banner')
  })

  it('supports form element', () => {
    render(
      <Box component="form" data-testid="box">
        Content
      </Box>
    )
    const box = screen.getByTestId('box')
    expect(box.tagName).toBe('FORM')
  })
})
