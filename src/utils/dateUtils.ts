export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysUntil = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil === 0) return 'Due Today';
  if (daysUntil < 0) {
    if (daysUntil > -7) return `${Math.abs(daysUntil)} days overdue`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function isOverdue(dateStr: string): boolean {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function getDayOfMonth(dateStr: string): number {
  const date = new Date(dateStr + 'T00:00:00');
  return date.getDate();
}

export function getMonthYear(dateStr: string): { month: number; year: number } {
  const date = new Date(dateStr + 'T00:00:00');
  return { month: date.getMonth(), year: date.getFullYear() };
}