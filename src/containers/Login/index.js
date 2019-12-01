import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'antd';
import './style.scss';

function Login({ history }) {
  return (
    <div className="login">
      <Card title="Welcome">
        <img src="https://lh4.googleusercontent.com/3Cevx7oJM3fElsSmbqN19XDbHusuPYQRVgM_1YNcW605WL6UrbtdC0uN_UjCx9e-m5ZaGjo20K9__i_X8bfayD-uPWDDdHIlasrKlcaD5JBaBusLg_x8D0z3CGWsXand3AOv8RCrLq4" alt="cloudek" />
        <Button onClick={() => history.push('/dashboard')}>Login</Button>
      </Card>
    </div>
  )
}

export default withRouter(Login);