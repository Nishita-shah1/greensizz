"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type FruitKey  = "Apples" | "Mangoes" | "Pears" | "Bananas" | "Oranges";
type BoxConfig = { id: string; fruitBreakdown: Partial<Record<FruitKey, number>> };
type School    = { id: string; name: string; area: string; distanceKm: number; studentsCount: number };
type Donor     = { name: string; phone: string; city: string; pincode: string };
type VisitPlan = "going" | "not_going";

const UPI_ID = "manishsnitk@okaxis";

const FRUITS: Array<{ key: FruitKey; emoji: string; pricePerUnit: number; bg: string; accent: string; desc: string }> = [
  { key: "Apples",  emoji: "🍎", pricePerUnit: 25, bg: "#fff5f5", accent: "#ef4444", desc: "Crisp & vitamin-rich" },
  { key: "Mangoes", emoji: "🥭", pricePerUnit: 35, bg: "#fffbeb", accent: "#f59e0b", desc: "Sweet summer favourite" },
  { key: "Pears",   emoji: "🍐", pricePerUnit: 20, bg: "#f7fee7", accent: "#65a30d", desc: "Soft & hydrating" },
  { key: "Bananas", emoji: "🍌", pricePerUnit: 15, bg: "#fefce8", accent: "#ca8a04", desc: "Instant energy boost" },
  { key: "Oranges", emoji: "🍊", pricePerUnit: 22, bg: "#fff7ed", accent: "#ea580c", desc: "Packed with Vitamin C" },
];

const SCHOOLS: School[] = [
  { id: "sch_1", name: "Govt. Primary School Rohini",    area: "Rohini",        distanceKm: 1.4, studentsCount: 320 },
  { id: "sch_2", name: "MCD School Pitampura",           area: "Pitampura",     distanceKm: 2.8, studentsCount: 480 },
  { id: "sch_3", name: "Sarvodaya Bal Vidyalaya",        area: "Shalimar Bagh", distanceKm: 4.1, studentsCount: 610 },
  { id: "sch_4", name: "Govt. Girls School Ashok Vihar", area: "Ashok Vihar",   distanceKm: 5.6, studentsCount: 290 },
];

const STEPS = ["You", "School", "Fruits", "Pay", "Done"];

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));
const clamp = (n: number, lo = 0, hi = 99) => Math.min(hi, Math.max(lo, Math.trunc(isNaN(n) ? lo : n)));
const uid   = () => Math.random().toString(36).slice(2, 8);

function openUpi(amount: number, name: string) {
  const p = new URLSearchParams({ pa: UPI_ID, pn: "Fruit Donation", am: amount.toFixed(2), cu: "INR", tn: `Donation by ${name}` });
  window.location.href = `upi://pay?${p}`;
}

function Certificate({ name, school, total, id, date }: { name: string; school: string; total: number; id: string; date: string }) {
  return (
    <svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <defs>
        <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0c1a0c"/><stop offset="100%" stopColor="#1a3020"/></linearGradient>
        <linearGradient id="cg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9a7a2e"/><stop offset="45%" stopColor="#f0d080"/><stop offset="100%" stopColor="#9a7a2e"/></linearGradient>
        <pattern id="cp" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.6" fill="rgba(255,255,255,0.03)"/></pattern>
      </defs>
      <rect width="800" height="520" fill="url(#cg1)"/>
      <rect width="800" height="520" fill="url(#cp)"/>
      <rect x="18" y="18" width="764" height="484" rx="6" fill="none" stroke="url(#cg2)" strokeWidth="1.2"/>
      <rect x="26" y="26" width="748" height="468" rx="4" fill="none" stroke="rgba(154,122,46,0.18)" strokeWidth="1"/>
      {([[44,44],[756,44],[44,476],[756,476]] as [number,number][]).map(([cx,cy],i) => (
        <g key={i}>
          <rect x={cx-8} y={cy-8} width="16" height="16" rx="1" fill="none" stroke="url(#cg2)" strokeWidth="1" transform={`rotate(45 ${cx} ${cy})`}/>
          <circle cx={cx} cy={cy} r="2.5" fill="#c9a84c"/>
        </g>
      ))}
      <text x="400" y="74" textAnchor="middle" fontSize="24" fontFamily="serif">🍎 🥭 🍊 🍌 🍐</text>
      <text x="400" y="112" textAnchor="middle" fontSize="9.5" fill="#c9a84c" fontFamily="Georgia,serif" letterSpacing="7">CERTIFICATE OF APPRECIATION</text>
      <line x1="210" y1="122" x2="590" y2="122" stroke="url(#cg2)" strokeWidth="0.7"/>
      <text x="400" y="154" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,.38)" fontFamily="Georgia,serif" letterSpacing="2.5">THIS IS PROUDLY PRESENTED TO</text>
      <text x="400" y="212" textAnchor="middle" fontSize="42" fill="url(#cg2)" fontFamily="Georgia,serif" fontStyle="italic">{name}</text>
      <line x1="230" y1="224" x2="570" y2="224" stroke="rgba(201,168,76,0.25)" strokeWidth="0.7"/>
      <text x="400" y="266" textAnchor="middle" fontSize="12.5" fill="rgba(255,255,255,.6)" fontFamily="Georgia,serif">for a generous contribution of <tspan fill="#f0d080" fontWeight="bold">{inr(total)}</tspan> in fresh fruits</text>
      <text x="400" y="290" textAnchor="middle" fontSize="12.5" fill="rgba(255,255,255,.6)" fontFamily="Georgia,serif">to the students of <tspan fill="#86efac">{school}</tspan></text>
      <line x1="270" y1="318" x2="530" y2="318" stroke="rgba(201,168,76,0.18)" strokeWidth="1"/>
      <text x="295" y="344" textAnchor="middle" fontSize="9" fill="#c9a84c" fontFamily="Georgia,serif" letterSpacing="1.5">DATE</text>
      <text x="295" y="362" textAnchor="middle" fontSize="11.5" fill="rgba(255,255,255,.75)" fontFamily="Georgia,serif">{date}</text>
      <text x="505" y="344" textAnchor="middle" fontSize="9" fill="#c9a84c" fontFamily="Georgia,serif" letterSpacing="1.5">RECEIPT</text>
      <text x="505" y="362" textAnchor="middle" fontSize="11.5" fill="rgba(255,255,255,.75)" fontFamily="monospace">{id}</text>
      <circle cx="400" cy="444" r="30" fill="none" stroke="url(#cg2)" strokeWidth="1.2"/>
      <circle cx="400" cy="444" r="22" fill="rgba(201,168,76,0.06)" stroke="url(#cg2)" strokeWidth="0.7"/>
      <text x="400" y="440" textAnchor="middle" fontSize="18">🌿</text>
      <text x="400" y="455" textAnchor="middle" fontSize="6.5" fill="#c9a84c" letterSpacing="2" fontFamily="Georgia,serif">VERIFIED</text>
    </svg>
  );
}

