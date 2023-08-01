import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// const titleToolTip = (toolItems) => labelChart;
// const labelToolTip = (toolItems) => '';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      // display: false,
      labels: {
        fontColor: 'purple',
        usePointStyle: true,
      },
    },
    title: {
      // display: false,
      text: 'Revenue vs Orders',
      display: true,
      position: 'left',
    },
    tooltip: {
      usePointStyle: true,

      titleMarginBottom: 0,
      displayColors: false,
      // callbacks: { title: titleToolTip, label: labelToolTip },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const labelChart = 'Revenue';
export const data = {
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: [
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
      ],
      borderColor: 'orangered',
      backgroundColor: 'white',
      tension: 0.4,
      fill: false,
    },
    {
      label: 'Orders',
      data: [
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 1000),
      ],
      borderColor: '#002D62',
      backgroundColor: 'white',
      fill: false,
      pointStyle: 'star',
      pointRadius: 5,
      tension: 0.6,
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
