import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Yaroslav Shevchenko - Digital Creator & Developer', 
  description = 'Personal portfolio of Yaroslav Shevchenko, a digital creator and web developer specializing in modern web technologies and creative solutions.'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
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
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header 
          activePage={activePage} 
          setActivePage={setActivePage} 
          scrollY={scrollY} 
        />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 