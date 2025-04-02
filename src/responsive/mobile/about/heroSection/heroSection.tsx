import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { AboutSectionProps } from '../../../../features/about/types';
import profileImage from '../../../../shared/assets/profile.jpg';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
  setActivePage?: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCursorChange = () => {}, sectionRef, setActivePage }) => {
  const navigate = useNavigate();
  
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setActivePage) {
      setActivePage('home');
      setTimeout(() => {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 300);
    } else {
      navigate('/');
      setTimeout(() => {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="min-h-[85vh] flex items-center justify-center relative overflow-hidden px-4 pt-6 pb-12"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-dark-900/50 via-dark-950 to-black opacity-80 z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0" />
        
        {/* Static gradient background for mobile */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(64, 92, 255, 0.15) 0%, transparent 50%)',
          }}
        />
      </div>
      
      <div className="w-full relative z-10">
        <div className="flex flex-col items-center justify-center gap-8">
          <motion.div 
            className="w-full mt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto" style={{ maxWidth: "220px" }}>
              {/* Decorative elements */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl opacity-70" />
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-500/80 to-accent-500/80 opacity-50" />
              
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5" }}>
                <img 
                  src={profileImage} 
                  alt="Yaroslav Shevchenko" 
                  className="w-full h-full object-cover object-center relative z-10"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full text-center pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h1 
              className="text-4xl font-light tracking-tight mb-3 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 via-dark-100 to-accent-200">
                Yaroslav Shevchenko
              </span>
            </motion.h1>
            
            <motion.div
              className="h-px w-20 bg-gradient-to-r from-primary-500 to-primary-500/0 mb-4 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            
            <motion.div
              className="inline-block relative mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <span className="text-primary-400 text-sm tracking-wider uppercase font-light">Digital Communications Professional</span>
            </motion.div>
            
            <motion.p 
              className="text-dark-400 text-base max-w-md mb-8 font-light mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Content Creator & Digital Marketing Strategist with a passion for building beautiful, functional, and user-centered digital experiences that drive engagement and deliver results.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.button
                onClick={handleContactClick}
                className="px-6 py-3 bg-primary-500 text-dark-950 rounded-full text-sm font-medium hover:bg-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/20 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                Get in touch
              </motion.button>
              
              <motion.a
                href="/Yaroslav Shevchenko Resume.pdf"
                download="Yaroslav Shevchenko Resume.pdf"
                className="px-6 py-3 bg-dark-800 text-dark-300 rounded-full text-sm font-medium hover:bg-dark-700 transition-all duration-300 flex items-center justify-center border border-dark-700"
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path>
                </svg>
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 