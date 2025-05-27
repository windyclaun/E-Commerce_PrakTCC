const Order = require("../models/OrderModel");

exports.getAll = async (req, res) => {
  try {
    const [orders] = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
    res.status(201).json({ message: "Order created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { quantity, total_price } = req.body;

  if (quantity === undefined || total_price === undefined) {
    return res.status(400).json({ message: "Missing quantity or total_price" });
  }

  try {
    await Order.updateOrder(id, quantity, total_price);
    res.json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.deleteOrder(id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [orders] = await Order.getOrdersByUserId(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkoutAll = async (req, res) => {
  console.log("USER:", req.user); // Cek req.user di log server

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized or token missing" });
  }

  const userId = req.user.id;

  try {
    console.log("User ID:", userId); // Pastikan userId benar

    const [orders] = await Order.getPendingOrdersByUserId(userId);
    if (orders.length === 0) {
      return res.status(400).json({ message: "No pending orders to checkout" });
    }

    const total = orders.reduce((sum, order) => sum + order.total_price, 0);

    await Order.checkoutAllOrdersByUserId(userId);

    res.json({
      message: "Checkout successful",
      total_price: total,
      total_items: orders.length,
      orders
    });
  } catch (err) {
    console.error("Error:", err); // Log error untuk debugging
    res.status(500).json({ error: err.message });
  }
};

exports.checkoutById = async (req, res) => {
  const { id } = req.params;  // Ambil id order dari parameter
  const userId = req.user?.id;  // Ambil userId dari token yang sudah terverifikasi

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Cari order berdasarkan userId dan orderId yang diberikan
    const [order] = await Order.getOrderByIdAndUserId(id, userId);

    if (!order.length) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    if (order[0].status !== 'pending') {
      return res.status(400).json({ message: "Only pending orders can be checked out" });
    }

    // Update status order menjadi checked_out
    await Order.checkoutOrderById(id);

    res.json({
      message: "Order checked out successfully",
      order: order[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


