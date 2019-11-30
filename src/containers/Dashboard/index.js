import React from 'react';
import { Button } from 'antd';
import useWebSocket from '../../hooks/useWebsocket';
import LineChart from '../../components/Charts/linechart';
import './style.scss';

function Dashboard() {
  const ws = useWebSocket('wss://echo.websocket.org/?encoding=text', onMessage);

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

  return (
    <div className="dashboard">
      <LineChart />
      <Button onClick={sendMessage}>Send</Button>
      <Button onClick={closeConnection}>Close</Button>
    </div>
  )
}

export default Dashboard;