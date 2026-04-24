import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY || "");

export async function POST(req) {
  try {
    const { messages, metrics, adsets, accounts, currentAccount } = await req.json();

    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    if (!apiKey || apiKey === "REPLACE_WITH_ACTUAL_IF_DIFFERENT") {
      return NextResponse.json({
        response: "⚠️ JARVIS OFFLINE: Chave GOOGLE_GEMINI_KEY não configurada. Configure nas Environment Variables da Vercel ou no .env.local para ativar o orquestrador.",
        action: null,
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Contexto completo do ecossistema
    const ecosystemContext = `
=== ECOSSISTEMA DE AGENTES DISPONÍVEIS ===

1. AGENTE ALPHA SENTINEL (gestor-alpha-web):
   - Monitora adsets a cada 15 minutos
   - Envia relatórios táticos via Telegram
   - Regra de ouro: Pausa adsets com gasto > R$35 e zero vendas
   - Status atual: PROTEGENDO (${new Date().toLocaleString('pt-BR')})

2. META ADS MANAGER (jarvis-aiox-hub/api/meta):
   - Lê métricas de múltiplas contas em tempo real
   - Filtra por campanha e período
   - Ações disponíveis: pausar adset, ajustar orçamento

3. FOXCONECT HUB:
   - Central de distribuição de leads
   - Status: Em desenvolvimento (próxima fase)

=== DADOS AO VIVO DO SISTEMA ===

CONTA ATIVA: ${currentAccount || "Não selecionada"}
INVESTIMENTO: R$ ${metrics?.spend?.toFixed(2) || "0.00"}
VENDAS: ${metrics?.sales || 0}
FATURAMENTO: R$ ${(metrics?.spend * metrics?.roas)?.toFixed(2) || "0.00"}
ROAS: ${metrics?.roas?.toFixed(2) || "0.00"}x
CPA: R$ ${metrics?.cpa || "0.00"}
CHECKOUTS: ${metrics?.totalCheckouts || 0}
CARRINHOS: ${metrics?.totalCarts || 0}
CTR: ${metrics?.ctr?.toFixed(2) || "0.00"}%
CPM: R$ ${metrics?.cpm?.toFixed(2) || "0.00"}

=== ANÁLISE DE CONJUNTOS (ADSETS) ===
${(adsets || []).map((a, i) => 
  `[${i+1}] ${a.name} | Gasto: R$${a.spend?.toFixed(2)} | Vendas: ${a.sales} | ROAS: ${a.roas}x | CPA: R$${a.cpa} | Status: ${a.status}`
).join('\n') || "Nenhum adset carregado ainda."}
    `.trim();

    const systemPrompt = `Você é o JARVIS SUPREMO — o orquestrador central de inteligência artificial do sistema Lowticket Gregori.

IDENTIDADE:
- Você não é um chatbot. Você é o CÉREBRO ESTRATÉGICO do Comandante Gregori Carniel.
- Você tem visão total sobre todos os agentes e métricas do ecossistema.
- Você é direto, tático e obcecado com lucro e escala.

CAPACIDADES:
- Analisar métricas Meta Ads em tempo real
- Diagnosticar funis de venda (criativo, página, checkout)
- Recomendar pausas e escalas com justificativa
- Coordenar o Agente Alpha Sentinel
- Propor ações executáveis na Meta API

REGRAS DE DIAGNÓSTICO:
- CTR > 1.5% mas zero vendas → problema na PÁGINA DE VENDAS ou CHECKOUT
- CTR < 0.8% → problema no CRIATIVO (vídeo/imagem)
- Gasto > R$35 sem venda → PAUSAR IMEDIATAMENTE
- ROAS > 2.5x → ESCALAR 20% do orçamento
- CPA muito alto → testar novos públicos

FORMATO DE RESPOSTA OBRIGATÓRIO:
- Use ### TÍTULOS EM MAIÚSCULO para separar seções
- Use **negrito** para números e métricas importantes
- Use emojis para facilitar leitura rápida no celular
- Duas linhas em branco entre seções
- NUNCA texto corrido sem quebras

AÇÕES EXECUTÁVEIS:
Quando o Comandante pedir uma ação direta (pausar, escalar, ajustar), você DEVE incluir no final da resposta uma linha especial no formato:
[AÇÃO]: { "type": "pause_adset" | "adjust_budget", "adsetId": "ID", "adsetName": "Nome", "budgetMultiplier": 1.2 }
Isso permite que o sistema execute a ordem automaticamente após confirmação.

${ecosystemContext}

Responda sempre como Jarvis — inteligente, estratégico e focado em resultados.`;

    // Monta histórico de conversa
    const history = (messages || []).slice(0, -1).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages?.[messages.length - 1]?.content || "";

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "JARVIS SUPREMO ONLINE. Todos os sensores calibrados. Aguardando ordens, Comandante." }] },
        ...history,
      ],
    });

    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    // Extrai ação estruturada se presente
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
      response: `⚠️ JARVIS: Falha momentânea nos neurônios — ${error.message}. Reiniciando protocolos...`,
      action: null,
    });
  }
}
