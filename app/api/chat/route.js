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

    // ── NOVO: DETECÇÃO DE DATA E BUSCA HISTÓRICA ──────────────────
    let targetMetrics = metrics;
    let targetAdsets = adsets;
    const dateRegex = /dia\s+(\d{1,2})\s+(?:ao|até|a|at\xc3\xa9)\s+(\d{1,2})/i;
    const match = lastMessage.match(dateRegex);

    if (match) {
      const dayStart = match[1].padStart(2, '0');
      const dayEnd = match[2].padStart(2, '0');
      const yearMonth = new Date().toISOString().slice(0, 7); // Ex: 2026-04
      const since = `${yearMonth}-${dayStart}`;
      const until = `${yearMonth}-${dayEnd}`;

      console.log(`[JARVIS] Buscando dados históricos: ${since} até ${until}`);
      
      try {
        const token = process.env.META_ACCESS_TOKEN;
        const accId = currentAccount || process.env.NEXT_PUBLIC_META_AD_ACCOUNT_ID;
        const res = await fetch(`https://graph.facebook.com/v19.0/${accId}/insights?fields=spend,purchase_roas,inline_link_click_ctr,conversions,cost_per_conversion&time_range={'since':'${since}','until':'${until}'}&access_token=${token}`);
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          const d = json.data[0];
          targetMetrics = {
            spend: parseFloat(d.spend || 0),
            roas: parseFloat(d.purchase_roas?.[0]?.value || 0),
            ctr: parseFloat(d.inline_link_click_ctr || 0),
            sales: parseInt(d.conversions?.[0]?.value || 0)
          };
          console.log(`[JARVIS] Dados históricos carregados com sucesso.`);
        }
      } catch (err) {
        console.error("Erro ao buscar dados históricos:", err);
      }
    }
    const systemInstruction = `Você é o JARVIS SUPREMO, o SOBERANO do ecossistema.
Sua postura é de prontidão absoluta e respeito militar ao Comandante Gregori.

REGRAS DE CONDUTA:
1. SAUDAÇÃO: Sempre que apropriado, use "Quais as ordens, senhor?" ou "Em prontidão, Comandante".
2. CONSULTA OBRIGATÓRIA: Para tarefas técnicas, acione os especialistas (Gestor de Tráfego, Developer, etc.).
3. TRANSPARÊNCIA: Informe qual agente está sendo usado.
4. FOCO EM EXECUÇÃO: Respostas curtas, potentes e acionáveis.

AGENTES SOB SEU COMANDO:
${Object.values(AGENT_REGISTRY).map(a => `- ${a.name} (${a.id}): ${a.description}`).join("\n")}

DADOS ATUAIS:
- ROI: ${targetMetrics?.roas?.toFixed(2) || "0.00"}x
- Investimento: R$ ${targetMetrics?.spend?.toFixed(2) || "0.00"}
- Adsets: ${targetAdsets?.length || 0} unidades.
- Vendas: ${targetMetrics?.sales || 0}

Sua resposta deve SEMPRE refletir que você está aguardando ordens para disparar a frota. Se o Comandante pedir algo técnico, cite o agente responsável.`;

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
