import React, { useState } from 'react';
import { Card, List, Modal } from 'antd';
import moment from 'moment';

function Logger({ logs, attackData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        title='Logs'
        style={{ width: '48%' }}
        extra={<a href="#">See all</a>}
      >
        <List
          bordered
          dataSource={logs.slice(0, 5)}
          itemLayout="horizontal"
          renderItem={item => (
            <List.Item
              actions={[<a onClick={() => setIsModalOpen(item.id)}>Details</a>]}
            >
              {moment.unix(item.timestamp).format("HH:mm MMM DD YYYY")}
            </List.Item>
          )}
        />
      </Card>
      <Modal
        visible={!!isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >{isModalOpen}</Modal>
    </>
  )
}

export default Logger;