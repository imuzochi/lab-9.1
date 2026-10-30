# Component library

A small set of React components for alerts, user profiles, and product details.
The running app is a working example of how they fit together.

## Run the app and checks

```sh
npm install
npm run dev
```

To check the code and run the component tests:

```sh
npm run build
npm run lint
npm test
```

## Components

Import a component from its folder and its data types from `src/types`:

```tsx
import AlertBox from './components/AlertBox/AlertBox'
import UserProfileCard from './components/UserProfileCard/UserProfileCard'
import ProductDisplay from './components/ProductDisplay/ProductDisplay'
import type { Product, User } from './types'
```

### AlertBox

Use an alert for a short message, and add children when the message needs a
link or another small piece of content.

```tsx
<AlertBox
  type="success"
  message="Your changes have been saved."
  onClose={() => setNotice(null)}
>
  <a href="/settings">Review your settings</a>
</AlertBox>
```

`type` can be `success`, `error`, `warning`, or `info`. Errors and warnings are
announced with higher priority for assistive technology. The close button only
appears when `onClose` is provided; the parent decides what closing the alert
does.

### UserProfileCard

Pass the user as one object. Email and role are shown by default, and can be
hidden independently.

```tsx
const user: User = {
  id: 'user-42',
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  role: 'Designer',
}

<UserProfileCard
  user={user}
  showEmail={false}
  onEdit={(userId) => console.log('Edit user:', userId)}
>
  <a href="/team">View team</a>
</UserProfileCard>
```

If `avatarUrl` is missing, the card uses the user's initials instead. The Edit
button only appears when `onEdit` is passed, and the callback receives `user.id`.

### ProductDisplay

The product price is formatted as USD. Description and stock status are shown
unless turned off.

```tsx
const product: Product = {
  id: 'product-7',
  name: 'Everyday Backpack',
  price: 64.99,
  description: 'A lightweight backpack with a padded laptop sleeve.',
  inStock: true,
}

<ProductDisplay
  product={product}
  onAddToCart={(productId) => console.log('Add product:', productId)}
>
  <p>Free shipping on orders over $50.</p>
</ProductDisplay>
```

The image is optional. The Add to cart button only appears when
`onAddToCart` is provided, and it is disabled when `inStock` is `false`.

## Putting them together

The app's [App.tsx](./src/App.tsx) shows a fuller example: a profile card
contains an alert, the product display contains extra delivery information,
and both components pass callback data back to the parent. The parent stores
that result and displays it in a dismissible alert.

All prop interfaces are documented in [src/types/index.ts](./src/types/index.ts).
