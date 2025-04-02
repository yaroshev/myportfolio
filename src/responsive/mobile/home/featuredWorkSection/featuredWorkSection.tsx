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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Center the initial card on load
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    // Set initial active card to the middle card
    const middleIndex = Math.floor(featuredProjects.length / 2);
    setActiveCardIndex(middleIndex);
    setActiveIndex(middleIndex); // Also set activeIndex to middle card initially
    
    // Calculate scroll position to center the middle card
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = containerWidth * 0.80; // 80% of container width
    const spacerWidth = containerWidth * 0.10; // 10% of container width (spacer)
    const marginWidth = containerWidth * 0.025; // 2.5% of container width (margin)
    
    // Position to the middle card taking into account the spacer at start and margins
    const scrollPosition = spacerWidth + (middleIndex * (cardWidth + 2 * marginWidth));
    
    // Add a small delay to ensure the DOM is fully rendered
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }, 100);
  }, [featuredProjects.length]);

  // Handle scroll snap
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = containerWidth * 0.80; // 80% of container width
      const spacerWidth = containerWidth * 0.10; // 10% of container width
      const marginWidth = containerWidth * 0.025; // 2.5% of container width
      
      // Account for the spacer at the beginning
      const adjustedScrollPosition = scrollPosition - spacerWidth;
      
      // Calculate the index considering all widths (card + margins)
      const newActiveIndex = Math.round(adjustedScrollPosition / (cardWidth + 2 * marginWidth));
      const limitedActiveIndex = Math.max(0, Math.min(newActiveIndex, featuredProjects.length - 1));
      
      setActiveCardIndex(limitedActiveIndex);
      setActiveIndex(limitedActiveIndex); // Update active index to match center card
    };
    
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [featuredProjects.length]);

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

  // Touch events for smooth scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
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
    <section className="py-12 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-radial from-dark-800/30 via-dark-900 to-black opacity-70 z-0"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-2xl font-light tracking-tight text-center mb-6 font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-dark-200 to-dark-300">
            Featured Work
          </span>
        </h2>
      </div>
        
      {/* Horizontal scroll container */}
      <div className="relative z-10 overflow-visible">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 pb-6 pt-2"
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
          {/* Add an empty spacer div at the start for better centering of first card */}
          <div className="flex-shrink-0 w-[10vw]" />
          
          {featuredProjects.map((project, index) => (
            <div 
              key={index}
              className={`
                relative flex-shrink-0 
                w-[80%]
                overflow-hidden rounded-lg
                bg-dark-800/30
                border border-dark-700/50
                transition-all duration-300
                ${activeCardIndex === index ? 'border-primary-500/30 shadow-[0_0_10px_rgba(56,189,248,0.1)]' : ''}
                cursor-pointer
                snap-center
                mx-[2.5vw]
                min-h-[420px]
              `}
              onClick={() => openVideoLightbox(project.videoUrl, project)}
              onTouchStart={() => setActiveCardIndex(index)}
              onTouchEnd={() => {}}
            >
              {/* Active state highlight */}
              {activeCardIndex === index && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/5 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Project thumbnail */}
              <div className="w-full h-48 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80" />
                <div className="absolute left-4 bottom-3 z-10">
                  <div className="text-dark-300 text-sm">{project.category}</div>
                </div>
                
                {/* Play button over image */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-dark-900/70 flex items-center justify-center border border-dark-300/30 backdrop-blur-sm">
                    <svg className="w-5 h-5 text-primary-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-dark-100 mb-2">{project.title}</h3>
                <p className="text-dark-400 text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.description.length > 120 
                    ? project.description.substring(0, 120) + '...' 
                    : project.description
                  }
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs bg-dark-800/70 text-dark-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Metrics */}
                <div className="flex justify-between mt-auto pt-4 border-t border-dark-300/20">
                  <div>
                    <div className="text-xs text-dark-400">Views</div>
                    <div className="text-primary-300">{project.metrics.views}</div>
                  </div>
                  <div>
                    <div className="text-xs text-dark-400">Engagement</div>
                    <div className="text-primary-300">{project.metrics.engagement}</div>
                  </div>
                  <div>
                    <div className="text-xs text-dark-400">Reach</div>
                    <div className="text-primary-300">{project.metrics.reach}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add an empty spacer div at the end for better centering of last card */}
          <div className="flex-shrink-0 w-[10vw]" />
        </div>
        
        {/* Scroll indicators */}
        <div className="flex justify-center gap-3 mt-2">
          {featuredProjects.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === index 
                  ? 'bg-primary-400 w-6' 
                  : 'bg-dark-600 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Video lightbox */}
      {selectedVideo && selectedProject && createPortal(
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4">
            <button 
              onClick={closeVideoLightbox}
              className="w-10 h-10 rounded-full bg-dark-800/70 flex items-center justify-center text-dark-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="w-full max-w-5xl">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-2xl border border-dark-700">
              <iframe
                title={selectedProject.title}
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            
            <div className="mt-6 px-4">
              <h3 className="text-xl text-primary-300 font-light mb-2">{selectedProject.title}</h3>
              <p className="text-dark-400 text-sm mb-3">{selectedProject.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-xs bg-dark-800/70 text-dark-300 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>,
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
    </section>
  );
};

export default FeaturedWorkSection; 