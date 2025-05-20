const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderController');
const verifyToken = require('../middleware/VerifyToken');

// CRUD order
router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getById);
router.post('/', verifyToken, controller.create);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
