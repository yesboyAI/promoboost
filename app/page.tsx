"use client";

import { useState } from "react";

export default function Home() {
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [offer, setOffer] = useState("");
  const [language, setLanguage] = useState("ro");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStrategy = async () => {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business,
        city,
        offer,
        language,
      }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="container">
      <h1 className="title">PromoBoost AI</h1>
      <p className="subtitle">
        AI Market Intelligence pentru Business-uri Locale
      </p>

      <div className="langSwitch">
        <button onClick={() => setLanguage("ro")}>🇷🇴 RO</button>
        <button onClick={() => setLanguage("en")}>🇬🇧 EN</button>
      </div>

      <div className="card">
        <input
          placeholder="Tip business (ex: Frizerie)"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        />

        <input
          placeholder="Oraș / Zonă"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          placeholder="Promoție actuală"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <button onClick={generateStrategy}>
          {loading ? "Se generează..." : "Generează Strategie"}
        </button>
      </div>

      {result && (
        <div className="result">
          <pre>{result}</pre>
        </div>
      )}
    </main>
  );
}