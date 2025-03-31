import React, { RefObject, useState } from 'react';
import { motion } from 'framer-motion';
import { AboutSectionProps } from '../../../../features/about/types';
import { skills } from '../../../../features/about/data';

interface SkillsSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ sectionRef }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Define skill proficiency for visualization
  const skillProficiency = {
    'Adobe Creative Cloud': 95,
    'DaVinci Resolve': 90,
    'CapCut': 85,
    'Canon/RED/Blackmagic': 92,
    'DJI Drones & Gimbals': 88,
    'PTZ Remote Multicam': 84,
    'Google Analytics': 85,
    'Facebook Business Suite': 80,
    'Shopify Analytics': 85,
    'YouTube Analytics': 92,
    'TikTok Analytics': 90,
    'Constant Contact': 75,
    'Python': 70,
    'JavaScript': 75,
    'React': 72,
    'HTML/CSS': 85,
    'Swift': 60,
    'Wix': 90,
    'Make': 88,
    'ChatGPT': 95,
    'Claude': 90,
    'Gemini': 85,
    'Google Cloud Console': 75,
    '11Labs': 80,
    'Notion': 95,
    'Miro': 85,
    'Monday': 82,
    'Buffer': 88,
    'Google Business Suite': 92,
    'Technical Project Management': 90
  };
  
  // Colors for different skill categories
  const categoryColors = {
    'Media Production & Design': 'from-primary-500 to-primary-300',
    'Marketing & Analytics': 'from-accent-500 to-accent-300',
    'Development & Technical': 'from-blue-500 to-blue-300',
    'AI & Automation': 'from-purple-500 to-purple-300',
    'Project Management': 'from-teal-500 to-teal-300'
  };

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="py-20 relative bg-dark-900/50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-radial from-primary-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20 z-0" />
      </div>
      
      <div className="max-w-full mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl font-display font-light mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-300">
              Skills & Expertise
            </span>
          </h2>
          <motion.div 
            className="h-px w-20 bg-gradient-to-r from-primary-500/70 to-accent-500/70 mx-auto mb-5"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <p className="text-dark-400 text-sm max-w-md mx-auto font-light">
            A diverse toolkit of skills across multiple disciplines, allowing me to execute projects from concept to completion
          </p>
        </motion.div>
        
        {/* Accordion-style skill categories */}
        <div className="space-y-4 mb-4">
          {skills.map((skillGroup, index) => (
            <motion.div 
              key={skillGroup.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-30px" }}
              className="overflow-hidden"
            >
              <motion.div 
                className={`bg-dark-800/30 backdrop-blur-sm rounded-xl border border-dark-700/30 overflow-hidden`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Category header with gradient */}
                <div 
                  className={`h-full relative`}
                  onClick={() => toggleCategory(skillGroup.category)}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${categoryColors[skillGroup.category as keyof typeof categoryColors]}`} />
                  
                  <div className="px-5 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-display text-left bg-clip-text text-transparent bg-gradient-to-r from-white to-dark-200">
                      {skillGroup.category}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCategory === skillGroup.category ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* Skills content */}
                <motion.div 
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ 
                    height: expandedCategory === skillGroup.category ? 'auto' : 0,
                    opacity: expandedCategory === skillGroup.category ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 py-4 space-y-4">
                    {skillGroup.items.map((skill, i) => (
                      <motion.div 
                        key={i}
                        className="relative"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-dark-200 text-sm">{skill}</span>
                          <span className="text-dark-400 text-xs opacity-60">{skillProficiency[skill as keyof typeof skillProficiency]}%</span>
                        </div>
                        <div className="h-1 bg-dark-800/60 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skillGroup.category as keyof typeof categoryColors]}/80`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skillProficiency[skill as keyof typeof skillProficiency]}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 