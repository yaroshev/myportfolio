import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../../../features/projects/types';

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

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop with blur effect */}
        <motion.div
          className="absolute inset-0 bg-dark-900/90 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />
        
        {/* Content - slide up from bottom */}
        <motion.div
          ref={contentRef}
          className="relative z-10 w-full max-h-[90vh] bg-dark-900/95 rounded-t-2xl overflow-hidden flex flex-col"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ 
            type: 'spring',
            damping: 30,
            stiffness: 300
          }}
        >
          {/* Pull indicator */}
          <div className="w-full flex justify-center py-3">
            <div className="w-12 h-1 bg-dark-700 rounded-full"></div>
          </div>
          
          {/* Project main content */}
          <div className="overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Project header - Title and close button */}
            <div className="px-5 pt-2 pb-4 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-light text-white font-display">{project.title}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-dark-300 text-sm">{project.year}</span>
                  <span className="w-1 h-1 bg-dark-600 rounded-full"></span>
                  <span className="text-primary-400 text-sm">{project.category}</span>
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
            
            {/* Project details */}
            <div className="px-5 py-6">
              {/* Description with stylized typography */}
              <div className="prose prose-sm prose-dark max-w-none mb-6">
                <p className="text-dark-200 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Technologies/Tools used */}
              {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, index: number) => (
                      <span key={index} className="bg-dark-800 px-3 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Project videos */}
              {project.videos && Array.isArray(project.videos) && project.videos.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Videos</h3>
                  <div className="grid gap-4">
                    {project.videos.map((video: any, index: number) => (
                      <div key={index} className="bg-dark-800 p-3 rounded-lg">
                        <h4 className="text-lg mb-1">{video.title}</h4>
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Watch Video
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex flex-col space-y-3 mt-6">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-primary-500 text-dark-900 font-medium rounded-lg flex items-center justify-center space-x-2"
                  >
                    <span>Visit Website</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 bg-dark-800 text-dark-300 font-medium rounded-lg border border-dark-700/50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailsModal; 