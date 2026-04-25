import { NextResponse } from "next/server";
import { AGENT_REGISTRY } from "@/app/lib/agentRegistry";

// =====================================================================
// JARVIS SUPREMO — Orquestrador Central
// Analisa a mensagem, escolhe o(s) agente(s) certo(s) e orquestra
// =====================================================================

export async function POST(req) {
  try {
    const { messages, metrics, adsets, currentAccount } = await req.json();
    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    const gestorUrl = process.env.GESTOR_ALPHA_URL || "http://localhost:3000";

    if (!apiKey) {
      return NextResponse.json({
        response: "⚠️ JARVIS OFFLINE: Configure GOOGLE_GEMINI_KEY na Vercel.",
        action: null, agentUsed: null,
      });
    }

    const lastMessage = messages?.[messages.length - 1]?.content || "";

    // ── FASE 1: Jarvis decide qual agente ativar ──────────────────────
    const agentList = Object.values(AGENT_REGISTRY)
      .map(a => `- ${a.id}: ${a.name} (${a.group}) — ${a.description}`)
      .join("\n");

    const routerPrompt = `Você é o JARVIS SUPREMO — orquestrador de ${Object.keys(AGENT_REGISTRY).length} agentes especializados.

AGENTES DISPONÍVEIS:
${agentList}

TAMBÉM DISPONÍVEIS (via gestor-alpha-web):
- alpha-sentinel: Monitora Meta Ads e envia relatórios táticos via Telegram
- meta-ads-manager: Gerencia campanhas Meta (pausar/escalar adsets)

MENSAGEM DO COMANDANTE: "${lastMessage}"

DADOS AO VIVO:
- Investimento: R$ ${metrics?.spend?.toFixed(2) || "0.00"}
- ROAS: ${metrics?.roas?.toFixed(2) || "0.00"}x
- Vendas: ${metrics?.sales || 0}
- Adsets: ${adsets?.length || 0} ativos

TAREFA: Responda em JSON puro (sem markdown, sem \`\`\`):
{
  "selectedAgent": "id-do-agente-mais-adequado",
  "reason": "por que este agente",
  "directAnswer": true_se_voce_mesmo_puder_responder_ou_false_se_precisa_do_agente
}

Se a pergunta for sobre tráfego/Meta Ads: use "gestor-trafego"
Se for sobre desenvolvimento/código: use "developer"  
Se for conversa geral ou estratégia: use "mente-maestro"
Se for sobre tráfego + ação executável (pausar/escalar): use "gestor-trafego"`;

    const routerRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: routerPrompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 200 },
        }),
      }
    );

    let selectedAgentId = "mente-maestro";
    try {
      const routerData = await routerRes.json();
      const routerText = routerData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      const parsed = JSON.parse(routerText.replace(/```json|```/g, "").trim());
      selectedAgentId = parsed.selectedAgent || "mente-maestro";
    } catch (_) {}

    // ── FASE 2: Sentinela check (gestor-alpha-web) ────────────────────
    let sentinelInfo = "";
    try {
      const sRes = await fetch(`${gestorUrl}/api/sentinel`, { signal: AbortSignal.timeout(3000) });
      if (sRes.ok) sentinelInfo = "✅ Alpha Sentinel: ONLINE — monitorando Meta Ads e enviando via Telegram";
    } catch (_) {
      sentinelInfo = "Agente Alpha Sentinel: aguardando conexão local";
    }

    // ── FASE 3: Chamar o agente selecionado ──────────────────────────
    const agent = AGENT_REGISTRY[selectedAgentId];
    const safeAgent = agent || AGENT_REGISTRY["mente-maestro"];

    const safeMetrics = {
      spend: metrics?.spend ?? 0,
      roas: metrics?.roas ?? 0,
      sales: metrics?.sales ?? 0,
      cpa: metrics?.cpa ?? 0,
      totalCheckouts: metrics?.totalCheckouts ?? 0,
      ctr: metrics?.ctr ?? 0,
      cpm: metrics?.cpm ?? 0,
    };

    const adsetLines = (adsets || [])
      .map((a, i) => `[${i+1}] ${a.name} | R$${(a.spend??0).toFixed(2)} | ${a.sales??0} vendas | ROAS ${a.roas??0}x | CPA R$${a.cpa??0}`)
      .join("\n") || "Nenhum adset carregado.";

    const agentSystemPrompt = `${safeAgent.prompt}

=== CONTEXTO JARVIS SUPREMO ===
Você foi ativado pelo JARVIS para responder ao Comandante Gregori.
Agente: ${safeAgent.icon} ${safeAgent.name} | Grupo: ${safeAgent.group}

Status Alpha Sentinel: ${sentinelInfo}

=== DADOS AO VIVO — Conta: ${currentAccount || "não selecionada"} ===
- Investimento: R$ ${safeMetrics.spend.toFixed(2)}
- Faturamento: R$ ${(safeMetrics.spend * safeMetrics.roas).toFixed(2)}
- ROAS: ${safeMetrics.roas.toFixed(2)}x
- Vendas: ${safeMetrics.sales}
- CPA: R$ ${safeMetrics.cpa.toFixed ? safeMetrics.cpa.toFixed(2) : safeMetrics.cpa}
- CTR: ${safeMetrics.ctr.toFixed ? safeMetrics.ctr.toFixed(2) : safeMetrics.ctr}%
- CPM: R$ ${safeMetrics.cpm.toFixed ? safeMetrics.cpm.toFixed(2) : safeMetrics.cpm}

=== ADSETS ===
${adsetLines}

REGRAS: Responda em PT-BR | Use ### TÍTULOS | **negrito** para números | Emojis estratégicos | Seja acionável

AÇÕES EXECUTÁVEIS (quando relevante):
[AÇÃO]: {"type":"pause_adset","adsetId":"ID","adsetName":"Nome"}
[AÇÃO]: {"type":"adjust_budget","adsetId":"ID","adsetName":"Nome","budgetMultiplier":1.2}`;

    // Monta histórico excluindo última mensagem (já vai no final)
    const history = (messages || []).slice(0, -1).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const contents = [
      { role: "user", parts: [{ text: agentSystemPrompt }] },
      { role: "model", parts: [{ text: `${safeAgent.icon} ${safeAgent.name} ONLINE — Pronto para executar, Comandante.` }] },
      ...history,
      { role: "user", parts: [{ text: lastMessage }] },
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
