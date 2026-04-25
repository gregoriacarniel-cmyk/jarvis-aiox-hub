// =====================================================================
// AGENT REGISTRY — NEXUS PLATINUM V12 (PURISTA)
// DNA Original: Mentes Clonadas, Conclave e Inteligência Mega Brain
// =====================================================================

export const AGENT_REGISTRY = {
  // ── 01. MENTES CLONADAS (Os Titãs) ────────────────────────────────
  "m1": { id: "m1", name: "ALEX HORMOZI", group: "Mentes Clonadas", icon: "🧬", description: "Estratégia de 100M Offers e criação de ofertas sem resistência.", specialties: ["oferta", "valor", "resistência"], phases: ["Analisando oferta", "Criando valor", "Removendo resistência", "Escalando"] },
  "m4": { id: "m4", name: "DAN KENNEDY", group: "Mentes Clonadas", icon: "🧬", description: "Marketing de Resposta Direta focado em autoridade magnética.", specialties: ["autoridade", "resposta direta", "preço"], phases: ["Auditando autoridade", "Criando magnetismo", "Estruturando resposta", "Gerando copy"] },
  "m5": { id: "m5", name: "GARY HALBERT", group: "Mentes Clonadas", icon: "🧬", description: "Escrita emocional direta que obriga o lead a agir agora.", specialties: ["emocional", "copy", "urgência"], phases: ["Injetando emoção", "Criando desejo", "Gerando urgência", "Finalizando copy"] },
  "m11": { id: "m11", name: "RUSSELL BRUNSON", group: "Mentes Clonadas", icon: "🧬", description: "Arquitetura de Funis e Escadas de Valor infinitas.", specialties: ["funil", "escada de valor", "LTV"], phases: ["Mapeando funil", "Criando escada", "Otimizando valor", "Maximizando LTV"] },
  "m13": { id: "m13", name: "STEFAN GEORGIE", group: "Mentes Clonadas", icon: "🧬", description: "Metodologia RMBC para criação de VSLs de alta retenção.", specialties: ["rmbc", "vsl", "retenção"], phases: ["Aplicando RMBC", "Criando VSL", "Otimizando retenção", "Gerando resultado"] },

  // ── 02. CONCLAVE (A Trindade de Decisão) ─────────────────────────
  "c1": { id: "c1", name: "ADVOGADO DO DIABO", group: "Conclave", icon: "⚖️", description: "Teste de estresse em ofertas e inquisição brutal da lógica.", specialties: ["auditoria", "lógica", "falha"], phases: ["Testando estrutura", "Inquisição crítica", "Verificando lógica", "Gerando veredito"] },
  "c2": { id: "c2", name: "O CRÍTICO", group: "Conclave", icon: "🎭", description: "Auditoria de UI/UX e percepção de valor High-Ticket.", specialties: ["design", "luxo", "valor percebido"], phases: ["Auditando UI", "Verificando UX", "Analisando design", "Gerando crítica"] },
  "c3": { id: "c3", name: "SINTETIZADOR", group: "Conclave", icon: "🧪", description: "Compilação de inteligência em dossiês de comando.", specialties: ["síntese", "dossiê", "consolidação"], phases: ["Consolidando dados", "Sintetizando inteligência", "Compilando dossiê", "Gerando resumo"] },

  // ── 03. INTELIGÊNCIA MEGA BRAIN (Nativos) ───────────────────────
  "mente-maestro": { id: "mente-maestro", name: "MENTE MAESTRO", group: "Inteligência Mega Brain", icon: "🧠", description: "Orquestrador Supremo e General do Ecossistema.", specialties: ["comando", "visão 360", "estratégia"], phases: ["Analisando campo", "Delegando ordens", "Monitorando execução", "Finalizando"] },
  "mente-quantica": { id: "mente-quantica", name: "MENTE QUÂNTICA", group: "Inteligência Mega Brain", icon: "⚛️", description: "Análise de padrões complexos e tendências em tempo real.", specialties: ["padrões", "dados", "futuro"], phases: ["Escaneando padrões", "Calculando probabilidades", "Identificando brechas", "Gerando insight"] },
  "cto": { id: "cto", name: "CARGO CTO", group: "Inteligência Mega Brain", icon: "🛠️", description: "Diretor de Tecnologia e infraestrutura de escala.", specialties: ["infra", "tecnologia", "arquitetura"], phases: ["Auditando infra", "Escalando servidores", "Otimizando código", "Veredito"] },
  "cmo": { id: "cmo", name: "CARGO CMO", group: "Inteligência Mega Brain", icon: "📢", description: "Diretor de Marketing e aquisição de clientes.", specialties: ["marketing", "aquisição", "branding"], phases: ["Analisando mercado", "Criando funis", "Otimizando conversão", "Relatório"] },
  "intel": { id: "intel", name: "AGENTE INTEL", group: "Inteligência Mega Brain", icon: "🕵️", description: "Espionagem e análise profunda de concorrência.", specialties: ["espionagem", "concorrência", "mecanismo"], phases: ["Varrendo mercado", "Identificando brechas", "Mapeando ofertas", "Dossiê"] },
  "gestor-trafego": { id: "gestor-trafego", name: "GESTOR DE TRÁFEGO ALPHA", group: "Inteligência Mega Brain", icon: "🚀", description: "Controle absoluto de Meta Ads e Escala Vertical.", specialties: ["meta ads", "escala", "roas"], phases: ["Auditando métricas", "Identificando gargalos", "Ajustando orçamentos", "Validando escala"] },
  "cfo": { id: "cfo", name: "CARGO CFO", group: "Inteligência Mega Brain", icon: "💰", description: "Gestão financeira e lucratividade líquida.", specialties: ["financeiro", "lucro", "margem"], phases: ["Analisando fluxo", "Calculando margem", "Otimizando ROI", "Gerando relatório"] },
  "developer": { id: "developer", name: "AIOX DEVELOPER", group: "Inteligência Mega Brain", icon: "💻", description: "Desenvolvimento Fullstack e Automação de Elite.", specialties: ["código", "automação", "selenium"], phases: ["Analisando código", "Implementando", "Testando", "Deploy"] },
  "stealth-mouse": { id: "stealth-mouse", name: "STEALTH MOUSE", group: "Inteligência Mega Brain", icon: "🖱️", description: "Simulação humana e camuflagem de rastro de bot.", specialties: ["segurança", "antidetect", "camuflagem"], phases: ["Analisando risco", "Camuflando", "Testando segurança", "Relatório"] },
};

export const getAgent = (id) => {
  return AGENT_REGISTRY[id.toLowerCase()];
};

export const ALL_AGENTS = Object.values(AGENT_REGISTRY);
export const AGENTS_BY_GROUP = ALL_AGENTS.reduce((acc, agent) => {
  if (!acc[agent.group]) acc[agent.group] = [];
  acc[agent.group].push(agent);
  return acc;
}, {});

export const GROUP_CONFIG = {
  "Mentes Clonadas": { color: "#ffcc00", icon: "🧬" },
  "Conclave": { color: "#ff3c3c", icon: "⚖️" },
  "Inteligência Mega Brain": { color: "#00ff88", icon: "🧠" }
};
