// =====================================================================
// AGENT REGISTRY — NEXUS PLATINUM SUPREMO V14.5
// 56 Agentes Mapeados Exatamente como no Arquivo HTML Oficial
// =====================================================================

const rawAgents = [
    // 03 - CONCLAVE DELIBERATIVO (WHITE) - Decision Governance
    { id: "CRITIC", name: "Crítico Metodológico", cat: "conclave", color: "white", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Auditoria fria de falhas lógicas e viabilidade técnica.", res: "Evita o desperdício de meses de trabalho em ideias que não têm lógica de mercado.", u: "Antes de iniciar produção pesada." },
    { id: "DEVIL", name: "Advogado do Diabo", cat: "conclave", color: "white", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Encontra todos os motivos pelos quais a sua oferta VAI FALHAR.", res: "Blindagem psicológica da copy e antecipação de objeções.", u: "Na fase de refinamento do roteiro da VSL." },
    { id: "SYNTH", name: "Sintetizador Master", cat: "conclave", color: "white", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Unifica os pareceres do Conclave em um Roadmap único.", res: "Elimina a paralisia por análise e dá o veredito final.", u: "Reunião final de estratégia antes do deploy." },
    { id: "ESTRATEGI", name: "Estrategista Master", cat: "conclave", color: "white", isUser: false, img: "/images/conclave_critico_agent_1776437237632.png", faz: "Define o ângulo estratégico central da operação e metas financeiras.", res: "Garante o direcionamento cirúrgico de todas as áreas.", u: "No início absoluto de qualquer projeto Supremo." },

    // 04 - MENTES CLONADAS (GOLD) - External Experts
    { id: "HORMOZI", name: "Alex Hormozi Clone", cat: "minds", color: "gold", isUser: false, img: "/images/hormozi_clone_agent_1776436596228.png", faz: "Criação de Grand Slam Offers e ofertas irrecusáveis.", res: "Transforma produtos 'commodities' em desejos vorazes.", u: "Desenho da oferta principal." },
    { id: "BRUNSON", name: "Russell Brunson Clone", cat: "minds", color: "gold", isUser: false, img: "/images/brunson_clone_agent_1776436612466.png", faz: "Arquitetura de Funis de Vendas Complexos.", res: "Maximiza o LTV (valor vitalício).", u: "Desenho da jornada do cliente." },
    { id: "COLE-G", name: "Cole Gordon Master", cat: "minds", color: "gold", isUser: false, img: "/images/vigia_metrics_traffic_agent_1776436674655.png", faz: "Estratégia de Inbound Sales e treinamento de Closers.", res: "Aumenta conversão em vendas de alto ticket.", u: "Otimização de processos de vendas por WhatsApp." },
    { id: "MINER", name: "Jeremy Miner (NEPQ)", cat: "minds", color: "gold", isUser: false, img: "/images/simon_similarweb_spy_1776436421734.png", faz: "Psicologia de vendas reversa via perguntas NEPQ.", res: "Elimina a resistência de compra natural.", u: "Criação de scripts de vendas." },
    { id: "HAYNES", name: "Jeremy Haynes Guru", cat: "minds", color: "gold", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Posicionamento de Agência e Branding de Autoridade Mundial.", res: "Cria uma percepção de valor altíssima.", u: "Branding pessoal e escala de agências." },

    // 05 - ESPIONAGEM (INTELLIGENCE)
    { id: "PULLSAR", name: "Pullsar Draco", cat: "spy", color: "magenta", isUser: true, img: "/images/pullsar_draco_spy_1776436373778.png", faz: "Infiltração profunda em funis rivais.", res: "Expõe os gatilhos psicológicos e a promessa central rival.", u: "Antes de modelar qualquer script." },
    { id: "RADAR", name: "Radar Duplo", cat: "spy", color: "magenta", isUser: true, img: "/images/radar_duplo_spy_1776436359773.png", faz: "Mineração profunda de dados via YouTube API.", res: "Encontra ângulos virais e demandas represadas.", u: "Identificação de novas ondas culturais." },
    { id: "ADS-SPY", name: "Ad Library Scraper", cat: "spy", color: "magenta", isUser: true, img: "/images/ad_library_spy_1776436390180.png", faz: "Monitoramento massivo da Biblioteca de Anúncios.", res: "Mapeia os criativos vencedores.", u: "Início da criação de qualquer campanha." },
    { id: "YT-SPY", name: "YouTube Spy", cat: "spy", color: "green", isUser: false, img: "/images/youtube_spy_agent_1776436406398.png", faz: "Análise de avatares e mineração de comentários via IA.", res: "Extrai as dores, medos e desejos reais.", u: "Pesquisa de persona para roteiros." },
    { id: "SIMON", name: "Simon (SimilarWeb)", cat: "spy", color: "green", isUser: false, img: "/images/simon_similarweb_spy_1776436421734.png", faz: "Auditoria de tráfego SimilarWeb.", res: "Certifica de onde vem o tráfego do rival.", u: "Validação final antes de modelar funil." },
    { id: "SCOUT", name: "AG-SCOUT Hunter", cat: "spy", color: "green", isUser: false, img: "/images/ag_scout_hunter_agent_v2_1776436715719.png", faz: "Vigilância autônoma de novas ofertas silenciosas.", res: "Avisa sobre novos mecanismos vencedores antes que saturem.", u: "Vigilância estratégica constante." },

    // 06 - ENGENHARIA PRODUTO
    { id: "NICHO", name: "Gerador de Nicho", cat: "product", color: "magenta", isUser: true, img: "/images/gerador_nicho_agent_v2_1776436732741.png", faz: "Criação de Avatar Quântico e Mecanismo Único.", res: "Transforma uma ideia genérica em oportunidade única.", u: "Definição do DNA de infoproduto." },
    { id: "MODEL", name: "Modelagem Oferta", cat: "product", color: "magenta", isUser: true, img: "/images/modelagem_oferta_agent_1776436579323.png", faz: "Análise Reversa de Copy e Tropicalização.", res: "Garante que oferta dos EUA funcione no Brasil.", u: "Fase de modelagem da oferta principal." },
    { id: "SAAS-REC", name: "SaaS & Recorrência", cat: "product", color: "green", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Modelagem de negócios de assinatura.", res: "Troca o esforço diário pela previsibilidade da recorrência.", u: "Projetos de LTV alto." },
    { id: "BACK-E", name: "Backend Architect", cat: "product", color: "blue", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Configuração lógica de Up-sells e Order-bumps.", res: "Aumenta ticket médio em até 60%.", u: "Finalização técnica do funil." },
    { id: "QUIZ", name: "Quiz Master", cat: "product", color: "blue", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Geração de funis de diagnóstico via Quiz.", res: "Aquece o lead e entrega oferta personalizada.", u: "Funis de conscientização." },

    // 07 - COPYWRITING
    { id: "ARIA", name: "Aria Lyra (VSL)", cat: "copy", color: "magenta", isUser: true, img: "/images/aria_lyra_copy_agent_1776436627050.png", faz: "Criação de Scripts de VSL de alta retenção.", res: "Garante urgência de compra no vídeo.", u: "Roteirização de vídeos de vendas." },
    { id: "GEORGIE", name: "Stefan Georgie Clone", cat: "copy", color: "gold", isUser: false, img: "/images/stefan_georgie_copy_agent_1776436641705.png", faz: "Escrita agressiva via método RMBC.", res: "Produz cartas de vendas em tempo recorde.", u: "Copy de resposta direta." },
    { id: "CONTENT", name: "Dept. Conteúdo", cat: "copy", color: "green", isUser: false, img: "/images/aria_lyra_copy_agent_1776436627050.png", faz: "Criação de Ebooks e iscas digitais.", res: "Gera a entrega prometida com alta qualidade.", u: "Criação do produto." },
    { id: "EMAIL", name: "Email Automator", cat: "copy", color: "green", isUser: false, img: "/images/stefan_georgie_copy_agent_1776436641705.png", faz: "Sequências de Boas-vindas e Recuperação.", res: "Recupera até 30% das vendas.", u: "Pós-clique e nutrição." },

    // 08 - DESIGN & PRO
    { id: "MAYA", name: "Maya Builder (LP)", cat: "pro", color: "magenta", isUser: true, img: "/images/maya_builder_design_agent_1776436658197.png", faz: "Montagem de Landing Pages ultra-leves.", res: "Elimina perda de leads por lentidão.", u: "Deploy final das páginas." },
    { id: "CRIATIVOS", name: "Master Criativos", cat: "pro", color: "green", isUser: false, img: "/images/maya_builder_design_agent_1776436658197.png", faz: "Produção massiva de anúncios visuais.", res: "Mantém CTR alto baixando custo por clique.", u: "Abastecimento diário de campanhas." },
    { id: "VIDEO", name: "Dept. Vídeo", cat: "pro", color: "green", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Edição de vídeos de vendas.", res: "Entrega imagem de marca profissional.", u: "Finalização de VSLs." },
    { id: "IA-VIDEO", name: "IA-Vídeo Pro", cat: "pro", color: "green", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Geração de cenas via IA.", res: "Reduz custo de produção em 90%.", u: "Criação de cenas de apoio." },

    // 09 - TRAFEGO & ESCALA
    { id: "VIGIA", name: "Vigia (Metrics)", cat: "traffic", color: "gold", isUser: false, img: "/images/vigia_metrics_traffic_agent_1776436674655.png", faz: "Monitoramento real-time de CPA/ROAS.", res: "Evita perda de dinheiro em campanhas ruins.", u: "Gestão diária de budgets." },
    { id: "FB-ADS", name: "Meta Ads Spec", cat: "traffic", color: "green", isUser: false, img: "/images/vigia_metrics_traffic_agent_1776436674655.png", faz: "Gestão técnica de públicos no Meta.", res: "Garante alcance máximo ao menor custo.", u: "Escala no Facebook e IG." },
    { id: "CLOSER", name: "Closer PRO", cat: "traffic", color: "magenta", isUser: true, img: "/images/vigia_metrics_traffic_agent_1776436674655.png", faz: "Fechamento de leads de alto valor.", res: "Recupera boletos aumentando faturamento.", u: "Abordagem via WhatsApp." },
    { id: "BDR", name: "BDR Hunter", cat: "traffic", color: "blue", isUser: false, img: "/images/vigia_metrics_traffic_agent_1776436674655.png", faz: "Prospecção ativa.", res: "Alimenta funil com prospects qualificados.", u: "Outbound sales." },

    // 10 - ESTRATÉGIA & CORE
    { id: "LIB", name: "Biblioteca Premium", cat: "sys", color: "cyan", isUser: false, img: "/images/conclave_critico_agent_1776437237632.png", faz: "Consultoria baseada em 700+ livros.", res: "Entrega heurísticas de bilionários.", u: "Decisões estratégicas importantes." },
    { id: "ARCH", name: "Architect (Core)", cat: "sys", color: "blue", isUser: false, img: "/images/architect_core_sys_agent_1776436691571.png", faz: "Manutenção da infraestrutura AI.", res: "Garante que o sistema nunca caia.", u: "Coração técnico da operação." },
    { id: "CFO", name: "CFO Financeiro", cat: "sys", color: "white", isUser: false, img: "/images/conclave_critico_agent_1776437237632.png", faz: "Gestão de caixa e lucratividade.", res: "Garante saúde financeira real.", u: "Auditoria mensal de lucros." },
    { id: "AUDITOR", name: "Agente Auditor", cat: "sys", color: "green", isUser: false, img: "/images/conclave_critico_agent_1776437237632.png", faz: "Validação de entregas de todos os agentes.", res: "Evita que erros cheguem ao cliente.", u: "Revisão final de qualquer ativo." }
];

const surplusNames = [
    "LNS Specialist", "nepq-specialist", "Sales Coordinator", "Sales Manager", "Sales Lead", "Customer Success",
    "Data Engineer", "QA Master", "Developer Unit", "Integrador Checkout", "Deployer LP", "Quiz Logic",
    "Tradução Global", "Audit Proxy", "Gateway Monitor", "DNS Sentinel", "COO Operations", "CMO Marketing", "CRO Revenue",
    "Estrategista Master", "Publicação Supabase", "Designer Gamma", "WhatsApp Auto", "Distribuicao Unit", "Metricas Unit Econ"
];

surplusNames.forEach((n, i) => { 
    if (rawAgents.length < 56) {
        let cat = (i < 5 ? "traffic" : (i < 15 ? "sys" : "pro"));
        let faz = cat === "sys" ? "Suporte de infraestrutura e segurança neural." : (cat === "traffic" ? "Otimização tática de fluxos de vendas." : "Apoio em ativos de design e produção.");
        rawAgents.push({ 
            id: `S-${i}`, name: n, cat: cat, color: "blue", isUser: false, 
            img: "/images/architect_core_sys_agent_1776436691571.png", 
            faz: faz, 
            res: "Garante a estabilidade da célula.", 
            u: "Missões de alta demanda." 
        }); 
    }
});

export const AGENT_REGISTRY = rawAgents.reduce((acc, curr) => {
    acc[curr.id] = { ...curr, group: curr.cat };
    return acc;
}, {});

export const getAgent = (id) => {
    return AGENT_REGISTRY[id];
};

export const ALL_AGENTS = Object.values(AGENT_REGISTRY);
export const AGENTS_BY_GROUP = ALL_AGENTS.reduce((acc, agent) => {
    if (!acc[agent.cat]) acc[agent.cat] = [];
    acc[agent.cat].push(agent);
    return acc;
}, {});

// Mapping to readable names exactly as the old HTML
export const GROUP_CONFIG = {
    "conclave": { label: "03 - CONCLAVE DELIBERATIVO", color: "#ffffff", icon: "⚖️" },
    "minds": { label: "04 - MENTES CLONADAS", color: "#ffcc00", icon: "🧠" },
    "spy": { label: "05 - DEPTO ESPIONAGEM", color: "#ff00ff", icon: "🕵️" },
    "product": { label: "06 - ENGENHARIA PRODUTO", color: "#ffcc00", icon: "📦" },
    "copy": { label: "07 - COPYWRITING & VSL", color: "#00f2ff", icon: "✍️" },
    "pro": { label: "08 - DESIGN & PRODUÇÃO", color: "#bf00ff", icon: "🎨" },
    "traffic": { label: "09 - TRÁFEGO & ESCALA", color: "#ffcc00", icon: "🚀" },
    "sys": { label: "10 - SISTEMA & CORE", color: "#00f2ff", icon: "⚙️" }
};
