import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import HeroSection from '../../responsive/desktop/about/heroSection/component';
import BioSection from '../../responsive/desktop/about/bioSection/component';
import SkillsSection from '../../responsive/desktop/about/skillsSection/component';
import TimelineSection from '../../responsive/desktop/about/timelineSection/component';
import NavDots from '../../responsive/desktop/about/navDots/component';
import { AboutPageProps } from './types';

const AboutPage: React.FC<AboutPageProps> = ({ onCursorChange = () => {}, setActivePage }) => {
  const [activeSection, setActiveSection] = useState('hero');
  
  const heroRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  
  const sections = ['hero', 'bio', 'skills', 'timeline'];
  const sectionRefs = {
    hero: heroRef,
    bio: bioRef,
    skills: skillsRef,
    timeline: timelineRef
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section) || sectionRefs[section as keyof typeof sectionRefs]?.current;
        
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleDotClick = (sectionId: string) => {
    const element = document.getElementById(sectionId) || sectionRefs[sectionId as keyof typeof sectionRefs]?.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <motion.div 
      className="bg-dark-950 text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div id="hero">
        <HeroSection 
          sectionRef={heroRef} 
          onCursorChange={onCursorChange}
          setActivePage={setActivePage}
        />
      </div>
      
      <NavDots 
        activeSection={activeSection} 
        sections={sections} 
        onDotClick={handleDotClick}
        onCursorChange={onCursorChange}
      />
      
      <BioSection onCursorChange={onCursorChange} sectionRef={bioRef} />
      <SkillsSection onCursorChange={onCursorChange} sectionRef={skillsRef} />
      <TimelineSection onCursorChange={onCursorChange} sectionRef={timelineRef} />
    </motion.div>
  );
};

export default AboutPage; 