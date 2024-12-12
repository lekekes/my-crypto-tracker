import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SparklineChartProps {
  data: number[];
  id: string;
}

export default function SparklineChart({ data, id }: SparklineChartProps) {
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
          const hoursAgo = 168 - i; // Gehe von den letzten 168 Stunden aus
          const date = new Date();
          date.setHours(date.getHours() - hoursAgo);
          return date.toLocaleString('de-DE', {
            weekday: 'short', // Zeigt den Wochentag an
            hour: '2-digit', // Zeigt die Stunde an
            minute: '2-digit', // Zeigt die Minute an (optional)
          });
        }),
        datasets: [
          {
            data,
            borderColor: '#4caf50',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0, // Keine Punkte auf der Linie
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
            intersect: false, // Tooltips funktionieren auch, wenn die Maus nicht direkt auf der Linie ist
            mode: 'index', // Tooltip folgt der X-Achse
            callbacks: {
              label: (context) => `Price: $${context.raw}`,
            },
          },
        },
        interaction: {
          mode: 'index', // Interaktion entlang der X-Achse
          intersect: false, // Keine Punkt-basierte Interaktion nötig
        },
        scales: {
          x: {
            display: false, // X-Achse ausblenden
          },
          y: {
            display: false, // Y-Achse ausblenden
          },
        },
      },
    });

    return () => {
      chart.destroy(); // Chart wird bei Unmounting entfernt
    };
  }, [data]);

  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}
