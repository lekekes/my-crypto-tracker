import { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSpinner,
  faArrowsAltV,
} from '@fortawesome/free-solid-svg-icons';

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

const CACHE_KEY = 'all_coins_list_cache';
const CACHE_EXPIRATION = 30 * 60 * 1000;

export default function Coins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrollable, setIsScrollable] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - parseInt(cachedTimestamp, 10) < CACHE_EXPIRATION
      ) {
        const data = JSON.parse(cachedData).sort((a: Coin, b: Coin) =>
          a.name.localeCompare(b.name),
        );
        setCoins(data);
        setFilteredCoins(data);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list');
        const data = await res.json();

        const sortedData = data.sort((a: Coin, b: Coin) =>
          a.name.localeCompare(b.name),
        );

        localStorage.setItem(CACHE_KEY, JSON.stringify(sortedData));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());

        setCoins(sortedData);
        setFilteredCoins(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredCoins(coins);
    } else {
      const results = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredCoins(results);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const isScrollable =
        listRef.current.scrollHeight > listRef.current.clientHeight;
      setIsScrollable(isScrollable);
    }
  }, [filteredCoins]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-800 dark:text-white">
        Alle Kryptowährungen
      </h1>

      <div className="relative mb-6 w-full sm:w-1/2">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Suche nach Name oder Symbol"
          className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400"
        />
      </div>

      <div
        ref={listRef}
        className="relative overflow-y-auto rounded-xl border border-gray-300 shadow-lg dark:border-gray-700"
        style={{ height: '480px' }}
      >
        <List
          height={480}
          itemCount={filteredCoins.length}
          itemSize={80}
          width="100%"
        >
          {({ index, style }: ListChildComponentProps) => {
            const coin = filteredCoins[index];
            return (
              <div
                key={coin.id}
                style={style}
                className="flex justify-between border-b border-gray-300 p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <div>
                  <h2 className="text-xl font-bold">{coin.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Symbol: {coin.symbol.toUpperCase()}
                  </p>
                </div>
                <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                  ID: {coin.id}
                </p>
              </div>
            );
          }}
        </List>

        {isScrollable && (
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faArrowsAltV} />
            <span className="text-sm">Scrollen</span>
          </div>
        )}
      </div>
    </div>
  );
}
