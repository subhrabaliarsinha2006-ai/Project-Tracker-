import { create } from 'zustand';
import { Task, TaskStatus } from '../types';
import { generateSeedData } from '../utils/seedData';

interface TaskStore {
  tasks: Task[];
  initializeTasks: () => void;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  getTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  initializeTasks: () => {
    const seedData = generateSeedData(500);
    set({ tasks: seedData });
  },
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } : task
      ),
    }));
  },
  getTasks: () => get().tasks,
}));