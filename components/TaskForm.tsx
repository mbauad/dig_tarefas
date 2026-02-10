
import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskFormProps {
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const SECTORS = ['Tecnologia da Informação', 'Administrativo', 'Financeiro', 'Operacional', 'Comunicação'];
const ASSIGNEES = [
  { name: 'Ana', seed: 'Ana' },
  { name: 'Bruno', seed: 'Bruno' },
  { name: 'Carla', seed: 'Carla' },
  { name: 'Diego', seed: 'Diego' },
  { name: 'Elena', seed: 'Elena' }
];

const TaskForm: React.FC<TaskFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIA);
  const [sector, setSector] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>(['Urgente', 'Marketing']);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title) newErrors.title = 'Este campo é obrigatório';
    if (!sector) newErrors.sector = 'Selecione um setor';
    if (!assignee) newErrors.assignee = 'Selecione um responsável';
    if (!dueDate) newErrors.dueDate = 'Data é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        priority,
        status: TaskStatus.TODO,
        sector: sector.toUpperCase(),
        assignee,
        dueDate,
        tags
      });
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-slate-900">
      <header className="flex items-center bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <button onClick={onCancel} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="ml-4 flex-1">
          <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Nova Tarefa</h1>
          <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Sistema GIC - Belém Digital</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <div className="flex-1 p-4 space-y-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Título da Tarefa <span className="text-red-500">*</span></label>
          <div className="relative">
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`flex w-full rounded-lg text-slate-900 dark:text-white border ${errors.title ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 h-12 px-4 text-base font-normal focus:ring-2 focus:ring-primary/20 transition-all outline-none`} 
              placeholder="Ex: Relatório mensal de atividades" 
              type="text"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Descrição Detalhada</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex w-full min-h-32 rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-base font-normal resize-none focus:ring-2 focus:ring-primary/20 outline-none" 
            placeholder="Descreva os detalhes da tarefa, objetivos e observações importantes..."
          ></textarea>
        </div>

        {/* Attachments Mock */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Anexos</label>
          <div className="relative">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary mb-2 transition-colors">cloud_upload</span>
                <p className="mb-1 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Escolher arquivo</span> ou arraste aqui
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">PDF, PNG, JPG ou DOC (máx. 10MB)</p>
              </div>
              <input className="hidden" multiple type="file" />
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Tags</label>
          <input 
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            className="flex w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 text-base font-normal focus:ring-2 focus:ring-primary/20 outline-none" 
            placeholder="Digite uma tag e pressione Enter" 
            type="text"
          />
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                {tag}
                <button onClick={() => removeTag(idx)} className="hover:text-primary/70">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Responsável Select */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Responsável <span className="text-red-500">*</span></label>
          <div className="relative">
            <select 
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className={`appearance-none flex w-full rounded-lg text-slate-900 dark:text-white border ${errors.assignee ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 h-12 px-4 text-base font-normal focus:ring-2 focus:ring-primary/20 outline-none`}
            >
              <option value="" disabled>Selecione o responsável</option>
              {ASSIGNEES.map(a => <option key={a.name} value={a.name}>{a.name} Silva</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          {errors.assignee && <p className="text-red-500 text-xs">{errors.assignee}</p>}
        </div>

        {/* Suggested Assignees */}
        <div className="flex flex-col gap-3">
          <p className="text-slate-800 dark:text-slate-200 text-[10px] font-bold uppercase tracking-wider">Responsáveis Sugeridos</p>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {ASSIGNEES.map(a => (
              <button 
                key={a.name} 
                onClick={() => setAssignee(a.name)}
                className="flex flex-col items-center gap-2 group min-w-[70px] active:scale-95 transition-transform"
              >
                <div className={`size-12 rounded-full border-2 ${assignee === a.name ? 'border-primary bg-primary/10' : 'border-transparent bg-slate-100 dark:bg-slate-800'} flex items-center justify-center overflow-hidden transition-all group-hover:border-primary`}>
                  <img alt={a.name} className="size-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.seed}`} />
                </div>
                <span className={`text-xs font-medium ${assignee === a.name ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sector and Date Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Setor Responsável <span className="text-red-500">*</span></label>
            <div className="relative">
              <select 
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className={`appearance-none flex w-full rounded-lg text-slate-900 dark:text-white border ${errors.sector ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 h-12 px-4 text-base font-normal focus:ring-2 focus:ring-primary/20 outline-none`}
              >
                <option value="" disabled>Selecione o setor</option>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
            {errors.sector && <p className="text-red-500 text-xs">{errors.sector}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Data de Vencimento <span className="text-red-500">*</span></label>
            <input 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`flex w-full rounded-lg text-slate-900 dark:text-white border ${errors.dueDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-slate-800 h-12 px-4 text-base font-normal focus:ring-2 focus:ring-primary/20 outline-none`} 
              type="date" 
            />
            {errors.dueDate && <p className="text-red-500 text-xs">{errors.dueDate}</p>}
          </div>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-3">
          <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal">Prioridade</p>
          <div className="flex items-center gap-3">
            {[TaskPriority.ALTA, TaskPriority.MEDIA, TaskPriority.BAIXA].map(p => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-lg border transition-all ${
                  priority === p 
                    ? 'border-2 border-primary bg-primary/10 text-primary font-bold' 
                    : 'border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100'
                }`}
              >
                <span className={`size-2 rounded-full ${
                  p === TaskPriority.ALTA ? 'bg-red-500' :
                  p === TaskPriority.MEDIA ? 'bg-primary' :
                  'bg-green-500'
                }`}></span>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
          <span className="material-symbols-outlined text-primary">info</span>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p className="font-medium text-slate-800 dark:text-slate-200">Dica de Produtividade</p>
            <p>Tarefas com prioridade <strong>Alta</strong> serão destacadas no dashboard da equipe responsável.</p>
          </div>
        </div>
      </div>

      <footer className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 mt-8">
        <button 
          onClick={onCancel}
          className="flex-1 order-2 sm:order-1 h-12 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSubmit}
          className="flex-[2] order-1 sm:order-2 h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          Salvar Tarefa
        </button>
      </footer>
    </div>
  );
};

export default TaskForm;
