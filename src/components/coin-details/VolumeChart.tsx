import React from 'react';
import BarChart from '@/components/coin-details/BarChart';
import { ChartData, ChartOptions } from 'chart.js';

interface VolumeData {
  date: string;
  volume: number;
}

interface HandelsvolumenChartProps {
  volumes: VolumeData[];
}

export default function HandelsvolumenChart({
  volumes,
}: HandelsvolumenChartProps) {
  const chartData: ChartData<'bar', number[], string> = {
    labels: volumes.map((entry) => entry.date),
    datasets: [
      {
        label: 'Handelsvolumen (USD)',
        data: volumes.map((entry) => entry.volume),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Datum',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Volumen (USD)',
        },
        ticks: {
          callback: (value) => {
            if (typeof value === 'number') {
              return `$${value.toLocaleString()}`;
            }
            return value;
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  return (
    <BarChart
      data={chartData}
      options={options}
      title="Handelsvolumen letzte 7 Tage"
    />
  );
}
