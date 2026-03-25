import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { CollaborationUser } from '../types/indexes';
import Avatar from './common/Avatar';

interface CollaborationIndicatorsProps {
  activeUsers: CollaborationUser[];
  currentTaskId?: string;
}

const CollaborationIndicators: FC<CollaborationIndicatorsProps> = ({
  activeUsers,
  currentTaskId,
}) => {
  const [displayUsers, setDisplayUsers] = useState<CollaborationUser[]>(activeUsers);

  useEffect(() => {
    setDisplayUsers(activeUsers);
  }, [activeUsers]);

  const usersOnCurrentTask = displayUsers.filter((u) => u.viewingTaskId === currentTaskId);
  const totalUniqueUsers = new Set(displayUsers.map((u) => u.id)).size;

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <div className="text-sm font-medium text-gray-700">
        {totalUniqueUsers} people viewing this board
      </div>
      <div className="flex gap-1 ml-4">
        {displayUsers.slice(0, 3).map((user) => (
          <Avatar key={user.id} initials={user.initials} color={user.color} size="sm" />
        ))}
        {displayUsers.length > 3 && (
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
            +{displayUsers.length - 3}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationIndicators;