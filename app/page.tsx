"use client";

/* NEXUS SUPREMO V30.1 - MOBILE & GROQ CLEAN SYNC */
import { useState, useEffect, useRef } from "react";
import { 
  Zap, MessageSquare, TrendingUp, Target, ShoppingCart, 
  RefreshCw, Cpu, Activity, Wallet, ArrowRight, 
  BarChart3, MousePointer2, Monitor, DollarSign, Link as LinkIcon, Power, TrendingDown, Eye, Percent, Menu, X, ChevronRight
} from "lucide-react";
import { AGENT_REGISTRY, GROUP_CONFIG } from "@/app/lib/agentRegistry";

export default function NexusSupremoV30() {
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
  const [isExecuting, setIsExecuting] = useState(false);
  
  // Estados Mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);

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

    const messagesEndRef = useRef(null);
    const [isChatExpanded, setIsChatExpanded] = useState(false);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: any) => {
      e.preventDefault();
      if (!input.trim()) return;
      const userMsg = { role: "user", content: input };
      setMessages(prev => [...prev, userMsg]);
      setInput("");
      if (selectedAgentId) setIsExecuting(true);
      
      const sanitizedMessages = messages.map(m => ({ role: m.role, content: m.content }));

      try {
        const res = await fetch("/api/jarvis-v31", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...sanitizedMessages, userMsg],
            metrics: data?.metrics || null,
            adsets: data?.adsets || [],
            currentAccount: selectedAccount,
            selectedAgentId: selectedAgentId
          }),
        });
        const aiRes = await res.json();
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: aiRes.response, 
          agent: aiRes.agentUsed,
          fullResult: aiRes.fullResult 
        }]);
        setTimeout(() => setIsExecuting(false), 3000);
      } catch (err) { console.error(err); setIsExecuting(false); }
    };

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  if (!activeProject) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden font-['Outfit']">
        <div className="max-w-4xl w-full space-y-12 relative z-10 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic text-white leading-none">NEXUS <span className="text-cyan-400">SUPREMO</span> V30</h1>
            <p className="text-[10px] uppercase font-black tracking-[1em] text-gray-600">Gregori Alpha | Engenharia de Construção Mobile</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ id: "Projeto Principal", desc: "Gestão Master de Tráfego e Escala" }, { id: "FoxConect Expansão", desc: "Central de Leads e Operações B" }].map((p, i) => (
              <button key={i} onClick={() => setActiveProject(p.id)} className="glass-card p-8 md:p-10 border-white/5 hover:border-cyan-500/40 transition-all text-left group">
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

  const selectedAgent = selectedAgentId ? AGENT_REGISTRY[selectedAgentId] : null;
  const isSovereignGroup = selectedAgent && ["minds", "conclave", "sys"].includes(selectedAgent.cat?.toLowerCase());

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] font-['Outfit'] relative">
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-[300px] border-r border-white/5 bg-black/95 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between lg:block">
            <button onClick={() => { setActiveTab("traffic"); setSelectedAgentId(null); setSidebarOpen(false); }} className="flex items-center gap-4 w-full group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "traffic" ? "bg-cyan-500 shadow-xl shadow-cyan-500/20" : "bg-white/5"}`}><BarChart3 size={24} className={activeTab === "traffic" ? "text-black" : "text-gray-500"} /></div>
              <div className="text-left"><h2 className="text-[12px] font-black uppercase tracking-widest text-white italic">GESTOR DE TRÁFEGO ALPHA</h2><p className="text-[8px] text-cyan-400 font-black uppercase">Supremo 2.0</p></div>
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          <div className="space-y-2">
            {Object.keys(GROUP_CONFIG).map((group) => (
              <button key={group} onClick={() => { setActiveTab(group); setSelectedAgentId(null); setSidebarOpen(false); }} className={`w-full text-left p-4 md:p-5 rounded-2xl text-xs md:text-sm font-black tracking-widest transition-all border ${activeTab === group ? "bg-white/10 text-white border-white/20 shadow-lg" : "text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300"}`} style={{ color: activeTab === group ? (GROUP_CONFIG as any)[group].color : "", textShadow: activeTab === group ? `0 0 15px ${(GROUP_CONFIG as any)[group].color}80` : "" }}>
                {(GROUP_CONFIG as any)[group].label}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="px-4 text-[9px] font-black uppercase tracking-[3px] text-cyan-500">COMANDO MASTER</h3>
            <button onClick={() => { setSelectedAgentId("mente-maestro"); setActiveTab("mente-maestro"); setSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${selectedAgentId === "mente-maestro" ? 'bg-white/[0.05] border-white/10 shadow-xl' : 'hover:bg-white/[0.02] border-transparent'}`}>
              <span className="text-2xl">🧠</span>
              <div className="text-left"><p className={`text-[12px] font-black tracking-tight ${selectedAgentId === "mente-maestro" ? 'text-white' : 'text-gray-500'}`}>MENTE MAESTRO</p></div>
            </button>
            <button onClick={() => { setActiveTab("traffic"); setSelectedAgentId(null); setSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${activeTab === "traffic" ? 'bg-white/[0.05] border-white/10 shadow-xl' : 'hover:bg-white/[0.02] border-transparent'}`}>
              <span className="text-2xl">🚀</span>
              <div className="text-left"><p className={`text-[12px] font-black tracking-tight ${activeTab === "traffic" ? 'text-white' : 'text-gray-500'}`}>GESTOR DE TRÁFEGO ALPHA</p></div>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col bg-[#070707] relative">
        <header className="h-20 md:h-24 border-b border-white/5 flex items-center px-4 md:px-10 justify-between bg-black/40 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10"><Menu size={20} className="text-cyan-400" /></button>
            <div className="hidden md:flex w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shadow-cyan-500/5"><span className="text-2xl">{(GROUP_CONFIG as any)[activeTab]?.icon || "📊"}</span></div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-sm md:text-xl font-black uppercase tracking-[2px] md:tracking-[4px] text-white italic truncate max-w-[150px] md:max-w-none">{activeTab === 'traffic' ? 'CONSOLIDAÇÃO SUPREMO' : activeTab}</h2>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#7000ff]/20 border border-[#7000ff]/40 rounded text-[8px] font-black text-[#7000ff] tracking-widest animate-pulse">V32.3 ALPHA - UI REFINED</span>
              </div>
              <p className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selectedAgent ? `Sincronia Alpha: ${selectedAgent.name}` : `Sincronização: ${lastUpdate || '--:--'}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {activeTab === "traffic" && <button onClick={fetchData} className="flex items-center justify-center md:justify-start gap-2 p-3 md:px-6 md:py-3 glass-card hover:border-cyan-500/50 transition-all text-[10px] font-black text-cyan-400 uppercase tracking-widest"><RefreshCw className={loading ? "animate-spin" : ""} size={14} /><span className="hidden md:inline">Atualizar</span></button>}
            <button onClick={() => setChatOpen(!isChatOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center bg-cyan-500 rounded-xl text-black shadow-lg shadow-cyan-500/20"><MessageSquare size={20} /></button>
          </div>
        </header>

        <div className="p-4 md:p-10 space-y-6 md:space-y-10 animate-in fade-in duration-500">
          {activeTab === "traffic" && (
            <div className="space-y-6 md:space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 glass-card border-white/5 bg-white/[0.02] shadow-2xl">
                <div className="space-y-2"><p className="text-[9px] font-black text-gray-600 uppercase px-4 tracking-widest">Conta Alpha</p><select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} className="w-full bg-transparent text-[11px] font-black uppercase text-white p-2 md:p-4 focus:outline-none cursor-pointer">{accounts.map(acc => (<option key={acc.id} value={acc.id} className="bg-[#050505]">{acc.name}</option>))}</select></div>
                <div className="space-y-2 md:border-x border-white/5"><p className="text-[9px] font-black text-gray-600 uppercase px-4 tracking-widest">Campanha Ativa</p><select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)} className="w-full bg-transparent text-[11px] font-black uppercase text-white p-2 md:p-4 focus:outline-none cursor-pointer"><option value="" className="bg-[#050505]">Todas</option>{campaigns.map(camp => (<option key={camp.id} value={camp.id} className="bg-[#050505]">{camp.name}</option>))}</select></div>
                <div className="space-y-2"><p className="text-[9px] font-black text-gray-600 uppercase px-4 tracking-widest">Período Tático</p><div className="flex gap-1 md:gap-2 px-2 md:px-4 py-2 overflow-x-auto scrollbar-hide">{['today', 'yesterday', 'last_7d', 'last_30d'].map(p => (<button key={p} onClick={() => setSelectedDate(p)} className={`flex-1 min-w-[50px] px-2 py-2 rounded-lg text-[8px] md:text-[9px] font-black uppercase transition-all ${selectedDate === p ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>{p === 'today' ? 'Hoje' : p === 'yesterday' ? 'Ontem' : p === 'last_7d' ? '7D' : '30D'}</button>))}</div></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: "Investimento", value: `R$ ${data?.metrics?.spend?.toFixed(2) || "0,00"}`, color: "text-white", icon: Wallet },
                  { label: "Vendas Alpha", value: data?.metrics?.sales || "0", color: "text-[#00ff88]", icon: ShoppingCart },
                  { label: "CPA Médio", value: `R$ ${data?.metrics?.cpa || "0,00"}`, color: "text-red-500", icon: Target },
                  { label: "Connect Rate", value: data?.metrics?.connectRate || "0.0%", color: "text-cyan-400", icon: LinkIcon },
                  { label: "Faturamento", value: `R$ ${data?.metrics?.salesValue?.toFixed(2) || "0,00"}`, color: "text-[#00ff88]", icon: DollarSign },
                  { label: "ROAS Supremo", value: `${data?.metrics?.roas?.toFixed(2) || "0.00"}x`, color: "text-[#7000ff]", icon: TrendingUp },
                  { label: "Visualizações", value: data?.metrics?.totalLPV?.toLocaleString() || "0", color: "text-blue-400", icon: Monitor },
                  { label: "Cliques Link", value: data?.metrics?.totalLinkClicks?.toLocaleString() || "0", color: "text-yellow-400", icon: MousePointer2 },
                  { label: "Finalizações", value: data?.metrics?.checkouts || "0", color: "text-orange-400", icon: ShoppingCart },
                  { label: "CPC Médio", value: `R$ ${data?.metrics?.cpc || "0,00"}`, color: "text-gray-400", icon: MousePointer2 },
                  { label: "CPM Médio", value: `R$ ${data?.metrics?.cpm || "0,00"}`, color: "text-gray-400", icon: Eye },
                  { label: "CTR Master", value: `${data?.metrics?.ctr || "0.00"}%`, color: "text-cyan-400", icon: Percent },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-4 md:p-6 shadow-xl relative overflow-hidden group border-white/5 hover:border-cyan-500/20 transition-all">
                    <div className="flex items-center justify-between mb-2 md:mb-4"><stat.icon size={14} className="text-gray-600" /><p className="text-[7px] md:text-[8px] uppercase font-black tracking-widest text-gray-500">{stat.label}</p></div>
                    <h3 className={`text-sm md:text-2xl font-black tracking-tighter ${stat.color} truncate`}>{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="glass-card !p-0 overflow-hidden border-white/10 shadow-2xl">
                <div className="p-4 md:p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between"><div className="flex items-center gap-3"><Activity className="text-cyan-400 animate-pulse" size={18} /><span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-white">Auditoria Alpha (DNA Sync)</span></div></div>
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left text-[10px] md:text-[11px] min-w-[800px]">
                    <thead className="bg-white/[0.04] text-gray-500 uppercase font-black tracking-widest border-b border-white/5">
                      <tr><th className="p-5">Conjunto</th><th className="p-5 text-center">Status</th><th className="p-5 text-center">Gasto</th><th className="p-5 text-center">Vendas</th><th className="p-5 text-center">Connect %</th><th className="p-5 text-center">CPA</th><th className="p-5 text-center">ROAS</th><th className="p-5 text-center">CTR</th><th className="p-5 text-right">Ação</th></tr>
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

          {activeTab !== "traffic" && !selectedAgent && (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 animate-in slide-in-from-bottom-4 duration-500">
             {Object.values(AGENT_REGISTRY).filter((a: any) => a.cat === activeTab).map((agent: any) => (
               <button key={agent.id} onClick={() => setSelectedAgentId(agent.id)} className="glass-card p-8 md:p-10 text-left hover:border-cyan-500/40 transition-all group relative overflow-hidden shadow-xl">
                 <div className="absolute -right-6 -bottom-6 w-64 h-64 bg-cover bg-center opacity-5" style={{ backgroundImage: `url('${agent.img}')` }}></div>
                 <div className="w-16 h-16 rounded-2xl mb-6 bg-cover bg-center border border-white/10 shadow-lg" style={{ backgroundImage: `url('${agent.img}')` }}></div>
                 <h3 className="text-lg md:text-xl font-black text-white uppercase italic tracking-tighter mb-4">{agent.name}</h3>
                 <p className="text-[9px] text-gray-500 font-bold mb-8 uppercase tracking-widest leading-relaxed line-clamp-2">{agent.faz}</p>
                 <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase text-cyan-400 italic">Ativar Agente <ChevronRight size={14} /></div>
               </button>
             ))}
           </div>
          )}

          {selectedAgent && isSovereignGroup && (
             <div className="space-y-8 md:space-y-12 animate-in zoom-in-95 duration-700">
               <div className="flex flex-col md:flex-row items-center gap-6 md:justify-between border-b border-white/5 pb-8 md:pb-10">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-[35px] md:rounded-[45px] flex items-center justify-center border border-white/10 shadow-2xl relative bg-cover bg-center" style={{ backgroundImage: `url('${selectedAgent.img}')` }}>
                    {isExecuting && <div className="absolute inset-0 rounded-[45px] border-2 border-cyan-500 animate-ping opacity-50" />}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedAgent.name}</h2>
                    <p className="text-[8px] md:text-[10px] text-cyan-400 font-black uppercase tracking-[0.5em] mt-3 italic">{selectedAgent.cat?.toUpperCase()} — SOBERANO</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {[
                  { label: "FORÇA DA OFERTA", val: 85, color: "text-[#00ff88]" },
                  { label: "MULTIPLICADOR LTV", val: 72, color: "text-cyan-400" },
                  { label: "ÍNDICE DE ESCALA", val: 64, color: "text-[#7000ff]" }
                ].map((g, i) => (
                  <div key={i} className="glass-card p-8 md:p-10 flex flex-col items-center text-center space-y-6">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">{g.label}</p>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90"><circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" /><circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * g.val) / 100} className={`${g.color} transition-all duration-1000`} /></svg>
                      <span className={`absolute text-xl md:text-2xl font-black ${g.color}`}>{g.val}%</span>
                    </div>
                  </div>
                ))}
              </div>
             </div>
          )}
        </div>
      </main>

      <aside className={`fixed inset-y-0 right-0 z-50 ${isChatExpanded ? 'w-[350px] lg:w-[800px]' : 'w-[350px] lg:w-[400px]'} border-l border-white/5 bg-black/95 transform transition-all duration-500 flex flex-col`}>
        <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-cyan-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/20"><MessageSquare className="text-black" size={24} /></div>
            <div><h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] italic text-white leading-none">Jarvis Supremo</h3><p className="text-[8px] md:text-[9px] text-[#00ff88] font-black uppercase mt-1 animate-pulse">Groq Sync active</p></div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setIsChatExpanded(!isChatExpanded)} className="hidden lg:flex w-10 h-10 items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"><ArrowRight size={18} className={`transform transition-transform ${isChatExpanded ? 'rotate-180' : ''}`} /></button>
             <button onClick={() => setChatOpen(false)} className="lg:hidden text-gray-500 hover:text-white"><X size={24} /></button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 transition-all">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in`}>
              <div className={`max-w-[90%] p-4 md:p-5 rounded-[18px] md:rounded-[22px] text-[10px] md:text-[11px] font-bold shadow-xl ${msg.role === 'user' ? 'bg-cyan-500 text-black italic' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{msg.content}</div>
              {msg.agent && <div className="mt-2 text-[7px] md:text-[8px] font-black uppercase text-cyan-400 px-3">VIA: {msg.agent.name}</div>}
            </div>
          ))}
          {isExecuting && <div className="flex items-center gap-3 p-3 md:p-4 bg-white/5 rounded-2xl w-fit animate-pulse"><Cpu className="text-cyan-400 animate-spin" size={14} /><span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-cyan-400">Processando...</span></div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-6 md:p-8 bg-black/50 border-t border-white/5 flex gap-3 md:gap-4 shrink-0">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Comando..." className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-5 text-[11px] md:text-[12px] text-white focus:outline-none focus:border-cyan-500/50 font-bold" />
          <button type="submit" className="bg-cyan-500 text-black p-3 md:p-5 rounded-xl md:rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-cyan-500/30 flex items-center justify-center shrink-0"><Zap size={20} /></button>
        </form>
      </aside>
    </div>
  );
}
