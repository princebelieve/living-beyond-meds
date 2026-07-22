//server/src/routes/payment.routes.js
const express = require("express");
const stripe = require("../services/stripe");
const Product = require("../models/Product");

const router = express.Router();

// Product checkout
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      metadata: {
        productId: product._id.toString(),
      },
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Donation
router.post("/create-donation-session", async (req, res) => {
  try {
    const { amount, cause, donationType } = req.body;

    const causeNames = {
      general: "General Fund",
      widows: "Widows Empowerment",
      training: "Skills Training",
      outreach: "Community Outreach",
    };

    const interval = donationType === "one-time" ? null : donationType;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Donation to ${causeNames[cause] || "General Fund"}`,
              description: `Supporting widows and vulnerable individuals${donationType !== "one-time" ? ` (${donationType})` : ""}`,
            },
            unit_amount: Math.round(amount * 100),
            ...(interval && {
              recurring: {
                interval: interval === "monthly" ? "month" : "year",
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: interval ? "subscription" : "payment",
      success_url: `${process.env.CLIENT_URL}/donation-success`,
      cancel_url: `${process.env.CLIENT_URL}/donate`,
      metadata: {
        cause,
        donationType: donationType || "one-time",
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
