import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AlertBox from './AlertBox'

describe('AlertBox', () => {
  it.each([
    ['success', 'status', 'polite'],
    ['error', 'alert', 'assertive'],
    ['warning', 'alert', 'assertive'],
    ['info', 'status', 'polite'],
  ] as const)(
    'renders a %s alert with the correct live region',
    (type, role, live) => {
      render(<AlertBox type={type} message="Saved successfully" />)

      expect(screen.getByRole(role)).toHaveTextContent('Saved successfully')
      expect(screen.getByRole(role)).toHaveAttribute('aria-live', live)
      expect(screen.getByRole(role)).toHaveClass(`alert-box--${type}`)
      expect(screen.queryByRole('button', { name: 'Close alert' })).toBeNull()
    },
  )

  it('renders children and invokes the optional close handler', () => {
    const onClose = vi.fn()
    render(
      <AlertBox type="info" message="Details" onClose={onClose}>
        <a href="/details">View details</a>
      </AlertBox>,
    )

    expect(screen.getByRole('link', { name: 'View details' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close alert' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('preserves numeric children', () => {
    render(
      <AlertBox type="success" message="Count">
        {0}
      </AlertBox>,
    )

    expect(screen.getByText('0')).toBeInTheDocument()
  })
})