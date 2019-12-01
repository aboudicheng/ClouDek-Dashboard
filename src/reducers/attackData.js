import { SET_ATTACK_DATA, SET_LOGS, ADD_ATTACK_DATA, ADD_LOG, ADD_ALERT } from '../constants/action_types';

const INITIAL_STATE = {
  attackData: {},
  logs: [],
  alerts: []
};

function attackDataReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ATTACK_DATA:
      return { ...state, attackData: action.payload }
    case SET_LOGS:
      return { ...state, logs: action.payload }
    case ADD_ATTACK_DATA:
      return { ...state, attackData: { ...state.attackData, [action.id]: action.payload } }
    case ADD_LOG:
      return { ...state, logs: [action.payload, ...state.logs] }
    case ADD_ALERT:
      return { ...state, alerts: [action.payload, ...state.alerts] }
    default: return state;
  }
}

export default attackDataReducer;