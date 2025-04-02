import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { HomeProps } from '../../core/types/home';
import { ResponsiveComponent } from '../../responsive';

// Desktop components
import DesktopHeroSection from '../../responsive/desktop/home/heroSection/heroSection';
import DesktopStatsSection from '../../responsive/desktop/home/statsSection/statsSection';
import DesktopServicesSection from '../../responsive/desktop/home/servicesSection/servicesSection';
import DesktopTestimonialsSection from '../../responsive/desktop/home/testimonialsSection/testimonialsSection';
import DesktopFeaturedWorkSection from '../../responsive/desktop/home/featuredWorkSection/featuredWorkSection';
import DesktopCallToActionSection from '../../responsive/desktop/home/callToActionSection/callToActionSection';

// Mobile components
import MobileHeroSection from '../../responsive/mobile/home/heroSection/heroSection';
import MobileStatsSection from '../../responsive/mobile/home/statsSection/statsSection';
import MobileServicesSection from '../../responsive/mobile/home/servicesSection/servicesSection';
import MobileTestimonialsSection from '../../responsive/mobile/home/testimonialsSection/testimonialsSection';
import MobileFeaturedWorkSection from '../../responsive/mobile/home/featuredWorkSection/featuredWorkSection';
import MobileCallToActionSection from '../../responsive/mobile/home/callToActionSection/callToActionSection';

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
        
        <ResponsiveComponent
          mobileComponent={MobileServicesSection}
          desktopComponent={DesktopServicesSection}
          onCursorChange={onCursorChange}
          setActivePage={setActivePage}
        />
        
        <ResponsiveComponent
          mobileComponent={MobileTestimonialsSection}
          desktopComponent={DesktopTestimonialsSection}
          onCursorChange={onCursorChange}
        />
        
        <ResponsiveComponent
          mobileComponent={MobileFeaturedWorkSection}
          desktopComponent={DesktopFeaturedWorkSection}
          setActivePage={setActivePage}
          onCursorChange={onCursorChange}
        />
        
        <ResponsiveComponent
          mobileComponent={MobileCallToActionSection}
          desktopComponent={DesktopCallToActionSection}
          onCursorChange={onCursorChange}
        />
      </Suspense>
    </div>
  );
};

export default Home;