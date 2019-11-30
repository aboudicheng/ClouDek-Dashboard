import React, { useState } from 'react';
import { Button, Select } from 'antd';
import useWebSocket from '../../hooks/useWebsocket';
import LineChart from '../../components/Charts/linechart';
import PieChart from '../../components/Charts/piechart';
import Logger from '../../components/Logger';
import './style.scss';

const { Option } = Select;

function Dashboard() {
  const [select, setSelect] = useState('today');
  const ws = useWebSocket('wss://echo.websocket.org/?encoding=text', onMessage);

  function onMessage(evt) {
    console.log(evt)
  }

  const sendMessage = () => {
    ws.send('Xi jing ping === Winnie')
  }

  const closeConnection = () => {
    ws.close();
    console.log('closed')
  }

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
      <Button onClick={sendMessage}>Send</Button>
      <Button onClick={closeConnection}>Close</Button>
    </div>
  )
}

export default Dashboard;