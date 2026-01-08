# ShoppyGlobe Backend

A Node.js and Express.js API for ShoppyGlobe e-commerce application.

## Features

- Product management (CRUD)
- Shopping cart with authentication
- JWT-based authentication
- MongoDB integration

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up MongoDB and update `.env` with your MONGO_URI and JWT_SECRET.
4. Run the server: `npm start`

## API Endpoints

All endpoints are prefixed with `http://localhost:5000`. Use Thunder Client or Postman for testing. Protected routes require `Authorization: Bearer <token>` header.

### Auth

- **POST /auth/register** - Register user (requires name, email, password)

  - Success:
    ![New user registered](Screenshots/new%20user%20registered.png)
  - Error (user already exists):
    ![User already exists](Screenshots/User%20already%20exists.png)

- **POST /auth/login** - Login (requires email, password) returns JWT token

  - Success:
    ![Login successful](Screenshots/login%20successful.png)

- **POST /auth/logout** - Logout (clears cookie)
  - Success:
    ![User logged out](Screenshots/user%20logged%20out.png)

### Products

- **GET /products** - Get all products
  ![Get all products](Screenshots/get%20all%20products.png)

- **GET /products/:id** - Get product by ID

  - Success:
    ![Get a product by ID](Screenshots/get%20a%20product%20by%20ID.png)
  - Error (product not found):
    ![Product not found](Screenshots/product%20not%20found%20when%20searched%20using%20ID.png)

- **POST /products** - Create product (requires name, price, description, stock)
  ![Create new product](Screenshots/create%20new%20product.png)

- **PUT /products/:id** - Update product

  - Success:
    ![Update product](Screenshots/update%20added%20product%20details%20using%20put.png)
  - Error (invalid ID):
    ![Cannot update invalid product ID](Screenshots/cannot%20update%20invalid%20product%20id.png)

- **DELETE /products/:id** - Delete product
  - Success:
    ![Delete a product](Screenshots/delete%20a%20product.png)
  - Error (product not found):
    ![Deleting product not found](Screenshots/deleting%20product%20not%20found.png)

### Cart (Protected)

- **GET /cart** - Get user's cart
  ![Get cart items](Screenshots/get%20cart%20items.png)

- **POST /cart** - Add to cart (requires productId, quantity)

  - (Screenshot not available; test by adding an item and checking GET /cart)

- **PUT /cart/:productId** - Update item quantity

  - Success:
    ![Cart product qty updated](Screenshots/cart%20product%20qty%20updated.png)
  - Error (item not found):
    ![Item tried to update not found in cart](Screenshots/item%20tried%20to%20update%20not%20found%20in%20cart.png)

- **DELETE /cart/:productId** - Remove item from cart
  ![Delete cart product](Screenshots/delete%20cart%20product.png)

## Testing

Use Thunder Client or Postman to test the endpoints. Include `Authorization: Bearer <token>` header for protected routes. Screenshots above show responses from Thunder Client testing.
