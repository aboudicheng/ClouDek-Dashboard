import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Login from '../../containers/Login';
import Dashboard from '../../containers/Dashboard';
import Navigation from '../Navigation';
import Logs from '../../containers/Logs';
import { Layout, Button, notification } from 'antd';
import useAttackData from '../../hooks/useAttackData';
import useWebSocket from '../../hooks/useWebsocket';
import * as actions from '../../actions';
import './style.scss';

const mock = {
  data:'{"CRLF":{"ip":"139.179.134.48","param":"asd","val":"%0aads","uid":"sdfsdfjk13l432424"}}'
}

function App() {
  const ws = useWebSocket('ws://167.172.170.149:80', onMessage);
  useAttackData();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      onMessage(mock)
    }, 5000);
  }, []);

  const openNotification = (message) => {
    notification.warn({
      message: `New Attack!`,
      description: message,
      placement: 'bottomRight',
      duration: 5
    });
  };

  function onMessage(evt) {
    const data = JSON.parse(evt.data);
    const type = Object.keys(data)[0];
    const formatted = {
        ip: data[type].ip,
        query_key: data[type].param,
        query_val: data[type].val,
        timestamp: +new Date() / 1000,
        type
    }

    dispatch(actions.addAttackData(formatted, data[type].uid));
    formatted.id = data[type].uid;
    dispatch(actions.addLog(formatted));

    console.log(evt)
    console.log(JSON.parse(evt.data));

    openNotification(evt.data);
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
            <Route exact path='/' component={() => <Login />} />
            <Route exact path='/dashboard' component={() => <Dashboard />} />
            <Route exact path='/logs' component={() => <Logs />} />
          </Switch>
        </div>
        {/* <Button onClick={sendMessage}>Send</Button>
        <Button onClick={closeConnection}>Close</Button> */}
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