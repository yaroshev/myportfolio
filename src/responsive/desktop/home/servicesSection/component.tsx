import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HomeProps, ServiceProps } from '../types/home';

interface ServicesSectionProps extends Pick<HomeProps, 'onCursorChange'> {
  setActivePage?: (page: string) => void;
}

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
                      <span className="text-primary-400 mr-3 group-hover:text-primary-300 transition-colors duration-300">→</span>
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