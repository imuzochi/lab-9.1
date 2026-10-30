import type React from 'react'

/** The visual tone and announcement priority for an alert. */
export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface AlertBoxProps {
  /** Sets the alert style. Errors and warnings are announced assertively. */
  type: AlertType
  /** The main text shown in the alert. */
  message: string
  /** Called when the optional close button is pressed. */
  onClose?: () => void
  /** Optional content displayed below the message. */
  children?: React.ReactNode
}

export interface User {
  /** A stable identifier passed to the edit callback. */
  id: string
  /** The name shown on the card and used to create fallback initials. */
  name: string
  /** The user's email address. */
  email: string
  /** The user's role or title. */
  role: string
  /** If provided, displays this image instead of initials. */
  avatarUrl?: string
}

export interface UserProfileCardProps {
  /** The user whose details should appear on the card. */
  user: User
  /** Whether to show the email address. Defaults to true. */
  showEmail?: boolean
  /** Whether to show the role. Defaults to true. */
  showRole?: boolean
  /** If provided, shows an Edit button and passes it the user's id. */
  onEdit?: (userId: string) => void
  /** Optional extra content rendered at the bottom of the card. */
  children?: React.ReactNode
}

export interface Product {
  /** A stable identifier passed to the add-to-cart callback. */
  id: string
  /** The product name. */
  name: string
  /** The price, formatted as a USD currency amount. */
  price: number
  /** A short description of the product. */
  description: string
  /** If provided, displays this image above the product details. */
  imageUrl?: string
  /** Controls the stock message and whether adding to cart is available. */
  inStock: boolean
}

export interface ProductDisplayProps {
  /** The product whose details should appear. */
  product: Product
  /** Whether to show the description. Defaults to true. */
  showDescription?: boolean
  /** Whether to show the stock message. Defaults to true. */
  showStockStatus?: boolean
  /** If provided, shows an add-to-cart button and passes it the product id. */
  onAddToCart?: (productId: string) => void
  /** Optional extra content rendered with the product details. */
  children?: React.ReactNode
}