export default function DonatePage() {
  const [step, setStep]             = useState(0);
  const [donor, setDonor]           = useState<Donor>({ name: "", phone: "", city: "", pincode: "" });
  const [locLoading, setLocLoading] = useState(false);
  const [googleReady, setGReady]    = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const [schoolId, setSchoolId]     = useState("");
  const [visitPlan, setVisitPlan]   = useState<VisitPlan>("not_going");
  const [boxes, setBoxes]           = useState<BoxConfig[]>([{ id: uid(), fruitBreakdown: {} }]);
  const [paid, setPaid]             = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr]   = useState<string | null>(null);
  const [receipt, setReceipt]       = useState<{ id: string; date: string } | null>(null);
  const [images, setImages]         = useState<File[]>([]);
  const fileRef                     = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.getElementById("gsi")) { setGReady(true); return; }
    const s = Object.assign(document.createElement("script"), { id: "gsi", src: "https://accounts.google.com/gsi/client", async: true, defer: true });
    s.onload = () => setGReady(true);
    document.head.appendChild(s);
  }, []);

  function handleOneTap() {
    if (googleReady && (window as any).google?.accounts?.id) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: (res: any) => {
          try {
            const p = JSON.parse(atob(res.credential.split(".")[1]));
            setDonor((d) => ({ ...d, name: d.name || p.name || "" }));
          } catch { /* ignore */ }
        },
        use_fedcm_for_prompt: true,
      });
      (window as any).google.accounts.id.prompt();
    }
    if (navigator.geolocation) {
      setLocLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
            const d = await r.json();
            setDonor((prev) => ({
              ...prev,
              city:    prev.city    || d.address?.city    || d.address?.town    || d.address?.village || "",
              pincode: prev.pincode || d.address?.postcode || "",
            }));
          } catch { /* ignore */ }
          setLocLoading(false); setAutoFilled(true);
        },
        () => { setLocLoading(false); setAutoFilled(true); }
      );
    } else { setAutoFilled(true); }
  }

  const school     = useMemo(() => SCHOOLS.find((s) => s.id === schoolId), [schoolId]);
  const boxTotals  = useMemo(() => boxes.map((box) => Object.entries(box.fruitBreakdown).reduce((s, [k, q]) => s + (FRUITS.find((f) => f.key === k)?.pricePerUnit ?? 0) * (q ?? 0), 0)), [boxes]);
  const grandTotal = useMemo(() => boxTotals.reduce((a, b) => a + b, 0), [boxTotals]);
  const totalItems = useMemo(() => boxes.reduce((s, b) => s + Object.values(b.fruitBreakdown).reduce((a, q) => a + (q ?? 0), 0), 0), [boxes]);

  const addBox    = () => setBoxes((b) => [...b, { id: uid(), fruitBreakdown: {} }]);
  const removeBox = (id: string) => setBoxes((b) => b.filter((x) => x.id !== id));
  const setQty    = (boxId: string, fruit: FruitKey, qty: number) =>
    setBoxes((b) => b.map((box) => box.id === boxId ? { ...box, fruitBreakdown: { ...box.fruitBreakdown, [fruit]: clamp(qty) } } : box));

  const s0 = donor.name.trim().length >= 2 && !!(donor.city.trim() || donor.pincode.trim());
  const s1 = !!schoolId;
  const s2 = grandTotal > 0;
  const s3 = paid;

  async function onSubmit() {
    if (!s3 || submitting) return;
    setSubmitting(true); setSubmitErr(null);
    try {
      const { data, error } = await supabase.from("donations").insert([{
        donor_name: donor.name.trim(), donor_phone: donor.phone.trim(),
        city: donor.city.trim(), pincode: donor.pincode.trim(),
        school_id: schoolId, school_name: school?.name ?? "",
        visit_plan: visitPlan,
        boxes: boxes.map((b) => b.fruitBreakdown),
        total_amount: grandTotal,
      }]).select("id");
      if (error) { setSubmitErr(`Supabase: ${error.message}`); return; }
      if (!data?.length) { setSubmitErr("No row returned — check RLS policies in Supabase."); return; }
      setReceipt({ id: `DON-${String(data[0].id).slice(0, 6).toUpperCase()}`, date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) });
      setStep(4);
    } catch (e: any) {
      setSubmitErr(e?.message ?? "Unexpected error");
    } finally { setSubmitting(false); }
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400;1,9..144,600&family=Geist:wght@300;400;500;600&display=swap');

    :root {
      --sage: #4a6741;
      --sage-light: #6b9466;
      --cream: #faf8f4;
      --warm-white: #ffffff;
      --ink: #1a1a1a;
      --ink-soft: #444;
      --ink-muted: #888;
      --ink-ghost: #bbb;
      --border: #ebebeb;
      --border-soft: #f2f2f2;
      --gold: #c9a84c;
      --gold-light: #f0d080;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06);
      --shadow-md: 0 2px 8px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.1);
      --shadow-lg: 0 8px 24px rgba(0,0,0,0.08), 0 32px 80px rgba(0,0,0,0.14);
      --radius: 20px;
      --radius-sm: 12px;
      --radius-xs: 8px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .root {
      font-family: 'Geist', sans-serif;
      background: var(--cream);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Mesh background ── */
    .mesh-bg {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background:
        radial-gradient(ellipse 80% 60% at 20% 10%, rgba(74,103,65,0.06) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 90%, rgba(201,168,76,0.05) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 60% 40%, rgba(74,103,65,0.03) 0%, transparent 50%);
    }

    /* ── Floating nav ── */
    .nav {
      position: sticky; top: 16px; z-index: 100;
      padding: 0 16px;
      margin-bottom: 32px;
    }
    .nav-inner {
      max-width: 480px; margin: 0 auto;
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(20px) saturate(1.4);
      -webkit-backdrop-filter: blur(20px) saturate(1.4);
      border: 1px solid rgba(255,255,255,0.9);
      border-radius: 60px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1);
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
    }
    .nav-step { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
    .nav-circle {
      width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; transition: all .3s cubic-bezier(.34,1.56,.64,1);
    }
    .nav-circle.done   { background: var(--sage); color: #fff; }
    .nav-circle.active { background: var(--ink); color: #fff; transform: scale(1.18); box-shadow: 0 0 0 4px rgba(26,26,26,0.1); }
    .nav-circle.idle   { background: #f0f0f0; color: var(--ink-ghost); }
    .nav-label { font-size: 8px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
    .nav-label.active { color: var(--ink); }
    .nav-label.other  { color: var(--ink-ghost); }
    .nav-line { flex: 1; height: 1px; margin: 0 2px; margin-bottom: 14px; transition: background .4s; }
    .nav-line.done { background: var(--sage); opacity: 0.35; }
    .nav-line.idle { background: #e8e8e8; }

    /* ── Hero ── */
    .hero { text-align: center; padding: 48px 20px 0; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 14px; border-radius: 20px;
      background: rgba(74,103,65,0.08);
      border: 1px solid rgba(74,103,65,0.16);
      font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
      color: var(--sage); margin-bottom: 20px;
    }
    .hero-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(34px, 8vw, 56px);
      font-weight: 300;
      color: var(--ink);
      line-height: 1.08;
      letter-spacing: -.03em;
    }
    .hero-title em { font-style: italic; font-weight: 500; color: var(--sage); }
    .hero-sub {
      font-size: 14px; color: var(--ink-muted); line-height: 1.75;
      margin: 14px auto 0; max-width: 320px; font-weight: 300;
    }

    /* ── Cards ── */
    .body { max-width: 480px; margin: 0 auto; padding: 24px 16px 100px; position: relative; z-index: 1; }
    .card {
      background: var(--warm-white);
      border-radius: var(--radius);
      border: 1px solid var(--border-soft);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }
    .card-head {
      padding: 28px 28px 0;
    }
    .card-eyebrow {
      font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
      color: var(--sage); margin-bottom: 8px;
    }
    .card-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 24px; font-weight: 500; color: var(--ink);
      letter-spacing: -.02em; line-height: 1.2;
    }
    .card-sub { font-size: 13px; color: var(--ink-muted); margin-top: 5px; line-height: 1.6; font-weight: 300; }
    .card-body { padding: 24px 28px 28px; }
    .card-divider { height: 1px; background: var(--border-soft); margin: 0 28px; }

    /* ── Inputs ── */
    .field { margin-bottom: 16px; }
    .lbl { display: block; font-size: 10px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 7px; }
    .inp {
      width: 100%; height: 50px;
      background: #fafafa; border: 1.5px solid var(--border);
      border-radius: 14px; padding: 0 16px;
      font-size: 14px; font-family: 'Geist', sans-serif; color: var(--ink);
      outline: none; transition: all .18s;
    }
    .inp:focus { border-color: var(--ink); background: #fff; box-shadow: 0 0 0 4px rgba(26,26,26,0.04); }
    .inp::placeholder { color: #d0d0d0; }
    .inp-wrap { position: relative; }
    .inp-spin {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid #ddd; border-top-color: var(--sage);
      animation: spin .7s linear infinite;
    }
    @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

    /* ── Google btn ── */
    .g-btn {
      width: 100%; height: 52px;
      border: 1.5px solid var(--border); border-radius: 14px;
      background: #fff;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      font-size: 13.5px; font-weight: 500; color: var(--ink-soft);
      cursor: pointer; font-family: 'Geist', sans-serif;
      transition: all .18s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    .g-btn:hover { border-color: #bbb; box-shadow: 0 3px 14px rgba(0,0,0,0.09); transform: translateY(-1px); }
    .filled-ok {
      display: flex; align-items: center; gap: 10px;
      background: #f0fdf4; border: 1px solid #bbf7d0;
      border-radius: 12px; padding: 11px 14px;
    }
    .divider-row { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
    .divider-line { flex: 1; height: 1px; background: var(--border-soft); }
    .divider-text { font-size: 11px; color: #ccc; font-weight: 500; }

    /* ── School cards ── */
    .school-list { display: flex; flex-direction: column; gap: 8px; }
    .s-card {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 16px; border: 1.5px solid var(--border-soft);
      border-radius: 16px; background: #fff; cursor: pointer;
      text-align: left; width: 100%; transition: all .18s;
    }
    .s-card:hover { border-color: #ccc; box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-1px); }
    .s-card.sel   { border-color: var(--ink); background: #fafafa; box-shadow: 0 0 0 3px rgba(26,26,26,0.05); }
    .s-icon {
      width: 46px; height: 46px; border-radius: 12px;
      background: #f5f5f5; display: flex; align-items: center;
      justify-content: center; font-size: 22px; flex-shrink: 0;
    }
    .s-name { font-weight: 600; font-size: 13.5px; color: var(--ink); line-height: 1.3; }
    .s-meta { font-size: 11.5px; color: var(--ink-muted); margin-top: 3px; }
    .s-check {
      width: 22px; height: 22px; border-radius: 50%;
      background: var(--ink); color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; flex-shrink: 0; margin-left: auto;
    }
    .visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
    .v-card { padding: 14px 16px; border: 1.5px solid var(--border-soft); border-radius: 14px; background: #fff; cursor: pointer; text-align: left; transition: all .15s; }
    .v-card:hover { border-color: #bbb; }
    .v-card.sel   { border-color: var(--ink); background: #fafafa; }

    /* ── Fruit shopping cards ── */
    .cart-bar {
      display: flex; align-items: center; justify-content: space-between;
      background: var(--ink); border-radius: 16px; padding: 16px 20px;
      margin-bottom: 22px;
    }
    .cart-bar-left p:first-child { font-size: 10px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 3px; }
    .cart-total { font-family: 'Fraunces', Georgia, serif; font-size: 30px; font-weight: 500; color: #fff; line-height: 1; }
    .cart-bar-right { text-align: right; }
    .cart-pill {
      display: inline-flex; align-items: center; gap: 5px;
      background: rgba(255,255,255,.1); border-radius: 20px;
      padding: 4px 10px; font-size: 11px; color: rgba(255,255,255,.6);
      font-weight: 500; margin-bottom: 4px;
    }

    /* Box container */
    .box-section { margin-bottom: 16px; }
    .box-label {
      font-size: 10px; font-weight: 700; letter-spacing: .16em;
      text-transform: uppercase; color: var(--ink-muted);
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 10px;
    }
    .box-remove-btn { font-size: 11px; color: #f87171; background: none; border: none; cursor: pointer; font-family: inherit; font-weight: 600; letter-spacing: 0; }

    /* Fruit product cards */
    .fruit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .f-card {
      border: 1.5px solid var(--border-soft);
      border-radius: 16px; padding: 14px;
      cursor: default; transition: all .18s;
      background: #fff; position: relative; overflow: hidden;
    }
    .f-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-1px); }
    .f-card.has-qty { border-color: transparent; }
    .f-card-bg { position: absolute; inset: 0; opacity: 0; transition: opacity .3s; border-radius: 14px; }
    .f-card.has-qty .f-card-bg { opacity: 1; }
    .f-emoji { font-size: 28px; margin-bottom: 8px; display: block; }
    .f-name  { font-weight: 600; font-size: 13px; color: var(--ink); }
    .f-desc  { font-size: 10.5px; color: var(--ink-muted); margin-top: 2px; line-height: 1.4; }
    .f-price { font-size: 11px; font-weight: 600; margin-top: 6px; }
    .f-qty-row {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.05);
    }
    .f-subtotal { font-size: 12px; font-weight: 700; }
    .qty-ctrl { display: flex; align-items: center; gap: 8px; }
    .q-btn {
      width: 28px; height: 28px; border-radius: 7px;
      border: 1.5px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.8);
      font-size: 14px; font-weight: 500; color: var(--ink-soft);
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all .12s; flex-shrink: 0; backdrop-filter: blur(4px);
    }
    .q-btn:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
    .q-val { width: 20px; text-align: center; font-weight: 700; font-size: 14px; color: var(--ink); }

    .add-box-btn {
      width: 100%; margin-top: 4px;
      border: 1.5px dashed #ddd; border-radius: 14px;
      background: none; padding: 12px 0;
      font-size: 12.5px; font-weight: 500; color: var(--ink-muted);
      cursor: pointer; font-family: inherit; transition: all .15s;
    }
    .add-box-btn:hover { border-color: var(--sage); color: var(--sage); }

    /* ── Payment ── */
    .order-card {
      background: #fafafa; border: 1px solid var(--border-soft);
      border-radius: 16px; padding: 18px 20px; margin-bottom: 20px;
    }
    .os-row { display: flex; justify-content: space-between; align-items: flex-start; font-size: 13px; padding: 5px 0; }
    .os-key { color: var(--ink-muted); }
    .os-val { font-weight: 600; color: var(--ink); max-width: 58%; text-align: right; line-height: 1.4; }
    .os-total-val { font-family: 'Fraunces', Georgia, serif; font-size: 26px; font-weight: 500; color: var(--ink); }
    .upi-btn {
      width: 100%; height: 56px; border: none; border-radius: 16px;
      background: var(--sage); color: #fff;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      font-size: 14px; font-weight: 600; cursor: pointer;
      font-family: 'Geist', sans-serif; transition: all .18s; letter-spacing: .01em;
    }
    .upi-btn:hover { background: #3d5837; box-shadow: 0 6px 20px rgba(74,103,65,0.35); transform: translateY(-1px); }
    .upi-btn:active { transform: scale(.98); }
    .upi-hint { text-align: center; font-size: 11px; color: var(--ink-ghost); margin-top: 8px; margin-bottom: 20px; }
    .check-row {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 16px; border-radius: 14px; border: 1.5px solid var(--border-soft);
      cursor: pointer; transition: all .15s;
    }
    .check-row.on { border-color: var(--sage); background: rgba(74,103,65,0.03); }
    .check-box {
      width: 20px; height: 20px; border-radius: 6px;
      border: 1.5px solid #ddd; flex-shrink: 0; margin-top: 1px;
      display: flex; align-items: center; justify-content: center; transition: all .15s;
    }
    .check-box.on { background: var(--sage); border-color: var(--sage); }
    .upload-btn {
      width: 100%; border: 1.5px dashed #ddd; border-radius: 14px;
      background: none; padding: 14px 0; font-size: 13px; font-weight: 500;
      color: var(--ink-muted); cursor: pointer; font-family: inherit; transition: all .15s; margin-top: 8px;
    }
    .upload-btn:hover { border-color: var(--sage); color: var(--sage); }
    .err-box {
      background: #fff5f5; border: 1px solid #fecaca;
      border-radius: 12px; padding: 12px 16px;
      font-size: 12px; color: #b91c1c; margin-top: 14px; line-height: 1.5;
    }

    /* ── Buttons ── */
    .btn-row { display: flex; gap: 10px; margin-top: 24px; }
    .btn-primary {
      flex: 1; height: 52px; background: var(--ink); color: #fff;
      border: none; border-radius: 14px; font-size: 13px; font-weight: 600;
      cursor: pointer; font-family: 'Geist', sans-serif;
      transition: all .18s; letter-spacing: .02em;
    }
    .btn-primary:hover { background: #2a2a2a; box-shadow: 0 6px 20px rgba(0,0,0,.22); transform: translateY(-1px); }
    .btn-primary:active { transform: scale(.98); }
    .btn-primary:disabled { background: #e8e8e8; color: #bbb; cursor: not-allowed; box-shadow: none; transform: none; }
    .btn-ghost {
      height: 52px; padding: 0 22px; border: 1.5px solid var(--border);
      border-radius: 14px; background: transparent; font-size: 13px;
      font-weight: 500; color: var(--ink-muted); cursor: pointer;
      font-family: 'Geist', sans-serif; transition: all .15s; flex-shrink: 0;
    }
    .btn-ghost:hover { border-color: #aaa; background: #f8f8f8; }

    /* ── Success ── */
    .success-hero { text-align: center; padding: 8px 0 24px; }
    .cert-wrap { border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-lg); }
    .info-card {
      border-radius: 16px; padding: 18px 20px; margin-top: 14px;
    }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px) scale(.99); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }
    .fade-up { animation: fadeUp .36s cubic-bezier(.22,1,.36,1) forwards; }

    @keyframes popIn {
      from { opacity: 0; transform: scale(.92); }
      to   { opacity: 1; transform: scale(1); }
    }
    .pop-in { animation: popIn .28s cubic-bezier(.34,1.56,.64,1) forwards; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="root">
        <div className="mesh-bg" />

        {/* ── Hero ── */}
        <div className="hero">
          <div className="hero-badge">🌿 Fruit Donation Initiative</div>
          <h1 className="hero-title">
            Fresh Fruits for<br /><em>Young Futures</em>
          </h1>
          <p className="hero-sub">
            Donate to a government school near you —<br />
            receive a certificate &amp; a personalised AI video.
          </p>
        </div>

        {/* ── Floating step nav ── */}
        <div className="nav" style={{ marginTop: 32 }}>
          <div className="nav-inner">
            {STEPS.map((label, i) => (
              <React.Fragment key={i}>
                <div className="nav-step" style={{ cursor: i < step ? "pointer" : "default" }} onClick={() => { if (i < step) setStep(i); }}>
                  <div className={`nav-circle ${i < step ? "done" : i === step ? "active" : "idle"}`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`nav-label ${i === step ? "active" : "other"}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`nav-line ${i < step ? "done" : "idle"}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="body">

          {/* ════ STEP 0 ════ */}
          {step === 0 && (
            <div className="fade-up">
              <div className="card">
                <div className="card-head" style={{ paddingBottom: 20 }}>
                  <p className="card-eyebrow">Step 1 of 4</p>
                  <h2 className="card-title">Your details</h2>
                  <p className="card-sub">One tap to auto-fill your name and location.</p>
                </div>
                <div className="card-body">
                  {!autoFilled ? (
                    <button className="g-btn" onClick={handleOneTap}>
                      <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.66l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      Continue with Google
                      {locLoading && <div style={{ width:14, height:14, borderRadius:"50%", border:"2px solid #ddd", borderTopColor: "var(--sage)", animation:"spin .7s linear infinite", flexShrink:0 }}/>}
                    </button>
                  ) : (
                    <div className="filled-ok pop-in">
                      <span style={{ color:"#16a34a", fontSize:16 }}>✓</span>
                      <span style={{ fontSize:13, fontWeight:500, color:"#15803d", flex:1 }}>Auto-filled — review below</span>
                      <button onClick={() => setAutoFilled(false)} style={{ fontSize:11, color:"#16a34a", textDecoration:"underline", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit" }}>Re-fetch</button>
                    </div>
                  )}

                  <div className="divider-row">
                    <div className="divider-line"/><span className="divider-text">or fill manually</span><div className="divider-line"/>
                  </div>

                  <div className="field">
                    <span className="lbl">Full Name</span>
                    <input className="inp" value={donor.name} onChange={(e) => setDonor((d) => ({ ...d, name: e.target.value }))} placeholder="Your name" autoComplete="name"/>
                  </div>
                  <div className="field">
                    <span className="lbl">Mobile Number</span>
                    <input className="inp" value={donor.phone} onChange={(e) => setDonor((d) => ({ ...d, phone: e.target.value }))} placeholder="10-digit number" type="tel" inputMode="tel" autoComplete="tel"/>
                  </div>
                  <div className="grid2">
                    <div className="field">
                      <span className="lbl">{locLoading ? "Detecting…" : "City"}</span>
                      <div className="inp-wrap">
                        <input className="inp" value={donor.city} onChange={(e) => setDonor((d) => ({ ...d, city: e.target.value }))} placeholder="Auto-filled" autoComplete="address-level2" style={{ paddingRight: locLoading ? 36 : 16 }}/>
                        {locLoading && <div className="inp-spin"/>}
                      </div>
                    </div>
                    <div className="field">
                      <span className="lbl">Pincode</span>
                      <input className="inp" value={donor.pincode} onChange={(e) => setDonor((d) => ({ ...d, pincode: e.target.value }))} placeholder="Auto-filled" inputMode="numeric" autoComplete="postal-code"/>
                    </div>
                  </div>

                  <button className="btn-primary" style={{ width:"100%", marginTop:8 }} disabled={!s0} onClick={() => setStep(1)}>
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 1 ════ */}
          {step === 1 && (
            <div className="fade-up">
              <div className="card">
                <div className="card-head" style={{ paddingBottom: 20 }}>
                  <p className="card-eyebrow">Step 2 of 4</p>
                  <h2 className="card-title">Choose a school</h2>
                  <p className="card-sub">Select the school that will receive your donation.</p>
                </div>
                <div className="card-body">
                  <div className="school-list">
                    {SCHOOLS.map((s) => (
                      <button key={s.id} className={`s-card ${schoolId === s.id ? "sel" : ""}`} onClick={() => setSchoolId(s.id)}>
                        <div className="s-icon">🏫</div>
                        <div style={{ flex:1, textAlign:"left" }}>
                          <p className="s-name">{s.name}</p>
                          <p className="s-meta">{s.area} · {s.distanceKm} km · {s.studentsCount.toLocaleString()} students</p>
                        </div>
                        {schoolId === s.id && <div className="s-check">✓</div>}
                      </button>
                    ))}
                  </div>

                  {schoolId && (
                    <div style={{ marginTop:22 }} className="pop-in">
                      <span className="lbl">Will you visit the school?</span>
                      <div className="visit-grid">
                        {([["going","🚶 I'll visit","Upload your own photos"],["not_going","📦 Ship it","School provides photos"]] as const).map(([v,l,s]) => (
                          <button key={v} className={`v-card ${visitPlan === v ? "sel" : ""}`} onClick={() => setVisitPlan(v)}>
                            <p style={{ fontWeight:600, fontSize:13, color:"var(--ink)" }}>{l}</p>
                            <p style={{ fontSize:11, color:"var(--ink-muted)", marginTop:4, lineHeight:1.4 }}>{s}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="btn-row">
                    <button className="btn-ghost" onClick={() => setStep(0)}>← Back</button>
                    <button className="btn-primary" disabled={!s1} onClick={() => setStep(2)}>Continue →</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 2 ════ */}
          {step === 2 && (
            <div className="fade-up">
              <div className="card">
                <div className="card-head" style={{ paddingBottom: 20 }}>
                  <p className="card-eyebrow">Step 3 of 4</p>
                  <h2 className="card-title">Build your boxes</h2>
                  <p className="card-sub">Pick fruits for each box — mix and match freely.</p>
                </div>
                <div className="card-body">

                  {/* Cart summary bar */}
                  <div className="cart-bar">
                    <div className="cart-bar-left">
                      <p>Grand Total</p>
                      <p className="cart-total">{inr(grandTotal)}</p>
                    </div>
                    <div className="cart-bar-right">
                      <div className="cart-pill">📦 {boxes.length} box{boxes.length !== 1 ? "es" : ""}</div><br/>
                      <div className="cart-pill">🍱 {totalItems} items</div>
                    </div>
                  </div>

                  {/* Boxes */}
                  {boxes.map((box, idx) => (
                    <div key={box.id} className="box-section">
                      <div className="box-label">
                        <span>Box {idx + 1} — {inr(boxTotals[idx])}</span>
                        {boxes.length > 1 && <button className="box-remove-btn" onClick={() => removeBox(box.id)}>✕ Remove</button>}
                      </div>

                      {/* Fruit product grid */}
                      <div className="fruit-grid">
                        {FRUITS.map((fruit) => {
                          const qty     = box.fruitBreakdown[fruit.key] ?? 0;
                          const hasQty  = qty > 0;
                          const lineAmt = qty * fruit.pricePerUnit;
                          return (
                            <div key={fruit.key} className={`f-card ${hasQty ? "has-qty" : ""}`}>
                              <div className="f-card-bg" style={{ background: fruit.bg }} />
                              <span style={{ position:"relative" }}>
                                <span className="f-emoji">{fruit.emoji}</span>
                                <span className="f-name">{fruit.key}</span>
                                <span className="f-desc" style={{ display:"block" }}>{fruit.desc}</span>
                                <span className="f-price" style={{ color: hasQty ? fruit.accent : "var(--ink-muted)" }}>
                                  {inr(fruit.pricePerUnit)}/unit
                                </span>
                              </span>
                              <div className="f-qty-row">
                                <span className="f-subtotal" style={{ color: hasQty ? fruit.accent : "var(--ink-ghost)" }}>
                                  {hasQty ? inr(lineAmt) : "—"}
                                </span>
                                <div className="qty-ctrl">
                                  <button className="q-btn" onClick={() => setQty(box.id, fruit.key, qty - 1)}>−</button>
                                  <span className="q-val">{qty}</span>
                                  <button className="q-btn" onClick={() => setQty(box.id, fruit.key, qty + 1)}>+</button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {idx < boxes.length - 1 && <div style={{ height:1, background:"var(--border-soft)", margin:"16px 0" }}/>}
                    </div>
                  ))}

                  <button className="add-box-btn" onClick={addBox}>＋ Add another box</button>

                  <div className="btn-row">
                    <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn-primary" disabled={!s2} onClick={() => setStep(3)}>Continue →</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 3 ════ */}
          {step === 3 && (
            <div className="fade-up">
              <div className="card">
                <div className="card-head" style={{ paddingBottom: 20 }}>
                  <p className="card-eyebrow">Step 4 of 4</p>
                  <h2 className="card-title">Complete payment</h2>
                  <p className="card-sub">Pay via any UPI app — amount is pre-filled.</p>
                </div>
                <div className="card-body">
                  <div className="order-card">
                    {[["Donor", donor.name], ["School", school?.name ?? ""], ["Boxes", `${boxes.length} box${boxes.length !== 1 ? "es" : ""}`]].map(([k, v]) => (
                      <div key={k} className="os-row"><span className="os-key">{k}</span><span className="os-val">{v}</span></div>
                    ))}
                    <div style={{ borderTop:"1px solid var(--border-soft)", marginTop:10, paddingTop:12 }}>
                      <div className="os-row">
                        <span style={{ fontWeight:600, fontSize:13, color:"var(--ink-soft)" }}>Total</span>
                        <span className="os-total-val">{inr(grandTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="upi-btn" onClick={() => openUpi(grandTotal, donor.name)}>
                    <span style={{ fontSize:20 }}>📲</span> Pay {inr(grandTotal)} via UPI
                  </button>
                  <p className="upi-hint">GPay · PhonePe · Paytm · BHIM</p>

                  <div className={`check-row ${paid ? "on" : ""}`} onClick={() => setPaid(!paid)}>
                    <div className={`check-box ${paid ? "on" : ""}`}>
                      {paid && <span style={{ color:"#fff", fontSize:10, fontWeight:700 }}>✓</span>}
                    </div>
                    <div>
                      <p style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>I've completed the payment</p>
                      <p style={{ fontSize:11, color:"var(--ink-muted)", marginTop:3 }}>Tick after your UPI app confirms.</p>
                    </div>
                  </div>

                  {visitPlan === "going" && (
                    <div style={{ marginTop:16 }}>
                      <span className="lbl">Upload visit photos</span>
                      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={(e) => setImages(Array.from(e.target.files ?? []))}/>
                      <button className="upload-btn" onClick={() => fileRef.current?.click()}>
                        {images.length > 0 ? `${images.length} photo(s) selected ✓` : "📸 Upload photos"}
                      </button>
                    </div>
                  )}

                  {submitErr && <div className="err-box"><strong>Error:</strong> {submitErr}</div>}

                  <div className="btn-row">
                    <button className="btn-ghost" onClick={() => setStep(2)}>← Back</button>
                    <button className="btn-primary" disabled={!s3 || submitting} onClick={onSubmit}>
                      {submitting ? "Submitting…" : "Get my certificate →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 4 ════ */}
          {step === 4 && receipt && (
            <div className="fade-up">
              <div className="success-hero">
                <div style={{ fontSize:48, marginBottom:14 }}>🎉</div>
                <h2 style={{ fontFamily:"'Fraunces', Georgia, serif", fontSize:30, fontWeight:500, color:"var(--ink)", letterSpacing:"-.02em" }}>
                  Certificate ready!
                </h2>
                <p style={{ fontSize:13, color:"var(--ink-muted)", marginTop:8, fontWeight:300 }}>
                  Thank you, <strong style={{ fontWeight:600, color:"var(--ink)" }}>{donor.name}</strong>. Your gift reaches {school?.studentsCount?.toLocaleString()} students.
                </p>
              </div>

              <div className="cert-wrap">
                <Certificate name={donor.name} school={school?.name ?? ""} total={grandTotal} id={receipt.id} date={receipt.date}/>
              </div>

              <div className="info-card" style={{ background:"#fffbeb", border:"1px solid #fde68a" }}>
                <p style={{ fontWeight:700, fontSize:13, color:"#92400e", marginBottom:6 }}>🎬 Your personalised AI video is being prepared</p>
                <p style={{ fontSize:12, color:"#b45309", lineHeight:1.7, fontWeight:300 }}>
                  {visitPlan === "going"
                    ? `We'll use your uploaded photos to create a personalised thank-you video, sent to ${donor.phone || "your number"} within 48 hrs.`
                    : `${school?.name} will photograph the distribution. Our AI will craft a video featuring your name — sent to ${donor.phone || "your number"} within 48 hrs.`}
                </p>
              </div>

              <div className="info-card" style={{ background:"#fff", border:"1px solid var(--border-soft)" }}>
                <p style={{ fontSize:"9.5px", fontWeight:700, letterSpacing:".14em", color:"#ccc", textTransform:"uppercase", marginBottom:12 }}>How your video is made</p>
                {[["📷","School photographs the fruit distribution"],["🤖","AI creates a personalised video with your name & school photos"],["📱","Delivered via WhatsApp within 48 hrs"]].map(([icon,text],i) => (
                  <div key={i} style={{ display:"flex", gap:10, fontSize:12, color:"var(--ink-soft)", marginBottom:8, lineHeight:1.6 }}>
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>

              <button className="btn-ghost" style={{ width:"100%", marginTop:12, height:48 }} onClick={() => window.location.reload()}>
                Make another donation
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}