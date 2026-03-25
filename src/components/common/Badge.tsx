import type { FC } from 'react';

interface BadgeProps {
  label: string;
  variant: 'critical' | 'high' | 'medium' | 'low';
}

const Badge: FC<BadgeProps> = ({ label, variant }) => {
  const variants = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${variants[variant]}`}>
      {label}
    </span>
  );
};

export default Badge;