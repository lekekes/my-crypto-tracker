import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SparklineChartProps {
  data: number[];
  id: string;
  borderColor: string; // Farbe als Prop
}

export default function SparklineChart({
  data,
  id,
  borderColor,
}: SparklineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      console.error('CanvasRenderingContext2D is null.');
      return;
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => {
          const hoursAgo = 168 - i;
          const date = new Date();
          date.setHours(date.getHours() - hoursAgo);
          return date.toLocaleString('de-DE', {
            weekday: 'short',
            hour: '2-digit',
          });
        }),
        datasets: [
          {
            data,
            borderColor, // Farbe verwenden
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            intersect: false,
            mode: 'index',
            callbacks: {
              label: (context) => `Preis: $${context.raw}`,
            },
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, borderColor]);

  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}
