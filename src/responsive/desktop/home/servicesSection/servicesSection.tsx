import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HomeProps, ServiceProps } from '../types/home';

interface ServicesSectionProps extends Pick<HomeProps, 'onCursorChange'> {
  setActivePage?: (page: string) => void;
}

// Function to get appropriate icon for a feature
const getFeatureIcon = (feature: string) => {
  // Video Production
  if (feature.includes('Video Production')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }
  
  // Drone Cinematography
  if (feature.includes('Drone')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    );
  }
  
  // Post-Production
  if (feature.includes('Post-Production')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    );
  }
  
  // AI Integration
  if (feature.includes('AI Integration')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    );
  }
  
  // Workflow Automation
  if (feature.includes('Workflow')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    );
  }
  
  // Custom AI Agents
  if (feature.includes('AI Agents')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  
  // Social Media Strategy
  if (feature.includes('Social Media')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    );
  }
  
  // Email Marketing
  if (feature.includes('Email')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  
  // Content Creation
  if (feature.includes('Content')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    );
  }
  
  // Default icon for any other features
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
};

const services: ServiceProps[] = [
  {
    title: 'Media Production',
    description: 'Professional video production, drone cinematography, and post-production services using industry-leading equipment and software.',
    features: ['Video Production', 'Drone Cinematography', 'Post-Production'],
    gradient: 'from-primary-500/10 to-accent-500/10'
  },
  {
    title: 'AI and Automations',
    description: 'Cutting-edge AI solutions and workflow automations that streamline processes, enhance productivity, and drive innovation.',
    features: ['AI Integration', 'Workflow Automation', 'Custom AI Agents'],
    gradient: 'from-primary-500/10 to-accent-500/10'
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic digital marketing solutions including social media management, email campaigns, and content strategy.',
    features: ['Social Media Strategy', 'Email Marketing', 'Content Creation'],
    gradient: 'from-primary-500/10 to-accent-500/10'
  }
];

const ServicesSection: React.FC<ServicesSectionProps> = ({ onCursorChange, setActivePage }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Center the initial card on mobile
  useEffect(() => {
    if (!scrollContainerRef.current || !isMobile) return;
    
    // Set initial active card to the middle card
    const middleIndex = Math.floor(services.length / 2);
    setActiveCardIndex(middleIndex);
    
    // Calculate scroll position to center the middle card
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = containerWidth * 0.75; // 75% of container width
    const scrollPosition = middleIndex * cardWidth;
    
    // Add a small delay to ensure the DOM is fully rendered
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }, 100);
  }, [isMobile, services.length]);

  // Handle scroll snap on mobile
  useEffect(() => {
    if (!scrollContainerRef.current || !isMobile) return;
    
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = containerWidth * 0.75; // 75% of container width
      
      const newActiveIndex = Math.round(scrollPosition / cardWidth);
      setActiveCardIndex(Math.min(newActiveIndex, services.length - 1));
    };
    
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, services.length]);

  // Mouse/touch drag handlers for mobile scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isMobile) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isMobile) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCardClick = () => {
    if (setActivePage) {
      setActivePage('about');
    }
  };

  return (
    <section className="py-12 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-center mb-6 md:mb-16 font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
            Services & Expertise
          </span>
        </h2>
      </div>
      
      {/* Desktop container for proper centering */}
      <div className="md:flex md:justify-center md:items-center">
        {/* Mobile: Horizontal scroll / Desktop: Original grid layout */}
        <div 
          ref={scrollContainerRef}
          className={`
            md:grid md:grid-cols-3 md:gap-8 md:max-w-6xl
            flex overflow-x-auto snap-x snap-mandatory scrollbar-hide
            -mx-4 px-4 md:mx-auto md:px-6 md:overflow-visible
            pb-6 md:pb-0 gap-4
          `}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {services.map((service, index) => (
            <div
              key={index} 
              className={`
                relative overflow-hidden rounded-lg p-6
                backdrop-blur-md bg-dark-800/10 
                border border-dark-300/30
                transition-all duration-300 group
                hover:border-primary-500/30 active:border-primary-500/50
                hover:-translate-y-1
                ${hoveredIndex === index ? 'shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'shadow-lg'}
                cursor-pointer
                flex-none w-[75vw] md:w-auto
                snap-center
              `}
              onClick={handleCardClick}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onCursorChange('button');
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onCursorChange('default');
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-10" />
              
              {/* Hover gradient - no animation, just transition */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-300/5 to-accent-500/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Static border highlight instead of animation */}
              <div className="absolute inset-0 rounded-lg border border-primary-500/10 opacity-30 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-300 -z-5" />

              <div className="flex flex-col h-full min-h-[280px]">
                {/* Service title with improved spacing */}
                <h3 className="text-2xl font-light text-dark-100 mb-4 relative">{service.title}</h3>
                
                {/* Description with better typography */}
                <p className="text-dark-400 text-base leading-relaxed mb-8 relative">{service.description}</p>
                
                {/* Features list pushed to bottom */}
                <ul className="space-y-3 text-dark-300 relative mt-auto">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center"
                    >
                      <span className="text-primary-400 mr-3 group-hover:text-primary-300 transition-colors duration-300">
                        {getFeatureIcon(feature)}
                      </span>
                      <span className="group-hover:text-dark-200 transition-colors duration-300 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 flex items-center opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile scroll indicators moved to bottom - Only visible on mobile */}
      <div className="flex justify-center gap-3 mt-2 md:hidden">
        {services.map((_, index) => (
          <div 
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeCardIndex === index 
                ? 'bg-primary-400 w-6' 
                : 'bg-dark-600 w-1.5'
            }`}
          />
        ))}
      </div>
      
      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <style>{`
        .services-card-header-bg {
          background: linear-gradient(270deg, var(--feature-color-dark) 0%, var(--feature-color-light) 100%);
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; filter: brightness(1.2); }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection; 