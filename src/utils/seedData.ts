import type { Task, TaskStatus, TaskPriority } from '../types/indexes';
import { TASK_STATUSES, TASK_PRIORITIES, TEAM_MEMBERS } from './constants';

export function generateTaskData(count: number): Task[] {
  const tasks: Task[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 60) - 20);

    const startDate = Math.random() > 0.3 ? new Date(today) : null;
    if (startDate) {
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10));
    }

    const status = TASK_STATUSES[Math.floor(Math.random() * TASK_STATUSES.length)] as TaskStatus;
    const priority = TASK_PRIORITIES[Math.floor(Math.random() * TASK_PRIORITIES.length)] as TaskPriority;
    const assignee = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)];

    tasks.push({
      id: `task-${i + 1}`,
      title: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      status,
      priority,
      assignee,
      startDate: startDate ? startDate.toISOString().split('T')[0] : null,
      dueDate: dueDate.toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    });
  }

  return tasks;
}