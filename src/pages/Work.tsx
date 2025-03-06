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
      title: 'Fidgeteer',
      category: 'webdesign',
      description: 'Designed and developed an interactive web experience for Fidgeteer, focusing on clean aesthetics and engaging user interactions. The site features smooth animations and a minimalist design approach that highlights content while maintaining excellent performance.',
      image: 'https://api.microlink.io?url=https://fidgeteer.netlify.app&screenshot=true&meta=false&embed=screenshot.url',
      fallbackImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      website: 'https://fidgeteer.netlify.app/',
      year: '2025',
      client: 'Fidgeteer',
      services: ['UI/UX Design', 'Frontend Development', 'Interactive Elements', 'Performance Optimization'],
      stats: ['Fast Load Time', 'Interactive UI', 'Minimalist Design'],
      color: 'from-blue-400 to-indigo-400',
      accentColor: 'rgba(96, 165, 250, 0.1)'
    },
    {
      id: 10,
      title: 'Domum Improvements',
      category: 'webdesign',
      description: 'Created a modern, professional website for Domum Improvements home improvement services. The design emphasizes clarity and trust while showcasing their portfolio of work through a clean, accessible interface that converts visitors into clients.',
      image: 'https://api.microlink.io?url=https://domumimpro.netlify.app&screenshot=true&meta=false&embed=screenshot.url',
      fallbackImage: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      website: 'https://domumimpro.netlify.app/',
      year: '2025',
      client: 'Domum Improvements',
      services: ['Web Design', 'Content Strategy', 'Responsive Layout', 'Portfolio Showcase'],
      stats: ['Conversion-Focused', 'Portfolio Showcase', 'Professional Design'],
      color: 'from-emerald-400 to-teal-400',
      accentColor: 'rgba(52, 211, 153, 0.1)'
    },
    {
      id: 11,
      title: 'Torrell Homes',
      category: 'webdesign',
      description: 'Designed and developed a professional website for Torrell Homes, a Victoria-based construction company. The site showcases their custom home building, garden suites, and renovation services with a clean, modern design that emphasizes their family-operated business values and quality craftsmanship.',
      image: 'https://api.microlink.io?url=https://www.torrellhomes.ca&screenshot=true&meta=false&embed=screenshot.url',
      fallbackImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      website: 'https://www.torrellhomes.ca/',
      year: '2023',
      client: 'Torrell Homes',
      services: ['Construction Website', 'Service Showcase', 'Responsive Design', 'Brand Development'],
      stats: ['Family Business', 'Victoria, BC', 'Custom Homes'],
      color: 'from-amber-400 to-orange-400',
      accentColor: 'rgba(251, 191, 36, 0.1)'
    },
    {
      id: 12,
      title: 'YSMP',
      category: 'webdesign',
      description: 'Designed and developed a portfolio website for YSMP Media Production, showcasing their video production services and creative work. The site features a clean, professional design with a focus on visual content and easy navigation.',
      image: 'https://api.microlink.io?url=https://ysmp.ca&screenshot=true&meta=false&embed=screenshot.url',
      fallbackImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      website: 'https://ysmp.ca/',
      year: '2025',
      client: 'YSMP Media Production',
      services: ['Portfolio Website', 'Video Showcase', 'Responsive Design', 'Brand Identity'],
      stats: ['Media Production', 'Portfolio Showcase', 'Professional Design'],
      color: 'from-blue-500 to-indigo-500',
      accentColor: 'rgba(59, 130, 246, 0.1)'
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
                    onMouseEnter={() => {
                      setHoveredProject(project.id);
                      onCursorChange('button');
                    }}
                    onMouseLeave={() => {
                      setHoveredProject(null);
                      onCursorChange('default');
                    }}
                  >
                    {/* Card Container with lift and glow effect */}
                    <div 
                      className="overflow-hidden rounded-lg border border-dark-800/20 backdrop-blur-sm bg-dark-900/40 shadow-lg transition-all duration-500 ease-out"
                      style={{ 
                        transform: hoveredProject === project.id ? 'translateY(-8px)' : 'translateY(0)',
                        boxShadow: hoveredProject === project.id 
                          ? '0 10px 30px -10px rgba(14, 165, 233, 0.15), 0 5px 15px -5px rgba(217, 70, 239, 0.1)' 
                          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      {/* Website Preview */}
                      <div 
                        className="relative aspect-[16/9] overflow-hidden cursor-pointer"
                        onClick={() => openProjectDetails(project)}
                      >
                        {/* Website Image */}
                        <img 
                        src={project.image} 
                        alt={project.title} 
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ 
                            transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)'
                          }}
                          onError={(e) => {
                            if (project.fallbackImage) {
                              e.currentTarget.src = project.fallbackImage;
                            }
                          }}
                        />
                        
                        {/* Image Overlay */}
                        <div 
                          className="absolute inset-0 bg-dark-900/50 transition-opacity duration-500"
                          style={{ 
                            opacity: hoveredProject === project.id ? 0.3 : 0.5 
                          }}
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div 
                        className="p-5 relative"
                        onClick={() => openProjectDetails(project)}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0xMDAgMEgwdjEwMGgxMDBWMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
                        
                        {/* Subtle Gradient */}
                        <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${project.color}`}></div>
                        
                        {/* Glow Effect on Hover */}
                        <div 
                          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                          style={{ 
                            opacity: hoveredProject === project.id ? 0.07 : 0,
                            background: `radial-gradient(circle at center, ${project.accentColor.replace('0.1', '1')}, transparent 70%)`
                          }}
                        ></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Category */}
                          <div className="text-xs text-primary-400 mb-2 tracking-wider uppercase">
                            {filters.find(f => f.id === project.category)?.label}
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-light text-white mb-2 font-display">
                          {project.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-dark-300 text-sm mb-4">
                            {project.description.length > 120 
                              ? `${project.description.substring(0, 120)}...` 
                              : project.description
                            }
                          </p>
                          
                          {/* Footer with both buttons */}
                          <div className="flex justify-between items-center pt-2 border-t border-dark-800/20">
                            <div className="text-dark-400 text-xs">{project.year}</div>
                            <div className="flex items-center gap-10">
                              {/* Visit Website Button - Styled like hero buttons */}
                              {project.category === 'webdesign' && project.website && (
                                <div className="relative">
                                  <a
                                    href={project.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative z-10 text-xs uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300"
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.nextElementSibling?.classList.add('w-full');
                                      e.currentTarget.nextElementSibling?.classList.remove('w-[20%]');
                                      onCursorChange('button');
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.nextElementSibling?.classList.remove('w-full');
                                      e.currentTarget.nextElementSibling?.classList.add('w-[20%]');
                                      onCursorChange('button');
                                    }}
                                    style={{
                                      textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                                    }}
                                  >
                                    Visit Site
                                  </a>
                                  <div 
                                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out w-[20%]"
                                  />
                      </div>
                              )}
                              
                              {/* View Details Button - Styled like hero buttons */}
                              <div className="relative">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openProjectDetails(project);
                                  }}
                                  className="relative z-10 text-xs uppercase tracking-wider font-light text-dark-200 hover:text-primary-400 transition-colors duration-300"
                                  onMouseEnter={(e) => {
                                    e.currentTarget.nextElementSibling?.classList.add('w-full');
                                    e.currentTarget.nextElementSibling?.classList.remove('w-[20%]');
                                    onCursorChange('button');
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.nextElementSibling?.classList.remove('w-full');
                                    e.currentTarget.nextElementSibling?.classList.add('w-[20%]');
                                    onCursorChange('button');
                                  }}
                                  style={{
                                    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                                  }}
                                >
                          View Details
                                </button>
                                <div 
                                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300 ease-in-out w-[20%]"
                                />
                              </div>
                            </div>
                    </div>
                        </div>
                      </div>
                    </div>
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeProjectDetails}
            style={{
              willChange: 'opacity',
              transform: 'translateZ(0)'
            }}
          >
            <motion.div 
              className="relative w-full max-w-6xl bg-dark-900/90 rounded-xl overflow-hidden border border-dark-300/30 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 text-dark-400 hover:text-primary-300 transition-colors z-10"
                onMouseEnter={() => onCursorChange('button')}
                onMouseLeave={() => onCursorChange('default')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row h-full">
                {/* Interactive Website Preview */}
                <div className="w-full md:w-2/3 aspect-video md:aspect-auto md:h-[600px] relative">
                  {selectedProject.category === 'webdesign' && selectedProject.website ? (
                    <>
                      {/* Interactive iframe for web design projects */}
                      <div className="absolute inset-0 w-full h-full">
                        <iframe
                          src={selectedProject.website}
                          title={`${selectedProject.title} website`}
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          loading="lazy"
                        ></iframe>
                      </div>
                      
                      {/* Overlay with message - appears briefly then fades out */}
                      <motion.div 
                        className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}
                      >
                        <div className="text-center px-6">
                          <div className="text-primary-400 text-lg mb-2">Interactive Preview</div>
                          <p className="text-dark-300 text-sm">You can browse the website directly in this window</p>
                        </div>
                      </motion.div>
                      
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-dark-900/20"></div>
                      
                      {/* Visit Website Button - Only for webdesign */}
                      <a
                        href={selectedProject.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-6 left-6 px-6 py-3 bg-primary-500/90 backdrop-blur-sm text-white rounded-full text-sm tracking-wider uppercase hover:bg-primary-400 transition-all duration-300 flex items-center gap-2 z-10"
                        onMouseEnter={() => onCursorChange('button')}
                        onMouseLeave={() => onCursorChange('default')}
                      >
                        Open in New Tab
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : (
                    // Fallback to static image for non-web projects
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                  )}
                  </div>
              
                {/* Content Side */}
                <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md">
                  <h2 className="text-2xl md:text-3xl font-light text-dark-200 mb-4 font-display">{selectedProject.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.services && selectedProject.services.map((service: string, index: number) => (
                            <span 
                              key={index}
                        className="px-2 py-0.5 bg-dark-800/50 rounded-full text-xs text-primary-300"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                  
                  <p className="text-dark-400 text-sm mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  {selectedProject.client && (
                    <div className="mb-6">
                      <div className="text-dark-300 text-sm mb-1">Client</div>
                      <div className="text-dark-200">{selectedProject.client}</div>
                    </div>
                  )}
                  
                  {/* Dark bar at the bottom */}
                  <div className="mt-auto -mx-8 -mb-8 p-6 bg-dark-900/80 border-t border-dark-700/50">
                    <div className="flex items-center justify-center">
                      <div className="text-dark-400 text-xs">
                        Completed in <span className="text-primary-400">{selectedProject.year}</span>
                      </div>
                    </div>
                  </div>
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