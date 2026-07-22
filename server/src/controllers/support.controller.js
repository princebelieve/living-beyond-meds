const SupportTicket = require("../models/SupportTicket");
const { generateSupportResponse } = require("../services/openai");

const escalationKeywords = [
  "human",
  "real person",
  "support agent",
  "live agent",
  "talk to",
  "someone",
  "admin",
  "human support",
  "customer service",
  "representative",
  "help me directly",
  "contact a person",
  "speak with",
];

function shouldEscalate(message, needHumanSupport) {
  if (needHumanSupport) {
    return true;
  }

  const normalized = (message || "").toLowerCase();
  return escalationKeywords.some((keyword) => normalized.includes(keyword));
}

const createSupportChat = async (req, res) => {
  try {
    const { name, email, message, needHumanSupport = false } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required." });
    }

    const escalated = shouldEscalate(message, needHumanSupport);
    let aiReply = "";

    if (!escalated) {
      aiReply = await generateSupportResponse({ name, email, message });
    }

    const ticket = await SupportTicket.create({
      name,
      email,
      message,
      needHumanSupport,
      escalated,
      status: escalated ? "new" : "resolved",
      aiReply,
      conversation: [
        { role: "user", text: message },
        ...(escalated ? [] : [{ role: "assistant", text: aiReply }]),
      ],
    });

    const reply = escalated
      ? "Thanks. Your request has been escalated to our human support team. An admin will follow up shortly."
      : aiReply;

    res.json({ reply, escalated, ticketId: ticket._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Support request failed." });
  }
};

const getAllSupportTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message || "Unable to load tickets." });
  }
};

const updateSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminReply, status } = req.body;

    const ticket = await SupportTicket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (adminReply) {
      ticket.adminReply = adminReply;
      ticket.conversation.push({ role: "admin", text: adminReply });
    }

    if (status) {
      ticket.status = status;
    }

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message || "Unable to update ticket." });
  }
};

module.exports = {
  createSupportChat,
  getAllSupportTickets,
  updateSupportTicket,
};
