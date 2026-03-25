import type { FC } from 'react';
import { useState } from 'react';
import type { TaskStatus } from '../../types/indexes';

interface DropdownProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  options: TaskStatus[];
}

const Dropdown: FC<DropdownProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
      >
        {value}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;