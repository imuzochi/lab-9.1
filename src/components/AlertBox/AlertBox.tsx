import './AlertBox.css'
import type { AlertBoxProps } from '../../types'

function AlertBox({ type, message, onClose, children }: AlertBoxProps) {
  const isUrgent = type === 'error' || type === 'warning'

  return (
    <div
      className={`alert-box alert-box--${type}`}
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
    >
      <div className="alert-box__content">
        <p className="alert-box__message">{message}</p>
        {children != null && (
          <div className="alert-box__children">{children}</div>
        )}
      </div>
      {onClose && (
        <button
          className="alert-box__close"
          type="button"
          aria-label="Close alert"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  )
}

export default AlertBox