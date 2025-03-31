import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from '../../../../features/projects/types';

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
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Section heading - Simplified for mobile */}
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-xl font-light tracking-tight font-display mb-2 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
            Browse Projects
          </span>
        </h2>
      </motion.div>

      {/* Horizontal scrollable filters with active indicator */}
      <div className="relative">
        {/* Filter pills container */}
        <div className="flex overflow-x-auto py-2 px-1 scrollbar-hide space-x-2 snap-x">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`
                py-2 px-4 rounded-full text-xs font-medium whitespace-nowrap
                backdrop-blur-sm flex-shrink-0 snap-start
                transition-all duration-300 ease-out
                ${activeFilter === filter.id 
                  ? 'bg-primary-500/20 text-primary-200 border border-primary-500/30' 
                  : 'bg-dark-800/40 text-dark-300 border border-dark-700/50 hover:border-dark-600/50'}
              `}
              onClick={() => setActiveFilter(filter.id)}
              onTouchStart={() => onCursorChange('button')}
              onTouchEnd={() => onCursorChange('default')}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
        
        {/* Stylish gradient fades for scroll indication */}
        <div className="absolute top-0 bottom-0 right-0 w-12 pointer-events-none bg-gradient-to-l from-dark-900 to-transparent opacity-50"></div>
        <div className="absolute top-0 bottom-0 left-0 w-4 pointer-events-none bg-gradient-to-r from-dark-900 to-transparent opacity-50"></div>
      </div>
      
      {/* Current filter indicator */}
      <motion.div 
        className="mt-3 text-center text-xs text-dark-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {activeFilter === 'all' 
          ? 'Showing all project categories' 
          : `Showing ${filters.find(f => f.id === activeFilter)?.label || ''}`}
      </motion.div>
    </motion.div>
  );
};

export default FilterSection; 