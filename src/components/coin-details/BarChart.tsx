import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData as ChartJSData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type ChartData = ChartJSData<'bar', number[], string>;
type ChartOptionsType = ChartOptions<'bar'>;

interface BarChartProps {
  data: ChartData;
  options: ChartOptionsType;
  title: string;
}

export default function BarChart({ data, options, title }: BarChartProps) {
  return (
    <div className="mt-8 w-full rounded-md border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:w-1/2">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
}
