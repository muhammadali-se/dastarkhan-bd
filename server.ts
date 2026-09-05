import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Dastarkhan Restaurant & Banquet Hall API" });
});

// Helper for Gemini AI Concierge
app.post("/api/concierge", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "GEMINI_API_KEY not configured on server.",
        reply: "Dastarkhan AI Concierge: Our reservation system is currently offline. Please contact our front desk at +880 1712 345678 or reservations@dastarkhan.com for personal assistance."
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are the Executive Maître D' and Event Director at Dastarkhan Restaurant & Banquet Hall, Sylhet's premier fine dining and majestic celebration landmark located in Osmaninagar, Sylhet, Bangladesh.
Your tone is sophisticated, culturally welcoming, warm, and highly knowledgeable about traditional Sylheti & Mughlai gastronomy, modern fine dining fusion, and grand banquet planning.
Key facts about Dastarkhan Restaurant & Banquet Hall:
- Location: Main Road, Osmaninagar, Sylhet, Bangladesh. Phone: +880 1712 345678.
- Concept: "Traditional Flavors, Modern Elegance" / "Crafting Unforgettable Memories".
- Features three distinctive banquet & event spaces:
  1. The Royal Ballroom (Capacity up to 500 Seated / 700 Standing, pillarless 24-ft ceilings, crystal chandeliers, advanced HVAC, Pro sound system, Royal VIP lounge)
  2. Sylhet Executive Suite (Capacity up to 80 Seated, boardroom-style sanctuary, 4K audio-visual displays, executive dining)
  3. The Starlight Terrace (Capacity up to 150 Seated, enchanting open-air rooftop garden under string lights & starry skies, live barbecue/tandoor station)
- Menu highlights include:
  - Signature: Dastarkhan Royal Tandoori Platter (৳2,400), Sylheti Shatkora Beef Bhuna (৳950), Grand Mughlai Akhni Biryani (৳1,100), Dry-Aged Beef Wellington for Two (৳4,800).
  - Mains & Starters: Reshmi Malai Kebab, Chittagong Tiger Prawn Tandoori, Royal Mutton Rezala, Old Delhi Butter Chicken, Chital Fish Kofta Curry.
  - Desserts & Beverages: Shahi Tukda Royal, Saffron Pista Firni, Sylheti 7-Layer Tea Heritage, Shahi Borhani.
- All-Inclusive Banquet Package Tiers:
  - Package A: Classic Sylheti (৳1,500/guest - 5 courses, traditional feast)
  - Package B: Royal Heritage (৳2,200/guest - 7 courses, premium Mughlai & Sylheti selection)
  - Package C: Signature Luxe (৳3,500/guest - 9 courses, live carving/tandoor stations, welcome drinks, VIP valet)
- Optional Add-ons: Floral Stage Decor (+৳15k), Photography Pkg (+৳18k), Live Music Setup (+৳15k), VIP Valet Service (+৳12k).

Answer the guest's inquiry gracefully and warmly. Provide expert culinary recommendations, event planning advice, or menu pairings. Keep your response conversational, concise (1 to 3 elegant paragraphs), and beautifully formatted.`;

    const formattedHistory = Array.isArray(history) ? history.map((item: any) => ({
      role: item.sender === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    })) : [];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...formattedHistory,
        {
          role: "user",
          parts: [{ text: message }]
        }
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    });

    const reply = response.text || "I would be delighted to assist you with your dining or banquet plans at Dastarkhan. Please let me know your preferred dates or guest count.";

    res.json({ reply });
  } catch (error: any) {
    console.error("AI Concierge error:", error);
    res.status(500).json({
      error: "Failed to generate reply",
      reply: "Dastarkhan Concierge: Pardon me, our digital reservation ledger is momentarily busy. Allow me to invite you to call our Osmaninagar front desk at +880 1712 345678."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dastarkhan Server running on http://localhost:${PORT}`);
  });
}

startServer();

