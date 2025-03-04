import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import profileImage from '../assets/profile.jpg';

interface AboutProps {
  onCursorChange?: (cursorType: string) => void;
}

const About: React.FC<AboutProps> = ({ onCursorChange = () => {} }) => {
  const [activeSection, setActiveSection] = useState('bio');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    bio: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    timeline: useRef<HTMLElement>(null)
  };
  
  // Scroll animations with framer-motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Determine which section is currently in view
      if (sectionRefs.timeline.current && scrollPosition >= sectionRefs.timeline.current.offsetTop) {
        setActiveSection('timeline');
      } else if (sectionRefs.skills.current && scrollPosition >= sectionRefs.skills.current.offsetTop) {
        setActiveSection('skills');
      } else {
        setActiveSection('bio');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const skills = [
    { 
      category: 'Media Production & Design',
      items: ['Adobe Creative Cloud', 'DaVinci Resolve', 'CapCut', 'Canon/RED/Blackmagic', 'DJI Drones & Gimbals', 'PTZ Remote Multicam'] 
    },
    { 
      category: 'Marketing & Analytics',
      items: ['Google Analytics', 'Facebook Business Suite', 'Shopify Analytics', 'YouTube Analytics', 'TikTok Analytics', 'Constant Contact'] 
    },
    { 
      category: 'Development & Technical',
      items: ['Python', 'JavaScript', 'React', 'HTML/CSS', 'Swift', 'Wix'] 
    },
    { 
      category: 'AI & Automation',
      items: ['Make', 'ChatGPT', 'Claude', 'Gemini', 'Google Cloud Console', '11Labs'] 
    },
    {
      category: 'Project Management',
      items: ['Notion', 'Miro', 'Monday', 'Buffer', 'Google Business Suite', 'Technical Project Management']
    }
  ];

  const timelineEvents = [
    {
      year: '2024',
      title: 'Digital Content & Marketing Manager',
      company: 'Wildwood Outdoor Living Center',
      description: 'Managing email marketing system for 30K weekly recipients, implementing video content resulting in 33% increase in conversion rates. Developed data-driven content strategy achieving first organic sales from YouTube channel. Reached over 1M+ users through organic reach.'
    },
    {
      year: '2023',
      title: 'Producer, Camera Operator',
      company: 'Roll.Focus Productions',
      description: 'Managing advanced camera systems, graphics and sound boards for live-streaming national and global events. Executed high-profile broadcasts including Symphony at Vancouver Orpheum and 2024 Olympic Rugby Qualifiers.'
    },
    {
      year: '2021 - 2023',
      title: 'Brand Manager',
      company: 'Yager Construction Ltd',
      description: 'Developed digital transformation strategy generating 5M+ organic impressions. Created viral brand video achieving 1.4M+ views. Implemented automated media posting system, increasing efficiency by 40%.'
    },
    {
      year: '2016 - Present',
      title: 'Digital Communications Producer',
      company: 'YSMP Media Production',
      description: 'Managed media production projects for 100+ clients. Developed content for Hugo Boss TikTok launch and Pininfarina Battista NA reveal. Official media partner for World Record Setting Hublot Diamond Rally 2019. Built iOS App and implemented automation systems.'
    }
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.section 
        className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-20 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-dark-900/50 via-dark-950 to-black opacity-80 z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-light tracking-tight mb-6 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 via-dark-100 to-accent-200">
                About Me
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-dark-400 text-lg md:text-xl max-w-2xl mb-12 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Digital creator with a passion for building beautiful, functional, and user-centered digital experiences
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {Object.keys(sectionRefs).map((section, index) => (
                <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                  className={`px-6 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                  activeSection === section
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-dark-950'
                      : 'border border-dark-700 text-dark-400 hover:text-dark-200'
                }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
              >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
            ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
        
        {/* Bio Section */}
      <section 
        ref={sectionRefs.bio}
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.div 
                className="relative w-full aspect-square rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => onCursorChange('button')}
                onMouseLeave={() => onCursorChange('default')}
              >
                <img 
                  src={profileImage} 
                  alt="Yaroslav Shevchenko" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-70" />
                <motion.div 
                  className="absolute inset-0 border border-primary-400/20 rounded-lg"
                  animate={{ 
                    boxShadow: ['0 0 0 0 rgba(56, 189, 248, 0)', '0 0 0 10px rgba(56, 189, 248, 0.1)', '0 0 0 20px rgba(56, 189, 248, 0)'] 
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </div>
            
            <div>
              <motion.h2 
                className="text-3xl font-light tracking-tight mb-6 font-display"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
                  My Journey
                </span>
              </motion.h2>
              
              <motion.div 
                className="space-y-4 text-dark-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p>
                  I am a Digital Communications Professional with 8+ years of experience in developing effective communications strategies and media files, reaching 10+ million social media users, overseeing media production projects, web design and taking part in live streaming nationwide and global events.
                </p>
                <p>
                  My expertise spans across multiple domains, from advanced media production and live streaming to web development and AI integration. I've successfully managed and executed projects for high-profile clients in various sectors, including luxury automotive, construction, and performing arts.
                </p>
                <p className="space-y-2">
                  <span className="block font-medium text-primary-300">Key Achievements:</span>
                  <span className="block">• 1000+ videos produced</span>
                  <span className="block">• 10+ million social media views generated</span>
                  <span className="block">• 1000+ hours of drone flight</span>
                  <span className="block">• 150+ high profile events live streamed</span>
                  <span className="block">• 15+ AI agents and automations created</span>
                  <span className="block">• 5 websites launched</span>
                  <span className="block">• 1 iOS app developed</span>
                </p>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a 
                  href="#" 
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-dark-950 rounded-full text-sm tracking-wider uppercase hover:from-primary-400 hover:to-accent-400 transition-all duration-300"
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  Download Resume
                </a>
                <a 
                  href="mailto:contact@example.com" 
                  className="px-6 py-2 border border-dark-700 rounded-full text-sm tracking-wider uppercase hover:bg-dark-800 transition-all duration-300"
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  Contact Me
                </a>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </section>
        
        {/* Skills Section */}
      <section 
        ref={sectionRefs.skills}
        className="py-24 relative bg-dark-900/30"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.h2 
            className="text-3xl font-light tracking-tight text-center mb-16 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
              Skills & Expertise
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div 
                key={groupIndex}
                className="border border-dark-800 rounded-lg p-8 backdrop-blur-sm bg-dark-900/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
                }}
                onMouseEnter={() => onCursorChange('button')}
                onMouseLeave={() => onCursorChange('default')}
              >
                <h3 className="text-xl font-light mb-6 text-primary-300">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.span 
                      key={skillIndex}
                      className="px-3 py-1 bg-dark-800 rounded-full text-sm text-dark-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + skillIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(56, 189, 248, 0.2)",
                        color: "#e0f2fe"
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
              </div>
              </motion.div>
            ))}
          </div>
          </div>
        </section>
        
        {/* Timeline Section */}
      <section 
        ref={sectionRefs.timeline}
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-light tracking-tight text-center mb-16 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
              Professional Journey
            </span>
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-dark-800 transform md:translate-x-px"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            />
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="md:w-1/2 pb-8 md:pb-0 md:px-8">
                    <motion.div 
                      className="border border-dark-800 rounded-lg p-6 backdrop-blur-sm bg-dark-900/20 h-full"
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
                      }}
                      onMouseEnter={() => onCursorChange('button')}
                      onMouseLeave={() => onCursorChange('default')}
                    >
                      <div className="text-primary-400 text-sm mb-2">{event.year}</div>
                      <h3 className="text-xl font-light mb-2 text-dark-100">{event.title}</h3>
                      <div className="text-accent-300 text-sm mb-4">{event.company}</div>
                      <p className="text-dark-400 text-sm">{event.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transform -translate-x-1/2 border-4 border-dark-950"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    style={{ top: "2rem" }}
                  />
                </motion.div>
              ))}
                </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default About;