# Vanitha POS - API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All endpoints require JWT token:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- `POST /auth/login` - Login user
- `GET /auth/verify` - Verify token
- `POST /auth/refresh` - Refresh token

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /products/search?query=text` - Search products
- `GET /products/low-stock` - Get low stock items

### Transactions
- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction
- `POST /transactions` - Create transaction
- `GET /transactions/report` - Get sales report

## Example Requests

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vanitha.com","password":"admin123"}'
```

### Get Products
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer <token>"
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name":"New Product",
    "sku":"NEW-001",
    "category":"pantry",
    "price":100,
    "cost":60,
    "qty":20,
    "thresh":5
  }'
```
