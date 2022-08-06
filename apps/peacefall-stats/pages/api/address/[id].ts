import type { NextApiRequest, NextApiResponse } from 'next';

export default async function addressHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(
          `https://peacefall.xyz/api/rankings/totalOwned?address=${id}`
        );
        const { data } = await response.json();

        const fetches = data.map(({ warrior_id }) =>
          fetch(`https://challengers.peacefall.xyz/${warrior_id}.json`)
        );

        const responses = await Promise.all([...fetches]);
        const fighters = await Promise.all(responses.map((r) => r.json()));

        res.status(200).json(fighters);
      } catch (error) {
        res.status(400).json({ error });
      }

      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
