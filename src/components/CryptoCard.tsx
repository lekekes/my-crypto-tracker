import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '@/contexts/DarkModeContext';
import SparklineChart from './SparkLineChart';
import Button from './Button';
import Modal from './Modal'; // Importiere die Modal-Komponente

interface CryptoCardProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    image: string;
    sparkline_in_7d: { price: number[] };
  };
  delay: number; // Verzögerung für die Animation
  showBookmarkButton?: boolean; // Optional: Zeigt den Merk-Button an
  showXMark?: boolean; // Optional: Zeigt das XMark-Icon an
  onRemove?: () => void; // Funktion, die beim Entfernen ausgelöst wird
}

const FAVORITES_KEY = 'favoriteCoins';

export default function CryptoCard({
  coin,
  delay,
  showBookmarkButton = true,
  showXMark = false,
  onRemove,
}: CryptoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal-Zustand
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    setIsFavorite(favorites.some((fav: { id: string }) => fav.id === coin.id));
  }, [coin.id]);

  const handleBookmarkClick = () => {
    const FAVORITES_KEY = 'favoriteCoins';
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');

    // Überprüfen, ob der Coin bereits in den Favoriten ist
    const isFavorite = favorites.some(
      (fav: { id: string }) => fav.id === coin.id,
    );

    if (isFavorite) {
      // Entferne den Coin aus den Favoriten
      const updatedFavorites = favorites.filter(
        (fav: { id: string }) => fav.id !== coin.id,
      );
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Füge den Coin zu den Favoriten hinzu
      const updatedFavorites = [
        ...favorites,
        { id: coin.id, name: coin.name, symbol: coin.symbol },
      ];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  const handleDetailsClick = () => {
    window.location.href = `/coin-details/${coin.id}`;
  };

  const borderColor =
    coin.price_change_percentage_24h >= 0 ? '#4caf50' : '#f44336';

  return (
    <>
      <div
        className={`relative flex flex-col items-start overflow-hidden rounded-md border p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="absolute right-4 top-4 z-20">
          {showBookmarkButton && (
            <FontAwesomeIcon
              icon={faStar}
              className={`cursor-pointer text-xl ${
                isFavorite ? 'text-yellow-500' : 'text-gray-500'
              } hover:text-yellow-500`}
              title={
                isFavorite
                  ? 'Von der Merkliste entfernen'
                  : 'Auf Merkliste speichern'
              }
              onClick={handleBookmarkClick}
            />
          )}
          {showXMark && (
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer text-xl text-gray-500 hover:text-red-500"
              title="Entfernen"
              onClick={() => setIsModalOpen(true)} // Öffnet das Modal
            />
          )}
        </div>
        <div className="absolute inset-0 z-10 opacity-20 transition-opacity duration-300 hover:opacity-30">
          <SparklineChart
            data={coin.sparkline_in_7d.price}
            id={coin.id}
            borderColor={borderColor}
          />
        </div>
        <img
          src={coin.image}
          alt={coin.name}
          className="z-0 mb-6 h-14 w-14 rounded-full"
        />
        <h2 className="z-0 mb-2 text-2xl font-bold">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h2>
        <p className="z-0 mb-2 text-sm">
          Preis:{' '}
          <span className="text-lg font-semibold">
            ${coin.current_price.toFixed(2)}
          </span>
        </p>
        <p className="z-0 mb-4 text-sm">
          24h-Änderung:{' '}
          <span
            className={`flex items-center font-bold ${
              coin.price_change_percentage_24h >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
            <FontAwesomeIcon
              icon={
                coin.price_change_percentage_24h >= 0
                  ? faArrowTrendUp
                  : faArrowTrendDown
              }
              className="ml-2"
            />
          </span>
        </p>
        <p className="z-0 text-sm">
          Marktkapitalisierung:{' '}
          <span className="font-bold">${coin.market_cap.toLocaleString()}</span>
        </p>
        <Button onClick={handleDetailsClick} className="z-20 mt-4">
          Details ansehen
        </Button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Schließt das Modal
        onConfirm={() => {
          if (onRemove) {
            onRemove(); // Ruft die `onRemove`-Funktion auf
          }
          setIsModalOpen(false); // Schließt das Modal
        }}
        title="Möchten Sie diesen Coin entfernen?"
        description={`Sind Sie sicher, dass Sie ${coin.name} von der Liste entfernen möchten?`}
        confirmText="Entfernen"
        cancelText="Abbrechen"
      />
    </>
  );
}
