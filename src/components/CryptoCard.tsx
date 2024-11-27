interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  marketCap,
  change,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold">
        {name} ({symbol.toUpperCase()})
      </h2>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Market Cap: ${marketCap.toLocaleString()}</p>
      <p className={change >= 0 ? "text-green-600" : "text-red-600"}>
        24h Change: {change.toFixed(2)}%
      </p>
    </div>
  );
};

export default CryptoCard;
