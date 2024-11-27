interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change: number;
  image: string; // URL des Icons
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  marketCap,
  change,
  image,
}) => {
  const isPositive = change >= 0;

  return (
    <div className="p-4 border rounded-lg shadow-md flex items-center space-x-4">
      {/* Coin Icon */}
      <img src={image} alt={`${name} logo`} className="w-12 h-12" />

      {/* Coin Details */}
      <div>
        <h2 className="text-lg font-bold">
          {name} ({symbol.toUpperCase()})
        </h2>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Market Cap: ${marketCap.toLocaleString()}</p>
        <p
          className={`flex items-center space-x-2 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {/* Icon für Trend */}
          <i
            className={`fas ${
              isPositive ? "fa-arrow-trend-up" : "fa-arrow-trend-down"
            }`}
          ></i>
          <span>24h Change: {change.toFixed(2)}%</span>
        </p>
      </div>
    </div>
  );
};

export default CryptoCard;
