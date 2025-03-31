/**
 * Export all shared hooks from this file
 */

/**
 * Hook to detect when an element is visible in the viewport
 */
import { useState, useEffect, RefObject } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px'
  }
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}; 