import {
  faArrowTrendDown,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface CoinStatsProps {
  coin: {
    current_price: number;
    price_change_percentage_24h: number;
    market_cap_rank: number;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
  };
}

export default function CoinStats({ coin }: CoinStatsProps) {
  return (
    <div className="mt-8 w-full rounded-md border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-1/2">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Kennzahlen
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Aktueller Preis
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            ${coin.current_price.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            24h-Änderung
          </p>
          <p
            className={`text-lg font-semibold ${
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
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Marktkapitalisierungsrang
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            #{coin.market_cap_rank}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Marktkapitalisierung
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            ${coin.market_cap.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            24h-Volumen
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            ${coin.total_volume.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            24h Hoch / Tief
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            ${coin.high_24h.toLocaleString()} / ${coin.low_24h.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
