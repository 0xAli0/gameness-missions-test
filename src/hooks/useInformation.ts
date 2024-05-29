import { CheckInformationResponse, setInformation } from '@/pages/api/setInformation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface UseInformationResult {
  loading: boolean;
  error: string | null;
  response: CheckInformationResponse | null;
  trigerInformation: (userID: string, taskID: string, info: string) => void;
}

export function useInformation(): UseInformationResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<CheckInformationResponse | null>(null);


  const trigerInformation = async (userID: string, taskID: string, info: string) => {
    setLoading(true);
    setError(null);
    const loadingToastId = toast.loading('Setting data...');
    try {
      const result = await setInformation(userID, taskID, info);
      setResponse(result);
      setLoading(false);
      toast.success('Task recorded successfully!', {duration: 5000});
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
    trigerInformation,
  };
}
