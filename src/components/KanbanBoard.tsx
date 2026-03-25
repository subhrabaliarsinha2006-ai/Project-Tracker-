import type { FC } from 'react';
import type { Task, TaskStatus } from '../types/indexes';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDragStart: (task: Task) => void;
}

const STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'In Review', 'Done'];

const KanbanBoard: FC<KanbanBoardProps> = ({ tasks, onTaskUpdate, onTaskDragStart }) => {
  return (
    <div className="flex gap-4 h-full overflow-x-auto p-4 bg-gray-50">
      {STATUSES.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          onTaskUpdate={onTaskUpdate}
          onTaskDragStart={onTaskDragStart}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;