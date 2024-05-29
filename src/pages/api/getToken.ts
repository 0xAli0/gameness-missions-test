import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value || cookieStore.get('__Secure-next-auth.session-token')?.value;

    if (!sessionToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    res.status(200).json({ token: sessionToken });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
