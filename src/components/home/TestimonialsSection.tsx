import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { HomeProps, TestimonialProps } from '../../types/home';

interface TestimonialsSectionProps extends Pick<HomeProps, 'onCursorChange'> {}

const testimonials: TestimonialProps[] = [
  {
    quote: [
      "Yaroslav is a pleasure to work with and goes the extra mile for us every single time, no matter the size of the project. He is knowledgeable, professional and always strives to make our projects the best that they can be, delivering a finished product beyond our expectations.",
      "When I first hired Yaroslav to do a promotional video, I didn't really know what I wanted, but he took charge and organized the whole shoot with little effort from me, which was amazing.",
      "If you have any media production needs, I would highly recommend Yaroslav- great local talent and a super nice guy delivering A+ videography!"
    ],
    company: "Hydroforce Excavating",
    name: "Jenn",
    role: "Marketing Manager",
    gradient: "from-primary-500/10 to-accent-500/10"
  },
  {
    quote: [
      "We did a project where we lifted a house with a 160-ton crane. The video Yaroslav made got 1.5 million views, which was incredibly impressive, and that's how we found out about him.",
      "After that, we hired him for a project where we did a tandem lift of two boats in Port Alberni. It was great working together—communication back and forth was excellent, and the final product turned out awesome.",
      "I would definitely recommend working with Yaroslav."
    ],
    company: "RKM Cranes",
    name: "Mike",
    role: "General Manager",
    gradient: "from-accent-500/10 to-primary-500/10"
  },
  {
    quote: [
      "I have had the pleasure of working with Yaroslav on several occasions for my jewelry brand, and each time has been an absolute delight. His ability to capture the essence of my products while paying close attention to every intricate detail exceeded all my expectations.",
      "From capturing the shimmer of gemstones to showcasing delicate craftsmanship, Yaroslav demonstrated exceptional expertise in every shot. The final videos not only elevated my brand's image but also received an overwhelmingly positive response from my customers and followers.",
      "I wholeheartedly recommend Yaroslav to anyone seeking exceptional videography services."
    ],
    company: "Nomad Design",
    name: "Asel",
    role: "Designer",
    gradient: "from-primary-500/10 to-accent-500/10"
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onCursorChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialProps | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Center the initial card on mobile
  useEffect(() => {
    if (!scrollContainerRef.current || !isMobile) return;
    
    // Set initial active card to the middle card
    const middleIndex = Math.floor(testimonials.length / 2);
    setActiveCardIndex(middleIndex);
    
    // Calculate scroll position to center the middle card
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = containerWidth * 0.80; // 80% of container width
    const scrollPosition = middleIndex * cardWidth;
    
    // Add a small delay to ensure the DOM is fully rendered
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }, 100);
  }, [isMobile, testimonials.length]);

  // Handle scroll snap on mobile
  useEffect(() => {
    if (!scrollContainerRef.current || !isMobile) return;
    
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = containerWidth * 0.80; // 80% of container width
      
      const newActiveIndex = Math.round(scrollPosition / cardWidth);
      setActiveCardIndex(Math.min(newActiveIndex, testimonials.length - 1));
    };
    
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, testimonials.length]);

  const openLightbox = (testimonial: TestimonialProps) => {
    setSelectedTestimonial(testimonial);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedTestimonial(null);
    document.body.style.overflow = 'auto';
  };

  // Handle mouse and touch events for smooth scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isMobile) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isMobile) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-dark-800/30 via-dark-900 to-black opacity-70 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-center mb-6 md:mb-16 font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
            Client Testimonials
          </span>
        </h2>
        
        {/* Mobile scroll indicators - Only visible on mobile */}
        <div className="flex justify-center gap-3 mb-5 md:hidden">
          {testimonials.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === index 
                  ? 'bg-primary-400 w-6' 
                  : 'bg-dark-600 w-1.5'
              }`}
            />
          ))}
        </div>
        
        {/* Mobile: Horizontal scroll container / Desktop: Grid layout */}
        <div 
          ref={scrollContainerRef}
          className={`
            md:grid md:grid-cols-3 md:gap-8
            flex overflow-x-auto snap-x snap-mandatory scrollbar-hide
            -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible
            pb-6 md:pb-0
          `}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`
                relative overflow-hidden rounded-lg md:rounded-lg p-6 md:p-8
                backdrop-blur-md bg-dark-900/10
                border border-dark-300/30
                transition-colors duration-300
                group
                ${hoveredIndex === index ? 'shadow-[0_0_25px_rgba(255,255,255,0.15)]' : 'shadow-lg'}
                hover:border-transparent
                cursor-pointer
                flex-shrink-0 w-[80%] md:w-auto
                snap-center
                mr-5 md:mr-0
                min-h-[340px] md:min-h-0
                flex flex-col
              `}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onCursorChange('button');
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onCursorChange('default');
              }}
            >
              {/* Gradient background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} -z-10`}
                style={{
                  opacity: hoveredIndex === index ? 0.6 : 0,
                  transition: 'opacity 0.6s ease-in-out'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md -z-20" />
              
              {/* Subtle accent color based on testimonial - visible on both mobile and desktop */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} opacity-70`} />
              
              {/* Quote icon */}
              <div className="mb-6 relative">
                <svg className="w-10 h-10 text-primary-500/20 absolute -top-2 -left-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="flex space-x-1 ml-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary-300">★</span>
                  ))}
                </div>
              </div>
              
              {/* Testimonial content */}
              <div className="relative flex flex-col flex-grow">
                <p className="text-dark-200 mb-8 italic leading-relaxed line-clamp-4">
                  {testimonial.quote[0]}
                </p>
                
                <div className="mt-auto">
                  <button 
                    onClick={() => openLightbox(testimonial)}
                    className="mb-6 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 hover:from-primary-500/15 hover:to-accent-500/15 border border-primary-500/20 rounded-md text-primary-300 text-sm transition-all duration-300 flex items-center"
                    onMouseEnter={() => onCursorChange('button')}
                    onMouseLeave={() => onCursorChange('default')}
                  >
                    <span>Keep Reading</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  
                  {/* Company and person info */}
                  <div className="flex items-center pt-4 border-t border-dark-300/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center text-lg font-light text-white mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-primary-200 font-light">{testimonial.company}</div>
                      <div className="text-dark-400 text-sm">{testimonial.name} - {testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile scroll hint - Only visible on mobile */}
        <div className="flex items-center justify-center gap-2 text-dark-500 text-xs mt-5 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
          <span>Swipe to explore more testimonials</span>
        </div>
      </div>

      {/* Lightbox - keeping animations for better UX */}
      {selectedTestimonial && createPortal(
        <AnimatePresence>
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="bg-dark-900/90 border border-dark-300/30 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl text-primary-200 font-light">{selectedTestimonial.company}</h3>
                  <p className="text-dark-400">{selectedTestimonial.name} - {selectedTestimonial.role}</p>
                </div>
                <button 
                  onClick={closeLightbox}
                  className="text-dark-400 hover:text-primary-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary-300">★</span>
                  ))}
                </div>
              </div>
              
              <div className="text-dark-200 italic leading-relaxed space-y-4">
                {Array.isArray(selectedTestimonial.quote) ? (
                  selectedTestimonial.quote.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{selectedTestimonial.quote}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
      
      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection; 