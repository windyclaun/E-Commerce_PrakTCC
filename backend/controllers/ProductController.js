const Product = require("../models/ProductModel");
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = "ecommerce-bucket-project";
const bucket = storage.bucket(bucketName);
const path = require("path");

// Fungsi untuk membuat produk baru
exports.create = async (req, res) => {
  const { name, price, stock, description, category } = req.body;
  const file = req.file; // Gambar yang di-upload menggunakan multer

  if (!file) {
    return res.status(400).json({ message: "No image file provided." });
  }

  // Menyusun nama file unik untuk file yang di-upload dan memastikan file tersimpan di dalam folder 'uploads/'
  const blob = bucket.file(`uploads/${Date.now()}${path.extname(file.originalname)}`);
  const blobStream = blob.createWriteStream({
    resumable: false, // Tidak mengizinkan upload yang dapat dilanjutkan (untuk file kecil)
  });

  // Error handling saat proses upload gambar
  blobStream.on("error", (err) => {
    return res.status(500).json({ message: "Error uploading file to GCP", error: err });
  });

  // Setelah upload selesai
  blobStream.on("finish", async () => {
    // Membuat URL gambar yang disimpan di Google Cloud Storage
    const imageUrl = `https://storage.googleapis.com/${bucketName}/uploads/${blob.name}`;

    try {
      // Menyimpan produk ke database dengan URL gambar
      await Product.createProduct(name, price, stock, imageUrl, description, category);
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to create product", error });
    }
  });

  // Upload file buffer ke Google Cloud Storage
  blobStream.end(file.buffer);
};

// Fungsi untuk mendapatkan semua produk
exports.getAll = async (req, res) => {
  try {
    const [products] = await Product.getAllProducts();
    
    // Memastikan gambar diambil dari bucket GCP
    const updatedProducts = products.map(product => {
      if (product.image_url) {
        // Ubah path gambar menjadi URL yang valid di GCP
        product.image_url = `https://storage.googleapis.com/${bucketName}/uploads/${path.basename(product.image_url)}`;
      }
      return product;
    });

    res.json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products", error });
  }
};

// Fungsi untuk mendapatkan produk berdasarkan ID
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await Product.getProductById(id);
    if (!product || product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Memastikan gambar diambil dari bucket GCP
    const productData = product[0];
    if (productData.image_url) {
      // Ubah path gambar menjadi URL yang valid di GCP
      productData.image_url = `https://storage.googleapis.com/${bucketName}/uploads/${path.basename(productData.image_url)}`;
    }

    res.json(productData);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve product", error });
  }
};

// Fungsi untuk memperbarui produk
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description, category } = req.body;
  let image;

  if (req.file) {
    // Jika ada gambar baru di-upload
    image = `uploads/${Date.now()}${path.extname(req.file.originalname)}`;
  } else {
    // Ambil image lama dari database jika tidak upload gambar baru
    const [product] = await Product.getProductById(id);
    image = product[0]?.image_url || "";
  }

  try {
    await Product.updateProduct(id, name, price, stock, image, description, category);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Fungsi untuk menghapus produk
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};