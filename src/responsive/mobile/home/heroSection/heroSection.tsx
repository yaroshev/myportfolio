import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HomeProps } from '../../../../core/types/home';
import profileImage from '../../../../shared/assets/profile.jpg';

interface HeroSectionProps extends Pick<HomeProps, 'setActivePage' | 'onCursorChange'> {
  scrollY: number;
  heroScale: any;
  heroOpacity: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  setActivePage,
  onCursorChange,
  scrollY,
  heroScale,
  heroOpacity
}) => {
  const [workHovered, setWorkHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  
  const parallaxOffset = scrollY * 0.3; // Reduced parallax effect for mobile

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      style={{
        scale: heroScale,
        opacity: heroOpacity
      }}
    >
      {/* Simplified background for better mobile performance */}
      <motion.div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(220, 220, 220, 0.1) 0%, transparent 80%)',
            transform: `translateY(${-parallaxOffset * 0.1}px)`,
          }}
        />
        
        {/* Simplified floating elements for mobile */}
        <motion.div 
          className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-dark-200/10 to-dark-300/10 blur-3xl"
          style={{ 
            top: '30%', 
            left: '20%',
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror"
          }}
        />
        
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-10"
        />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Mobile-optimized layout */}
        <motion.div 
          className="flex flex-col items-center text-center h-full justify-between py-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Profile Image - Larger on mobile and better positioned */}
          <motion.div 
            onClick={() => setActivePage('about')}
            className="w-40 h-40 rounded-full overflow-hidden mb-8 relative shadow-lg cursor-pointer mt-4"
            style={{ 
              transform: `translateY(${-parallaxOffset * 0.05}px)`,
              boxShadow: '0 0 30px 5px rgba(255, 255, 255, 0.15), 0 0 10px 1px rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src={profileImage} 
              alt="Yaroslav Shevchenko" 
              className="w-full h-full object-cover object-center"
            />
            <motion.div 
              className="absolute inset-0 border border-dark-300/20 rounded-full"
              animate={{ 
                boxShadow: ['0 0 0 0 rgba(180, 180, 180, 0)', '0 0 0 10px rgba(180, 180, 180, 0.1)', '0 0 0 20px rgba(180, 180, 180, 0)'] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.div>

          <div className="flex flex-col space-y-5">
            {/* Title - Mobile optimized size */}
            <motion.h1 
              className="text-[2.5rem] font-light tracking-tight relative font-display"
              style={{ 
                transform: `translateY(${-parallaxOffset * 0.08}px)`,
                lineHeight: 1.1
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-dark-300 via-dark-100 to-dark-200">
                Yaroslav Shevchenko
              </span>
            </motion.h1>
            
            {/* Description - Mobile optimized */}
            <motion.p 
              className="text-sm max-w-2xl font-light text-dark-400 px-4"
              style={{ 
                transform: `translateY(${-parallaxOffset * 0.1}px)`,
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Digital Communications Professional specializing in media production, live streaming, and digital transformation. Based in BC, Canada.
            </motion.p>
          </div>

          {/* Action Buttons - Positioned at bottom third - Optimized for mobile */}
          <motion.div 
            className="flex gap-8 justify-center mt-10"
            style={{ 
              transform: `translateY(${-parallaxOffset * 0.12}px)`,
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {/* View Work Button */}
            <div className="relative">
              <button 
                onClick={() => setActivePage('work')}
                className="relative z-10 text-sm uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300 animate-pulse-slow px-3 py-2"
                onTouchStart={() => {
                  setWorkHovered(true);
                }}
                onTouchEnd={() => {
                  setWorkHovered(false);
                }}
                style={{
                  textShadow: workHovered ? 'none' : '0 0 8px rgba(255, 255, 255, 0.2)',
                  animationDuration: '4s'
                }}
              >
                View Work
              </button>
              <div 
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out"
                style={{ 
                  width: workHovered ? 'calc(100% - 24px)' : '20%',
                  left: '12px'
                }}
              />
            </div>
            
            {/* About Me Button */}
            <div className="relative">
              <button 
                onClick={() => setActivePage('about')}
                className="relative z-10 text-sm uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300 animate-pulse-slow px-3 py-2"
                onTouchStart={() => {
                  setAboutHovered(true);
                }}
                onTouchEnd={() => {
                  setAboutHovered(false);
                }}
                style={{
                  textShadow: aboutHovered ? 'none' : '0 0 8px rgba(255, 255, 255, 0.2)',
                  animationDuration: '4s',
                  animationDelay: '0.5s'
                }}
              >
                About Me
              </button>
              <div 
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out"
                style={{ 
                  width: aboutHovered ? 'calc(100% - 24px)' : '20%',
                  left: '12px'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection; 