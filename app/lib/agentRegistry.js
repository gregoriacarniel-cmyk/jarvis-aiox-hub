// =====================================================================
// AGENT REGISTRY — NEXUS PLATINUM SUPREMO V14.5
// 56 Agentes Mapeados Exatamente como no Arquivo HTML Oficial
// =====================================================================

const rawAgents = [
    // 03 - CONCLAVE DELIBERATIVO (WHITE) - Decision Governance
    { 
        id: "CRITIC", name: "Crítico Metodológico", cat: "conclave", color: "white", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Executa auditorias frias e impiedosas sobre falhas lógicas, viabilidade técnica e furos na estratégia de negócios.", 
        res: "Elimina o desperdício de tempo e capital em ideias sem sustentação real, blindando o projeto contra erros evitáveis.", 
        u: "Sempre antes de iniciar qualquer produção pesada ou investimento em tráfego." 
    },
    { 
        id: "DEVIL", name: "Advogado do Diabo", cat: "conclave", color: "white", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Ataca a oferta e a copy buscando todos os motivos para o cliente NÃO comprar e para o sistema falhar.", 
        res: "Promove uma blindagem psicológica extrema da copy, antecipando e destruindo objeções antes mesmo que elas surjam.", 
        u: "Na fase final de refinamento do roteiro da VSL ou estrutura de página de vendas." 
    },
    { 
        id: "SYNTH", name: "Sintetizador Master", cat: "conclave", color: "white", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Processa todos os pareceres do Conclave e das Mentes Clonadas para criar um Roadmap de execução linear e sem ruído.", 
        res: "Elimina a paralisia por análise, transformando discussões complexas em um plano de ação direto, claro e executável.", 
        u: "Na reunião final de estratégia, imediatamente antes do deploy operacional." 
    },

    { 
        id: "mente-maestro", name: "Mente Maestro", cat: "sys", color: "cyan", isUser: true, 
        img: "/images/jarvis_master_nucleus_1776436321136.png", 
        faz: "Orquestração suprema e coordenação de todos os agentes, processos e fluxos de dados do ecossistema Jarvis.", 
        res: "Centraliza o comando mestre, garantindo que a visão estratégica do usuário seja executada com fidelidade absoluta por todos os departamentos.", 
        u: "Sempre que for necessário uma visão holística do projeto ou uma tomada de decisão que envolva múltiplas áreas." 
    },
    { 
        id: "COO", name: "COO Operations", cat: "sys", color: "white", isUser: false, 
        img: "/images/conclave_critico_agent_1776437237632.png", 
        faz: "Gestão operacional rigorosa, controle de cronogramas e sincronização técnica entre os diferentes departamentos da operação.", 
        res: "Garante que a execução siga o Roadmap tático sem gargalos, atrasos ou falhas de comunicação entre os agentes.", 
        u: "No monitoramento diário da saúde da operação e verificação de entregas técnicas." 
    },

    // 04 - MENTES CLONADAS (GOLD) - External Experts
    { 
        id: "HORMOZI", name: "Alex Hormozi Clone", cat: "minds", color: "gold", isUser: false, 
        img: "/images/hormozi_clone_agent_1776436596228.png", 
        faz: "Arquitetura de 'Grand Slam Offers' baseada no método $100M Offers, focando em valor, urgência e escassez.", 
        res: "Transforma produtos comuns em ofertas impossíveis de ignorar, onde o valor percebido é infinitamente superior ao preço.", 
        u: "No desenho da oferta principal, estruturação de Bumps, Upsells e bônus de alto impacto." 
    },
    { 
        id: "BRUNSON", name: "Russell Brunson Clone", cat: "minds", color: "gold", isUser: false, 
        img: "/images/brunson_clone_agent_1776436612466.png", 
        faz: "Desenho estratégico de funis de vendas complexos, esteira de produtos e arquitetura de Escada de Valor.", 
        res: "Maximiza o LTV (Lifetime Value) extraindo o máximo de lucro de cada lead através de uma jornada de consumo inteligente.", 
        u: "Na estruturação da jornada do cliente, desde a Isca Digital (Lead Magnet) até o produto High-Ticket." 
    },
    { 
        id: "COLE-G", name: "Cole Gordon Master", cat: "minds", color: "gold", isUser: false, 
        img: "/images/vigia_metrics_traffic_agent_1776436674655.png", 
        faz: "Estratégias avançadas de Inbound Sales e treinamento de equipes de Closers de alta performance para fechamentos High-Ticket.", 
        res: "Aumenta drasticamente a taxa de conversão de leads qualificados em vendas reais através de processos de fechamento humano.", 
        u: "Para otimizar processos de vendas via WhatsApp, chamadas telefônicas ou consultorias de fechamento." 
    },
    { 
        id: "MINER", name: "Jeremy Miner (NEPQ)", cat: "minds", color: "gold", isUser: false, 
        img: "/images/simon_similarweb_spy_1776436421734.png", 
        faz: "Psicologia de vendas reversa utilizando o método NEPQ para criar desapego e conduzir o prospect à autoconvencimento.", 
        res: "Elimina a resistência natural à compra e desativa o 'radar de vendedor' do prospect, gerando confiança e autoridade instantânea.", 
        u: "Na criação de scripts de abordagem, roteiros de quebra de objeções e diálogos de vendas persuasivos." 
    },
    { 
        id: "HAYNES", name: "Jeremy Haynes Guru", cat: "minds", color: "gold", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Estratégias de posicionamento de mercado, branding de autoridade e escala de agências de marketing digital.", 
        res: "Cria uma percepção de valor tão elevada que permite cobrar preços Premium, tornando a concorrência irrelevante pelo branding.", 
        u: "Para definição de branding pessoal, posicionamento de autoridade e estratégias de expansão de marca." 
    },

    // 05 - ESPIONAGEM (INTELLIGENCE)
    { 
        id: "PULLSAR", name: "Pullsar Draco", cat: "spy", color: "magenta", isUser: true, 
        img: "/images/pullsar_draco_spy_1776436373778.png", 
        faz: "Infiltração técnica e profunda em funis de concorrentes para extrair scripts, páginas, e mecânicas de conversão.", 
        res: "Expõe os gatilhos invisíveis e a promessa central que está gerando lucro para os rivais, permitindo modelagem superior.", 
        u: "Antes de criar qualquer novo funil ou oferta para um nicho competitivo." 
    },
    { 
        id: "RADAR", name: "Radar Duplo", cat: "spy", color: "magenta", isUser: true, 
        img: "/images/radar_duplo_spy_1776436359773.png", 
        faz: "Mineração de dados via YouTube API para identificar vídeos virais, tendências e demandas de audiência não atendidas.", 
        res: "Encontra ângulos de vendas vencedores e temas de alta retenção baseados em dados reais de comportamento de massa.", 
        u: "Na identificação de novas ondas de mercado e criação de conteúdos/anúncios magnéticos." 
    },
    { 
        id: "ADS-SPY", name: "Ad Library Scraper", cat: "spy", color: "magenta", isUser: true, 
        img: "/images/ad_library_spy_1776436390180.png", 
        faz: "Monitoramento e raspagem massiva da Biblioteca de Anúncios do Meta para detectar criativos com maior tempo de veiculação.", 
        res: "Mapeia com precisão quais criativos estão realmente vendendo no momento, economizando milhares de reais em testes inúteis.", 
        u: "No início da fase criativa e sempre que precisar de novos ângulos de anúncios para escala." 
    },
    { 
        id: "YT-SPY", name: "YouTube Spy", cat: "spy", color: "green", isUser: false, 
        img: "/images/youtube_spy_agent_1776436406398.png", 
        faz: "Análise profunda de avatares e mineração de comentários via IA para extrair o 'linguajar' e as dores reais do público.", 
        res: "Fornece a matéria-prima exata para uma copy empática e poderosa, falando exatamente o que o cliente sente e deseja.", 
        u: "Durante a pesquisa de persona e construção do avatar para roteiros de VSL." 
    },
    { 
        id: "SIMON", name: "Simon (SimilarWeb)", cat: "spy", color: "green", isUser: false, 
        img: "/images/simon_similarweb_spy_1776436421734.png", 
        faz: "Auditoria técnica de tráfego via SimilarWeb para identificar origens, volume e comportamento de usuários em sites rivais.", 
        res: "Valida se um funil concorrente realmente tem volume de tráfego e de onde ele vem, confirmando a viabilidade da modelagem.", 
        u: "Na validação final de um benchmark antes de iniciar a engenharia reversa do projeto." 
    },
    { 
        id: "SCOUT", name: "AG-SCOUT Hunter", cat: "spy", color: "green", isUser: false, 
        img: "/images/ag_scout_hunter_agent_v2_1776436715719.png", 
        faz: "Vigilância autônoma e constante do mercado para detectar novas ofertas silenciosas e mecanismos que estão surgindo.", 
        res: "Funciona como um sistema de alerta antecipado, permitindo que você entre em novas tendências antes que elas fiquem saturadas.", 
        u: "Vigilância estratégica permanente para manter a vantagem competitiva do ecossistema." 
    },

    // 06 - ENGENHARIA PRODUTO
    { 
        id: "NICHO", name: "Gerador de Nicho", cat: "product", color: "magenta", isUser: true, 
        img: "/images/gerador_nicho_agent_v2_1776436732741.png", 
        faz: "Desenvolvimento de nichos lucrativos, criação de Avatar Quântico e definição do Mecanismo Único do produto.", 
        res: "Transforma uma ideia genérica em uma oportunidade única e diferenciada, fugindo da guerra de preços do oceano vermelho.", 
        u: "Na definição inicial do DNA de qualquer novo infoproduto ou serviço digital." 
    },
    { 
        id: "MODEL", name: "Modelagem Oferta", cat: "product", color: "magenta", isUser: true, 
        img: "/images/modelagem_oferta_agent_1776436579323.png", 
        faz: "Executa a engenharia reversa de ofertas vencedoras (principalmente americanas) e realiza a tropicalização para o mercado brasileiro.", 
        res: "Garante que o core da oferta seja validado matematicamente enquanto adapta a linguagem e os bônus para a cultura local.", 
        u: "Durante a fase de construção da oferta principal e estrutura de checkout." 
    },
    { 
        id: "SAAS-REC", name: "SaaS & Recorrência", cat: "product", color: "green", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Modelagem de modelos de negócios baseados em assinatura, software como serviço e recorrência mensal.", 
        res: "Troca o esforço de 'vender todo dia' pela previsibilidade de receita recorrente, aumentando o valor de mercado (Equity) do negócio.", 
        u: "Em projetos focados em LTV alto e estabilidade de fluxo de caixa a longo prazo." 
    },
    { 
        id: "BACK-E", name: "Backend Architect", cat: "product", color: "blue", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Arquitetura lógica da esteira de pós-venda, configuração de Up-sells, Down-sells e fluxos de recuperação de checkout.", 
        res: "Aumenta o ticket médio (AOV) da operação em até 60% apenas através de ofertas complementares no momento da compra.", 
        u: "Na fase final de montagem técnica do funil de vendas antes do tráfego." 
    },
    { 
        id: "QUIZ", name: "Quiz Master", cat: "product", color: "blue", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Criação de funis de diagnóstico baseados em Quiz, filtrando leads e personalizando a oferta final com base nas respostas.", 
        res: "Gera um nível de engajamento e conscientização altíssimo, transformando um prospect curioso em um comprador educado.", 
        u: "Em funis de aquisição que exigem alta segmentação ou educação de mercado." 
    },

    // 07 - COPYWRITING
    { 
        id: "ARIA", name: "Aria Lyra (VSL)", cat: "copy", color: "magenta", isUser: true, 
        img: "/images/aria_lyra_copy_agent_1776436627050.png", 
        faz: "Escrita de roteiros de VSL (Video Sales Letter) utilizando técnicas de retenção absurda e gatilhos de antecipação.", 
        res: "Garante que o lead assista ao vídeo até o final e sinta uma urgência incontrolável de clicar no botão de compra.", 
        u: "Na roteirização de vídeos de vendas principais e vídeos de upsell." 
    },
    { 
        id: "GEORGIE", name: "Stefan Georgie Clone", cat: "copy", color: "gold", isUser: false, 
        img: "/images/stefan_georgie_copy_agent_1776436641705.png", 
        faz: "Escrita agressiva e veloz de cartas de vendas (TSL) utilizando o método RMBC para resposta direta.", 
        res: "Produz copies de alta conversão em tempo recorde, focando no que realmente move o ponteiro das vendas sem enrolação.", 
        u: "Para criação de páginas de vendas de texto, advertoriais e e-mails de vendas diretas." 
    },
    { 
        id: "CONTENT", name: "Dept. Conteúdo", cat: "copy", color: "green", isUser: false, 
        img: "/images/aria_lyra_copy_agent_1776436627050.png", 
        faz: "Produção de conteúdo de valor, ebooks, iscas digitais e materiais de entrega que sustentam a autoridade do produto.", 
        res: "Garante que a entrega prometida no marketing seja cumprida com qualidade, reduzindo o churn e aumentando a satisfação.", 
        u: "Durante a criação dos entregáveis do produto e materiais de bônus." 
    },
    { 
        id: "EMAIL", name: "Email Automator", cat: "copy", color: "green", isUser: false, 
        img: "/images/stefan_georgie_copy_agent_1776436641705.png", 
        faz: "Criação de sequências lógicas de e-mails para boas-vindas, doutrinação, abandono de carrinho e recuperação de boletos.", 
        res: "Recupera até 30% das vendas que seriam perdidas e mantém o lead aquecido dentro do ecossistema de vendas.", 
        u: "Na estruturação do CRM e ferramentas de automação de marketing." 
    },

    // 08 - DESIGN & PRO
    { 
        id: "MAYA", name: "Maya Builder (LP)", cat: "pro", color: "magenta", isUser: true, 
        img: "/images/maya_builder_design_agent_1776436658197.png", 
        faz: "Desenvolvimento e montagem de Landing Pages ultra-leves e otimizadas para conversão móvel.", 
        res: "Elimina a perda de leads por lentidão de carregamento, garantindo uma experiência de usuário fluida e profissional.", 
        u: "No deploy final das páginas de vendas, páginas de obrigado e presells." 
    },
    { 
        id: "CRIATIVOS", name: "Master Criativos", cat: "pro", color: "green", isUser: false, 
        img: "/images/maya_builder_design_agent_1776436658197.png", 
        faz: "Produção em massa de anúncios visuais (estáticos e animados) focados em gerar o maior CTR possível.", 
        res: "Mantém as campanhas sempre renovadas, evitando a fadiga de anúncios e baixando o custo por clique significativamente.", 
        u: "No abastecimento diário de criativos para as contas de anúncios." 
    },
    { 
        id: "VIDEO", name: "Dept. Vídeo", cat: "pro", color: "green", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Edição cinematográfica e montagem de vídeos de vendas, focando em ritmo, trilha sonora e impacto visual.", 
        res: "Entrega uma percepção de marca profissional e de alto nível, aumentando a confiança do comprador no produto.", 
        u: "Na finalização de VSLs, vídeos de anúncios e conteúdos de autoridade." 
    },
    { 
        id: "IA-VIDEO", name: "IA-Vídeo Pro", cat: "pro", color: "green", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Geração de cenas, avatares e b-roll utilizando inteligência artificial de última geração para vídeos de vendas.", 
        res: "Reduz o custo e o tempo de produção de vídeos em até 90%, permitindo iterações rápidas e testes de novos ângulos visuais.", 
        u: "Na criação de cenas de apoio para VSLs e anúncios dinâmicos de alta performance." 
    },
    { 
        id: "ESTRATEGI", name: "Estrategista Master", cat: "pro", color: "blue", isUser: false, 
        img: "/images/conclave_critico_agent_1776437237632.png", 
        faz: "Definição do ângulo estratégico central da operação, metas financeiras e KPis de sucesso do projeto.", 
        res: "Garante o direcionamento cirúrgico de todas as áreas, evitando que o projeto perca o foco no lucro e na escala.", 
        u: "No início absoluto de qualquer projeto Supremo e em revisões trimestrais de rota." 
    },

    // 09 - TRAFEGO & ESCALA
    { 
        id: "VIGIA", name: "Vigia (Metrics)", cat: "traffic", color: "gold", isUser: false, 
        img: "/images/vigia_metrics_traffic_agent_1776436674655.png", 
        faz: "Monitoramento em tempo real de todas as métricas críticas (CPA, ROAS, CPC) através de painéis táticos.", 
        res: "Protege o seu caixa, cortando campanhas ruins instantaneamente e sinalizando onde injetar mais capital com segurança.", 
        u: "Na gestão diária de budgets e controle de performance de tráfego pago." 
    },
    { 
        id: "FB-ADS", name: "Meta Ads Spec", cat: "traffic", color: "green", isUser: false, 
        img: "/images/vigia_metrics_traffic_agent_1776436674655.png", 
        faz: "Gestão técnica avançada de campanhas no Meta Ads, focando em públicos, algoritmos e escala horizontal/vertical.", 
        res: "Garante o maior alcance qualificado ao menor custo possível, utilizando o poder do algoritmo para encontrar compradores.", 
        u: "Durante as fases de teste e escala massiva no Facebook e Instagram." 
    },
    { 
        id: "CLOSER", name: "Closer PRO", cat: "traffic", color: "magenta", isUser: true, 
        img: "/images/vigia_metrics_traffic_agent_1776436674655.png", 
        faz: "Abordagem direta e personalizada de leads de alto valor que demonstraram interesse mas não finalizaram a compra.", 
        res: "Recupera boletos e carrinhos abandonados, aumentando o faturamento líquido da operação sem gastar mais com tráfego.", 
        u: "No suporte comercial e fechamento ativo via WhatsApp ou CRM." 
    },
    { 
        id: "BDR", name: "BDR Hunter", cat: "traffic", color: "blue", isUser: false, 
        img: "/images/vigia_metrics_traffic_agent_1776436674655.png", 
        faz: "Prospecção ativa e identificação de parcerias estratégicas, influenciadores e novas fontes de tráfego outbound.", 
        res: "Alimenta o funil com prospects altamente qualificados de fontes externas, diversificando a entrada de novos clientes.", 
        u: "Em estratégias de expansão de mercado e parcerias de autoridade." 
    },

    // 10 - ESTRATÉGIA & CORE
    { 
        id: "LIB", name: "Biblioteca Premium", cat: "sys", color: "cyan", isUser: false, 
        img: "/images/conclave_critico_agent_1776437237632.png", 
        faz: "Consultoria estratégica baseada em uma base de dados de mais de 700 livros de negócios, psicologia e marketing.", 
        res: "Entrega heurísticas e modelos mentais de bilionários para resolver problemas complexos com soluções validadas pela história.", 
        u: "Em momentos de impasse estratégico ou quando precisar de uma nova perspectiva fundamentada." 
    },
    { 
        id: "ARCH", name: "Architect (Core)", cat: "sys", color: "blue", isUser: false, 
        img: "/images/architect_core_sys_agent_1776436691571.png", 
        faz: "Manutenção da infraestrutura neural, segurança de dados e estabilidade técnica de todo o ecossistema Jarvis.", 
        res: "Garante que o sistema opere com 100% de uptime, protegendo os dados e a integridade da sua operação digital.", 
        u: "Coração técnico permanente da operação que sustenta todos os outros agentes." 
    },
    { 
        id: "CFO", name: "CFO Financeiro", cat: "sys", color: "white", isUser: false, 
        img: "/images/conclave_critico_agent_1776437237632.png", 
        faz: "Gestão de fluxo de caixa, análise de lucratividade real e controle de custos fixos e variáveis da operação.", 
        res: "Garante a saúde financeira real do projeto, evitando que a escala 'coma' o seu lucro por falta de controle de gastos.", 
        u: "Em auditorias mensais de resultados e planejamento de reinvestimento de capital." 
    },
    { 
        id: "AUDITOR", name: "Agente Auditor", cat: "sys", color: "green", isUser: false, 
        img: "/images/conclave_critico_agent_1776437237632.png", 
        faz: "Validação rigorosa de todas as entregas de todos os agentes (copy, design, código) antes do deploy final.", 
        res: "Evita que erros de português, falhas de design ou bugs técnicos cheguem ao cliente final, mantendo o padrão Supremo.", 
        u: "Na revisão final de qualquer ativo antes de ser publicado ou enviado para tráfego." 
    }
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
        let faz = cat === "sys" ? "Suporte técnico de infraestrutura e segurança neural para garantir a estabilidade do ecossistema." : (cat === "traffic" ? "Otimização tática de fluxos de vendas e apoio na gestão de leads e conversão." : "Apoio especializado na produção de ativos de design, vídeo e páginas de alta performance.");
        rawAgents.push({ 
            id: `S-${i}`, name: n, cat: cat, color: "blue", isUser: false, 
            img: "/images/architect_core_sys_agent_1776436691571.png", 
            faz: faz, 
            res: "Garante a estabilidade e o suporte necessário para a execução impecável da célula operacional.", 
            u: "Em missões de alta demanda técnica ou quando a operação exige braço extra de execução." 
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
