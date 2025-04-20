import { useState, useCallback } from 'react';

const useForm = (initialState = {}, validations = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    const validation = validations[name];
    if (!validation) return '';

    if (validation.required && !value) {
      return 'Este campo es requerido';
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      return validation.message || 'Formato inválido';
    }

    if (validation.custom) {
      return validation.custom(value);
    }

    return '';
  }, [validations]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const handleSubmit = useCallback(async (submitFn) => {
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors = {};
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await submitFn(values);
        return true;
      } catch (error) {
        setErrors(prev => ({ ...prev, submit: error.message }));
        return false;
      }
    }
    setIsSubmitting(false);
    return false;
  }, [values, validateField]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors
  };
};

export default useForm;
