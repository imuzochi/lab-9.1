import './ProductDisplay.css'
import type { ProductDisplayProps } from '../../types'

function ProductDisplay({
  product,
  showDescription = true,
  showStockStatus = true,
  onAddToCart,
  children,
}: ProductDisplayProps) {
  return (
    <article className="product-display">
      {product.imageUrl && (
        <img
          className="product-display__image"
          src={product.imageUrl}
          alt={product.name}
        />
      )}
      <div className="product-display__content">
        <h2 className="product-display__name">{product.name}</h2>
        <p className="product-display__price">
          {new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
          }).format(product.price)}
        </p>
        {showDescription && (
          <p className="product-display__description">{product.description}</p>
        )}
        {showStockStatus && (
          <p
            className={`product-display__stock ${
              product.inStock
                ? 'product-display__stock--available'
                : 'product-display__stock--unavailable'
            }`}
            aria-live="polite"
          >
            {product.inStock ? 'In stock' : 'Out of stock'}
          </p>
        )}
        {children != null && (
          <div className="product-display__children">{children}</div>
        )}
        {onAddToCart && (
          <button
            className="product-display__add-to-cart"
            type="button"
            onClick={() => onAddToCart(product.id)}
            disabled={!product.inStock}
          >
            Add to cart
          </button>
        )}
      </div>
    </article>
  )
}

export default ProductDisplay