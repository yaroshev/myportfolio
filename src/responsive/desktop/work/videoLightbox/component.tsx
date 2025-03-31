import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { VideoProject } from '../../../../features/projects/types';

interface VideoLightboxProps {
  selectedVideo: string | null;
  selectedVideoProject: VideoProject | null;
  onClose: () => void;
  onCursorChange: (cursorType: string) => void;
}

const VideoLightbox: React.FC<VideoLightboxProps> = ({
  selectedVideo,
  selectedVideoProject,
  onClose,
  onCursorChange
}) => {
  if (!selectedVideo || !selectedVideoProject) return null;

  return createPortal(
    <AnimatePresence>
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
                <span className="text-xs text-primary-400 uppercase tracking-wider">{selectedVideoProject.category}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-light text-dark-200 mb-4">{selectedVideoProject.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedVideoProject.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-2 py-0.5 bg-dark-800/50 rounded-full text-xs text-primary-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-dark-400 text-sm mb-6 leading-relaxed">
                {selectedVideoProject.description}
              </p>
              
              <div className="mt-auto">
                <div className="text-lg text-dark-300 mb-2">Project Metrics</div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedVideoProject.metrics).map(([key, value], index) => (
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
  );
};

export default VideoLightbox; 