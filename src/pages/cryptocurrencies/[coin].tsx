import { useRouter } from "next/router";

const CryptocurrencyDetail = () => {
  const router = useRouter();
  const { coin } = router.query;

  // Symbol sicher als string behandeln
  const currencyCoin = Array.isArray(coin) ? coin[0] : coin;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Details für {currencyCoin ? currencyCoin.toUpperCase() : "Währung"}
      </h1>

      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="font-semibold text-lg">Chart</h2>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <p>Interaktiver Chart für {currencyCoin}</p>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white shadow rounded-lg">
        <h2 className="font-semibold text-lg">Details</h2>
        <ul className="list-disc ml-4 mt-2">
          <li>Preis: $30,000</li>
          <li>Marktkapitalisierung: $500 Mrd.</li>
          <li>24h Veränderung: +2%</li>
        </ul>
      </div>
    </div>
  );
};

export default CryptocurrencyDetail;
