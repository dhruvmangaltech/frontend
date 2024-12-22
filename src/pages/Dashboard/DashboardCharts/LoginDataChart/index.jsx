import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useDashboardDataListing from '../../hooks/useDashboardData';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LoginDataChart({ loginData }) {
  const { t } = useDashboardDataListing();

  const labelList = loginData.map((data) => `${t(data.label)}`);
  const totalData = loginData.map((data) => t(data.TODAY));
  const data = {
    labels: labelList,
    datasets: [
      {
        data: totalData,
        backgroundColor: ['rgb(194,230,153)', 'rgb(49,163,84)'],
        borderColor: ['rgb(0, 136, 254)', 'rgb(0, 196, 159)'],
        borderWidth: 1,
        width: '300px',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Today Login Bar Chart',
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderLeft: '1px solid #cac6c6',
        padding:"10px"
        
      }}
      className='first-customer'
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}
