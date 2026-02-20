import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { business, city, offer, language } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Ești un consultant strategic de top specializat în business-uri locale.

Analizează următoarele informații:

Business: ${business}
Oraș/Zonă: ${city}
Promoție actuală: ${offer}

Simulează o analiză realistă a pieței locale și creează:

1. Analiză competitivă locală
2. Oportunități neexploatate
3. Propunere unică de diferențiere (USP)
4. Strategie de poziționare premium
5. Strategie marketing digital
6. Strategie retenție clienți
7. Idei inovatoare diferite de competiție
8. Plan de acțiune pe 30 zile

Răspunsul trebuie să fie complet în ${
      language === "ro" ? "română" : "engleză"
    }.
Livrează direct strategia, fără explicații despre proces.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      messages: [
        {
          role: "system",
          content:
            "You are a top-tier strategic business consultant specializing in competitive local intelligence.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}