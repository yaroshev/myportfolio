import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'outlined' | 'glass';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  variant = 'default'
}) => {
  // Base classes for all cards
  const baseClasses = 'rounded-lg transition-all duration-300';
  
  // Variant-specific classes
  const variantClasses = {
    default: 'bg-neutral-900/90 border border-neutral-800',
    outlined: 'bg-transparent border border-neutral-800',
    glass: 'backdrop-blur-sm bg-neutral-900/20 border border-neutral-800/50'
  };
  
  // Interactive classes (hover, click)
  const interactiveClasses = hoverable 
    ? 'cursor-pointer transform hover:-translate-y-1 hover:shadow-lg hover:border-neutral-700'
    : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card; 