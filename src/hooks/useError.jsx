import { useState, useCallback } from 'react';

const useError = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleError = useCallback((error) => {
    setError(error.message || 'An error occurred');
    setIsError(true);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setIsError(false);
  }, []);

  return {
    error,
    isError,
    handleError,
    clearError
  };
};

export default useError;
