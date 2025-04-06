import React, { useState } from 'react';
import { Filter } from '../../../../features/projects/data/types';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isExpanded, setIsExpanded] = useState(false);

  // Sort filters to ensure "all" is first
  const sortedFilters = [...filters].sort((a, b) => {
    if (a.id === 'all') return -1;
    if (b.id === 'all') return 1;
    return 0;
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full relative flex justify-end items-center">
      {/* Expandable filter menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="absolute bottom-12 right-2 bg-dark-900/95 backdrop-blur-md border border-dark-800/50 rounded-lg shadow-lg py-2 px-3 z-10"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-2 max-h-[200px] overflow-y-auto">
              {sortedFilters.map((filter) => {
                const isActive = activeFilter === filter.id;
                
                return (
                  <button
                    key={filter.id}
                    className={`
                      py-1.5 px-3 rounded-md text-xs whitespace-nowrap text-left
                      transition-colors duration-150 
                      ${isActive 
                        ? 'bg-primary-500/20 text-primary-200 border border-primary-500/30' 
                        : 'bg-dark-800/50 text-dark-300 border border-dark-700/50'}
                    `}
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setIsExpanded(false);
                    }}
                    onMouseEnter={() => onCursorChange('hover')}
                    onMouseLeave={() => onCursorChange('default')}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter button */}
      <motion.button
        className={`
          w-10 h-10 rounded-full flex items-center justify-center shadow-md
          ${isExpanded 
            ? 'bg-primary-500/30 text-primary-100 border border-primary-500/50' 
            : 'bg-dark-800/80 text-dark-200 border border-dark-700/50'}
        `}
        onClick={toggleExpanded}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      </motion.button>
      
      {/* Safe area bottom spacing for iPhones with notch */}
      <div className="h-safe-bottom"></div>
    </div>
  );
};

export default FilterSection; 