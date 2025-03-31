import React, { RefObject, useRef } from 'react';
import { motion } from 'framer-motion';
import { AboutSectionProps, Skill } from '../../../../features/about/types';
import { skills } from '../../../../features/about/data';

interface SkillsSectionProps extends AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ onCursorChange = () => {}, sectionRef }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Define skill proficiency for visualization (you can adjust these values)
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
  
  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="py-28 relative bg-dark-900/50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-radial from-primary-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-radial from-accent-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20 z-0" />
      </div>
      
      <div className="max-w-full mx-auto px-0 relative z-10">
        <motion.div 
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-300">
              Skills & Expertise
            </span>
          </h2>
          <motion.div 
            className="h-px w-24 bg-gradient-to-r from-primary-500/70 to-accent-500/70 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <p className="text-dark-400 max-w-2xl mx-auto font-light">
            A diverse toolkit of skills across multiple disciplines, allowing me to execute projects from concept to completion
          </p>
        </motion.div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mb-8 px-6">
          <div className="flex items-center gap-2 text-dark-400 text-sm">
            <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Scroll horizontally to explore all skills</span>
            <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Horizontal scrollable gallery */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-12 pt-2 snap-x snap-mandatory" 
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-6 pl-[calc(50vw-200px)] md:pl-[calc(50vw-525px)] pr-12">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={skillGroup.category}
                className="relative snap-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "0px 100px" }}
                onMouseEnter={() => onCursorChange('hover')}
                onMouseLeave={() => onCursorChange('default')}
              >
                <div className="min-w-[300px] md:min-w-[400px] bg-dark-800/30 backdrop-blur-sm rounded-2xl border border-dark-700/30 overflow-hidden flex flex-col h-[520px]">
                  {/* Card header with gradient */}
                  <div className={`bg-gradient-to-r ${categoryColors[skillGroup.category as keyof typeof categoryColors]} h-2`} />
                  
                  <div className="p-8 flex-1">
                    <h3 className="text-2xl font-display text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-dark-200">
                      {skillGroup.category}
                    </h3>
                    
                    <div className="space-y-6">
                      {skillGroup.items.map((skill, i) => (
                        <motion.div 
                          key={i}
                          className="relative"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-dark-200 font-medium">{skill}</span>
                            <span className="text-dark-400 text-xs opacity-60">{skillProficiency[skill as keyof typeof skillProficiency]}%</span>
                          </div>
                          <div className="h-1 bg-dark-800/60 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skillGroup.category as keyof typeof categoryColors]}/80`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skillProficiency[skill as keyof typeof skillProficiency]}%` }}
                              transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 