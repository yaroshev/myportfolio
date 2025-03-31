import React, { RefObject, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AboutSectionProps } from '../../../../features/about/types';
import { timelineEvents } from '../../../../features/about/data';

interface TimelineSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ onCursorChange = () => {}, sectionRef }) => {
  // Setting initial active event to most recent (first in the original array)
  const [activeEvent, setActiveEvent] = useState(0);
  
  // Create a reversed array for display purposes
  const reversedEvents = [...timelineEvents].reverse();
  
  return (
    <section 
      ref={sectionRef}
      id="timeline"
      className="py-28 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-dark-900/0 via-primary-500/5 to-dark-900/0" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:pl-24 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-light mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-primary-300">
              Professional Journey
            </span>
          </motion.h2>
          <motion.div 
            className="h-px w-24 bg-gradient-to-r from-accent-500/70 to-primary-500/70 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <p className="text-dark-400 max-w-2xl mx-auto font-light">
            My path through the digital landscape, showcasing key milestones and experiences
          </p>
        </motion.div>
        
        {/* Interactive Timeline Navigation */}
        <div className="mb-16">
          <div className="relative flex items-center justify-between max-w-3xl mx-auto">
            {/* Timeline bar */}
            <div className="absolute left-0 right-0 h-0.5 bg-dark-800/60"></div>
            
            {/* Progress bar */}
            <motion.div 
              className="absolute left-0 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((timelineEvents.length - 1 - activeEvent) / (timelineEvents.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            
            {/* Year markers */}
            {reversedEvents.map((item, index) => {
              // Calculate the corresponding index in the original array
              const originalIndex = timelineEvents.length - 1 - index;
              
              return (
                <div 
                  key={originalIndex} 
                  className="relative z-10"
                >
                  <motion.button
                    className={`w-8 h-8 rounded-full flex items-center justify-center relative ${
                      originalIndex >= activeEvent ? 'bg-gradient-to-r from-accent-500 to-primary-500' : 'bg-dark-800'
                    }`}
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: "0 0 15px rgba(121, 40, 202, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveEvent(originalIndex)}
                    onMouseEnter={() => onCursorChange('hover')}
                    onMouseLeave={() => onCursorChange('default')}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      originalIndex === activeEvent ? 'bg-white' : 'bg-dark-900'
                    }`}></div>
                  </motion.button>
                  <div className={`absolute top-full mt-2 text-sm font-medium transition-colors ${
                    originalIndex === activeEvent ? 'text-primary-300' : 'text-dark-400'
                  }`}>
                    {item.year.split(' - ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Content Display */}
        <div className="relative min-h-[250px] mb-16">
          <AnimatePresence mode="wait">
            {timelineEvents.map((item, index) => (
              activeEvent === index && (
                <motion.div
                  key={item.company}
                  className="bg-dark-800/20 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/40 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500/70 to-primary-500/70" />
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/3 rounded-full blur-2xl" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <span className="text-lg font-display inline-block mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-primary-300">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                      <h4 className="text-primary-400 mb-6">{item.company}</h4>
                    </div>
                    <div className="md:col-span-2">
                      <div className="space-y-4">
                        <div className="text-dark-300/90 leading-relaxed">
                          {item.description.split('. ').filter(point => point.trim()).map((point, i) => (
                            <div key={i} className="flex items-start mb-3">
                              <span className="text-primary-400 mr-2 mt-1">•</span>
                              <p>{point.trim().endsWith('.') ? point.trim() : `${point.trim()}.`}</p>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4">
                          <span className="text-xs uppercase tracking-wider text-dark-400">Highlights</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {['Strategy', 'Content', 'Analytics', 'Production'].map((tag) => (
                              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-dark-700/60 text-dark-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Download CV button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/Yaroslav Shevchenko Resume.pdf"
            download="Yaroslav Shevchenko Resume.pdf"
            className="px-6 py-3 bg-dark-800 text-dark-300 rounded-full text-sm font-medium hover:bg-primary-500 hover:text-dark-950 transition-all duration-300 flex items-center border border-primary-500/60 shadow-lg shadow-primary-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => onCursorChange('hover')}
            onMouseLeave={() => onCursorChange('default')}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path>
            </svg>
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;