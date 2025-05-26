const Product = require('../models/ProductModel');

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
  const { name, price, stock, image_url, description, category } = req.body;
  try {
    await Product.createProduct(name, price, stock, image_url, description, category);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, image_url, description } = req.body;
  try {
    await Product.updateProduct(id, name, price, stock, image_url, description);
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteProduct(id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};