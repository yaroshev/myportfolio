import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavDotsProps {
  activeSection: string;
  sections: string[];
  onDotClick: (sectionId: string) => void;
  onCursorChange?: (cursorType: string) => void;
}

const NavDots: React.FC<NavDotsProps> = ({ 
  activeSection, 
  sections, 
  onDotClick, 
  onCursorChange = () => {} 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Function to get the display text for a section
  const getSectionDisplayText = (section: string) => {
    if (section === 'hero') return 'YS';
    return section.charAt(0).toUpperCase() + section.slice(1);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      // Show the navigation when user scrolls down a bit
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed left-24 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pill container */}
          <div className="relative bg-dark-800/40 backdrop-blur-sm rounded-full py-4 px-1 border border-dark-700/50">
            {sections.map((section, index) => (
              <React.Fragment key={section}>
                {/* Dots */}
                <motion.button
                  className="relative my-3 group flex justify-center w-10"
                  onClick={() => onDotClick(section)}
                  onMouseEnter={() => onCursorChange('hover')}
                  onMouseLeave={() => onCursorChange('default')}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Text label (outside pill) */}
                  <span className={`absolute right-full mr-6 text-xs uppercase font-light tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeSection === section ? 'opacity-100 text-primary-400' : 'opacity-0 text-dark-400 group-hover:opacity-70'
                  }`}>
                    {getSectionDisplayText(section)}
                  </span>
                  
                  {/* Dot indicator (inside pill) */}
                  <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                    activeSection === section
                      ? 'bg-primary-500 border-primary-500/50 shadow-glow-primary scale-125'
                      : 'bg-dark-800 border-dark-700 group-hover:bg-dark-700'
                  }`} />
                </motion.button>
                
                {/* Connector line between dots (except after last dot) */}
                {index < sections.length - 1 && (
                  <div className="h-px w-4 bg-gradient-to-r from-primary-500/20 to-primary-500/0 mx-auto" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavDots; 