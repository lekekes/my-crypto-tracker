import { useState } from "react";

interface Coin {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
}

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Coin[]>([
    { id: 1, name: "Bitcoin", symbol: "BTC", price: "$30,000", change: "+2%" },
    { id: 2, name: "Ethereum", symbol: "ETH", price: "$2,000", change: "-1%" },
  ]);

  const handleRemove = (id: number) => {
    setWatchlist(watchlist.filter((coin) => coin.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Meine Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Deine Watchlist ist leer. Füge Kryptowährungen hinzu, um sie hier zu
          sehen.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {watchlist.map((coin) => (
            <div
              key={coin.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{coin.name}</h2>
                <p className="text-gray-500">{coin.symbol}</p>
              </div>
              <div>
                <p className="text-green-600 font-bold">{coin.price}</p>
                <p className="text-sm">{coin.change}</p>
              </div>
              <button
                onClick={() => handleRemove(coin.id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Entfernen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
