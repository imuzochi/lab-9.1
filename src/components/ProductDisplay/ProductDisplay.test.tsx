import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductDisplay from './ProductDisplay'
import type { Product } from '../../types'

const product: Product = {
  id: 'product-7',
  name: 'Desk lamp',
  price: 24.5,
  description: 'An adjustable reading lamp.',
  inStock: true,
}

describe('ProductDisplay', () => {
  it('renders product details, formatted price, and stock status by default', () => {
    render(<ProductDisplay product={product} />)

    expect(screen.getByRole('heading', { name: 'Desk lamp' })).toBeInTheDocument()
    expect(screen.getByText('$24.50')).toBeInTheDocument()
    expect(screen.getByText('An adjustable reading lamp.')).toBeInTheDocument()
    expect(screen.getByText('In stock')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Add to cart' })).toBeNull()
  })

  it('hides optional details and renders an optional image and children', () => {
    render(
      <ProductDisplay
        product={{ ...product, imageUrl: '/lamp.png' }}
        showDescription={false}
        showStockStatus={false}
      >
        <span>Limited offer</span>
      </ProductDisplay>,
    )

    expect(screen.getByRole('img', { name: 'Desk lamp' })).toHaveAttribute(
      'src',
      '/lamp.png',
    )
    expect(screen.queryByText('An adjustable reading lamp.')).toBeNull()
    expect(screen.queryByText('In stock')).toBeNull()
    expect(screen.getByText('Limited offer')).toBeInTheDocument()
  })

  it('calls onAddToCart with the product id when in stock', () => {
    const onAddToCart = vi.fn()
    render(<ProductDisplay product={product} onAddToCart={onAddToCart} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }))
    expect(onAddToCart).toHaveBeenCalledWith('product-7')
  })

  it('disables adding an out-of-stock product to cart', () => {
    render(
      <ProductDisplay
        product={{ ...product, inStock: false }}
        onAddToCart={vi.fn()}
      />,
    )

    expect(screen.getByText('Out of stock')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeDisabled()
  })
})