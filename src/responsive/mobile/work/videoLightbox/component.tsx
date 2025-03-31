import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../../../features/projects/types';

interface VideoLightboxProps {
  videoId: string | null;
  project: Project | null;
  onClose: () => void;
  onCursorChange: (cursorType: string) => void;
}

const VideoLightbox: React.FC<VideoLightboxProps> = ({
  videoId,
  project,
  onClose,
  onCursorChange
}) => {
  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!videoId || !project) return null;

  // Get video platform and URL
  const isYouTube = videoId.length === 11 || videoId.includes('youtube');
  const embedUrl = isYouTube
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-dark-950/95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="relative px-4 py-3 flex items-center justify-between bg-dark-900/80 backdrop-blur-sm">
          <div>
            <h3 className="text-lg font-light text-dark-100">{project.title}</h3>
            <p className="text-xs text-dark-400">Video Preview</p>
          </div>
          <motion.button
            className="p-2 rounded-full bg-dark-800/70"
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => onCursorChange('button')}
            onTouchEnd={() => onCursorChange('default')}
          >
            <svg className="w-5 h-5 text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
        
        {/* Video Container - centered in available space */}
        <div className="flex-1 flex items-center justify-center p-0">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src={embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${project.title} video`}
            ></iframe>
          </div>
        </div>
        
        {/* Color bar - brand element */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-accent-500"></div>
      </div>
    </div>
  );
};

export default VideoLightbox; 