import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getData() {
  const data = [];

  data.push({
    title: 'Potential malicious attack',
    data: getRandomDateArray(30)
  });

  return data;
}

function LineChart() {
  const [attacksHist, setAttacksHist] = useState(getData());

  const data = {
    labels: attacksHist[0].data.map(d => d.time),
    datasets: [{
      label: attacksHist[0].title,
      data: attacksHist[0].data.map(d => d.value),
      fill: 'none',
      backgroundColor: "#3E517A",
      pointRadius: 2,
      borderColor: "#3E517A",
      borderWidth: 1,
      lineTension: 0
    }]
  }

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'week'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0
          }
        }
      ]
    }
  }
  return (
    <Line
      data={data}
      width={100}
      height={40}
      options={options}
    />
  )
}

export default LineChart;