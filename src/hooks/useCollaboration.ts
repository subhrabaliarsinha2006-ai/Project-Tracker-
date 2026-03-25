import { useEffect, useState } from 'react';
import { USER_COLORS, TEAM_MEMBERS } from '../utils/constants';

export interface CollaborationUser {
  id: string;
  name: string;
  initials: string;
  color: string;
  viewingTaskId: string | null;
}

export function useCollaboration() {
  const [activeUsers, setActiveUsers] = useState<CollaborationUser[]>([]);

  useEffect(() => {
    const numUsers = Math.floor(Math.random() * 2) + 2;

    const users: CollaborationUser[] = Array.from({ length: numUsers }, (_, i) => {
      const name = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)];

      const initials = name
        .split(' ')
        .map((part: string) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      return {
        id: `user-${i}`,
        name,
        initials,
        color: USER_COLORS[i % USER_COLORS.length],
        viewingTaskId: null,
      };
    });

    setActiveUsers(users);

    const interval = setInterval(() => {
      setActiveUsers((prev) =>
        prev.map((user) => ({
          ...user,
          viewingTaskId: Math.random() > 0.5 ? `task-${Math.floor(Math.random() * 100)}` : null,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { activeUsers };
}