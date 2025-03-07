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
                    ? 'text-primary-400'
                    : 'text-dark-400 hover:text-dark-200'
                }`}
              >
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
            className="md:hidden text-dark-400 w-10 h-10 flex flex-col justify-center items-center relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <motion.span 
                className="absolute w-6 h-[1.5px] bg-dark-300 block"
                animate={{ 
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 0 : -5
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="absolute w-6 h-[1.5px] bg-dark-300 block"
                animate={{ 
                  opacity: menuOpen ? 0 : 1,
                  x: menuOpen ? -10 : 0
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="absolute w-6 h-[1.5px] bg-dark-300 block"
                animate={{ 
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? 0 : 5
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
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
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Decorative elements that match the site's aesthetic */}
              <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-tr from-accent-500/5 to-primary-500/5 rounded-full blur-3xl"></div>
              
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
            </div>
            
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => {
                      setActivePage(item.id);
                      setMenuOpen(false);
                    }}
                    className={`text-2xl font-light tracking-wider transition-colors duration-300 ${
                      activePage === item.id
                        ? 'text-primary-400'
                        : 'text-dark-300'
                    }`}
                    whileHover={{ 
                      color: '#fff',
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                  
                  {/* Underline effect similar to desktop nav */}
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
              ))}
            </nav>
            
            {/* Social links in mobile menu */}
            <motion.div 
              className="absolute bottom-16 left-0 right-0 flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <a 
                href="https://www.instagram.com/yaro_shev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-dark-700 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-400 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="mailto:yaro.shev.3@gmail.com" 
                className="w-10 h-10 rounded-full border border-dark-700 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-400 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </motion.div>
            
            {/* Status indicator in mobile menu */}
            <motion.div 
              className="absolute bottom-8 left-0 right-0 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                <span className="text-xs text-dark-400">Available for work</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;