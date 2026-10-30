import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import UserProfileCard from './UserProfileCard'
import type { User } from '../../types'

const user: User = {
  id: 'user-42',
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  role: 'Engineer',
}

describe('UserProfileCard', () => {
  it('renders user details and initials by default', () => {
    render(<UserProfileCard user={user} />)

    expect(screen.getByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument()
    expect(screen.getByText('ada@example.com')).toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByText('AL')).toBeInTheDocument()
  })

  it('hides optional details and renders provided children', () => {
    render(
      <UserProfileCard user={user} showEmail={false} showRole={false}>
        <button type="button">View activity</button>
      </UserProfileCard>,
    )

    expect(screen.queryByText('ada@example.com')).toBeNull()
    expect(screen.queryByText('Engineer')).toBeNull()
    expect(screen.getByRole('button', { name: 'View activity' })).toBeInTheDocument()
  })

  it('renders an avatar image and calls onEdit with the user id', () => {
    const onEdit = vi.fn()
    render(
      <UserProfileCard
        user={{ ...user, avatarUrl: '/ada.png' }}
        onEdit={onEdit}
      />,
    )

    expect(screen.getByRole('img', { name: "Ada Lovelace's avatar" })).toHaveAttribute(
      'src',
      '/ada.png',
    )
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    expect(onEdit).toHaveBeenCalledWith('user-42')
  })
})