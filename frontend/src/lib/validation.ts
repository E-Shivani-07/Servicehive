/**
 * Form validation utilities for frontend forms
 */

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationRules = Record<
  string,
  Array<(value: any) => string | null>
>;

/**
 * Common validation rules
 */
export const validators = {
  required: (fieldName: string = 'This field') => (value: any) =>
    !value ? `${fieldName} is required` : null,

  minLength: (min: number) => (value: string) =>
    value?.length < min ? `Minimum length is ${min} characters` : null,

  maxLength: (max: number) => (value: string) =>
    value?.length > max ? `Maximum length is ${max} characters` : null,

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email' : null;
  },

  phone: (value: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return value && !phoneRegex.test(value)
      ? 'Please enter a valid phone number'
      : null;
  },

  match: (fieldValue: string, fieldName: string = 'field') => (value: string) =>
    value !== fieldValue ? `${fieldName} does not match` : null,

  password: (value: string) => {
    if (!value) return null;
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value))
      return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value))
      return 'Password must contain at least one lowercase letter';
    if (!/[\d]/.test(value))
      return 'Password must contain at least one number';
    return null;
  },

  url: (value: string) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  custom: (fn: (value: any) => boolean, message: string) => (value: any) =>
    !fn(value) ? message : null,
};

/**
 * Validate a single field against multiple rules
 */
export const validateField = (
  value: any,
  rules: Array<(value: any) => string | null>
): string | null => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

/**
 * Validate entire form data against validation rules
 */
export const validateForm = (
  data: Record<string, any>,
  rules: ValidationRules
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const field in rules) {
    const error = validateField(data[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
};

/**
 * Check if form has any errors
 */
export const hasErrors = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length > 0;
};

/**
 * Get all error messages as an array
 */
export const getErrorMessages = (errors: Record<string, string>): string[] => {
  return Object.values(errors).filter(Boolean);
};
