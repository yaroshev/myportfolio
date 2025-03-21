import React, { useState } from 'react';
import { HomeProps, Stat } from '../../types/home';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Handle navigation to Work page
  const handleCardClick = () => {
    if (setActivePage) {
      setActivePage('work');
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-center mb-10 md:mb-16 font-display text-dark-100">
          Key Achievements
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index} 
              className={`
                relative overflow-hidden rounded-lg p-4 md:p-6 lg:p-8
                backdrop-blur-md bg-dark-800/10 
                border border-dark-300/30
                transition-colors duration-300 group
                hover:border-primary-500/30 active:border-primary-500/50
                ${hoveredIndex === index ? 'shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'shadow-lg'}
                cursor-pointer
              `}
              onClick={handleCardClick}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onCursorChange('button');
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onCursorChange('default');
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-10" />
              
              {/* Hover gradient - no animation, just transition */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-300/5 to-accent-500/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Static border highlight instead of animation */}
              <div className="absolute inset-0 rounded-lg border border-primary-500/10 opacity-30 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-300 -z-5" />
              
              {/* Value with subtle animation */}
              <div className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 md:mb-3 text-dark-100 relative">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-dark-300 text-xs md:text-sm tracking-wider uppercase group-hover:text-primary-400 transition-colors duration-300 font-medium relative">
                {stat.label}
              </div>
              
              {/* Arrow indicator */}
              <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex items-center opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 