const Product = require("../models/ProductModel");
const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan gambar dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Menyimpan gambar di folder 'uploads'
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Mengambil ekstensi file
    cb(null, Date.now() + ext); // Menyimpan file dengan nama unik berdasarkan timestamp
  },
});

const upload = multer({ storage }); // Menggunakan konfigurasi multer

exports.getAll = async (req, res) => {
  const [products] = await Product.getAllProducts();
  res.json(products);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const [product] = await Product.getProductById(id);
  res.json(product[0]);
};

exports.create = async (req, res) => {
  const { name, price, stock, description, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : ""; // Mendapatkan path gambar yang di-upload

  try {
    // Menyimpan produk ke database dengan path gambar yang di-upload
    await Product.createProduct(
      name,
      price,
      stock,
      image,
      description,
      category
    );
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    // Tangani error constraint foreign key
    let msg = "Failed to delete product";
    if (
      error &&
      error.sqlMessage &&
      error.sqlMessage.includes("a foreign key constraint fails")
    ) {
      msg =
        "Tidak dapat menghapus produk karena masih ada order/transaksi yang menggunakan produk ini.";
    }
    res.status(500).json({ error: msg });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : ""; // Mendapatkan path gambar yang di-upload (jika ada)

  try {
    // Memperbarui produk dengan data yang baru
    await Product.updateProduct(id, name, price, stock, image, description, category);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

