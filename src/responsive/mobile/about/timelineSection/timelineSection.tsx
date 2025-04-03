import React, { RefObject, useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useReducedMotion } from 'framer-motion';
import { AboutSectionProps } from '../../../../features/about/types';
import { timelineEvents } from '../../../../features/about/data';

interface TimelineSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ sectionRef }) => {
  // Setting active event state
  const [activeEvent, setActiveEvent] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Handle swipe gestures
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50 && activeEvent > 0) {
      // Swipe right - go to previous
      setActiveEvent(prev => prev - 1);
    } else if (info.offset.x < -50 && activeEvent < timelineEvents.length - 1) {
      // Swipe left - go to next
      setActiveEvent(prev => prev + 1);
    }
  };

  // Memoize the reversed timeline to display years in chronological order (2016-2024)
  const chronologicalTimeline = [...timelineEvents].reverse();
  
  return (
    <section 
      ref={sectionRef}
      id="timeline"
      className="py-14 relative overflow-hidden will-change-transform"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-dark-900/0 via-primary-500/5 to-dark-900/0" />
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -left-40 top-40 w-80 h-80 bg-gradient-radial from-primary-500/3 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="px-4 relative z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.1, 0.25, 1],
            when: "beforeChildren"
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 
            className="text-3xl font-display font-light mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-primary-300">
              Professional Journey
            </span>
          </motion.h2>
          <motion.div 
            className="h-px w-20 bg-gradient-to-r from-accent-500/70 to-primary-500/70 mx-auto mb-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          <p className="text-dark-400 text-sm max-w-md mx-auto font-light">
            My path through the digital landscape, showcasing key milestones
          </p>
        </motion.div>
        
        {/* Interactive Timeline Navigation - Reversed order display */}
        <div className="mb-6">
          <div className="relative flex items-center justify-between max-w-xs mx-auto px-2 py-4">
            {/* Timeline bar */}
            <div className="absolute left-0 right-0 h-0.5 bg-dark-800/60"></div>
            
            {/* Progress bar - updated to reflect the reverse order */}
            <motion.div 
              className="absolute left-0 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeEvent / (chronologicalTimeline.length - 1)) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            ></motion.div>
            
            {/* Year markers in chronological order */}
            {chronologicalTimeline.map((item, index) => (
              <div 
                key={index} 
                className="relative z-10"
              >
                <motion.button
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md shadow-primary-500/10 border ${
                    index <= activeEvent 
                      ? 'bg-gradient-to-r from-accent-500 to-primary-500 border-accent-400' 
                      : 'bg-dark-800 border-dark-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 25 
                  }}
                  onClick={() => setActiveEvent(index)}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    index === activeEvent ? 'bg-white' : 'bg-dark-900'
                  }`}></div>
                </motion.button>
                <div className={`absolute top-full mt-2 text-xs font-medium transition-colors duration-300 whitespace-nowrap ${
                  index === activeEvent ? 'text-primary-300' : 'text-dark-400'
                }`} style={{ transform: 'translateX(-50%)', left: '50%' }}>
                  {item.year.split(' - ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content Display with AnimatePresence */}
        <div 
          ref={contentRef}
          className="relative min-h-[260px] mb-10"
        >
          <motion.div
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="touch-pan-y will-change-transform"
          >
            <AnimatePresence mode="wait" initial={false}>
              {chronologicalTimeline.map((item, index) => (
                activeEvent === index && (
                  <motion.div
                    key={item.company}
                    className="bg-dark-800/30 backdrop-blur-sm rounded-xl p-5 border border-dark-700/40 relative overflow-hidden"
                    initial={{ opacity: 0, y: 5, x: 25 * Math.sign(index - activeEvent) }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -5, x: -25 * Math.sign(index - activeEvent) }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8
                    }}
                    style={{ 
                      willChange: "opacity, transform",
                      backfaceVisibility: "hidden" 
                    }}
                  >
                    {/* Enhanced decorative accents */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500/70 to-primary-500/70" />
                    <motion.div 
                      className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/5 rounded-full blur-2xl" 
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    
                    <div>
                      <span className="text-lg font-display inline-block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-primary-300">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                      <h4 className="text-primary-400 text-sm mb-3">{item.company}</h4>
                      
                      <div className="space-y-2 text-sm">
                        {item.description.split('. ').filter(point => point.trim()).map((point, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-start mb-1.5"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.2, 
                              delay: 0.08 + i * 0.04,
                              ease: "easeOut" 
                            }}
                          >
                            <motion.span 
                              className="text-primary-400 mr-2 mt-0.5 opacity-70"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.08 + i * 0.04 }}
                            >•</motion.span>
                            <p className="text-dark-300/90 leading-relaxed">
                              {point.trim().endsWith('.') ? point.trim() : `${point.trim()}.`}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="pt-3 mt-3 border-t border-dark-700/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                      >
                        <span className="text-xs uppercase tracking-wider text-dark-400">Highlights</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {['Strategy', 'Content', 'Analytics', 'Production'].map((tag, i) => (
                            <motion.span 
                              key={tag} 
                              className="text-xs px-2.5 py-0.5 rounded-full bg-dark-700/70 text-dark-300 border border-dark-600/20"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.2, 
                                delay: 0.25 + i * 0.05,
                                ease: "easeOut" 
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Download CV button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/Yaroslav Shevchenko Resume.pdf"
            download="Yaroslav Shevchenko Resume.pdf"
            className="px-7 py-3 bg-dark-800/80 text-dark-300 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-accent-500 hover:to-primary-500 hover:text-dark-950 transition-all duration-300 flex items-center justify-center border border-primary-500/60 shadow-md shadow-primary-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
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