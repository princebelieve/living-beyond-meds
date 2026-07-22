// server/src/routes/product.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getProducts);
router.get("/:id", getProduct);

// 🔐 PROTECTED ADMIN ACTIONS
router.post("/", protect, adminOnly, upload.single("image"), createProduct);

router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
