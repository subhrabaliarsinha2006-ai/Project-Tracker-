import type { FC } from 'react';
import { useMemo } from 'react';
import type { Task, TaskPriority } from '../types/indexes';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface TimelineViewProps {
  tasks: Task[];
}

const TimelineView: FC<TimelineViewProps> = ({ tasks }) => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const priorityColors = {
    Critical: 'bg-red-500',
    High: 'bg-orange-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  const getTaskPosition = (task: Task) => {
    const startDate = task.startDate ? new Date(task.startDate) : new Date(task.dueDate);
    const dueDate = new Date(task.dueDate);
    
    const startDayIndex = Math.max(0, Math.floor((startDate.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)));
    const endDayIndex = Math.min(daysInMonth.length - 1, Math.floor((dueDate.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)));

    return { startDayIndex, endDayIndex };
  };

  return (
    <div className="p-4 bg-white overflow-x-auto">
      <div className="flex gap-2 mb-4">
        {daysInMonth.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1 w-12 flex-shrink-0">
            <div className="text-xs font-semibold">{format(day, 'd')}</div>
            {day.toDateString() === now.toDateString() && (
              <div className="w-0.5 h-16 bg-red-500"></div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          const { startDayIndex, endDayIndex } = getTaskPosition(task);
          const width = ((endDayIndex - startDayIndex + 1) * 48);

          return (
            <div key={task.id} className="flex items-center gap-4">
              <div className="w-32 text-sm font-semibold truncate">{task.title}</div>
              <div
                className={`h-8 rounded ${priorityColors[task.priority]} opacity-75 flex items-center px-2 text-white text-xs`}
                style={{
                  marginLeft: `${startDayIndex * 48}px`,
                  width: `${width}px`,
                }}
              >
                {task.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineView;