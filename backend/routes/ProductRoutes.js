const express = require("express");
const router = express.Router();
const controller = require("../controllers/ProductController");
const verifyToken = require("../middleware/VerifyToken");
const multer = require("multer");
const path = require("path");
const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage
const storage = new Storage();
const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

// Multer configuration (for handling file uploads)
const multerStorage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: multerStorage });

// Product routes
router.post("/", verifyToken, upload.single("image"), controller.create);
router.put("/:id", verifyToken, upload.single("image"), controller.update);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.delete("/:id", verifyToken, controller.delete);

module.exports = router;
