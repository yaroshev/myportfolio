import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

interface WorkProps {
  onCursorChange?: (cursorType: string) => void;
  setActivePage?: (page: string) => void;
}

const Work: React.FC<WorkProps> = ({ onCursorChange = () => {}, setActivePage }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleX = useSpring(scrollYProgress, springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  const projects = [
    {
      id: 1,
      title: 'Wildwood Digital Transformation',
      category: 'web',
      description: 'Led a comprehensive digital transformation initiative for Wildwood Outdoor Living Center, implementing an innovative email marketing system reaching 30,000 weekly recipients. The project included video integration that boosted conversion rates by 33% on their Shopify store and established their first revenue-generating YouTube channel.',
      image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      year: '2024',
      client: 'Wildwood Outdoor Living Center',
      services: ['Email Marketing', 'Video Production', 'Social Media Strategy', 'Analytics'],
      stats: ['30K Weekly Recipients', '33% Conversion Increase', '1M+ Organic Reach'],
      color: 'from-emerald-500 to-blue-500',
      accentColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      id: 2,
      title: 'Symphony at Vancouver Orpheum',
      category: 'video',
      description: 'Produced and directed multi-camera live streaming of prestigious symphony performances at the Vancouver Orpheum. Managed complex camera systems, graphics, and sound boards for seamless broadcast delivery, ensuring high-quality production values and engaging viewer experience.',
      image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      year: '2023',
      client: 'Roll.Focus Productions',
      services: ['Live Streaming', 'Multi-Camera Direction', 'Sound Engineering', 'Technical Direction'],
      stats: ['4K Broadcast', 'Multi-Camera Setup', 'Real-time Graphics'],
      color: 'from-purple-500 to-pink-500',
      accentColor: 'rgba(168, 85, 247, 0.1)'
    },
    {
      id: 3,
      title: 'Yager Construction Brand Evolution',
      category: 'web',
      description: 'Spearheaded a digital transformation strategy that established Yager Construction\'s complete online presence. Created and implemented viral marketing campaigns that generated over 5 million organic impressions, significantly enhancing brand recognition and market position.',
      image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      year: '2023',
      client: 'Yager Construction Ltd',
      services: ['Brand Strategy', 'Content Creation', 'Social Media Management', 'Automation'],
      stats: ['5M+ Impressions', '1.4M+ Viral Views', '40% Efficiency Increase'],
      color: 'from-amber-500 to-red-500',
      accentColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      id: 4,
      title: 'Hugo Boss TikTok Launch',
      category: 'video',
      description: 'Conceptualized and produced the launch campaign for Hugo Boss\'s TikTok channel, creating engaging content that resonated with the platform\'s audience while maintaining the brand\'s luxury positioning. Developed a comprehensive content strategy that ensured consistent engagement and growth.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      year: '2022',
      client: 'Hugo Boss',
      services: ['Social Media Strategy', 'Video Production', 'Content Creation', 'Brand Development'],
      stats: ['Platform Launch', 'Luxury Branding', 'Viral Content'],
      color: 'from-gray-500 to-zinc-500',
      accentColor: 'rgba(161, 161, 170, 0.1)'
    },
    {
      id: 5,
      title: 'Pininfarina Battista NA Launch',
      category: 'video',
      description: 'Spearheaded the North American reveal of Pininfarina\'s groundbreaking Battista hypercar, producing captivating content that highlighted the vehicle\'s innovative features and luxurious design. Created a multi-platform content strategy that generated significant engagement across social media channels.',
      image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
      year: '2022',
      client: 'Pininfarina',
      services: ['Event Coverage', 'Cinematography', 'Social Media Content', 'Post-Production'],
      stats: ['Global Launch', 'Instagram Feature', 'Luxury Automotive'],
      color: 'from-blue-500 to-cyan-500',
      accentColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      id: 6,
      title: 'Hublot Diamond Rally Coverage',
      category: 'video',
      description: 'Served as the official media partner for the World Record Setting Hublot Diamond Rally in 2019. Utilized advanced drone technology and ground cameras to capture the epic scale of this prestigious event, creating compelling content that showcased both the luxury vehicles and the spectacular Canadian landscape.',
      image: 'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      year: '2019',
      client: 'Hublot Diamond Rally',
      services: ['Drone Operations', 'Event Coverage', 'Multi-Camera Production', 'Post-Production'],
      stats: ['World Record Event', 'Aerial Coverage', 'Luxury Automotive'],
      color: 'from-violet-500 to-purple-500',
      accentColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      id: 7,
      title: 'AI-Powered Content Automation',
      category: 'ai',
      description: 'Developed an AI-powered content automation system that streamlined the creation and distribution of marketing materials. The system leverages machine learning algorithms to analyze engagement metrics and optimize content performance, resulting in a 40% increase in efficiency.',
      image: 'https://images.unsplash.com/photo-1677442135136-760c813028c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80',
      year: '2023',
      client: 'Various Clients',
      services: ['AI Integration', 'Workflow Automation', 'Content Strategy', 'System Design'],
      stats: ['40% Efficiency Gain', '15+ AI Agents', 'Multi-platform'],
      color: 'from-green-500 to-emerald-500',
      accentColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      id: 8,
      title: 'Drone Cinematography Portfolio',
      category: 'video',
      description: 'Accumulated over 1000 hours of professional drone flight experience, capturing breathtaking aerial footage for various high-profile clients and events. Specialized in complex flight operations and cinematic techniques to create stunning visual content.',
      image: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1829&q=80',
      year: '2016-2025',
      client: 'Multiple Clients',
      services: ['Drone Operations', 'Aerial Photography', 'Cinematography', 'Post-Production'],
      stats: ['1000+ Flight Hours', 'Licensed Pilot', 'High-Profile Events'],
      color: 'from-sky-500 to-indigo-500',
      accentColor: 'rgba(56, 189, 248, 0.1)'
    },
    {
      id: 9,
      title: 'Modern E-Commerce Experience',
      category: 'webdesign',
      description: 'Designed and developed a cutting-edge e-commerce platform with seamless user experience, advanced filtering capabilities, and optimized checkout flow. The responsive design ensures perfect functionality across all devices while maintaining brand consistency.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      year: '2023',
      client: 'Boutique Retail Brand',
      services: ['UI/UX Design', 'Frontend Development', 'E-commerce Strategy', 'Performance Optimization'],
      stats: ['35% Conversion Increase', '2.5s Load Time', 'Mobile-First Design'],
      color: 'from-primary-500 to-accent-500',
      accentColor: 'rgba(14, 165, 233, 0.1)'
    },
    {
      id: 10,
      title: 'Corporate Website Redesign',
      category: 'webdesign',
      description: 'Executed a complete redesign of a corporate website focusing on modern aesthetics, improved information architecture, and enhanced user engagement. Implemented custom animations and interactive elements to create a memorable browsing experience.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
      year: '2024',
      client: 'Enterprise Solutions Inc.',
      services: ['Web Design', 'Content Strategy', 'SEO Optimization', 'Custom Animations'],
      stats: ['75% Bounce Rate Reduction', '4x Lead Generation', 'Accessibility Compliant'],
      color: 'from-accent-500 to-primary-500',
      accentColor: 'rgba(217, 70, 239, 0.1)'
    }
  ];

  const filters = [
    { id: 'video', label: 'Video & Live', description: '1000+ videos produced' },
    { id: 'web', label: 'Digital Marketing', description: '10M+ social reach' },
    { id: 'webdesign', label: 'Web Design', description: 'Modern web experiences' },
    { id: 'ai', label: 'AI & Automation', description: '15+ AI solutions' },
    { id: 'all', label: 'All Projects', description: '8+ years of digital innovation' }
  ];

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

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.section 
        className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
        style={{ opacity, y }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-dark-900/50 via-dark-950 to-black opacity-80 z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              className="overflow-hidden mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-light tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-primary-200 via-dark-100 to-accent-200"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Featured Work
              </motion.h1>
            </motion.div>
            
            <motion.div 
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.p 
                className="text-dark-400 text-lg md:text-xl max-w-2xl mb-12 font-light"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                A decade of innovation in digital media, from viral campaigns to groundbreaking live productions
              </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { number: '1000+', label: 'Videos Produced' },
                { number: '10M+', label: 'Social Reach' },
                { number: '150+', label: 'Live Events' },
                { number: '15+', label: 'AI Solutions' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-light text-primary-300 mb-2">{stat.number}</div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl opacity-50"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.section>
      
      {/* Filter Section - Redesigned as its own distinct section */}
      <section className="py-16 relative z-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section heading */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-light tracking-tight font-display mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
                Browse Projects
              </span>
            </h2>
            <p className="text-dark-400 text-sm max-w-2xl mx-auto">
              Filter through my portfolio to discover projects across different specialties
            </p>
          </motion.div>
          
          {/* Filter container with glass effect and hover glow */}
          <motion.div 
            className="relative backdrop-blur-md bg-dark-900/40 rounded-xl border border-dark-800/30 p-8 shadow-lg overflow-hidden group transition-all duration-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              boxShadow: "0 0 15px 0 rgba(14, 165, 233, 0.05), 0 0 5px 0 rgba(217, 70, 239, 0.03)",
              borderColor: "rgba(203, 213, 225, 0.06)"
            }}
            onMouseEnter={() => onCursorChange('button')}
            onMouseLeave={() => onCursorChange('default')}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
            
            {/* Gradient background */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-12 transition-opacity duration-700">
              <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-radial from-primary-500/10 via-transparent to-transparent blur-3xl"></div>
              <div className="absolute top-0 right-1/4 w-1/2 h-full bg-gradient-radial from-accent-500/10 via-transparent to-transparent blur-3xl"></div>
            </div>
            
            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary-500/3 group-hover:border-t-accent-500/3 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            {/* Filter buttons */}
            <div className="relative z-10">
              <motion.div 
                className="flex flex-wrap gap-8 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {filters.map((filter, index) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <motion.div 
                      key={filter.id}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <button 
                        onClick={() => setActiveFilter(filter.id)}
                        className={`relative z-10 text-sm uppercase tracking-wider font-light transition-colors duration-300 ${
                          isActive 
                            ? 'text-primary-400' 
                            : 'text-dark-300 hover:text-dark-200'
                        }`}
                        onMouseEnter={() => onCursorChange('button')}
                        onMouseLeave={() => onCursorChange('default')}
                      >
                        {filter.label}
                      </button>
                      <motion.div 
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out"
                        style={{ 
                          width: isActive ? '100%' : '0%'
                        }}
                        animate={{
                          width: isActive ? '100%' : '0%'
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
              
              {/* Filter description */}
              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeFilter}
                    className="text-dark-400 text-sm font-light"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filters.find(f => f.id === activeFilter)?.description}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
        
        {/* Projects Grid */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-gradient-to-tr from-accent-500/5 to-primary-500/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                className="flex justify-center items-center py-32"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 relative">
                  <div className="w-full h-full border-4 border-dark-800 border-t-primary-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 border-4 border-dark-800 border-t-accent-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {visibleProjects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => openProjectDetails(project)}
                    onMouseEnter={() => {
                      setHoveredProject(project.id);
                      onCursorChange('button');
                    }}
                    onMouseLeave={() => {
                      setHoveredProject(null);
                      onCursorChange('default');
                    }}
                  >
                    <motion.div 
                      className="aspect-[4/3] relative overflow-hidden rounded-lg backdrop-blur-sm border border-dark-800/20 shadow-lg"
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 z-10 transition-opacity duration-500`} />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-dark-900/60 z-10 group-hover:bg-dark-900/40 transition-all duration-500" />
                      
                      {/* Project image */}
                      <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: hoveredProject === project.id ? 1.1 : 1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                        {/* Category badge */}
                        <motion.div 
                          className="overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="text-xs text-dark-400 mb-3 tracking-wider uppercase bg-dark-900/50 backdrop-blur-sm py-1 px-3 rounded-full w-fit">
                            {filters.find(f => f.id === project.category)?.label}
                          </div>
                        </motion.div>
                        
                        {/* Project title */}
                        <motion.h3 
                          className="text-2xl font-light text-dark-100 mb-4 font-display"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          {project.title}
                        </motion.h3>
                        
                        {/* Project description */}
                        <motion.p
                          className="text-dark-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {project.description}
                        </motion.p>
                      </div>
                      
                      {/* Hover effect - subtle glow */}
                      <motion.div 
                        className={`absolute inset-0 opacity-0 group-hover:opacity-30 z-5 transition-opacity duration-500 bg-gradient-to-br ${project.color} blur-xl`}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.15 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                    
                    {/* Project footer */}
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-dark-400 text-sm">{project.year}</div>
                      <motion.div 
                        className="text-primary-400 text-sm flex items-center gap-2 group-hover:text-accent-400 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="relative">
                          View Details
                          <div className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary-400 to-accent-400 group-hover:w-full transition-all duration-300"></div>
                        </span>
                        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </motion.div>
                    </div>
                    
                    {/* Stats pills - only visible on hover */}
                    <motion.div 
                      className="absolute -bottom-12 left-0 right-0 flex gap-2 justify-center opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.stats.slice(0, 2).map((stat, statIndex) => (
                        <div 
                          key={statIndex} 
                          className="text-xs py-1 px-3 rounded-full bg-dark-800/50 backdrop-blur-sm text-dark-300 border border-dark-700/20"
                        >
                          {stat}
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Empty state when no projects match the filter */}
          {visibleProjects.length === 0 && !isLoading && (
            <motion.div 
              className="py-32 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-light text-dark-200 mb-2">No projects found</h3>
              <p className="text-dark-400">No projects match the selected filter. Try another category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-dark-950/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectDetails}
            />
            
            <motion.div 
              className="bg-dark-900 rounded-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="relative aspect-video">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-70" />
                <motion.button 
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-dark-950/50 backdrop-blur-md flex items-center justify-center text-dark-200 hover:text-white transition-colors"
                  onClick={closeProjectDetails}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-2xl">×</span>
                </motion.button>
                  </div>
              
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap justify-between items-start gap-8 mb-12">
                  <div className="max-w-2xl">
                    <div className="text-sm text-primary-400 mb-3 flex items-center gap-2">
                      {filters.find(f => f.id === selectedProject.category)?.icon}
                      {filters.find(f => f.id === selectedProject.category)?.label} • {selectedProject.year}
                    </div>
                    <h2 className="text-4xl font-light text-dark-100 font-display mb-6">{selectedProject.title}</h2>
                    <p className="text-dark-300 leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div className="bg-dark-800/30 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-sm text-dark-300 mb-4">Project Details</div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-dark-400 mb-1">Client</div>
                        <div className="text-dark-200">{selectedProject.client}</div>
                      </div>
                      <div>
                        <div className="text-xs text-dark-400 mb-1">Services</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.services.map((service: string, index: number) => (
                            <span 
                              key={index}
                              className="text-xs px-3 py-1 rounded-full bg-dark-800/50 text-dark-300"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-between items-center border-t border-dark-800/50 pt-8">
                  <button 
                    className="px-6 py-3 border border-dark-700 rounded-full text-sm tracking-wider uppercase hover:bg-dark-800/50 transition-all duration-300 flex items-center gap-2"
                    onClick={closeProjectDetails}
                    onMouseEnter={() => onCursorChange('button')}
                    onMouseLeave={() => onCursorChange('default')}
                  >
                    ← Back to Projects
                  </button>
                  <a 
                    href="#" 
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-dark-950 rounded-full text-sm tracking-wider uppercase hover:from-primary-400 hover:to-accent-400 transition-all duration-300 flex items-center gap-2"
                    onMouseEnter={() => onCursorChange('button')}
                    onMouseLeave={() => onCursorChange('default')}
                  >
                    Visit Project →
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;