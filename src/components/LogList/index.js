import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';
import moment from 'moment';

function LogList({ setIsModalOpen, start, end }) {
  const { logs } = useSelector(state => state.attackDataState);
  return (
    <List
      bordered
      dataSource={logs.slice(start, end)}
      itemLayout="horizontal"
      renderItem={item => (
        <List.Item
          actions={[<a onClick={() => setIsModalOpen(item.id)}>Details</a>]}
        >
          {moment.unix(item.timestamp).format("HH:mm DD-MMM-YYYY")}
        </List.Item>
      )}
    />
  )
}

export default LogList;