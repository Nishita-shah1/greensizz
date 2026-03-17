"use client";

import React, { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

// Updated keys to only include requested fruits
type FruitKey = "Apples" | "Mangoes" | "Pears";

type PartnerPlace = {
  id: string;
  name: string;
  type: "Orphanage" | "Old Age Home" | "Community Kitchen" | "Shelter" | "NGO";
  area: string;
  distanceKm: number;
  openHours: string;
  notes: string;
};

const UPI_ID = "manishsnitk@okaxis";

// Updated fruit list with descriptions
const FRUITS: Array<{
  key: FruitKey;
  blurb: string;
  estPerUnitInr: number;
}> = [
  { key: "Apples", blurb: "Crisp, premium quality with long shelf-life.", estPerUnitInr: 25 },
  { key: "Mangoes", blurb: "Sweet seasonal favorites, rich in vitamins.", estPerUnitInr: 35 },
  { key: "Pears", blurb: "Soft, hydrating, and easy for all ages to eat.", estPerUnitInr: 20 },
];

const PARTNER_PLACES: PartnerPlace[] = [
  {
    id: "plc_1",
    name: "Seva Community Kitchen",
    type: "Community Kitchen",
    area: "City Center",
    distanceKm: 2.3,
    openHours: "10:00 AM – 6:00 PM",
    notes: "Best for bulk donations. Receives daily distribution.",
  },
  {
    id: "plc_2",
    name: "Udaan Shelter Home",
    type: "Shelter",
    area: "North Block",
    distanceKm: 3.8,
    openHours: "9:00 AM – 5:00 PM",
    notes: "Prioritizes families and children.",
  },
  {
    id: "plc_3",
    name: "Asha Bal Niketan",
    type: "Orphanage",
    area: "Lake Road",
    distanceKm: 5.1,
    openHours: "11:00 AM – 4:00 PM",
    notes: "Accepts fruits Mon–Sat. Prefer washed fruits.",
  },
];

function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(amount)));
}

