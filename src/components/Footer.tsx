import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Github', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Email', url: 'mailto:contact@example.com' }
  ];
  
  const footerLinks = [
    { name: 'Privacy Policy', url: '#' },
    { name: 'Terms of Service', url: '#' },
    { name: 'Sitemap', url: '#' }
  ];

  return (
    <motion.footer 
      className="relative z-10 border-t border-dark-800/30 py-16 px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <motion.div 
              className="text-2xl font-display font-light tracking-wider mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Yaroslav Shevchenko
            </motion.div>
            <motion.p 
              className="text-dark-400 text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Digital Creator & Web Designer with a passion for creating immersive digital experiences that push the boundaries of what's possible on the web.
            </motion.p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-dark-700 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.name.charAt(0)}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Navigation Column */}
          <div>
            <motion.h3 
              className="text-sm uppercase tracking-wider text-dark-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Navigation
            </motion.h3>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {['Home', 'Work', 'About', 'Resources'].map((item, index) => (
                <motion.div 
                  key={index}
                  className="text-dark-400 hover:text-primary-400 transition-colors duration-300 flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-primary-500 mr-2 text-xs">→</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Contact Column */}
          <div>
            <motion.h3 
              className="text-sm uppercase tracking-wider text-dark-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.h3>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-dark-400">
                <div className="mb-1 text-dark-300">Email</div>
                <a 
                  href="mailto:contact@example.com" 
                  className="hover:text-primary-400 transition-colors duration-300"
                >
                  contact@example.com
                </a>
              </div>
              <div className="text-dark-400">
                <div className="mb-1 text-dark-300">Location</div>
                <div>San Francisco, CA</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="border-t border-dark-800/30 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-dark-500 text-xs tracking-wider mb-4 md:mb-0">
            &copy; {currentYear} Yaroslav Shevchenko. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {footerLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                className="text-dark-500 text-xs tracking-wider hover:text-primary-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-primary-500/5 to-accent-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-3xl -z-10" />
      </div>
    </motion.footer>
  );
};

export default Footer;