import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'REMISIONES POR INSTANCIA',
    },
  },
};

const data = {
  datasets: [
    {
      label: 'CANTIDAD',
      data: {'SIN CLASIFICAR':'16', 'ADOLESCENTES I.':'292', 'JUEZ DE JUSTICIA CÍVICA':'1552', 'M.P. FEDERAL':'306', 'M.P. FUERO COMÚN':'6946'},
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(150, 120, 132, 0.5)', 'rgba(114, 186, 98, 0.5)', 'rgba(221, 170, 45, 0.5)', 'rgba(100, 120, 220, 0.5)'],
    }
  ],
};

export function MyChart() {
  return <Bar options={options} data={data} />;
}
