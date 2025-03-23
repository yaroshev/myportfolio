import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onCursorChange: (cursorType: string) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onCursorChange
}) => {
  if (!project) return null;

  // Extract video id if it's a video project
  const getVideoId = (url: string | undefined) => {
    if (!url) return null;
    
    return url.includes('watch?v=') 
      ? url.split('watch?v=')[1].split('&')[0]
      : url.split('/').pop();
  };

  const isVideoProject = project.category === 'video' && project.website;
  const videoId = isVideoProject ? getVideoId(project.website) : null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
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
          onClick={onClose}
          className="absolute top-4 right-4 text-dark-400 hover:text-primary-300 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Content Preview Side */}
          <div className="w-full md:w-2/3 aspect-video md:aspect-auto md:h-[600px] relative">
            {project.category === 'webdesign' && project.website ? (
              // Interactive iframe for web design projects
              <>
                <div className="absolute inset-0 w-full h-full">
                  <iframe
                    src={project.website}
                    title={`${project.title} website`}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="lazy"
                  ></iframe>
                </div>
                
                {/* Overlay with message - appears briefly then fades out */}
                <motion.div 
                  className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  <div className="text-center px-6">
                    <div className="text-primary-400 text-lg mb-2">Interactive Preview</div>
                    <p className="text-dark-300 text-sm">You can browse the website directly in this window</p>
                  </div>
                </motion.div>
                
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-dark-900/20"></div>
                
                {/* Visit Website Button - Only for webdesign */}
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 left-6 px-6 py-3 bg-primary-500/90 backdrop-blur-sm text-white rounded-full text-sm tracking-wider uppercase hover:bg-primary-400 transition-all duration-300 flex items-center gap-2 z-10"
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  Open in New Tab
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </>
            ) : isVideoProject && videoId ? (
              // Auto-playing YouTube video for video projects
              <div className="w-full h-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              // Fallback to static image for other projects
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        
          {/* Content Side */}
          <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-light text-dark-200 mb-4 font-display">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.services && project.services.map((service, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 bg-dark-800/50 rounded-full text-xs text-primary-300"
                >
                  {service}
                </span>
              ))}
            </div>
            
            <p className="text-dark-400 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>
            
            {project.client && (
              <div className="mb-6">
                <div className="text-dark-300 text-sm mb-1">Client</div>
                <div className="text-dark-200">{project.client}</div>
              </div>
            )}
            
            {/* Show stats for video projects in a special layout */}
            {isVideoProject && project.stats && (
              <div className="mt-4 mb-8">
                <div className="text-dark-300 text-sm mb-3">Performance Metrics</div>
                <div className="grid grid-cols-3 gap-4">
                  {project.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-primary-400 text-lg font-medium">{stat.split(' ')[0]}</div>
                      <div className="text-dark-500 text-xs">{stat.split(' ').slice(1).join(' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Dark bar at the bottom */}
            <div className="mt-auto -mx-8 -mb-8 p-6 bg-dark-900/80 border-t border-dark-700/50">
              <div className="flex items-center justify-center">
                <div className="text-dark-400 text-xs">
                  Completed in <span className="text-primary-400">{project.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailsModal; 