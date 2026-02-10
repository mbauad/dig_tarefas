
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Task, TaskStatus } from '../types';

interface AnalyticsProps {
  tasks: Task[];
}

const data = [
  { name: 'Seg', val: 10 },
  { name: 'Ter', val: 15 },
  { name: 'Qua', val: 12 },
  { name: 'Qui', val: 22 },
  { name: 'Sex', val: 18 },
  { name: 'Sab', val: 28 },
  { name: 'Dom', val: 20 },
];

const Analytics: React.FC<AnalyticsProps> = ({ tasks }) => {
  const activeCount = tasks.filter(t => t.status !== TaskStatus.DONE).length;
  const doneToday = 12; // Mocked
  const delayed = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== TaskStatus.DONE).length;

  return (
    <div className="flex flex-col p-4 space-y-4">
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Indicadores de Desempenho</h1>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined fill">account_circle</span>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-900 flex flex-col gap-1 rounded-xl p-4 border border-primary/5 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">Ativas</p>
          <p className="text-[#0d141b] dark:text-white text-2xl font-bold">{activeCount}</p>
          <div className="h-1 w-8 bg-primary rounded-full mt-1"></div>
        </div>
        <div className="bg-white dark:bg-slate-900 flex flex-col gap-1 rounded-xl p-4 border border-primary/5 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">Hoje</p>
          <p className="text-[#0d141b] dark:text-white text-2xl font-bold">{doneToday}</p>
          <div className="h-1 w-8 bg-emerald-500 rounded-full mt-1"></div>
        </div>
        <div className="bg-white dark:bg-slate-900 flex flex-col gap-1 rounded-xl p-4 border border-primary/5 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">Atrasadas</p>
          <p className="text-rose-500 text-2xl font-bold">{String(delayed).padStart(2, '0')}</p>
          <div className="h-1 w-8 bg-rose-500 rounded-full mt-1"></div>
        </div>
      </section>

      {/* Daily Progress */}
      <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-primary/5 shadow-sm flex flex-col items-center gap-4">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-[#0d141b] dark:text-white font-bold text-base">Progresso Diário</h2>
          <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded">75%</span>
        </div>
        
        {/* Simple SVG Radial Progress */}
        <div className="relative flex items-center justify-center">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle className="text-slate-100 dark:text-slate-800" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
            <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="91.1" strokeWidth="8" strokeLinecap="round"></circle>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-[#0d141b] dark:text-white">12/16</span>
            <span className="text-[10px] text-slate-500 uppercase font-medium">Tarefas</span>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
          Faltam apenas <span className="font-semibold text-primary">4 tarefas</span> para bater a meta diária do setor GIC.
        </p>
      </section>

      {/* Weekly Chart */}
      <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-primary/5 shadow-sm">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-[#0d141b] dark:text-white font-bold text-base">Desempenho Semanal</h2>
            <p className="text-slate-500 text-sm">Últimos 7 dias</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            +12%
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1173d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1173d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  backgroundColor: 'white'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#1173d4" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVal)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-4">
          {data.map(d => (
            <span key={d.name} className="text-[10px] font-bold text-slate-400 uppercase">{d.name}</span>
          ))}
        </div>
      </section>

      {/* Insight section */}
      <section className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/10 flex gap-3 items-center">
        <div className="bg-primary text-white p-2 rounded-lg">
          <span className="material-symbols-outlined">lightbulb</span>
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary">Insight do Dia</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">O horário de maior produtividade hoje foi entre as 10h e 11h.</p>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
