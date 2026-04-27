"use client";

import { useState, useEffect } from "react";
import { 
  Activity, Cpu, Shield, Zap, Terminal, 
  Layers, Database, Network, Search, AlertCircle,
  CheckCircle2, Clock, Play, Server, User,
  ChevronRight, Brain, Boxes, Radio, Globe, 
  Settings, Lock, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AgentExecution {
  id: string;
  name: string;
  status: "idle" | "working" | "completed" | "error";
  task: string;
  progress: number;
  lastAction: string;
  startTime: number;
  type: string;
  icon: any;
}

export default function CommandDashboard() {
  const [activeAgents, setActiveAgents] = useState<AgentExecution[]>([
    {
      id: "PULLSAR",
      name: "Pullsar Draco",
      status: "working",
      task: "Escaneamento de Funil Concorrente",
      progress: 42,
      lastAction: "Capturando scripts de VSL em dominio.com",
      startTime: Date.now() - 45000,
      type: "Espionagem",
      icon: Search
    },
    {
      id: "FB-ADS",
      name: "Meta Ads Spec",
      status: "working",
      task: "Otimização de Lances em Tempo Real",
      progress: 15,
      lastAction: "Ajustando CPA no Conjunto [C-04]",
      startTime: Date.now() - 120000,
      type: "Tráfego & Escala",
      icon: Radio
    },
    {
      id: "BRUNSON",
      name: "Russell Brunson Clone",
      status: "completed",
      task: "Modelagem de Escada de Valor",
      progress: 100,
      lastAction: "Estrutura exportada para o Depto Copy",
      startTime: Date.now() - 300000,
      type: "Mente Clonada",
      icon: Brain
    }
  ]);

  const [logs, setLogs] = useState<string[]>([
    "[10:42:01] JARVIS: Orquestrador iniciado.",
    "[10:42:05] SYSTEM: Conexão com VPS estabelecida (Ngrok ON).",
    "[10:43:10] PULLSAR: Iniciando varredura profunda em https://vsl-master.com",
    "[10:44:15] PULLSAR: 12 scripts de copy detectados. Processando via GPT-4o."
  ]);

  // Simulação de atividade
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgents(prev => prev.map(a => {
        if (a.status === "working") {
          const nextProgress = a.progress + Math.random() * 8;
          return {
            ...a,
            progress: nextProgress >= 100 ? 100 : nextProgress,
            status: nextProgress >= 100 ? "completed" : "working",
            lastAction: nextProgress >= 100 ? "Operação finalizada com sucesso." : a.lastAction
          };
        }
        return a;
      }));
      
      // Adiciona log aleatório
      const newLogs = [
        `[${new Date().toLocaleTimeString()}] SYSTEM: Sincronização de dados Alpha ok.`,
        `[${new Date().toLocaleTimeString()}] JARVIS: Monitorando CPA da conta 01...`,
        `[${new Date().toLocaleTimeString()}] PULLSAR: Extraindo metadados de criativos...`
      ];
      setLogs(prev => [...prev.slice(-15), newLogs[Math.floor(Math.random() * newLogs.length)]]);
      
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-['Outfit'] relative overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 p-4 md:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* HEADER TÁTICO */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-[3px] hover:text-white transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Hub
            </Link>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              SQUAD <span className="text-cyan-400">COMMAND</span> <span className="text-white/20">CENTER</span>
            </h1>
            <div className="flex items-center gap-4">
               <span className="px-3 py-1 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-md">V32.7 ACTIVE</span>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Engenharia de Execução Neural Alpha</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="glass-card flex items-center gap-5 px-8 py-5 border-cyan-500/20 shadow-[0_0_40px_rgba(0,242,255,0.05)]">
              <div className="relative">
                <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping absolute opacity-20" />
                <div className="w-4 h-4 bg-cyan-500 rounded-full relative z-10 shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] mb-1">Status Sistema</p>
                <p className="text-sm font-black uppercase text-white">JARVIS CORE ONLINE</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-5 px-8 py-5 border-purple-500/20 bg-purple-500/[0.02]">
              <Server className="text-purple-500" size={24} />
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] mb-1">VPS Bridge</p>
                <p className="text-sm font-black uppercase text-white">NGROK: ACTIVE</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUNA ESQUERDA: FROTA EM OPERAÇÃO */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-4 text-xl font-black uppercase tracking-[5px] text-white">
                <div className="w-2 h-8 bg-cyan-500 rounded-full" />
                Agentes em Missão
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black uppercase text-gray-400">2 Working</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <span className="w-2 h-2 bg-[#00ff88] rounded-full" />
                  <span className="text-[9px] font-black uppercase text-gray-400">1 Idle</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {activeAgents.map((agent) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={agent.id} 
                    className={`glass-card p-8 border-l-[6px] transition-all duration-500 relative overflow-hidden group ${
                      agent.status === 'working' ? 'border-cyan-500 bg-cyan-500/[0.03]' : 
                      agent.status === 'completed' ? 'border-[#00ff88] bg-[#00ff88]/[0.03]' : 
                      'border-white/10'
                    }`}
                  >
                    {/* PROGRESS BACKGROUND */}
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-cyan-500/20 transition-all duration-1000"
                      style={{ width: `${agent.progress}%` }}
                    />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-center gap-8">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border-2 transition-all duration-500 ${
                          agent.status === 'working' ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,242,255,0.2)]' : 'border-white/10 bg-white/5'
                        }`}>
                          <agent.icon size={32} className={agent.status === 'working' ? 'text-cyan-400 animate-pulse' : 'text-gray-600'} />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl font-black italic tracking-tight uppercase">{agent.name}</h3>
                            <div className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[2px] border ${
                              agent.status === 'working' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' :
                              agent.status === 'completed' ? 'bg-[#00ff88]/20 border-[#00ff88]/40 text-[#00ff88]' :
                              'bg-white/5 border-white/10 text-gray-500'
                            }`}>
                              {agent.status}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{agent.type}</span>
                            <span className="w-1 h-1 bg-gray-800 rounded-full" />
                            <span className="text-[10px] font-black text-cyan-500/60 uppercase tracking-widest">ID: {agent.id}_SUPREMO</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 max-w-xl space-y-4">
                        <div className="flex justify-between items-end">
                          <p className="text-sm font-bold text-gray-300 uppercase tracking-wide truncate max-w-[350px]">
                            {agent.task}
                          </p>
                          <p className={`text-xl font-black italic ${agent.status === 'completed' ? 'text-[#00ff88]' : 'text-cyan-400'}`}>
                            {Math.floor(agent.progress)}%
                          </p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                          <motion.div 
                            className={`h-full rounded-full ${
                              agent.status === 'completed' ? 'bg-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.5)]' : 'bg-cyan-500 shadow-[0_0_15px_rgba(0,242,255,0.5)]'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${agent.progress}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse" />
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest truncate">
                            LOG_ACT: {agent.lastAction}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all active:scale-95 group">
                          <Terminal size={18} className="text-gray-400 group-hover:text-white" />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all active:scale-95 text-red-500/50 hover:text-red-500">
                          <Zap size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUNA DIREITA: CONSOLE E MÉTRICAS NEURAIS */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* CONSOLE DE LOGS */}
            <div className="glass-card flex flex-col h-[500px] border-white/10 bg-[#080808] overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <div className="p-5 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
                    <div className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
                    <div className="w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 ml-4">Terminal.Alpha_v4.sh</span>
                </div>
                <div className="text-[8px] font-black text-cyan-500/40 uppercase tracking-widest animate-pulse">SQUAD_SYNC_LIVE</div>
              </div>
              <div className="flex-1 p-8 font-mono text-[11px] space-y-4 overflow-y-auto scrollbar-hide">
                {logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className="flex gap-5 group"
                  >
                    <span className="text-gray-800 shrink-0 select-none group-hover:text-cyan-500/50 transition-colors">{String(i+1).padStart(2, '0')}</span>
                    <p className="leading-relaxed text-cyan-400/70 group-hover:text-cyan-400 transition-colors">{log}</p>
                  </motion.div>
                ))}
                <div className="flex gap-5 animate-pulse">
                  <span className="text-gray-800 shrink-0">{logs.length + 1}</span>
                  <p className="text-white">_</p>
                </div>
              </div>
            </div>

            {/* STATUS CARDS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-4 text-center">
                 <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Agentes Ativos</p>
                 <p className="text-4xl font-black italic text-white">56<span className="text-xs text-gray-700 ml-1">/56</span></p>
              </div>
              <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-4 text-center">
                 <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Threads VPS</p>
                 <p className="text-4xl font-black italic text-[#7000ff]">12<span className="text-xs text-gray-700 ml-1">AC</span></p>
              </div>
            </div>

            {/* MÉTODOS DE INTELIGÊNCIA */}
            <div className="glass-card p-10 border-white/10 space-y-8 bg-gradient-to-b from-white/[0.02] to-transparent">
              <h3 className="text-xs font-black uppercase tracking-[8px] text-white/40 border-b border-white/5 pb-6 flex items-center justify-between">
                Recursos <ChevronRight size={14} />
              </h3>
              <div className="space-y-8">
                {[
                  { label: "Ocupação de Frota", val: 78, color: "bg-cyan-500", glow: "shadow-[0_0_20px_rgba(0,242,255,0.3)]" },
                  { label: "Capacidade Processamento", val: 92, color: "bg-[#7000ff]", glow: "shadow-[0_0_20px_rgba(112,0,255,0.3)]" },
                  { label: "Sincronia Meta API", val: 100, color: "bg-[#00ff88]", glow: "shadow-[0_0_20px_rgba(0,255,136,0.3)]" }
                ].map((m, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-[3px] text-gray-400">{m.label}</span>
                      <span className="text-sm font-black italic text-white">{m.val}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                      <motion.div 
                        className={`h-full rounded-full ${m.color} ${m.glow}`} 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.val}%` }}
                        transition={{ duration: 2, delay: i * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
