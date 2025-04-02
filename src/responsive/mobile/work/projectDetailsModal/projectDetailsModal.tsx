import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';
import { Project } from '../../../../features/projects/data/types';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onCursorChange: (cursorType: string) => void;
  onVideoClick?: (url: string, project: Project) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onCursorChange,
  onVideoClick
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dragProgress, setDragProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const controls = useAnimation();

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle drag to close
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 150; // Minimum distance required to close
    
    if (info.offset.y > threshold) {
      setIsClosing(true);
      controls.start({ 
        y: window.innerHeight,
        transition: { duration: 0.3 }
      }).then(onClose);
    } else {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      setDragProgress(0);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 0) { // Only track downward swipes
      // Calculate progress as percentage of screen height
      const progress = Math.min(info.offset.y / 300, 1);
      setDragProgress(progress);
    }
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center touch-none">
      {/* Backdrop with blur effect */}
      <motion.div
        className="absolute inset-0 bg-dark-900/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - dragProgress * 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      
      {/* Content - slide up from bottom */}
      <motion.div
        ref={contentRef}
        className="relative z-10 w-full max-h-[90vh] bg-dark-900/95 rounded-t-2xl overflow-hidden flex flex-col"
        initial={{ y: '100%' }}
        animate={controls}
        exit={{ y: '100%' }}
        transition={{ 
          type: 'spring',
          damping: 30,
          stiffness: 300
        }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        dragDirectionLock
        dragSnapToOrigin={!isClosing}
        animate={{ y: 0 }}
      >
        {/* Pull indicator */}
        <motion.div 
          className="w-full flex justify-center py-3"
          animate={{ 
            opacity: dragProgress > 0 ? 0.5 + dragProgress * 0.5 : 1,
            scale: dragProgress > 0 ? 1 + dragProgress * 0.2 : 1,
          }}
        >
          <div className="w-12 h-1 bg-dark-700 rounded-full"></div>
        </motion.div>
        
        {/* Project main content */}
        <div className="overflow-y-auto overscroll-contain pb-safe-bottom" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Project header - Title and close button */}
          <div className="px-5 pt-2 pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-light text-white font-display">{project.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-dark-300 text-sm">{project.year}</span>
                <span className="w-1 h-1 bg-dark-600 rounded-full"></span>
                <span className="text-primary-400 text-sm">{project.client || project.category}</span>
              </div>
            </div>
            <motion.button
              className="p-2 -mr-2 rounded-full bg-dark-800/50 backdrop-blur-sm"
              onClick={onClose}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          
          {/* Project image/video - Aspect ratio preserved */}
          <div className="w-full aspect-[16/9] relative overflow-hidden">
            {/* Show website iframe or image */}
            {project.category === 'webdesign' && project.website ? (
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  src={project.website}
                  title={`${project.title} website`}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                ></iframe>
              </div>
            ) : (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (project.fallbackImage) {
                    e.currentTarget.src = project.fallbackImage;
                  }
                }}
              />
            )}
            
            {/* Stylish gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-dark-900/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-dark-900/50 to-transparent"></div>
          </div>
          
          {/* Stats and services as pills */}
          {(project.stats || project.services) && (
            <div className="px-5 py-3 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 pb-1 flex-nowrap" style={{ width: 'max-content' }}>
                {project.stats && project.stats.map((stat: string, index: number) => (
                  <div key={`stat-${index}`} className="px-3 py-1.5 bg-dark-800/80 backdrop-blur-sm rounded-md border border-dark-700/50 text-xs text-dark-200">
                    {stat}
                  </div>
                ))}
                {project.services && project.services.map((service: string, index: number) => (
                  <div key={`service-${index}`} className="px-3 py-1.5 bg-primary-900/20 backdrop-blur-sm rounded-md border border-primary-800/20 text-xs text-primary-200">
                    {service}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Project details */}
          <div className="px-5 py-4">
            {/* Description with stylized typography */}
            <div className="prose prose-sm prose-dark max-w-none mb-6">
              <p className="text-dark-200 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Project video - if available */}
            {project.website && project.category === 'video' && (
              <div className="mb-6">
                <button
                  onClick={() => onVideoClick && onVideoClick(project.website, project)}
                  className="relative w-full rounded-lg overflow-hidden aspect-video group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-dark-900/10 group-hover:opacity-70 transition-opacity"></div>
                  <img 
                    src={project.image} 
                    alt={`${project.title} video thumbnail`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-dark-900/80 backdrop-blur-sm flex items-center justify-center border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            )}
            
            {/* Technologies/Tools used */}
            {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-dark-200">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span key={index} className="bg-dark-800 px-3 py-1 rounded-full text-xs text-dark-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Bottom action bar with gradient fade */}
            <div className="pt-4 pb-4">
              <div className="flex space-x-3">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-primary-500/90 text-white font-medium rounded-lg flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/10"
                    onTouchStart={() => onCursorChange('button')}
                    onTouchEnd={() => onCursorChange('default')}
                  >
                    <span>{project.category === 'video' ? 'Watch Video' : 'Visit Website'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-dark-800/90 text-dark-300 font-medium rounded-lg border border-dark-700/50 flex items-center justify-center"
                  onTouchStart={() => onCursorChange('button')}
                  onTouchEnd={() => onCursorChange('default')}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailsModal; 