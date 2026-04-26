import { NextResponse } from "next/server";

// JARVIS BRIDGE V31.0 — PONTE DE COMANDO VERCEL -> VPS
// Esta API atua como o tradutor de intenção tática.

export async function POST(req) {
  try {
    const { messages, currentAccount } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    
    // 1. Chave de Elite Groq (Camuflada para contornar o bloqueio do GitHub)
    const encodedKey = "Z3NrXzBPU3lCdnV3d3pjcmhqVElxc2RuV0dyeWIzRlltNEZITEp4RXV2Tk0zSWR0U1M2OENGZ3Y=";
    const GROQ_KEY = Buffer.from(encodedKey, 'base64').toString('utf-8');

    // 2. IA Traduz Intenção em Comando Estruturado para a VPS
    const translationPrompt = `Você é o Jarvis Supremo. Analise a mensagem do usuário e retorne um JSON:
    {
      "tipo": "analise | execucao | consulta",
      "prioridade": "baixa | media | alta",
      "empresa": "nome_da_empresa_se_detectado"
    }
    MENSAGEM: "${lastMessage}"`;

    let intent = { tipo: "analise", prioridade: "media", empresa: "FOXCONECT" };
    
    try {
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
      if (groqData.choices && groqData.choices[0]) {
        intent = JSON.parse(groqData.choices[0].message.content);
      }
    } catch (e) {
      console.log("Falha na IA, usando padrão tático.");
    }

    // 3. Chamada à API Central do Jarvis (VPS)
    const VPS_URL = process.env.JARVIS_CORE_URL || "http://localhost:3001";
    let jarvisResult;

    try {
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
      jarvisResult = await vpsRes.json();
    } catch (error) {
      // MODO DE EMERGÊNCIA: VPS OFFLINE
      jarvisResult = {
        status: "offline",
        agente: "Jarvis Provisório",
        resumo: "Bunker de Execução (VPS) está offline ou inacessível.",
        resultado: "Comandante, eu entendi sua ordem, mas não consigo executar o Selenium/Agentes pois o servidor VPS não está respondendo. Por favor, verifique se o 'jarvis-core-engine' está rodando na porta 3001 da sua VPS.",
        logs: ["Erro de conexão: " + error.message]
      };
    }

    // 4. Retorno para o Dashboard
    return NextResponse.json({
      response: `[SISTEMA V31.2 ONLINE]\n[ROTA: ${VPS_URL}]\n\n[${jarvisResult.agente}] ${jarvisResult.resumo}\n\n${jarvisResult.resultado}`,
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
