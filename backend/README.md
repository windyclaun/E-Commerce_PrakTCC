# 🛠️ E-Commerce RESTful API Documentation

## 📌 Base URL

```
https://yourdomain.com/api
```

---

## 🔐 Authentication

Gunakan JWT token pada header setiap request ke endpoint yang terproteksi:

```
Authorization: Bearer <your_token>
```

---

## 📦 Product Routes (`/products`)

| Method | Endpoint        | Description              | Auth Required |
| ------ | --------------- | ------------------------ | ------------- |
| GET    | `/products`     | Get all products         | ❌             |
| GET    | `/products/:id` | Get product by ID        | ❌             |
| POST   | `/products/add` | Add new product (upload) | ✅             |
| PUT    | `/products/:id` | Update product (upload)  | ✅             |
| DELETE | `/products/:id` | Delete product           | ✅             |

### 📥 POST `/products/add`

**Request (multipart/form-data):**

* Fields:

  * `name`: string
  * `price`: number
  * `stock`: number
  * `description`: string
  * `category`: string
  * `image`: file (image/jpeg/png)

**Response:**

```json
{
  "message": "Product created successfully"
}
```

### 📤 GET `/products`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Kaos Polo",
    "price": 75000,
    "stock": 20,
    "image_url": "https://storage.googleapis.com/...",
    "description": "Kaos berkualitas tinggi",
    "category": "pakaian"
  }
]
```

### 📤 GET `/products/:id`

**Response:**

```json
{
  "id": 1,
  "name": "Kaos Polo",
  "price": 75000,
  "stock": 20,
  "image_url": "https://storage.googleapis.com/...",
  "description": "Kaos berkualitas tinggi",
  "category": "pakaian"
}
```

### 📥 PUT `/products/:id`

**Request (multipart/form-data):**

Field sama seperti POST `/products/add`

**Response:**

```json
{
  "message": "Product updated successfully"
}
```

### ❌ DELETE `/products/:id`

**Response:**

```json
{
  "message": "Product deleted successfully"
}
```

---

## 🧾 Order Routes (`/orders`)

| Method | Endpoint                          | Description                      | Auth Required |
| ------ | --------------------------------- | -------------------------------- | ------------- |
| GET    | `/orders`                         | Get all orders                   | ✅             |
| GET    | `/orders/:id`                     | Get order by ID                  | ✅             |
| GET    | `/orders/user/:userId`            | Get user's pending orders        | ✅             |
| GET    | `/orders/user/:userId/checkedout` | Get user's checked out orders    | ✅             |
| POST   | `/orders`                         | Create new order (add to cart)   | ✅             |
| PUT    | `/orders/:id`                     | Update order (qty, total\_price) | ✅             |
| DELETE | `/orders/:id`                     | Delete order                     | ✅             |
| PUT    | `/orders/checkout`                | Checkout all pending orders      | ✅             |
| PUT    | `/orders/checkout/:id`            | Checkout specific order          | ✅             |

### 📥 POST `/orders`

**Request:**

```json
{
  "product_id": 3,
  "quantity": 2,
  "total_price": 100000
}
```

**Response:**

```json
{
  "message": "Order created"
}
```

### 📤 GET `/orders`

**Response:**

```json
[
  {
    "id": 12,
    "user_id": 13,
    "product_id": 4,
    "quantity": 1,
    "total_price": "50000.00",
    "created_at": "2025-06-03T14:09:28.000Z",
    "status": "pending",
    "product_name": "Baju Jamet",
    "image_url": "https://..."
  }
]
```

### 📤 GET `/orders/:id`

**Response:**

```json
{
  "id": 12,
  "user_id": 13,
  "product_id": 4,
  "quantity": 1,
  "total_price": "50000.00",
  "status": "pending",
  "product_name": "Baju Jamet",
  "image_url": "https://..."
}
```

### 📥 PUT `/orders/:id`

**Request:**

```json
{
  "quantity": 5,
  "total_price": 250000
}
```

**Response:**

```json
{
  "message": "Order updated"
}
```

### ❌ DELETE `/orders/:id`

**Response:**

```json
{
  "message": "Order deleted"
}
```

### ✅ PUT `/orders/checkout`

**Response:**

```json
{
  "message": "Checkout successful",
  "total_price": 150000,
  "total_items": 3,
  "orders": [
    { ... }
  ]
}
```

### ✅ PUT `/orders/checkout/:id`

**Response:**

```json
{
  "message": "Order checked out successfully",
  "order": { ... }
}
```

---

## 👤 User Routes (`/users`)

| Method | Endpoint          | Description                | Auth Required |
| ------ | ----------------- | -------------------------- | ------------- |
| POST   | `/users/login`    | Login & dapatkan JWT token | ❌             |
| POST   | `/users/register` | Register user baru         | ❌             |
| GET    | `/users/:id`      | Get user by ID             | ✅             |
| PUT    | `/users/:id`      | Update user info           | ✅             |
| DELETE | `/users/:id`      | Delete user & all orders   | ✅             |

### 📥 POST `/users/login`

**Request:**

```json
{
  "username": "rafi123",
  "password": "secret123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### 📥 POST `/users/register`

**Request:**

```json
{
  "username": "rafi123",
  "email": "rafi@mail.com",
  "password": "secret123",
  "role": "user"
}
```

**Response:**

```json
{
  "message": "User registered"
}
```

### 📤 GET `/users/:id`

**Response:**

```json
{
  "id": 1,
  "username": "rafi123",
  "email": "rafi@mail.com",
  "role": "user"
}
```

### 📥 PUT `/users/:id`

**Request:**

```json
{
  "username": "rafi456",
  "email": "rafi456@mail.com",
  "password": "newpassword",
  "role": "user"
}
```

**Response:**

```json
{
  "message": "User updated successfully"
}
```

### ❌ DELETE `/users/:id`

**Response:**

```json
{
  "message": "User and related orders deleted successfully"
}
```

---

## 📤 Upload Gambar Produk

* Endpoint: `POST /products/add` atau `PUT /products/:id`
* Header: `Content-Type: multipart/form-data`
* Field gambar: `image`
* Field lain dikirim sebagai teks biasa

---

## 📋 Response Format (umum)

```json
{
  "message": "Order created successfully",
  "data": {...} // jika ada
}
```

atau

```json
{
  "error": "Deskripsi error"
}
```

---

## 🔐 JWT Payload (contoh)

```json
{
  "id": 1,
  "username": "rafi123",
  "role": "user"
}
```

---

> Dokumentasi ini dapat digunakan untuk keperluan frontend, pengujian Postman, atau integrasi mobile Flutter.
