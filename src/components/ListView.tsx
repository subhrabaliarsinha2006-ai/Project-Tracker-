import type { FC } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../types/indexes';
import ListViewList from './ListViewList';

interface ListViewProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  filters?: {
    statuses: TaskStatus[];
    priorities: TaskPriority[];
    assignees: string[];
  };
}

const ListView: FC<ListViewProps> = ({ tasks, onTaskUpdate, filters }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filters?.statuses.length && !filters.statuses.includes(task.status)) return false;
    if (filters?.priorities.length && !filters.priorities.includes(task.priority)) return false;
    if (filters?.assignees.length && !filters.assignees.includes(task.assignee)) return false;
    return true;
  });

  return (
    <div className="p-4 bg-white">
      <ListViewList tasks={filteredTasks} onTaskUpdate={onTaskUpdate} />
    </div>
  );
};

export default ListView;