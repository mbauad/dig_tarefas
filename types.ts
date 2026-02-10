
export enum TaskPriority {
  ALTA = 'Alta',
  MEDIA = 'Média',
  BAIXA = 'Baixa'
}

export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  sector: string;
  assignee: string;
  dueDate: string;
  tags: string[];
}

export enum View {
  TASKS = 'tasks',
  ANALYTICS = 'analytics',
  NEW_TASK = 'new_task',
  SETTINGS = 'settings'
}
