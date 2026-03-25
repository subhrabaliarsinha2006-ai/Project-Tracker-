import type { FC } from 'react';

interface AvatarProps {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: FC<AvatarProps> = ({ initials, color, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-semibold ${color}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;