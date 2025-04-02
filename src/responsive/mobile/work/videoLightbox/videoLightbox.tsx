import React, { useEffect, useState } from 'react';
import { motion, useAnimation, PanInfo, AnimatePresence } from 'framer-motion';
import { Project } from '../../../../features/projects/data/types';

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
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const controls = useAnimation();

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

  // Handle swipe to close
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100; // Minimum distance required to close
    
    if (Math.abs(info.offset.y) > threshold) {
      setIsClosing(true);
      controls.start({ 
        y: info.offset.y > 0 ? 500 : -500, 
        opacity: 0,
        transition: { duration: 0.3 }
      }).then(onClose);
    } else {
      controls.start({ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      setSwipeProgress(0);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Limit drag progress to prevent going too far
    const progress = Math.min(Math.abs(info.offset.y) / 250, 1);
    setSwipeProgress(progress);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center touch-none">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-dark-950/95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - swipeProgress * 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      
      {/* Swipe indicator */}
      <motion.div 
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: swipeProgress > 0 ? 0 : [0.5, 0.8, 0.5], y: swipeProgress > 0 ? -10 : [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        <div className="w-8 h-1 rounded-full bg-white/30"></div>
        <p className="text-xs text-white/50">Swipe to close</p>
      </motion.div>
      
      {/* Content container with swipe */}
      <motion.div
        className="relative z-10 w-full h-full flex flex-col bg-dark-900/90"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={controls}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Header */}
        <div className="relative px-4 py-3 flex items-center justify-between backdrop-blur-sm border-b border-dark-800/50">
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
        <div className="flex-1 flex items-center justify-center p-4 pb-16 touch-none">
          <div className="relative w-full rounded-lg overflow-hidden shadow-xl border border-dark-800/50" style={{ maxHeight: '60vh' }}>
            <div className="w-full h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full border-0"
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${project.title} video`}
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-dark-950 to-dark-950/0 flex justify-around items-center">
          <motion.button
            className="flex flex-col items-center gap-1"
            onClick={() => window.open(isYouTube ? `https://www.youtube.com/watch?v=${videoId}` : `https://vimeo.com/${videoId}`, '_blank')}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-full bg-dark-800/70 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <span className="text-xs text-dark-300">Open</span>
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center gap-1"
            onClick={onClose}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-full bg-dark-800/70 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-xs text-dark-300">Close</span>
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center gap-1"
            onClick={() => {
              if (project.website) {
                window.open(project.website, '_blank');
              }
            }}
            whileTap={{ scale: 0.95 }}
            style={{ opacity: project.website ? 1 : 0.4 }}
            disabled={!project.website}
          >
            <div className="w-10 h-10 rounded-full bg-dark-800/70 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <span className="text-xs text-dark-300">Website</span>
          </motion.button>
        </div>
        
        {/* Color bar - brand element */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-accent-500"></div>
      </motion.div>
    </div>
  );
};

export default VideoLightbox; 