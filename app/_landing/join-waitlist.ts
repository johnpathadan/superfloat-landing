"use server";

export type WaitlistState = { status: "idle" | "joined" | "already" | "error"; message?: string };

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const FAILED: WaitlistState = { status: "error", message: "Something went wrong. Please try again in a moment." };

/** Adds an email to the Supabase waitlist. The publishable key can only insert into this table, never read it. */
export async function joinWaitlist(_prev: WaitlistState, form: FormData): Promise<WaitlistState> {
  // Bots fill every field, people never see this one.
  if (form.get("company")) return { status: "joined" };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const source = String(form.get("source") ?? "").slice(0, 40) || null;
  const platforms = String(form.get("platforms") ?? "").replace(/\s+/g, " ").trim() || null;
  if (email.length > 254 || !EMAIL.test(email)) return { status: "error", message: "Please enter a valid email address." };
  if (platforms && platforms.length > 300) return { status: "error", message: "Please keep the platforms under 300 characters." };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error("Waitlist: SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set");
    return FAILED;
  }

  try {
    const res = await fetch(`${url}/rest/v1/waitlist`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ email, source, platforms }),
      cache: "no-store",
    });
    if (res.ok) return { status: "joined" };
    // The unique index on lower(email) turns a repeat signup into a 409.
    if (res.status === 409) return { status: "already" };
    console.error("Waitlist: insert failed", res.status, await res.text());
  } catch (err) {
    console.error("Waitlist: request failed", err);
  }
  return FAILED;
}
