import AsyncSelect from "react-select/async";
import { useDarkMode } from "@/context/DarkModeContext";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

interface CryptoSearchProps {
  onSelect: (coin: Coin | null) => void;
}

const CACHE_KEY = "cachedCoins";
const CACHE_DURATION = 30 * 60 * 1000; // 30 Minuten

export default function CryptoSearch({ onSelect }: CryptoSearchProps) {
  const { darkMode } = useDarkMode(); // DarkMode Context nutzen

  const fetchCoinsWithCache = async (): Promise<Coin[]> => {
    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");

    if (
      !response.ok ||
      !response.headers.get("content-type")?.includes("json")
    ) {
      throw new Error("Fehler beim Abrufen der Coins");
    }

    const coins: Coin[] = await response.json();
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: coins, timestamp: now })
    );

    return coins;
  };

  const loadOptions = async (inputValue: string) => {
    try {
      const coins = await fetchCoinsWithCache();
      return coins
        .filter(
          (coin) =>
            coin.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(inputValue.toLowerCase())
        )
        .sort((a, b) => {
          const startsWithA = a.name
            .toLowerCase()
            .startsWith(inputValue.toLowerCase());
          const startsWithB = b.name
            .toLowerCase()
            .startsWith(inputValue.toLowerCase());
          return startsWithA === startsWithB
            ? a.name.localeCompare(b.name)
            : startsWithA
              ? -1
              : 1;
        })
        .slice(0, 50)
        .map((coin) => ({
          label: `${coin.name} (${coin.symbol.toUpperCase()})`,
          value: coin.id,
        }));
    } catch (error) {
      console.error("Fehler beim Laden der Coins:", error);
      return [];
    }
  };

  const handleChange = (
    selectedOption: { label: string; value: string } | null
  ) => {
    if (selectedOption) {
      onSelect({
        id: selectedOption.value,
        name: selectedOption.label.split(" (")[0],
        symbol: selectedOption.label.split("(")[1]?.replace(")", ""),
      });
    } else {
      onSelect(null);
    }
  };
  // custom styles notwendig für react select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
      borderColor: darkMode ? "#4b5563" : "#d1d5db",
      color: darkMode ? "#ffffff" : "#000000",
      "&:hover": {
        borderColor: darkMode ? "#6b7280" : "#9ca3af",
      },
    }),
    input: (base: any) => ({
      ...base,
      color: darkMode ? "#ffffff" : "#000000",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: darkMode ? "#374151" : "#ffffff",
      color: darkMode ? "#f3f4f6" : "#000000",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: darkMode ? "#ffffff" : "#000000",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: darkMode ? "#9ca3af" : "#6b7280",
    }),
    option: (base: any, { isFocused }: { isFocused: boolean }) => ({
      ...base,
      backgroundColor: isFocused
        ? darkMode
          ? "#4b5563"
          : "#f3f4f6"
        : undefined,
      color: darkMode ? "#ffffff" : "#000000",
    }),
  };

  return (
    <AsyncSelect
      styles={customStyles}
      cacheOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      placeholder="Suche nach einem Coin..."
      defaultOptions
      noOptionsMessage={() => "Keine Coins gefunden"}
      isClearable
    />
  );
}
