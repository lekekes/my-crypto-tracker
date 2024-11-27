import { useState } from "react";

const Cryptocurrencies = () => {
  const [search, setSearch] = useState("");

  const dummyData = [
    { id: 1, name: "Bitcoin", symbol: "BTC", price: "$30,000", change: "+2%" },
    { id: 2, name: "Ethereum", symbol: "ETH", price: "$2,000", change: "-1%" },
  ];

  const filteredData = dummyData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Kryptowährungen</h1>

      <input
        type="text"
        placeholder="Suche Kryptowährung..."
        className="border border-gray-300 p-2 w-full mb-4 rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.map((coin) => (
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
            <a
              href={`/cryptocurrencies/${coin.symbol}`}
              className="text-blue-500 underline ml-4"
            >
              Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
