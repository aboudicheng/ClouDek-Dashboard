import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Card, Icon } from 'antd';

function PieChart() {
  const { logs } = useSelector(state => state.attackDataState);
  const [attackTypes, setAttackTypes] = useState([]);

  useEffect(() => {
    setAttackTypes(classifyAttackTypes());
  }, [logs]);
  function classifyAttackTypes() {
    const types = {};
    logs.forEach(log => {
      if (log.type in types) {
        types[log.type] += 1;
      }
      else {
        types[log.type] = 1;
      }
    });
    return types;
  }

  const data = {
    labels: Object.keys(attackTypes),
    datasets: [
      {
        backgroundColor: ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#58508d', '#bc5090'],
        borderColor: ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#58508d', '#bc5090'],
        borderWidth: 1,
        hoverBackgroundColor: ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#58508d', '#bc5090'],
        hoverBorderColor: ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#58508d', '#bc5090'],
        data: Object.values(attackTypes)
      }
    ]
  }

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = parseFloat((currentValue / total * 100).toFixed(1));
          return `${currentValue} (${percentage}%)`;
        },
      },
    },
    legend: {
      position: 'right'
    }
  }

  return (
    <Card
      title={<><Icon type="alert" /> {'Types of Attacks'}</>}
      style={{ width: '48%' }}
    >
      <Pie
        data={data}
        width={100}
        height={40}
        options={options}
      />
    </Card>
  )
}

export default PieChart;

