/* eslint-disable @typescript-eslint/no-explicit-any */
// api/copilot.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ GOOGLE_GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(apiKey || "dummy-key");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body as { messages?: ChatMessage[] };
    const history = body.messages ?? [];

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // or any current Gemini model
    });

    // Build conversation for Gemini
    const contents = [
      {
        role: "user", // system-style “instruction” turn
        parts: [
          {
            text:
              "You are Anonvic Copilot, a concise pre-sales assistant for a software & marketing studio. " +
              "You help SMEs understand plans, timelines, budgets, and tech stacks. " +
              "You answer in short paragraphs or bullets, avoid fluff, and you may ask ONE clarifying question if useful.",
          },
        ],
      },
      ...history.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
    ];

    const result = await model.generateContent({ contents });
    const replyText = result.response.text().trim() || "No answer generated.";

    return res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error("Copilot handler error:", error);
    return res.status(500).json({
      error: "LLM request failed",
      reply:
        "Something went wrong when talking to the AI. Please try again in a moment.",
    });
  }
}
