import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, Filter } from '../../../../features/projects/types';

interface ProjectsGridProps {
  projects: Project[];
  filters: Filter[];
  isLoading: boolean;
  hoveredProject: number | null;
  onProjectHover: (index: number | null) => void;
  onProjectClick: (project: Project) => void;
  onCursorChange: (cursorType: string) => void;
}

const ProjectsGrid = forwardRef<HTMLDivElement, ProjectsGridProps>(
  ({ 
    projects, 
    filters, 
    isLoading, 
    hoveredProject, 
    onProjectHover, 
    onProjectClick, 
    onCursorChange 
  }, ref) => {
    // Loading states animations
    if (isLoading) {
      return (
        <div 
          ref={ref} 
          className="min-h-[60vh] flex items-center justify-center"
        >
          <motion.div 
            className="relative w-16 h-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-0 w-full h-full border-t-2 border-primary-400 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-r-2 border-primary-400/40 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-b-2 border-primary-400/20 rounded-full"></div>
          </motion.div>
        </div>
      );
    }

    // Mobile-optimized projects grid
    return (
      <div ref={ref} className="pt-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={projects.length} // Re-render when projects change
            className="grid grid-cols-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                {/* Card with beautiful stacked layered design */}
                <div 
                  className="overflow-hidden rounded-xl shadow-lg relative bg-dark-900/60 backdrop-blur-md border border-dark-800/80"
                  onTouchStart={() => onProjectHover(index)}
                  onTouchEnd={() => onProjectHover(null)}
                >
                  {/* Website Preview */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    {/* Image with subtle zoom animation on touch */}
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top"
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredProject === index ? 1.05 : 1 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        if (project.fallbackImage) {
                          e.currentTarget.src = project.fallbackImage;
                        }
                      }}
                    />
                    
                    {/* Stylish overlay with gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-dark-900/10"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: hoveredProject === index ? 0.4 : 0.6 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Project category badge - positioned at top */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`
                        text-xs font-medium py-1 px-3 rounded-full
                        backdrop-blur-md bg-dark-800/60 text-primary-300 border border-primary-500/30
                      `}>
                        {filters.find(f => f.id === project.category)?.label}
                      </span>
                    </div>
                    
                    {/* Project information - positioned at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h3 className="text-xl font-light text-white mb-1 font-display">
                        {project.title}
                      </h3>
                      <p className="text-dark-200 text-sm line-clamp-2 mb-3">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Radial interactive gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 pointer-events-none"
                      animate={{ 
                        opacity: hoveredProject === index ? 0.2 : 0,
                        background: `radial-gradient(circle at center, ${project.accentColor || 'rgba(56, 189, 248, 0.3)'}, transparent 70%)`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex justify-between items-center p-4 border-t border-dark-800/50">
                    <div className="text-dark-400 text-xs">{project.year}</div>
                    
                    <motion.button
                      className="relative z-10 flex items-center space-x-1 bg-primary-500/20 text-primary-200 text-xs
                        rounded-full py-1.5 px-3 border border-primary-500/30"
                      onClick={() => onProjectClick(project)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>View Details</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Floating 3D-like project accent color */}
                <div 
                  className={`absolute -inset-1 -z-10 rounded-xl blur-md opacity-20`}
                  style={{ 
                    background: project.color || 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(56, 189, 248, 0.05))' 
                  }}
                />
              </motion.div>
            ))}
            
            {/* No results message */}
            {projects.length === 0 && (
              <motion.div 
                className="col-span-full flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-light text-dark-200 mb-2">No projects found</h3>
                <p className="text-dark-400 text-sm max-w-md">
                  Try selecting a different category or check back later for new additions
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

ProjectsGrid.displayName = 'ProjectsGrid';

export default ProjectsGrid; 