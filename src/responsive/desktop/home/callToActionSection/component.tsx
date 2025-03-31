import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HomeProps, FeatureProps } from '../types/home';
import emailjs from '@emailjs/browser';

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
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formState.name || !formState.email || !formState.message) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Replace these values with your actual EmailJS credentials
      // 1. Go to https://dashboard.emailjs.com/admin
      // 2. Get your Service ID from the "Email Services" section
      // 3. Create/select a template from "Email Templates" section and get its Template ID
      // 4. Get your Public Key from Account > API Keys
      const result = await emailjs.sendForm(
        'service_hrpzxss', // EmailJS service ID
        'template_i0pvy5m', // EmailJS template ID
        formRef.current!,
        'e3pbo0MYGSoBagA77' // EmailJS public key
      );
      
      console.log('EmailJS success:', result.text);
      setSubmitStatus('success');
      setFormState({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get glow shadow color based on index
  const getGlowShadow = (index: number, isHovered: boolean) => {
    if (!isHovered) return 'none';
    
    if (index === 0) {
      return '0 0 15px 3px rgba(56, 189, 248, 0.5)';
    } else if (index === 1) {
      return '0 0 15px 3px rgba(236, 72, 153, 0.5)';
    } else {
      return '0 0 15px 3px rgba(16, 185, 129, 0.5)';
    }
  };

  return (
    <motion.section 
      className="py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      style={{
        willChange: 'opacity',
        transform: 'translateZ(0)'
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950 opacity-80" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-5" />
      
      {/* Animated background gradient */}
      <motion.div 
        className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, rgba(0, 0, 0, 0) 70%)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl font-light mb-8 font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
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
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              With 8+ years of experience in digital communications, I've helped clients reach over 10 million users through high-quality media production, web design, and AI integration. From luxury automotive to performing arts, I bring your vision to life with creative expertise.
            </motion.p>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-4"
                  onMouseEnter={() => {
                    setHoveredFeature(index);
                    onCursorChange('button');
                  }}
                  onMouseLeave={() => {
                    setHoveredFeature(null);
                    onCursorChange('default');
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center relative"
                    style={{
                      background: index === 0 
                        ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(56, 189, 248, 0.05))' 
                        : index === 1 
                        ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05))' 
                        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                      boxShadow: getGlowShadow(index, hoveredFeature === index),
                      transition: 'box-shadow 0.5s ease-in-out'
                    }}
                  >
                    <motion.div
                      animate={hoveredFeature === index ? { 
                        scale: 1.15
                      } : {
                        scale: 1
                      }}
                      transition={{ 
                        duration: 0.3, 
                        ease: "easeOut" 
                      }}
                      style={{
                        willChange: 'transform',
                        transform: 'translateZ(0)'
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-light text-dark-200">{feature.title}</h3>
                    <p className="text-dark-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          >
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            />
            
            <motion.form 
              id="contactForm"
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-dark-800/50 p-8 overflow-hidden"
              whileHover={{ 
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.15)",
                borderColor: "rgba(56, 189, 248, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
                Get in Touch
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-dark-300 text-sm mb-2 font-light">Name</label>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input 
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-dark-200 focus:outline-none focus:border-primary-500 transition-all duration-300"
                      placeholder="Your name"
                      onMouseEnter={() => {
                        setHoveredInput('name');
                        onCursorChange('input');
                      }}
                      onMouseLeave={() => {
                        setHoveredInput(null);
                        onCursorChange('default');
                      }}
                      style={{
                        boxShadow: hoveredInput === 'name' ? '0 0 0 1px rgba(56, 189, 248, 0.3)' : 'none'
                      }}
                      disabled={isSubmitting}
                    />
                  </motion.div>
                </div>
                
                <div>
                  <label className="block text-dark-300 text-sm mb-2 font-light">Email</label>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input 
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-dark-200 focus:outline-none focus:border-primary-500 transition-all duration-300"
                      placeholder="your@email.com"
                      onMouseEnter={() => {
                        setHoveredInput('email');
                        onCursorChange('input');
                      }}
                      onMouseLeave={() => {
                        setHoveredInput(null);
                        onCursorChange('default');
                      }}
                      style={{
                        boxShadow: hoveredInput === 'email' ? '0 0 0 1px rgba(56, 189, 248, 0.3)' : 'none'
                      }}
                      disabled={isSubmitting}
                    />
                  </motion.div>
                </div>
                
                <div>
                  <label className="block text-dark-300 text-sm mb-2 font-light">Message</label>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea 
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-dark-200 focus:outline-none focus:border-primary-500 transition-all duration-300 h-32 resize-none"
                      placeholder="Tell me about your project"
                      onMouseEnter={() => {
                        setHoveredInput('message');
                        onCursorChange('input');
                      }}
                      onMouseLeave={() => {
                        setHoveredInput(null);
                        onCursorChange('default');
                      }}
                      style={{
                        boxShadow: hoveredInput === 'message' ? '0 0 0 1px rgba(56, 189, 248, 0.3)' : 'none'
                      }}
                      disabled={isSubmitting}
                    />
                  </motion.div>
                </div>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Your message has been sent successfully!
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    There was an error sending your message. Please try again.
                  </motion.div>
                )}
                
                <motion.button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-dark-950 rounded-lg px-6 py-4 text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-primary-500/20 relative overflow-hidden group disabled:opacity-70"
                  whileHover={{ 
                    scale: isSubmitting ? 1 : 1.02, 
                    boxShadow: isSubmitting ? "none" : "0 15px 30px -10px rgba(56, 189, 248, 0.3)" 
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                  disabled={isSubmitting}
                >
                  {/* Animated hover effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        Sending
                        <svg className="w-4 h-4 ml-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection; 