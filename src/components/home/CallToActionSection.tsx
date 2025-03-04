import React from 'react';
import { motion } from 'framer-motion';
import { HomeProps, FeatureProps } from '../../types/home';

interface CallToActionSectionProps extends Pick<HomeProps, 'onCursorChange'> {}

const features: FeatureProps[] = [
  {
    icon: (
      <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Professional Equipment",
    description: "Industry-leading cameras and production gear"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Secure Delivery",
    description: "Protected cloud storage and transfer"
  }
];

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ onCursorChange }) => {
  return (
    <motion.section 
      className="py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950 opacity-80" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl font-light mb-8 font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 via-dark-100 to-accent-200">
                Ready to elevate your digital presence?
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-dark-400 text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From high-profile live events to viral social media campaigns, I bring your vision to life with cutting-edge technology and creative expertise.
            </motion.p>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-${index === 0 ? 'primary' : index === 1 ? 'accent' : 'emerald'}-500/10 flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-dark-200">{feature.title}</h3>
                    <p className="text-dark-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl opacity-30" />
            <div className="relative bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-dark-800/50 p-8">
              <h3 className="text-2xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-dark-400 text-sm mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-dark-200 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-dark-400 text-sm mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-dark-200 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-dark-400 text-sm mb-2">Message</label>
                  <textarea 
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-dark-200 focus:outline-none focus:border-primary-500 transition-colors duration-300 h-32 resize-none"
                    placeholder="Tell me about your project"
                  />
                </div>
                
                <motion.button 
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-dark-950 rounded-lg px-6 py-4 text-sm tracking-wider uppercase hover:from-primary-400 hover:to-accent-400 transition-all duration-300 shadow-lg shadow-primary-500/20"
                  whileHover={{ scale: 1.02, boxShadow: "0 15px 30px -10px rgba(56, 189, 248, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  Send Message
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection; 