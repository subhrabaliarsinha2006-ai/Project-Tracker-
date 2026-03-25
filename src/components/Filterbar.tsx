import type { FC } from 'react';
import { useState } from 'react';
import type { TaskStatus, TaskPriority, FilterState } from '../types/indexes';
import MultiSelect from './common/MultiSelect';
import Button from './common/Button';
import { TASK_STATUSES, TASK_PRIORITIES, TEAM_MEMBERS } from '../utils/constants';

interface FilterbarProps {
  onFilterChange: (filters: FilterState) => void;
}

const Filterbar: FC<FilterbarProps> = ({ onFilterChange }) => {
  const [statuses, setStatuses] = useState<TaskStatus[]>([]);
  const [priorities, setPriorities] = useState<TaskPriority[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);

  const handleStatusChange = (selected: string[]) => {
    setStatuses(selected as TaskStatus[]);
    onFilterChange({
      statuses: selected as TaskStatus[],
      priorities,
      assignees,
      dueDateFrom: null,
      dueDateTo: null,
    });
  };

  const handlePriorityChange = (selected: string[]) => {
    setPriorities(selected as TaskPriority[]);
    onFilterChange({
      statuses,
      priorities: selected as TaskPriority[],
      assignees,
      dueDateFrom: null,
      dueDateTo: null,
    });
  };

  const handleAssigneeChange = (selected: string[]) => {
    setAssignees(selected);
    onFilterChange({
      statuses,
      priorities,
      assignees: selected,
      dueDateFrom: null,
      dueDateTo: null,
    });
  };

  const clearFilters = () => {
    setStatuses([]);
    setPriorities([]);
    setAssignees([]);
    onFilterChange({
      statuses: [],
      priorities: [],
      assignees: [],
      dueDateFrom: null,
      dueDateTo: null,
    });
  };

  const hasActiveFilters = statuses.length > 0 || priorities.length > 0 || assignees.length > 0;

  return (
    <div className="bg-white p-4 border-b border-gray-200 sticky top-0 z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MultiSelect
          options={TASK_STATUSES}
          selected={statuses}
          onChange={handleStatusChange}
          placeholder="Filter by Status"
        />
        <MultiSelect
          options={TASK_PRIORITIES}
          selected={priorities}
          onChange={handlePriorityChange}
          placeholder="Filter by Priority"
        />
        <MultiSelect
          options={TEAM_MEMBERS}
          selected={assignees}
          onChange={handleAssigneeChange}
          placeholder="Filter by Assignee"
        />
        {hasActiveFilters && (
          <Button variant="secondary" onClick={clearFilters} size="md">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default Filterbar;