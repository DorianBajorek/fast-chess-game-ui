import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useLocation } from 'react-router-dom';

const Game: React.FC = () => {
  const [game, setGame] = useState(new Chess());

  const location = useLocation();
  const playerName = location.state?.playerName;

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
