import { useState, useCallback } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface UseContactFormOptions {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  validateOnChange?: boolean;
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const { onSubmit, validateOnChange = false } = options;
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateName = (value: string): string | undefined => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return undefined;
  };

  const validateSubject = (value: string): string | undefined => {
    if (!value.trim()) return 'Subject is required';
    if (value.trim().length < 5) return 'Subject must be at least 5 characters';
    return undefined;
  };

  const validateMessage = (value: string): string | undefined => {
    if (!value.trim()) return 'Message is required';
    if (value.trim().length < 10) return 'Message must be at least 10 characters';
    return undefined;
  };

  const validateField = useCallback((field: keyof ContactFormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'subject':
        return validateSubject(value);
      case 'message':
        return validateMessage(value);
      default:
        return undefined;
    }
  }, []);

  const validateForm = useCallback((): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};
    
    (Object.keys(formData) as (keyof ContactFormData)[]).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    return newErrors;
  }, [formData, validateField]);

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (validateOnChange) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [validateField, validateOnChange]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submission (you can implement your own logic here)
        console.log('Form submitted:', formData);
      }
      
      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ message: 'Failed to send message. Please try again.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  }, []);

  const isValid = Object.keys(validateForm()).length === 0;

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    isValid,
    updateField,
    handleSubmit,
    resetForm,
    setFieldError: (field: keyof ContactFormData, error: string) => {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };
}
