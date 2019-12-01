import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'antd';
import './style.scss';

function Login({ history }) {
  return (
    <div className="login">
      <Card title="Welcome">
        <Button onClick={() => history.push('/dashboard')}>Login</Button>
      </Card>
    </div>
  )
}

export default withRouter(Login);