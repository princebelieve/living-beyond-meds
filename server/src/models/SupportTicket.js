const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
    },
    attachmentUrl: {
      type: String,
      default: "",
    },
    needHumanSupport: {
      type: Boolean,
      default: false,
    },
    escalated: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["new", "open", "resolved"],
      default: "new",
    },
    aiReply: {
      type: String,
      default: "",
    },
    adminReply: {
      type: String,
      default: "",
    },
    conversation: [
      {
        role: {
          type: String,
          enum: ["user", "assistant", "admin"],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
