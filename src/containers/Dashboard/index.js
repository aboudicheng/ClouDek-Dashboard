import React, { useState } from 'react';
import { Select } from 'antd';
import LineChart from '../../components/Charts/linechart';
import PieChart from '../../components/Charts/piechart';
import Logger from '../../components/Logger';
import './style.scss';

const { Option } = Select;

function Dashboard() {
  const [select, setSelect] = useState('today');

  function handleSelect(value) {
    setSelect(value);
  }

  return (
    <div className="dashboard">
      <div>
        <Select defaultValue="today" style={{ width: 120 }} onSelect={handleSelect}>
          <Option value="today">Today</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
          <Option value="year">This Year</Option>
        </Select>
      </div>
      <LineChart select={select} />
      <div className="charts-row">
        <Logger />
        <PieChart />
      </div>
    </div>
  )
}

export default Dashboard;