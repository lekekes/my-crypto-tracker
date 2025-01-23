import React, { useState, useEffect } from 'react';
import CryptoCard from '../components/CryptoCard';

const FAVORITES_KEY = 'favoriteCoins';

const Watchlist = () => {
  const [favoriteCoins, setFavoriteCoins] = useState<
    { id: string; name: string; symbol: string }[]
  >([]);
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Lade die Favoriten aus dem Local Storage
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
