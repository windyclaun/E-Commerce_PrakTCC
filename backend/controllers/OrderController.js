const Order = require('../models/OrderModel');

exports.getAll = async (req, res) => {
  const [orders] = await Order.getAllOrders();
  res.json(orders);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const [order] = await Order.getOrderById(id);
  res.json(order[0]);
};

exports.create = async (req, res) => {
  const { product_id, quantity, total_price } = req.body;
  const user_id = req.user.id; // ambil dari token
  try {
    await Order.createOrder(user_id, product_id, quantity, total_price);
    res.status(201).json({ message: 'Order created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { quantity, total_price } = req.body;
  try {
    await Order.updateOrder(id, quantity, total_price);
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.deleteOrder(id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
