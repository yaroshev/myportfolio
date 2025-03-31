import React, { RefObject, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AboutSectionProps } from '../../../../features/about/types';

interface BioSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

const BioSection: React.FC<BioSectionProps> = ({ sectionRef }) => {
  const [modalContent, setModalContent] = useState<'story' | 'philosophy' | null>(null);
  
  const closeModal = () => {
    setModalContent(null);
    document.body.style.overflow = 'auto';
  };
  
  const openModal = (type: 'story' | 'philosophy') => {
    setModalContent(type);
    document.body.style.overflow = 'hidden';
  };

  // Close modal when back button is pressed
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      if (modalContent) {
        e.preventDefault();
        closeModal();
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    if (modalContent) {
      window.history.pushState(null, '', window.location.pathname);
      window.addEventListener('popstate', handleBackButton);
    }

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [modalContent]);
  
  return (
    <section 
      ref={sectionRef}
      id="bio"
      className="py-16 relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-radial from-primary-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="px-4 relative z-10">
        <motion.div 
          className="flex flex-col space-y-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Section title */}
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-display font-light mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-dark-100 to-accent-300">
                About Me
              </span>
            </motion.h2>
            <motion.div 
              className="h-px w-16 bg-gradient-to-r from-primary-500 to-primary-500/0 mx-auto mb-5"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Bio content with cards */}
          <div className="flex flex-col gap-6">
            <motion.div 
              className="bg-dark-800/20 backdrop-blur-sm rounded-xl p-6 border border-dark-700/40 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/70 to-primary-500/0" />
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/3 rounded-full blur-2xl" />
              
              <h2 className="text-xl font-display font-light mb-3 text-dark-100">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300/90 to-dark-100">
                  My Story
                </span>
              </h2>
              
              <p className="text-base text-dark-200 mb-3 font-light">
                Digital content creator with 8+ years of experience crafting compelling brand experiences across multiple industries.
              </p>
              
              <button 
                onClick={() => openModal('story')}
                className="mt-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm font-medium underline"
              >
                Read more
              </button>
            </motion.div>
            
            <motion.div 
              className="bg-dark-800/20 backdrop-blur-sm rounded-xl p-6 border border-dark-700/40 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500/70 to-accent-500/0" />
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent-500/3 rounded-full blur-2xl" />
              
              <h2 className="text-xl font-display font-light mb-3 text-dark-100">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-300/90 to-dark-100">
                  My Philosophy
                </span>
              </h2>
              
              <p className="text-base text-dark-200 mb-3 font-light">
                Merging aesthetic design with strategic thinking to create experiences that are beautiful, functional, and results-driven.
              </p>
              
              <button 
                onClick={() => openModal('philosophy')}
                className="mt-2 text-accent-400 hover:text-accent-300 transition-colors duration-300 text-sm font-medium underline"
              >
                Read more
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Modal/Lightbox */}
      <AnimatePresence>
        {modalContent && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="bg-dark-900 border-t border-dark-700 rounded-t-2xl max-h-[85vh] overflow-y-auto relative"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-10 px-5">
                {/* Drag indicator */}
                <div className="w-12 h-1 bg-dark-700 rounded-full mx-auto absolute top-3 left-0 right-0"></div>
                
                {modalContent === 'story' ? (
                  <>
                    <div className="flex flex-col mb-5">
                      <h3 className="text-2xl font-display font-light text-dark-100 mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-dark-100">
                          My Story
                        </span>
                      </h3>
                      <div className="h-px w-20 bg-gradient-to-r from-primary-500/70 to-primary-500/0" />
                    </div>
                    <div className="space-y-4 text-dark-200 text-sm">
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
                    <div className="flex flex-col mb-5">
                      <h3 className="text-2xl font-display font-light text-dark-100 mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-dark-100">
                          My Philosophy
                        </span>
                      </h3>
                      <div className="h-px w-20 bg-gradient-to-r from-accent-500/70 to-accent-500/0" />
                    </div>
                    <div className="space-y-4 text-dark-200 text-sm">
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
                  className="mt-6 mx-auto block px-8 py-2.5 rounded-full bg-dark-800 text-dark-300 hover:bg-dark-700 border border-dark-700 transition-all duration-300 text-sm"
                  onClick={closeModal}
                >
                  Close
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