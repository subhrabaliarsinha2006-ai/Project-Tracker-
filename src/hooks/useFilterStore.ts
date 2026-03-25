import { create } from 'zustand';
import { FilterState, TaskStatus, TaskPriority } from '../types';

interface FilterStore extends FilterState {
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  statuses: [],
  priorities: [],
  assignees: [],
  dueDateFrom: undefined,
  dueDateTo: undefined,
  setFilters: (filters) => set(filters),
  clearFilters: () =>
    set({
      statuses: [],
      priorities: [],
      assignees: [],
      dueDateFrom: undefined,
      dueDateTo: undefined,
    }),
  hasActiveFilters: () => {
    const state = get();
    return (
      state.statuses.length > 0 ||
      state.priorities.length > 0 ||
      state.assignees.length > 0 ||
      !!state.dueDateFrom ||
      !!state.dueDateTo
    );
  },
}));