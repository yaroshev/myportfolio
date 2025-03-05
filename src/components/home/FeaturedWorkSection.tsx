import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { HomeProps, Project } from '../../types/home';
import etronImage from '../../assets/etron.png';
import pininfarinaImage from '../../assets/pininfarina.png';
import hydroforceImage from '../../assets/hydroforce.png';
import rkmImage from '../../assets/rkm.png';

interface FeaturedWorkSectionProps extends Pick<HomeProps, 'setActivePage' | 'onCursorChange'> {}

const featuredProjects: Project[] = [
  {
    title: 'Pininfarina Battista',
    category: 'Automotive',
    description: 'Exclusive coverage of the Pininfarina Battista hyper GT, showcasing this revolutionary electric hypercar with cinematic videography.',
    tags: ['Automotive', 'Luxury', 'Event Coverage'],
    metrics: { views: '250K+', engagement: '18%', reach: '400K+' },
    image: pininfarinaImage,
    color: 'from-primary-500/10 to-accent-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=0LHX2jUvutc'
  },
  {
    title: 'Audi e-tron',
    category: 'Automotive',
    description: 'Dynamic showcase of the all-electric Audi e-tron, highlighting its innovative features and performance capabilities through compelling visual storytelling.',
    tags: ['Automotive', 'Electric Vehicles', 'Commercial'],
    metrics: { views: '180K+', engagement: '15%', reach: '320K+' },
    image: etronImage,
    color: 'from-accent-500/10 to-primary-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=E9vsUKmagRA'
  },
  {
    title: 'RKM Cranes',
    category: 'Industrial',
    description: 'Spectacular footage of a house lift using a 160-ton crane, showcasing the precision and power of heavy machinery in action.',
    tags: ['Industrial', 'Construction', 'Viral Content'],
    metrics: { views: '1.5M+', engagement: '22%', reach: '3M+' },
    image: rkmImage,
    color: 'from-primary-500/10 to-accent-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=9n86xwm6MxE&t=3s'
  },
  {
    title: 'Hydroforce Excavating',
    category: 'Construction',
    description: 'Professional promotional video for Hydroforce Excavating, highlighting their expertise in excavation services with compelling visual storytelling.',
    tags: ['Construction', 'Promotional', 'Corporate'],
    metrics: { views: '75K+', engagement: '14%', reach: '150K+' },
    image: hydroforceImage,
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
      style={{
        willChange: 'opacity',
        transform: 'translateZ(0)'
      }}
    >
      <div 
        className="absolute inset-0 bg-gradient-radial from-dark-800/30 via-dark-900 to-black opacity-70 z-0"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          will-change: transform;
          transform: translateZ(0);
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
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
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
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
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
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                  }}
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
      {selectedVideo && selectedProject && createPortal(
        <AnimatePresence>
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeVideoLightbox}
            style={{
              willChange: 'opacity',
              transform: 'translateZ(0)'
            }}
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
                        className="px-2 py-0.5 bg-dark-800/50 rounded-full text-xs text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-dark-400 text-sm mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="text-lg text-dark-300 mb-2">Project Metrics</div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedProject.metrics).map(([key, value], index) => (
                        <div key={index} className="flex flex-col">
                          <div className="text-primary-400 text-lg font-medium">{value}</div>
                          <div className="text-dark-500 text-xs capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </motion.section>
  );
};

export default FeaturedWorkSection; 