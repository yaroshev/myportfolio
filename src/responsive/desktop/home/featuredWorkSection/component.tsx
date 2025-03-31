import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { HomeProps, Project } from '../../../../core/types/home';
import etronImage from '../../../../shared/assets/etron.png';
import pininfarinaImage from '../../../../shared/assets/pininfarina.png';
import hydroforceImage from '../../../../shared/assets/hydroforce.png';
import rkmImage from '../../../../shared/assets/rkm.png';

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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Center the initial card on mobile
  useEffect(() => {
    if (!scrollContainerRef.current || !isMobile) return;
    
    // Set initial active card to the middle card
    const middleIndex = Math.floor(featuredProjects.length / 2);
    setActiveCardIndex(middleIndex);
    
    // Calculate scroll position to center the middle card
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = containerWidth * 0.80; // 80% of container width
    const scrollPosition = middleIndex * cardWidth;
    
    // Add a small delay to ensure the DOM is fully rendered
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }, 100);
  }, [isMobile, featuredProjects.length]);

  // Handle scroll snap on mobile
  useEffect(() => {
    if (!scrollContainerRef.current || !isMobile) return;
    
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = containerWidth * 0.80; // 80% of container width
      
      const newActiveIndex = Math.round(scrollPosition / cardWidth);
      setActiveCardIndex(Math.min(newActiveIndex, featuredProjects.length - 1));
    };
    
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, featuredProjects.length]);

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

  // Handle mouse and touch events for smooth scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-radial from-dark-800/30 via-dark-900 to-black opacity-70 z-0"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-center mb-6 md:mb-12 font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-dark-200 to-dark-300">
            Featured Work
          </span>
        </h2>
      </div>
        
      {/* Horizontal scroll container for both mobile and desktop */}
      <div className="relative z-10 overflow-visible">
        <div 
          ref={scrollContainerRef}
          className="
            flex overflow-x-auto snap-x snap-mandatory scrollbar-hide
            -mx-6 px-6 md:px-12 lg:px-16
            pb-6 md:pb-8 pt-2
            w-screen
          "
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {featuredProjects.map((project, index) => (
            <div 
              key={index}
              className={`
                relative flex-shrink-0 
                w-[80%] md:w-[335px] lg:w-[370px]
                overflow-hidden rounded-lg
                backdrop-blur-md bg-dark-800/10
                border border-dark-300/30
                transition-all duration-300 group
                hover:border-primary-500/30 active:border-primary-500/50
                ${hoveredIndex === index ? 'shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'shadow-lg'}
                cursor-pointer
                snap-center
                mr-5 md:mr-6 lg:mr-8
                transform hover:-translate-y-2
                hover:z-20
                min-h-[420px]
              `}
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
              {/* Background gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-300/5 to-accent-500/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-lg border border-primary-500/10 opacity-30 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-300 -z-5" />

              {/* Content container */}
              <div className="flex flex-col h-full">
                {/* Thumbnail with play button */}
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
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

                {/* Project info - Simplified */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-light text-dark-200">{project.title}</h3>
                    <span className="text-xs text-primary-400 uppercase tracking-wider">{project.category}</span>
                  </div>
                  
                  <p className="text-dark-400 text-sm mb-auto line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="pt-6 mt-6 border-t border-dark-300/20">
                    <div className="flex items-center justify-between">
                      <div className="text-dark-300 text-sm">
                        {Object.entries(project.metrics)[0][1]} <span className="text-dark-500">views</span>
                      </div>
                      
                      <div className="text-primary-300 text-sm hover:text-primary-400 transition-colors duration-300 flex items-center">
                        Watch
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mt-12 text-center">
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
        </div>
      </div>

      {/* Enhanced Video Lightbox - keeping animations here for better UX */}
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
      
      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Add global styles */}
      <style>{`
        .image-container {
          height: calc(100vh - 80px);
        }
        
        .video-container {
          max-height: calc(100vh - 200px);
        }
      `}</style>
    </section>
  );
};

export default FeaturedWorkSection; 