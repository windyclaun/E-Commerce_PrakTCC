const db = require('../config/Database');

exports.getAllProducts = () => {
  return db.execute('SELECT * FROM products');
};

exports.getProductById = (id) => {
  return db.execute('SELECT * FROM products WHERE id = ?', [id]);
};

exports.createProduct = (name, price, stock, imageUrl, description) => {
  return db.execute(
    'INSERT INTO products (name, price, stock, image_url, description) VALUES (?, ?, ?, ?, ?)',
    [name, price, stock, imageUrl, description]
  );
};

exports.updateProduct = (id, name, price, stock, imageUrl, description) => {
  return db.execute(
    'UPDATE products SET name = ?, price = ?, stock = ?, image_url = ?, description = ? WHERE id = ?',
    [name, price, stock, imageUrl, description, id]
  );
};

exports.deleteProduct = (id) => {
  return db.execute('DELETE FROM products WHERE id = ?', [id]);
};
