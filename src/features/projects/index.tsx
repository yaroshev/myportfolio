import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from 'framer-motion';
import { WorkProps } from './types';
import { projects, featuredVideos, filters } from './data';
import { ResponsiveComponent } from '../../responsive';

// Desktop components
import DesktopHeroSection from '../../responsive/desktop/work/heroSection/component';
import DesktopFilterSection from '../../responsive/desktop/work/filterSection/component';
import DesktopProjectsGrid from '../../responsive/desktop/work/projectsGrid/component';
import DesktopProjectDetailsModal from '../../responsive/desktop/work/projectDetailsModal/component';
import DesktopVideoLightbox from '../../responsive/desktop/work/videoLightbox/component';

// Mobile components
import MobileHeroSection from '../../responsive/mobile/work/heroSection/component';
import MobileFilterSection from '../../responsive/mobile/work/filterSection/component';
import MobileProjectsGrid from '../../responsive/mobile/work/projectsGrid/component';
import MobileProjectDetailsModal from '../../responsive/mobile/work/projectDetailsModal/component';
import MobileVideoLightbox from '../../responsive/mobile/work/videoLightbox/component';

const Work: React.FC<WorkProps> = ({ onCursorChange = () => {}, setActivePage }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoProject, setSelectedVideoProject] = useState(null);
  const filterSectionRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const [filterShouldBeVisible, setFilterShouldBeVisible] = useState(false);

  // Scroll animations for hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Scroll tracking specifically for the hero section - to ensure filter is absolutely invisible when hero is visible
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });
  
  // Scroll tracking specifically for the projects grid - show filter only when projects grid is in view
  const { scrollYProgress: projectsGridScrollProgress } = useScroll({
    target: projectsGridRef,
    offset: ["start end", "end start"]
  });
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleX = useSpring(scrollYProgress, springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  
  // Refined animation controls for filter visibility
  
  // 1. Hero section complete indicator (0 when hero visible, 1 when completely passed)
  const heroComplete = useTransform(
    heroScrollProgress,
    [0.75, 0.8],
    [0, 1]
  );
  
  // 2. Project grid visibility factor (0 when out of view, 1 when in view)
  const projectsVisible = useTransform(
    projectsGridScrollProgress,
    [0.05, 0.15, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  
  // 3. Determine whether filter should be showing based on scroll position
  useEffect(() => {
    const unsubscribeHero = heroComplete.onChange(heroValue => {
      const projValue = projectsVisible.get();
      // Filter should be visible when hero is at least 75% out of view and projects are visible
      const shouldShow = heroValue > 0.75 && projValue > 0;
      
      if (shouldShow !== filterShouldBeVisible) {
        setFilterShouldBeVisible(shouldShow);
      }
    });
    
    const unsubscribeProj = projectsVisible.onChange(projValue => {
      const heroValue = heroComplete.get();
      // Filter should be visible when hero is at least 75% out of view and projects are visible
      const shouldShow = heroValue > 0.75 && projValue > 0;
      
      if (shouldShow !== filterShouldBeVisible) {
        setFilterShouldBeVisible(shouldShow);
      }
    });
    
    return () => {
      unsubscribeHero();
      unsubscribeProj();
    };
  }, [heroComplete, projectsVisible, filterShouldBeVisible]);
  
  // 4. Filter Y position animation
  const filterY = useTransform(projectsGridScrollProgress, [0, 0.1], [20, 0]);
  const filterSpring = useSpring(filterY, { stiffness: 100, damping: 30 });

  // Helper for checking if filter should be interactive (for pointer-events)
  const isFilterInteractive = () => {
    return heroScrollProgress.get() > 0.75 && 
           projectsGridScrollProgress.get() > 0.05 && 
           projectsGridScrollProgress.get() < 0.95;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  const openProjectDetails = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const openVideoLightbox = (url: string, project: any) => {
    const videoId = url.includes('watch?v=') 
      ? url.split('watch?v=')[1].split('&')[0]
      : url.split('/').pop();
    
    if (videoId) {
      setSelectedVideo(videoId);
      setSelectedVideoProject(project);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeVideoLightbox = () => {
    setSelectedVideo(null);
    setSelectedVideoProject(null);
    document.body.style.overflow = 'auto';
  };

  // Animation variants for the filter fade in/out
  const filterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <Suspense fallback={<div className="min-h-[90vh] flex items-center justify-center">Loading...</div>}>
        <div ref={heroSectionRef}>
          <ResponsiveComponent
            mobileComponent={MobileHeroSection}
            desktopComponent={DesktopHeroSection}
            opacity={opacity}
            y={y}
          />
        </div>
      </Suspense>
      
      {/* Main Content Area */}
      <div ref={mainContentRef} className="relative z-20">
        {/* Two Column Layout Container */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Left Column - Filters - Fixed Desktop Version */}
            <div className="hidden md:block h-full">
              {/* Empty div that takes up space in the grid */}
              <div className="w-full h-full"></div>
              
              {/* Fixed position filter that fades in when projects grid is in view */}
              <AnimatePresence mode="wait">
                {filterShouldBeVisible && (
                  <motion.div 
                    ref={filterSectionRef}
                    className="fixed top-[120px] z-40 w-[280px]"
                    variants={filterVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                      left: `max(calc((100vw - 1280px) / 2 + 24px), 24px)`,
                      pointerEvents: isFilterInteractive() ? 'auto' : 'none'
                    }}
                  >
                    <div className="overflow-y-auto max-h-[calc(100vh-8rem)] py-8">
                      <DesktopFilterSection
                        filters={filters}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        onCursorChange={onCursorChange}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile Filter - Fixed Version with elegant fade in/out */}
            <AnimatePresence mode="wait">
              {filterShouldBeVisible && (
                <motion.div 
                  className="md:hidden fixed top-[80px] left-0 right-0 z-40 py-4 px-6 rounded-b-lg bg-dark-900/80 backdrop-blur-sm border-b border-dark-800/50"
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                    pointerEvents: isFilterInteractive() ? 'auto' : 'none'
                  }}
                >
                  <MobileFilterSection
                    filters={filters}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    onCursorChange={onCursorChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right Column - Projects */}
            <main className="min-h-screen py-16">
              <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
                <ResponsiveComponent
                  mobileComponent={MobileProjectsGrid}
                  desktopComponent={DesktopProjectsGrid}
                  ref={projectsGridRef}
                  projects={visibleProjects}
                  filters={filters}
                  isLoading={isLoading}
                  hoveredProject={hoveredProject}
                  onProjectHover={setHoveredProject}
                  onProjectClick={openProjectDetails}
                  onCursorChange={onCursorChange}
                />
              </Suspense>
            </main>
          </div>
        </div>
      </div>
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ResponsiveComponent
            mobileComponent={MobileProjectDetailsModal}
            desktopComponent={DesktopProjectDetailsModal}
            project={selectedProject}
            onClose={closeProjectDetails}
            onCursorChange={onCursorChange}
            onVideoClick={openVideoLightbox}
          />
        )}
      </AnimatePresence>
      
      {/* Video Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <ResponsiveComponent
            mobileComponent={MobileVideoLightbox}
            desktopComponent={DesktopVideoLightbox}
            videoId={selectedVideo}
            project={selectedVideoProject}
            onClose={closeVideoLightbox}
            onCursorChange={onCursorChange}
          />
        )}
      </AnimatePresence>
      
      {/* Progress Indicator at bottom of screen */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 z-50 origin-left"
        style={{ scaleX, opacity: filterShouldBeVisible ? 1 : 0 }}
      />
    </div>
  );
};

export default Work; 