import { NextResponse } from "next/server";
import { getAgent } from "@/app/lib/agentRegistry";

// Rota dinâmica: /api/agents/[agentId]
// Cada agente do ecossistema tem sua própria identidade e prompt
export async function POST(req, { params }) {
  try {
    const { agentId } = params;
    const { message, context, metrics, adsets } = await req.json();

    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_GEMINI_KEY não configurada" }, { status: 500 });
    }

    // Buscar agente no registro
    const agent = getAgent(agentId);
    if (!agent) {
      return NextResponse.json({ error: `Agente '${agentId}' não encontrado no ecossistema` }, { status: 404 });
    }

    // Contexto adicional de métricas (se disponível)
    const metricsContext = metrics ? `
=== DADOS DE NEGÓCIO AO VIVO ===
Investimento: R$ ${metrics.spend?.toFixed(2) || "0.00"}
Faturamento: R$ ${(metrics.spend * metrics.roas)?.toFixed(2) || "0.00"}
ROAS: ${metrics.roas?.toFixed(2) || "0.00"}x
Vendas: ${metrics.sales || 0}
CPA: R$ ${metrics.cpa?.toFixed ? metrics.cpa.toFixed(2) : metrics.cpa || "0.00"}
` : "";

    const adsetsContext = adsets?.length ? `
=== CONJUNTOS DE ANÚNCIOS ===
${adsets.map((a, i) => `[${i+1}] ${a.name} | R$${a.spend?.toFixed(2)} | ${a.sales} vendas | ROAS ${a.roas}x`).join("\n")}
` : "";

    const fullSystemPrompt = `${agent.prompt}

${metricsContext}${adsetsContext}

${context ? `CONTEXTO ADICIONAL:\n${context}` : ""}

IDENTIDADE: Você é ${agent.name} (${agent.group}) do ecossistema Jarvis Supremo.
REGRAS DE FORMATO:
- Responda em português brasileiro
- Use ### TÍTULOS para seções
- Use **negrito** para pontos críticos
- Use emojis estrategicamente
- Seja direto e acionável`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: fullSystemPrompt }] },
            { role: "model", parts: [{ text: `${agent.icon} ${agent.name} ONLINE. Pronto para executar, Comandante.` }] },
            { role: "user", parts: [{ text: message }] },
          ],
        }),
      }
    );

    const data = await geminiRes.json();
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const response = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta do agente.";

    return NextResponse.json({
      agent: { id: agent.id, name: agent.name, group: agent.group, icon: agent.icon },
      response,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET — info do agente
export async function GET(req, { params }) {
  const { agentId } = params;
  const agent = getAgent(agentId);
  if (!agent) {
    return NextResponse.json({ error: "Agente não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ agent: { id: agent.id, name: agent.name, group: agent.group, icon: agent.icon, description: agent.description } });
}
