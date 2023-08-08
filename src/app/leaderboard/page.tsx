'use client';
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const colors: any = {
  score_1: 'rgba(255, 99, 132, 1)',
  score_2: 'rgba(255, 159, 64, 1',
  score_3: 'rgba(255, 205, 86, 1)',
  score_4: 'rgba(75, 192, 192, 1)',
};

Chart.register(CategoryScale, LinearScale, BarElement);

const Page = () => {
  const [isListening, setIsListening] = useState(false);
  const [scores, setScores] = useState<[string, number][]>([
    ['score_1', 0],
    ['score_2', 0],
    ['score_3', 0],
    ['score_4', 0],
  ]);

  useEffect(() => {
    const sse = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/IlllIllI`);

    sse.onmessage = (e) => {
      if (!isListening) return;
      setScores(
        Object.entries(JSON.parse(e.data)).sort(
          (a: any, b: any) => b[1] - a[1]
        ) as any
      );
    };

    return () => {
      sse.close();
    };
  }, [isListening]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center gap-4 py-16">
      <h1 className="text-4xl">Leaderboard</h1>
      <div className="flex w-full justify-around">
        <button
          className={`mt-4 rounded-md px-4 py-2 text-white outline-none ${
            isListening ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          onClick={() => {
            setIsListening((prev) => !prev);
            if (!isListening) {
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset`, {
                method: 'POST',
                headers: {
                  Authorization: 'Bearer P_LEON_KHOD_THEP',
                },
              });
              setScores([
                ['score_1', 1568],
                ['score_2', 1782],
                ['score_3', 3021],
                ['score_4', 1302],
              ]);
            }
          }}
        >
          {isListening ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset`, {
              method: 'POST',
              headers: {
                Authorization: 'Bearer P_LEON_KHOD_THEP',
              },
            });
            setScores([
              ['score_1', 1567],
              ['score_2', 1782],
              ['score_3', 3021],
              ['score_4', 1302],
            ]);
            setIsListening(false);
          }}
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white outline-none"
        >
          reset
        </button>
      </div>
      <Bar
        data={{
          labels: scores.map(([name]) => `Team ${name[6]}`),
          datasets: [
            {
              label: 'Score',
              data: scores.map(([, value]) => value),
              backgroundColor: scores.map(([name]) => colors[name]),
            },
          ],
        }}
        options={{
          indexAxis: 'y',
          scales: {
            x: {
              ticks: {
                font: {
                  size: 18,
                  weight: 'normal',
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: 18,
                  weight: 'normal',
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Page;
