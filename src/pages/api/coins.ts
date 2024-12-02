import { NextApiRequest, NextApiResponse } from "next";

/*
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  const data = await response.json();
  res.status(200).json(data);
}
*/
import mockCoins from "@/mockData/coins.json"; // Import der Mock-Daten

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mockCoins); // Mock-Daten als Antwort zurückgeben
}
