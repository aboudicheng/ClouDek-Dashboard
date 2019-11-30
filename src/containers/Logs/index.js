import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Pagination, Icon, Modal } from 'antd';
import LogList from '../../components/LogList';
import moment from 'moment';
import './style.scss';

function Logs() {
  const { attackData } = useSelector(state => state.attackDataState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="log-list">
      <div>
        <Card
          title={<><Icon type="warning" /> {'Logs'}</>}
        >
          <LogList setIsModalOpen={setIsModalOpen} start={0} end={10} />
        </Card>
        <Modal
          visible={!!isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          title='Details'
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
      </div>
    </div>
  )
}

export default Logs;
