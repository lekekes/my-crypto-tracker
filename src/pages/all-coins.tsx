import { useState, useEffect } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faArrowsAltV,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
import Button from '../components/Button';

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

const CACHE_KEY = 'all_coins_list_cache';
const CACHE_EXPIRATION = 30 * 60 * 1000;
const FAVORITES_KEY = 'favoriteCoins';
const LIST_HEIGHT = 480;
const ITEM_SIZE = 80;

export default function Coins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrollable, setIsScrollable] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]); // Liste der favorisierten Coin-IDs

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

    const loadFavorites = () => {
      const storedFavorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || '[]',
      );
      setFavorites(storedFavorites.map((fav: { id: string }) => fav.id));
    };

    fetchCoins();
    loadFavorites();
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
    const maxVisibleItems = Math.floor(LIST_HEIGHT / ITEM_SIZE);
    setIsScrollable(filteredCoins.length > maxVisibleItems);
  }, [filteredCoins]);

  const handleBookmarkClick = (coin: Coin) => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || '[]',
    );

    const isFavorite = storedFavorites.some(
      (fav: { id: string }) => fav.id === coin.id,
    );

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(
        (fav: { id: string }) => fav.id !== coin.id,
      );
    } else {
      updatedFavorites = [
        ...storedFavorites,
        { id: coin.id, name: coin.name, symbol: coin.symbol },
      ];
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites.map((fav: { id: string }) => fav.id));
  };

  const handleDetailsClick = (coinId: string) => {
    window.location.href = `/coin-details/${coinId}`;
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <title>All Coins</title>
      <h1 className="mb-6 text-3xl font-extrabold text-gray-800 dark:text-white">
        Alle Kryptowährungen
      </h1>

      <Input
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Suche nach Name oder Symbol"
        className="mb-6"
      />

      <div
        className="relative overflow-y-auto rounded-md border border-gray-300 shadow-lg dark:border-gray-700"
        style={{ height: `${LIST_HEIGHT}px` }}
      >
        <List
          height={LIST_HEIGHT}
          itemCount={filteredCoins.length}
          itemSize={ITEM_SIZE}
          width="100%"
        >
          {({ index, style }: ListChildComponentProps) => {
            const coin = filteredCoins[index];
            const isFavorite = favorites.includes(coin.id);
            return (
              <div
                key={coin.id}
                style={style}
                className="flex items-center justify-between border-b border-gray-300 p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <div>
                  <h2 className="text-xl font-bold">{coin.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Symbol: {coin.symbol.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => handleDetailsClick(coin.id)}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <span className="block sm:hidden">Details</span>
                    <span className="hidden sm:block">Details ansehen</span>
                  </Button>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`cursor-pointer text-xl ${
                      isFavorite ? 'text-yellow-500' : 'text-gray-500'
                    } hover:text-yellow-500`}
                    title={
                      isFavorite
                        ? 'Von der Merkliste entfernen'
                        : 'Auf Merkliste speichern'
                    }
                    onClick={() => handleBookmarkClick(coin)}
                  />
                </div>
              </div>
            );
          }}
        </List>

        {isScrollable && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center space-x-2 text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon
              icon={faArrowsAltV}
              className="text-light-primary dark:text-dark-primary"
            />
            <span className="text-sm text-light-primary dark:text-dark-primary">
              Scrollen
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
