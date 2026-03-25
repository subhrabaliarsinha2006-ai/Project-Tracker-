import type { FC, ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T) => ReactNode;
  bufferSize?: number;
}

const VirtualList: FC<VirtualListProps<any>> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  bufferSize = 5,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + bufferSize
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  const totalHeight = items.length * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop((e.currentTarget as HTMLDivElement).scrollTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll as any);
      return () => container.removeEventListener('scroll', handleScroll as any);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto border border-gray-200"
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item) => (
            <div key={(item as any).id}>{renderItem(item)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;