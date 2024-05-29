import { useState, useEffect } from 'react';

interface User {
  _id: string,
  refId: string;
  twitter: string;
  discord: string;
  telegram: string;
  name?: string;
  screenName?: string;
  refMultiplier: number;
  refPoints: number;
  taskPoints: number,
  totalPoints: number,
  finishedMissions: string[],
  refList: string[]
}

function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getUser?userID=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data: User = await response.json();
        setUser(data);
        setIsLoading(false);
        setError(null);
      } catch (error: any) {
        setError(error.message || 'An error occurred');
        setUser(null);
      }
    }
    fetchUser();
  }, [userId]);

  const getUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getUser?userID=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data: User = await response.json();
      setUser(data);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, error, isLoading, getUser };
}

export default useUser;