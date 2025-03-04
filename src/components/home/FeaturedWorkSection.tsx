import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeProps, Project } from '../../types/home';

interface FeaturedWorkSectionProps extends Pick<HomeProps, 'setActivePage' | 'onCursorChange'> {}

const featuredProjects: Project[] = [
  {
    title: 'Pininfarina Battista',
    category: 'Automotive',
    description: 'Exclusive coverage of the Pininfarina Battista hyper GT, showcasing this revolutionary electric hypercar with cinematic videography.',
    tags: ['Automotive', 'Luxury', 'Event Coverage'],
    metrics: { views: '250K+', engagement: '18%', reach: '400K+' },
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80',
    color: 'from-primary-500/10 to-accent-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=0LHX2jUvutc'
  },
  {
    title: 'Audi e-tron',
    category: 'Automotive',
    description: 'Dynamic showcase of the all-electric Audi e-tron, highlighting its innovative features and performance capabilities through compelling visual storytelling.',
    tags: ['Automotive', 'Electric Vehicles', 'Commercial'],
    metrics: { views: '180K+', engagement: '15%', reach: '320K+' },
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    color: 'from-accent-500/10 to-primary-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=E9vsUKmagRA'
  },
  {
    title: 'RKM Cranes',
    category: 'Industrial',
    description: 'Spectacular footage of a house lift using a 160-ton crane, showcasing the precision and power of heavy machinery in action.',
    tags: ['Industrial', 'Construction', 'Viral Content'],
    metrics: { views: '1.5M+', engagement: '22%', reach: '3M+' },
    image: 'https://images.unsplash.com/photo-1566342088293-38debd381c63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    color: 'from-primary-500/10 to-accent-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=9n86xwm6MxE&t=3s'
  },
  {
    title: 'Hydroforce Excavating',
    category: 'Construction',
    description: 'Professional promotional video for Hydroforce Excavating, highlighting their expertise in excavation services with compelling visual storytelling.',
    tags: ['Construction', 'Promotional', 'Corporate'],
    metrics: { views: '75K+', engagement: '14%', reach: '150K+' },
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: 'from-accent-500/10 to-primary-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=jogaasTnlwU'
  }
];

const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({ setActivePage, onCursorChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [portfolioHovered, setPortfolioHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center the scroll container on load
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const contentWidth = scrollContainerRef.current.scrollWidth;
      if (contentWidth > containerWidth) {
        scrollContainerRef.current.scrollLeft = (contentWidth - containerWidth) / 2;
      }
    }
  }, []);

  const openVideoLightbox = (url: string, project: Project) => {
    // Extract video ID from YouTube URL
    const videoId = url.includes('watch?v=') 
      ? url.split('watch?v=')[1].split('&')[0]
      : url.split('/').pop();
    
    if (videoId) {
      setSelectedVideo(videoId);
      setSelectedProject(project);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeVideoLightbox = () => {
    setSelectedVideo(null);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <motion.section 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-radial from-dark-800/30 via-dark-900 to-black opacity-70 z-0" />
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-3xl font-light tracking-tight text-center mb-12 font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-dark-200 to-dark-300">
            Featured Work
          </span>
        </motion.h2>
      </div>
        
      <div 
        ref={scrollContainerRef}
        className="w-full px-6 overflow-x-auto py-12 hide-scrollbar"
      >
        <div className="flex flex-nowrap gap-6 mx-auto" style={{ width: 'fit-content' }}>
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={index}
              className={`
                relative flex-none w-[300px] md:w-[350px]
                overflow-hidden rounded-lg
                backdrop-blur-md bg-dark-800/10
                border border-dark-300/30
                transition-all duration-300 group z-10
                hover:border-transparent
                ${hoveredIndex === index ? 'shadow-[0_0_25px_rgba(255,255,255,0.2)]' : 'shadow-lg'}
                cursor-pointer
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.08,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              onClick={() => openVideoLightbox(project.videoUrl, project)}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onCursorChange('button');
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onCursorChange('default');
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-10" />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-5`} />
              
              {/* Thumbnail with play button */}
              <div 
                className="relative aspect-video overflow-hidden"
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-dark-900/30 group-hover:bg-dark-900/10 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-dark-900/70 backdrop-blur-sm flex items-center justify-center border border-primary-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-500/20">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Project info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-light text-dark-200">{project.title}</h3>
                  <span className="text-xs text-primary-400 uppercase tracking-wider">{project.category}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-0.5 bg-dark-800/50 rounded-full text-xs text-primary-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center pt-3 border-t border-dark-300/20">
                  <div className="flex space-x-4">
                    {Object.entries(project.metrics).map(([key, value], index) => (
                      <div key={index} className="text-center">
                        <div className="text-primary-400 text-sm font-medium">{value}</div>
                        <div className="text-dark-500 text-xs capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className="text-primary-300 text-sm hover:text-primary-400 transition-colors duration-300 flex items-center"
                  >
                    Watch
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative inline-block">
            <button 
              onClick={() => setActivePage('work')}
              className="relative z-10 text-sm uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300"
              onMouseEnter={() => {
                setPortfolioHovered(true);
                onCursorChange('button');
              }}
              onMouseLeave={() => {
                setPortfolioHovered(false);
                onCursorChange('default');
              }}
              style={{
                textShadow: portfolioHovered ? 'none' : '0 0 8px rgba(255, 255, 255, 0.2)'
              }}
            >
              Explore Full Portfolio
            </button>
            <div 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out"
              style={{ 
                width: portfolioHovered ? '100%' : '20%'
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Video Lightbox */}
      <AnimatePresence>
        {selectedVideo && selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeVideoLightbox}
          >
            <motion.div 
              className="relative w-full max-w-6xl bg-dark-900/90 rounded-xl overflow-hidden border border-dark-300/30 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeVideoLightbox}
                className="absolute top-4 right-4 text-dark-400 hover:text-primary-300 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row h-full">
                {/* Video Side */}
                <div className="w-full md:w-2/3 aspect-video md:aspect-auto md:h-[600px]">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md">
                  <div className="mb-2">
                    <span className="text-xs text-primary-400 uppercase tracking-wider">{selectedProject.category}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-light text-dark-200 mb-4">{selectedProject.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-dark-800/50 rounded-full text-xs text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-dark-300 mb-8">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mt-auto">
                    <h3 className="text-dark-200 text-sm mb-4 uppercase tracking-wider">Project Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(selectedProject.metrics).map(([key, value], index) => (
                        <div key={index} className="text-center p-3 bg-dark-800/30 rounded-lg">
                          <div className="text-primary-400 text-xl font-medium mb-1">{value}</div>
                          <div className="text-dark-400 text-xs capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-dark-300/20">
                      <div className="flex items-center justify-between">
                        <div className="text-dark-400 text-sm">Share this project:</div>
                        <div className="flex space-x-4">
                          <button className="text-dark-400 hover:text-primary-300 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          </button>
                          <button className="text-dark-400 hover:text-primary-300 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                            </svg>
                          </button>
                          <button className="text-dark-400 hover:text-primary-300 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default FeaturedWorkSection; 