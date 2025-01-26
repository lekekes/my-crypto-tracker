import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Select from '@/components/Select';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface CoinData {
  prices: [number, number][]; // Array von [timestamp, price]
}

interface PriceData {
  date: string;
  value: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    pointRadius: number;
    borderWidth: number;
    tension: number;
  }[];
}

interface LineChartProps {
  coinId: string;
}

const CACHE_KEY = 'chartDataCache';
const CACHE_DURATION = 30 * 60 * 1000;

const timePeriods = [
  { label: '7 Tage', value: '7', interval: 'daily' },
  { label: '30 Tage', value: '30', interval: 'daily' },
  { label: '90 Tage', value: '90', interval: 'daily' },
  { label: '180 Tage', value: '180', interval: 'daily' },
  { label: '1 Jahr', value: '365', interval: 'daily' },
];

export default function LineChart({ coinId }: LineChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[4]); // Standard: 1 Jahr

  useEffect(() => {
    if (!coinId) return;

    const fetchCoinData = async () => {
      setLoading(true);
      const { value, interval } = selectedPeriod;
      const cacheKey = `${CACHE_KEY}_${coinId}_${value}_${interval}`;
      const cachedData = localStorage.getItem(cacheKey);
      const now = Date.now();

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < CACHE_DURATION) {
          setChartData(data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${value}&interval=${interval}`,
        );
        const data: CoinData = await response.json();

        if (!data.prices || !Array.isArray(data.prices)) {
          console.error('Ungültige Datenstruktur:', data);
          setChartData(null);
          setLoading(false);
          return;
        }

        const prices: PriceData[] = data.prices.map((price) => ({
          date: new Date(price[0]).toLocaleDateString(),
          value: price[1],
        }));

        const formattedData: ChartData = {
          labels: prices.map((p) => p.date),
          datasets: [
            {
              label: 'Preis (USD)',
              data: prices.map((p) => p.value),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        };

        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: formattedData, timestamp: now }),
        );
        setChartData(formattedData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Chart-Daten:', error);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId, selectedPeriod]);

  if (loading) return <p className="text-center">Lade Diagramm...</p>;
  if (!chartData) return <p className="text-center">Keine Daten verfügbar.</p>;

  return (
    <div className="mt-8 w-full rounded-md border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Preisverlauf
        </h2>
        <Select
          options={timePeriods}
          value={selectedPeriod.value}
          onChange={(value) =>
            setSelectedPeriod(
              timePeriods.find((period) => period.value === value) ||
                timePeriods[4],
            )
          }
          placeholder="Zeitraum auswählen"
          className="w-48"
        />
      </div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              beginAtZero: false,
              grid: { color: 'rgba(200, 200, 200, 0.2)' },
            },
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          elements: {
            line: {
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          },
        }}
      />
    </div>
  );
}
