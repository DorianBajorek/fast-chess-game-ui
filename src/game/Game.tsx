import React, { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useLocation } from 'react-router-dom';
import { useUserData } from '../mainPage/loginPage/UserData';

const Game: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [numberOfMove, setNumberOfMove] = useState(0);

  const location = useLocation();
  const playerName = location.state?.playerName;
  const color = location.state?.color;
  const roomKey = 1;
  const token = useUserData().token;
  const username = useUserData().userName;

  useEffect(() => {
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

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomKey, token]);

  const handleIncomingMove = (move: string) => {
    const [from, to] = move.split('-');
    
    console.log('Current FEN before incoming move:', game.fen());
    
    const result = game.move({
        from,
        to,
        promotion: 'q',
    });

    if (result) {
        setNumberOfMove(prev => prev + 1);
        console.log('Move applied:', move);
    } else {
        console.error('Invalid move attempted:', move);
    }

    console.log('Current FEN after incoming move:', game.fen());
  };

  const handleMove = (move: { from: string; to: string }) => {
    console.log('Current FEN before move:', game.fen());
    
    const result = game.move({
        from: move.from,
        to: move.to,
        promotion: 'q',
    });

    if (result) {
        const moveString = `${move.from}-${move.to}`;
        if (socket) {
            socket.send(JSON.stringify({ message: { message: moveString, username: username, moveNumber: numberOfMove + 1 } }));
            setNumberOfMove(prev => prev + 1);
        }
        console.log('Move applied:', moveString);
        return true;
    } else {
        console.error("Invalid move:", move);
    }

    console.log('Move failed:', move);
    console.log('Current FEN after failed move:', game.fen());
    return false;
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  const boardContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.5s ease-in-out',
  };

  const boardStyle: React.CSSProperties = {
    width: '400px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '12px 50px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={containerStyle}>
      <div style={boardContainerStyle}>
        <h2>{playerName ? `Playing with ${playerName}` : "Chess Game"}</h2>
        <div style={boardStyle}>
          <Chessboard
            position={game.fen()}
            boardOrientation={color}
            onPieceDrop={(sourceSquare, targetSquare) =>
              handleMove({ from: sourceSquare, to: targetSquare })
            }
          />
        </div>
        <button
          style={buttonStyle}
          onClick={() => setGame(new Chess())}
        >
          Surrender
        </button>
      </div>
    </div>
  );
};

export default Game;
