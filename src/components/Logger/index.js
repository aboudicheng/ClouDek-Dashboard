import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Modal, Icon, Button } from 'antd';
import moment from 'moment';
import LogList from '../LogList';

function Logger() {
  const { attackData } = useSelector(state => state.attackDataState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        title={<><Icon type="warning" /> {'Malicious Input Logs'}</>}
        style={{ width: '48%' }}
        extra={<Link to={'/logs'}>See all</Link>}
      >
        <LogList setIsModalOpen={setIsModalOpen} start={0} end={5} />
      </Card>
      <Modal
        visible={!!isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title='Details'
        footer={[
          <Button key="return" onClick={() => setIsModalOpen(false)}>Return</Button>
        ]}
      >
        {isModalOpen &&
          <>
            <p>Type: <b>{attackData[isModalOpen].type}</b></p>
            <p>IP Address: <b>{attackData[isModalOpen].ip}</b></p>
            <p>Time: <b>{moment.unix(attackData[isModalOpen].timestamp).format('DD-MMM-YYYY HH:mm:ss')}</b></p>
            <p>Query Key: <b>{attackData[isModalOpen].query_key}</b></p>
            <p>Query Value: <b>{attackData[isModalOpen].query_val}</b></p>
          </>
        }
      </Modal>
    </>
  )
}

export default Logger;