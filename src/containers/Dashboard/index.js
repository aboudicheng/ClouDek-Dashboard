import React, { useState, useEffect } from 'react';
import { Button, Card, Select } from 'antd';
import useWebSocket from '../../hooks/useWebsocket';
import LineChart from '../../components/Charts/linechart';
import PieChart from '../../components/Charts/piechart';
import Logger from '../../components/Logger';
import * as api from '../../constants/api';
import './style.scss';

const { Option } = Select;

function Dashboard() {
  const [select, setSelect] = useState('today');
  const [logs, setLogs] = useState([]);
  const ws = useWebSocket('wss://echo.websocket.org/?encoding=text', onMessage);

  useEffect(() => {
    fetch(`${api.api}/api/query`).then(res => res.json()).then(data => {
      setLogs(Object.values(data));
    })

  }, []);

  function onMessage(evt) {
    console.log(evt)
  }

  const sendMessage = () => {
    //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
    ws.send('getMessage')
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
      <Card style={{ margin: '1.2em 0' }}>
        <LineChart logs={logs} select={select} />
      </Card>
      <div className="charts-row" style={{  }}>
        <Logger logs={logs} />
        <PieChart logs={logs} />
      </div>
      <Button onClick={sendMessage}>Send</Button>
      <Button onClick={closeConnection}>Close</Button>
    </div>
  )
}

export default Dashboard;