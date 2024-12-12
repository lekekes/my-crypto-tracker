import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import SparklineChart from './SparkLineChart';

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
}

export default function CryptoCard({ coin, delay }: CryptoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const { darkMode } = useDarkMode(); // Dark Mode Zustand aus dem Kontext

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={`relative flex flex-col items-start overflow-hidden rounded-xl border p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="absolute inset-0 opacity-20 transition-opacity duration-300 hover:opacity-30">
        <SparklineChart data={coin.sparkline_in_7d.price} id={coin.id} />
      </div>
      <img
        src={coin.image}
        alt={coin.name}
        className="mb-6 h-14 w-14 rounded-full"
      />
      <h2 className="mb-2 text-2xl font-bold">
        {coin.name} ({coin.symbol.toUpperCase()})
      </h2>
      <p className="mb-2 text-sm">
        Price:{' '}
        <span className="text-lg font-semibold">
          ${coin.current_price.toFixed(2)}
        </span>
      </p>
      <p className="mb-4 text-sm">
        24h Change:{' '}
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
      <p className="text-sm">
        Market Cap:{' '}
        <span className="font-bold">${coin.market_cap.toLocaleString()}</span>
      </p>
    </div>
  );
}
