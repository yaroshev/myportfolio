import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DesktopHeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  scrollY: number;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ 
  activePage, 
  setActivePage, 
  scrollY = 0 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    setScrolled(scrollY > 20);
  }, [scrollY]);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'work', label: 'Work', path: '/work' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'resources', label: 'Resources', path: '/resources' }
  ];
  
  // Format time as HH:MM
  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });

  return (
    <motion.header 
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-12 pt-6"
    >
      <motion.div 
        className="relative max-w-5xl w-full rounded-full py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Base background with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md border border-dark-800/30 shadow-lg" />
        
        {/* Gradient overlay that appears on hover */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 via-dark-300/5 to-accent-500/10 backdrop-blur-md border border-dark-800/30"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%'
          }}
          transition={{ 
            opacity: { duration: 0.6, ease: "easeOut" },
            backgroundPosition: { 
              duration: 3, 
              repeat: Infinity, 
              repeatType: 'reverse', 
              ease: "linear" 
            }
          }}
        />
        
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovered 
              ? [
                  '0 8px 20px -8px rgba(31, 35, 65, 0.25), 0 0 0px rgba(120, 118, 240, 0)',
                  '0 10px 30px -10px rgba(66, 71, 112, 0.3), 0 0 15px 2px rgba(120, 118, 240, 0.2)',
                  '0 12px 35px -10px rgba(66, 71, 112, 0.35), 0 0 20px 5px rgba(120, 118, 240, 0.25)',
                  '0 10px 30px -10px rgba(66, 71, 112, 0.3), 0 0 15px 2px rgba(120, 118, 240, 0.2)'
                ]
              : '0 8px 20px -8px rgba(31, 35, 65, 0.25)'
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Inner border glow */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-0"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
          animate={isHovered ? {
            opacity: 1,
            boxShadow: [
              'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
              'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
            ]
          } : { opacity: 0 }}
          transition={{ 
            opacity: { duration: 0.4, ease: "easeOut" },
            boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <div className="relative flex justify-between items-center px-8">
          <Link to="/" onClick={() => setActivePage('home')}>
            <motion.div 
              className="font-display text-xl tracking-wider cursor-pointer transition-opacity duration-300 hover:opacity-70 flex items-center" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative overflow-hidden">
                <span className="text-gray-200">Y</span>
                <span className="text-gray-200">S</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 to-gray-300"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className="ml-6 text-xs text-dark-400">
                <span>{formattedTime}</span>
              </div>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-12">
            {navItems.map(item => (
              <Link 
                key={item.id} 
                to={item.path}
                onClick={() => setActivePage(item.id)}
                className={`relative text-sm tracking-wider uppercase transition-colors duration-300 ${
                  activePage === item.id
                    ? 'text-primary-400'
                    : 'text-dark-400 hover:text-dark-200'
                }`}
              >
                <motion.div>
                  {item.label}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out"
                    style={{ 
                      width: activePage === item.id ? '100%' : '0%'
                    }}
                    animate={{
                      width: activePage === item.id ? '100%' : '0%'
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
            <span className="text-xs text-dark-400">Available for work</span>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default DesktopHeader; 