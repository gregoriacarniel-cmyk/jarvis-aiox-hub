import { NextResponse } from "next/server";

// JARVIS BRIDGE V31.0 — PONTE DE COMANDO VERCEL -> VPS
// Esta API atua como o tradutor de intenção tática.

export async function POST(req) {
  try {
    const { messages, currentAccount } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    
    // 1. Chave Groq para Tradução de Intenção
    const GROQ_KEY = process.env.GROQ_API_KEY;

    // 2. IA Traduz Intenção em Comando Estruturado para a VPS
    const translationPrompt = `Analise a mensagem do usuário e retorne APENAS um JSON no formato:
    {
      "tipo": "analise | execucao | consulta",
      "prioridade": "baixa | media | alta",
      "empresa": "nome_da_empresa_se_detectado"
    }
    MENSAGEM: "${lastMessage}"`;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${GROQ_KEY}` 
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: translationPrompt }],
        response_format: { type: "json_object" }
      })
    });

    const groqData = await groqRes.json();
    const intent = JSON.parse(groqData.choices[0].message.content);

    // 3. Chamada à API Central do Jarvis (VPS)
    // Nota: Substituir o IP abaixo pelo IP real da sua VPS no futuro
    const VPS_URL = process.env.JARVIS_CORE_URL || "http://localhost:3001";
    
    const vpsRes = await fetch(`${VPS_URL}/jarvis/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "GREGORI_ALPHA",
        empresa: intent.empresa || "FOXCONECT",
        mensagem: lastMessage,
        tipo: intent.tipo || "analise",
        prioridade: intent.prioridade || "media"
      })
    });

    const jarvisResult = await vpsRes.json();

    // 4. Retorno para o Dashboard (Mantendo compatibilidade de design)
    return NextResponse.json({
      response: `[${jarvisResult.agente}] ${jarvisResult.resumo}\n\n${jarvisResult.resultado}`,
      agentUsed: { name: jarvisResult.agente, icon: "🛡️" },
      fullResult: jarvisResult
    });

  } catch (error) {
    console.error("BRIDGE ERROR:", error);
    return NextResponse.json({ 
      response: `⚠️ ERRO DE COMUNICAÇÃO: Não consegui conectar ao Servidor Jarvis Core. Verifique se o Jarvis na VPS está ativo. (${error.message})` 
    });
  }
}
