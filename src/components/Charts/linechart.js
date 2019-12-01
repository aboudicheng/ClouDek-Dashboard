import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Card, Icon } from 'antd';

const now = moment();

function LineChart({ select }) {
  const { logs } = useSelector(state => state.attackDataState);
  const [currentLogs, setCurrentLogs] = useState();

  useEffect(() => {
    const sliced = []; // use for data
    let filtered = [];
    if (select === "today") {
      filtered = logs.filter(log => {
        return now.isSame(moment.unix(log.timestamp), 'day')
      });

      for (let i = 0; i < 24; i++) {
        sliced.push(
          filtered.filter(log => moment.unix(log.timestamp).hour() === i).length
        );
      }
    }
    else if (select === "week") {
      filtered = logs.filter(log => {
        return moment().startOf('week').isBefore(moment.unix(log.timestamp)) &&
          moment().endOf('week').isAfter(moment.unix(log.timestamp))
      });

      for (let i = 1; i <= 7; i++) {
        sliced.push(
          filtered.filter(log => moment.unix(log.timestamp).isoWeekday() === i).length
        );
      }
    }
    else if (select === "month") {
      filtered = logs.filter(log => {
        return now.isSame(moment.unix(log.timestamp), 'month')
      });
      const daysInMonth = now.daysInMonth();

      for (let i = 1; i <= daysInMonth; i++) {
        sliced.push(
          filtered.filter(log => moment.unix(log.timestamp).date() === i).length
        );
      }
    }
    else {
      filtered = logs.filter(log => {
        return now.isSame(moment.unix(log.timestamp), 'year')
      });

      for (let i = 0; i < 12; i++) {
        sliced.push(
          filtered.filter(log => moment.unix(log.timestamp).month() === i).length
        );
      }
    }
    setCurrentLogs(sliced);
  }, [logs, select]);

  function pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }

  function getLabels() {
    let arr = [];
    const daysInMonth = now.daysInMonth();
    const month = now.format('MMM');
    switch (select) {
      case "today":
        for (let i = 0; i < 24; i++) {
          arr.push(`${pad(i)}:00`)
        }
        break;
      case "week":
        arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        break;
      case "month":
        for (let i = 1; i <= daysInMonth; i++) {
          arr.push(`${pad(i)} ${month}`);
        }
        break;
      case "year":
        for (let i = 1; i <= 12; i++) {
          arr.push(moment(i, 'MM').format('MMM'));
        }
        break;
      default: return;
    }
    return arr;
  }

  const data = {
    labels: getLabels(),
    datasets: [{
      data: currentLogs,
      fill: 'none',
      backgroundColor: "#3E517A",
      pointRadius: 2,
      borderColor: "#3E517A",
      borderWidth: 1,
      lineTension: 0
    }]
  }

  return (
    <Card
      title={<><Icon type="line-chart" /> {'Number of Attacks'}</>}
      style={{ margin: '1.2em 0' }}>
      <Line
        data={data}
        width={100}
        height={40}
        options={{
          legend: {
            display: false
          }
        }}
      />
    </Card>
  )
}

export default LineChart;