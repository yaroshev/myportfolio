import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from '../../../../features/projects/types';

interface FilterSectionProps {
  filters: Filter[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  onCursorChange: (cursorType: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  activeFilter,
  setActiveFilter,
  onCursorChange
}) => {
  // Find the active filter to display its description at the bottom
  const activeFilterObj = filters.find(filter => filter.id === activeFilter);
  // Track the positions of filter items for the indicator line
  const [filterPositions, setFilterPositions] = useState<Record<string, DOMRect | null>>({});

  // Function to update the position of a filter in our tracking object
  const updateFilterPosition = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      setFilterPositions(prev => ({
        ...prev,
        [id]: rect
      }));
    }
  };

  // Get current active filter position
  const activePosition = filterPositions[activeFilter];

  return (
    <motion.div 
      className="w-full flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Section heading */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-light tracking-tight font-display mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
            Browse Projects
          </span>
        </h2>
        <p className="text-dark-400 text-sm">
          Filter through my portfolio to discover projects across different specialties
        </p>
      </motion.div>

      {/* Filter buttons with absolute positioned indicator */}
      <div className="flex flex-col gap-4 relative">
        {/* Animated vertical line that follows the active filter */}
        <motion.div
          className="absolute left-0 w-0.5 bg-gradient-to-b from-primary-400 to-accent-400 transition-all"
          style={{
            top: activePosition ? activePosition.top - (filterPositions[filters[0].id]?.top || 0) : 0,
            height: activePosition ? activePosition.height : 0,
            opacity: activePosition ? 1 : 0,
          }}
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />

        <AnimatePresence>
          {filters.map((filter, index) => {
            const isActive = activeFilter === filter.id;
            return (
              <motion.div 
                key={filter.id}
                className="relative pl-4"
                ref={(el) => updateFilterPosition(filter.id, el)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              >
                <button 
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative z-10 text-sm uppercase tracking-wider font-light transition-colors duration-300 w-full text-left ${
                    isActive 
                      ? 'text-primary-400' 
                      : 'text-dark-300 hover:text-dark-200'
                  }`}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  {filter.label}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Description text at the bottom with space to breathe */}
      <div className="mt-8 pt-6 border-t border-dark-700/30">
        <AnimatePresence mode="wait">
          {activeFilterObj && (
            <motion.div
              key={`${activeFilterObj.id}-description-bottom`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-dark-400 text-sm"
            >
              <p>{activeFilterObj.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FilterSection; 