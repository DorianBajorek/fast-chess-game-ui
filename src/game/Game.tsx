import React, { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useLocation } from 'react-router-dom';
import { useUserData } from '../mainPage/loginPage/UserData';

const Game: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const location = useLocation();
  const playerName = location.state?.playerName;
  const token = useUserData().token;
  const room = location.pathname.split('/').pop();

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/room/${room}/?token=${token}`);

    ws.onopen = () => {
      console.log("WebSocket połączony");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Sprawdzamy, czy wiadomość zawiera ruch
      if (message.message && message.message.move) {
        setGame((prevGame) => {
          const newGame = new Chess(prevGame.fen());
          // Ruch odbierany z wiadomości
          const move = message.message.move;
          const result = newGame.move(move);
          if (result) {
            return newGame;
          } else {
            console.error("Received invalid move from server:", move);
            return prevGame; // Zwróć poprzedni stan gry, jeśli ruch jest niepoprawny
          }
        });
      }
    };

    ws.onclose = () => {
      console.log("WebSocket rozłączony");
      setSocket(null); // Ustaw socket na null, aby łatwiej zarządzać ponownym połączeniem, jeśli zajdzie taka potrzeba
    };

    setSocket(ws);

    return () => {
      ws.close(); // Zamknij połączenie WebSocket, gdy komponent jest odmontowywany
    };
  }, [token, room]);

  const handleMove = (move: { from: string; to: string }) => {
    const newGame = new Chess(game.fen());
    try {
      const result = newGame.move({
        from: move.from,
        to: move.to,
        promotion: 'q',
      });

      if (result) {
        setGame(newGame);
        
        if (socket) {
          // Wysyłamy wiadomość jako "message"
          console.log("Sending move:", JSON.stringify({ message: { move: { from: move.from, to: move.to } } }));
          socket.send(JSON.stringify({ message: { move: { from: move.from, to: move.to } } }));
        }
        return true;
      }
    } catch (error) {
      console.error("Invalid move:", error);
    }

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
