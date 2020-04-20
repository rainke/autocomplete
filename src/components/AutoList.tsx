import React from 'react';

interface AutoListProps {
  open: boolean;
  options: Array<{ value: string; id: string | number }>;
  activeIndex: number;
  handleSelect(value: string): void;
}
const AutoList: React.FC<AutoListProps> = ({ open, options, activeIndex, handleSelect }) => {
  return open && options.length ? (
    <div className="auto-list">
      {options.map((item, index) => {
        return (
          <div
            className={activeIndex === index ? 'auto-list-item active' : 'auto-list-item'}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(item.value);
            }}
            key={item.id}
          >
            {/* TODO: 这里可以自定义 */}
            {item.value}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default AutoList;
