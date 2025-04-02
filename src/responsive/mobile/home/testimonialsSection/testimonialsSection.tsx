import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeProps } from '../../../../core/types/home';

interface TestimonialsSectionProps extends Pick<HomeProps, 'onCursorChange'> {}

interface Testimonial {
  quote: string[];
  name: string;
  role: string;
  company: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [lightboxSwipeStart, setLightboxSwipeStart] = useState<number | null>(null);
  const [lightboxSwipeDistance, setLightboxSwipeDistance] = useState(0);
  const [lightboxSwipeStartY, setLightboxSwipeStartY] = useState<number | null>(null);
  const [lightboxSwipeDistanceY, setLightboxSwipeDistanceY] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // Center the initial card on load
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    // Set initial active card to the middle card
    const middleIndex = Math.floor(testimonials.length / 2);
    setActiveCardIndex(middleIndex);
    setActiveIndex(middleIndex); // Also set activeIndex to middle card initially
    
    // Calculate scroll position to center the middle card
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = containerWidth * 0.80; // 80% of container width
    const spacerWidth = containerWidth * 0.10; // 10% of container width (spacer)
    const marginWidth = containerWidth * 0.025; // 2.5% of container width (margin)
    
    // Position to the middle card taking into account the spacer at start and margins
    const scrollPosition = spacerWidth + (middleIndex * (cardWidth + 2 * marginWidth));
    
