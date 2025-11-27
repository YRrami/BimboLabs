// api/db-test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql } from "@vercel/postgres";

export default async function handler(req: any, res: any) {
  try {
    const result = await sql`SELECT NOW() as now;`;
    res.status(200).json({ ok: true, now: result.rows[0].now });
  } catch (error: any) {
    console.error("DB TEST ERROR:", error);
    res
      .status(500)
      .json({
        ok: false,
        error:
          error?.message ?? "Unknown error",
      });
  }
}
