import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Resources from './pages/Resources';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<Particle>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Particle class for background effect
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
    
    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = '#ffffff';
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    
    update(canvas: HTMLCanvasElement, mouseX: number, mouseY: number) {
      // Move particles
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Boundary check
      if (this.x < 0 || this.x > canvas.width) {
        this.speedX *= -1;
      }
      
      if (this.y < 0 || this.y > canvas.height) {
        this.speedY *= -1;
      }
      
      // Mouse interaction - particles move away from cursor
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 80) {
        const angle = Math.atan2(dy, dx);
        const force = (80 - distance) / 80;
        this.speedX += Math.cos(angle) * force * 0.2;
        this.speedY += Math.sin(angle) * force * 0.2;
      }
      
      // Speed limit
      const maxSpeed = 1.5;
      const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
      if (currentSpeed > maxSpeed) {
        this.speedX = (this.speedX / currentSpeed) * maxSpeed;
        this.speedY = (this.speedY / currentSpeed) * maxSpeed;
      }
    }
    
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  }
  
  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particlesRef.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 15000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas));
      }
    };
    
    initParticles();
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        initParticles();
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Animation loop for particles
  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(canvas, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });
      
      // Draw connections between particles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };
  
  // Render the active page
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'work':
        return <Work setActivePage={setActivePage} />;
      case 'about':
        return <About />;
      case 'resources':
        return <Resources />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

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
    <div className="min-h-screen bg-dark-950 text-dark-100 flex flex-col relative overflow-hidden">
      {/* Particle canvas background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 opacity-70"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
      
      {/* Background gradient */}
      <div 
        className="fixed inset-0 bg-gradient-radial from-dark-900/50 via-dark-950 to-black opacity-80 z-0"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        scrollY={scrollY} 
      />
      
      <main className="flex-grow relative z-10">
        {renderPage()}
      </main>
      
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;