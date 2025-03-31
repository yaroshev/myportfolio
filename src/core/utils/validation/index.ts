/**
 * Validation utility functions
 */

/**
 * Check if a string is a valid email address
 * @param email Email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/**
 * Check if a string is empty or only whitespace
 * @param value String to check
 * @returns Boolean indicating if the string is empty
 */
export const isEmpty = (value: string): boolean => {
  return value.trim() === '';
}; 