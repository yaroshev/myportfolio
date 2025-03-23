import React from 'react';
import { motion } from 'framer-motion';
import { Project, Filter } from '../types';

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  filters: Filter[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onProjectClick: () => void;
  onCursorChange: (cursorType: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isHovered,
  filters,
  onMouseEnter,
  onMouseLeave,
  onProjectClick,
  onCursorChange
}) => {
  return (
    <div 
      className="overflow-hidden rounded-lg border border-dark-800/20 backdrop-blur-sm bg-dark-900/40 shadow-lg transition-all duration-500 ease-out"
      style={{ 
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 10px 30px -10px rgba(14, 165, 233, 0.15), 0 5px 15px -5px rgba(217, 70, 239, 0.1)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Website Preview */}
      <div 
        className="relative aspect-[16/9] overflow-hidden cursor-pointer"
        onClick={onProjectClick}
      >
        {/* Website Image */}
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
          onError={(e) => {
            if (project.fallbackImage) {
              e.currentTarget.src = project.fallbackImage;
            }
          }}
        />
        
        {/* Image Overlay */}
        <div 
          className="absolute inset-0 bg-dark-900/50 transition-opacity duration-500"
          style={{ 
            opacity: isHovered ? 0.3 : 0.5 
          }}
        />
      </div>
      
      {/* Content Section */}
      <div 
        className="p-5 relative"
        onClick={onProjectClick}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
        
        {/* Subtle Gradient */}
        <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${project.color}`}></div>
        
        {/* Glow Effect on Hover */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{ 
            opacity: isHovered ? 0.07 : 0,
            background: `radial-gradient(circle at center, ${project.accentColor.replace('0.1', '1')}, transparent 70%)`
          }}
        ></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Category */}
          <div className="text-xs text-primary-400 mb-2 tracking-wider uppercase">
            {filters.find(f => f.id === project.category)?.label}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-light text-white mb-2 font-display">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-dark-300 text-sm mb-4">
            {project.description.length > 120 
              ? `${project.description.substring(0, 120)}...` 
              : project.description
            }
          </p>
          
          {/* Footer with both buttons */}
          <div className="flex justify-between items-center pt-2 border-t border-dark-800/20">
            <div className="text-dark-400 text-xs">{project.year}</div>
            <div className="flex items-center gap-10">
              {/* Visit Website Button - Styled like hero buttons */}
              {project.category === 'webdesign' && project.website && (
                <div className="relative">
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 text-xs uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => {
                      e.currentTarget.nextElementSibling?.classList.add('w-full');
                      e.currentTarget.nextElementSibling?.classList.remove('w-[20%]');
                      onCursorChange('button');
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.nextElementSibling?.classList.remove('w-full');
                      e.currentTarget.nextElementSibling?.classList.add('w-[20%]');
                      onCursorChange('button');
                    }}
                    style={{
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    Visit Website
                  </a>
                  <div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out w-[20%]"
                  />
                </div>
              )}
              
              {/* View Details Button */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onProjectClick();
                  }}
                  className="relative z-10 text-xs uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.nextElementSibling?.classList.add('w-full');
                    e.currentTarget.nextElementSibling?.classList.remove('w-[20%]');
                    onCursorChange('button');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.nextElementSibling?.classList.remove('w-full');
                    e.currentTarget.nextElementSibling?.classList.add('w-[20%]');
                    onCursorChange('button');
                  }}
                  style={{
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Details
                </button>
                <div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out w-[20%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 