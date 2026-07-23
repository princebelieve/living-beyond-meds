const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createSupportChat,
  getAllSupportTickets,
  updateSupportTicket,
} = require("../controllers/support.controller");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/chat", upload.single("attachment"), createSupportChat);
router.get("/tickets", protect, adminOnly, getAllSupportTickets);
router.put("/tickets/:id", protect, adminOnly, updateSupportTicket);

module.exports = router;
