// pages/coin-details/index.tsx

import React from 'react';
import { useRouter } from 'next/router';
import CryptoSearch from '@/components/CryptoSearch';

export default function CoinDetailsIndex() {
  const router = useRouter();

  // Auswahl-Handler für die Suche
  const handleSelect = (coin: { id: string } | null) => {
    if (coin?.id) {
      router.push(`/coin-details/${coin.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
        Coin Details
      </h1>

      <div className="mt-16 max-w-2xl">
        <CryptoSearch onSelect={handleSelect} />
      </div>
    </div>
  );
}
