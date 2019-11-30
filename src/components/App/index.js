import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket from '../../hooks/useWebsocket';

function App() {
  const ws = useWebSocket('wss://echo.websocket.org/?encoding=text', onMessage);

  function onMessage(evt) {
    console.log(evt)
  }

  const sendMessage = () => {
    //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
    ws.send('getMessage')
  }

  const closeConnection = () => {
    ws.close();
    console.log('closed')
  }

  return (
    <div>
      <input type='button' value='Send' onClick={sendMessage} />
      <input type='button' value='Close' onClick={closeConnection} />
    </div>
  )
}

export default App;