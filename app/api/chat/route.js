import { NextResponse } from "next/server";

// =====================================================================
// JARVIS SUPREMO — Orquestrador Central
// Usa REST direto ao Gemini (mesmo método do gestor-alpha-web que funciona)
// Sem SDK @google/generative-ai para evitar falha de inicialização
// =====================================================================

export async function POST(req) {
  try {
    const { messages, metrics, adsets, currentAccount } = await req.json();

    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    const gestorUrl = process.env.GESTOR_ALPHA_URL || "http://localhost:3000";

    if (!apiKey) {
      return NextResponse.json({
        response: "⚠️ JARVIS OFFLINE: Variável GOOGLE_GEMINI_KEY não configurada. Adicione nas Environment Variables da Vercel.",
        action: null,
      });
    }

    // ── 1. Tentar buscar relatório tático do Agente Sentinela (gestor-alpha-web) ──
    let sentinelStatus = "Agente Sentinela: não conectado (URL local indisponível em produção)";
    try {
      const sentinelRes = await fetch(`${gestorUrl}/api/sentinel`, {
        signal: AbortSignal.timeout(4000), // 4s timeout
      });
      if (sentinelRes.ok) {
        sentinelStatus = "✅ Agente Sentinela: ONLINE — relatório enviado via Telegram";
      }
    } catch {
      sentinelStatus = `Agente Sentinela: offline ou inacessível em ${gestorUrl}`;
    }

    // ── 2. Montar contexto completo do ecossistema ──
    const safeMetrics = {
      spend: metrics?.spend ?? 0,
      sales: metrics?.sales ?? 0,
      roas: metrics?.roas ?? 0,
      cpa: metrics?.cpa ?? 0,
      totalCheckouts: metrics?.totalCheckouts ?? 0,
      totalCarts: metrics?.totalCarts ?? 0,
      ctr: metrics?.ctr ?? 0,
      cpm: metrics?.cpm ?? 0,
    };

    const adsetLines = (adsets || [])
      .map((a, i) =>
        `[${i + 1}] ${a.name} | Gasto: R$${(a.spend ?? 0).toFixed(2)} | Vendas: ${a.sales ?? 0} | ROAS: ${a.roas ?? 0}x | CPA: R$${a.cpa ?? 0} | Status: ${a.status ?? "?"}`
      )
      .join("\n") || "Nenhum adset carregado. Selecione uma conta e clique em atualizar.";

    const systemPrompt = `Você é o JARVIS SUPREMO — o orquestrador central de inteligência artificial do sistema Lowticket Gregori.

IDENTIDADE:
- Você é o CÉREBRO ESTRATÉGICO do Comandante Gregori Carniel.
- Você tem visão total sobre todos os agentes e métricas do ecossistema.
- Você é direto, tático e obcecado com lucro e escala.
- Responda SEMPRE em português brasileiro.

AGENTES DO ECOSSISTEMA:
1. AGENTE ALPHA SENTINEL (gestor-alpha-web): Monitora adsets a cada 15min, envia relatórios táticos via Telegram. Status: ${sentinelStatus}
2. META ADS MANAGER: Lê e executa ações em adsets (pausar, ajustar orçamento) em tempo real.
3. FOXCONECT HUB: Central de leads — em desenvolvimento.

DADOS AO VIVO — CONTA: ${currentAccount || "Não selecionada"}
- Investimento: R$ ${safeMetrics.spend.toFixed(2)}
- Vendas: ${safeMetrics.sales}
- Faturamento: R$ ${(safeMetrics.spend * safeMetrics.roas).toFixed(2)}
- ROAS: ${safeMetrics.roas.toFixed(2)}x
- CPA: R$ ${safeMetrics.cpa.toFixed ? safeMetrics.cpa.toFixed(2) : safeMetrics.cpa}
- Checkouts: ${safeMetrics.totalCheckouts}
- Carrinhos: ${safeMetrics.totalCarts}
- CTR: ${safeMetrics.ctr.toFixed ? safeMetrics.ctr.toFixed(2) : safeMetrics.ctr}%
- CPM: R$ ${safeMetrics.cpm.toFixed ? safeMetrics.cpm.toFixed(2) : safeMetrics.cpm}

ADSETS:
${adsetLines}

REGRAS DE DIAGNÓSTICO (aplicar automaticamente):
- CTR > 1.5% + zero vendas → PROBLEMA NA PÁGINA/CHECKOUT
- CTR < 0.8% → PROBLEMA NO CRIATIVO
- Gasto > R$35 sem venda → RECOMENDAR PAUSA
- ROAS > 2.5x → RECOMENDAR ESCALA de 20%
- CPA alto → Testar novos públicos

FORMATO OBRIGATÓRIO:
- Títulos em ### MAIÚSCULO
- **negrito** para números e métricas
- Emojis para leitura rápida
- Separação clara entre seções

AÇÕES EXECUTÁVEIS:
Se o Comandante pedir uma ação (pausar, escalar), inclua EXATAMENTE esta linha no final:
[AÇÃO]: {"type":"pause_adset","adsetId":"ID_AQUI","adsetName":"Nome do Conjunto"}
ou
[AÇÃO]: {"type":"adjust_budget","adsetId":"ID_AQUI","adsetName":"Nome","budgetMultiplier":1.2}`;

    // ── 3. Montar histórico de conversa ──
    const conversationHistory = (messages || []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Garante que começa com "user" (requisito do Gemini)
    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "JARVIS SUPREMO ONLINE. Sensores calibrados. Aguardando ordens, Comandante." }] },
      ...conversationHistory,
    ];

    // ── 4. Chamar Gemini via REST (igual ao gestor-alpha-web — comprovadamente funcional) ──
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
        response: `⚠️ JARVIS — Erro Gemini: ${geminiData.error.message}`,
        action: null,
      });
    }

    const text =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Resposta vazia do Gemini. Tente novamente.";

    // ── 5. Extrair ação estruturada se presente ──
    let action = null;
    const actionMatch = text.match(/\[AÇÃO\]:\s*(\{[^}]+\})/);
    if (actionMatch) {
      try {
        action = JSON.parse(actionMatch[1]);
      } catch (_) {}
    }

    return NextResponse.json({ response: text, action });
  } catch (error) {
    console.error("Erro no Jarvis:", error);
    return NextResponse.json({
      response: `⚠️ JARVIS — Falha: ${error.message}`,
      action: null,
    });
  }
}
