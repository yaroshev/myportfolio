import React from 'react';
import { Filter } from '../../../../features/projects/data/types';

interface FilterSectionProps {
  filters: Filter[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  onCursorChange?: (cursorType: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  activeFilter,
  setActiveFilter,
  onCursorChange = () => {}
}) => {
  return (
    <div className="w-full">
      {/* Simple filter selector */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-1">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            
            return (
              <button
                key={filter.id}
                className={`
                  py-1.5 px-3 rounded-md text-xs whitespace-nowrap flex-shrink-0
                  transition-colors duration-150 
                  ${isActive 
                    ? 'bg-primary-500/20 text-primary-200 border border-primary-500/30' 
                    : 'bg-dark-800/50 text-dark-300 border border-dark-700/50'}
                `}
                onClick={() => setActiveFilter(filter.id)}
                onMouseEnter={() => onCursorChange('hover')}
                onMouseLeave={() => onCursorChange('default')}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Safe area top spacing for iPhones with notch */}
      <div className="h-safe-top"></div>
    </div>
  );
};

export default FilterSection; 