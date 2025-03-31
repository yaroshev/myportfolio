import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { HomeProps } from '../../core/types/home';
import { ResponsiveComponent } from '../../responsive';

// Desktop components
import DesktopHeroSection from '../../responsive/desktop/home/heroSection/component';
import DesktopStatsSection from '../../responsive/desktop/home/statsSection/component';
import DesktopServicesSection from '../../responsive/desktop/home/servicesSection/component';
import DesktopTestimonialsSection from '../../responsive/desktop/home/testimonialsSection/component';
import DesktopFeaturedWorkSection from '../../responsive/desktop/home/featuredWorkSection/component';
import DesktopCallToActionSection from '../../responsive/desktop/home/callToActionSection/component';

// Mobile components
import MobileHeroSection from '../../responsive/mobile/home/heroSection/component';
import MobileStatsSection from '../../responsive/mobile/home/statsSection/component';

// Add more mobile component imports as they are created

const Home: React.FC<HomeProps> = ({ setActivePage, onCursorChange = () => {} }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.0005
  });
  
  const heroScale = useTransform(smoothScrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(smoothScrollYProgress, [0, 0.2], [1, 0]);
  
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <div ref={heroRef}>
          <ResponsiveComponent
            mobileComponent={MobileHeroSection}
            desktopComponent={DesktopHeroSection}
            setActivePage={setActivePage}
            onCursorChange={onCursorChange}
            scrollY={scrollY}
            mousePosition={mousePosition}
            heroScale={heroScale}
            heroOpacity={heroOpacity}
          />
        </div>
        
        <ResponsiveComponent
          mobileComponent={MobileStatsSection} 
          desktopComponent={DesktopStatsSection}
          onCursorChange={onCursorChange}
          setActivePage={setActivePage}
        />
        
        {/* For components without mobile version yet, fallback to desktop */}
        <DesktopServicesSection
          onCursorChange={onCursorChange}
          setActivePage={setActivePage}
        />
        
        <DesktopTestimonialsSection
          onCursorChange={onCursorChange}
        />
        
        <DesktopFeaturedWorkSection
          setActivePage={setActivePage}
          onCursorChange={onCursorChange}
        />
        
        <DesktopCallToActionSection
          onCursorChange={onCursorChange}
        />
      </Suspense>
    </div>
  );
};

export default Home;