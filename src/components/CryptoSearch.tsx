import React from 'react';
import AsyncSelect from 'react-select/async';
import {
  StylesConfig,
  DropdownIndicatorProps,
  GroupBase,
  components,
} from 'react-select';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

interface OptionType {
  label: string;
  value: string;
}

interface CryptoSearchProps {
  onSelect: (coin: Coin | null) => void;
  selectedCoin: Coin | null;
}

const CACHE_KEY = 'cachedCoins';
const CACHE_DURATION = 30 * 60 * 1000; // 30 Minuten

export default function CryptoSearch({
  onSelect,
  selectedCoin,
}: CryptoSearchProps) {
  const { darkMode } = useDarkMode();

  const fetchCoinsWithCache = async (): Promise<Coin[]> => {
    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Coins');
    }

    const coins: Coin[] = await response.json();
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: coins, timestamp: now }),
    );

    return coins;
  };

  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    try {
      const coins = await fetchCoinsWithCache();
      return coins
        .filter(
          (coin) =>
            coin.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .slice(0, 50) // Begrenzung auf die Top 50 Ergebnisse
        .map((coin) => ({
          label: `${coin.name} (${coin.symbol.toUpperCase()})`,
          value: coin.id,
        }));
    } catch (error) {
      console.error('Fehler beim Laden der Coins:', error);
      return [];
    }
  };

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      const [name, symbol] = selectedOption.label.split(' (');
      onSelect({
        id: selectedOption.value,
        name: name.trim(),
        symbol: symbol.replace(')', '').trim(),
      });
    } else {
      onSelect(null);
    }
  };

  const customStyles: StylesConfig<OptionType, false> = {
    control: (base, state) => ({
      ...base,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '0.375rem',
      borderColor: state.isFocused ? '#facc15' : '#d1d5db',
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(250, 204, 21, 0.5)' : 'none',
      '&:hover': {
        borderColor: '#facc15',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none', // Entfernt den Abtrennstrich vollständig
    }),
    menu: (base) => ({
      ...base,
      marginTop: '8px',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      backgroundColor: darkMode ? '#374151' : '#ffffff',
      boxShadow:
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? darkMode
          ? '#4b5563'
          : '#fef9c3'
        : 'transparent',
      color: state.isFocused ? '#000000' : darkMode ? '#f3f4f6' : '#374151',
      '&:hover': {
        backgroundColor: darkMode ? '#4b5563' : '#fef9c3',
      },
    }),
  };

  const DropdownIndicator = (
    props: DropdownIndicatorProps<OptionType, false, GroupBase<OptionType>>,
  ) => (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon
        icon={props.selectProps.menuIsOpen ? faChevronUp : faChevronDown}
        className="text-gray-500 dark:text-gray-300"
      />
    </components.DropdownIndicator>
  );

  return (
    <AsyncSelect
      styles={customStyles}
      components={{
        DropdownIndicator,
        Menu: (props) => (
          <components.Menu {...props}>
            <div className="p-2 text-sm text-gray-600 dark:text-gray-300">
              Wähle eine Kryptowährung
            </div>
            {props.children}
          </components.Menu>
        ),
      }}
      cacheOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      placeholder="Suche nach einem Coin..."
      defaultOptions
      noOptionsMessage={() => 'Keine Coins gefunden'}
      value={
        selectedCoin
          ? {
              label: `${selectedCoin.name} (${selectedCoin.symbol.toUpperCase()})`,
              value: selectedCoin.id,
            }
          : null
      }
    />
  );
}
