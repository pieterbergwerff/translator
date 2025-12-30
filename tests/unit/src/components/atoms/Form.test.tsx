// @ts-nocheck - React 19 type conflicts with @testing-library
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from '@packages/components/atoms/Form'

describe('Form Component', () => {
  it('renders as a form element', () => {
    render(<Form data-testid="form">Content</Form>)
    const form = screen.getByTestId('form')
    expect(form.tagName).toBe('FORM')
  })

  it('renders children correctly', () => {
    render(<Form>Form Content</Form>)
    expect(screen.getByText('Form Content')).toBeInTheDocument()
  })

  it('handles onSubmit event', async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault())
    const user = userEvent.setup()
    render(
      <Form onSubmit={handleSubmit} data-testid="form">
        <button type="submit">Submit</button>
      </Form>
    )
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await user.click(submitButton)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(
      <Form className="custom-form" data-testid="form">
        Content
      </Form>
    )
    const form = screen.getByTestId('form')
    expect(form).toHaveClass('custom-form')
  })

  it('passes through HTML attributes', () => {
    render(
      <Form id="test-form" role="form" data-testid="form">
        Content
      </Form>
    )
    const form = screen.getByTestId('form')
    expect(form).toHaveAttribute('id', 'test-form')
    expect(form).toHaveAttribute('role', 'form')
  })

  it('supports method attribute', () => {
    render(
      <Form method="post" data-testid="form">
        Content
      </Form>
    )
    const form = screen.getByTestId('form')
    expect(form).toHaveAttribute('method', 'post')
  })

  it('supports action attribute', () => {
    render(
      <Form action="/submit" data-testid="form">
        Content
      </Form>
    )
    const form = screen.getByTestId('form')
    expect(form).toHaveAttribute('action', '/submit')
  })
})
