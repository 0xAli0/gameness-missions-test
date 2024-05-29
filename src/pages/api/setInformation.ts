export interface CheckInformationResponse {
  createUser?: boolean;
  error?: string;
  message?: string;
}

export async function setInformation(userID: string, taskID: string, info: string): Promise<CheckInformationResponse> {
  const tokenResponse = await fetch('/api/getToken', {
    method: 'GET',
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to get session token');
  }

  const { token: sessionToken } = await tokenResponse.json();

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/setInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`
    },
    body: JSON.stringify({ userID, taskID, info })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: CheckInformationResponse = await response.json();
  return data;
}