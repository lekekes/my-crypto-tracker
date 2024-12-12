import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  coinId: string;
}
type PricePoint = { date: string; value: number };

const CACHE_KEY = "chartDataCache";
const CACHE_DURATION = 30 * 60 * 1000;

export default function LineChart({ coinId }: LineChartProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coinId) return;

    const fetchCoinData = async () => {
      setLoading(true);
      const cachedData = localStorage.getItem(`${CACHE_KEY}_${coinId}`);
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
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365&interval=daily`
        );
        const data = await response.json();

        const prices: PricePoint[] = data.prices.map(
          (price: [number, number]) => ({
            date: new Date(price[0]).toLocaleDateString(),
            value: price[1],
          })
        );

        const formattedData = {
          labels: prices.map((p: PricePoint) => p.date),
          datasets: [
            {
              label: "Preis (USD)",
              data: prices.map((p: PricePoint) => p.value),
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        };

        localStorage.setItem(
          `${CACHE_KEY}_${coinId}`,
          JSON.stringify({ data: formattedData, timestamp: now })
        );
        setChartData(formattedData);
      } catch (error) {
        console.error("Fehler beim Abrufen der Chart-Daten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) return <p className="text-center">Lade Diagramm...</p>;
  if (!chartData) return <p className="text-center">Keine Daten verfügbar.</p>;

  return (
    <div className="mt-8 max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
        Preisverlauf der letzten 12 Monate
      </h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          hover: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              beginAtZero: false,
              grid: { color: "rgba(200, 200, 200, 0.2)" },
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
          elements: {
            line: {
              borderColor: "rgba(75, 192, 192, 1)",
            },
          },
        }}
      />
    </div>
  );
}
