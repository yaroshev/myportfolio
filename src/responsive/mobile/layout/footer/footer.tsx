import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FooterProps {
  setActivePage?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      name: 'Linktree', 
      url: 'https://linktr.ee/yaroshev',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"/>
          <path d="M17.59 6.71a.996.996 0 0 0 0 1.41L21.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L19 6.7c-.38-.38-1.02-.38-1.41.01z"/>
          <path d="M6.41 6.71c-.39-.39-1.03-.39-1.42 0L.4 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.03.39 1.42 0a.996.996 0 0 0 0-1.41L2.83 12l3.58-3.88c.39-.39.39-1.03 0-1.41z"/>
        </svg>
      )
    },
    { 
      name: 'Github', 
      url: 'https://github.com/yaroshev',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/yaro_shev/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: 'mailto:yaro.shev.3@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    }
  ];
  
  const navigationLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'work', label: 'Work', path: '/work' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'resources', label: 'Resources', path: '/resources' }
  ];

  const handleNavClick = (pageId: string) => {
    if (setActivePage) {
      setActivePage(pageId);
    }
  };

  return (
    <footer className="relative z-10 border-t border-dark-800/30 py-10 px-4 overflow-hidden backdrop-blur-sm">
      <div className="max-w-lg mx-auto">
        {/* Brand Section - Centered for mobile */}
        <div className="text-center mb-8">
          <motion.div 
            className="text-xl font-display font-light tracking-wider mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Yaroslav Shevchenko
          </motion.div>
          <motion.p 
            className="text-dark-400 text-sm mb-5 px-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Digital Creator & Web Designer with a passion for creating immersive digital experiences.
          </motion.p>
          
          {/* Social links in a single row */}
          <motion.div 
            className="flex justify-center items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-dark-700 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-400 transition-all duration-300"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
        
        {/* Navigation and Contact in 2 columns */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-dark-300 mb-4 font-medium">
              Navigation
            </h3>
            <div className="space-y-3">
              {navigationLinks.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path}
                  onClick={() => handleNavClick(item.id)}
                  className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center text-sm"
                >
                  <span className="text-primary-500 mr-2 text-xs">→</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
          
          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-dark-300 mb-4 font-medium">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="text-dark-400">
                <div className="mb-1 text-dark-300 text-xs">Email</div>
                <a 
                  href="mailto:yaro.shev.3@gmail.com" 
                  className="hover:text-primary-400 transition-colors duration-300 truncate block"
                >
                  yaro.shev.3@gmail.com
                </a>
              </div>
              <div className="text-dark-400">
                <div className="mb-1 text-dark-300 text-xs">Phone</div>
                <a 
                  href="tel:+12508808401" 
                  className="hover:text-primary-400 transition-colors duration-300"
                >
                  +1 (250) 880-8401
                </a>
              </div>
              <div className="text-dark-400">
                <div className="mb-1 text-dark-300 text-xs">Location</div>
                <div>Victoria, BC</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="border-t border-dark-800/30 pt-5 flex justify-center items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-dark-500 text-xs tracking-wider text-center">
            &copy; {currentYear} Yaroslav Shevchenko
            <br />All rights reserved.
          </p>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary-500/5 to-accent-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-3xl -z-10" />
    </footer>
  );
};

export default Footer; 