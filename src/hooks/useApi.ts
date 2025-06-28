
import { useState, useEffect } from 'react';

interface UseApiOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

interface ApiResult<TData> {
  data: TData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useApi<TData>(
  apiFunction: () => Promise<TData>,
  options: UseApiOptions<TData> = {}
): ApiResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData().catch((err) => console.error('Initial fetch error:', err));
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}

interface MutationOptions<TData, TParams> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error, params: TParams) => void;
  onSettled?: (data: TData | null, error: Error | null) => void;
}

interface MutationResult<TData, TParams> {
  data: TData | null;
  isLoading: boolean;
  error: Error | null;
  mutate: (params: TParams) => Promise<TData | null>;
}

export function useApiMutation<TData, TParams>(
  mutationFunction: (params: TParams) => Promise<TData>,
  options: MutationOptions<TData, TParams> = {}
): MutationResult<TData, TParams> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (params: TParams): Promise<TData | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await mutationFunction(params);
      setData(result);
      options.onSuccess?.(result);
      options.onSettled?.(result, null);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      options.onError?.(error, params);
      options.onSettled?.(null, error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
