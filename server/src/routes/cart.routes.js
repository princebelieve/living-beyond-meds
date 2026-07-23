const express = require("express");
const router = express.Router();
const { createCartCheckoutSession } = require("../controllers/cart.controller");

router.post("/create-cart-checkout-session", createCartCheckoutSession);

module.exports = router;
