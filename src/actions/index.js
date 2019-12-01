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

export function addAttackData(payload, id) {
  return {
    type: actions.ADD_ATTACK_DATA,
    payload,
    id
  }
}

export function addLog(payload) {
  return {
    type: actions.ADD_LOG,
    payload
  }
}