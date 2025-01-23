import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import CryptoSearch from '@/components/CryptoSearch';
import LineChart from '@/components/coin-details/LineChart';
import CoinStats from '@/components/coin-details/CoinStats';
import HandelsvolumenChart from '@/components/coin-details/VolumeChart';

const CACHE_DURATION = 30 * 60 * 1000; // 30 Minuten

export default function CoinDetailsById() {
  const router = useRouter();
  const { id } = router.query;

  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<{
    id: string;
    name: string;
    symbol: string;
  } | null>(null);

  const [coinData, setCoinData] = useState<any | null>(null);
  const [volumeData, setVolumeData] = useState<
    { date: string; volume: number }[]
  >([]);

  const handleSelect = (coin: { id: string } | null) => {
    if (coin) {
      router.push(`/coin-details/${coin.id}`);
    }
  };

  const fetchWithCache = async (key: string, fetcher: () => Promise<any>) => {
    const now = Date.now();
    const cachedData = localStorage.getItem(key);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (now - timestamp < CACHE_DURATION) {
        console.log(`Daten für ${key} aus Cache geladen.`);
        return data;
      }
    }

    console.log(`Daten für ${key} aus API geladen.`);
    const data = await fetcher();
    localStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
    return data;
  };

  const fetchCoinsWithCache = () => {
    return fetchWithCache('cachedCoins', async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/list',
      );
      if (
        !response.ok ||
        !response.headers.get('content-type')?.includes('json')
      ) {
        throw new Error('Fehler beim Abrufen der Coins');
      }
      return response.json();
    });
  };

  const fetchCoinData = (coinId: string) => {
    return fetchWithCache(`coinData_${coinId}`, async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&sparkline=false`,
      );
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Coin-Daten');
      }
      const data = await response.json();
      return data[0];
    });
  };

  const fetchVolumeData = (coinId: string) => {
    return fetchWithCache(`volumeData_${coinId}`, async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`,
      );
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Volumendaten');
      }
      const data = await response.json();
      if (!data.total_volumes) {
        return [];
      }
      return data.total_volumes.map(
        ([timestamp, volume]: [number, number]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          volume,
        }),
      );
    });
  };

  useEffect(() => {
    if (id && typeof id === 'string') {
      setLoading(true);
      (async () => {
        try {
          const coins = await fetchCoinsWithCache();
          const foundCoin = coins.find(
            (coin: { id: string; name: string; symbol: string }) =>
              coin.id === id.toLowerCase(),
          );
          setIsFallback(!foundCoin);
          setSelectedCoin(foundCoin || null);

          if (foundCoin) {
            const coinDetails = await fetchCoinData(foundCoin.id);
            const volumeDetails = await fetchVolumeData(foundCoin.id);

            setCoinData(coinDetails);
            setVolumeData(volumeDetails);
          }
        } catch (error) {
          console.error('Fehler beim Abrufen der Daten:', error);
          setIsFallback(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <title>{`Details: ${id || 'Loading...'}`}</title>
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
        Coin Details
      </h1>

      {!isFallback && !loading && (
        <div className="mt-8 max-w-2xl px-4 sm:px-0">
          <CryptoSearch onSelect={handleSelect} selectedCoin={selectedCoin} />
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
            <CryptoSearch onSelect={handleSelect} selectedCoin={selectedCoin} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap">
          <LineChart coinId={id as string} />
          {volumeData.length > 0 && (
            <HandelsvolumenChart volumes={volumeData} />
          )}
          {coinData && <CoinStats coin={coinData} />}
        </div>
      )}
    </div>
  );
}
