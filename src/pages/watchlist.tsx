import React, { useState, useEffect } from 'react';
import CryptoCard from '../components/cryptocard/CryptoCard';
import Head from 'next/head';

const FAVORITES_KEY = 'favoriteCoins';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
  sparkline_in_7d: SparklineIn7d;
}
interface Roi {
  times: number;
  currency: string;
  percentage: number;
}
interface SparklineIn7d {
  price: number[];
}

const Watchlist = () => {
  const [favoriteCoins, setFavoriteCoins] = useState<
    { id: string; name: string; symbol: string }[]
  >([]);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || '[]',
    );
    setFavoriteCoins(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      if (favoriteCoins.length === 0) {
        setCryptoData([]);
        return;
      }

      const ids = favoriteCoins.map((coin) => coin.id).join(',');

      if (!ids) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true`,
        );

        if (!response.ok) {
          throw new Error(
            `Fehler beim Abrufen der Daten: ${response.statusText}`,
          );
        }

        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Coin-Daten:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [favoriteCoins]);

  const handleRemoveFromFavorites = (coinId: string) => {
    const updatedFavorites = favoriteCoins.filter((coin) => coin.id !== coinId);
    setFavoriteCoins(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Merkliste</title>
      </Head>
      <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
        Merkliste
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Behalte deine favorisierten Coins im Blick.
      </p>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">
          Daten werden geladen...
        </p>
      ) : cryptoData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cryptoData.map((coin, index) => (
            <CryptoCard
              key={coin.id}
              coin={coin}
              delay={index * 100}
              showBookmarkButton={false} // Merk-Button deaktivieren
              showXMark={true} // XMark-Icon aktivieren
              onRemove={() => handleRemoveFromFavorites(coin.id)} // Entfernen-Handler
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          Du hast noch keine Coins zur Merkliste hinzugefügt.
        </p>
      )}
    </div>
  );
};

export default Watchlist;
