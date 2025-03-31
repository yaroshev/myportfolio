import React, { useState, useEffect } from 'react';
import useDeviceDetect from '../core/hooks/useDeviceDetect';

// Interface for ResponsiveComponent props
interface ResponsiveProps {
  mobileComponent?: React.ComponentType<any>;
  desktopComponent?: React.ComponentType<any>;
  mobile?: React.ReactNode;
  desktop?: React.ReactNode;
  [key: string]: any;
}

/**
 * A component that renders different components based on the device type.
 * It uses the useDeviceDetect hook to determine if the device is mobile or desktop.
 */
export const ResponsiveComponent: React.FC<ResponsiveProps> = ({
  mobileComponent: MobileComponent,
  desktopComponent: DesktopComponent,
  mobile,
  desktop,
  ...props
}) => {
  const { isMobile, isDesktop } = useDeviceDetect();
  const [mounted, setMounted] = useState(false);
  
  // Use useEffect to handle SSR (client-side only rendering of responsive components)
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render anything until mounted (client-side)
  if (!mounted) return null;
  
  // If using mobile/desktop props pattern
  if (mobile !== undefined && desktop !== undefined) {
    return isMobile ? <>{mobile}</> : <>{desktop}</>;
  }
  
  // If using mobileComponent/desktopComponent props pattern
  if (MobileComponent && DesktopComponent) {
    return isMobile ? <MobileComponent {...props} /> : <DesktopComponent {...props} />;
  }
  
  // Fallback if neither pattern is used correctly
  return null;
};

/**
 * A helper function to get responsive components based on device type.
 * This is useful when you need to get components dynamically.
 */
export const getResponsiveComponent = (path: string, component: string) => {
  const mobileComponent = React.lazy(() => /* @vite-ignore */ import(`./mobile/${path}/${component}/component`));
  const desktopComponent = React.lazy(() => /* @vite-ignore */ import(`./desktop/${path}/${component}/component`));
  
  return {
    mobileComponent,
    desktopComponent
  };
};

export default ResponsiveComponent; 