export type TaskStatus = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  startDate: string | null;
  dueDate: string;
  createdAt: string;
}

export interface CollaborationUser {
  id: string;
  name: string;
  initials: string;
  color: string;
  viewingTaskId: string | null;
}

export interface FilterState {
  statuses: TaskStatus[];
  priorities: TaskPriority[];
  assignees: string[];
  dueDateFrom: string | null;
  dueDateTo: string | null;
}