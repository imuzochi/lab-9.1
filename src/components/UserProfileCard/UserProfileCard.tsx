import './UserProfileCard.css'
import type { UserProfileCardProps } from '../../types'

function UserProfileCard({
  user,
  showEmail = true,
  showRole = true,
  onEdit,
  children,
}: UserProfileCardProps) {
  return (
    <article className="user-profile-card">
      <div className="user-profile-card__header">
        {user.avatarUrl ? (
          <img
            className="user-profile-card__avatar"
            src={user.avatarUrl}
            alt={`${user.name}'s avatar`}
          />
        ) : (
          <div
            className="user-profile-card__avatar user-profile-card__avatar--placeholder"
            aria-hidden="true"
          >
            {user.name
              .split(/\s+/)
              .filter(Boolean)
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}
        <div className="user-profile-card__identity">
          <h2 className="user-profile-card__name">{user.name}</h2>
          {showRole && <p className="user-profile-card__role">{user.role}</p>}
        </div>
        {onEdit && (
          <button
            className="user-profile-card__edit"
            type="button"
            onClick={() => onEdit(user.id)}
          >
            Edit
          </button>
        )}
      </div>

      {showEmail && <p className="user-profile-card__email">{user.email}</p>}
      {children != null && (
        <div className="user-profile-card__children">{children}</div>
      )}
    </article>
  )
}

export default UserProfileCard