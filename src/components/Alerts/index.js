import React from 'react';
import { useSelector } from 'react-redux';

import { Card, List, Icon } from 'antd';
import moment from 'moment';

function Alerts() {
  const { alerts } = useSelector(state => state.attackDataState);

  return (
    <Card
      title={<><Icon type="alert" /> {'Alerts'}</>}
      style={{ width: '48%' }}
    >
      <List
        bordered
        dataSource={alerts.slice(0, 5)}
        itemLayout="horizontal"
        renderItem={item => (
        <List.Item actions={[<span>{item.type}</span>]}>
            {moment.unix(item.timestamp).format("HH:mm DD-MMM-YYYY")}
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Alerts;