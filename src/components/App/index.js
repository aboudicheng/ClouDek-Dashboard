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
import { Layout, notification } from 'antd';
import useAttackData from '../../hooks/useAttackData';
import useWebSocket from '../../hooks/useWebsocket';
import * as actions from '../../actions';
import './style.scss';

function App() {
  const ws = useWebSocket('ws://167.172.170.149:8000', onMessage);
  useAttackData();
  const dispatch = useDispatch();

  const openNotification = (description) => {
    notification.warn({
      message: `New Attack!`,
      description,
      placement: 'bottomRight',
      duration: 5
    });
  };

  function onMessage(evt) {
    const data = JSON.parse(evt.data);
    const type = Object.keys(data)[0];

    let description = '';

    if (type === "Viral" || type === "Intrusion" || type === "CSRF") {
      if (type === "Intrusion") {
        description = `Abnormal activities detected on path ${data[type].path}.`;
      }
      else if (type === 'CSRF')  {
        //your form name at location is vulnerable to csrf
        description = `Your form name "${data[type].formName}" at location ${data[type].location} is vulnerable to CSRF.`;
      }
      else {
        description = `Your website contains link(s) to ${data[type].join(', ')} which are malicious.`;
      }
      data[type].type = type;
      data[type].timestamp = +new Date() / 1000;
      dispatch(actions.addAlert(data[type]));
    }
    else {
      console.log(data[type])
      const formatted = {
        ip: data[type].ip,
        param: data[type].param,
        val: data[type].val,
        timestamp: +new Date() / 1000,
        type
      }
      console.log({ formatted })
      dispatch(actions.addAttackData(formatted, data[type].uid));
      formatted.id = data[type].uid;
      dispatch(actions.addLog(formatted));
      description = `A user with an IP address of ${formatted.ip} tried to perform a ${formatted.type} attack to your application.`;
    }

    openNotification(description);
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