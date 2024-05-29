import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionToken = req.cookies['next-auth.session-token'];
  if (req.method === 'GET') {
    const userId = req.query.userID as string;

    if (!userId) {
      res.status(400).json({ message: "No user ID provided" });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getUser?userID=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return res.status(response.status).json({ message: error.message || 'Error fetching user data' });
      }

      const user = await response.json();
      res.status(200).json(user);
    } catch (error: any) {
      console.log('Error fetching user data:', error);
      res.status(500).json({ message: 'Unable to connect to backend API', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;