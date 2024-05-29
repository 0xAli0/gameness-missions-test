import { useState, useEffect } from 'react';

export interface Task {
  _id: string;
  mission_title: string;
  mission_type: string;
  mission_description: string;
  mission_point: number;
  mission_link: string;
  mobile_mission_link: string;
}

interface TasksHook {
  tasks: Task[];
  error: string | null;
  isLoading: boolean;
  reloadTasks: () => void;
}

function useTasks(): TasksHook {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    reloadTasks();
  }, []);

  const reloadTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data: Task[] = await response.json();
      setTasks(data);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'An error occurred while fetching tasks');
    } finally {
      setIsLoading(false);
    }
  };

  return { tasks, error, isLoading, reloadTasks };
}

export default useTasks;