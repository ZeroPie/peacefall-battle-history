import type { NextApiRequest, NextApiResponse } from 'next';

export default async function fighterHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { address },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(
          `https://peacefall.xyz/api/rankings/totalOwned?address=${address}`
        );
        const fighter = await response.json();
        res.status(200).json({ address, ...fighter });
      } catch (error) {
        res.status(400).json({ error });
      }

      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
