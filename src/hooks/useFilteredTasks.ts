import { useMemo } from 'react';
import { Task } from '../types';
import { useFilterStore } from './useFilterStore';

export function useFilteredTasks(tasks: Task[]): Task[] {
  const { statuses, priorities, assignees, dueDateFrom, dueDateTo } = useFilterStore();

  return useMemo(() => {
    return tasks.filter((task) => {
      if (statuses.length > 0 && !statuses.includes(task.status)) {
        return false;
      }

      if (priorities.length > 0 && !priorities.includes(task.priority)) {
        return false;
      }

      if (assignees.length > 0 && !assignees.includes(task.assignee.id)) {
        return false;
      }

      if (dueDateFrom && task.dueDate < dueDateFrom) {
        return false;
      }

      if (dueDateTo && task.dueDate > dueDateTo) {
        return false;
      }

      return true;
    });
  }, [tasks, statuses, priorities, assignees, dueDateFrom, dueDateTo]);
}