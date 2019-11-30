import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as api from '../constants/api';
import * as actions from '../actions';

function useAttackData() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${api.api}/api/query`).then(res => res.json()).then(data => {
      const ids = Object.keys(data);
      const values = Object.values(data);
      dispatch(actions.setAttackData(data));
      dispatch(actions.setLogs(values.map((obj, i) => ({ ...obj, id: ids[i] }))))
    });

  }, []);
}

export default useAttackData;