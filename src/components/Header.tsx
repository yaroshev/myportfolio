import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ 
  activePage, 
  setActivePage, 
  scrollY = 0 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'resources', label: 'Resources' }
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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 md:px-12 pt-6"
    >
      <motion.div 
        className={`relative max-w-5xl w-full rounded-full transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
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

        <div className="relative flex justify-between items-center px-6 md:px-8">
          <motion.div 
            className="font-display text-xl tracking-wider cursor-pointer transition-opacity duration-300 hover:opacity-70 flex items-center" 
            onClick={() => setActivePage('home')}
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
            
            <div className="ml-6 text-xs text-dark-400 hidden md:block">
              <span>{formattedTime}</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            {navItems.map(item => (
              <motion.button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`relative text-sm tracking-wider uppercase transition-colors duration-300 ${
                  activePage === item.id
                    ? 'text-dark-100'
                    : 'text-dark-400 hover:text-dark-200'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                {activePage === item.id && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary-400 to-accent-400"
                    layoutId="navIndicator"
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 30,
                      layout: { duration: 0.3, ease: "easeInOut" }
                    }}
                    style={{ originX: 0 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
            <span className="text-xs text-dark-400">Available for work</span>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-dark-400 w-10 h-10 flex flex-col justify-center items-center gap-1.5 relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span 
              className="w-5 h-px bg-dark-300 block"
              animate={{ 
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="w-5 h-px bg-dark-300 block"
              animate={{ 
                opacity: menuOpen ? 0 : 1,
                x: menuOpen ? -10 : 0
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="w-5 h-px bg-dark-300 block"
              animate={{ 
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -1 : 0
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 bg-dark-950/95 backdrop-blur-xl z-40 flex flex-col justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMenuOpen(false);
                  }}
                  className={`text-3xl font-light tracking-wider transition-colors duration-300 ${
                    activePage === item.id
                      ? 'text-dark-100'
                      : 'text-dark-400'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            
            <motion.div 
              className="absolute bottom-12 left-0 right-0 flex justify-center items-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-dark-200 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-dark-200 transition-colors">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-dark-200 transition-colors">
                Twitter
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;