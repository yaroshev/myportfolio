import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HomeProps, ServiceProps } from '../../types/home';

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

  const handleCardClick = () => {
    if (setActivePage) {
      setActivePage('about');
    }
  };

  return (
    <motion.section 
      className="py-24 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-3xl font-light tracking-tight text-center mb-16 font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
            Services & Expertise
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index} 
              className={`
                relative overflow-hidden rounded-lg p-6 md:p-8 
                backdrop-blur-md bg-dark-800/10 
                border border-dark-300/30
                transition-all duration-300 group z-10
                hover:border-transparent
                ${hoveredIndex === index ? 'shadow-[0_0_25px_rgba(255,255,255,0.2)]' : 'shadow-lg'}
                cursor-pointer
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.08,
                ease: "easeOut"
              }}
              onClick={handleCardClick}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onCursorChange('button');
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onCursorChange('default');
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-10" />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-dark-300/5 to-accent-500/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ backgroundPosition: '0% 0%' }}
                animate={hoveredIndex === index ? {
                  backgroundPosition: ['0% 0%', '100% 100%'],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
              />
              
              <motion.div 
                className="absolute inset-0 rounded-lg -z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                }}
                animate={hoveredIndex === index ? {
                  boxShadow: [
                    'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                    'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  ]
                } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <h3 className="text-xl font-light text-dark-100 relative mb-4">{service.title}</h3>
              
              <p className="text-dark-400 mb-6 relative">{service.description}</p>
              
              <ul className="space-y-3 text-dark-300 relative">
                {service.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + featureIndex * 0.1 }}
                  >
                    <span className="text-primary-400 mr-2 group-hover:text-primary-300 transition-colors duration-300">→</span>
                    <span className="group-hover:text-dark-200 transition-colors duration-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.section>
  );
};

export default ServicesSection; 