import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MobileHeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  scrollY: number;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  activePage, 
  setActivePage, 
  scrollY = 0 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());
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

  return (
    <motion.header 
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.div 
        className="relative max-w-5xl w-full rounded-full py-2.5"
      >
        {/* Base background with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md border border-dark-800/30 shadow-lg" />

        <div className="relative flex justify-between items-center px-4">
          <Link to="/" onClick={() => setActivePage('home')}>
            <motion.div 
              className="font-display text-lg tracking-wider cursor-pointer transition-opacity duration-300 flex items-center" 
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative overflow-hidden">
                <span className="text-gray-200">Y</span>
                <span className="text-gray-200">S</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 to-gray-300"
                  initial={{ scaleX: 0 }}
                  whileTap={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button 
            className="text-dark-400 w-10 h-10 flex flex-col justify-center items-center relative z-50"
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

      {/* Mobile Navigation Menu */}
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
              {/* Decorative elements */}
              <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-tr from-accent-500/5 to-primary-500/5 rounded-full blur-3xl"></div>
              
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
            </div>
            
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <Link 
                  key={item.id} 
                  to={item.path}
                  onClick={() => {
                    setActivePage(item.id);
                    setMenuOpen(false);
                  }}
                  className={`text-2xl font-light tracking-wider ${
                    activePage === item.id 
                      ? 'text-primary-400' 
                      : 'text-dark-300 hover:text-dark-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default MobileHeader; 