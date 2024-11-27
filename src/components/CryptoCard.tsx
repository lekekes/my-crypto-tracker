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
        <p className={change >= 0 ? "text-green-600" : "text-red-600"}>
          24h Change: {change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CryptoCard;
