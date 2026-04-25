"use client";

import { useState, useEffect } from "react";
import { 
  Zap, ShieldCheck, MessageSquare, TrendingUp, Target, ShoppingCart, 
  Users, RefreshCw, Cpu, LayoutDashboard, BrainCircuit, Network, 
  ChevronDown, Rocket, ArrowRight, Activity, Wallet, Calendar, 
  Filter, Search 
} from "lucide-react";
import { AGENT_REGISTRY, GROUP_CONFIG } from "@/app/lib/agentRegistry";

export default function NexusPlatinumDashboard() {
  const [activeProject, setActiveProject] = useState("");
  const [activeTab, setActiveTab] = useState("traffic"); // traffic | agent-dashboard | fox
  const [sidebarTab, setSidebarTab] = useState("Mentes Clonadas"); // Mentes Clonadas | Conclave | Inteligência Mega Brain
  const [mounted, setMounted] = useState(false);
  
  // Meta Ads States
  const [accounts, setAccounts] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedDate, setSelectedDate] = useState("today");
  
  // UI States
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [agentSearch, setAgentSearch] = useState("");

  useEffect(() => {
    setMounted(true);
    if (activeProject) fetchAccounts();
  }, [activeProject]);

  useEffect(() => {
    if (selectedAccount) {
      fetchCampaigns();
      fetchData();
    }
  }, [selectedAccount, selectedCampaign, selectedDate]);

  const fetchAccounts = async () => {
    try {
      const res = await fetch(`/api/meta?type=accounts`);
      const json = await res.json();
      setAccounts(json.data || []);
      if (json.data?.length > 0 && !selectedAccount) setSelectedAccount(json.data[0].id);
    } catch (err) { console.error(err); }
  };

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`/api/meta?type=campaigns&accountId=${selectedAccount}`);
      const json = await res.json();
      setCampaigns(json.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchData = async () => {
    if (!selectedAccount) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/meta?type=insights&accountId=${selectedAccount}&campaignId=${selectedCampaign}&datePreset=${selectedDate}`);
      const json = await res.json();
      setData(json);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          metrics: data?.metrics || null,
          adsets: data?.adsets || [],
          currentAccount: selectedAccount,
        }),
      });
      const aiRes = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: aiRes.response, agent: aiRes.agentUsed }]);
    } catch (err) { console.error(err); }
  };

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  // --- PORTAL DE SELEÇÃO ---
  if (!activeProject) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="max-w-4xl w-full space-y-12 relative z-10 text-center">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/30 animate-pulse">
              <Rocket size={48} className="text-black" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter italic text-white leading-none">NEXUS <span className="text-[#00f2ff]">PLATINUM</span> V12</h1>
            <p className="text-[10px] uppercase font-black tracking-[0.6em] text-gray-500">Sistema de Comando Supremo | Gregori Alpha</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ id: "Projeto Principal", desc: "Gestão Master de Tráfego e Escala" }, { id: "FoxConect Expansão", desc: "Central de Leads e Operações B" }].map((p, i) => (
              <button key={i} onClick={() => setActiveProject(p.id)} className="glass-card p-10 border-white/5 hover:border-cyan-500/40 transition-all text-left group">
                <h3 className="text-2xl font-black tracking-tight text-white mb-3 uppercase italic">{p.id}</h3>
                <p className="text-sm text-gray-500 font-bold leading-relaxed">{p.desc}</p>
                <div className="mt-8 flex items-center gap-3 text-[11px] font-black uppercase text-cyan-400 group-hover:gap-5 transition-all">Iniciar Operação <ArrowRight size={16} /></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[300px_1fr_400px] h-screen overflow-hidden bg-[#050505] font-['Outfit']">
      
      {/* ── COLUNA 1: FROTA PURISTA (SIDEBAR) ────────────────────────── */}
      <aside className="border-r border-white/5 bg-black/40 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-white/5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <Cpu className="text-cyan-400" size={20} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">Frota Nexus V12</h2>
          </div>

          {/* ABAS DE DEPARTAMENTOS */}
          <div className="flex flex-col gap-2">
            {Object.keys(GROUP_CONFIG).map((group) => (
              <button 
                key={group}
                onClick={() => setSidebarTab(group)}
                className={`w-full text-left p-3 rounded-xl text-[10px] font-black tracking-widest transition-all border ${sidebarTab === group ? "bg-white/10 text-white border-white/20" : "text-gray-600 border-transparent hover:bg-white/5"}`}
                style={{ color: sidebarTab === group ? (GROUP_CONFIG as any)[group].color : "" }}
              >
                {(GROUP_CONFIG as any)[group].icon} {group.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
            <input 
              value={agentSearch} onChange={(e) => setAgentSearch(e.target.value)}
              placeholder="Filtrar agente..." 
              className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-[10px] text-gray-400 focus:outline-none focus:border-cyan-500/30 transition-all font-bold"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          {/* SEÇÃO FIXA: COMANDO MASTER */}
          <div className="space-y-3">
            <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              Comando Master
            </h3>
            <div className="space-y-1">
              {["mente-maestro", "gestor-trafego"].map((id) => {
                const agent = (AGENT_REGISTRY as any)[id];
                if (!agent) return null;
                return (
                  <button 
                    key={agent.id} 
                    onClick={() => { setSelectedAgentId(agent.id); setActiveTab("agent-dashboard"); }}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${selectedAgentId === agent.id ? 'bg-white/[0.05] border-white/10' : 'hover:bg-white/[0.02] border-transparent'}`}
                  >
                    <span className="text-2xl">{agent.icon}</span>
                    <div className="text-left flex-1">
                      <p className={`text-[12px] font-black tracking-tight ${selectedAgentId === agent.id ? 'text-white' : 'text-gray-500'}`}>{agent.name}</p>
                      <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest">Soberano</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DEPARTAMENTOS FILTRADOS */}
          <div className="space-y-3">
            <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-700 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: (GROUP_CONFIG as any)[sidebarTab]?.color}}></span>
              {sidebarTab}
            </h3>
            <div className="space-y-1">
              {Object.values(AGENT_REGISTRY)
                .filter(a => a.group === sidebarTab && a.id !== "mente-maestro" && a.id !== "gestor-trafego" && a.name.toLowerCase().includes(agentSearch.toLowerCase()))
                .map((agent) => (
                  <button 
                    key={agent.id} 
                    onClick={() => { setSelectedAgentId(agent.id); setActiveTab("agent-dashboard"); }}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${selectedAgentId === agent.id ? 'bg-white/[0.05] border-white/10' : 'hover:bg-white/[0.02] border-transparent'}`}
                  >
                    <span className="text-2xl">{agent.icon}</span>
                    <div className="text-left flex-1">
                      <p className={`text-[12px] font-black tracking-tight ${selectedAgentId === agent.id ? 'text-white' : 'text-gray-500'}`}>{agent.name}</p>
                      <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest">{agent.group}</p>
                    </div>
                    {selectedAgentId === agent.id && <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50"></div>}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-white/[0.01] flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic">Nexus Neural: Online</span>
        </div>
      </aside>

      {/* ── COLUNA 2: OPERACIONAL (DASHBOARD) ────────────────────────── */}
      <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col bg-[#070707]">
        {/* BARRA DE NAVEGAÇÃO SUPERIOR */}
        <nav className="h-20 border-b border-white/5 flex items-center px-10 gap-8 bg-black/40">
          <button onClick={() => setActiveTab("traffic")} className={`text-[10px] font-black tracking-[3px] uppercase transition-all ${activeTab === 'traffic' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-gray-600 hover:text-white'}`}>Métricas Master</button>
          <button onClick={() => setActiveTab("agent-dashboard")} className={`text-[10px] font-black tracking-[3px] uppercase transition-all ${activeTab === 'agent-dashboard' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-gray-600 hover:text-white'}`}>Terminal de Agente</button>
        </nav>

        {activeTab === "traffic" ? (
          <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">CENTRAL SUPREMA DE MÉTRICAS</h2>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-1">SISTEMA ATIVO: {activeProject}</p>
              </div>
              <button onClick={fetchData} className="p-4 glass-card hover:border-cyan-500/50 transition-all"><RefreshCw className={`${loading ? "animate-spin" : ""} text-cyan-400`} size={24} /></button>
            </header>

            {/* FILTROS MASTER */}
            <div className="grid grid-cols-3 gap-4 p-2 glass-card border-white/5">
              <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} className="bg-transparent text-[10px] font-black uppercase text-white p-4 focus:outline-none cursor-pointer">
                {accounts.map(acc => (<option key={acc.id} value={acc.id} className="bg-[#050505]">{acc.name}</option>))}
              </select>
              <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)} className="bg-transparent text-[10px] font-black uppercase text-white p-4 border-x border-white/5 focus:outline-none cursor-pointer">
                <option value="" className="bg-[#050505]">Todas as Campanhas</option>
                {campaigns.map(camp => (<option key={camp.id} value={camp.id} className="bg-[#050505]">{camp.name}</option>))}
              </select>
              <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-transparent text-[10px] font-black uppercase text-white p-4 focus:outline-none cursor-pointer">
                <option value="today" className="bg-[#050505]">Hoje</option>
                <option value="yesterday" className="bg-[#050505]">Ontem</option>
                <option value="last_7d" className="bg-[#050505]">7 Dias</option>
              </select>
            </div>

            {/* CARDS DE MÉTRICAS */}
            <div className="grid grid-cols-4 gap-5">
              {[
                { label: "Investimento", value: `R$ ${data?.metrics?.spend?.toFixed(2) || "0,00"}`, color: "text-white" },
                { label: "Vendas", value: data?.metrics?.sales || "0", color: "text-[#00ff88]" },
                { label: "ROAS", value: `${data?.metrics?.roas?.toFixed(2) || "0.00"}x`, color: "text-[#7000ff]" },
                { label: "CPA", value: `R$ ${data?.metrics?.cpa || "0,00"}`, color: "text-red-500" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-8">
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">{stat.label}</p>
                  <h3 className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* TABELA DE ADSETS */}
            <div className="glass-card !p-0 overflow-hidden border-white/10">
              <div className="p-5 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
                <Activity className="text-cyan-400 animate-pulse" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Análise em Tempo Real (AdSets)</span>
              </div>
              <table className="w-full text-left text-[11px]">
                <thead className="bg-white/[0.04] text-gray-500 uppercase font-black tracking-widest">
                  <tr><th className="p-4">AdSet</th><th className="p-4 text-center">Gasto</th><th className="p-4 text-center">Vendas</th><th className="p-4 text-center">ROAS</th><th className="p-4 text-right">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data?.adsets?.map((ad: any, i: number) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-black text-gray-300 uppercase">{ad.name}</td>
                      <td className="p-4 text-center font-bold text-gray-500">R$ {ad.spend?.toFixed(2)}</td>
                      <td className="p-4 text-center text-[#00ff88] font-black">{ad.sales}</td>
                      <td className="p-4 text-center font-black text-[#7000ff]">{ad.roas}x</td>
                      <td className="p-4 text-right"><span className={`px-2 py-1 rounded-full text-[8px] font-black ${ad.status === 'ACTIVE' ? 'text-green-400' : 'text-gray-500'}`}>{ad.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-10 space-y-8 animate-in fade-in zoom-in duration-500">
            {selectedAgentId ? (
              <div className="space-y-12">
                <header className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center text-5xl border border-white/10">{(AGENT_REGISTRY as any)[selectedAgentId].icon}</div>
                  <div>
                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">{(AGENT_REGISTRY as any)[selectedAgentId].name}</h2>
                    <p className="text-[12px] text-cyan-400 font-black uppercase tracking-[0.4em] mt-2">{(AGENT_REGISTRY as any)[selectedAgentId].group} ● SÍNCRONO</p>
                  </div>
                </header>

                <div className="grid grid-cols-2 gap-8">
                  <div className="glass-card p-10 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white italic border-b border-white/5 pb-4">O Que Resolve</h3>
                    <p className="text-[14px] text-gray-400 font-bold leading-relaxed">{(AGENT_REGISTRY as any)[selectedAgentId].description}</p>
                    <div className="pt-8">
                      <p className="text-[8px] text-gray-600 font-black uppercase mb-4 tracking-[3px]">Fases de Execução</p>
                      <div className="space-y-3">
                        {(AGENT_REGISTRY as any)[selectedAgentId].phases.map((phase: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 text-[10px] font-black text-gray-500"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> {phase.toUpperCase()}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-10 flex flex-col gap-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white italic border-b border-white/5 pb-4">Terminal Alpha</h3>
                    <div className="flex-1 bg-black/40 rounded-2xl p-6 font-mono text-[10px] text-cyan-500/70 border border-white/5">
                      <p>&gt; Inicializando {(AGENT_REGISTRY as any)[selectedAgentId].name.toLowerCase()}...</p>
                      <p>&gt; Mapeando potencial do Mega Brain...</p>
                      <p>&gt; Pronto para disparar ordem.</p>
                      <div className="w-1 h-4 bg-cyan-500 animate-pulse inline-block mt-4"></div>
                    </div>
                    <button 
                      onClick={() => setInput(`Ativar ${(AGENT_REGISTRY as any)[selectedAgentId].name}: Execute análise estratégica baseada no seu DNA Mega Brain.`)}
                      className="w-full py-4 bg-cyan-500 text-black rounded-2xl text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                    >
                      Disparar Ordem
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                <BrainCircuit size={100} className="text-gray-500 mb-8" />
                <p className="text-xs font-black uppercase tracking-[5px]">Selecione um Agente da Frota</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── COLUNA 3: JARVIS SUPREMO (CHAT) ───────────────────────────── */}
      <aside className="border-l border-white/5 bg-black/40 flex flex-col h-full overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#00f2ff] rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20"><MessageSquare className="text-black" size={24} /></div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] italic text-white leading-none">Jarvis Supremo</h3>
            <p className="text-[10px] text-[#00ff88] font-bold uppercase mt-1 animate-pulse italic">Soberano Ativo</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-center py-20 space-y-4 opacity-30">
              <ShieldCheck className="mx-auto text-gray-500" size={40} />
              <p className="text-[10px] font-black uppercase tracking-[4px]">Aguardando Ordens do Comandante</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
              {msg.agent && msg.role === 'assistant' && (
                <p className="text-[8px] font-black uppercase tracking-widest mb-1 text-cyan-400">{msg.agent.icon} {msg.agent.name}</p>
              )}
              <div className={`max-w-[90%] p-5 rounded-2xl text-[11px] leading-relaxed font-bold shadow-2xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#00f2ff] text-black italic' : 'bg-white/5 text-gray-300 border border-white/10'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-8 bg-black/50 border-t border-white/5 flex gap-3">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Disparar ordem..." 
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-[11px] text-white focus:outline-none focus:border-cyan-500/50 font-bold" 
          />
          <button type="submit" className="bg-[#00f2ff] text-black p-4 rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-xl shadow-cyan-500/30">
            <Zap size={22} />
          </button>
        </form>
      </aside>

    </div>
  );
}
