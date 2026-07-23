const Product = require("../models/Product");
const stripe = require("../services/stripe");

async function createCartCheckoutSession(req, res) {
  try {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : [],
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity || 1,
        };
      }),
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createCartCheckoutSession };
