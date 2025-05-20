const db = require('../config/Database');

exports.getAllOrders = () => {
  return db.execute('SELECT * FROM orders');
};

exports.getOrderById = (id) => {
  return db.execute('SELECT * FROM orders WHERE id = ?', [id]);
};

exports.createOrder = (user_id, product_id, quantity, total_price) => {
  return db.execute(
    'INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)',
    [user_id, product_id, quantity, total_price]
  );
};

exports.updateOrder = (id, quantity, total_price) => {
  return db.execute(
    'UPDATE orders SET quantity = ?, total_price = ? WHERE id = ?',
    [quantity, total_price, id]
  );
};

exports.deleteOrder = (id) => {
  return db.execute('DELETE FROM orders WHERE id = ?', [id]);
};
