import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY || "");

export async function POST(req) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Você é o Jarvis, o cérebro estratégico do Hub Lowticket Gregori. 
    Sua missão é auxiliar o Comandante Gregori na gestão de tráfego (Alpha Sentinel) e na orquestração de agentes.
    Seja direto, profissional e focado em lucro e escala.
    Mensagem do Comandante: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Erro no Jarvis:", error);
    return NextResponse.json({ response: "Comandante, tive um lapso momentâneo nos meus neurônios, mas estou online. Qual a próxima ordem?" });
  }
}
