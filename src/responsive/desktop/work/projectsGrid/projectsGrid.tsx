import React, { forwardRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../projectCard/projectCard';
import { Project, Filter } from '../../../../features/projects/types';

interface ProjectsGridProps {
  projects: Project[];
  filters: Filter[];
  isLoading: boolean;
  hoveredProject: number | null;
  onProjectHover: (id: number | null) => void;
  onProjectClick: (project: Project) => void;
  onCursorChange: (cursorType: string) => void;
}

interface ProjectsByCategory {
  [key: string]: {
    projects: Project[];
    label: string;
  };
}

const ProjectsGrid = forwardRef<HTMLDivElement, ProjectsGridProps>(({
  projects,
  filters,
  isLoading,
  hoveredProject,
  onProjectHover,
  onProjectClick,
  onCursorChange
}, ref) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }
    }
  };

  // Group projects by category
  const projectsByCategory = useMemo(() => {
    const grouped: ProjectsByCategory = {};
    
    // Initialize with empty arrays for each filter category
    filters.forEach(filter => {
      if (filter.id !== 'all') {
        grouped[filter.id] = {
          projects: [],
          label: filter.label
        };
      }
    });
    
    // Add projects to their respective categories
    projects.forEach(project => {
      if (grouped[project.category]) {
        grouped[project.category].projects.push(project);
      }
    });
    
    // Filter out empty categories
    return Object.fromEntries(
      Object.entries(grouped).filter(([_, category]) => category.projects.length > 0)
    );
  }, [projects, filters]);

  return (
    <div ref={ref} className="relative flex-1">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
        ) : projects.length > 0 ? (
          <>
            {/* Always show category heading */}
            <div className="space-y-16">
              {Object.keys(projectsByCategory).length > 1 ? (
                // Multiple categories - show each with its own heading
                Object.entries(projectsByCategory).map(([categoryId, category]) => (
                  <motion.div 
                    key={categoryId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <motion.h3 
                      className="text-xl font-display font-light text-primary-300 border-b border-dark-700/30 pb-3"
                    >
                      {category.label}
                    </motion.h3>
                    
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                      variants={container}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      {category.projects.map((project) => (
                        <motion.div 
                          key={project.id}
                          className="group relative"
                          variants={item}
                          onMouseEnter={() => {
                            onProjectHover(project.id);
                            onCursorChange('button');
                          }}
                          onMouseLeave={() => {
                            onProjectHover(null);
                            onCursorChange('default');
                          }}
                        >
                          <ProjectCard
                            project={project}
                            isHovered={hoveredProject === project.id}
                            filters={filters}
                            onMouseEnter={() => onProjectHover(project.id)}
                            onMouseLeave={() => onProjectHover(null)}
                            onProjectClick={() => onProjectClick(project)}
                            onCursorChange={onCursorChange}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                // Single category - still show the heading
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <motion.h3 
                    className="text-xl font-display font-light text-primary-300 border-b border-dark-700/30 pb-3"
                  >
                    {filters.find(f => f.id === projects[0]?.category)?.label || "Projects"}
                  </motion.h3>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    {projects.map((project) => (
                      <motion.div 
                        key={project.id}
                        className="group relative"
                        variants={item}
                        onMouseEnter={() => {
                          onProjectHover(project.id);
                          onCursorChange('button');
                        }}
                        onMouseLeave={() => {
                          onProjectHover(null);
                          onCursorChange('default');
                        }}
                      >
                        <ProjectCard
                          project={project}
                          isHovered={hoveredProject === project.id}
                          filters={filters}
                          onMouseEnter={() => onProjectHover(project.id)}
                          onMouseLeave={() => onProjectHover(null)}
                          onProjectClick={() => onProjectClick(project)}
                          onCursorChange={onCursorChange}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          // Empty state
          <motion.div 
            className="py-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-light text-dark-200 mb-2">No projects found</h3>
            <p className="text-dark-400">No projects match the selected filter. Try another category.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ProjectsGrid; 