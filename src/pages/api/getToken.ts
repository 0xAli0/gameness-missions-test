import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sessionToken = req.cookies['next-auth.session-token'];
    if (!sessionToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ token: sessionToken });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};