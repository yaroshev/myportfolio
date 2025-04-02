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
      {/* Enhanced mobile section heading */}
      <motion.div 
        className="mb-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium tracking-tight text-dark-200">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
              Filter
            </span>
          </h2>
          <motion.span 
            className="text-xs text-dark-400 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {activeFilter === 'all' 
              ? 'All projects' 
              : filters.find(f => f.id === activeFilter)?.label || ''}
          </motion.span>
        </div>
      </motion.div>

      {/* Improved horizontal scrollable filters */}
      <div className="relative">
        {/* Enhanced filter pills container */}
        <div className="flex overflow-x-auto py-3 px-1 scrollbar-hide space-x-3 snap-x">
          {filters.map((filter, index) => {
            const isActive = activeFilter === filter.id;
            
            return (
              <motion.button
                key={filter.id}
                className={`
                  py-2.5 px-4 rounded-lg text-xs font-medium whitespace-nowrap
                  backdrop-blur-sm flex-shrink-0 snap-start shadow-sm
                  transition-all duration-300 ease-out relative
                  ${isActive 
                    ? 'bg-gradient-to-br from-primary-500/30 to-accent-500/20 text-white border border-primary-500/40' 
                    : 'bg-dark-800/60 text-dark-300 border border-dark-700/50 hover:border-dark-600/50'}
                `}
                onClick={() => setActiveFilter(filter.id)}
                onTouchStart={() => onCursorChange('button')}
                onTouchEnd={() => onCursorChange('default')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.05 * index,
                  ease: "easeOut"
                }}
              >
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10"
                    layoutId="activeFilterBg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <span className="relative z-10">{filter.label}</span>
                
                {isActive && (
                  <motion.span 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-400"
                    layoutId="activeFilterDot"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* Improved gradient fades for scroll indication */}
        <div className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none bg-gradient-to-l from-dark-900 to-transparent opacity-60"></div>
        <div className="absolute top-0 bottom-0 left-0 w-6 pointer-events-none bg-gradient-to-r from-dark-900 to-transparent opacity-60"></div>
      </div>
      
      {/* Number of projects indicator */}
      <motion.div 
        className="mt-2 text-center text-2xs text-dark-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        Swipe to see all categories
      </motion.div>
    </motion.div>
  );
};

export default FilterSection; 