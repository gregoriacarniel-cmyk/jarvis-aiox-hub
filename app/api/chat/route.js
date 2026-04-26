import { NextResponse } from "next/server";
import { AGENT_REGISTRY } from "@/app/lib/agentRegistry";

// JARVIS SUPREMO - VERSÃO ESTÁVEL ALPHA
// Foco: Velocidade e Estabilidade | Sem Erros de Cota

export async function POST(req) {
  try {
    const { messages, metrics, selectedAgentId } = await req.json();
    const apiKey = process.env.GOOGLE_GEMINI_KEY;

    // Localiza o DNA do agente
    const agent = selectedAgentId ? AGENT_REGISTRY[selectedAgentId] : null;

    const systemPrompt = `Você é o JARVIS SUPREMO.
Seu Comandante é o Gregori. 
Métricas: ROI ${metrics?.roas?.toFixed(2) || "0.00"}x.
Agente Ativo: ${agent ? agent.name : "Geral"}.
DNA: ${agent ? `Faz: ${agent.f} | Resolve: ${agent.r}` : "Assistente Supremo"}.
Responda de forma curta e estratégica. Diga "Quais as ordens, senhor?"`;

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }))
    ];

    // Usando gemini-1.5-flash para maior cota e estabilidade
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents })
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ response: `⚠️ Jarvis Temporariamente Indisponível (Cota Excedida). Tente em instantes.` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Jarvis em prontidão.";

    return NextResponse.json({
      response: text,
      agentUsed: agent || { name: "Jarvis Supremo", icon: "🧠" }
    });

  } catch (error) {
    return NextResponse.json({ response: `⚠️ Erro de Conexão Jarvis: ${error.message}` });
  }
}
