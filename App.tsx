
import React, { useState, useCallback } from 'react';
import { View, Task, TaskPriority, TaskStatus } from './types';
import TaskList from './components/TaskList';
import Analytics from './components/Analytics';
import TaskForm from './components/TaskForm';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Fixing Server A - Main Hub',
    description: 'Hardware failure in secondary cluster.',
    priority: TaskPriority.ALTA,
    status: TaskStatus.IN_PROGRESS,
    sector: 'INFRASTRUCTURE',
    assignee: 'Ana Silva',
    dueDate: '2024-10-24',
    tags: ['Urgente', 'Infra']
  },
  {
    id: '2',
    title: 'Cabling Audit: Sector 4',
    description: 'Full inspection of Ethernet routing.',
    priority: TaskPriority.MEDIA,
    status: TaskStatus.TODO,
    sector: 'NETWORK',
    assignee: 'Bruno Costa',
    dueDate: '2024-10-25',
    tags: ['Manutenção']
  },
  {
    id: '3',
    title: 'Security Patch Deployment',
    description: 'Vulnerability remediation for v12.4',
    priority: TaskPriority.BAIXA,
    status: TaskStatus.DONE,
    sector: 'SOFTWARE',
    assignee: 'Carla Oliveira',
    dueDate: '2024-10-22',
    tags: ['Security', 'Patch']
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.TASKS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleAddTask = useCallback((newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
    setCurrentView(View.TASKS);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case View.TASKS:
        return <TaskList tasks={tasks} onAddTask={() => setCurrentView(View.NEW_TASK)} />;
      case View.ANALYTICS:
        return <Analytics tasks={tasks} />;
      case View.NEW_TASK:
        return (
          <TaskForm 
            onSave={handleAddTask} 
            onCancel={() => setCurrentView(View.TASKS)} 
          />
        );
      case View.SETTINGS:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-500">
            <span className="material-symbols-outlined text-6xl mb-4">settings</span>
            <h2 className="text-xl font-bold text-slate-800">Configurações</h2>
            <p>Opções do sistema em breve.</p>
          </div>
        );
      default:
        return <TaskList tasks={tasks} onAddTask={() => setCurrentView(View.NEW_TASK)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark max-w-2xl mx-auto shadow-2xl flex flex-col relative overflow-x-hidden">
      <main className="flex-1 pb-24">
        {renderContent()}
      </main>

      {/* Persistent Bottom Nav (Hidden in Form View to match screen 1) */}
      {currentView !== View.NEW_TASK && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe z-40">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => setCurrentView(View.TASKS)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${currentView === View.TASKS ? 'text-primary' : 'text-slate-400'}`}
            >
              <span className={`material-symbols-outlined ${currentView === View.TASKS ? 'fill' : ''}`}>task_alt</span>
              <span className="text-[10px] font-bold tracking-wide uppercase">Tasks</span>
            </button>
            <button 
              onClick={() => setCurrentView(View.ANALYTICS)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${currentView === View.ANALYTICS ? 'text-primary' : 'text-slate-400'}`}
            >
              <span className={`material-symbols-outlined ${currentView === View.ANALYTICS ? 'fill' : ''}`}>analytics</span>
              <span className="text-[10px] font-bold tracking-wide uppercase">Analytics</span>
            </button>
            <button 
              onClick={() => setCurrentView(View.SETTINGS)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${currentView === View.SETTINGS ? 'text-primary' : 'text-slate-400'}`}
            >
              <span className={`material-symbols-outlined ${currentView === View.SETTINGS ? 'fill' : ''}`}>settings</span>
              <span className="text-[10px] font-bold tracking-wide uppercase">Settings</span>
            </button>
          </div>
        </nav>
      )}

      {/* Floating Action Button (Only on Task List) */}
      {currentView === View.TASKS && (
        <button 
          onClick={() => setCurrentView(View.NEW_TASK)}
          className="fixed bottom-20 right-4 sm:right-[calc(50%-12rem)] size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-30 ring-4 ring-white dark:ring-slate-900"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}
    </div>
  );
};

export default App;