function clampInt(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

export default function DonatePage() {
  const [quantities, setQuantities] = useState<Record<FruitKey, number>>({
    Apples: 0,
    Mangoes: 0,
    Pears: 0,
  });

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [note, setNote] = useState("");
  const [paid, setPaid] = useState(false);
  const [utr, setUtr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | {
    receiptId: string;
    total: number;
    place?: PartnerPlace;
  }>(null);
  const [copied, setCopied] = useState(false);

  const chosenItems = useMemo(() => {
    return FRUITS.map((f) => ({
      ...f,
      qty: quantities[f.key],
      lineTotal: quantities[f.key] * f.estPerUnitInr,
    })).filter((x) => x.qty > 0);
  }, [quantities]);

  const estimatedTotal = useMemo(() => {
    return chosenItems.reduce((sum, x) => sum + x.lineTotal, 0);
  }, [chosenItems]);

  const nearbyPlaces = useMemo(() => {
    return [...PARTNER_PLACES].sort((a, b) => a.distanceKm - b.distanceKm);
  }, []);

  const selectedPlace = useMemo(() => {
    return nearbyPlaces.find((p) => p.id === selectedPlaceId);
  }, [nearbyPlaces, selectedPlaceId]);

  const canSubmit = useMemo(() => {
    return (
      chosenItems.length > 0 &&
      estimatedTotal > 0 &&
      (pincode.trim() || city.trim()) &&
      selectedPlaceId &&
      donorName.trim().length >= 2 &&
      paid &&
      utr.trim().length >= 6 &&
      !submitting
    );
  }, [chosenItems.length, estimatedTotal, pincode, city, selectedPlaceId, donorName, paid, utr, submitting]);

  async function onCopyUpi() {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch { /* fallback */ }
  }

  async function onSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
  
    try {
      // 1. Prepare the data for the database
      const donationData = {
        donor_name: donorName.trim(),
        utr: utr.trim(),
        total_amount: estimatedTotal,
        city: city.trim(),
        pincode: pincode.trim(),
        selected_place_id: selectedPlaceId,
        items: quantities, // Stores the { Apples: X, Mangoes: Y... } object
        note: note.trim(),
      };
  
      // 2. Insert into Supabase
      const { data, error } = await supabase
        .from('donations')
        .insert([donationData])
        .select();
  
      if (error) throw error;
  
      // 3. Update local state to show success
      const receiptId = `DON-${data[0].id.slice(0, 4).toUpperCase()}`;
      setSubmitted({ receiptId, total: estimatedTotal, place: selectedPlace });
  
    } catch (error) {
      console.error("Error saving donation:", error);
      alert("Something went wrong saving your donation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // SUCCESS STATE
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#fcfdfb] py-12 px-4">
        <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-900/5">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Thank you, {donorName}!</h1>
            <p className="mt-2 text-emerald-700 font-medium">Your donation request is confirmed.</p>
          </div>

          <div className="mt-8 space-y-4 rounded-2xl bg-emerald-50/50 p-6 border border-emerald-50">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Receipt ID</span>
              <span className="font-mono font-bold text-slate-900">{submitted.receiptId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount Paid</span>
              <span className="font-bold text-emerald-700 text-lg">{inr(submitted.total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Location</span>
              <span className="font-medium text-slate-900">{submitted.place?.name}</span>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-8 w-full rounded-xl bg-emerald-600 py-4 font-bold text-white transition hover:bg-emerald-700 shadow-lg shadow-emerald-200"
          >
            Make Another Donation
          </button>
        </div>
      </main>
    );
  }

  // FORM STATE
  return (
    <main className="min-h-screen bg-[#f8faf7] text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-100 mb-4">
            Fruit Donation Initiative
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Fresh Fruits, <span className="text-emerald-600">Kind Hearts.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Select premium fruits for local shelters. We handle procurement, delivery, and send you a recognition video.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Column: Fruit Selection */}
          <div className="lg:col-span-7 space-y-6">
            <section className="rounded-3xl border border-white bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Step 1: Choose Fruits</h2>
                  <p className="text-sm text-slate-500 mt-1">Select the quantity for each variety.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Estimated Total</p>
                  <p className="text-2xl font-black text-slate-900">{inr(estimatedTotal)}</p>
                </div>
              </div>

              <div className="space-y-4">
                {FRUITS.map((fruit) => (
                  <div key={fruit.key} className="group relative flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{fruit.key}</h3>
                      <p className="text-sm text-slate-500">{fruit.blurb}</p>
                      <p className="mt-1 text-xs font-semibold text-emerald-600">{inr(fruit.estPerUnitInr)} / unit</p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setQuantities(p => ({ ...p, [fruit.key]: clampInt(p[fruit.key] - 1, 0, 99) }))}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl font-bold text-slate-600 shadow-sm transition hover:bg-emerald-600 hover:text-white"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-slate-900">{quantities[fruit.key]}</span>
                      <button
                        type="button"
                        onClick={() => setQuantities(p => ({ ...p, [fruit.key]: clampInt(p[fruit.key] + 1, 0, 99) }))}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl font-bold text-slate-600 shadow-sm transition hover:bg-emerald-600 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">Step 2: Delivery Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/5"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">Pincode</label>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 560001"
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/5"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs font-bold uppercase text-slate-500 ml-1 mb-2 block">Choose a Partner Center</label>
                <div className="grid gap-3">
                  {nearbyPlaces.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlaceId(p.id)}
                      className={`relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                        selectedPlaceId === p.id 
                        ? "border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-600" 
                        : "border-slate-100 bg-white hover:border-emerald-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.type} • {p.area} • {p.distanceKm}km</p>
                        </div>
                        {selectedPlaceId === p.id && (
                          <div className="rounded-full bg-emerald-600 p-1 text-white">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Payment & Checkout */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <section className="rounded-3xl border-t-4 border-t-emerald-600 bg-slate-900 p-6 text-white shadow-xl sm:p-8">
                <h2 className="text-xl font-bold mb-6">Step 3: Secure Payment</h2>
                
                <div className="mb-6 rounded-2xl bg-white/10 p-4 border border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Scan or Copy UPI</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-sm font-medium">{UPI_ID}</span>
                    <button
                      onClick={onCopyUpi}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-500"
                    >
                      {copied ? "Copied!" : "Copy ID"}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Donor Name</label>
                    <input
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Your name for the video"
                      className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">UTR / Transaction ID</label>
                    <input
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      placeholder="Enter 12-digit UTR"
                      className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-white/5 p-4 border border-white/5 cursor-pointer" onClick={() => setPaid(!paid)}>
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${paid ? "bg-emerald-500 border-emerald-500" : "border-white/20"}`}>
                    {paid && <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold">I have paid {inr(estimatedTotal)}</p>
                    <p className="text-slate-400 mt-0.5">Payment is verified manually against the UTR.</p>
                  </div>
                </div>

                <button
                  onClick={onSubmit}
                  disabled={!canSubmit}
                  className={`mt-8 w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    canSubmit 
                    ? "bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20" 
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {submitting ? "Processing..." : "Complete Donation"}
                </button>
              </section>

              {/* Progress Tracker */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Requirements Checklist</h3>
                <ul className="space-y-3">
                  {[
                    { label: "Selected fruit items", met: chosenItems.length > 0 },
                    { label: "Delivery area provided", met: (pincode.trim() || city.trim()) },
                    { label: "Partner location selected", met: selectedPlaceId },
                    { label: "Donor identity added", met: donorName.trim().length >= 2 },
                    { label: "Valid UTR reference", met: utr.trim().length >= 6 }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs font-medium">
                      <div className={`h-2 w-2 rounded-full transition-colors ${item.met ? "bg-emerald-500" : "bg-slate-200"}`} />
                      <span className={item.met ? "text-slate-900" : "text-slate-400"}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}