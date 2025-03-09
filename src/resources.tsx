import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import Resources from './pages/Resources';
import './index.css';

// Create a simplified page component
const ResourcesPage = () => {
  const activePage = 'resources';
  
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
        setActivePage={(page) => {
          if (page === 'home') window.location.href = '/';
          else window.location.href = `/${page}`;
        }} 
        scrollY={0} 
      />
      
      <main className="flex-grow relative z-10" role="main" aria-label="resources page content">
        <Resources />
      </main>
      
      <Footer setActivePage={(page) => {
        if (page === 'home') window.location.href = '/';
        else window.location.href = `/${page}`;
      }} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResourcesPage />
  </StrictMode>
); 