    // Add a small delay to ensure the DOM is fully rendered
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }, 100);
  }, [testimonials.length]);

  // Handle scroll snap
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardWidth = containerWidth * 0.80; // 80% of container width
      const spacerWidth = containerWidth * 0.10; // 10% of container width
      const marginWidth = containerWidth * 0.025; // 2.5% of container width
      
      // Account for the spacer at the beginning
      const adjustedScrollPosition = scrollPosition - spacerWidth;
      
      // Calculate the index considering all widths (card + margins)
      const newActiveIndex = Math.round(adjustedScrollPosition / (cardWidth + 2 * marginWidth));
      const limitedActiveIndex = Math.max(0, Math.min(newActiveIndex, testimonials.length - 1));
      
      setActiveCardIndex(limitedActiveIndex);
      setActiveIndex(limitedActiveIndex); // Update active index to match center card
    };
    
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [testimonials.length]);

  const openLightbox = (testimonial: Testimonial) => {
    const index = testimonials.findIndex(t => t.company === testimonial.company);
    setSelectedTestimonialIndex(index);
    setSelectedTestimonial(testimonial);
    document.body.style.overflow = 'hidden';
  };

  const navigateTestimonial = (direction: 'prev' | 'next') => {
    // Set slide direction for animation
    setSlideDirection(direction === 'prev' ? 'right' : 'left');
    
    const newIndex = direction === 'next' 
      ? (selectedTestimonialIndex + 1) % testimonials.length
      : selectedTestimonialIndex - 1 < 0 
        ? testimonials.length - 1 
        : selectedTestimonialIndex - 1;
    
    setSelectedTestimonialIndex(newIndex);
    setSelectedTestimonial(testimonials[newIndex]);
    
    // Reset swipe values
    setLightboxSwipeDistance(0);
    setLightboxSwipeDistanceY(0);
  };

  const closeLightbox = () => {
    setSelectedTestimonial(null);
    document.body.style.overflow = 'auto';
  };

  // Touch events for smooth scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle lightbox swipe gestures
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    setLightboxSwipeStart(e.touches[0].clientX);
    setLightboxSwipeStartY(e.touches[0].clientY);
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    if (!lightboxSwipeStart || !lightboxSwipeStartY) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const distanceX = currentX - lightboxSwipeStart;
    const distanceY = currentY - lightboxSwipeStartY;
    
    // Determine if the swipe is more horizontal or vertical
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      setLightboxSwipeDistance(distanceX);
    } else {
      setLightboxSwipeDistanceY(distanceY);
    }
  };

  const handleLightboxTouchEnd = () => {
    if (!lightboxSwipeStart || !lightboxSwipeStartY) return;
    
    const threshold = 50; // Minimum distance to trigger swipe
    
    // Handle horizontal swipe
    if (Math.abs(lightboxSwipeDistance) > threshold) {
      if (lightboxSwipeDistance > 0) {
        setSlideDirection('right');
        navigateTestimonial('prev');
      } else {
        setSlideDirection('left');
        navigateTestimonial('next');
      }
    }
    
    // Handle vertical swipe
    if (lightboxSwipeDistanceY > threshold) {
      closeLightbox();
    }
    
    setLightboxSwipeStart(null);
    setLightboxSwipeStartY(null);
    setLightboxSwipeDistance(0);
    setLightboxSwipeDistanceY(0);
  };

  // Variants for the testimonial card animations
  const cardVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <>
      <section className="py-12 relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-radial from-dark-800/30 via-dark-900 to-black opacity-70 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl font-light tracking-tight text-center mb-6 font-display">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-accent-200">
              Client Testimonials
            </span>
          </h2>
          
          {/* Horizontal scroll container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 pb-6"
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
            {/* Add an empty spacer div at the start for better centering of first card */}
            <div className="flex-shrink-0 w-[10vw]" />
            
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`
                  relative flex-shrink-0 
                  w-[80%] 
                  overflow-hidden rounded-lg 
                  bg-dark-800/30
                  border border-dark-700/50
                  transition-all duration-300
                  ${activeCardIndex === index ? 'border-primary-500/30 shadow-[0_0_10px_rgba(56,189,248,0.1)]' : ''}
                  cursor-pointer
                  snap-center
                  mx-[2.5vw]
                  p-6
                `}
                onClick={() => openLightbox(testimonial)}
                onTouchStart={() => setActiveCardIndex(index)}
                onTouchEnd={() => {}}
              >
                {/* Active state highlight */}
                {activeCardIndex === index && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/5 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
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
                <p className="text-dark-200 mb-8 italic leading-relaxed overflow-hidden text-ellipsis relative flex-grow">
                  {testimonial.quote[0].length > 150 
                    ? testimonial.quote[0].substring(0, 150) + '...' 
                    : testimonial.quote[0]
                  }
                </p>
                
                {/* Author info */}
                <div className="flex items-center pt-4 border-t border-dark-300/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center text-lg font-light text-white mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-primary-200 font-light">{testimonial.company}</div>
                    <div className="text-dark-400 text-sm">{testimonial.name} - {testimonial.role}</div>
                  </div>
                </div>

                {/* Read more button */}
                <div className="absolute bottom-4 right-4 flex items-center opacity-70 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
            
            {/* Add an empty spacer div at the end for better centering of last card */}
            <div className="flex-shrink-0 w-[10vw]" />
          </div>
          
          {/* Scroll indicators */}
          <div className="flex justify-center gap-3 mt-2">
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
        </div>
      </section>

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div 
            className="fixed inset-0 z-[9999] bg-black/90 flex items-end justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <motion.div 
              className="relative bg-dark-900 border border-dark-700 rounded-t-2xl w-full h-[75vh] overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ 
                y: lightboxSwipeDistanceY > 0 ? lightboxSwipeDistanceY : 0,
                x: lightboxSwipeDistance
              }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                touchAction: 'pan-y',
                transform: `translate(${lightboxSwipeDistance}px, ${lightboxSwipeDistanceY > 0 ? lightboxSwipeDistanceY : 0}px)`
              }}
            >
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-dark-700 rounded-full mx-auto my-3" />
              
              {/* Header with navigation and close */}
              <div className="flex items-center justify-between px-6 pb-3 border-b border-dark-700/50">
                {/* Previous button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTestimonial('prev');
                  }}
                  className="h-9 w-9 rounded-full flex items-center justify-center text-dark-400 bg-dark-800/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Company, Avatar and Name Info */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center text-md font-light text-white mr-3">
                      {selectedTestimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-primary-300 font-medium">{selectedTestimonial.company}</h4>
                      <p className="text-dark-400 text-xs">{selectedTestimonial.name} - {selectedTestimonial.role}</p>
                    </div>
                  </div>
                  {/* Star rating */}
                  <div className="flex space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
                
                {/* Next button */}
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTestimonial('next');
                  }}
                  className="h-9 w-9 rounded-full flex items-center justify-center text-dark-400 bg-dark-800/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              </div>
              
              {/* Swipe indication - only shown initially */}
              <div className="absolute top-20 left-0 right-0 flex justify-center pointer-events-none opacity-70">
                <motion.div 
                  className="bg-dark-800/80 rounded-full py-1 px-3 flex items-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-dark-200 text-xs">Swipe to navigate</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Content container */}
              <div className="h-[calc(75vh-65px)] overflow-hidden relative">
                <AnimatePresence custom={slideDirection} initial={false} mode="sync">
                <motion.div 
                  key={selectedTestimonialIndex}
                  custom={slideDirection}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 400, damping: 30 },
                      opacity: { duration: 0.3 }
                    }}
                    className="p-6 h-full overflow-y-auto absolute inset-0"
                  >
                  {/* Complete quote with fixed height container */}
                    <div className="mb-6 space-y-4 text-left">
                    {selectedTestimonial.quote.map((paragraph, i) => (
                      <p key={i} className="text-dark-200 text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestimonialsSection; 