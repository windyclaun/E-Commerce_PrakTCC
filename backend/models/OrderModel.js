const db = require("../config/Database");

exports.getAllOrders = () => {
  return db.execute(
    "SELECT o.*, p.name as product_name, p.image_url FROM orders o LEFT JOIN products p ON o.product_id = p.id"
  );
};

exports.getOrderById = (id) => {
  return db.execute(
    "SELECT o.*, p.name as product_name, p.image_url FROM orders o LEFT JOIN products p ON o.product_id = p.id WHERE o.id = ?",
    [id]
  );
};

exports.createOrder = (user_id, product_id, quantity, total_price) => {
  return db.execute(
    "INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)",
    [user_id, product_id, quantity, total_price]
  );
};

exports.updateOrder = (id, quantity, total_price) => {
  return db.execute(
    "UPDATE orders SET quantity = ?, total_price = ? WHERE id = ?",
    [quantity, total_price, id]
  );
};

exports.deleteOrder = (id) => {
  return db.execute("DELETE FROM orders WHERE id = ?", [id]);
};

exports.getOrdersByUserId = (user_id) => {
  return db.execute(
    "SELECT o.*, p.name as product_name, p.image_url FROM orders o LEFT JOIN products p ON o.product_id = p.id WHERE o.user_id = ?",
    [user_id]
  );
};
