import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/work';
import About from './pages/about';
import Resources from './pages/Resources';
import { Helmet } from 'react-helmet-async';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(() => {
    // Check if this is the first load of the session
    return !localStorage.getItem('hasVisited');
  });
  const [scrollY, setScrollY] = useState(0);
  
  // Get current page from URL
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/work') return 'work';
    if (path === '/about') return 'about';
    if (path === '/resources') return 'resources';
    return 'home';
  };
  
  const activePage = getActivePage();
  
  // Function to handle page navigation
  const setActivePage = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
  };
  
  // Handle initial load and scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Only show loading animation on first visit
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasVisited', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Get page-specific SEO data
  const getPageSeoData = () => {
    switch (activePage) {
      case 'home':
        return {
          title: 'Yaroslav Shevchenko | Digital Creator & Web Designer',
          description: 'Portfolio of Yaroslav Shevchenko - Digital Creator & Web Designer specializing in modern web experiences, UI/UX design, and creative digital solutions.',
          canonicalUrl: 'https://yaroshev.com/'
        };
      case 'work':
        return {
          title: 'Work & Projects | Yaroslav Shevchenko',
          description: 'Explore the portfolio and projects of Yaroslav Shevchenko, showcasing web design, UI/UX, and digital creation work.',
          canonicalUrl: 'https://yaroshev.com/work'
        };
      case 'about':
        return {
          title: 'About Yaroslav Shevchenko | Digital Creator',
          description: 'Learn about Yaroslav Shevchenko, a digital creator and web designer with expertise in creating modern digital experiences.',
          canonicalUrl: 'https://yaroshev.com/about'
        };
      case 'resources':
        return {
          title: 'Resources | Yaroslav Shevchenko',
          description: 'Useful resources, tools, and insights shared by Yaroslav Shevchenko for web design and digital creation.',
          canonicalUrl: 'https://yaroshev.com/resources'
        };
      default:
        return {
          title: 'Yaroslav Shevchenko | Digital Creator & Web Designer',
          description: 'Portfolio of Yaroslav Shevchenko - Digital Creator & Web Designer specializing in modern web experiences, UI/UX design, and creative digital solutions.',
          canonicalUrl: 'https://yaroshev.com/'
        };
    }
  };

  const seoData = getPageSeoData();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-light tracking-widest">
          <div className="flex items-center">
            <span className="opacity-0 animate-fadeIn">Y</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '100ms' }}>A</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '200ms' }}>R</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '300ms' }}>O</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '400ms' }}>S</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '500ms' }}>L</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '600ms' }}>A</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '700ms' }}>V</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '800ms' }}>&nbsp;</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '900ms' }}>S</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1000ms' }}>H</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1100ms' }}>E</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1200ms' }}>V</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1300ms' }}>C</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1400ms' }}>H</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1500ms' }}>E</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1600ms' }}>N</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1700ms' }}>K</span>
            <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '1800ms' }}>O</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
      </Helmet>
      
      <div className="min-h-screen bg-dark-950 text-dark-100 flex flex-col relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="fixed inset-0 bg-gradient-radial from-dark-900/50 via-dark-950 to-black opacity-80 z-0"
        />
        
        {/* Noise texture overlay */}
        <div 
          className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0"
        />
        
        <Header 
          activePage={activePage} 
          setActivePage={setActivePage} 
          scrollY={scrollY} 
        />
        
        <main className="flex-grow relative z-10" role="main" aria-label={`${activePage} page content`}>
          <Routes>
            <Route path="/" element={<Home setActivePage={setActivePage} />} />
            <Route path="/work" element={<Work setActivePage={setActivePage} />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        
        <Footer setActivePage={setActivePage} />
      </div>
    </>
  );
}

export default App;