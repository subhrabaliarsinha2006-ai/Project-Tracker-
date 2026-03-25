import type { FC } from 'react';
import { useState } from 'react';
import type { Task, TaskStatus } from '../types/indexes';
import VirtualList from './VirtualList';
import Badge from './common/Badge';
import Dropdown from './common/Dropdown';

interface ListViewListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
}

type SortKey = 'title' | 'priority' | 'dueDate';

const ListViewList: FC<ListViewListProps> = ({ tasks, onTaskUpdate }) => {
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;

    if (sortKey === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortKey === 'priority') {
      const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortKey === 'dueDate') {
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 font-semibold sticky top-0 z-10">
        <button
          onClick={() => handleSort('title')}
          className={`text-left hover:text-blue-600 ${
            sortKey === 'title' ? 'underline text-blue-600' : ''
          }`}
        >
          Title {sortKey === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('priority')}
          className={`text-left hover:text-blue-600 ${
            sortKey === 'priority' ? 'underline text-blue-600' : ''
          }`}
        >
          Priority {sortKey === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('dueDate')}
          className={`text-left hover:text-blue-600 ${
            sortKey === 'dueDate' ? 'underline text-blue-600' : ''
          }`}
        >
          Due Date {sortKey === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <div className="text-left">Assignee</div>
        <div className="text-left">Status</div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found. Clear filters to see all tasks.</p>
        </div>
      ) : (
        <VirtualList
          items={sortedTasks}
          itemHeight={70}
          containerHeight={500}
          renderItem={(task: Task) => (
            <div
              key={task.id}
              className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 items-center hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-gray-900">{task.title}</div>
              <Badge
                label={task.priority}
                variant={task.priority.toLowerCase() as 'critical' | 'high' | 'medium' | 'low'}
              />
              <div className="text-sm text-gray-600">
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">{task.assignee}</div>
              <Dropdown
                value={task.status}
                onChange={(status) => onTaskUpdate({ ...task, status })}
              />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ListViewList;