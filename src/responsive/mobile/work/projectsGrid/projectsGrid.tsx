import React, { forwardRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, Filter } from '../../../../features/projects/data/types';

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

    // Group projects by category
    const projectsByCategory = useMemo(() => {
      const grouped: Record<string, {category: string, label: string, projects: Project[]}> = {};
      
      // Initialize all categories (even empty ones)
      filters.filter(f => f.id !== 'all').forEach(filter => {
        grouped[filter.id] = {
          category: filter.id,
          label: filter.label,
          projects: []
        };
      });
      
      // Fill categories with projects
      projects.forEach(project => {
        if (project.category in grouped) {
          grouped[project.category].projects.push(project);
        }
      });
      
      // Filter out empty categories for clean display
      return Object.values(grouped).filter(group => group.projects.length > 0);
    }, [projects, filters]);

    // Mobile-optimized projects grid with horizontal scrolling galleries
    return (
      <div ref={ref} className="pt-16 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={projects.length} // Re-render when projects change
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projectsByCategory.map((category) => (
              <div key={category.category} className="space-y-3">
                {/* Category title */}
                <motion.div 
                  className="px-1 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-light text-white">
                    {category.label}
                  </h2>
                  <div className="w-16 h-0.5 bg-primary-500/50 mt-1.5"></div>
                </motion.div>
                
                {/* Horizontal scrollable gallery */}
                <div className="overflow-x-auto pb-4 -mx-6 px-6">
                  <div className="flex space-x-4" style={{ width: 'max-content' }}>
                    {category.projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        className="relative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        {/* Card with beautiful stacked layered design */}
                        <div 
                          className="overflow-hidden rounded-lg shadow-sm relative bg-dark-900/60 backdrop-blur-sm border border-dark-800/50 w-[280px]"
                          onTouchStart={() => onProjectHover(parseInt(project.id))}
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
                              animate={{ scale: hoveredProject === parseInt(project.id) ? 1.03 : 1 }}
                              transition={{ duration: 0.3 }}
                              onError={(e) => {
                                if (project.fallbackImage) {
                                  e.currentTarget.src = project.fallbackImage;
                                }
                              }}
                            />
                            
                            {/* Simpler overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-dark-900/10" />
                            
                            {/* Project information - positioned at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                              <h3 className="text-lg font-light text-white mb-1">
                                {project.title}
                              </h3>
                              <p className="text-dark-200 text-sm line-clamp-2">
                                {project.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex justify-between items-center p-3 border-t border-dark-800/50">
                            <div className="text-dark-400 text-xs">{project.year}</div>
                            
                            <button
                              className="flex items-center space-x-1 bg-primary-500/10 text-primary-200 text-xs
                                rounded-md py-1 px-2.5 border border-primary-500/20"
                              onClick={() => onProjectClick(project)}
                            >
                              <span>View Details</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
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