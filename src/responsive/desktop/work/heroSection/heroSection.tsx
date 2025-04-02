import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  opacity: any;
  y: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ opacity, y }) => {
  return (
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
  );
};

export default HeroSection; 