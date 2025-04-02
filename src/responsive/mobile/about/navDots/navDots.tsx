import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavDotsProps {
  activeSection: string;
  sections: string[];
  onDotClick: (sectionId: string) => void;
}

const NavDots: React.FC<NavDotsProps> = ({ 
  activeSection, 
  sections, 
  onDotClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Function to get the display text for a section
  const getSectionDisplayText = (section: string) => {
    if (section === 'hero') return 'Intro';
    if (section === 'bio') return 'About';
    if (section === 'skills') return 'Skills';
    if (section === 'timeline') return 'Work';
    return section.charAt(0).toUpperCase() + section.slice(1);
  };
  
  // Function to get icon for a section
  const getSectionIcon = (section: string) => {
    if (section === 'hero') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      );
    }
    if (section === 'bio') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      );
    }
    if (section === 'skills') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      );
    }
    if (section === 'timeline') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      );
    }
    return null;
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
          className="fixed bottom-5 left-0 right-0 z-50 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Pill container */}
          <div className="bg-dark-800/80 backdrop-blur-md rounded-full py-2 px-3 border border-dark-700/50 shadow-lg shadow-black/30 flex justify-between">
            {sections.map((section) => (
              <motion.button
                key={section}
                className="relative px-3 py-2 flex flex-col items-center"
                onClick={() => onDotClick(section)}
                whileTap={{ scale: 0.9 }}
              >
                {/* Icon and dot indicator */}
                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className={`flex items-center justify-center transition-colors duration-300 ${
                      activeSection === section ? 'text-primary-400' : 'text-dark-400'
                    }`}
                  >
                    {getSectionIcon(section)}
                  </motion.div>
                  
                  {/* Active indicator dot */}
                  {activeSection === section && (
                    <motion.div 
                      className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500"
                      layoutId="activeDot"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </div>
                
                {/* Text label */}
                <span className={`text-xs text-center mt-1 transition-colors duration-300 ${
                  activeSection === section ? 'text-primary-400' : 'text-dark-400/70'
                }`}>
                  {getSectionDisplayText(section)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavDots; 