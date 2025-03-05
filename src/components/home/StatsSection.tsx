import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HomeProps, Stat } from '../../types/home';

interface StatsSectionProps extends Pick<HomeProps, 'onCursorChange'> {
  statsOpacity: any;
  statsY: any;
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
  statsOpacity,
  statsY,
  setActivePage
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Create a spring-animated version of statsY for smoother motion
  const springY = useSpring(statsY, { 
    stiffness: 50, 
    damping: 20,
    restDelta: 0.0005
  });

  // Handle navigation to Work page
  const handleCardClick = () => {
    if (setActivePage) {
      setActivePage('work');
    }
  };

  return (
    <motion.section 
      className="py-24 relative"
      style={{ 
        opacity: statsOpacity,
        y: springY, // Use the spring-animated version
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-2xl md:text-3xl font-light tracking-tight text-center mb-16 font-display text-dark-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }} // Increased margin for earlier animation start
          transition={{ duration: 0.7, ease: "easeOut" }} // Smoother easing
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
        >
          Key Achievements
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index} 
              className={`
                relative overflow-hidden rounded-lg p-6 md:p-8 
                backdrop-blur-md bg-dark-800/10 
                border border-dark-300/30
                transition-all duration-300 group z-10
                hover:border-transparent
                ${hoveredIndex === index ? 'shadow-[0_0_25px_rgba(255,255,255,0.2)]' : 'shadow-lg'}
                cursor-pointer
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }} // Increased margin for earlier animation start
              transition={{ 
                duration: 0.7, 
                delay: index * 0.08, // Slightly reduced delay between items
                ease: "easeOut" // Smoother easing
              }}
              onClick={handleCardClick}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onCursorChange('button');
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onCursorChange('default');
              }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-10"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
              />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-300/5 to-accent-500/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" // Increased duration
                initial={{ backgroundPosition: '0% 0%' }}
                animate={hoveredIndex === index ? {
                  backgroundPosition: ['0% 0%', '100% 100%'],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "linear" }} // Smoother animation
                style={{
                  willChange: 'background-position, opacity',
                  transform: 'translateZ(0)'
                }}
              />
              
              <motion.div 
                className="absolute inset-0 rounded-lg -z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" // Increased duration
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                  willChange: 'box-shadow, opacity',
                  transform: 'translateZ(0)'
                }}
                animate={hoveredIndex === index ? {
                  boxShadow: [
                    'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                    'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  ]
                } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} // Smoother animation
              />
              
              <motion.div 
                className="text-3xl md:text-4xl font-light mb-3 text-dark-100 relative"
                animate={{ opacity: [0.95, 1, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }} // Smoother and slower animation
                style={{
                  willChange: 'opacity',
                  transform: 'translateZ(0)'
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-dark-300 text-sm tracking-wider uppercase group-hover:text-primary-400 transition-colors duration-300 font-medium relative"> {/* Increased duration */}
                {stat.label}
              </div>
              
              {/* Visual indicator that cards are clickable */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </motion.section>
  );
};

export default StatsSection; 