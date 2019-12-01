import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import './style.scss';

const { Header } = Layout;

const titleStyle = {
  color: 'white',
  fontSize: 16,
  fontWeight: 400
}

function Navigation() {
  return (
    <Layout>
      <Header className="nav-header">
        <div className="title"><Link to='/dashboard' style={titleStyle}>Cloudek</Link></div>
      </Header>
    </Layout>
  )
}

export default Navigation;