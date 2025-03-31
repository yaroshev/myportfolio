import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { AboutSectionProps } from '../../../../features/about/types';
import { timelineEvents } from '../../../../features/about/data';

interface TimelineSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ sectionRef }) => {
  // Using the original event order (most recent first)
  return (
    <section 
      ref={sectionRef}
      id="timeline"
      className="py-16 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-dark-900/0 via-primary-500/5 to-dark-900/0" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 
            className="text-3xl font-display font-light mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-primary-300">
              Professional Journey
            </span>
          </motion.h2>
          <motion.div 
            className="h-px w-20 bg-gradient-to-r from-accent-500/70 to-primary-500/70 mx-auto mb-5"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <p className="text-dark-400 text-sm max-w-md mx-auto font-light">
            My path through the digital landscape, showcasing key milestones and experiences
          </p>
        </motion.div>
        
        {/* Vertical Timeline */}
        <div className="relative pb-8">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-dark-800/60"></div>
          
          {/* Timeline items */}
          <div className="space-y-8">
            {timelineEvents.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-12"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Year bubble */}
                <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                
                {/* Year marker */}
                <div className="absolute left-10 top-1 text-xs font-medium text-primary-300">
                  {item.year}
                </div>
                
                {/* Timeline card */}
                <motion.div 
                  className="bg-dark-800/20 backdrop-blur-sm rounded-xl p-5 border border-dark-700/40 relative overflow-hidden mt-8"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500/70 to-primary-500/70" />
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/3 rounded-full blur-2xl" />
                  
                  <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                  <h4 className="text-primary-400 text-sm mb-4">{item.company}</h4>
                  
                  <div className="space-y-2 text-sm">
                    {item.description.split('. ').filter(point => point.trim()).map((point, i) => (
                      <div key={i} className="flex items-start mb-2">
                        <span className="text-primary-400 mr-2 mt-0.5">•</span>
                        <p className="text-dark-300/90 leading-relaxed">
                          {point.trim().endsWith('.') ? point.trim() : `${point.trim()}.`}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-3 mt-3 border-t border-dark-700/30">
                    <span className="text-xs uppercase tracking-wider text-dark-400">Highlights</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Strategy', 'Content', 'Analytics', 'Production'].map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-dark-700/60 text-dark-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Download CV button */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/Yaroslav Shevchenko Resume.pdf"
            download="Yaroslav Shevchenko Resume.pdf"
            className="px-6 py-3 bg-dark-800 text-dark-300 rounded-full text-sm font-medium hover:bg-primary-500 hover:text-dark-950 transition-all duration-300 flex items-center justify-center border border-primary-500/60"
            whileTap={{ scale: 0.95 }}
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