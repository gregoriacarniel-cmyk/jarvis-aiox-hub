"use client";

import { useState, useEffect } from "react";
import { 
  Zap, MessageSquare, TrendingUp, Target, ShoppingCart, 
  RefreshCw, Cpu, BrainCircuit, Activity, Wallet, Calendar, Search, ArrowRight, CheckCircle2, ShieldCheck, Layers
} from "lucide-react";
import { AGENT_REGISTRY, GROUP_CONFIG } from "@/app/lib/agentRegistry";

export default function NexusDashboardV12() {
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden font-['Outfit']">
        <div className="max-w-4xl w-full space-y-12 relative z-10 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter italic text-white">NEXUS <span className="text-cyan-400">PLATINUM</span> V12</h1>
            <p className="text-[10px] uppercase font-black tracking-[0.6em] text-gray-600">Sistema de Comando Supremo | Gregori Alpha</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ id: "Projeto Principal", desc: "Gestão Master de Tráfego" }, { id: "FoxConect Expansão", desc: "Operações B" }].map((p, i) => (
              <button key={i} onClick={() => setActiveProject(p.id)} className="glass-card p-10 border-white/5 hover:border-cyan-500/40 transition-all text-left">
                <h3 className="text-2xl font-black tracking-tight text-white mb-3 uppercase italic">{p.id}</h3>
                <p className="text-sm text-gray-500 font-bold leading-relaxed">{p.desc}</p>
                <div className="mt-8 flex items-center gap-3 text-[11px] font-black uppercase text-cyan-400">Iniciar Operação <ArrowRight size={16} /></div>
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
          <button onClick={() => { setActiveTab("traffic"); setSelectedAgentId(null); }} className="flex items-center gap-3 w-full group">
            <div className="w-10 h-10 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20"><Zap size={20} className="text-black" /></div>
            <div className="text-left"><h2 className="text-[11px] font-black uppercase tracking-widest text-white italic">Métricas Master</h2></div>
          </button>
          <div className="flex flex-col gap-2">
            {Object.keys(GROUP_CONFIG).map((group) => (
              <button 
                key={group}
                onClick={() => { setActiveTab(group); setSelectedAgentId(null); }}
                className={`w-full text-left p-4 rounded-2xl text-[10px] font-black tracking-widest transition-all border ${activeTab === group ? "bg-white/10 text-white border-white/20" : "text-gray-600 border-transparent hover:bg-white/5"}`}
                style={{ color: activeTab === group ? (GROUP_CONFIG as any)[group].color : "" }}
              >
                {(GROUP_CONFIG as any)[group].icon} {group.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          <div className="space-y-3">
            <h3 className="px-4 text-[9px] font-black uppercase tracking-[3px] text-cyan-500">COMANDO MASTER</h3>
            {["mente-maestro", "gestor-trafego"].map((id) => {
              const agent = (AGENT_REGISTRY as any)[id];
              return (
                <button key={id} onClick={() => { setSelectedAgentId(id); setActiveTab(agent.group); }} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${selectedAgentId === id ? 'bg-white/[0.05] border-white/10' : 'hover:bg-white/[0.02] border-transparent'}`}>
                  <span className="text-2xl">{agent.icon}</span>
                  <div className="text-left"><p className={`text-[12px] font-black tracking-tight ${selectedAgentId === id ? 'text-white' : 'text-gray-500'}`}>{agent.name}</p></div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ── CONSOLE CENTRAL ── */}
      <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col bg-[#070707]">
        <header className="h-20 border-b border-white/5 flex items-center px-10 justify-between bg-black/40 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{(GROUP_CONFIG as any)[activeTab]?.icon || "📊"}</span>
            <h2 className="text-sm font-black uppercase tracking-[3px] text-white italic">{activeTab}</h2>
          </div>
          {selectedAgent && <button onClick={() => setSelectedAgentId(null)} className="px-6 py-2 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-[3px] text-gray-500 hover:text-white border border-white/5 transition-all">Voltar ao Hub</button>}
        </header>

        <div className="p-10 space-y-8 animate-in fade-in duration-500">
          {activeTab === "traffic" && (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-4 p-2 glass-card border-white/5 bg-white/[0.02]">
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
              <div className="grid grid-cols-4 gap-5">
                {[
                  { label: "Investimento", value: `R$ ${data?.metrics?.spend?.toFixed(2) || "0,00"}`, color: "text-white" },
                  { label: "Vendas", value: data?.metrics?.sales || "0", color: "text-[#00ff88]" },
                  { label: "ROAS", value: `${data?.metrics?.roas?.toFixed(2) || "0.00"}x`, color: "text-[#7000ff]" },
                  { label: "CPA", value: `R$ ${data?.metrics?.cpa || "0,00"}`, color: "text-red-500" },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-8"><p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">{stat.label}</p><h3 className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</h3></div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== "traffic" && !selectedAgent && (
            <div className="grid grid-cols-3 gap-6">
              {Object.values(AGENT_REGISTRY).filter(a => a.group === activeTab).map((agent) => (
                <button key={agent.id} onClick={() => setSelectedAgentId(agent.id)} className="glass-card p-8 text-left hover:border-cyan-500/40 transition-all group">
                  <span className="text-4xl mb-4 block">{agent.icon}</span>
                  <h3 className="text-lg font-black text-white uppercase italic mb-2">{agent.name}</h3>
                  <div className="mt-4 text-[9px] font-black uppercase text-cyan-400">Ver Dashboard →</div>
                </button>
              ))}
            </div>
          )}

          {selectedAgent && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <div className="grid grid-cols-3 gap-8">
                <div className="glass-card p-8 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-[35px] flex items-center justify-center text-5xl border border-white/10 mb-6">{selectedAgent.icon}</div>
                  <h2 className="text-2xl font-black text-white italic uppercase">{selectedAgent.name}</h2>
                  <p className="text-[10px] text-gray-500 font-bold mt-4 italic">"{selectedAgent.description}"</p>
                </div>
                <div className="col-span-2 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-6"><p className="text-[8px] font-black text-gray-600 mb-2">PRECISÃO</p><h4 className="text-xl font-black text-[#00ff88]">CIRÚRGICA</h4></div>
                    <div className="glass-card p-6"><p className="text-[8px] font-black text-gray-600 mb-2">STATUS</p><h4 className="text-xl font-black text-cyan-400">ATIVO</h4></div>
                    <div className="glass-card p-6"><p className="text-[8px] font-black text-gray-600 mb-2">FASE</p><h4 className="text-xl font-black text-white">ESTRATÉGIA</h4></div>
                  </div>
                  <div className="glass-card p-8">
                    <h3 className="text-[10px] font-black text-gray-500 mb-6 tracking-[3px]">FASES DE EXECUÇÃO</h3>
                    <div className="space-y-4">
                      {selectedAgent.phases.map((p: string, i: number) => (
                        <div key={i} className="flex items-center gap-4"><div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-cyan-400">0{i+1}</div><p className="text-[11px] font-black text-white uppercase">{p}</p></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── CHAT ── */}
      <aside className="border-l border-white/5 bg-black/40 flex flex-col overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20"><MessageSquare className="text-black" size={24} /></div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] italic text-white">Jarvis Supremo</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[90%] p-5 rounded-2xl text-[11px] font-bold shadow-2xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-cyan-500 text-black italic' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{msg.content}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-8 bg-black/50 border-t border-white/5 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Comando..." className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-[11px] text-white focus:outline-none focus:border-cyan-500/50" /><button type="submit" className="bg-cyan-500 text-black p-4 rounded-2xl hover:scale-110 active:scale-90 transition-all"><Zap size={22} /></button>
        </form>
      </aside>

    </div>
  );
}
