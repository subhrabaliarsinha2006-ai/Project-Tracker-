import { useState, useRef } from 'react';
import { Task } from '../types';

export interface DragState {
  draggedTaskId: string | null;
  sourceStatus: string | null;
  isDragOverColumn: string | null;
}

export function useDragDrop() {
  const [dragState, setDragState] = useState<DragState>({
    draggedTaskId: null,
    sourceStatus: null,
    isDragOverColumn: null,
  });

  const draggedTaskRef = useRef<Task | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task, status: string) => {
    draggedTaskRef.current = task;
    setDragState({
      draggedTaskId: task.id,
      sourceStatus: status,
      isDragOverColumn: null,
    });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(task));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, columnStatus: string) => {
    e.preventDefault();
    if (dragState.draggedTaskId) {
      setDragState((prev) => ({
        ...prev,
        isDragOverColumn: columnStatus,
      }));
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStatus: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedTaskRef.current) {
      return {
        task: draggedTaskRef.current,
        sourceStatus: dragState.sourceStatus,
        targetStatus,
      };
    }
    return null;
  };

  const handleDragEnd = () => {
    draggedTaskRef.current = null;
    setDragState({
      draggedTaskId: null,
      sourceStatus: null,
      isDragOverColumn: null,
    });
  };

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
}