import React from 'react';
import { Card, List } from 'antd';
import moment from 'moment';

function Logger({ logs }) {

  return (
    <Card
      title='Logs'
      style={{ width: '48%' }}
      extra={<a href="#">See all</a>}
    >
      <List
        bordered
        dataSource={logs.slice(0, 5)}
        renderItem={item => (
          <List.Item>
            {moment.unix(item.timestamp).format("HH:mm MMM DD YYYY")} {item.ip}
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Logger;