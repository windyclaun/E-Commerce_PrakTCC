const express = require('express');
const path = require('path'); // Pastikan untuk mengimpor path

const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

// Konfigurasi dotenv untuk ambil variabel dari .env
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // Parsing body JSON

// Menyajikan folder 'uploads' sebagai folder statis
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const userRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductRoutes');
const orderRoutes = require('./routes/OrderRoutes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Tes koneksi awal
app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
