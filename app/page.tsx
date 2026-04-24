"use client";

import { useState, useEffect } from "react";
import { Zap, ShieldCheck, MessageSquare, TrendingUp, Target, ShoppingCart, CreditCard, Users, RefreshCw, BarChart3, Globe, Layers, Cpu, LayoutDashboard, BrainCircuit, Network, ChevronDown, Rocket, CheckCircle2, ArrowRight, MousePointer2, Eye, Activity, Wallet, Calendar, Filter } from "lucide-react";

export default function LowticketGregoriHub() {
  const [activeTab, setActiveTab] = useState("traffic");
  const [activeProject, setActiveProject] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // Estados de Filtro
  const [accounts, setAccounts] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedDate, setSelectedDate] = useState("today");
  
  // Dados e UI
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMounted(true);
    if (activeProject) {
      fetchAccounts();
    }
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
      if (json.data?.length > 0 && !selectedAccount) {
        setSelectedAccount(json.data[0].id);
      }
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
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });
      const aiRes = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: aiRes.response }]);
    } catch (err) { console.error(err); }
  };

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  // --- PORTAL DE SELEÇÃO ---
  if (!activeProject) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden font-['Inter']">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="max-w-4xl w-full space-y-12 relative z-10 text-center">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto glow-cyan shadow-xl shadow-cyan-500/30 animate-pulse">
              <Rocket size={48} className="text-black" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter italic text-white leading-none">LOWTICKET <span className="text-[#00f2ff]">GREGORI</span></h1>
            <p className="text-[10px] uppercase font-black tracking-[0.6em] text-gray-500">Nexus Alpha | Sistema de Comando Supremo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ id: "Projeto Principal", desc: "Gestão Master de Tráfego e Escala", icon: Zap, color: "cyan", bg: "bg-cyan-500" }, { id: "FoxConect Expansão", desc: "Central de Leads e Operações B", icon: Network, color: "purple", bg: "bg-purple-600" }].map((p, i) => (
              <button key={i} onClick={() => setActiveProject(p.id)} className="group glass-card p-10 border-white/5 hover:border-cyan-500/40 transition-all text-left relative overflow-hidden active:scale-95">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${p.bg} text-white shadow-lg`}><p.icon size={28} /></div>
                <h3 className="text-2xl font-black tracking-tight text-white mb-3 uppercase italic">{p.id}</h3>
                <p className="text-sm text-gray-500 font-bold mb-10 leading-relaxed">{p.desc}</p>
                <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400 group-hover:gap-5 transition-all">Iniciar Operação <ArrowRight size={16} /></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nexus-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="p-8 border-b border-white/5">
          <button onClick={() => setActiveProject("")} className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#00f2ff] rounded-xl flex items-center justify-center glow-cyan shadow-lg shadow-cyan-500/20 group-hover:rotate-12 transition-transform"><Zap size={22} className="text-black" /></div>
            <div className="text-left"><span className="text-[9px] font-black uppercase tracking-widest text-[#00f2ff] block mb-1 opacity-60">Trocar Unidade</span><h1 className="text-sm font-black tracking-tighter italic leading-none text-white uppercase">{activeProject}</h1></div>
          </button>
        </div>
        <nav className="flex-1 p-5 space-y-3 mt-6">
          <button onClick={() => setActiveTab("traffic")} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${activeTab === 'traffic' ? 'bg-[#00f2ff] text-black shadow-xl shadow-cyan-500/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}><BarChart3 size={20} /> Tráfego Alpha</button>
          <button onClick={() => setActiveTab("agents")} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${activeTab === 'agents' ? 'bg-[#00f2ff] text-black shadow-xl shadow-cyan-500/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}><BrainCircuit size={20} /> Agentes IA</button>
          <div className="pt-10 px-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">Sistemas Externos</div>
          <button onClick={() => setActiveTab("fox")} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${activeTab === 'fox' ? 'bg-[#7000ff] text-white shadow-xl shadow-purple-500/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}><Network size={20} /> FoxConect Hub</button>
        </nav>
        <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center gap-4"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" /><span className="text-[10px] font-black text-gray-500 uppercase tracking-widest"> Jarvis Alpha: Online</span></div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white italic">{activeTab === 'traffic' ? 'CENTRAL DE MÉTRICAS SUPREMA' : 'DASHBOARD'}</h2>
              <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-1">SISTEMA ATIVO: {activeProject}</p>
            </div>
            <button onClick={fetchData} className="p-4 glass-card hover:border-cyan-500/50 transition-all group active:scale-90"><RefreshCw className={`${loading ? "animate-spin" : ""} text-cyan-400`} size={24} /></button>
          </div>

          {/* BARRA DE COMANDO (FILTROS) */}
          {activeTab === "traffic" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 glass-card bg-white/[0.02] border-white/5">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50 group-hover:text-cyan-400 transition-colors"><Users size={16} /></div>
                <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} className="w-full bg-transparent text-[11px] font-black uppercase tracking-widest text-white pl-12 pr-4 py-4 focus:outline-none appearance-none cursor-pointer">
                  {accounts.map((acc, i) => (<option key={i} value={acc.id} className="bg-[#050505]">{acc.name} ({acc.id})</option>))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"><ChevronDown size={14} /></div>
              </div>
              
              <div className="relative group border-x border-white/5">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50 group-hover:text-cyan-400 transition-colors"><Filter size={16} /></div>
                <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)} className="w-full bg-transparent text-[11px] font-black uppercase tracking-widest text-white pl-12 pr-4 py-4 focus:outline-none appearance-none cursor-pointer">
                  <option value="" className="bg-[#050505]">Todas as Campanhas</option>
                  {campaigns.map((camp, i) => (<option key={i} value={camp.id} className="bg-[#050505]">{camp.name}</option>))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"><ChevronDown size={14} /></div>
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50 group-hover:text-cyan-400 transition-colors"><Calendar size={16} /></div>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-transparent text-[11px] font-black uppercase tracking-widest text-white pl-12 pr-4 py-4 focus:outline-none appearance-none cursor-pointer">
                  <option value="today" className="bg-[#050505]">Hoje</option>
                  <option value="yesterday" className="bg-[#050505]">Ontem</option>
                  <option value="last_7d" className="bg-[#050505]">Últimos 7 Dias</option>
                  <option value="last_30d" className="bg-[#050505]">Últimos 30 Dias</option>
                  <option value="maximum" className="bg-[#050505]">Período Máximo</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"><ChevronDown size={14} /></div>
              </div>
            </div>
          )}
        </header>

        {activeTab === "traffic" ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* MÉTRICAS MASTER */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "Investimento", value: `R$ ${data?.metrics?.spend?.toFixed(2) || "0,00"}`, color: "text-white", icon: Wallet },
                { label: "Vendas", value: data?.metrics?.sales || "0", color: "text-[#00ff88]", icon: ShoppingCart },
                { label: "ROAS", value: `${data?.metrics?.roas?.toFixed(2) || "0.00"}x`, color: "text-[#7000ff]", icon: TrendingUp },
                { label: "CPA", value: `R$ ${data?.metrics?.cpa || "0,00"}`, color: "text-red-500", icon: Target },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-8 group relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><stat.icon size={100} /></div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-3">{stat.label}</p>
                  <h3 className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* FUNIL DETALHADO */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Checkouts", value: data?.metrics?.totalCheckouts || "0", color: "text-cyan-400" },
                { label: "Carrinhos", value: data?.metrics?.totalCarts || "0", color: "text-blue-400" },
                { label: "Cliques", value: data?.metrics?.clicks || "0", color: "text-yellow-400" },
                { label: "CTR", value: `${data?.metrics?.ctr?.toFixed(2) || "0.00"}%`, color: "text-white" },
                { label: "CPM", value: `R$ ${data?.metrics?.cpm?.toFixed(2) || "0,00"}`, color: "text-gray-500" },
              ].map((stat, i) => (
                <div key={i} className="glass-card !bg-white/[0.01] p-5 border-white/5">
                  <p className="text-[8px] uppercase font-black tracking-widest text-gray-600 mb-2">{stat.label}</p>
                  <h3 className={`text-lg font-black tracking-tighter ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* MONITOR DE CONJUNTOS */}
            <div className="glass-card !p-0 overflow-hidden border-white/10">
              <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3"><Activity className="text-cyan-400 animate-pulse" size={20} /><span className="text-xs font-black uppercase tracking-widest italic text-white">Análise de Conjuntos (AdSets)</span></div>
                <div className="text-[9px] font-black uppercase tracking-widest text-gray-600">Período: {selectedDate.replace('_', ' ')}</div>
              </div>
              <table className="w-full text-left text-[11px]">
                <thead className="bg-white/[0.04] text-gray-500 uppercase font-black tracking-widest italic">
                  <tr><th className="p-5">Estratégia</th><th className="p-5 text-center">Gasto</th><th className="p-5 text-center text-[#00ff88]">Vendas</th><th className="p-5 text-center text-[#7000ff]">ROAS</th><th className="p-5 text-center text-red-500">CPA</th><th className="p-5 text-right">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data?.adsets?.map((ad: any, i: number) => (
                    <tr key={i} className="hover:bg-cyan-500/[0.02] transition-colors group">
                      <td className="p-5 font-black text-gray-300 uppercase italic group-hover:text-cyan-400">{ad.name}</td>
                      <td className="p-5 text-center font-bold text-gray-500">R$ {ad.spend?.toFixed(2)}</td>
                      <td className="p-5 text-center text-[#00ff88] font-black text-base">{ad.sales}</td>
                      <td className="p-5 text-center font-black text-[#7000ff]">{ad.roas}x</td>
                      <td className="p-5 text-center text-red-500 font-black italic">R$ {ad.cpa}</td>
                      <td className="p-5 text-right"><span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${ad.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>{ad.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-card flex flex-col items-center justify-center p-32 text-center border-purple-500/20">
            <Network className="text-purple-500 animate-pulse mb-8" size={60} />
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">FOXCONECT HUB</h2>
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mt-4">Unidade de Distribuição de Leads em Standby</p>
          </div>
        )}
      </main>

      {/* Jarvis Panel */}
      <aside className="jarvis-panel">
        <div className="p-8 border-b border-white/5 bg-white/[0.03] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#00f2ff] rounded-2xl flex items-center justify-center glow-cyan shadow-xl shadow-cyan-500/20"><MessageSquare className="text-black" size={24} /></div>
          <div><h3 className="text-xs font-black uppercase tracking-[0.2em] italic text-white leading-none">Jarvis Supremo</h3><p className="text-[10px] text-[#00ff88] font-bold uppercase tracking-tighter mt-1 animate-pulse">Orquestrador Ativo</p></div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}><div className={`max-w-[90%] p-5 rounded-2xl text-[11px] leading-relaxed font-bold shadow-2xl ${msg.role === 'user' ? 'bg-[#00f2ff] text-black italic' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{msg.content}</div></div>))}
        </div>
        <form onSubmit={handleSendMessage} className="p-8 bg-black/50 border-t border-white/5 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Disparar ordem estratégica..." className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-[12px] text-white focus:outline-none focus:border-cyan-500/50 font-bold" /><button type="submit" className="bg-[#00f2ff] text-black p-4 rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-xl shadow-cyan-500/30"><Zap size={22} /></button>
        </form>
      </aside>
    </div>
  );
}
