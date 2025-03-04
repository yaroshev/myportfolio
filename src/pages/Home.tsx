import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { HomeProps } from '../types/home';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FeaturedWorkSection from '../components/home/FeaturedWorkSection';
import CallToActionSection from '../components/home/CallToActionSection';

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
  
  const statsOpacity = useTransform(smoothScrollYProgress, [0.08, 0.25], [0, 1]);
  const statsY = useTransform(smoothScrollYProgress, [0.08, 0.25], [50, 0]);
  
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
      <div ref={heroRef}>
        <HeroSection
          setActivePage={setActivePage}
          onCursorChange={onCursorChange}
          scrollY={scrollY}
          mousePosition={mousePosition}
          heroScale={heroScale}
          heroOpacity={heroOpacity}
        />
      </div>
      
      <StatsSection
        onCursorChange={onCursorChange}
        statsOpacity={statsOpacity}
        statsY={statsY}
        setActivePage={setActivePage}
      />
      
      <ServicesSection
        onCursorChange={onCursorChange}
        setActivePage={setActivePage}
      />
      
      <TestimonialsSection
        onCursorChange={onCursorChange}
      />
      
      <FeaturedWorkSection
        setActivePage={setActivePage}
        onCursorChange={onCursorChange}
      />
      
      <CallToActionSection
        onCursorChange={onCursorChange}
      />
    </div>
  );
};

export default Home;