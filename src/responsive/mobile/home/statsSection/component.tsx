import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HomeProps, Stat } from '../../../../core/types/home';

interface StatsSectionProps extends Pick<HomeProps, 'onCursorChange'> {
  setActivePage?: (page: string) => void;
}

const stats: Stat[] = [
  { value: '1000+', label: 'Videos Produced' },
  { value: '10M+', label: 'Social Media Views' },
  { value: '1000+', label: 'Drone Flight Hours' },
  { value: '150+', label: 'Events Live Streamed' },
  { value: '15+', label: 'AI Agents Created' },
  { value: '100+', label: 'Clients Served' }
];

const StatsSection: React.FC<StatsSectionProps> = ({
  onCursorChange,
  setActivePage
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Handle navigation to Work page
  const handleCardClick = () => {
    if (setActivePage) {
      setActivePage('work');
    }
  };

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-light tracking-tight text-center mb-8 font-display text-dark-100">
          Key Achievements
        </h2>
        
        {/* 2-column by 3-row grid layout */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index} 
              className={`
                relative overflow-hidden rounded-lg p-5
                backdrop-blur-md bg-dark-800/10 
                border border-dark-300/30
                transition-all duration-300
                ${activeIndex === index ? 'border-primary-500/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'shadow-lg'}
              `}
              onClick={() => {
                setActiveIndex(index);
                handleCardClick();
              }}
              onTouchStart={() => setActiveIndex(index)}
              onTouchEnd={() => setActiveIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-10" />
              
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-300/5 to-accent-500/10 -z-10 opacity-0 transition-opacity duration-300" 
                style={{ opacity: activeIndex === index ? 0.5 : 0 }}
              />
              
              {/* Static border highlight */}
              <div className="absolute inset-0 rounded-lg border border-primary-500/10 opacity-30 transition-opacity duration-300 -z-5" />
              
              {/* Value with subtle animation */}
              <div className="text-2xl font-light mb-2 text-dark-100 relative">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-dark-300 text-xs tracking-wider uppercase transition-colors duration-300 font-medium relative">
                {stat.label}
              </div>
              
              {/* Clickable indicator */}
              <div className="absolute bottom-2 right-2 flex items-center opacity-70 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 