import * as actions from '../constants/action_types';

export function setLogs(payload) {
  return {
    type: actions.SET_LOGS,
    payload
  }
}

export function setAttackData(payload) {
  return {
    type: actions.SET_ATTACK_DATA,
    payload
  }
}