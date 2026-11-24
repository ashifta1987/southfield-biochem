"use client";
import { useState } from "react";

export default function EnquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => { data[k.replace(/^f-/, "")] = String(v); });
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(r.ok ? "sent" : "error");
      if (r.ok) form.reset();
    } catch { setState("error"); }
  }
  return (
    <>
<form onSubmit={onSubmit} style={{flex: "1 1 480px", minWidth: "0", background: "#f6f1e4", borderRadius: "24px", padding: "36px", display: "flex", flexDirection: "column", gap: "18px", border: "1px solid #e8e0cf"}}>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px"}}>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-name" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Your name</label><input id="f-name" name="f-name" required type="text" placeholder="Full name" style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}} /></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-company" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Company</label><input id="f-company" name="f-company" type="text" placeholder="Company / brand" style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}} /></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-email" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Email</label><input id="f-email" name="f-email" type="email" required placeholder="you@company.com" style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}} /></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-phone" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Phone / WhatsApp</label><input id="f-phone" name="f-phone" required type="tel" placeholder="+971 …" style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}} /></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-country" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Country</label><input id="f-country" name="f-country" type="text" placeholder="Country" style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}} /></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-type" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Enquiry type</label><select id="f-type" name="f-type"  style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}}><option>Private label (own store brand)</option><option>OEM — manufacture my existing brand</option><option>ODM — develop a new product</option><option>Online / social seller brand — handmade cold-process soap (MOQ 120)</option><option>Export order</option><option>Bulk promotional order of your brands (supermarket chain)</option><option>Distribution / dealership</option><option>Samples & price list</option></select></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-channel" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Sales channel</label><select id="f-channel" name="f-channel"  style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}}><option>Supermarket / retail chain</option><option>Distributor / wholesaler</option><option>Importer (overseas)</option><option>Instagram / social media selling</option><option>Amazon / Flipkart / Meesho marketplace</option><option>Own website / D2C</option><option>Hotels, salons, institutions</option><option>Other</option></select></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-volume" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Expected monthly volume</label><select id="f-volume" name="f-volume"  style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}}><option>Under 5,000 bars</option><option>5,000 – 25,000 bars</option><option>25,000 – 1 lakh bars</option><option>1 lakh+ bars / container loads</option><option>Not sure yet</option></select></div>
        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-market" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Target market</label><select id="f-market" name="f-market"  style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px"}}><option>Kerala</option><option>Other Indian states</option><option>UAE / GCC</option><option>Africa</option><option>Southeast Asia</option><option>Europe / other</option></select></div>
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: "6px"}}><label htmlFor="f-msg" style={{fontSize: "14px", fontWeight: "700", color: "#0f3b36"}}>Requirement</label><textarea id="f-msg" name="f-msg" rows={4} placeholder="Products, quantities, target market, bar weight, packaging…" style={{padding: "14px", border: "1px solid #d9d0bc", borderRadius: "12px", fontSize: "15px", background: "#ffffff", minHeight: "48px", resize: "vertical"}}></textarea></div>
      <input type="text" name="f-website" tabIndex={-1} autoComplete="off" style={{position: "absolute", left: "-9999px"}} aria-hidden="true" />
      <button className="btn" type="submit" disabled={state==="sending"} style={{background: "#9c6210", color: "#ffffff", border: "0", padding: "16px 24px", borderRadius: "999px", fontWeight: "700", fontSize: "16px", cursor: "pointer", minHeight: "48px"}}>{state==="sending" ? "Sending…" : "Send enquiry"}</button>
      {state==="sent" && (
        <span style={{color: "#0a7068", fontWeight: "700", fontSize: "15px"}}>Thank you — your enquiry has been noted. We reply within 1 working day.</span>
      )}
      <span style={{fontSize: "13px", color: "#6f7d78"}}>We never share your details. Prefer WhatsApp? Message +91 75599 99255.</span>
      {state==="error" && (<span style={{color: "#b5564a", fontWeight: 700, fontSize: "15px"}}>Sorry — something went wrong. Please WhatsApp +91 75599 99255 instead.</span>)}
    </form>
    </>
  );
}
