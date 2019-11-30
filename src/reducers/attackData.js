import { SET_ATTACK_DATA, SET_LOGS } from '../constants/action_types';

const INITIAL_STATE = {
  attackData: {},
  logs: []
};

function attackDataReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ATTACK_DATA:
      return { ...state, attackData: action.payload }
    case SET_LOGS:
      return { ...state, logs: action.payload }
    default: return state;
  }
}

export default attackDataReducer;