import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionToken = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'];
    
    if (!sessionToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ token: sessionToken });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
