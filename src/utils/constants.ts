export const TASK_STATUSES = ['To Do', 'In Progress', 'In Review', 'Done'] as const;
export const TASK_PRIORITIES = ['Critical', 'High', 'Medium', 'Low'] as const;

export const TEAM_MEMBERS = [
  'Alice Johnson',
  'Bob Smith',
  'Carol White',
  'David Brown',
  'Emma Wilson',
] as const;

export const USER_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export const INITIAL_ABBR: Record<string, string> = {
  'Alice Johnson': 'AJ',
  'Bob Smith': 'BS',
  'Carol White': 'CW',
  'David Brown': 'DB',
  'Emma Wilson': 'EW',
};