import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const TO = process.env.ENQUIRY_TO || "b2b@southfieldbiochem.com";

export async function POST(req: Request) {
  let data: Record<string, string>;
  try { data = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  if (!name || !email || !phone) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
  if (data.website) return NextResponse.json({ ok: true }); // honeypot

  const lead = {
    name, email, phone,
    company: data.company || null,
    country: data.country || null,
    enquiry_type: data.type || null,
    channel: data.channel || null,
    volume: data.volume || null,
    market: data.market || null,
    message: data.msg || null,
    source: "website",
  };

  const errors: string[] = [];

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await sb.from("enquiries").insert(lead);
    if (error) errors.push("db:" + error.message);
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const rows = Object.entries(lead).filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:6px 10px;color:#666">${k}</td><td style="padding:6px 10px"><b>${String(v).replace(/</g, "&lt;")}</b></td></tr>`).join("");
    const { error } = await resend.emails.send({
      from: process.env.ENQUIRY_FROM || "Southfield Website <onboarding@resend.dev>",
      to: [TO],
      replyTo: email,
      subject: `New enquiry — ${lead.enquiry_type || "website"} — ${name}${lead.company ? " (" + lead.company + ")" : ""}`,
      html: `<h2 style="font-family:sans-serif">New website enquiry</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
    });
    if (error) errors.push("mail:" + error.message);
  }

  if (errors.length && errors.length === (process.env.SUPABASE_URL ? 1 : 0) + (process.env.RESEND_API_KEY ? 1 : 0)) {
    console.error(errors);
    return NextResponse.json({ ok: false, errors }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
