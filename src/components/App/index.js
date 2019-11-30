import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Dashboard from '../../containers/Dashboard';
import Navigation from '../Navigation';
import { Layout } from 'antd';
import './style.scss';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL} onUpdate={() => window.scrollTo(0, 0)}>
      <Layout className="App">
        <ScrollTop />
        <Navigation />
        <Switch>
          <Route exact path='/' component={() => <Dashboard />} />
        </Switch>
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