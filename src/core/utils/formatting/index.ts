/**
 * Formatting utility functions
 */

/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(value);
};

/**
 * Format a date
 * @param date Date to format
 * @param format Format style (default: medium)
 * @returns Formatted date string
 */
export const formatDate = (date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: format
  }).format(date);
}; 