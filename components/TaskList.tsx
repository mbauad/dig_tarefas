
import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAddTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filters = ['All', 'To Do', 'In Progress', 'Done'];

  const filteredTasks = tasks.filter(task => 
    activeFilter === 'All' || task.status === activeFilter
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white leading-tight">GIC - Belém Digital</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="size-9 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-700 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
        </div>
      </header>

      <div className="px-4 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[65px] z-10">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 transition-all" 
            placeholder="Search tasks, IDs, or sectors..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar pb-1">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === filter 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {filter === 'All' ? 'All Tasks' : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 flex flex-col gap-4">
        {filteredTasks.map(task => (
          <div key={task.id} className={`bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-opacity ${task.status === TaskStatus.DONE ? 'opacity-75' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.sector}</span>
                <h3 className={`text-base font-semibold ${task.status === TaskStatus.DONE ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                  {task.title}
                </h3>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex items-center flex-wrap gap-2 mt-3">
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                task.priority === TaskPriority.ALTA ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                task.priority === TaskPriority.MEDIA ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {task.priority.toUpperCase()} PRIORITY
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                task.status === TaskStatus.DONE 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-primary/10 text-primary dark:bg-primary/20'
              }`}>
                {task.status === TaskStatus.DONE && <span className="material-symbols-outlined text-xs">check_circle</span>}
                {task.status.toUpperCase()}
              </span>
              <div className="flex-1"></div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span> {task.dueDate}
              </span>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <span className="material-symbols-outlined text-4xl block mb-2">inbox</span>
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
