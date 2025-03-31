/**
 * Animation utility functions
 */

/**
 * Creates a staggered delay for animation children
 * @param index Index of the element in the array
 * @param baseDelay Base delay in seconds
 * @returns Delay in seconds
 */
export const getStaggeredDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

/**
 * Easing functions for animations
 */
export const easings = {
  easeInOut: [0.42, 0.0, 0.58, 1.0],
  easeOut: [0.0, 0.0, 0.58, 1.0],
  easeIn: [0.42, 0.0, 1.0, 1.0],
  // Cubic bezier values
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.43, 0.23, 0.23, 1.17]
}; 