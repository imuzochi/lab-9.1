import { useState } from 'react'
import AlertBox from './components/AlertBox/AlertBox'
import ProductDisplay from './components/ProductDisplay/ProductDisplay'
import UserProfileCard from './components/UserProfileCard/UserProfileCard'
import type { Product, User } from './types'
import './App.css'

const user: User = {
  id: 'user-42',
  name: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  role: 'Workspace member',
}

const product: Product = {
  id: 'product-7',
  name: 'Everyday Backpack',
  price: 64.99,
  description:
    'A lightweight everyday backpack with a padded laptop sleeve and room for all your essentials.',
  imageUrl:
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=960&q=85',
  inStock: true,
}

function App() {
  const [notice, setNotice] = useState<{
    type: 'success' | 'info'
    message: string
  } | null>(null)

  function handleEdit(userId: string) {
    setNotice({
      type: 'info',
      message: `Opening profile settings for ${userId}.`,
    })
  }

  function handleAddToCart(productId: string) {
    setNotice({
      type: 'success',
      message: `${product.name} (${productId}) was added to your cart.`,
    })
  }

  return (
    <main className="showcase">
      <header className="showcase__header">
        <p className="showcase__eyebrow">React component library</p>
        <h1>Component composition</h1>
        <p className="showcase__intro">
          Components can be composed together by passing data and callbacks as
          props, and by nesting custom content inside their children slots.
        </p>
      </header>

      {notice && (
        <AlertBox
          type={notice.type}
          message={notice.message}
          onClose={() => setNotice(null)}
        />
      )}

      <div className="showcase__grid">
        <section className="showcase__section" aria-labelledby="account-heading">
          <div className="showcase__section-heading">
            <p className="showcase__eyebrow">Nested profile content</p>
            <h2 id="account-heading">Your account</h2>
          </div>
          <UserProfileCard
            user={user}
            showEmail
            showRole
            onEdit={handleEdit}
          >
            <AlertBox
              type="info"
              message="Your profile is visible to your workspace team."
            />
          </UserProfileCard>
        </section>

        <section className="showcase__section" aria-labelledby="shop-heading">
          <div className="showcase__section-heading">
            <p className="showcase__eyebrow">Nested product content</p>
            <h2 id="shop-heading">Featured product</h2>
          </div>
          <ProductDisplay
            product={product}
            showDescription
            showStockStatus
            onAddToCart={handleAddToCart}
          >
            <p className="showcase__delivery-note">
              Free shipping on orders over $50.
            </p>
          </ProductDisplay>
        </section>
      </div>

      <footer className="showcase__footer">
        <p>
          Try <strong>Edit</strong> or <strong>Add to cart</strong> to see
          callbacks update the shared alert above.
        </p>
      </footer>
    </main>
  )
}

export default App
