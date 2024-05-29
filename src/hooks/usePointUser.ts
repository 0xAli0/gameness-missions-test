import { useState } from 'react';
import { pointUser, CheckPointResponse } from '@/pages/api/pointUser';
import toast from 'react-hot-toast';

interface UsePointUserResult {
  loading: boolean;
  error: string | null;
  response: CheckPointResponse | null;
  triggerPointUser: (userID: string, taskID: string) => void;
}

export function usePointUser(): UsePointUserResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<CheckPointResponse | null>(null);


  const triggerPointUser = async (userID: string, taskID: string) => {
    setLoading(true);
    setError(null);
    const loadingToastId = toast.loading('Checking the task...');
    try {
      const result = await pointUser(userID, taskID);
      setResponse(result);
      setLoading(false);
      toast.success('Task completed successfully!', {duration: 5000});
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      toast.error('There is a something wrong, try again later.', {duration: 5000});
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return {
    loading,
    error,
    response,
    triggerPointUser,
  };
}
