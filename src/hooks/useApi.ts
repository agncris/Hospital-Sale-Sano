import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

interface ApiHookResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
}

export function useApi<T>(apiFunction: Function): ApiHookResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { jwtToken } = useAuth();

  const execute = useCallback(async (...args: any[]) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(jwtToken, ...args);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, jwtToken]);

  return { data, loading, error, execute };
}
