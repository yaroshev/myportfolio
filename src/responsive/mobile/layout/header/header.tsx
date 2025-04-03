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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6"
    >
      <motion.div 
        className={`relative max-w-5xl w-full rounded-2xl overflow-hidden transition-all duration-300 ${
          scrolled ? 'bg-dark-900/95 backdrop-blur-lg shadow-lg' : 'bg-dark-900/20 backdrop-blur-sm'
        }`}
        initial={{ borderRadius: '1rem' }}
        animate={{ height: 'auto' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Base background with gradient */}
        <div className={`absolute inset-0 rounded-2xl ${
          scrolled 
            ? 'border border-dark-800/50' 
            : 'bg-gradient-to-br from-dark-800/10 to-dark-900/20 border border-dark-700/20'
        } shadow-lg`} />

        <div className="relative flex justify-between items-center px-6 py-2.5">
          <Link to="/" onClick={() => setActivePage('home')}>
            <motion.div 
              className="font-display text-lg tracking-wider cursor-pointer transition-opacity duration-300 flex items-center" 
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative overflow-hidden ml-2">
                <span className="text-gray-200">Y</span>
                <span className="text-gray-200">S</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-400 to-accent-400"
                  initial={{ scaleX: 0 }}
                  whileTap={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button 
            className="text-dark-400 w-12 h-12 flex flex-col justify-center items-center relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <motion.span 
                className="absolute w-6 h-[2px] bg-dark-200 block"
                animate={{ 
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 0 : -5,
                  backgroundColor: menuOpen ? "#a3a8b8" : "#a3a8b8",
                  width: 24
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.span 
                className="absolute w-6 h-[2px] bg-dark-200 block"
                animate={{ 
                  opacity: menuOpen ? 0 : 1,
                  x: menuOpen ? -10 : 0,
                  width: menuOpen ? 0 : 24,
                  backgroundColor: "#a3a8b8"
                }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.span 
                className="absolute w-6 h-[2px] bg-dark-200 block"
                animate={{ 
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? 0 : 5,
                  backgroundColor: menuOpen ? "#a3a8b8" : "#a3a8b8",
                  width: 24
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </motion.button>
        </div>

        {/* Menu Content - Part of the navbar */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.1, 0.25, 1],
                opacity: { duration: 0.2 }
              }}
            >
              <div className="relative py-4 px-6 border-t border-dark-800/30">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div 
                    className="absolute top-1/4 -right-32 w-60 h-60 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                  <motion.div 
                    className="absolute bottom-1/4 -left-32 w-60 h-60 bg-gradient-to-tr from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
                </div>
                
                <nav className="relative z-10 flex flex-col space-y-5 pt-2 pb-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15, x: -5 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ 
                        duration: 0.45, 
                        delay: 0.1 + index * 0.08,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className="relative"
                    >
                      <Link 
                        to={item.path}
                        onClick={() => {
                          setActivePage(item.id);
                          setMenuOpen(false);
                        }}
                        className="block"
                      >
                        <div className="flex items-center">
                          <motion.span 
                            className={`text-xs font-mono mr-4 ${
                              activePage === item.id ? 'text-primary-400' : 'text-dark-400'
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                          >0{index + 1}</motion.span>
                          {activePage === item.id && (
                            <motion.div 
                              className="w-1 h-8 bg-gradient-to-b from-primary-400 to-accent-400 rounded-full mr-4"
                              layoutId="activeNavIndicator"
                              initial={{ opacity: 0, scaleY: 0.7 }}
                              animate={{ opacity: 1, scaleY: 1 }}
                              transition={{ duration: 0.35 }}
                            />
                          )}
                          <span className={`text-xl font-light tracking-wide ${
                            activePage === item.id 
                              ? 'text-white font-normal' 
                              : 'text-dark-300'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Footer with social links */}
                <motion.div 
                  className="relative z-10 mt-2 pt-4 border-t border-dark-800/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-dark-400 text-xs">
                      © {new Date().getFullYear()}
                    </div>
                    <div className="flex space-x-4">
                      {['Twitter', 'LinkedIn', 'Instagram'].map((social, i) => (
                        <motion.a 
                          key={social} 
                          href="#" 
                          className="text-dark-400 hover:text-dark-200 text-xs transition-colors duration-200"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                        >
                          {social}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
};

export default MobileHeader; 