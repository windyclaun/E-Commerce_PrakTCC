const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductController');
const verifyToken = require('../middleware/VerifyToken');

// CRUD produk
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', verifyToken, controller.create);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
