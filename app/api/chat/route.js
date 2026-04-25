import { NextResponse } from "next/server";
import { AGENT_REGISTRY } from "@/app/lib/agentRegistry";

// =====================================================================
// JARVIS SUPREMO — SOBERANO DO ECOSSISTEMA
// Autonomia Total | Orquestração Executiva | Decisão Final
// =====================================================================

export async function POST(req) {
  try {
    const { messages, metrics, adsets, currentAccount } = await req.json();
    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    const lastMessage = messages?.[messages.length - 1]?.content || "";

    if (!apiKey) return NextResponse.json({ response: "⚠️ OFFLINE: Configure API Key." });

    // ── FASE 1: Jarvis Supremo Analisa e Decide ──────────────────────
    const systemInstruction = `Você é o JARVIS SUPREMO, o SOBERANO do ecossistema.
Você fala pelo sistema, mas você NÃO executa tarefas técnicas sozinho. Você COMANDA especialistas.

REGRAS DE COMANDO:
1. CONSULTA OBRIGATÓRIA: Para tráfego, chame o "Gestor de Tráfego Alpha". Para código, chame o "AIOX Developer". 
2. NÃO ASSUMA CONHECIMENTO: Se a tarefa é técnica, você deve citar que está acionando o agente responsável.
3. FLUXO: Você recebe a ordem → Identifica o Especialista → Ordena a Execução → Reporta o resultado ao Comandante.
4. TRANSPARÊNCIA: Diga sempre qual agente você está consultando ou comandando.

AGENTES SOB SEU COMANDO:
${Object.values(AGENT_REGISTRY).map(a => `- ${a.name} (${a.id}): ${a.description}`).join("\n")}

DADOS ATUAIS:
- ROI: ${metrics?.roas?.toFixed(2) || "0.00"}x
- Adsets: ${adsets?.length || 0} unidades.

Sua resposta deve ser: "Comandante, estou acionando o [Nome do Agente] para [Ação]. Análise técnica: [Resposta baseada no especialista]."`;

    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      { role: "model", parts: [{ text: "PROTOCOLO SOBERANO ATIVADO. Eu sou o Jarvis Supremo. Pronto para comandar a frota." }] },
      ...messages.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
    ];

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const geminiData = await geminiRes.json();
    if (geminiData.error) {
      return NextResponse.json({
        response: `⚠️ Erro Gemini: ${geminiData.error.message}`,
        action: null, agentUsed: null,
      });
    }

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta.";

    // Extrai ação se presente
    let action = null;
    const actionMatch = text.match(/\[AÇÃO\]:\s*(\{[^}]+\})/);
    if (actionMatch) {
      try { action = JSON.parse(actionMatch[1]); } catch (_) {}
    }

    return NextResponse.json({
      response: text,
      action,
      agentUsed: {
        id: safeAgent.id,
        name: safeAgent.name,
        group: safeAgent.group,
        icon: safeAgent.icon,
      },
    });
  } catch (error) {
    return NextResponse.json({
      response: `⚠️ JARVIS — Erro: ${error.message}`,
      action: null, agentUsed: null,
    });
  }
}
