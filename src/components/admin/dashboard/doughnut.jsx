import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      // display: false,
      text: 'Sales Chart',
      display: true,
    },
    tooltip: {
      usePointStyle: true,

      titleMarginBottom: 0,
      displayColors: false,
      // callbacks: { title: titleToolTip, label: labelToolTip },
    },
  },
};
const DoughnutChart = () => {
  const config = {
    type: 'doughnut',
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart',
        },
      },
    },
  };

  const DATA_COUNT = 5;

  const data = {
    labels: ['Red', 'Orange', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 8, 4, 23, 7],
        backgroundColor: ['red', 'yellow', 'green', 'blue', 'orangered'],
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
