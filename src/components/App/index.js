import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Dashboard from '../../containers/Dashboard';
import Navigation from '../Navigation';
import Logs from '../../containers/Logs';
import { Layout, Button } from 'antd';
import useAttackData from '../../hooks/useAttackData';
import useWebSocket from '../../hooks/useWebsocket';
import './style.scss';

function App() {
  const ws = useWebSocket('ws://167.172.170.149:80', onMessage);
  useAttackData();

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
  return (
    <Router basename={process.env.PUBLIC_URL} onUpdate={() => window.scrollTo(0, 0)}>
      <Layout className="App">
        <ScrollTop />
        <Navigation />
        <div style={{ background: '#313c5e' }}>
          <Switch>
            <Route exact path='/' component={() => <Dashboard />} />
            <Route exact path='/logs' component={() => <Logs />} />
          </Switch>
        </div>
        <Button onClick={sendMessage}>Send</Button>
        <Button onClick={closeConnection}>Close</Button>
      </Layout>
    </Router>
  )
}

function ScrollComponent({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

const ScrollTop = withRouter(ScrollComponent);

export default App;