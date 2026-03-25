import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { Task, FilterState } from './types/indexes';
import Filterbar from './components/Filterbar';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import TimelineView from './components/TimelineView';
import CollaborationIndicators from './components/CollaborationIndicators';
import { generateTaskData } from './utils/seedData';
import { useCollaboration } from './hooks/useCollaboration';

type ViewType = 'kanban' | 'list' | 'timeline';

const App: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [filters, setFilters] = useState<FilterState>({
    statuses: [],
    priorities: [],
    assignees: [],
    dueDateFrom: null,
    dueDateTo: null,
  });
  const { activeUsers } = useCollaboration();

  useEffect(() => {
    const taskData = generateTaskData(500);
    setTasks(taskData);
  }, []);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filters.statuses.length && !filters.statuses.includes(task.status)) return false;
    if (filters.priorities.length && !filters.priorities.includes(task.priority)) return false;
    if (filters.assignees.length && !filters.assignees.includes(task.assignee)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📊 Project Tracker</h1>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrentView('kanban')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentView === 'kanban'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              📋 Kanban Board
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentView === 'list'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              📝 List View
            </button>
            <button
              onClick={() => setCurrentView('timeline')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentView === 'timeline'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              📅 Timeline
            </button>
          </div>
        </div>
      </header>

      <CollaborationIndicators activeUsers={activeUsers} />

      <Filterbar onFilterChange={handleFilterChange} />

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4">
        {currentView === 'kanban' && (
          <KanbanBoard tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
        )}
        {currentView === 'list' && (
          <ListView tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} filters={filters} />
        )}
        {currentView === 'timeline' && <TimelineView tasks={filteredTasks} />}
      </main>
    </div>
  );
};

export default App;