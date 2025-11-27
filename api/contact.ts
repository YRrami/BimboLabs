// api/contact.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql } from "@vercel/postgres";

export default async function handler(req: any, res: any) {
  // Allow only POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing name, email, or message" });
    }

    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    // Insert lead
    await sql`
      INSERT INTO leads (name, email, message)
      VALUES (${name}, ${email}, ${message});
    `;

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);
    return res
      .status(500)
      .json({ ok: false, error: error?.message ?? "Unknown error" });
  }
}
