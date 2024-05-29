import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('gameness_task');
      const tasks = database.collection('task');
      const tasksList = await tasks.find({}).toArray();
      res.status(200).json(tasksList);
    } catch (error: any) {
      res.status(500).json({ message: 'Unable to connect to database', error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;