import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import './index.css';

// Create a simplified page component
const AboutPage = () => {
  const activePage = 'about';
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
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
        setActivePage={() => {}} 
        scrollY={scrollY} 
      />
      
      <main className="flex-grow relative z-10" role="main" aria-label="about page content">
        <About />
      </main>
      
      <Footer setActivePage={() => {}} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>
); 