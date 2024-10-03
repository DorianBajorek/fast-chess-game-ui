type MessageHandler = (message: string) => void;

export const createWebSocketConnectionForStartGame = (
  roomKey: string,
  token: string,
): WebSocket => {
  const ws = new WebSocket(`ws://127.0.0.1:8000/ws/room/${roomKey}/?token=${token}`);

  ws.onopen = () => {
    console.log('WebSocket connection established');
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return ws;
};

export const createWebSocketConnectionForPlay = (
    roomKey: Number,
    token: string,
    username: string,
    handleIncomingMove: (move: string) => void
): WebSocket => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/room/${roomKey}/?token=${token}`);
    
    ws.onopen = () => {
        console.log('WebSocket connection established');
    };
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received move:', data.message.message + " " + data.message.username);
        if(data.message.username !== username) {
          handleIncomingMove(data.message.message);
        }
      };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
  
    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };
    
    return ws;
}

export const sendWebSocketMessage = (ws: WebSocket, message: any) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error("WebSocket is not open. Can't send message.");
  }
};

export const closeWebSocketConnection = (ws: WebSocket) => {
  if (ws) {
    ws.close();
  }
};
