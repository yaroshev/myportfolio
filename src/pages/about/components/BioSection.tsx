import React, { RefObject, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AboutSectionProps } from '../types';

interface BioSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

const BioSection: React.FC<BioSectionProps> = ({ onCursorChange = () => {}, sectionRef }) => {
  const [modalContent, setModalContent] = useState<'story' | 'philosophy' | null>(null);
  
  const closeModal = () => {
    setModalContent(null);
    document.body.style.overflow = 'auto';
  };
  
  const openModal = (type: 'story' | 'philosophy') => {
    setModalContent(type);
    document.body.style.overflow = 'hidden';
  };
  
  return (
    <section 
      ref={sectionRef}
      id="bio"
      className="py-28 relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-radial from-primary-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:pl-24 relative z-10">
        <motion.div 
          className="flex flex-col space-y-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section title */}
          <div className="text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-light mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-dark-100 to-accent-300">
                About Me
              </span>
            </motion.h2>
            <motion.div 
              className="h-px w-20 bg-gradient-to-r from-primary-500 to-primary-500/0 mx-auto mb-6"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Bio content with cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              className="bg-dark-800/20 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/40 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
              }}
              onMouseEnter={() => onCursorChange('hover')}
              onMouseLeave={() => onCursorChange('default')}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/70 to-primary-500/0" />
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/3 rounded-full blur-2xl group-hover:bg-primary-500/5 transition-all duration-700" />
              
              <h2 className="text-2xl md:text-3xl font-display font-light mb-4 text-dark-100">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300/90 to-dark-100">
                  My Story
                </span>
              </h2>
              
              <p className="text-lg text-dark-200 mb-4 font-light">
                Digital content creator with 8+ years of experience crafting compelling brand experiences across multiple industries.
              </p>
              
              <button 
                onClick={() => openModal('story')}
                className="mt-3 text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm font-medium underline"
                onMouseEnter={() => onCursorChange('hover')}
                onMouseLeave={() => onCursorChange('default')}
              >
                Read more
              </button>
            </motion.div>
            
            <motion.div 
              className="bg-dark-800/20 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/40 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
              }}
              onMouseEnter={() => onCursorChange('hover')}
              onMouseLeave={() => onCursorChange('default')}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500/70 to-accent-500/0" />
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent-500/3 rounded-full blur-2xl group-hover:bg-accent-500/5 transition-all duration-700" />
              
              <h2 className="text-2xl md:text-3xl font-display font-light mb-4 text-dark-100">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-300/90 to-dark-100">
                  My Philosophy
                </span>
              </h2>
              
              <p className="text-lg text-dark-200 mb-4 font-light">
                Merging aesthetic design with strategic thinking to create experiences that are beautiful, functional, and results-driven.
              </p>
              
              <button 
                onClick={() => openModal('philosophy')}
                className="mt-3 text-accent-400 hover:text-accent-300 transition-colors duration-300 text-sm font-medium underline"
                onMouseEnter={() => onCursorChange('hover')}
                onMouseLeave={() => onCursorChange('default')}
              >
                Read more
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal/Lightbox */}
      <AnimatePresence>
        {modalContent && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="bg-dark-900/95 border border-dark-700 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-10">
                {modalContent === 'story' ? (
                  <>
                    <div className="flex flex-col mb-6">
                      <h3 className="text-3xl font-display font-light text-dark-100 mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-dark-100">
                My Story
              </span>
                      </h3>
                      <div className="h-px w-24 bg-gradient-to-r from-primary-500/70 to-primary-500/0" />
                    </div>
                    <div className="space-y-6 text-dark-200">
              <p>
                I am a digital content creator and marketing professional with over 8 years of experience creating compelling digital experiences that drive engagement and conversion.
              </p>
              <p>
                With a background in both technical development and creative production, I bring a unique perspective to every project, balancing aesthetic vision with practical implementation.
              </p>
              <p>
                My work spans multiple industries, from luxury automotive to retail and e-commerce, always focused on creating authentic connections between brands and their audiences.
              </p>
                      <p>
                        Throughout my career, I've led projects that have generated millions of organic impressions, developed viral brand content, and implemented automation systems that significantly improve efficiency and effectiveness.
                      </p>
                      <p>
                        I believe that the best digital experiences emerge from a deep understanding of both the brand's objectives and the audience's needs, combined with technical expertise and creative flair.
                      </p>
            </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col mb-6">
                      <h3 className="text-3xl font-display font-light text-dark-100 mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-dark-100">
                          My Philosophy
                        </span>
                      </h3>
                      <div className="h-px w-24 bg-gradient-to-r from-accent-500/70 to-accent-500/0" />
          </div>
                    <div className="space-y-6 text-dark-200">
              <p>
                I believe in creating digital experiences that are not just visually stunning, but also intuitive, accessible, and valuable to users.
              </p>
              <p>
                My approach combines data-driven strategy with creative execution, ensuring that every project not only looks great but also achieves measurable results.
              </p>
              <p>
                I'm passionate about staying at the forefront of digital trends and technologies, constantly exploring new ways to create innovative and impactful experiences.
                      </p>
                      <p>
                        For me, the most successful projects strike a balance between aesthetic appeal and functional purpose. Beautiful design should never come at the expense of usability, and technical functionality should enhance, not limit, creative expression.
                      </p>
                      <p>
                        I'm committed to creating work that doesn't just capture attention but drives meaningful engagement and delivers tangible value for both brands and their audiences.
              </p>
            </div>
                  </>
                )}
                
                <button 
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-dark-800/50 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-700 transition-all duration-300"
                  onClick={closeModal}
                  onMouseEnter={() => onCursorChange('hover')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
          </div>
        </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BioSection; 