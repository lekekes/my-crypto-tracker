// pages/coin-details/[id].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import CryptoSearch from '@/components/CryptoSearch';
import LineChart from '@/components/LineChart';

export default function CoinDetailsById() {
  const router = useRouter();
  const { id } = router.query;

  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSelect = (coin: { id: string } | null) => {
    if (coin) {
      router.push(`/coin-details/${coin.id}`);
    }
  };

  const fetchCoinsWithCache = async () => {
    const now = Date.now();
    const cachedData = localStorage.getItem('cachedCoins');

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (now - timestamp < 30 * 60 * 1000) {
        console.log('Coins aus Cache geladen.');
        return data;
      }
    }

    console.log('Coins aus API geladen.');
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list');

    if (
      !response.ok ||
      !response.headers.get('content-type')?.includes('json')
    ) {
      throw new Error('Fehler beim Abrufen der Coins');
    }

    const coins = await response.json();
    localStorage.setItem(
      'cachedCoins',
      JSON.stringify({ data: coins, timestamp: now }),
    );

    return coins;
  };

  useEffect(() => {
    if (id && typeof id === 'string') {
      setLoading(true);
      (async () => {
        try {
          const coins = await fetchCoinsWithCache();
          const foundCoin = coins.find(
            (coin: { id: string }) => coin.id === id.toLowerCase(),
          );
          setIsFallback(!foundCoin);
        } catch (error) {
          console.error('Fehler beim Abrufen der Coins:', error);
          setIsFallback(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
        Coin Details
      </h1>

      {!isFallback && !loading && (
        <div className="mt-8 max-w-2xl px-4 sm:px-0">
          <CryptoSearch onSelect={handleSelect} />
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-gray-600 dark:text-gray-300">
          Lade Coin-Daten...
        </p>
      ) : isFallback ? (
        <div className="mt-16 flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-6xl text-gray-500 dark:text-gray-300"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-700 dark:text-gray-200">
            Kein Coin gefunden
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Bitte wählen Sie einen gültigen Coin aus.
          </p>

          <div className="mt-6 w-full max-w-2xl px-4 sm:px-0">
            <CryptoSearch onSelect={handleSelect} />
          </div>
        </div>
      ) : (
        <div className="mt-8 max-w-4xl">
          <LineChart coinId={id as string} />
        </div>
      )}
    </div>
  );
}
