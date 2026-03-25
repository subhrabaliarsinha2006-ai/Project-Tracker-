import type { FC, DragEvent } from 'react';
import type { Task, TaskStatus } from '../types/index';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  dragOverColumn: TaskStatus | null;
  onDragOver: (column: TaskStatus, e: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (column: TaskStatus, e: DragEvent) => void;
  draggedTask: Task | null;
  onDragStart: (task: Task) => void;
}

const KanbanColumn: FC<KanbanColumnProps> = ({
  status,
  tasks,
  dragOverColumn,
  onDragOver,
  onDragLeave,
  onDrop,
  draggedTask,
  onDragStart,
}) => {
  const handleDragStart = (task: Task, e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
    onDragStart(task);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    onDrop(status, e);
  };

  return (
    <div
      onDragOver={(e) => onDragOver(status, e)}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
      className={`flex-1 min-w-80 rounded-lg ${
        dragOverColumn === status ? 'bg-blue-50 border-2 border-blue-300' : 'bg-gray-100'
      } p-4 transition-colors`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">{status}</h2>
        <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No tasks in {status}</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(task, e)}
              className={`bg-white p-3 rounded-lg border-l-4 border-blue-500 cursor-move ${
                draggedTask?.id === task.id ? 'opacity-50 shadow-lg' : 'shadow hover:shadow-md'
              } transition-all`}
            >
              <h3 className="font-semibold text-sm mb-2 text-gray-900">{task.title}</h3>
              <p className="text-xs text-gray-600">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;