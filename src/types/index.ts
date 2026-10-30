import type React from 'react'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface AlertBoxProps {
  type: AlertType
  message: string
  onClose?: () => void
  children?: React.ReactNode
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
}

export interface UserProfileCardProps {
  user: User
  showEmail?: boolean
  showRole?: boolean
  onEdit?: (userId: string) => void
  children?: React.ReactNode
}

export interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrl?: string
  inStock: boolean
}

export interface ProductDisplayProps {
  product: Product
  showDescription?: boolean
  showStockStatus?: boolean
  onAddToCart?: (productId: string) => void
  children?: React.ReactNode
}