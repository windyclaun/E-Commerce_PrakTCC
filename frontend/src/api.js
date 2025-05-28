// src/api.js
// File ini berisi semua akses endpoint backend untuk frontend
import axios from "axios";

const BASE_URL = "https://be-rest-1005441798389.us-central1.run.app/api";

// AUTH
export const loginUser = (data) => axios.post(`${BASE_URL}/users/login`, data);
export const registerUser = (data) =>
  axios.post(`${BASE_URL}/users/register`, data);
export const getUserProfile = (id, token) =>
  axios.get(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateUserProfile = (data, token) =>
  axios.put(`${BASE_URL}/users/profile`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// PRODUCT
export const getAllProducts = () => axios.get(`${BASE_URL}/products`);
export const getProductById = (id) => axios.get(`${BASE_URL}/products/${id}`);
export const addProduct = (formData, token) =>
  axios.post(`${BASE_URL}/products/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
export const updateProduct = (id, formData, token) =>
  axios.put(`${BASE_URL}/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteProduct = (id, token) =>
  axios.delete(`${BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ORDER
export const createOrder = (data, token) =>
  axios.post(`${BASE_URL}/orders`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getOrders = (token) =>
  axios.get(`${BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getOrderById = (id, token) =>
  axios.get(`${BASE_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// CART (opsional, jika ada endpoint khusus)
// export const getCart = (token) => axios.get(`${BASE_URL}/cart`, { headers: { Authorization: `Bearer ${token}` } });
// export const addToCart = (data, token) => axios.post(`${BASE_URL}/cart`, data, { headers: { Authorization: `Bearer ${token}` } });

export default {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getOrders,
  getOrderById,
  // getCart,
  // addToCart,
};
