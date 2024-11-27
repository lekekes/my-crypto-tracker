import { useState } from "react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([
    "Bitcoin",
    "Ethereum",
    "Cardano",
  ]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Detailansicht für einzelne Währungen
      </h1>
      {watchlist.length > 0 ? (
        <ul className="list-disc list-inside">
          {watchlist.map((coin, index) => (
            <li key={index} className="text-gray-400">
              {coin}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">
          Your watchlist is empty. Add some coins to start tracking!
        </p>
      )}
    </div>
  );
};

export default Watchlist;
