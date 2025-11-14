# Backend

This is the backend for the e-commerce application.

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `POST /api/auth/refresh-token` - Refresh a user's access token

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)
- `POST /api/products/:id/reviews` - Create a new review

### Orders

- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/myorders` - Get all orders for the current user
- `GET /api/orders/:id` - Get an order by ID
- `POST /api/orders` - Create a new order

### Payments

- `POST /api/payments/create-checkout-session` - Create a new Stripe checkout session
- `POST /api/payments/webhook` - Handle Stripe webhooks

### Reviews

- `DELETE /api/reviews/:id` - Delete a review (admin only)
