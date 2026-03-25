import type { FC } from 'react';
import type { Task } from '../types/indexes';

interface KanbanCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}

const KanbanCard: FC<KanbanCardProps> = ({ task, onDragStart, isDragging }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`bg-white p-3 rounded-lg border-l-4 border-blue-500 cursor-move ${
        isDragging ? 'opacity-50 shadow-lg' : 'shadow hover:shadow-md'
      } transition-all`}
    >
      <h3 className="font-semibold text-sm mb-2 text-gray-900">{task.title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {task.priority}
        </span>
        <p className="text-xs text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default KanbanCard;