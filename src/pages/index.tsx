import { useEffect, useState } from "react";
import CryptoCard from "../components/CryptoCard";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image: string; // URL des Icons
}

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch("/api/coins");
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {coins.map((coin) => (
        <CryptoCard
          key={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.current_price}
          marketCap={coin.market_cap}
          change={coin.price_change_percentage_24h}
          image={coin.image} // Icon hinzufügen
        />
      ))}
    </div>
  );
};

export default Home;
