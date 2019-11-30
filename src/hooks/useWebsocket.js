import React, { useState, useEffect, useCallback } from 'react';

/**
 * Websocket hook
 * @param {String} url Websocket URL
 * @param {Function} onMessage Handler function for new events
 */
function useWebSocket(url, onMessage) {
  const [ws, setWs] = useState(null);

  const connectWebSocket = () => {
    setWs(new WebSocket(url));
  }

  // start listening
  const initWebSocket = useCallback(() => {
    ws.onmessage = onMessage;
  }, [ws]);

  useEffect(() => {
    connectWebSocket();
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log('connected');
        initWebSocket();
      }
    }
  }, [ws, initWebSocket]);
  return ws;
}

export default useWebSocket;