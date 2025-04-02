import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ResponsiveComponent } from '../../responsive';
import { useLocation } from 'react-router-dom';

// Desktop components
import DesktopHeroSection from '../../responsive/desktop/about/heroSection/heroSection';
import DesktopBioSection from '../../responsive/desktop/about/bioSection/bioSection';
import DesktopSkillsSection from '../../responsive/desktop/about/skillsSection/skillsSection';
import DesktopTimelineSection from '../../responsive/desktop/about/timelineSection/timelineSection';
import DesktopNavDots from '../../responsive/desktop/about/navDots/navDots';

// Mobile components
import MobileHeroSection from '../../responsive/mobile/about/heroSection/heroSection';
import MobileBioSection from '../../responsive/mobile/about/bioSection/bioSection';
import MobileSkillsSection from '../../responsive/mobile/about/skillsSection/skillsSection';
import MobileTimelineSection from '../../responsive/mobile/about/timelineSection/timelineSection';
import MobileNavDots from '../../responsive/mobile/about/navDots/navDots';

// Define the Section type
type Section = {
  id: string;
  ref: React.RefObject<HTMLElement>;
  inView: boolean;
};

// Update this interface if needed
interface BioSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  onCursorChange?: React.Dispatch<React.SetStateAction<string>>;
}

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorType, setCursorType] = useState<string>('default');
  const [setActivePage, setSetActivePage] = useState<((page: string) => void) | undefined>(undefined);
  
  // Refs for each section
  const heroRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  
  // Options for the Intersection Observer
  const options = {
    threshold: 0.4, // Trigger when 40% of the section is visible
  };
  
  // Remove unused variables
  const { pathname } = useLocation();
  
  // Set up IntersectionObserver for each section
  const { ref: heroInViewRef, inView: heroInView } = useInView({ ...options, root: null, rootMargin: '-10% 0px -20% 0px' });
  const { ref: bioInViewRef, inView: bioInView } = useInView({ ...options, root: null, rootMargin: '-10% 0px -20% 0px' });
  const { ref: skillsInViewRef, inView: skillsInView } = useInView({ ...options, root: null, rootMargin: '-10% 0px -20% 0px' });
  const { ref: timelineInViewRef, inView: timelineInView } = useInView({ ...options, root: null, rootMargin: '-10% 0px -20% 0px' });
  
  // Connect refs for both React refs and inView refs
  useEffect(() => {
    if (heroRef.current) heroInViewRef(heroRef.current);
    if (bioRef.current) bioInViewRef(bioRef.current);
    if (skillsRef.current) skillsInViewRef(skillsRef.current);
    if (timelineRef.current) timelineInViewRef(timelineRef.current);
  }, [heroInViewRef, bioInViewRef, skillsInViewRef, timelineInViewRef]);
  
  // Define sections for navigation
  const sections: Section[] = [
    { id: 'hero', ref: heroRef, inView: heroInView },
    { id: 'bio', ref: bioRef, inView: bioInView },
    { id: 'skills', ref: skillsRef, inView: skillsInView },
    { id: 'timeline', ref: timelineRef, inView: timelineInView },
  ];
  
  // Handle scroll to update active section
  const handleScroll = () => {
    // Define threshold for when a section is considered "active"
    const threshold = window.innerHeight * 0.4;
    
    // Find the section closest to the middle of the viewport
    let closestSection = '';
    let minDistance = Infinity;
    
    sections.forEach(section => {
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section.id;
        }
      }
    });
    
    if (closestSection && closestSection !== activeSection) {
      setActiveSection(closestSection);
    }
  };
  
  // Handle dot click to scroll to a specific section
  const handleDotClick = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section && section.ref.current) {
      window.scrollTo({
        top: section.ref.current.offsetTop - 80, // Adjust for header/padding
        behavior: 'smooth'
      });
      setTimeout(() => setActiveSection(sectionId), 500);
    }
  };
  
  // Set up scroll event listener and setActivePage function
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Use the most "in view" section as the active section
    for (const section of sections) {
      if (section.inView) {
        setActiveSection(section.id);
        break;
      }
    }
  }, [heroInView, bioInView, skillsInView, timelineInView]);
  
  return (
    <motion.div
      className="relative bg-dark-950 text-white min-h-screen overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <ResponsiveComponent
        desktop={
          <DesktopHeroSection 
            sectionRef={heroRef} 
            onCursorChange={setCursorType}
            setActivePage={setActivePage}
          />
        }
        mobile={
          <MobileHeroSection 
            sectionRef={heroRef} 
            setActivePage={setActivePage}
          />
        }
      />
      
      {/* Bio Section */}
      <ResponsiveComponent
        desktop={
          <DesktopBioSection 
            sectionRef={bioRef} 
            onCursorChange={setCursorType}
          />
        }
        mobile={
          <MobileBioSection 
            sectionRef={bioRef} 
          />
        }
      />
      
      {/* Skills Section */}
      <ResponsiveComponent
        desktop={
          <DesktopSkillsSection 
            sectionRef={skillsRef} 
            onCursorChange={setCursorType}
          />
        }
        mobile={
          <MobileSkillsSection 
            sectionRef={skillsRef} 
          />
        }
      />
      
      {/* Timeline Section */}
      <ResponsiveComponent
        desktop={
          <DesktopTimelineSection 
            sectionRef={timelineRef} 
            onCursorChange={setCursorType}
          />
        }
        mobile={
          <MobileTimelineSection 
            sectionRef={timelineRef} 
          />
        }
      />
      
      {/* Navigation Dots */}
      <ResponsiveComponent
        desktop={
          <DesktopNavDots 
            activeSection={activeSection} 
            sections={sections.map(s => s.id)} 
            onDotClick={handleDotClick} 
            onCursorChange={setCursorType}
          />
        }
        mobile={
          <MobileNavDots 
            activeSection={activeSection} 
            sections={sections.map(s => s.id)} 
            onDotClick={handleDotClick} 
          />
        }
      />
    </motion.div>
  );
};

export default AboutPage; 