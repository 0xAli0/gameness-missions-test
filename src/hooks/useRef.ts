import { useState } from 'react';
import { refUser, CheckRefResponse } from '@/pages/api/ref';

interface UseRefResult {
  loading: boolean;
  error: string | null;
  response: CheckRefResponse | null;
  triggerRef: (userID: string, refID: string) => void;
}

export function useRef(): UseRefResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<CheckRefResponse | null>(null);

  const triggerRef = async (userID: string, refID: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await refUser(userID, refID);
      setResponse(result);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    response,
    triggerRef,
  };
}
