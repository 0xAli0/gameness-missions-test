export interface CheckPointResponse {
  createUser?: boolean;
  error?: string;
}

export async function pointUser(userID: string, taskID: string): Promise<CheckPointResponse> {
  // Önce token'ı alalım
  const tokenResponse = await fetch('/api/getToken', {
    method: 'GET',
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to get session token');
  }

  const { token: sessionToken } = await tokenResponse.json();

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pointUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`
    },
    body: JSON.stringify({ userID, taskID })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: CheckPointResponse = await response.json();
  return data;
}