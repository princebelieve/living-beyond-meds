const OpenAI = require("openai");

const SUPPORT_SYSTEM_PROMPT = `You are the Living Beyond Meds Support Assistant. You help people with compassionate, honest, and useful answers about the organisation's mission, support services, donations, volunteering, events, and community care.

Living Beyond Meds supports widows and vulnerable women through faith, practical help, community support, and emotional care in Manchester, UK. The team provides safe spaces, volunteer opportunities, donation options, and guidance for difficult transitions.

Do not provide canned or generic answers. Answer the user's question directly, kindly, and naturally. If the user asks to speak with a human, requests admin support, or wants a real person to help, do not pretend to be one. Instead, acknowledge the request and escalate it to the human support team.`;

const FALLBACK_QA = [
  {
    keywords: ["donation", "donate", "gift", "contribute", "support financially"],
    answer:
      "You can support Living Beyond Meds by donating to our cause. We accept one-time and recurring donations, and every gift helps widows and vulnerable women with community care, education, and practical support.",
  },
  {
    keywords: ["volunteer", "volunteering", "help out", "join", "volunteer work"],
    answer:
      "Volunteering is one of the best ways to help. Reach out by email to learn about current volunteer roles, training dates, and how your time can support local women and families.",
  },
  {
    keywords: ["location", "address", "where", "manchester", "near me"],
    answer:
      "Living Beyond Meds is based in Manchester. Our address is 29 Cross Street Chapel, Manchester, M2 1NL. If you need directions, use our Google Maps link on the contact page.",
  },
  {
    keywords: ["contact", "email", "phone", "reach", "get in touch"],
    answer:
      "The best way to reach us is by email at info@livingbeyondmeds.com or by phone at +44 7476 088871. If you want a human reply, please select the human support option in the chat.",
  },
  {
    keywords: ["service", "support", "help", "assistance", "care"],
    answer:
      "We offer practical and emotional support for widows and vulnerable women through community programs, events, and direct care. If you need a real person, please ask for human support and one of our admins will follow up.",
  },
];

function findFallbackAnswer(message) {
  const normalized = (message || "").toLowerCase();

  for (const item of FALLBACK_QA) {
    if (item.keywords.some((keyword) => normalized.includes(keyword))) {
      return item.answer;
    }
  }

  return (
    "I don’t currently have AI chat access right now, but I can still help with basic questions. " +
    "Please email info@livingbeyondmeds.com or request human support, and an admin will follow up shortly."
  );
}

async function generateSupportResponse({ name, email, message }) {
  if (!process.env.OPENAI_API_KEY) {
    return findFallbackAnswer(message);
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const userPrompt = `User name: ${name}\nUser email: ${email}\nUser message: ${message}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SUPPORT_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 420,
    });

    return response.choices?.[0]?.message?.content?.trim() || findFallbackAnswer(message);
  } catch (error) {
    console.error("OpenAI support fallback:", error?.message || error);
    return findFallbackAnswer(message);
  }
}

module.exports = { generateSupportResponse };

