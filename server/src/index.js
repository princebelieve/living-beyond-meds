//server/src/index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const paymentRoutes = require("./routes/payment.routes");
const cartRoutes = require("./routes/cart.routes");
const webhookRoutes = require("./routes/webhook.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");
const measurementRoutes = require("./routes/measurementRoutes");
const storyRoutes = require("./routes/story.routes");
const supportRoutes = require("./routes/support.routes");

const app = express();

connectDB();

// Stripe webhook (must be raw before json)
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  webhookRoutes,
);

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Serve static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/measurements", measurementRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/support", supportRoutes);

app.get("/", (req, res) => {
  res.send("Living Beyond Meds API is running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
