import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HomeProps } from '../../types/home';
import profileImage from '../../assets/profile.jpg';

interface HeroSectionProps extends Pick<HomeProps, 'setActivePage' | 'onCursorChange'> {
  scrollY: number;
  mousePosition: { x: number; y: number };
  heroScale: any;
  heroOpacity: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  setActivePage,
  onCursorChange,
  scrollY,
  mousePosition,
  heroScale,
  heroOpacity
}) => {
  const [workHovered, setWorkHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  
  const parallaxOffset = scrollY * 0.5;
  const mouseParallax = {
    x: mousePosition.x * 20,
    y: mousePosition.y * 20
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20"
      style={{
        scale: heroScale,
        opacity: heroOpacity
      }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          rotateX: mousePosition.y * 10,
          rotateY: mousePosition.x * -10,
          transformStyle: 'preserve-3d',
          perspective: 1000,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(220, 220, 220, 0.1) 0%, transparent 80%)',
            transform: `translateY(${-parallaxOffset * 0.2}px) translateZ(0)`,
            willChange: 'transform'
          }}
        />
        
        {/* Floating elements - Adjusted for rule of thirds */}
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-dark-200/10 to-dark-300/10 blur-3xl"
          style={{ 
            top: '33%', 
            left: '33%',
            transform: `translate3d(${mouseParallax.x * -1}px, ${mouseParallax.y * -1}px, 100px)`,
            zIndex: 1,
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror"
          }}
        />
        
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-dark-300/10 to-dark-200/10 blur-3xl"
          style={{ 
            bottom: '33%', 
            right: '33%',
            transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 50px)`,
            zIndex: 1,
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
            repeatType: "mirror"
          }}
        />
        
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-10"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Mobile-optimized layout using rule of thirds */}
        <motion.div 
          className="flex flex-col items-center text-center h-full justify-between py-8 md:py-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
        >
          {/* Profile Image - Larger on mobile and better positioned */}
          <motion.div 
            onClick={() => setActivePage('about')}
            className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden mb-10 sm:mb-12 md:mb-10 relative shadow-lg cursor-pointer mt-6 sm:mt-8"
            style={{ 
              transform: `translateY(${-parallaxOffset * 0.1}px)`,
              boxShadow: imageHovered 
                ? '0 0 40px 8px rgba(255, 255, 255, 0.25), 0 0 15px 2px rgba(255, 255, 255, 0.5)' 
                : '0 0 30px 5px rgba(255, 255, 255, 0.2), 0 0 10px 1px rgba(255, 255, 255, 0.4)',
              transition: 'box-shadow 0.8s cubic-bezier(0.19, 1, 0.22, 1)'
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => {
              setImageHovered(true);
              onCursorChange('button');
            }}
            onMouseLeave={() => {
              setImageHovered(false);
              onCursorChange('default');
            }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <img 
              src={profileImage} 
              alt="Yaroslav Shevchenko" 
              className="w-full h-full object-cover object-center transition-all duration-1000"
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

          <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10">
            {/* Title - Positioned at middle third, adjusted size for mobile */}
            <motion.h1 
              className="text-[2.5rem] sm:text-[3.45rem] md:text-[5.175rem] font-light tracking-tight relative font-display"
              style={{ 
                transform: `translateY(${-parallaxOffset * 0.15}px) translateZ(0)`,
                willChange: 'transform',
                lineHeight: 1.1
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-dark-300 via-dark-100 to-dark-200">
                Yaroslav Shevchenko
              </span>
            </motion.h1>
            
            {/* Description - Positioned at middle third, optimized spacing */}
            <motion.p 
              className="text-sm sm:text-base max-w-2xl font-light text-dark-400 px-4 sm:px-0"
              style={{ 
                transform: `translateY(${-parallaxOffset * 0.2}px) translateZ(0)`,
                willChange: 'transform'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Digital Communications Professional specializing in media production, live streaming, and digital transformation. Based in BC, Canada.
            </motion.p>
          </div>

          {/* Action Buttons - Positioned at bottom third */}
          <motion.div 
            className="flex flex-wrap gap-8 sm:gap-10 justify-center mt-12 sm:mt-14 md:mt-16"
            style={{ 
              transform: `translateY(${-parallaxOffset * 0.25}px) translateZ(0)`,
              willChange: 'transform'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* View Work Button */}
            <div className="relative">
              <button 
                onClick={() => setActivePage('work')}
                className="relative z-10 text-sm uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300 animate-pulse-slow px-3 py-2"
                onMouseEnter={() => {
                  setWorkHovered(true);
                  onCursorChange('button');
                }}
                onMouseLeave={() => {
                  setWorkHovered(false);
                  onCursorChange('default');
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
                onMouseEnter={() => {
                  setAboutHovered(true);
                  onCursorChange('button');
                }}
                onMouseLeave={() => {
                  setAboutHovered(false);
                  onCursorChange('default');
                }}
                style={{
                  textShadow: aboutHovered ? 'none' : '0 0 8px rgba(255, 255, 255, 0.2)',
                  animationDuration: '4s'
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

          {/* Add custom animation keyframes */}
          <style jsx global>{`
            @keyframes pulse-slow {
              0%, 100% { opacity: 1; text-shadow: 0 0 0px rgba(255, 255, 255, 0); }
              50% { opacity: 0.95; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3); }
            }
            .animate-pulse-slow {
              animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              will-change: opacity, text-shadow;
            }
          `}</style>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection; 