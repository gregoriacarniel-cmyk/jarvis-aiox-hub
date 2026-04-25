"use client";

/* SUPREMO RESTORATION V14.0 - FULL FIDELITY GESTOR & HORMOSI */
import { useState, useEffect } from "react";
import { 
  Zap, MessageSquare, TrendingUp, Target, ShoppingCart, 
  RefreshCw, Cpu, BrainCircuit, Activity, Wallet, Calendar, Search, ArrowRight, CheckCircle2, ShieldCheck, Layers, Terminal as TerminalIcon,
  BarChart3, MousePointer2, Eye, Percent, Power, DollarSign, Link as LinkIcon, Monitor, AlertTriangle
} from "lucide-react";
import { AGENT_REGISTRY, GROUP_CONFIG } from "@/app/lib/agentRegistry";

export default function NexusSupremoV14() {
  const [activeProject, setActiveProject] = useState("");
  const [activeTab, setActiveTab] = useState("traffic"); 
  const [mounted, setMounted] = useState(false);
  
  const [accounts, setAccounts] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedDate, setSelectedDate] = useState("today");
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState("");

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
      setLastUpdate(new Date().toLocaleTimeString());
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

  if (!activeProject) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden font-['Outfit']">
        <div className="max-w-4xl w-full space-y-12 relative z-10 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter italic text-white leading-none">NEXUS <span className="text-cyan-400">SUPREMO</span> V12</h1>
            <p className="text-[10px] uppercase font-black tracking-[1em] text-gray-600">Gregori Alpha | Sistema de Comando Soberano</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ id: "Projeto Principal", desc: "Gestão Master de Tráfego e Escala" }, { id: "FoxConect Expansão", desc: "Central de Leads e Operações B" }].map((p, i) => (
              <button key={i} onClick={() => setActiveProject(p.id)} className="glass-card p-10 border-white/5 hover:border-cyan-500/40 transition-all text-left group">
                <h3 className="text-2xl font-black tracking-tight text-white mb-3 uppercase italic group-hover:text-cyan-400 transition-colors">{p.id}</h3>
                <p className="text-sm text-gray-500 font-bold leading-relaxed">{p.desc}</p>
                <div className="mt-8 flex items-center gap-3 text-[11px] font-black uppercase text-cyan-400 group-hover:gap-5 transition-all">Iniciar Operação <ArrowRight size={16} /></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const selectedAgent = selectedAgentId ? (AGENT_REGISTRY as any)[selectedAgentId] : null;

  return (
    <div className="grid grid-cols-[300px_1fr_400px] h-screen overflow-hidden bg-[#050505] font-['Outfit']">
      
      {/* ── SIDEBAR ── */}
      <aside className="border-r border-white/5 bg-black/40 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-white/5 space-y-6">
          <button onClick={() => { setActiveTab("traffic"); setSelectedAgentId(null); }} className="flex items-center gap-4 w-full group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "traffic" ? "bg-cyan-500 shadow-xl shadow-cyan-500/20" : "bg-white/5"}`}><BarChart3 size={24} className={activeTab === "traffic" ? "text-black" : "text-gray-500"} /></div>
            <div className="text-left"><h2 className="text-[12px] font-black uppercase tracking-widest text-white italic">Métricas Master</h2><p className="text-[8px] text-cyan-400 font-black uppercase">Supremo 2.0</p></div>
          </button>
          <div className="flex flex-col gap-2 pt-2">
            {Object.keys(GROUP_CONFIG).map((group) => (
              <button key={group} onClick={() => { setActiveTab(group); setSelectedAgentId(null); }} className={`w-full text-left p-4 rounded-2xl text-[10px] font-black tracking-widest transition-all border ${activeTab === group ? "bg-white/10 text-white border-white/20" : "text-gray-600 border-transparent hover:bg-white/5"}`} style={{ color: activeTab === group ? (GROUP_CONFIG as any)[group].color : "" }}>{(GROUP_CONFIG as any)[group].icon} {group.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          <div className="space-y-3">
            <h3 className="px-4 text-[9px] font-black uppercase tracking-[3px] text-cyan-500">COMANDO MASTER</h3>
            <button onClick={() => { setSelectedAgentId("mente-maestro"); setActiveTab("mente-maestro"); }} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${selectedAgentId === "mente-maestro" ? 'bg-white/[0.05] border-white/10 shadow-xl' : 'hover:bg-white/[0.02] border-transparent'}`}>
              <span className="text-2xl">🧠</span>
              <div className="text-left"><p className={`text-[12px] font-black tracking-tight ${selectedAgentId === "mente-maestro" ? 'text-white' : 'text-gray-500'}`}>MENTE MAESTRO</p><p className="text-[8px] text-gray-700 font-black uppercase">Soberano</p></div>
            </button>
            <button onClick={() => { setActiveTab("traffic"); setSelectedAgentId(null); }} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${activeTab === "traffic" ? 'bg-white/[0.05] border-white/10 shadow-xl' : 'hover:bg-white/[0.02] border-transparent'}`}>
              <span className="text-2xl">🚀</span>
              <div className="text-left"><p className={`text-[12px] font-black tracking-tight ${activeTab === "traffic" ? 'text-white' : 'text-gray-500'}`}>GESTOR DE TRÁFEGO ALPHA</p><p className="text-[8px] text-gray-700 font-black uppercase">Soberano</p></div>
            </button>
          </div>
        </div>
      </aside>

      {/* ── CONSOLE CENTRAL ── */}
      <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col bg-[#070707]">
        <header className="h-24 border-b border-white/5 flex items-center px-10 justify-between bg-black/40 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shadow-cyan-500/5"><span className="text-2xl">{(GROUP_CONFIG as any)[activeTab]?.icon || "📊"}</span></div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-[4px] text-white italic">{activeTab === 'traffic' ? 'CONSOLIDAÇÃO SUPREMA' : activeTab}</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selectedAgent ? `Sincronia Alpha: ${selectedAgent.name}` : `Última Sincronização: ${lastUpdate || '--:--:--'}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {activeTab === "traffic" && <button onClick={fetchData} className="flex items-center gap-2 px-6 py-3 glass-card hover:border-cyan-500/50 transition-all text-[10px] font-black text-cyan-400 uppercase tracking-widest"><RefreshCw className={loading ? "animate-spin" : ""} size={14} /> Atualizar Dados</button>}
            {(selectedAgent || activeTab !== "traffic") && <button onClick={() => { setActiveTab("traffic"); setSelectedAgentId(null); }} className="px-6 py-3 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-[3px] text-gray-500 hover:text-white border border-white/5 transition-all">Retornar ao Hub</button>}
          </div>
        </header>

        <div className="p-10 space-y-10 animate-in fade-in duration-500">
          {activeTab === "traffic" && (
            <div className="space-y-10">
              {/* SELETORES ALPHA */}
              <div className="grid grid-cols-3 gap-6 p-4 glass-card border-white/5 bg-white/[0.02] shadow-2xl">
                <div className="space-y-2"><p className="text-[9px] font-black text-gray-600 uppercase px-4 tracking-widest">Conta Alpha</p><select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} className="w-full bg-transparent text-[11px] font-black uppercase text-white p-4 focus:outline-none cursor-pointer">{accounts.map(acc => (<option key={acc.id} value={acc.id} className="bg-[#050505]">{acc.name}</option>))}</select></div>
                <div className="space-y-2 border-x border-white/5"><p className="text-[9px] font-black text-gray-600 uppercase px-4 tracking-widest">Campanha Ativa</p><select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)} className="w-full bg-transparent text-[11px] font-black uppercase text-white p-4 focus:outline-none cursor-pointer"><option value="" className="bg-[#050505]">Todas as Campanhas</option>{campaigns.map(camp => (<option key={camp.id} value={camp.id} className="bg-[#050505]">{camp.name}</option>))}</select></div>
                <div className="space-y-2"><p className="text-[9px] font-black text-gray-600 uppercase px-4 tracking-widest">Período Tático</p><div className="flex gap-2 px-4 py-2">{['today', 'yesterday', 'last_7d', 'last_30d'].map(p => (<button key={p} onClick={() => setSelectedDate(p)} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${selectedDate === p ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>{p === 'today' ? 'Hoje' : p === 'yesterday' ? 'Ontem' : p === 'last_7d' ? '7D' : '30D'}</button>))}</div></div>
              </div>

              {/* CARDS SUPREMO 2.0 */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: "Investimento", value: `R$ ${data?.metrics?.spend?.toFixed(2) || "0,00"}`, color: "text-white", icon: Wallet },
                  { label: "Vendas Alpha", value: data?.metrics?.sales || "0", color: "text-[#00ff88]", icon: ShoppingCart },
                  { label: "CPA Médio", value: `R$ ${data?.metrics?.cpa || "0,00"}`, color: "text-red-500", icon: Target },
                  { label: "Connect Rate", value: data?.metrics?.connectRate || "0.0%", color: (parseFloat(data?.metrics?.connectRate) >= 80 ? "text-[#00ff88]" : parseFloat(data?.metrics?.connectRate) >= 70 ? "text-yellow-400" : "text-red-500"), icon: LinkIcon },
                  { label: "Faturamento", value: `R$ ${data?.metrics?.salesValue?.toFixed(2) || "0,00"}`, color: "text-[#00ff88]", icon: DollarSign },
                  { label: "ROAS Supremo", value: `${data?.metrics?.roas?.toFixed(2) || "0.00"}x`, color: "text-[#7000ff]", icon: TrendingUp },
                  { label: "Visualizações (LPV)", value: data?.metrics?.totalLPV?.toLocaleString() || "0", color: "text-blue-400", icon: Monitor },
                  { label: "Cliques no Link", value: data?.metrics?.totalLinkClicks?.toLocaleString() || "0", color: "text-yellow-400", icon: MousePointer2 },
                  { label: "Alcance Real", value: data?.metrics?.totalReach?.toLocaleString() || "0", color: "text-orange-400", icon: Eye },
                  { label: "Frequência", value: data?.metrics?.avgFrequency || "0.00", color: "text-purple-400", icon: RefreshCw },
                  { label: "Checkouts (IC)", value: data?.metrics?.totalCheckouts || "0", color: "text-pink-400", icon: ShieldCheck },
                  { label: "Carrinhos (ATC)", value: data?.metrics?.totalCarts || "0", color: "text-cyan-400", icon: ShoppingCart },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-6 group hover:border-cyan-500/30 transition-all shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4"><stat.icon size={16} className="text-gray-600 group-hover:text-cyan-400 transition-colors" /><p className="text-[8px] uppercase font-black tracking-widest text-gray-500">{stat.label}</p></div>
                    <h3 className={`text-2xl font-black tracking-tighter ${stat.color} drop-shadow-2xl`}>{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* TABELA DE GUERRA */}
              <div className="glass-card !p-0 overflow-hidden border-white/10 shadow-2xl">
                <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between"><div className="flex items-center gap-3"><Activity className="text-cyan-400 animate-pulse" size={18} /><span className="text-[11px] font-black uppercase tracking-widest text-white">Auditoria de Conjuntos Alpha (DNA Sync)</span></div></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-white/[0.04] text-gray-500 uppercase font-black tracking-widest border-b border-white/5">
                      <tr>
                        <th className="p-5">Conjunto</th><th className="p-5 text-center">Status</th><th className="p-5 text-center">Gasto</th><th className="p-5 text-center">Vendas</th><th className="p-5 text-center">Connect %</th><th className="p-5 text-center">CPA</th><th className="p-5 text-center">ROAS</th><th className="p-5 text-center">CTR</th><th className="p-5 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data?.adsets?.map((ad: any, i: number) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="p-5 font-black text-gray-200 uppercase italic group-hover:text-cyan-400">{ad.name}</td>
                          <td className="p-5 text-center"><span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${ad.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>{ad.status}</span></td>
                          <td className="p-5 text-center font-bold text-gray-500">R$ {ad.spend?.toFixed(2)}</td>
                          <td className="p-5 text-center text-[#00ff88] font-black text-base">{ad.sales}</td>
                          <td className={`p-5 text-center font-black ${parseFloat(ad.connectRate) >= 80 ? 'text-[#00ff88]' : parseFloat(ad.connectRate) >= 70 ? 'text-yellow-400' : 'text-red-500'}`}>{ad.connectRate}</td>
                          <td className="p-5 text-center font-bold text-red-400">R$ {ad.cpa}</td>
                          <td className="p-5 text-center font-black text-[#7000ff]">{ad.roas}x</td>
                          <td className="p-5 text-center font-bold text-gray-500">{ad.ctr}</td>
                          <td className="p-5 text-right"><button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"><Power size={14} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* HUB DE AGENTES */}
          {activeTab !== "traffic" && !selectedAgent && (
            <div className="grid grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
              {Object.values(AGENT_REGISTRY).filter(a => a.group === activeTab).map((agent) => (
                <button key={agent.id} onClick={() => setSelectedAgentId(agent.id)} className="glass-card p-10 text-left hover:border-cyan-500/40 transition-all group relative overflow-hidden shadow-xl">
                  <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 group-hover:scale-125 transition-all">{agent.icon}</div>
                  <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">{agent.icon}</span>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">{agent.name}</h3>
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase text-cyan-400 italic">Identificar Agente <ArrowRight size={14} /></div>
                </button>
              ))}
            </div>
          )}

          {/* DASHBOARD DO HORMOZI (RESTAURAÇÃO TOTAL) */}
          {selectedAgentId === "m1" && (
            <div className="space-y-12 animate-in zoom-in-95 duration-700">

              <div className="flex items-center justify-between border-b border-white/5 pb-10">
                <div className="flex items-center gap-10">
                  <div className="w-32 h-32 bg-white/5 rounded-[45px] flex items-center justify-center text-6xl border border-white/10 shadow-2xl relative transition-all duration-1000">
                    🧬 {isExecuting && <div className="absolute inset-0 rounded-[45px] border-2 border-cyan-500 animate-ping opacity-50" />}
                  </div>
                  <div>
                    <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">ALEX HORMOZI</h2>
                    <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.5em] mt-3 italic">ESTRATEGISTA MASTER — 100M OFFERS</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {[
                  { label: "FORÇA DA OFERTA", val: 85, color: "text-[#00ff88]" },
                  { label: "MULTIPLICADOR LTV", val: 72, color: "text-cyan-400" },
                  { label: "ÍNDICE DE ESCALA", val: 64, color: "text-[#7000ff]" }
                ].map((g, i) => (
                  <div key={i} className="glass-card p-10 flex flex-col items-center text-center space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{g.label}</p>
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90"><circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" /><circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * g.val) / 100} className={`${g.color} transition-all duration-1000`} /></svg>
                      <span className={`absolute text-2xl font-black ${g.color}`}>{g.val}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="glass-card p-10 space-y-6 border-l-4 border-cyan-500">
                  <h3 className="text-[11px] font-black text-cyan-500 uppercase tracking-[4px] italic">CORE STRATEGY</h3>
                  <p className="text-2xl font-black text-white leading-tight uppercase italic tracking-tighter">ESTRATÉGIA DE 100M OFFERS E CRIAÇÃO DE OFERTAS SEM RESISTÊNCIA.</p>
                </div>
                <div className="glass-card p-10 space-y-6 border-l-4 border-[#00ff88]">
                  <h3 className="text-[11px] font-black text-[#00ff88] uppercase tracking-[4px] italic">MARKET ANOMALIES</h3>
                  <p className="text-2xl font-black text-white leading-tight uppercase italic tracking-tighter">GARANTE QUE NINGUÉM CONSIGA DIZER NÃO PARA O VALOR QUE VOCÊ ENTREGA.</p>
                </div>
              </div>

              <div className="glass-card p-10 space-y-8 bg-black/60 border-cyan-500/20">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[5px] text-center italic">PILLARS OF EXECUTION</h3>
                <div className="space-y-6">
                  {["ENGENHARIA DE OFERTA", "MAXIMUN LTV", "ESCALA DE $100M"].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-6 border border-white/5 rounded-2xl bg-white/[0.02]">
                      <span className="text-[11px] font-black text-gray-400 tracking-widest">{p}</span>
                      <CheckCircle2 className="text-cyan-400" size={18} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD PADRÃO PARA OUTROS AGENTES */}
          {selectedAgent && selectedAgentId !== "m1" && (
            <div className="max-w-5xl mx-auto space-y-12 animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-10 border-b border-white/5 pb-10">
                <div className="w-32 h-32 bg-white/5 rounded-[45px] flex items-center justify-center text-6xl border border-white/10 shadow-2xl">{selectedAgent.icon}</div>
                <div><h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">{selectedAgent.name}</h2><p className="text-[12px] text-cyan-400 font-black uppercase tracking-[0.6em] mt-3 italic">Unidade de Inteligência Alpha</p></div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                {[{ label: "O QUE FAZ", text: selectedAgent.f, color: "text-cyan-400" }, { label: "O QUE RESOLVE", text: selectedAgent.r, color: "text-[#00ff88]" }, { label: "ONDE USAR", text: selectedAgent.u, color: "text-[#7000ff]" }].map((box, i) => (
                  <div key={i} className="glass-card p-10 border-white/10 bg-white/[0.02] min-h-[250px] flex flex-col shadow-xl"><h4 className={`text-[10px] font-black uppercase tracking-[4px] ${box.color} mb-6`}>{box.label}</h4><p className="text-sm font-bold text-gray-300 leading-relaxed uppercase flex-1">{box.text}</p></div>
                ))}
              </div>
              <div className="glass-card !p-0 overflow-hidden border-cyan-500/20 bg-cyan-500/[0.01] shadow-2xl">
                <div className="bg-cyan-500/10 p-5 border-b border-cyan-500/20 flex items-center justify-between"><div className="flex items-center gap-3"><TerminalIcon size={16} className="text-cyan-400" /><span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Terminal Tático Alpha</span></div></div>
                <div className="p-10 space-y-8"><div className="bg-black/60 rounded-2xl p-8 font-mono text-xs text-cyan-500/70 border border-white/5 h-48 overflow-y-auto"><p>&gt; Sistema {selectedAgent.name.toLowerCase()} integrado...</p></div></div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── CHAT ── */}
      <aside className="border-l border-white/5 bg-black/40 flex flex-col overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
          <div className="w-14 h-14 bg-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/20"><MessageSquare className="text-black" size={28} /></div>
          <div><h3 className="text-sm font-black uppercase tracking-[0.2em] italic text-white leading-none">Jarvis Supremo</h3><p className="text-[9px] text-[#00ff88] font-black uppercase mt-1 animate-pulse">Neural Sync On</p></div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[95%] p-6 rounded-[25px] text-[11px] font-bold shadow-2xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-cyan-500 text-black italic' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{msg.content}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-8 bg-black/50 border-t border-white/5 flex gap-4">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Comando Supremo..." className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-5 text-[12px] text-white focus:outline-none focus:border-cyan-500/50 font-bold" /><button type="submit" className="bg-cyan-500 text-black p-5 rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-cyan-500/30"><Zap size={24} /></button>
        </form>
      </aside>
    </div>
  );
}
