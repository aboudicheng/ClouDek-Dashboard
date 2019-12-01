import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as api from '../constants/api';
import * as actions from '../actions';
import moment from 'moment';

function useAttackData() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${api.api}/api/query`).then(res => res.json()).then(data => {
      const ids = Object.keys(data);
      const values = Object.values(data);
      
      // sort according to most recent
      values.sort((a, b) => {
        return moment.unix(a.timestamp).isAfter(moment.unix(b.timestamp)) ? -1
          : moment.unix(a.timestamp).isBefore(moment.unix(b.timestamp)) ? 1 : 0
      });

      dispatch(actions.setAttackData(data));
      dispatch(actions.setLogs(values.map((obj, i) => ({ ...obj, id: ids[i] }))))
    });

  }, []);
}

export default useAttackData;