const OpenAI = require("openai");

const SUPPORT_SYSTEM_PROMPT = `You are the Living Beyond Meds Support Assistant. You help people with compassionate, honest, and useful answers about the organisation's mission, support services, donations, volunteering, events, and community care.

Living Beyond Meds supports widows and vulnerable women in Manchester, UK with practical help, emotional support, mentoring, safe community space, education, and emergency relief. You should know that the organisation runs donation drives, volunteer programmes, community events, women’s support groups, and local outreach for vulnerable families.

Always answer kindly, clearly, and directly. Do not mention internal system status or API key availability. If the user asks for human support, acknowledge it and escalate to the support team without pretending to be human or giving a technical explanation.

Use the organisation's mission and services to answer questions about donations, volunteering, contact details, location, support options, and events. Do not give generic or vague responses.`;

const FALLBACK_KB = [
  {
    triggers: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    answer: "Hi there! I'm the Living Beyond Meds Support Assistant. How can I help you today?",
  },
  {
    triggers: ["what is living beyond meds about", "what is living beyond meds", "what do you do", "what does living beyond meds do", "what is your mission", "mission", "purpose", "about"],
    answer: "Living Beyond Meds supports widows and vulnerable women in Manchester with practical help, emotional support, mentoring, safe community space, education, and emergency relief. We also run donation drives, volunteer programmes, community events, and women’s support groups.",
  },
  {
    triggers: ["who are you", "what are you", "your name", "support assistant", "chatbot", "you are"],
    answer: "I'm the Living Beyond Meds Support Assistant. I help answer questions about the organisation's mission, donations, volunteering, events, products, and how to get support.",
  },
  {
    triggers: ["you say", "what do you say", "say"],
    answer: "I say that I'm here to help you with questions about Living Beyond Meds, including donations, volunteering, products, events, and support options.",
  },
  {
    triggers: ["product", "products", "shop", "store", "collection", "things to sell", "sell", "selling"],
    answer: "Living Beyond Meds also offers products in our shop and collection. Purchasing items from our store helps raise funds for our work supporting widows and vulnerable women in Manchester.",
  },
  {
    triggers: ["donation", "donate", "gift", "contribute", "support financially"],
    answer: "You can donate to Living Beyond Meds via the donations page or by emailing info@livingbeyondmeds.com. Your gift supports vulnerable women, families, community care, and emergency relief.",
  },
  {
    triggers: ["volunteer", "volunteering", "help out", "join", "volunteer work", "get involved"],
    answer: "Volunteering with Living Beyond Meds helps run community events, mentoring sessions, and practical support for vulnerable women. Email info@livingbeyondmeds.com to learn how to get involved.",
  },
  {
    triggers: ["location", "address", "where", "manchester", "near me", "directions"],
    answer: "Living Beyond Meds is based at 29 Cross Street Chapel, Manchester, M2 1NL. Please visit the contact page for directions and local transport details.",
  },
  {
    triggers: ["contact", "email", "phone", "reach", "get in touch", "contact us"],
    answer: "You can reach Living Beyond Meds at info@livingbeyondmeds.com or by phone at +44 7476 088871. If you want a direct human response, select the human support option.",
  },
  {
    triggers: ["events", "community event", "support group", "meeting", "workshop"],
    answer: "Living Beyond Meds runs community events, support groups, and mentoring sessions for vulnerable women and families. Email info@livingbeyondmeds.com for upcoming event details.",
  },
  {
    triggers: ["support", "assistance", "help", "care", "emotional support", "practical support"],
    answer: "We provide practical and emotional support for widows and vulnerable women through community programmes, safe spaces, mentoring, volunteer care, and emergency relief.",
  },
  {
    triggers: ["human", "real person", "talk to", "admin", "someone", "support agent", "live agent", "speak with"],
    answer: "If you would like help from a real person, choose the human support option and our admin team will follow up with you directly.",
  },
  {
    triggers: ["thank you", "thanks", "appreciate", "cheers"],
    answer: "You're welcome! If you have any more questions about Living Beyond Meds, feel free to ask.",
  },
  {
    triggers: ["bye", "goodbye", "see you", "talk later"],
    answer: "Goodbye! I'm here whenever you need more information about Living Beyond Meds.",
  },
];

function normalizeMessage(message) {
  return (message || "").toLowerCase().trim();
}

function findFallbackAnswer(message) {
  const normalized = normalizeMessage(message);

  for (const item of FALLBACK_KB) {
    if (item.triggers.some((trigger) => normalized === trigger || normalized.includes(trigger))) {
      return item.answer;
    }
  }

  // Fall back to a generic support prompt if nothing matches.
  return (
    "Hello! I'm the Living Beyond Meds Support Assistant. I can help answer questions about donations, volunteering, events, and support services. " +
    "If you're not sure what to ask, type a question or request human support and our admin team will follow up.");
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
