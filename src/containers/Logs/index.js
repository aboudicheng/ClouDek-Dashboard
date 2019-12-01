import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Pagination, Icon, Modal, Button } from 'antd';
import LogList from '../../components/LogList';
import moment from 'moment';
import './style.scss';

function Logs() {
  const { attackData, logs } = useSelector(state => state.attackDataState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  function handlePageChange(page) {
    setStart((page - 1) * 10);
    setEnd(page * 10 - 1);
    setCurrent(page);
  }

  return (
    <div className="log-list">
      <div>
        <Card
          title={<><Icon type="warning" /> {'Logs'}</>}
        >
          <LogList setIsModalOpen={setIsModalOpen} start={start} end={end} />
          <Pagination
            defaultCurrent={current}
            onChange={handlePageChange}
            pageSize={10}
            total={logs.length}
            style={{ marginTop: '1.2em' }}
          />
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
              <p>Query Key: <b>{attackData[isModalOpen].param}</b></p>
              <p>Query Value: <b>{attackData[isModalOpen].val}</b></p>
            </>
          }
        </Modal>
      </div>
    </div>
  )
}

export default Logs;
