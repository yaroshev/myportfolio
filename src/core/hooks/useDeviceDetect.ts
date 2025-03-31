import { useState, useEffect } from 'react';

interface DeviceDetect {
  isMobile: boolean;
  isDesktop: boolean;
}

export const useDeviceDetect = (): DeviceDetect => {
  const [deviceType, setDeviceType] = useState<DeviceDetect>({
    isMobile: false,
    isDesktop: true
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType({
        isMobile: width < 768,
        isDesktop: width >= 768
      });
    };

    // Set initial device type
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};

export default useDeviceDetect; 