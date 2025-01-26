import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoCard from '@/components/cryptocard/CryptoCard';
import Head from 'next/head';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  sparkline_in_7d: { price: number[] };
}

export default function Home() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const CACHE_KEY = 'cryptoDataCache';
  const CACHE_DURATION = 30 * 60 * 1000;

  useEffect(() => {
    const loadData = async () => {
      const cached = localStorage.getItem(CACHE_KEY);
      const now = Date.now();

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (now - timestamp < CACHE_DURATION) {
          setCryptoData(data);
          return;
        }
      }

      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true',
      );
      const data: CryptoData[] = await res.json();
      setCryptoData(data);

      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Startseite</title>
      </Head>
      <div className="my-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          CryptoTrack - Top 10 Kryptowährungen
        </h1>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {cryptoData.map((coin, index) => (
          <motion.div
            key={coin.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <CryptoCard coin={coin} delay={index * 100} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
